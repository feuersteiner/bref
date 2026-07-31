import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const DEFAULT_SEEDS = Object.freeze({
	background: '#181818',
	foreground: '#cccccc',
	accent: '#4daafc',
	success: '#77b374',
	warning: '#e6a73a',
	error: '#f06b76'
});

const HEX_PATTERN = /^#?(?<value>[\da-f]{3}|[\da-f]{6})$/i;
const MIN_TEXT_CONTRAST = 4.5;
const MIN_UI_CONTRAST = 3;

export function normalizeHex(value) {
	const match = HEX_PATTERN.exec(value.trim());

	if (!match) {
		throw new Error(`Expected a 3- or 6-digit hex color, received "${value}".`);
	}

	const hex = match.groups.value;
	const expanded = hex.length === 3 ? [...hex].map((channel) => channel + channel).join('') : hex;

	return `#${expanded.toLowerCase()}`;
}

function hexToRgb(hex) {
	const value = normalizeHex(hex).slice(1);

	return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16));
}

function rgbToHex(channels) {
	return `#${channels
		.map((channel) =>
			Math.round(Math.min(255, Math.max(0, channel)))
				.toString(16)
				.padStart(2, '0')
		)
		.join('')}`;
}

function mix(first, second, amount) {
	const firstChannels = hexToRgb(first);
	const secondChannels = hexToRgb(second);

	return rgbToHex(
		firstChannels.map((channel, index) => channel + (secondChannels[index] - channel) * amount)
	);
}

function relativeLuminance(hex) {
	const channels = hexToRgb(hex).map((channel) => channel / 255);
	const linear = channels.map((channel) =>
		channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
	);

	return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function contrastRatio(first, second) {
	const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort(
		(a, b) => b - a
	);

	return (lighter + 0.05) / (darker + 0.05);
}

function ensureContrast(color, against, minimum) {
	if (contrastRatio(color, against) >= minimum) {
		return normalizeHex(color);
	}

	const target =
		contrastRatio('#ffffff', against) >= contrastRatio('#000000', against) ? '#ffffff' : '#000000';

	for (let percentage = 1; percentage <= 100; percentage += 1) {
		const candidate = mix(color, target, percentage / 100);

		if (contrastRatio(candidate, against) >= minimum) {
			return candidate;
		}
	}

	return target;
}

function accessibleTextColor(preferred, background) {
	return ensureContrast(preferred, background, MIN_TEXT_CONTRAST);
}

function colorTokens(name, seed, background) {
	const base = ensureContrast(seed, background, MIN_UI_CONTRAST);
	const contrast = accessibleTextColor(
		contrastRatio('#ffffff', base) >= contrastRatio('#000000', base) ? '#ffffff' : '#000000',
		base
	);

	return {
		[`--color-${name}`]: base,
		[`--color-${name}-soft`]: mix(base, background, 0.78),
		[`--color-${name}-saturated`]: ensureContrast(
			mix(base, contrast, 0.15),
			background,
			MIN_UI_CONTRAST
		),
		[`--color-${name}-contrast`]: contrast
	};
}

export function generateTokens(seeds) {
	const values = Object.fromEntries(
		Object.entries({ ...DEFAULT_SEEDS, ...seeds }).map(([name, value]) => [
			name,
			normalizeHex(value)
		])
	);
	const foreground = accessibleTextColor(values.foreground, values.background);
	const muted = ensureContrast(
		mix(foreground, values.background, 0.5),
		values.background,
		MIN_UI_CONTRAST
	);

	return {
		'--color-background': values.background,
		'--color-background-soft': mix(values.background, foreground, 0.08),
		'--color-background-saturated': mix(values.background, '#000000', 0.28),
		'--color-background-contrast': foreground,
		'--color-surface': mix(values.background, foreground, 0.05),
		'--color-surface-hover': mix(values.background, foreground, 0.1),
		'--color-border': mix(values.background, foreground, 0.18),
		'--color-foreground': foreground,
		'--color-foreground-soft': muted,
		'--color-foreground-saturated': ensureContrast(
			mix(foreground, '#ffffff', 0.1),
			values.background,
			MIN_TEXT_CONTRAST
		),
		'--color-foreground-contrast': values.background,
		'--color-muted': muted,
		'--color-accent': ensureContrast(values.accent, values.background, MIN_UI_CONTRAST),
		'--color-focus': ensureContrast(values.accent, values.background, MIN_UI_CONTRAST),
		...colorTokens('primary', values.accent, values.background),
		...colorTokens('success', values.success, values.background),
		...colorTokens('warning', values.warning, values.background),
		...colorTokens('danger', values.error, values.background)
	};
}

export function renderTheme(seeds) {
	const tokens = generateTokens(seeds);
	const tokenLines = Object.entries(tokens)
		.map(([name, value]) => `\t\t${name}: ${value};`)
		.join('\n');

	return `<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

{#if children}
	{@render children()}
{/if}

<style>
	:global(:root) {
		color-scheme: dark;

		/* Generated semantic color tokens. Edit these values directly. */
${tokenLines}

		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-6: 1.5rem;
		--space-8: 2rem;
		--spacing: var(--space-4);
		--control-small: 1.5rem;
		--control-medium: 1.75rem;
		--control-large: 2rem;
		--font-family: system-ui, sans-serif;
		--font-family-display: ui-serif, Georgia, serif;
		--font-size-small: 0.875rem;
		--font-size-medium: 1rem;
		--font-size-large: 1.125rem;
		--font-weight-normal: 400;
		--font-weight-semibold: 600;
		--line-height-tight: 1.2;
		--line-height-normal: 1.5;
		--radius-small: 0.25rem;
		--radius-medium: 0.5rem;
		--radius-large: 1rem;
		--border-width: 1px;
		--border-radius: var(--radius-medium);
		--shadow-small: 0 1px 2px rgb(0 0 0 / 0.3);
		--shadow-medium: 0 4px 12px rgb(0 0 0 / 0.35);
		--motion-fast: 120ms;
		--motion-normal: 200ms;
		--motion-slow: 320ms;
		--motion-ease: ease;
		--focus-ring: 0 0 0 2px var(--color-focus);
	}

	:global(body) {
		margin: 0;
		background: var(--color-background);
		color: var(--color-foreground);
		font-family: var(--font-family);
		line-height: var(--line-height-normal);
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(h1) {
		font-family: var(--font-family-display);
	}

	:global(*:focus-visible) {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
		box-shadow: var(--focus-ring);
	}
</style>
`;
}

export async function writeTheme(target, seeds) {
	const resolvedTarget = path.resolve(target);

	if (existsSync(resolvedTarget)) {
		throw new Error(`Theme already exists at ${resolvedTarget}`);
	}

	await mkdir(path.dirname(resolvedTarget), { recursive: true });

	try {
		await writeFile(resolvedTarget, renderTheme(seeds), { encoding: 'utf8', flag: 'wx' });
	} catch (error) {
		if (error?.code === 'EEXIST') {
			throw new Error(`Theme already exists at ${resolvedTarget}`);
		}

		throw error;
	}

	return resolvedTarget;
}
