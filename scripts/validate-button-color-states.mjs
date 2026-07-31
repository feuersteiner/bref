import { readFile } from 'node:fs/promises';

const [typesSource, colorVariablesSource, buttonSource, iconButtonSource, themeSource] =
	await Promise.all(
		[
			'src/lib/base/types.ts',
			'src/lib/base/button/color-variables.ts',
			'src/lib/base/button/button.svelte',
			'src/lib/base/button/icon-button.svelte',
			'src/lib/base/theme/theme.svelte'
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

for (const color of colors) {
	if (!colorVariablesSource.includes(`\t${color}:`)) {
		throw new Error(`Button color mapping is missing public Color alias: ${color}`);
	}
}

for (const source of [buttonSource, iconButtonSource]) {
	for (const selector of [
		'.background.ghost {',
		'.foreground.soft:not(:disabled):hover {',
		'.foreground.soft:not(:disabled):active {'
	]) {
		if (!source.includes(selector)) {
			throw new Error(`Alias interaction treatment is missing: ${selector}`);
		}
	}
}

const tokens = Object.fromEntries(
	[...themeSource.matchAll(/--(color-[\w-]+):\s*(#[\da-f]{6}|var\(--color-[\w-]+\));/gi)].map(
		([, token, value]) => [token, value]
	)
);
const token = (name) => {
	const value = tokens[`color-${name}`];
	if (!value) throw new Error(`Theme token is missing: --color-${name}`);
	const reference = value.match(/^var\(--color-([\w-]+)\)$/)?.[1];
	return reference ? token(reference) : hexToRgb(value);
};

const matrix = [];
for (const color of colors) {
	const current = token(color);
	const soft = token(
		color === 'foreground'
			? 'background-saturated'
			: color === 'background'
				? 'foreground-saturated'
				: `${color}-soft`
	);
	const contrast = token(
		color === 'foreground'
			? 'background'
			: color === 'background'
				? 'foreground'
				: `${color}-contrast`
	);

	for (const variant of variants) {
		for (const state of states) {
			let foreground = variant === 'filled' ? contrast : current;
			let background;
			let restingBackground;

			if (variant === 'filled') {
				background =
					state === 'rest'
						? current
						: mixOklch(current, token('foreground-saturated'), state === 'hover' ? 0.85 : 0.7);
				restingBackground = current;
			} else if (variant === 'soft') {
				background =
					color === 'foreground' && state === 'hover'
						? token('background-soft')
						: color === 'foreground' && state === 'active'
							? mixOklch(token('background-soft'), token('foreground'), 0.75)
							: state === 'rest'
								? soft
								: mixOklch(soft, token('background'), state === 'hover' ? 0.85 : 0.7);
				restingBackground = soft;
			} else {
				foreground = color === 'background' ? token('foreground') : current;
				background =
					state === 'rest'
						? token('background')
						: mixSrgb(foreground, token('background'), state === 'hover' ? 0.1 : 0.2);
				restingBackground = token('background');
			}

			matrix.push({
				color,
				variant,
				state,
				contrast: contrastRatio(foreground, background),
				interactionDelta: state === 'rest' ? 0 : oklabDistance(restingBackground, background)
			});
		}
	}
}

const failures = matrix.filter(
	({ contrast, interactionDelta, state }) =>
		contrast < 4.5 || (state !== 'rest' && interactionDelta < 0.01)
);
if (failures.length > 0) {
	throw new Error(`Button color matrix failed:\n${JSON.stringify(failures, null, 2)}`);
}

const minimumContrast = Math.min(...matrix.map(({ contrast }) => contrast));
const minimumInteractionDelta = Math.min(
	...matrix.filter(({ state }) => state !== 'rest').map(({ interactionDelta }) => interactionDelta)
);
console.log(
	`Validated ${matrix.length * 2} Button/IconButton color × variant × state combinations across ${colors.length} public Color aliases (minimum contrast ${minimumContrast.toFixed(2)}:1; minimum interaction delta ${minimumInteractionDelta.toFixed(3)}).`
);

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
	].map((value) => Math.min(1, Math.max(0, linearToSrgb(value))));
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
