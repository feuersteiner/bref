<script lang="ts">
	import { setCSSProperty, setThemeTokens } from './color-tokens.ts';
	import { initializeThemeMode } from './mode.ts';
	import { DEFAULT_THEME, type ThemeProps } from './types.js';

	const userTheme: ThemeProps | undefined | Partial<ThemeProps> = $props();

	const theme: ThemeProps = {
		...DEFAULT_THEME,
		...userTheme,
		paletteHex: {
			...DEFAULT_THEME.paletteHex,
			...(userTheme?.paletteHex ?? {})
		},
		surfaceHex: {
			...DEFAULT_THEME.surfaceHex,
			...(userTheme?.surfaceHex ?? {})
		},
		border: {
			...DEFAULT_THEME.border,
			...(userTheme?.border ?? {})
		}
	};

	$effect.pre(() => {
		setThemeTokens(theme);

		setCSSProperty(`--border-width`, `${theme.border.widthPx}px`);
		setCSSProperty(`--border-radius`, `${theme.border.radiusRem}rem`);
		setCSSProperty(`--spacing`, `${theme.spacingRem}rem`);

		initializeThemeMode();
	});
</script>

<style>
	:global(:root),
	:global(:root[data-theme='light']) {
		color-scheme: light;
		--color-background: var(--color-light-background);
		--color-background-soft: var(--color-light-background-soft);
		--color-background-saturated: var(--color-light-background-saturated);
		--color-background-contrast: var(--color-light-background-contrast);
		--color-foreground: var(--color-light-foreground);
		--color-foreground-soft: var(--color-light-foreground-soft);
		--color-foreground-saturated: var(--color-light-foreground-saturated);
		--color-foreground-contrast: var(--color-light-foreground-contrast);
	}

	:global(*) {
		color: var(--color-foreground);
	}

	:global(body),
	:global(main) {
		background-color: var(--color-background);
	}

	:global(*) {
		gap: var(--spacing);
	}

	:global(:root[data-theme='dark']) {
		color-scheme: dark;
		--color-background: var(--color-dark-background);
		--color-background-soft: var(--color-dark-background-soft);
		--color-background-saturated: var(--color-dark-background-saturated);
		--color-background-contrast: var(--color-dark-background-contrast);
		--color-foreground: var(--color-dark-foreground);
		--color-foreground-soft: var(--color-dark-foreground-soft);
		--color-foreground-saturated: var(--color-dark-foreground-saturated);
		--color-foreground-contrast: var(--color-dark-foreground-contrast);
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) {
			color-scheme: dark;
			--color-background: var(--color-dark-background);
			--color-background-soft: var(--color-dark-background-soft);
			--color-background-saturated: var(--color-dark-background-saturated);
			--color-background-contrast: var(--color-dark-background-contrast);
			--color-foreground: var(--color-dark-foreground);
			--color-foreground-soft: var(--color-dark-foreground-soft);
			--color-foreground-saturated: var(--color-dark-foreground-saturated);
			--color-foreground-contrast: var(--color-dark-foreground-contrast);
		}
	}
</style>
