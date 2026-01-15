<script lang="ts">
	import type { PillSelectionProps } from './types.ts';
	import Pill from '../pill/pill.svelte';

	const {
		items,
		selection,
		onSelect,
		maxSelectionLength,
		disableOthersOnFull = false,
		size = 'medium',
		color = 'primary'
	}: PillSelectionProps = $props();

	const isFull = $derived(
		maxSelectionLength !== undefined && selection.length >= maxSelectionLength
	);

	const handleClick = (id: string) => {
		const selected = selection.includes(id);
		if (selected) onSelect(selection.filter((s) => s !== id));
		else if (isFull && !disableOthersOnFull) onSelect([...selection.slice(1), id]);
		else if (!isFull) onSelect([...selection, id]);
	};
</script>

<div>
	{#each items as item}
		{@const selected = selection.includes(item.id)}
		<Pill
			label={item.label}
			icon={item.icon}
			{size}
			{color}
			variant={selected ? 'filled' : 'soft'}
			disabled={disableOthersOnFull && isFull && !selected}
			onClick={() => handleClick(item.id)}
		/>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
