import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
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
const minimumRequiredInteractionDelta = 0.005;

if (colors.length === 0) {
	throw new Error('Could not read the public COLOR_VALUES contract.');
}

const { BUTTON_COLOR_VARIABLES } = await import('../src/lib/base/button/color-variables.ts');
const colorVariables = Object.fromEntries(Object.entries(BUTTON_COLOR_VARIABLES));
const components = componentPaths.map(([name, path], index) =>
	compileComponent(name, path, componentSources[index])
);
const themeCss = compileCss(themeSource, 'theme.svelte');
const browser = await chromium.launch({ headless: true });

try {
	const matrix = await validate({ browser, components, colorVariables });

	if (process.argv.includes('--mutation-proof')) {
		for (const component of components) {
			await expectRejected(`${component.name} disabled-only soft hover regression`, () =>
				validate({
					browser,
					components: components.map((candidate) =>
						candidate === component
							? compileComponent(
									candidate.name,
									candidate.path,
									candidate.source.replaceAll('.soft:not(:disabled):hover', '.soft:disabled:hover')
								)
							: candidate
					),
					colorVariables,
					fixtureFilter: ({ component: candidate, color, variant, disabled }) =>
						candidate.name === component.name &&
						color === 'primary' &&
						variant === 'soft' &&
						!disabled
				})
			);
			await expectRejected(
				`${component.name} higher-specificity danger filled hover regression`,
				() =>
					validate({
						browser,
						components: components.map((candidate) =>
							candidate === component
								? compileComponent(
										candidate.name,
										candidate.path,
										candidate.source.replace(
											'.filled:not(:disabled):hover {',
											`.danger.filled:not(:disabled):hover {\n\t\tbackground-color: var(--internal-current-contrast);\n\t}\n\n\t.filled:not(:disabled):hover {`
										)
									)
								: candidate
						),
						colorVariables,
						fixtureFilter: ({ component: candidate, color, variant, disabled }) =>
							candidate.name === component.name &&
							color === 'danger' &&
							variant === 'filled' &&
							!disabled
					})
			);
		}

		await expectRejected('danger mapped to primary semantic tokens', () =>
			assertSemanticAliasIdentity({ ...colorVariables, danger: colorVariables.primary })
		);
		await expectRejected('primary mapped to secondary semantic tokens', () =>
			assertSemanticAliasIdentity({ ...colorVariables, primary: colorVariables.secondary })
		);
		console.log(
			'Mutation proof passed: browser cascade/state and semantic alias regressions are rejected.'
		);
	}

	const enabledMatrix = matrix.filter(({ disabled }) => !disabled);
	const minimumContrast = Math.min(...enabledMatrix.map(({ contrast }) => contrast));
	const minimumInteractionDelta = Math.min(
		...enabledMatrix
			.filter(({ state }) => state !== 'rest')
			.map(({ interactionDelta }) => interactionDelta)
	);
	console.log(
		`Validated ${matrix.length} rendered Button/IconButton color × variant × state combinations across ${colors.length} public Color aliases in Chromium (minimum contrast ${minimumContrast.toFixed(2)}:1; minimum interaction delta ${minimumInteractionDelta.toFixed(3)}).`
	);
} finally {
	await browser.close();
}

function compileComponent(name, path, source) {
	const css = compileCss(source, path);
	const scopeClass = css.match(/button\.(svelte-[\w-]+)/)?.[1];
	if (!scopeClass) {
		throw new Error(`${name} compiled CSS does not contain its Svelte scope class.`);
	}
	return { name, path, source, css, scopeClass };
}

function compileCss(source, filename) {
	return compile(source, { filename, generate: 'client' }).css.code;
}

async function validate({
	browser,
	components: candidateComponents,
	colorVariables: candidateVariables,
	fixtureFilter
}) {
	assertSemanticAliasIdentity(candidateVariables);
	const matrix = await renderedMatrix(
		browser,
		candidateComponents,
		candidateVariables,
		fixtureFilter
	);
	assertMatrix(matrix);
	return matrix;
}

function assertSemanticAliasIdentity(candidateVariables) {
	for (const color of colors) {
		const actual = semanticTokenReferences(candidateVariables[color]);
		const expected = expectedSemanticTokenReferences(color);
		assert.deepEqual(actual, expected, `${color} must retain its public semantic token identity.`);
	}
}

function semanticTokenReferences(style) {
	if (typeof style !== 'string') return undefined;
	return Object.fromEntries(
		[
			'--internal-current-color',
			'--internal-current-color-soft',
			'--internal-current-contrast'
		].map((property) => [
			property,
			style.match(new RegExp(`${property}:\\s*var\\((--color-[\\w-]+)\\)`))?.[1]
		])
	);
}

function expectedSemanticTokenReferences(color) {
	if (color === 'foreground') {
		return {
			'--internal-current-color': '--color-foreground',
			'--internal-current-color-soft': '--color-background-saturated',
			'--internal-current-contrast': '--color-background'
		};
	}
	if (color === 'background') {
		return {
			'--internal-current-color': '--color-background',
			'--internal-current-color-soft': '--color-foreground-saturated',
			'--internal-current-contrast': '--color-foreground'
		};
	}
	return {
		'--internal-current-color': `--color-${color}`,
		'--internal-current-color-soft': `--color-${color}-soft`,
		'--internal-current-contrast': `--color-${color}-contrast`
	};
}

