<script lang="ts">
	import generateColorTokens from './color-tokens.ts';
	import { initializeThemeMode } from './mode.ts';
	import { DEFAULT_THEME, type ThemeMode, type ThemeProps } from './types.js';
	import { onMount, type Snippet } from 'svelte';

	const userTheme: ThemeProps | undefined | Partial<ThemeProps> = $props();

	const theme: ThemeProps = {
		...DEFAULT_THEME,
		...userTheme
	};

	const setCSSProperty = (key: string, value: string) => {
		const prefixedKey = key.startsWith('--') ? key : `--${key}`;
		document.documentElement.style.setProperty(prefixedKey, value);
	};

	const setColorTokens = (colorKey: string, baseColor: string, mode: ThemeMode) => {
		const tokens = generateColorTokens(baseColor, mode);
		Object.entries(tokens).forEach(([variant, value]) => {
			setCSSProperty(`--color-${mode}-${colorKey}-${variant}`, value);
		});
	};

	let ready = $state(false);

	onMount(() => {
		const lightTheme: ThemeProps = structuredClone(theme);
		const darkTheme: ThemeProps = structuredClone(theme);
		const darkBackground = lightTheme.surfaceHex.background;
		const lightForeground = lightTheme.surfaceHex.foreground;

		darkTheme.surfaceHex.background = lightForeground;
		darkTheme.surfaceHex.foreground = darkBackground;

		const lightMode: ThemeMode = 'light';
		Object.entries(lightTheme.paletteHex).forEach(([color, value]) => {
			setCSSProperty(`--color-${lightMode}-${color}`, value);
			setColorTokens(color, value, lightMode);
		});
		Object.entries(lightTheme.surfaceHex).forEach(([surface, value]) =>
			setCSSProperty(`--color-${lightMode}-${surface}`, value)
		);
		setCSSProperty(`--color-${lightMode}-border`, lightTheme.border.colorHex);

		const darkMode: ThemeMode = 'dark';
		Object.entries(darkTheme.paletteHex).forEach(([color, value]) => {
			setCSSProperty(`--color-${darkMode}-${color}`, value);
			setColorTokens(color, value, darkMode);
		});
		Object.entries(darkTheme.surfaceHex).forEach(([surface, value]) =>
			setCSSProperty(`--color-${darkMode}-${surface}`, value)
		);
		setCSSProperty(`--color-${darkMode}-border`, darkTheme.border.colorHex);

		initializeThemeMode();
		ready = true;
	});
</script>

