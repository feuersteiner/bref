<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { IconButtonProps } from './types.ts';
	import Icon from '../icon/icon.svelte';

	const {
		icon,
		size = 'medium',
		color = 'primary',
		variant = 'filled',
		disabled = false,
		rounded = false,
		onClick,
		...rest
	}: IconButtonProps & SvelteHTMLElements['button'] = $props();
</script>

<button {...rest} class={`${size} ${color} ${variant}`} class:rounded {disabled} onclick={onClick}>
	<Icon
		name={icon.name}
		contrastMode={variant === 'filled'}
		{color}
		filled={icon.filled}
		ariaLabel={icon.ariaLabel}
		{size}
	/>
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			transform 0.08s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	button:not(:disabled):active {
		transform: scale(0.95);
	}

	/* Sizes */
	.x-small {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: calc(var(--border-radius) * 0.5);
	}
	.small {
		width: 2rem;
		height: 2rem;
		border-radius: calc(var(--border-radius) * 0.65);
	}
	.medium {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--border-radius);
	}
	.large {
		width: 3rem;
		height: 3rem;
		border-radius: calc(var(--border-radius) * 1.25);
	}
	.x-large {
		width: 4rem;
		height: 4rem;
		border-radius: calc(var(--border-radius) * 1.5);
	}

	.rounded {
		border-radius: 50%;
	}

	/* Filled variant */
	.filled.primary {
		background-color: var(--color-primary-base);
		color: var(--color-primary-contrast);
	}
	.filled.primary:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-primary-base) 85%, black);
	}
	.filled.primary:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-primary-base) 70%, black);
	}
	.filled.secondary {
		background-color: var(--color-secondary-base);
		color: var(--color-secondary-contrast);
	}
	.filled.secondary:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-secondary-base) 85%, black);
	}
	.filled.secondary:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-secondary-base) 70%, black);
	}
	.filled.success {
		background-color: var(--color-success-base);
		color: var(--color-success-contrast);
	}
	.filled.success:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-success-base) 85%, black);
	}
	.filled.success:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-success-base) 70%, black);
	}
	.filled.warning {
		background-color: var(--color-warning-base);
		color: var(--color-warning-contrast);
	}
	.filled.warning:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-warning-base) 85%, black);
	}
	.filled.warning:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-warning-base) 70%, black);
	}
	.filled.danger {
		background-color: var(--color-danger-base);
		color: var(--color-danger-contrast);
	}
	.filled.danger:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-danger-base) 85%, black);
	}
	.filled.danger:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-danger-base) 70%, black);
	}
	.filled.info {
		background-color: var(--color-info-base);
		color: var(--color-info-contrast);
	}
	.filled.info:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-info-base) 85%, black);
	}
	.filled.info:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-info-base) 70%, black);
	}
	.filled.foreground {
		background-color: var(--color-foreground);
		color: var(--color-background);
	}
	.filled.foreground:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-foreground) 85%, black);
	}
	.filled.foreground:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-foreground) 70%, black);
	}
	.filled.background {
		background-color: var(--color-background);
		color: var(--color-foreground);
	}
	.filled.background:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-background) 85%, black);
	}
	.filled.background:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-background) 70%, black);
	}

	/* Soft variant */
	.soft.primary {
		background-color: var(--color-primary-soft);
		color: var(--color-primary-base);
	}
	.soft.primary:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-primary-soft) 85%, black);
	}
	.soft.primary:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-primary-soft) 70%, black);
	}
	.soft.secondary {
		background-color: var(--color-secondary-soft);
		color: var(--color-secondary-base);
	}
	.soft.secondary:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-secondary-soft) 85%, black);
	}
	.soft.secondary:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-secondary-soft) 70%, black);
	}
	.soft.success {
		background-color: var(--color-success-soft);
		color: var(--color-success-base);
	}
	.soft.success:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-success-soft) 85%, black);
	}
	.soft.success:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-success-soft) 70%, black);
	}
	.soft.warning {
		background-color: var(--color-warning-soft);
		color: var(--color-warning-base);
	}
	.soft.warning:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-warning-soft) 85%, black);
	}
	.soft.warning:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-warning-soft) 70%, black);
	}
	.soft.danger {
		background-color: var(--color-danger-soft);
		color: var(--color-danger-base);
	}
	.soft.danger:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-danger-soft) 85%, black);
	}
	.soft.danger:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-danger-soft) 70%, black);
	}
	.soft.info {
		background-color: var(--color-info-soft);
		color: var(--color-info-base);
	}
	.soft.info:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-info-soft) 85%, black);
	}
	.soft.info:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-info-soft) 70%, black);
	}
	.soft.foreground {
		background-color: var(--color-foreground-soft);
		color: var(--color-foreground);
	}
	.soft.foreground:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-foreground-soft) 85%, black);
	}
	.soft.foreground:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-foreground-soft) 70%, black);
	}
	.soft.background {
		background-color: var(--color-background-soft);
		color: var(--color-background);
	}
	.soft.background:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-background-soft) 85%, black);
	}
	.soft.background:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-background-soft) 70%, black);
	}

	/* Ghost variant */
	.ghost {
		background-color: transparent;
	}
	.ghost.primary {
		color: var(--color-primary-base);
	}
	.ghost.primary:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-primary-soft) 50%, transparent);
	}
	.ghost.primary:not(:disabled):active {
		background-color: var(--color-primary-soft);
	}
	.ghost.secondary {
		color: var(--color-secondary-base);
	}
	.ghost.secondary:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-secondary-soft) 50%, transparent);
	}
	.ghost.secondary:not(:disabled):active {
		background-color: var(--color-secondary-soft);
	}
	.ghost.success {
		color: var(--color-success-base);
	}
	.ghost.success:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-success-soft) 50%, transparent);
	}
	.ghost.success:not(:disabled):active {
		background-color: var(--color-success-soft);
	}
	.ghost.warning {
		color: var(--color-warning-base);
	}
	.ghost.warning:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-warning-soft) 50%, transparent);
	}
	.ghost.warning:not(:disabled):active {
		background-color: var(--color-warning-soft);
	}
	.ghost.danger {
		color: var(--color-danger-base);
	}
	.ghost.danger:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-danger-soft) 50%, transparent);
	}
	.ghost.danger:not(:disabled):active {
		background-color: var(--color-danger-soft);
	}
	.ghost.info {
		color: var(--color-info-base);
	}
	.ghost.info:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-info-soft) 50%, transparent);
	}
	.ghost.info:not(:disabled):active {
		background-color: var(--color-info-soft);
	}
	.ghost.foreground {
		color: var(--color-foreground);
	}
	.ghost.foreground:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-foreground-soft) 50%, transparent);
	}
	.ghost.foreground:not(:disabled):active {
		background-color: var(--color-foreground-soft);
	}
	.ghost.background {
		color: var(--color-background);
	}
	.ghost.background:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-background-soft) 50%, transparent);
	}
	.ghost.background:not(:disabled):active {
		background-color: var(--color-background-soft);
	}
</style>
