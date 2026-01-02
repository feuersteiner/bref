<script lang="ts">
	import { setCSSProperty, setThemeMode } from './color-tokens.ts';
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
		setThemeMode(theme, 'light');
		setThemeMode(theme, 'dark');

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
		--color-primary: var(--color-light-primary);
		--color-primary-soft: var(--color-light-primary-soft);
		--color-primary-base: var(--color-light-primary-base);
		--color-primary-contrast: var(--color-light-primary-contrast);
		--color-secondary: var(--color-light-secondary);
		--color-secondary-soft: var(--color-light-secondary-soft);
		--color-secondary-base: var(--color-light-secondary-base);
		--color-secondary-contrast: var(--color-light-secondary-contrast);
		--color-success: var(--color-light-success);
		--color-success-soft: var(--color-light-success-soft);
		--color-success-base: var(--color-light-success-base);
		--color-success-contrast: var(--color-light-success-contrast);
		--color-warning: var(--color-light-warning);
		--color-warning-soft: var(--color-light-warning-soft);
		--color-warning-base: var(--color-light-warning-base);
		--color-warning-contrast: var(--color-light-warning-contrast);
		--color-danger: var(--color-light-danger);
		--color-danger-soft: var(--color-light-danger-soft);
		--color-danger-base: var(--color-light-danger-base);
		--color-danger-contrast: var(--color-light-danger-contrast);
		--color-info: var(--color-light-info);
		--color-info-soft: var(--color-light-info-soft);
		--color-info-base: var(--color-light-info-base);
		--color-info-contrast: var(--color-light-info-contrast);
		--color-border: var(--color-light-border);
		--color-background: var(--color-light-background-base);
		--color-background-soft: var(--color-light-background-soft);
		--color-background-base: var(--color-light-background-base);
		--color-background-contrast: var(--color-light-background-contrast);
		--color-foreground: var(--color-light-foreground-base);
		--color-foreground-soft: var(--color-light-foreground-soft);
		--color-foreground-base: var(--color-light-foreground-base);
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
		--color-primary: var(--color-dark-primary);
		--color-primary-soft: var(--color-dark-primary-soft);
		--color-primary-base: var(--color-dark-primary-base);
		--color-primary-contrast: var(--color-dark-primary-contrast);
		--color-secondary: var(--color-dark-secondary);
		--color-secondary-soft: var(--color-dark-secondary-soft);
		--color-secondary-base: var(--color-dark-secondary-base);
		--color-secondary-contrast: var(--color-dark-secondary-contrast);
		--color-success: var(--color-dark-success);
		--color-success-soft: var(--color-dark-success-soft);
		--color-success-base: var(--color-dark-success-base);
		--color-success-contrast: var(--color-dark-success-contrast);
		--color-warning: var(--color-dark-warning);
		--color-warning-soft: var(--color-dark-warning-soft);
		--color-warning-base: var(--color-dark-warning-base);
		--color-warning-contrast: var(--color-dark-warning-contrast);
		--color-danger: var(--color-dark-danger);
		--color-danger-soft: var(--color-dark-danger-soft);
		--color-danger-base: var(--color-dark-danger-base);
		--color-danger-contrast: var(--color-dark-danger-contrast);
		--color-info: var(--color-dark-info);
		--color-info-soft: var(--color-dark-info-soft);
		--color-info-base: var(--color-dark-info-base);
		--color-info-contrast: var(--color-dark-info-contrast);
		--color-border: var(--color-dark-border);
		--color-background: var(--color-dark-background-base);
		--color-background-soft: var(--color-dark-background-soft);
		--color-background-base: var(--color-dark-background-base);
		--color-background-contrast: var(--color-dark-background-contrast);
		--color-foreground: var(--color-dark-foreground-base);
		--color-foreground-soft: var(--color-dark-foreground-soft);
		--color-foreground-base: var(--color-dark-foreground-base);
		--color-foreground-contrast: var(--color-dark-foreground-contrast);
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) {
			color-scheme: dark;
			--color-primary: var(--color-dark-primary);
			--color-primary-soft: var(--color-dark-primary-soft);
			--color-primary-base: var(--color-dark-primary-base);
			--color-primary-contrast: var(--color-dark-primary-contrast);
			--color-secondary: var(--color-dark-secondary);
			--color-secondary-soft: var(--color-dark-secondary-soft);
			--color-secondary-base: var(--color-dark-secondary-base);
			--color-secondary-contrast: var(--color-dark-secondary-contrast);
			--color-success: var(--color-dark-success);
			--color-success-soft: var(--color-dark-success-soft);
			--color-success-base: var(--color-dark-success-base);
			--color-success-contrast: var(--color-dark-success-contrast);
			--color-warning: var(--color-dark-warning);
			--color-warning-soft: var(--color-dark-warning-soft);
			--color-warning-base: var(--color-dark-warning-base);
			--color-warning-contrast: var(--color-dark-warning-contrast);
			--color-danger: var(--color-dark-danger);
			--color-danger-soft: var(--color-dark-danger-soft);
			--color-danger-base: var(--color-dark-danger-base);
			--color-danger-contrast: var(--color-dark-danger-contrast);
			--color-info: var(--color-dark-info);
			--color-info-soft: var(--color-dark-info-soft);
			--color-info-base: var(--color-dark-info-base);
			--color-info-contrast: var(--color-dark-info-contrast);
			--color-border: var(--color-dark-border);
			--color-background: var(--color-dark-background-base);
			--color-background-soft: var(--color-dark-background-soft);
			--color-background-base: var(--color-dark-background-base);
			--color-background-contrast: var(--color-dark-background-contrast);
			--color-foreground: var(--color-dark-foreground-base);
			--color-foreground-soft: var(--color-dark-foreground-soft);
			--color-foreground-base: var(--color-dark-foreground-base);
			--color-foreground-contrast: var(--color-dark-foreground-contrast);
		}
	}
</style>
