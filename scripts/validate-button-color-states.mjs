import { readFile } from 'node:fs/promises';
import { compile } from 'svelte/compiler';

const componentPaths = [
	['Button', 'src/lib/base/button/button.svelte'],
	['IconButton', 'src/lib/base/button/icon-button.svelte']
];

const [typesSource, themeSource, ...componentSources] = await Promise.all(
	[
		'src/lib/base/types.ts',
		'src/lib/base/theme/theme.svelte',
		...componentPaths.map(([, path]) => path)
	].map((path) => readFile(path, 'utf8'))
);

const colors = [
	...(typesSource.match(/COLOR_VALUES = \[([\s\S]*?)\] as const/)?.[1].matchAll(/'([^']+)'/g) ?? [])
].map(([, color]) => color);
const variants = ['filled', 'soft', 'ghost'];
const states = ['rest', 'hover', 'active'];

if (colors.length === 0) {
	throw new Error('Could not read the public COLOR_VALUES contract.');
}

// Read the component's exported inline-style mapping, rather than maintaining a second copy.
const { BUTTON_COLOR_VARIABLES } = await import('../src/lib/base/button/color-variables.ts');
for (const color of colors) {
	if (!(color in BUTTON_COLOR_VARIABLES)) {
		throw new Error(`Button color mapping is missing public Color alias: ${color}`);
	}
}

const themeVariables = declarationsForSelector(compileCss(themeSource, 'theme.svelte'), ':root');
const components = componentPaths.map(([name, path], index) => ({
	name,
	path,
	source: componentSources[index],
	css: compileCss(componentSources[index], path)
}));

const matrix = components.flatMap((component) =>
	colors.flatMap((color) =>
		variants.flatMap((variant) =>
			states.map((state) => ({
				component: component.name,
				color,
				variant,
				state,
				...computedButtonColors(component.css, color, variant, state)
			}))
		)
	)
);

assertMatrix(matrix);

if (process.argv.includes('--mutation-proof')) {
	for (const component of components) {
		const mutated = component.source.replace(
			'.background.ghost {\n\t\tcolor: var(--color-foreground);',
			'.background.ghost {\n\t\tcolor: var(--color-background);'
		);
		if (mutated === component.source) {
			throw new Error(`${component.name} mutation fixture no longer matches its source.`);
		}
		const mutationMatrix = colors.flatMap((color) =>
			variants.flatMap((variant) =>
				states.map((state) => ({
					component: component.name,
					color,
					variant,
					state,
					...computedButtonColors(compileCss(mutated, component.path), color, variant, state)
				}))
			)
		);
		let failed = false;
		try {
			assertMatrix(mutationMatrix);
		} catch {
			failed = true;
		}
		if (!failed) {
			throw new Error(
				`${component.name} background.ghost mutation unexpectedly passed validation.`
			);
		}
	}
	console.log('Mutation proof passed: both background.ghost regressions are rejected.');
}

const minimumContrast = Math.min(...matrix.map(({ contrast }) => contrast));
const minimumInteractionDelta = Math.min(
	...matrix.filter(({ state }) => state !== 'rest').map(({ interactionDelta }) => interactionDelta)
);
console.log(
	`Validated ${matrix.length} compiled Button/IconButton color × variant × state DOM combinations across ${colors.length} public Color aliases (minimum contrast ${minimumContrast.toFixed(2)}:1; minimum interaction delta ${minimumInteractionDelta.toFixed(3)}).`
);

function compileCss(source, filename) {
	return compile(source, { filename, generate: 'client' }).css.code;
}

function computedButtonColors(css, color, variant, state) {
	const element = { classes: new Set(['medium', color, variant]), state };
	const declarations = computedDeclarations(css, element);
	const variables = {
		...themeVariables,
		...Object.fromEntries(Object.entries(declarations).filter(([name]) => name.startsWith('--'))),
		...parseDeclarations(BUTTON_COLOR_VARIABLES[color])
	};
	const background = resolveColor(declarations['background-color'] ?? 'transparent', variables);
	const restingDeclarations = computedDeclarations(css, { ...element, state: 'rest' });
	const restingVariables = {
		...themeVariables,
		...Object.fromEntries(
			Object.entries(restingDeclarations).filter(([name]) => name.startsWith('--'))
		),
		...parseDeclarations(BUTTON_COLOR_VARIABLES[color])
	};
	const restingBackground = resolveColor(
		restingDeclarations['background-color'] ?? 'transparent',
		restingVariables
	);
	return {
		contrast: contrastRatio(resolveColor(declarations.color, variables), background),
		interactionDelta: state === 'rest' ? 0 : oklabDistance(restingBackground, background)
	};
}

function assertMatrix(matrix) {
	const failures = matrix.filter(
		({ contrast, interactionDelta, state }) =>
			contrast < 4.5 || (state !== 'rest' && interactionDelta < 0.01)
	);
	if (failures.length > 0) {
		throw new Error(
			`Compiled Button/IconButton CSS matrix failed:\n${JSON.stringify(failures, null, 2)}`
		);
	}
}

function declarationsForSelector(css, selector) {
	return Object.assign(
		{},
		...readCssRules(css)
			.filter((rule) => rule.selector === selector)
			.map((rule) => rule.declarations)
	);
}

function computedDeclarations(css, element) {
	return Object.assign(
		{},
		...readCssRules(css)
			.filter((rule) => matchesButton(rule.selector, element))
			.map((rule) => rule.declarations)
	);
}

function readCssRules(css) {
	return [...css.replaceAll(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)].flatMap(
		([, selectors, body]) =>
			selectors.split(',').map((selector) => ({
				selector: selector.trim(),
				declarations: parseDeclarations(body)
			}))
	);
}

