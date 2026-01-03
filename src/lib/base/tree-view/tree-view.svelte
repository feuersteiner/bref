<script lang="ts">
	import type { TreeViewProps, NodeDataProps } from './types.ts';
	import TreeNode from './tree-node.svelte';

	let { data, size = 'medium', onSelectionChange, multiSelect }: TreeViewProps = $props();

	let selectedIds = $state<Set<string>>(new Set());

	const updateSelection = (newValue: Set<string>) => {
		selectedIds = new Set(newValue);
		onSelectionChange?.(new Set(selectedIds));
	};

	const handleSingleSelect = (node: NodeDataProps, isSelected: boolean) => {
		const newSelection: Set<string> = isSelected ? new Set() : new Set([node.id]);
		updateSelection(newSelection);
	};
	const handleMultiSelect = (node: NodeDataProps, isSelected: boolean) => {
		const newSelection: Set<string> = new Set(selectedIds);
		if (isSelected) newSelection.delete(node.id);
		else newSelection.add(node.id);
		updateSelection(newSelection);
	};

	const handleSelect = (node: NodeDataProps) => {
		const isSelected = selectedIds.has(node.id);
		multiSelect ? handleMultiSelect(node, isSelected) : handleSingleSelect(node, isSelected);
	};
</script>

<div role="tree" class={size}>
	{#each data as node (node.id)}
		<TreeNode {node} level={0} {size} onSelect={handleSelect} {selectedIds} />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
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
