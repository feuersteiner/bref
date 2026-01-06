<script lang="ts">
	import type { TreeViewProps } from './types.ts';
	import TreeNode from './tree-node.svelte';

	let {
		data,
		size = 'medium',
		onSelect,
		selectedIds,
		wide,
		filledIcon,
		expandOnSelect
	}: TreeViewProps = $props();
</script>

<div role="tree" class={size} class:wide>
	{#each data as node (node.id)}
		<TreeNode
			{node}
			level={0}
			{size}
			{onSelect}
			{selectedIds}
			{wide}
			{filledIcon}
			{expandOnSelect}
		/>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}

	.wide {
		width: 100%;
	}

	.x-small {
		gap: 0.125rem;
	}
	.small {
		gap: 0.25rem;
	}
	.medium {
		gap: 0.5rem;
	}
	.large {
		gap: 0.75rem;
	}
	.x-large {
		gap: 1rem;
	}
</style>