function parseDeclarations(source) {
	return Object.fromEntries(
		splitTopLevel(source, ';').flatMap((declaration) => {
			const colon = declaration.indexOf(':');
			return colon < 0
				? []
				: [[declaration.slice(0, colon).trim(), declaration.slice(colon + 1).trim()]];
		})
	);
}

function matchesButton(selector, element) {
	if (!selector.startsWith('button') && !selector.startsWith('.')) return false;
	if (selector.endsWith(':disabled')) return false;
	if (selector.includes(':hover') && element.state !== 'hover') return false;
	if (selector.includes(':active') && element.state !== 'active') return false;
	const classes = [...selector.matchAll(/\.([\w-]+)/g)].map(([, className]) => className);
	return classes
		.filter((className) => !className.startsWith('svelte-'))
		.every((className) => element.classes.has(className));
}

function resolveColor(value, variables) {
	const resolved = resolveVariables(value.trim(), variables);
	if (resolved === 'transparent') return resolveColor('var(--color-background)', variables);
	if (/^#[\da-f]{6}$/i.test(resolved)) return hexToRgb(resolved);
	if (resolved.startsWith('color-mix(')) return resolveColorMix(resolved, variables);
	throw new Error(`Could not resolve compiled CSS color: ${value}`);
}

function resolveVariables(value, variables) {
	let resolved = value;
	for (let attempt = 0; attempt < 20 && resolved.includes('var('); attempt += 1) {
		resolved = resolved.replaceAll(/var\((--[\w-]+)\)/g, (_, name) => {
			if (!(name in variables)) throw new Error(`CSS variable is missing: ${name}`);
			return variables[name];
		});
	}
	return resolved;
}

function resolveColorMix(value, variables) {
	const [mode, firstPart, secondPart] = splitTopLevel(
		value.slice('color-mix('.length, -1),
		','
	).map((part) => part.trim());
	const firstMatch = firstPart.match(/^([\s\S]+)\s+([\d.]+)%$/);
	if (!mode.startsWith('in ') || !firstMatch || !secondPart) {
		throw new Error(`Unsupported compiled color-mix: ${value}`);
	}
	const firstWeight = Number(firstMatch[2]) / 100;
	const first = resolveColor(firstMatch[1], variables);
	const second = resolveColor(secondPart, variables);
	return mode === 'in srgb'
		? mixSrgb(first, second, firstWeight)
		: mode === 'in oklch'
			? mixOklch(first, second, firstWeight)
			: (() => {
					throw new Error(`Unsupported compiled color-mix space: ${mode}`);
				})();
}

function splitTopLevel(value, separator) {
	const parts = [];
	let depth = 0;
	let start = 0;
	for (let index = 0; index < value.length; index += 1) {
		if (value[index] === '(') depth += 1;
		if (value[index] === ')') depth -= 1;
		if (value[index] === separator && depth === 0) {
			parts.push(value.slice(start, index));
			start = index + 1;
		}
	}
	parts.push(value.slice(start));
	return parts;
}

function hexToRgb(hex) {
	return [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255);
}

function mixSrgb(first, second, firstWeight) {
	return first.map((channel, index) => channel * firstWeight + second[index] * (1 - firstWeight));
}

function srgbToLinear(value) {
	return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(value) {
	return value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;
}

function rgbToOklab(rgb) {
	const [r, g, b] = rgb.map(srgbToLinear);
	const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
	const lRoot = Math.cbrt(l);
	const mRoot = Math.cbrt(m);
	const sRoot = Math.cbrt(s);
	return [
		0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot,
		1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot,
		0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot
	];
}

function oklabToRgb([lightness, a, b]) {
	const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
	return [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
	].map((channel) => Math.min(1, Math.max(0, linearToSrgb(channel))));
}

function mixOklch(first, second, firstWeight) {
	const firstLab = rgbToOklab(first);
	const secondLab = rgbToOklab(second);
	const firstChroma = Math.hypot(firstLab[1], firstLab[2]);
	const secondChroma = Math.hypot(secondLab[1], secondLab[2]);
	const firstHue = Math.atan2(firstLab[2], firstLab[1]);
	const secondHue = Math.atan2(secondLab[2], secondLab[1]);
	let hueDelta = secondHue - firstHue;
	if (hueDelta > Math.PI) hueDelta -= 2 * Math.PI;
	if (hueDelta < -Math.PI) hueDelta += 2 * Math.PI;
	const secondWeight = 1 - firstWeight;
	return oklabToRgb([
		firstLab[0] * firstWeight + secondLab[0] * secondWeight,
		(firstChroma * firstWeight + secondChroma * secondWeight) *
			Math.cos(firstHue + hueDelta * secondWeight),
		(firstChroma * firstWeight + secondChroma * secondWeight) *
			Math.sin(firstHue + hueDelta * secondWeight)
	]);
}

function contrastRatio(first, second) {
	const luminance = (rgb) => {
		const [r, g, b] = rgb.map(srgbToLinear);
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};
	const [firstLuminance, secondLuminance] = [luminance(first), luminance(second)];
	return (
		(Math.max(firstLuminance, secondLuminance) + 0.05) /
		(Math.min(firstLuminance, secondLuminance) + 0.05)
	);
}

function oklabDistance(first, second) {
	const [firstL, firstA, firstB] = rgbToOklab(first);
	const [secondL, secondA, secondB] = rgbToOklab(second);
	return Math.hypot(firstL - secondL, firstA - secondA, firstB - secondB);
}
