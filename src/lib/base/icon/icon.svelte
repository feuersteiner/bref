<script lang="ts">
	import '@fontsource-variable/material-symbols-rounded/fill.css';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { IconProps } from './types.ts';

	const {
		name,
		filled = false,
		size = 'medium',
		color = 'foreground',
		ariaLabel,
		contrastMode,
		...rest
	}: IconProps & SvelteHTMLElements['span'] = $props();
</script>

<span
	{...rest}
	class:filled
	class={`${size} ${color}`}
	class:contrastMode
	aria-label={ariaLabel}
	aria-hidden={ariaLabel ? 'false' : 'true'}
>
	{name}
</span>

<style>
	span {
		font-family: 'Material Symbols Rounded Variable';
		font-weight: 200;
		font-style: normal;
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;
		user-select: none;
	}

	.filled {
		font-variation-settings: 'FILL' 1;
		font-weight: 500;
	}

	.x-small {
		font-size: 0.75rem;
	}
	.small {
		font-size: 1rem;
	}
	.medium {
		font-size: 1.5rem;
	}
	.large {
		font-size: 2rem;
	}
	.x-large {
		font-size: 3rem;
	}
	.foreground {
		color: var(--color-foreground);
	}
	.foreground.contrastMode {
		color: var(--color-foreground-contrast);
	}
	.primary {
		color: var(--color-primary);
	}
	.primary.contrastMode {
		color: var(--color-primary-contrast);
	}

	.secondary {
		color: var(--color-secondary);
	}
	.secondary.contrastMode {
		color: var(--color-secondary-contrast);
	}

	.success {
		color: var(--color-success);
	}
	.success.contrastMode {
		color: var(--color-success-contrast);
	}

	.warning {
		color: var(--color-warning);
	}
	.warning.contrastMode {
		color: var(--color-warning-contrast);
	}

	.danger {
		color: var(--color-danger);
	}
	.danger.contrastMode {
		color: var(--color-danger-contrast);
	}

	.background {
		color: var(--color-background);
	}
	.background.contrastMode {
		color: var(--color-background-contrast);
	}

	.info {
		color: var(--color-info);
	}
	.info.contrastMode {
		color: var(--color-info-contrast);
	}
</style>
