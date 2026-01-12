<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import type { SelectProps } from './types.ts';

	let {
		value,
		options,
		placeholder = 'Select...',
		disabled = false,
		onChange,
		wide = false,
		startIcon,
		size = 'medium'
	}: SelectProps = $props();

	const handleChange = (e: Event) => onChange((e.currentTarget as HTMLSelectElement).value);

	let select: HTMLSelectElement;

	const triggerDropDown = (e: MouseEvent) => {
		e.stopPropagation();
		if (disabled) return;
		select.focus();
		select.showPicker();
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class={size} class:wide class:disabled onclick={triggerDropDown}>
	{#if startIcon}
		<Icon {...startIcon} {size} />
	{/if}
	<select
		{disabled}
		{value}
		onchange={handleChange}
		onclick={(e) => e.stopPropagation()}
		bind:this={select}
	>
		{#if placeholder && !value}
			<option value="" disabled selected>{placeholder}</option>
		{/if}
		{#each options as option}
			<option value={option.value}>
				{option.label}
			</option>
		{/each}
	</select>
	<Icon name="arrow_drop_down" {size} onclick={triggerDropDown} />
</div>

<style>
	div {
		--internal-select-bg-opacity: 5%;
		--internal-select-hover-opacity: 7%;
		--internal-select-padding-y: calc(var(--spacing) * 0.5);
		--internal-select-padding-x: calc(var(--spacing) * 0.75);
		--internal-select-radius: calc(var(--border-radius) * 1);

		display: flex;
		cursor: pointer;
		align-items: center;
		gap: 0.25rem;
		flex-shrink: 0;
		padding: var(--internal-select-padding-y) var(--internal-select-padding-x);
		border-radius: var(--internal-select-radius);
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-select-bg-opacity),
			transparent
		);
		transition: background-color 0.15s ease;
	}

	div:hover:not(.disabled) {
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-select-hover-opacity),
			transparent
		);
	}

	div.wide {
		width: 100%;
		flex-shrink: 1;
	}

	div.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	div.disabled select {
		cursor: not-allowed;
	}

	/* Size variants */
	div.x-small {
		--internal-select-padding-y: calc(var(--spacing) * 0.25);
		--internal-select-padding-x: calc(var(--spacing) * 0.5);
		--internal-select-radius: calc(var(--border-radius) * 0.75);
		--select-font-size: 0.75rem;
	}

	div.small {
		--internal-select-padding-y: calc(var(--spacing) * 0.375);
		--internal-select-padding-x: calc(var(--spacing) * 0.75);
		--internal-select-radius: var(--border-radius);
		--select-font-size: 0.875rem;
	}

	div.medium {
		--internal-select-padding-y: calc(var(--spacing) * 0.5);
		--internal-select-padding-x: calc(var(--spacing) * 1);
		--internal-select-radius: calc(var(--border-radius) * 1.25);
		--select-font-size: 1rem;
	}

	div.large {
		--internal-select-padding-y: calc(var(--spacing) * 0.625);
		--internal-select-padding-x: calc(var(--spacing) * 1.25);
		--internal-select-radius: calc(var(--border-radius) * 1.5);
		--select-font-size: 1.125rem;
	}

	div.x-large {
		--internal-select-padding-y: calc(var(--spacing) * 0.75);
		--internal-select-padding-x: calc(var(--spacing) * 1.5);
		--internal-select-radius: calc(var(--border-radius) * 2);
		--select-font-size: 1.25rem;
	}

	select {
		all: unset;
		font-size: var(--select-font-size);
		flex: 1;
	}
</style>
