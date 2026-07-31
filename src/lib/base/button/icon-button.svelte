<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { IconButtonProps } from './types.ts';
	import { BUTTON_COLOR_VARIABLES } from './color-variables.ts';
	import Icon from '../icon/icon.svelte';

	const {
		name,
		filled,
		ariaLabel,
		size = 'medium',
		color = 'primary',
		variant = 'filled',
		disabled = false,
		rounded = false,
		onClick,
		style,
		...rest
	}: IconButtonProps & SvelteHTMLElements['button'] = $props();

	const iconColor = $derived(color === 'background' && variant === 'ghost' ? 'foreground' : color);
</script>

<button
	{...rest}
	class={`${size} ${color} ${variant}`}
	class:rounded
	style={`${BUTTON_COLOR_VARIABLES[color]}; ${style ?? ''}`}
	{disabled}
	onclick={onClick}
>
	<Icon {name} contrastMode={variant === 'filled'} color={iconColor} {filled} {ariaLabel} {size} />
</button>

<style>
	button {
		/* Button interaction variables */
		--internal-btn-transition-bg: 0.15s;
		--internal-btn-transition-transform: 0.08s;
		--internal-btn-scale-active: 0.95;
		--internal-btn-disabled-opacity: 0.5;

		/* Color mix percentages */
		--internal-btn-hover-mix: 85%;
		--internal-btn-active-mix: 70%;
		--internal-btn-ghost-hover-opacity: 10%;
		--internal-btn-ghost-active-opacity: 20%;

		/* Size defaults (medium) */
		--internal-btn-size: calc(var(--spacing) * 2.5);
		--internal-btn-radius: calc(var(--border-radius) * 1.25);

		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		flex-shrink: 0;
		cursor: pointer;
		width: var(--internal-btn-size);
		height: var(--internal-btn-size);
		border-radius: var(--internal-btn-radius);
		transition:
			background-color var(--internal-btn-transition-bg) ease,
			transform var(--internal-btn-transition-transform) cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	button:disabled {
		opacity: var(--internal-btn-disabled-opacity);
		cursor: not-allowed;
	}

	button:not(:disabled):active {
		transform: scale(var(--internal-btn-scale-active));
	}

	/* Sizes */
	.x-small {
		--internal-btn-size: calc(var(--spacing) * 1.5);
		--internal-btn-radius: calc(var(--border-radius) * 0.75);
	}

	.small {
		--internal-btn-size: calc(var(--spacing) * 2);
		--internal-btn-radius: var(--border-radius);
	}

	.medium {
		--internal-btn-size: calc(var(--spacing) * 2.5);
		--internal-btn-radius: calc(var(--border-radius) * 1.25);
	}

	.large {
		--internal-btn-size: calc(var(--spacing) * 3);
		--internal-btn-radius: calc(var(--border-radius) * 1.5);
	}

	.x-large {
		--internal-btn-size: calc(var(--spacing) * 4);
		--internal-btn-radius: calc(var(--border-radius) * 2);
	}

	.rounded {
		border-radius: 50%;
	}

	/* Filled variant */
	.filled {
		background-color: var(--internal-current-color);
		color: var(--internal-current-contrast);
	}

	.filled:not(:disabled):hover {
		background-color: color-mix(
			in oklch,
			var(--internal-current-color) var(--internal-btn-hover-mix),
			var(--color-foreground-saturated)
		);
	}

	.filled:not(:disabled):active {
		background-color: color-mix(
			in oklch,
			var(--internal-current-color) var(--internal-btn-active-mix),
			var(--color-foreground-saturated)
		);
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
			var(--color-background)
		);
	}

	.soft:not(:disabled):active {
		background-color: color-mix(
			in oklch,
			var(--internal-current-color-soft) var(--internal-btn-active-mix),
			var(--color-background)
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

	/* Background color ghost variant needs inverted hover colors */
	.background.ghost:not(:disabled):hover {
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-btn-ghost-hover-opacity),
			var(--color-background)
		);
	}

	.background.ghost:not(:disabled):active {
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-btn-ghost-active-opacity),
			var(--color-background)
		);
	}

	/* Public neutral aliases need their own visible interaction treatment. */
	.background.ghost {
		color: var(--color-foreground);
	}

	.foreground.soft:not(:disabled):hover {
		background-color: var(--color-background-soft);
	}

	.foreground.soft:not(:disabled):active {
		background-color: color-mix(
			in oklch,
			var(--color-background-soft) 75%,
			var(--color-foreground)
		);
	}
</style>
