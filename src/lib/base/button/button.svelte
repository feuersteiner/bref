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
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		border: none;
		cursor: pointer;
		font-weight: 600;
		transition:
			background-color 0.15s ease,
			transform 0.08s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	span {
		cursor: inherit;
		color: inherit;
		display: inline-block;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	button:not(:disabled):active {
		transform: scale(0.98);
	}

	.wide {
		width: 100%;
	}

	/* Sizes */
	.x-small {
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		border-radius: calc(var(--border-radius) * 0.75);
	}
	.small {
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		border-radius: calc(var(--border-radius));
	}
	.medium {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border-radius: calc(var(--border-radius) * 1.25);
	}
	.large {
		padding: 0.625rem 1.25rem;
		font-size: 1.125rem;
		border-radius: calc(var(--border-radius) * 1.5);
	}
	.x-large {
		padding: 0.75rem 1.5rem;
		font-size: 1.25rem;
		border-radius: calc(var(--border-radius) * 2);
	}

	/* Filled variant */
	.filled.primary {
		background-color: var(--color-primary);
		color: var(--color-primary-contrast);
	}
	.filled.primary:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-primary) 85%, var(--hover-mix));
	}
	.filled.primary:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-primary) 70%, var(--hover-mix));
	}
	.filled.secondary {
		background-color: var(--color-secondary);
		color: var(--color-secondary-contrast);
	}
	.filled.secondary:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-secondary) 85%, var(--hover-mix));
	}
	.filled.secondary:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-secondary) 70%, var(--hover-mix));
	}
	.filled.success {
		background-color: var(--color-success);
		color: var(--color-success-contrast);
	}
	.filled.success:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-success) 85%, var(--hover-mix));
	}
	.filled.success:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-success) 70%, var(--hover-mix));
	}
	.filled.warning {
		background-color: var(--color-warning);
		color: var(--color-warning-contrast);
	}
	.filled.warning:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-warning) 85%, var(--hover-mix));
	}
	.filled.warning:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-warning) 70%, var(--hover-mix));
	}
	.filled.danger {
		background-color: var(--color-danger);
		color: var(--color-danger-contrast);
	}
	.filled.danger:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-danger) 85%, var(--hover-mix));
	}
	.filled.danger:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-danger) 70%, var(--hover-mix));
	}
	.filled.info {
		background-color: var(--color-info);
		color: var(--color-info-contrast);
	}
	.filled.info:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-info) 85%, var(--hover-mix));
	}
	.filled.info:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-info) 70%, var(--hover-mix));
	}
	.filled.foreground {
		background-color: var(--color-foreground);
		color: var(--color-background);
	}
	.filled.foreground:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-foreground) 85%, var(--hover-mix));
	}
	.filled.foreground:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-foreground) 70%, var(--hover-mix));
	}
	.filled.background {
		background-color: var(--color-background);
		color: var(--color-foreground);
	}
	.filled.background:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-background) 85%, var(--hover-mix));
	}
	.filled.background:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-background) 70%, var(--hover-mix));
	}

	/* Soft variant */
	.soft.primary {
		background-color: var(--color-primary-soft);
		color: var(--color-primary);
	}
	.soft.primary:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-primary-soft) 85%, var(--hover-mix));
	}
	.soft.primary:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-primary-soft) 70%, var(--hover-mix));
	}
	.soft.secondary {
		background-color: var(--color-secondary-soft);
		color: var(--color-secondary);
	}
	.soft.secondary:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-secondary-soft) 85%, var(--hover-mix));
	}
	.soft.secondary:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-secondary-soft) 70%, var(--hover-mix));
	}
	.soft.success {
		background-color: var(--color-success-soft);
		color: var(--color-success);
	}
	.soft.success:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-success-soft) 85%, var(--hover-mix));
	}
	.soft.success:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-success-soft) 70%, var(--hover-mix));
	}
	.soft.warning {
		background-color: var(--color-warning-soft);
		color: var(--color-warning);
	}
	.soft.warning:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-warning-soft) 85%, var(--hover-mix));
	}
	.soft.warning:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-warning-soft) 70%, var(--hover-mix));
	}
	.soft.danger {
		background-color: var(--color-danger-soft);
		color: var(--color-danger);
	}
	.soft.danger:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-danger-soft) 85%, var(--hover-mix));
	}
	.soft.danger:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-danger-soft) 70%, var(--hover-mix));
	}
	.soft.info {
		background-color: var(--color-info-soft);
		color: var(--color-info);
	}
	.soft.info:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-info-soft) 85%, var(--hover-mix));
	}
	.soft.info:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-info-soft) 70%, var(--hover-mix));
	}
	.soft.foreground {
		background-color: var(--color-foreground-soft);
		color: var(--color-foreground);
	}
	.soft.foreground:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-foreground-soft) 85%, var(--hover-mix));
	}
	.soft.foreground:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-foreground-soft) 70%, var(--hover-mix));
	}
	.soft.background {
		background-color: var(--color-background-soft);
		color: var(--color-background);
	}
	.soft.background:not(:disabled):hover {
		background-color: color-mix(in oklch, var(--color-background-soft) 85%, var(--hover-mix));
	}
	.soft.background:not(:disabled):active {
		background-color: color-mix(in oklch, var(--color-background-soft) 70%, var(--hover-mix));
	}

	/* Ghost variant */
	.ghost {
		background-color: transparent;
	}
	.ghost.primary {
		color: var(--color-primary);
	}
	.ghost.primary:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-primary-soft) 50%, transparent);
	}
	.ghost.primary:not(:disabled):active {
		background-color: var(--color-primary-soft);
	}
	.ghost.secondary {
		color: var(--color-secondary);
	}
	.ghost.secondary:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-secondary-soft) 50%, transparent);
	}
	.ghost.secondary:not(:disabled):active {
		background-color: var(--color-secondary-soft);
	}
	.ghost.success {
		color: var(--color-success);
	}
	.ghost.success:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-success-soft) 50%, transparent);
	}
	.ghost.success:not(:disabled):active {
		background-color: var(--color-success-soft);
	}
	.ghost.warning {
		color: var(--color-warning);
	}
	.ghost.warning:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-warning-soft) 50%, transparent);
	}
	.ghost.warning:not(:disabled):active {
		background-color: var(--color-warning-soft);
	}
	.ghost.danger {
		color: var(--color-danger);
	}
	.ghost.danger:not(:disabled):hover {
		background-color: color-mix(in srgb, var(--color-danger-soft) 50%, transparent);
	}
	.ghost.danger:not(:disabled):active {
		background-color: var(--color-danger-soft);
	}
	.ghost.info {
		color: var(--color-info);
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
