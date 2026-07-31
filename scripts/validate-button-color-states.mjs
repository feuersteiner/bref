import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const root = new URL('..', import.meta.url).pathname;
const components = ['Button', 'IconButton'];
const typesSource = await readFile(new URL('../src/lib/base/types.ts', import.meta.url), 'utf8');
const colors = [
	...(typesSource.match(/COLOR_VALUES = \[([\s\S]*?)\] as const/)?.[1].matchAll(/'([^']+)'/g) ?? [])
].map(([, color]) => color);
const variants = ['filled', 'soft', 'ghost'];
const states = ['rest', 'hover', 'active'];
const minimumRequiredInteractionDelta = 0.005;

if (colors.length === 0) {
	throw new Error('Could not read the public COLOR_VALUES contract.');
}

const browser = await chromium.launch({ headless: true });

try {
	const matrix = await validate(browser);

	if (process.argv.includes('--mutation-proof')) {
		await assertMutationProof(browser);
		console.log(
			'Mutation proof passed: Svelte component integration, browser cascade/state, and semantic alias regressions are rejected.'
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
		`Validated ${matrix.length} actual rendered Button/IconButton color × variant × state combinations across ${colors.length} public Color aliases in Chromium (minimum contrast ${minimumContrast.toFixed(2)}:1; minimum interaction delta ${minimumInteractionDelta.toFixed(3)}).`
	);
} finally {
	await browser.close();
}

async function assertMutationProof(browser) {
	for (const component of components) {
		const source = componentPath(component);
		await expectRejected(`${component} background ghost foreground regression`, () =>
			validate(
				browser,
				{
					[source]: (code) =>
						code.replace(
							'.background.ghost {\n\t\tcolor: var(--color-foreground);',
							'.background.ghost {\n\t\tcolor: var(--color-background);'
						)
				},
				fixtureFilter(component, 'background', 'ghost')
			)
		);
		await expectRejected(`${component} disabled-only soft hover regression`, () =>
			validate(
				browser,
				{
					[source]: (code) => code.replaceAll('.soft:not(:disabled):hover', '.soft:disabled:hover')
				},
				fixtureFilter(component, 'primary', 'soft')
			)
		);
		await expectRejected(`${component} higher-specificity danger filled hover regression`, () =>
			validate(
				browser,
				{
					[source]: (code) =>
						code.replace(
							'.filled:not(:disabled):hover {',
							`.danger.filled:not(:disabled):hover {\n\t\tbackground-color: var(--internal-current-contrast);\n\t}\n\n\t.filled:not(:disabled):hover {`
						)
				},
				fixtureFilter(component, 'danger', 'filled')
			)
		);
		await expectRejected(`${component} removed color style prop regression`, () =>
			validate(
				browser,
				{
					[source]: (code) =>
						code.replace("style={`${BUTTON_COLOR_VARIABLES[color]}; ${style ?? ''}`}", '')
				},
				fixtureFilter(component, 'primary', 'filled')
			)
		);
		await expectRejected(`${component} removed color/variant class wiring regression`, () =>
			validate(
				browser,
				{
					[source]: (code) => code.replace('class={`${size} ${color} ${variant}`}', 'class={size}')
				},
				fixtureFilter(component, 'primary', 'filled')
			)
		);
		await expectRejected(`${component} filled icon contrast-mode regression`, () =>
			validate(
				browser,
				{
					[source]: (code) =>
						code.replace("contrastMode={variant === 'filled'}", 'contrastMode={false}')
				},
				fixtureFilter(component, 'primary', 'filled')
			)
		);
		await expectRejected(`${component} !important danger alias remapping regression`, () =>
			validate(
				browser,
				{
					[source]: (code) =>
						code.replace(
							'\n</style>',
							`\n\t.danger {\n\t\t--internal-current-color: var(--color-primary) !important;\n\t\t--internal-current-color-soft: var(--color-primary-soft) !important;\n\t\t--internal-current-contrast: var(--color-primary-contrast) !important;\n\t}\n</style>`
						)
				},
				fixtureFilter(component, 'danger', 'filled')
			)
		);
	}

	const variablesPath = '/src/lib/base/button/color-variables.ts';
	await expectRejected('danger mapped to primary semantic tokens', () =>
		validate(
			browser,
			{
				[variablesPath]: (code) => code.replaceAll('--color-danger', '--color-primary')
			},
			fixtureFilter(undefined, 'danger', 'filled')
		)
	);
	await expectRejected('primary mapped to secondary semantic tokens', () =>
		validate(
			browser,
			{
				[variablesPath]: (code) => code.replaceAll('--color-primary', '--color-secondary')
			},
			fixtureFilter(undefined, 'primary', 'filled')
		)
	);
	await expectRejected('later danger alias declarations remap to primary', () =>
		validate(
			browser,
			{
				[variablesPath]: (code) =>
					code.replace(
						"'--internal-current-color: var(--color-danger); --internal-current-color-soft: var(--color-danger-soft); --internal-current-contrast: var(--color-danger-contrast)'",
						"'--internal-current-color: var(--color-danger); --internal-current-color-soft: var(--color-danger-soft); --internal-current-contrast: var(--color-danger-contrast); --internal-current-color: var(--color-primary); --internal-current-color-soft: var(--color-primary-soft); --internal-current-contrast: var(--color-primary-contrast)'"
					)
			},
			fixtureFilter(undefined, 'danger', 'filled')
		)
	);
}

async function validate(browser, mutations = {}, fixtureFilter = () => true) {
	const server = await createServer({
		root,
		configFile: false,
		appType: 'custom',
		server: { host: '127.0.0.1', port: 0, strictPort: false },
		plugins: [
			{
				name: 'button-color-state-mutations',
				enforce: 'pre',
				transform(code, id) {
					const mutation = mutations[relativePath(id)];
					return mutation ? mutation(code) : undefined;
				}
			},
			svelte()
		]
	});
	server.middlewares.use('/__button-color-states-fixture', (_request, response) => {
		response.setHeader('Content-Type', 'text/html');
		response.end(
			'<!doctype html><html lang="en"><body><div id="app"></div><script type="module" src="/scripts/button-color-states-fixture.ts"></script></body></html>'
		);
	});
	await server.listen();
	const page = await browser.newPage({ viewport: { width: 1800, height: 1200 } });
	try {
		await page.goto(`${server.resolvedUrls.local[0]}__button-color-states-fixture`);
		await page.waitForSelector('#Button-primary-filled-enabled');
		const matrix = await renderedMatrix(page, fixtureFilter);
		assertMatrix(matrix);
		assertSemanticAliasIdentity(matrix);
		return matrix;
	} finally {
		await page.close();
		await server.close();
	}
}

async function renderedMatrix(page, fixtureFilter) {
	const matrix = [];
	for (const component of components) {
		for (const color of colors) {
			for (const variant of variants) {
				for (const disabled of [false, true]) {
					if (!fixtureFilter({ component, color, variant, disabled })) continue;
					const id = fixtureId(component, color, variant, disabled);
					const locator = page.locator(`#${id}`);
					const expectedAliasTokens = expectedSemanticTokenNames(color);
					const rest = await renderedState(page, locator, 'rest', expectedAliasTokens);
					for (const state of states) {
						const current =
							state === 'rest'
								? rest
								: await renderedState(page, locator, state, expectedAliasTokens);
						matrix.push({
							component,
							color,
							variant,
							state,
							disabled,
							contrast: Math.min(
								...current.foregrounds.map((foreground) =>
									contrastRatio(foreground, current.background)
								)
							),
							interactionDelta:
								state === 'rest' ? 0 : oklabDistance(rest.background, current.background),
							restingState: rest,
							currentState: current,
							aliases: current.aliases,
							expectedAliases: current.expectedAliases
						});
					}
				}
			}
		}
	}
	return matrix;
}

function assertSemanticAliasIdentity(matrix) {
	for (const entry of matrix) {
		assert.deepEqual(
			entry.aliases,
			entry.expectedAliases,
			`${entry.component} ${entry.color} ${entry.variant} ${entry.state} must retain its effective public semantic token identity.`
		);
	}
}

function expectedSemanticTokenNames(color) {
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

function fixtureId(component, color, variant, disabled) {
	return `${component}-${color}-${variant}-${disabled ? 'disabled' : 'enabled'}`;
}

function fixtureFilter(component, color, variant) {
	return (fixture) =>
		(component === undefined || fixture.component === component) &&
		fixture.color === color &&
		fixture.variant === variant &&
		!fixture.disabled;
}

async function renderedState(page, locator, state, expectedAliasTokens) {
	await page.mouse.move(0, 0);
	if (state !== 'rest') await locator.hover();
	if (state === 'active') await page.mouse.down();
	try {
		const screenshot = await locator.screenshot();
		return await locator.evaluate(
			async (element, { screenshotBase64, expectedAliasTokens }) => {
				const style = getComputedStyle(element);
				const icon = element.querySelector(':scope > [aria-hidden], :scope > [aria-label]');
				if (!icon) throw new Error('Rendered button is missing its nested Icon.');
				const iconStyle = getComputedStyle(icon);
				const toRgb = (value) => {
					const canvas = document.createElement('canvas');
					const context = canvas.getContext('2d');
					if (!context) throw new Error('Canvas 2D context is unavailable.');
					context.fillStyle = value;
					context.fillRect(0, 0, 1, 1);
					return [...context.getImageData(0, 0, 1, 1).data.slice(0, 3)].map(
						(channel) => channel / 255
					);
				};
				const aliases = Object.fromEntries(
					[
						'--internal-current-color',
						'--internal-current-color-soft',
						'--internal-current-contrast'
					].map((property) => [property, style.getPropertyValue(property).trim()])
				);
				const expectedAliases = Object.fromEntries(
					Object.entries(expectedAliasTokens).map(([property, token]) => [
						property,
						style.getPropertyValue(token).trim()
					])
				);
				const image = new Image();
				image.src = `data:image/png;base64,${screenshotBase64}`;
				await image.decode();
				const canvas = document.createElement('canvas');
				const context = canvas.getContext('2d', { willReadFrequently: true });
				if (!context) throw new Error('Canvas 2D context is unavailable.');
				canvas.width = image.naturalWidth;
				canvas.height = image.naturalHeight;
				context.drawImage(image, 0, 0);
				const background = context.getImageData(
					Math.min(3, image.naturalWidth - 1),
					Math.floor(image.naturalHeight * 0.5),
					1,
					1
				).data;
				return {
					foregrounds: [toRgb(style.color), toRgb(iconStyle.color)],
					background: [...background.slice(0, 3)].map((channel) => channel / 255),
					aliases,
					expectedAliases
				};
			},
			{ screenshotBase64: screenshot.toString('base64'), expectedAliasTokens }
		);
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

function componentPath(component) {
	return `/src/lib/base/button/${component === 'Button' ? 'button' : 'icon-button'}.svelte`;
}

function relativePath(id) {
	if (!id.startsWith(root)) return id;
	return new URL(`file://${id.split('?')[0]}`).pathname.replace(root.slice(0, -1), '');
}

function sameState(first, second) {
	return [...first.foregrounds.flat(), ...first.background].every(
		(value, index) => value === [...second.foregrounds.flat(), ...second.background][index]
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
