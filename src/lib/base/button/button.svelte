<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { ButtonProps } from './types.ts';
	import Icon from '../icon/icon.svelte';

	const {
		label,
		size = 'medium',
		color = 'primary',
		variant = 'filled',
		disabled = false,
		wide = false,
		icon,
		onClick,
		...rest
	}: ButtonProps & SvelteHTMLElements['button'] = $props();
</script>

<button {...rest} class={`${size} ${color} ${variant}`} class:wide {disabled} onclick={onClick}>
	{#if icon}
		<Icon
			name={icon.name}
			contrastMode={variant === 'filled'}
			{color}
			filled={icon.filled}
			ariaLabel={icon.ariaLabel}
			{size}
		/>
	{/if}
	<span>{label}</span>
</button>

<style>
	button {
		/* Button interaction variables */
		--internal-btn-transition-bg: 0.15s;
		--internal-btn-transition-transform: 0.08s;
		--internal-btn-scale-active: 0.98;
		--internal-btn-disabled-opacity: 0.5;

		/* Color mix percentages */
		--internal-btn-hover-mix: 85%;
		--internal-btn-active-mix: 70%;
		--internal-btn-ghost-hover-opacity: 10%;
		--internal-btn-ghost-active-opacity: 25%;

		/* Size defaults (medium) */
		--internal-btn-padding-y: calc(var(--spacing) * 0.5);
		--internal-btn-padding-x: calc(var(--spacing) * 1);
		--internal-btn-font-size: 1rem;
		--internal-btn-radius: calc(var(--border-radius) * 1.25);

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		border: none;
		cursor: pointer;
		font-weight: 500;
		padding: var(--internal-btn-padding-y) var(--internal-btn-padding-x);
		font-size: var(--internal-btn-font-size);
		border-radius: var(--internal-btn-radius);
		transition:
			background-color var(--internal-btn-transition-bg) ease,
			transform var(--internal-btn-transition-transform) cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	span {
		cursor: inherit;
		color: inherit;
		display: inline-block;
	}

	button:disabled {
		opacity: var(--internal-btn-disabled-opacity);
		cursor: not-allowed;
	}

	button:not(:disabled):active {
		transform: scale(var(--internal-btn-scale-active));
	}

	.wide {
		width: 100%;
	}

	/* Sizes */
	.x-small {
		--internal-btn-padding-y: calc(var(--spacing) * 0.25);
		--internal-btn-padding-x: calc(var(--spacing) * 0.5);
		--internal-btn-font-size: 0.75rem;
		--internal-btn-radius: calc(var(--border-radius) * 0.75);
	}

	.small {
		--internal-btn-padding-y: calc(var(--spacing) * 0.375);
		--internal-btn-padding-x: calc(var(--spacing) * 0.75);
		--internal-btn-font-size: 0.875rem;
		--internal-btn-radius: var(--border-radius);
	}

	.medium {
		--internal-btn-padding-y: calc(var(--spacing) * 0.5);
		--internal-btn-padding-x: calc(var(--spacing) * 1);
		--internal-btn-font-size: 1rem;
		--internal-btn-radius: calc(var(--border-radius) * 1.25);
	}

	.large {
		--internal-btn-padding-y: calc(var(--spacing) * 0.625);
		--internal-btn-padding-x: calc(var(--spacing) * 1.25);
		--internal-btn-font-size: 1.125rem;
		--internal-btn-radius: calc(var(--border-radius) * 1.5);
	}

	.x-large {
		--internal-btn-padding-y: calc(var(--spacing) * 0.75);
		--internal-btn-padding-x: calc(var(--spacing) * 1.5);
		--internal-btn-font-size: 1.25rem;
		--internal-btn-radius: calc(var(--border-radius) * 2);
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
		--internal-current-color-soft: var(--color-foreground-soft);
		--internal-current-contrast: var(--color-background);
	}

	.background {
		--internal-current-color: var(--color-background);
		--internal-current-color-soft: var(--color-background-soft);
		--internal-current-contrast: var(--color-foreground);
	}

	/* Filled variant */
	.filled {
		background-color: var(--internal-current-color);
		color: var(--internal-current-contrast);
	}

	.filled:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--internal-current-color) var(--internal-btn-hover-mix), black);
	}

	.filled:not(:disabled):active {
		background-color: color-mix(in oklch, var(--internal-current-color) var(--internal-btn-active-mix), black);
	}

	/* Soft variant */
	.soft {
		background-color: var(--internal-current-color-soft);
		color: var(--internal-current-color);
	}

	.soft:not(:disabled):hover {
		background-color: color-mix(
			in oklch,
			var(--internal-current-color-soft) var(--internal-btn-hover-mix),
			var(--internal-current-color)
		);
	}

	.soft:not(:disabled):active {
		background-color: color-mix(
			in oklch,
			var(--internal-current-color-soft) var(--internal-btn-active-mix),
			var(--internal-current-color)
		);
	}

	/* Ghost variant */
	.ghost {
		background-color: transparent;
		color: var(--internal-current-color);
	}

	.ghost:not(:disabled):hover {
		background-color: color-mix(
			in srgb,
			var(--internal-current-color) var(--internal-btn-ghost-hover-opacity),
			var(--color-background)
		);
	}

	.ghost:not(:disabled):active {
		background-color: color-mix(
			in srgb,
			var(--internal-current-color) var(--internal-btn-ghost-active-opacity),
			var(--color-background)
		);
	}
</style>