<style>
	:global(:root),
	:global(:root[data-theme='light']) {
		color-scheme: light;
		--color-primary: var(--color-light-primary);
		--color-primary-soft: var(--color-light-primary-soft);
		--color-primary-base: var(--color-light-primary-base);
		--color-primary-hover: var(--color-light-primary-hover);
		--color-primary-active: var(--color-light-primary-active);
		--color-primary-muted: var(--color-light-primary-muted);
		--color-primary-contrast: var(--color-light-primary-contrast);
		--color-secondary: var(--color-light-secondary);
		--color-secondary-soft: var(--color-light-secondary-soft);
		--color-secondary-base: var(--color-light-secondary-base);
		--color-secondary-hover: var(--color-light-secondary-hover);
		--color-secondary-active: var(--color-light-secondary-active);
		--color-secondary-muted: var(--color-light-secondary-muted);
		--color-secondary-contrast: var(--color-light-secondary-contrast);
		--color-success: var(--color-light-success);
		--color-success-soft: var(--color-light-success-soft);
		--color-success-base: var(--color-light-success-base);
		--color-success-hover: var(--color-light-success-hover);
		--color-success-active: var(--color-light-success-active);
		--color-success-muted: var(--color-light-success-muted);
		--color-success-contrast: var(--color-light-success-contrast);
		--color-warning: var(--color-light-warning);
		--color-warning-soft: var(--color-light-warning-soft);
		--color-warning-base: var(--color-light-warning-base);
		--color-warning-hover: var(--color-light-warning-hover);
		--color-warning-active: var(--color-light-warning-active);
		--color-warning-muted: var(--color-light-warning-muted);
		--color-warning-contrast: var(--color-light-warning-contrast);
		--color-danger: var(--color-light-danger);
		--color-danger-soft: var(--color-light-danger-soft);
		--color-danger-base: var(--color-light-danger-base);
		--color-danger-hover: var(--color-light-danger-hover);
		--color-danger-active: var(--color-light-danger-active);
		--color-danger-muted: var(--color-light-danger-muted);
		--color-danger-contrast: var(--color-light-danger-contrast);
		--color-info: var(--color-light-info);
		--color-info-soft: var(--color-light-info-soft);
		--color-info-base: var(--color-light-info-base);
		--color-info-hover: var(--color-light-info-hover);
		--color-info-active: var(--color-light-info-active);
		--color-info-muted: var(--color-light-info-muted);
		--color-info-contrast: var(--color-light-info-contrast);
		--color-border: var(--color-light-border);
		--color-background: var(--color-light-background);
		--color-foreground: var(--color-light-foreground);
		transition:
			background-color 100ms,
			color 100ms;
	}

	:global(:root[data-theme='dark']) {
		color-scheme: dark;
		--color-primary: var(--color-dark-primary);
		--color-primary-soft: var(--color-dark-primary-soft);
		--color-primary-base: var(--color-dark-primary-base);
		--color-primary-hover: var(--color-dark-primary-hover);
		--color-primary-active: var(--color-dark-primary-active);
		--color-primary-muted: var(--color-dark-primary-muted);
		--color-primary-contrast: var(--color-dark-primary-contrast);
		--color-secondary: var(--color-dark-secondary);
		--color-secondary-soft: var(--color-dark-secondary-soft);
		--color-secondary-base: var(--color-dark-secondary-base);
		--color-secondary-hover: var(--color-dark-secondary-hover);
		--color-secondary-active: var(--color-dark-secondary-active);
		--color-secondary-muted: var(--color-dark-secondary-muted);
		--color-secondary-contrast: var(--color-dark-secondary-contrast);
		--color-success: var(--color-dark-success);
		--color-success-soft: var(--color-dark-success-soft);
		--color-success-base: var(--color-dark-success-base);
		--color-success-hover: var(--color-dark-success-hover);
		--color-success-active: var(--color-dark-success-active);
		--color-success-muted: var(--color-dark-success-muted);
		--color-success-contrast: var(--color-dark-success-contrast);
		--color-warning: var(--color-dark-warning);
		--color-warning-soft: var(--color-dark-warning-soft);
		--color-warning-base: var(--color-dark-warning-base);
		--color-warning-hover: var(--color-dark-warning-hover);
		--color-warning-active: var(--color-dark-warning-active);
		--color-warning-muted: var(--color-dark-warning-muted);
		--color-warning-contrast: var(--color-dark-warning-contrast);
		--color-danger: var(--color-dark-danger);
		--color-danger-soft: var(--color-dark-danger-soft);
		--color-danger-base: var(--color-dark-danger-base);
		--color-danger-hover: var(--color-dark-danger-hover);
		--color-danger-active: var(--color-dark-danger-active);
		--color-danger-muted: var(--color-dark-danger-muted);
		--color-danger-contrast: var(--color-dark-danger-contrast);
		--color-info: var(--color-dark-info);
		--color-info-soft: var(--color-dark-info-soft);
		--color-info-base: var(--color-dark-info-base);
		--color-info-hover: var(--color-dark-info-hover);
		--color-info-active: var(--color-dark-info-active);
		--color-info-muted: var(--color-dark-info-muted);
		--color-info-contrast: var(--color-dark-info-contrast);
		--color-border: var(--color-dark-border);
		--color-background: var(--color-dark-background);
		--color-foreground: var(--color-dark-foreground);
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) {
			color-scheme: dark;
			--color-primary: var(--color-dark-primary);
			--color-primary-soft: var(--color-dark-primary-soft);
			--color-primary-base: var(--color-dark-primary-base);
			--color-primary-hover: var(--color-dark-primary-hover);
			--color-primary-active: var(--color-dark-primary-active);
			--color-primary-muted: var(--color-dark-primary-muted);
			--color-primary-contrast: var(--color-dark-primary-contrast);
			--color-secondary: var(--color-dark-secondary);
			--color-secondary-soft: var(--color-dark-secondary-soft);
			--color-secondary-base: var(--color-dark-secondary-base);
			--color-secondary-hover: var(--color-dark-secondary-hover);
			--color-secondary-active: var(--color-dark-secondary-active);
			--color-secondary-muted: var(--color-dark-secondary-muted);
			--color-secondary-contrast: var(--color-dark-secondary-contrast);
			--color-success: var(--color-dark-success);
			--color-success-soft: var(--color-dark-success-soft);
			--color-success-base: var(--color-dark-success-base);
			--color-success-hover: var(--color-dark-success-hover);
			--color-success-active: var(--color-dark-success-active);
			--color-success-muted: var(--color-dark-success-muted);
			--color-success-contrast: var(--color-dark-success-contrast);
			--color-warning: var(--color-dark-warning);
			--color-warning-soft: var(--color-dark-warning-soft);
			--color-warning-base: var(--color-dark-warning-base);
			--color-warning-hover: var(--color-dark-warning-hover);
			--color-warning-active: var(--color-dark-warning-active);
			--color-warning-muted: var(--color-dark-warning-muted);
			--color-warning-contrast: var(--color-dark-warning-contrast);
			--color-danger: var(--color-dark-danger);
			--color-danger-soft: var(--color-dark-danger-soft);
			--color-danger-base: var(--color-dark-danger-base);
			--color-danger-hover: var(--color-dark-danger-hover);
			--color-danger-active: var(--color-dark-danger-active);
			--color-danger-muted: var(--color-dark-danger-muted);
			--color-danger-contrast: var(--color-dark-danger-contrast);
			--color-info: var(--color-dark-info);
			--color-info-soft: var(--color-dark-info-soft);
			--color-info-base: var(--color-dark-info-base);
			--color-info-hover: var(--color-dark-info-hover);
			--color-info-active: var(--color-dark-info-active);
			--color-info-muted: var(--color-dark-info-muted);
			--color-info-contrast: var(--color-dark-info-contrast);
			--color-border: var(--color-dark-border);
			--color-background: var(--color-dark-background);
			--color-foreground: var(--color-dark-foreground);
		}
	}
</style>
