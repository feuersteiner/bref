<script lang="ts">
	import { cloneDeep, map } from 'lodash-es';
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

	let ready = $state(false);

	onMount(() => {
		const lightTheme: ThemeProps = cloneDeep(theme);
		const darkTheme: ThemeProps = cloneDeep(theme);
		const darkBackground = lightTheme.surfaceHex.background;
		const lightForeground = lightTheme.surfaceHex.foreground;

		darkTheme.surfaceHex.background = lightForeground;
		darkTheme.surfaceHex.foreground = darkBackground;

		const lightMode: ThemeMode = 'light';
		map(lightTheme.paletteHex, (value, color) =>
			setCSSProperty(`--color-${lightMode}-${color}`, value)
		);
		map(lightTheme.surfaceHex, (value, surface) =>
			setCSSProperty(`--color-${lightMode}-${surface}`, value)
		);
		setCSSProperty(`--color-${lightMode}-border`, lightTheme.border.colorHex);

		const darkMode: ThemeMode = 'dark';
		map(darkTheme.paletteHex, (value, color) =>
			setCSSProperty(`--color-${darkMode}-${color}`, value)
		);
		map(darkTheme.surfaceHex, (value, surface) =>
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
		--color-secondary: var(--color-light-secondary);
		--color-success: var(--color-light-success);
		--color-warning: var(--color-light-warning);
		--color-danger: var(--color-light-danger);
		--color-info: var(--color-light-info);
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
		--color-secondary: var(--color-dark-secondary);
		--color-success: var(--color-dark-success);
		--color-warning: var(--color-dark-warning);
		--color-danger: var(--color-dark-danger);
		--color-info: var(--color-dark-info);
		--color-border: var(--color-dark-border);
		--color-background: var(--color-dark-background);
		--color-foreground: var(--color-dark-foreground);
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) {
			color-scheme: dark;
			--color-primary: var(--color-dark-primary);
			--color-secondary: var(--color-dark-secondary);
			--color-success: var(--color-dark-success);
			--color-warning: var(--color-dark-warning);
			--color-danger: var(--color-dark-danger);
			--color-info: var(--color-dark-info);
			--color-border: var(--color-dark-border);
			--color-background: var(--color-dark-background);
			--color-foreground: var(--color-dark-foreground);
		}
	}
</style>