async function renderedMatrix(
	browser,
	candidateComponents,
	candidateVariables,
	fixtureFilter = () => true
) {
	const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
	try {
		const fixtures = candidateComponents
			.flatMap((component) =>
				colors.flatMap((color) =>
					variants.flatMap((variant) =>
						[false, true].map((disabled) => ({ component, color, variant, disabled }))
					)
				)
			)
			.filter(fixtureFilter);
		await page.setContent(renderDocument(fixtures, candidateVariables));

		const matrix = [];
		for (const fixture of fixtures) {
			const locator = page.locator(`#${fixtureId(fixture)}`);
			const rest = await renderedState(page, locator, 'rest');
			for (const state of states) {
				const current = state === 'rest' ? rest : await renderedState(page, locator, state);
				matrix.push({
					component: fixture.component.name,
					color: fixture.color,
					variant: fixture.variant,
					state,
					disabled: fixture.disabled,
					contrast: contrastRatio(current.foreground, current.background),
					interactionDelta:
						state === 'rest' ? 0 : oklabDistance(rest.background, current.background),
					restingState: rest,
					currentState: current
				});
			}
		}
		return matrix;
	} finally {
		await page.close();
	}
}

function renderDocument(fixtures, candidateVariables) {
	return `<!doctype html>
<html><head><style>${themeCss}\n${fixtures.map(({ component }) => component.css).join('\n')}</style></head>
<body>${fixtures
		.map(
			({ component, color, variant, disabled }) =>
				`<button id="${fixtureId({ component, color, variant, disabled })}" aria-label="${component.name}" class="medium ${color} ${variant} ${component.scopeClass}" style="${candidateVariables[color]}"${disabled ? ' disabled' : ''}></button>`
		)
		.join('\n')}</body></html>`;
}

function fixtureId({ component, color, variant, disabled }) {
	return `${component.name}-${color}-${variant}-${disabled ? 'disabled' : 'enabled'}`;
}

async function renderedState(page, locator, state) {
	await page.mouse.move(0, 0);
	if (state !== 'rest') {
		const box = await locator.boundingBox();
		if (!box) throw new Error('Button fixture is not rendered.');
		await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
	}
	if (state === 'active') await page.mouse.down();
	try {
		const screenshot = await locator.screenshot();
		return await locator.evaluate(async (element, screenshotBase64) => {
			const style = getComputedStyle(element);
			const canvas = document.createElement('canvas');
			const image = new Image();
			image.src = `data:image/png;base64,${screenshotBase64}`;
			await image.decode();
			canvas.width = image.naturalWidth;
			canvas.height = image.naturalHeight;
			const context = canvas.getContext('2d', { willReadFrequently: true });
			if (!context) throw new Error('Canvas 2D context is unavailable.');
			context.drawImage(image, 0, 0);
			const center = context.getImageData(
				Math.floor(image.naturalWidth / 2),
				Math.floor(image.naturalHeight / 2),
				1,
				1
			).data;
			context.clearRect(0, 0, 1, 1);
			context.fillStyle = style.color;
			context.fillRect(0, 0, 1, 1);
			return {
				foreground: [...context.getImageData(0, 0, 1, 1).data.slice(0, 3)].map(
					(channel) => channel / 255
				),
				background: [...center.slice(0, 3)].map((channel) => channel / 255),
				rawColor: style.color,
				rawBackground: style.backgroundColor
			};
		}, screenshot.toString('base64'));
	} finally {
		if (state === 'active') await page.mouse.up();
	}
}

function assertMatrix(matrix) {
	const failures = matrix.filter((entry) => {
		if (entry.disabled) {
			return entry.state !== 'rest' && !sameState(entry.restingState, entry.currentState);
		}
		return (
			entry.contrast < 4.5 ||
			(entry.state !== 'rest' && entry.interactionDelta < minimumRequiredInteractionDelta)
		);
	});
	if (failures.length > 0) {
		throw new Error(
			`Rendered Button/IconButton CSS matrix failed:\n${JSON.stringify(failures, null, 2)}`
		);
	}
}

function sameState(first, second) {
	return [...first.foreground, ...first.background].every(
		(value, index) => value === [...second.foreground, ...second.background][index]
	);
}

async function expectRejected(label, validateMutation) {
	let rejected = false;
	try {
		await validateMutation();
	} catch {
		rejected = true;
	}
	if (!rejected) throw new Error(`${label} unexpectedly passed validation.`);
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

function srgbToLinear(value) {
	return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function oklabDistance(first, second) {
	const toOklab = (rgb) => {
		const [r, g, b] = rgb.map(srgbToLinear);
		const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
		const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
		const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
		return [
			0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
			1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
			0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
		];
	};
	const [firstL, firstA, firstB] = toOklab(first);
	const [secondL, secondA, secondB] = toOklab(second);
	return Math.hypot(firstL - secondL, firstA - secondA, firstB - secondB);
}
