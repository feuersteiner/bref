<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { SliderProps } from './types.ts';

	const {
		value,
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		wide = false,
		size = 'medium',
		color = 'primary',
		onChange,
		...rest
	}: SliderProps &
		Omit<
			SvelteHTMLElements['input'],
			'value' | 'step' | 'min' | 'max' | 'disabled' | 'size'
		> = $props();

	const ratio = $derived((value - min) / (max - min));

	const handleInput = (e: Event) => {
		const newValue = Number((e.currentTarget as HTMLInputElement).value);
		onChange(newValue);
	};
</script>

<div class="track {size} {color}" class:wide class:disabled>
	<div
		class="fill"
		style:width="calc({ratio} * (100% - var(--internal-track-height)) + var(--internal-track-height) /
		2)"
	></div>
	<input {...rest} type="range" {min} {max} {step} {value} {disabled} oninput={handleInput} />
</div>

<style>
	.track {
		--internal-track-height: 0.5rem;
		--internal-color: var(--color-primary);
		--internal-color-soft: var(--color-primary-soft);
		--internal-thumb-color: var(--color-primary-saturated);

		position: relative;
		min-width: 7.5rem;
		height: var(--internal-track-height);
		background: var(--internal-color-soft);
		border-radius: calc(var(--internal-track-height) / 2);
	}

	.track.wide {
		width: 100%;
	}

	/* Color variants */
	.track.primary {
		--internal-color: var(--color-primary);
		--internal-color-soft: var(--color-primary-soft);
		--internal-thumb-color: var(--color-primary-saturated);
	}

	.track.foreground {
		--internal-color: var(--color-foreground);
		--internal-color-soft: var(--color-foreground-soft);
		--internal-thumb-color: var(--color-foreground-saturated);
	}

	/* Size variants */
	.track.x-small {
		--internal-track-height: 0.25rem;
	}

	.track.small {
		--internal-track-height: 0.375rem;
	}

	.track.medium {
		--internal-track-height: 0.5rem;
	}

	.track.large {
		--internal-track-height: 0.625rem;
	}

	.track.x-large {
		--internal-track-height: 0.75rem;
	}

	/* Fill bar */
	.fill {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: var(--internal-color);
		border-radius: calc(var(--internal-track-height) / 2) 0 0 calc(var(--internal-track-height) / 2);
		pointer-events: none;
	}

	/* Input */
	input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		outline: none;
		cursor: pointer;
	}

	input:focus-visible {
		outline: 0.1rem solid var(--internal-color);
		outline-offset: 0.2rem;
	}

	/* Webkit thumb */
	input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: var(--internal-track-height);
		height: var(--internal-track-height);
		border-radius: 50%;
		background: var(--internal-thumb-color);
		cursor: pointer;
		border: none;
		box-shadow: 0 0.03rem 0.125rem rgba(0, 0, 0, 0.08);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	input::-webkit-slider-thumb:hover {
		transform: scale(1.2);
		box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
	}

	input::-webkit-slider-thumb:active {
		transform: scale(1.1);
	}

	/* Firefox thumb */
	input::-moz-range-thumb {
		width: var(--internal-track-height);
		height: var(--internal-track-height);
		border-radius: 50%;
		background: var(--internal-thumb-color);
		cursor: pointer;
		border: none;
		box-shadow: 0 0.03rem 0.125rem rgba(0, 0, 0, 0.08);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	input::-moz-range-thumb:hover {
		transform: scale(1.2);
		box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
	}

	input::-moz-range-thumb:active {
		transform: scale(1.1);
	}

	/* Firefox track */
	input::-moz-range-track {
		background: transparent;
	}

	/* Disabled state */
	.track.disabled {
		opacity: 0.4;
	}

	.track.disabled input {
		cursor: not-allowed;
	}

	.track.disabled input::-webkit-slider-thumb {
		cursor: not-allowed;
	}

	.track.disabled input::-moz-range-thumb {
		cursor: not-allowed;
	}
</style>
