<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { PillProps } from './types.ts';
	import Icon from '../icon/icon.svelte';

	const {
		label,
		size = 'medium',
		color = 'primary',
		variant = 'filled',
		icon
	}: PillProps = $props();
</script>

<div class={`${size} ${color} ${variant}`}>
	{#if icon}
		<Icon contrastMode={variant === 'filled'} {color} {...icon} {size} />
	{/if}
	<span>{label}</span>
</div>

<style>
	div {
		/* Size defaults (medium) */
		--internal-pill-padding-y: calc(var(--spacing) * 0.375);
		--internal-pill-padding-x: calc(var(--spacing) * 0.75);
		--internal-pill-font-size: 1rem;

		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		flex-shrink: 0;
		width: fit-content;
		min-width: fit-content;
		height: fit-content;
		min-height: fit-content;
		gap: 0.35em;
		padding: var(--internal-pill-padding-y) var(--internal-pill-padding-x);
		font-size: var(--internal-pill-font-size);
		border-radius: 4rem;
	}

	span {
		white-space: nowrap;
		color: inherit;
	}

	/* Sizes - compact padding that scales proportionally */
	.x-small {
		--internal-pill-padding-y: calc(var(--spacing) * 0.125);
		--internal-pill-padding-x: calc(var(--spacing) * 0.375);
		--internal-pill-font-size: 0.75rem;
	}

	.small {
		--internal-pill-padding-y: calc(var(--spacing) * 0.25);
		--internal-pill-padding-x: calc(var(--spacing) * 0.5);
		--internal-pill-font-size: 0.875rem;
	}

	.medium {
		--internal-pill-padding-y: calc(var(--spacing) * 0.375);
		--internal-pill-padding-x: calc(var(--spacing) * 0.75);
		--internal-pill-font-size: 1rem;
	}

	.large {
		--internal-pill-padding-y: calc(var(--spacing) * 0.5);
		--internal-pill-padding-x: calc(var(--spacing) * 1);
		--internal-pill-font-size: 1.125rem;
	}

	.x-large {
		--internal-pill-padding-y: calc(var(--spacing) * 0.625);
		--internal-pill-padding-x: calc(var(--spacing) * 1.25);
		--internal-pill-font-size: 1.25rem;
	}

	/* Color mappings - set current color variables per color class */
	.primary {
		--internal-current-color: var(--color-primary);
		--internal-current-color-soft: var(--color-primary-soft);
		--internal-current-contrast: var(--color-primary-contrast);
	}

	.secondary {
		--internal-current-color: var(--color-secondary);
		--internal-current-color-soft: var(--color-secondary-soft);
		--internal-current-contrast: var(--color-secondary-contrast);
	}

	.success {
		--internal-current-color: var(--color-success);
		--internal-current-color-soft: var(--color-success-soft);
		--internal-current-contrast: var(--color-success-contrast);
	}

	.warning {
		--internal-current-color: var(--color-warning);
		--internal-current-color-soft: var(--color-warning-soft);
		--internal-current-contrast: var(--color-warning-contrast);
	}

	.danger {
		--internal-current-color: var(--color-danger);
		--internal-current-color-soft: var(--color-danger-soft);
		--internal-current-contrast: var(--color-danger-contrast);
	}

	.info {
		--internal-current-color: var(--color-info);
		--internal-current-color-soft: var(--color-info-soft);
		--internal-current-contrast: var(--color-info-contrast);
	}

	.foreground {
		--internal-current-color: var(--color-foreground);
		--internal-current-color-soft: var(--color-background-saturated);
		--internal-current-contrast: var(--color-background);
	}

	.background {
		--internal-current-color: var(--color-background);
		--internal-current-color-soft: var(--color-foreground-saturated);
		--internal-current-contrast: var(--color-foreground);
	}

	/* Filled variant */
	.filled {
		background-color: var(--internal-current-color);
		color: var(--internal-current-contrast);
	}

	/* Soft variant */
	.soft {
		background-color: var(--internal-current-color-soft);
		color: var(--internal-current-color);
	}

	/* Ghost variant */
	.ghost {
		background-color: transparent;
		color: var(--internal-current-color);
	}
</style>
