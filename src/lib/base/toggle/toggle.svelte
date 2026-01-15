<script lang="ts">
	import type { ToggleProps } from './types.ts';

	const {
		checked = false,
		disabled = false,
		size = 'medium',
		onChange
	}: ToggleProps = $props();

	const handleClick = () => {
		if (!disabled) {
			onChange(!checked);
		}
	};
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class={size}
	class:checked
	class:disabled
	role="switch"
	aria-checked={checked}
	aria-disabled={disabled}
	onclick={handleClick}
>
	<span></span>
</div>

<style>
	div {
		--internal-track-width: 2.5rem;
		--internal-track-height: 1.5rem;
		--internal-thumb-size: 1.125rem;
		--internal-thumb-offset: 0.1875rem;

		position: relative;
		width: var(--internal-track-width);
		height: var(--internal-track-height);
		background: var(--color-foreground-soft);
		border-radius: calc(var(--internal-track-height) / 2);
		cursor: pointer;
		transition: background 0.2s ease;
	}

	div.checked {
		background: var(--color-primary);
	}

	/* Size variants */
	div.x-small {
		--internal-track-width: 1.5rem;
		--internal-track-height: 0.875rem;
		--internal-thumb-size: 0.625rem;
		--internal-thumb-offset: 0.125rem;
	}

	div.small {
		--internal-track-width: 2rem;
		--internal-track-height: 1.25rem;
		--internal-thumb-size: 0.875rem;
		--internal-thumb-offset: 0.1875rem;
	}

	div.medium {
		--internal-track-width: 2.5rem;
		--internal-track-height: 1.5rem;
		--internal-thumb-size: 1.125rem;
		--internal-thumb-offset: 0.1875rem;
	}

	div.large {
		--internal-track-width: 3rem;
		--internal-track-height: 1.75rem;
		--internal-thumb-size: 1.375rem;
		--internal-thumb-offset: 0.1875rem;
	}

	div.x-large {
		--internal-track-width: 3.5rem;
		--internal-track-height: 2rem;
		--internal-thumb-size: 1.625rem;
		--internal-thumb-offset: 0.1875rem;
	}

	span {
		position: absolute;
		top: var(--internal-thumb-offset);
		left: var(--internal-thumb-offset);
		width: var(--internal-thumb-size);
		height: var(--internal-thumb-size);
		background: var(--color-background);
		border-radius: 50%;
		transition: left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	div.checked span {
		left: calc(
			var(--internal-track-width) - var(--internal-thumb-size) - var(--internal-thumb-offset)
		);
	}

	div.disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
</style>
