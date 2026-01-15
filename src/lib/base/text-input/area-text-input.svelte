<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { AreaTextInputProps } from './types.ts';

	const {
		value,
		placeholder,
		disabled = false,
		onChange,
		wide = false,
		rows = 3,
		resizable = true,
		...rest
	}: AreaTextInputProps & Omit<SvelteHTMLElements['textarea'], 'value'> = $props();

	const handleInput = (e: Event) => {
		const newValue = (e.currentTarget as HTMLTextAreaElement).value;
		onChange(newValue);
	};
</script>

<div class:wide class:disabled class:resizable>
	<textarea {...rest} {placeholder} {disabled} {rows} {value} oninput={handleInput}></textarea>
</div>

<style>
	div {
		--internal-textarea-bg-opacity: 3%;
		--internal-textarea-hover-opacity: 7%;
		--internal-textarea-disabled-opacity: 0.5;
		--internal-textarea-padding-y: calc(var(--spacing) * 0.5);
		--internal-textarea-padding-x: calc(var(--spacing) * 0.75);
		--internal-textarea-radius: calc(var(--border-radius) * 1);

		display: inline-flex;
		padding: var(--internal-textarea-padding-y) var(--internal-textarea-padding-x);
		border-radius: var(--internal-textarea-radius);
		margin: 3px;
		flex-shrink: 0;
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-textarea-bg-opacity),
			transparent
		);
		transition:
			background-color 0.15s ease,
			outline-color 0.15s ease;
	}

	div:hover:not(.disabled) {
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-textarea-hover-opacity),
			transparent
		);
	}

	div:focus-within {
		outline: 2px solid var(--color-primary);
		outline-offset: 1px;
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-textarea-hover-opacity),
			transparent
		);
	}

	textarea {
		flex: 1;
		border: none;
		background: transparent;
		color: var(--color-foreground);
		font-size: 1rem;
		font-family: inherit;
		outline: none;
		min-width: 0;
		resize: none;
		line-height: 1.5;
	}

	.resizable textarea {
		resize: vertical;
	}

	textarea::placeholder {
		color: var(--color-foreground);
		opacity: 0.5;
	}

	/* Wide */
	div.wide {
		width: 100%;
		flex-shrink: 1;
	}

	/* Disabled */
	.disabled {
		opacity: var(--internal-textarea-disabled-opacity);
		cursor: not-allowed;
	}

	.disabled textarea {
		cursor: not-allowed;
	}
</style>
