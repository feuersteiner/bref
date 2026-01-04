<script lang="ts">
	import type { TreeNodeProps } from './types.ts';
	import Icon from '../icon/icon.svelte';
	import TreeNode from './tree-node.svelte';
	const { node, level, size, onSelect, selectedIds, filledIcon, wide }: TreeNodeProps = $props();

	let expanded: boolean = $state(false);
	let selected: boolean = $derived(selectedIds?.has(node.id) ?? false);

	const hasChildren = $derived(node.children && node.children.length > 0);

	const toggleExpand = (e: MouseEvent) => {
		e.stopPropagation();
		if (hasChildren) expanded = !expanded;
	};

	const handleSelect = () => onSelect(node.id);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={size}
	class:selected
	style:padding-left="calc({level} * var(--tree-indent))"
	onclick={handleSelect}
	class:wide
>
	{#if hasChildren}
		<button class:expanded onclick={toggleExpand}>
			<Icon name="chevron_right" {size} color={selected ? 'primary' : undefined} />
		</button>
	{:else}
		<span class="spacer"></span>
	{/if}

	{#if node.icon}
		<Icon
			name={node.icon}
			filled={selected || filledIcon}
			{size}
			color={selected ? 'primary' : undefined}
		/>
	{/if}

	<span>{node.label}</span>
</div>

{#if expanded && hasChildren}
	{#each node.children as child (child.id)}
		<TreeNode node={child} level={level + 1} {size} {onSelect} {selectedIds} {filledIcon} {wide} />
	{/each}
{/if}

<style>
	div,
	span,
	button {
		transition: all 0.1s ease-in-out;
	}

	div {
		--tree-indent: 1em;
		display: flex;
		align-items: center;
		padding: 0.25em 0.5em;
		gap: 0.25em;
		border-radius: var(--border-radius);
		cursor: pointer;
	}

	div:hover {
		background-color: color-mix(in srgb, var(--color-foreground) 10%, transparent);
	}

	.selected {
		background-color: var(--color-primary-soft);
	}
	.selected:hover {
		background-color: color-mix(in srgb, var(--color-primary) 20%, var(--color-primary-soft));
	}

	.selected span {
		color: var(--color-primary);
	}
	span {
		user-select: none;
	}

	button {
		all: unset;
		display: flex;
		padding: 0.25em;
		cursor: pointer;
	}

	button.expanded {
		transform: rotate(90deg);
	}

	.spacer {
		width: 1em;
	}

	.wide {
		width: 100%;
	}
</style>
