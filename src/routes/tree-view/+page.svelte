<script lang="ts">
	import Section from '../../internal/layout/section.svelte';
	import CodeSnippet from '../../internal/layout/code-snippet.svelte';
	import TreeView from '$lib/base/tree-view/tree-view.svelte';
	import type { NodeDataProps } from '../../lib/index.ts';
	import {
		TREE_VIEW_BASIC_CODE_SNIPPET,
		TREE_VIEW_SELECTION_CODE_SNIPPET,
		TREE_VIEW_PROPS_CODE_SNIPPET
	} from './snippets.ts';

	const data: NodeDataProps[] = [
		{
			id: '1',
			label: 'Documents',
			icon: 'folder',
			children: [
				{ id: '1-1', label: 'report.pdf', icon: 'description' },
				{ id: '1-2', label: 'notes.txt', icon: 'article' },
				{
					id: '1-3',
					label: 'Projects',
					icon: 'folder',
					children: [
						{ id: '1-3-1', label: 'project-a', icon: 'folder' },
						{ id: '1-3-2', label: 'project-b', icon: 'folder' }
					]
				}
			]
		},
		{
			id: '2',
			label: 'Images',
			icon: 'folder',
			children: [
				{ id: '2-1', label: 'photo.jpg', icon: 'image' },
				{
					id: '2-2',
					label: 'Screenshots',
					icon: 'folder',
					children: [
						{ id: '2-2-1', label: '2023', icon: 'folder' },
						{ id: '2-2-2', label: '2024', icon: 'folder' }
					]
				}
			]
		},
		{
			id: '3',
			label: 'config.json',
			icon: 'settings'
		}
	];

	let selectedIds = $state<Set<string>>(new Set());

	const onSelect = (id: string) => {
		selectedIds = new Set([id]);
	};
</script>

<Section>
	<p class="intro">
		The TreeView component renders collapsible, nested tree structures perfect for file explorers,
		navigation menus, or any hierarchical data.
	</p>
</Section>

<Section title="Basic Usage" description="Display hierarchical data with expandable nodes.">
	<div class="demo-container">
		<TreeView {data} {selectedIds} {onSelect} />
	</div>
	{#if selectedIds.size > 0}
		<p class="selected-info">Selected: {[...selectedIds].join(', ')}</p>
	{/if}
	<CodeSnippet snippet={TREE_VIEW_BASIC_CODE_SNIPPET} />
</Section>

<Section title="Selection Handling" description="Track and respond to node selections.">
	<p class="description">
		Use the <code>onSelect</code> callback to handle node clicks. The callback receives the selected
		node's <code>id</code>. Manage selection state externally via the <code>selectedIds</code> prop.
	</p>
	<CodeSnippet snippet={TREE_VIEW_SELECTION_CODE_SNIPPET} />
</Section>

<Section title="API Reference" description="Props and types for the TreeView component.">
	<p class="description">
		Each node requires an <code>id</code> and <code>label</code>. Optionally add an
		<code>icon</code>
		(Material icon name) and <code>children</code> for nested nodes.
	</p>
	<CodeSnippet snippet={TREE_VIEW_PROPS_CODE_SNIPPET} />
</Section>

<style>
	.intro {
		text-align: center;
		max-width: 40rem;
		font-size: 1rem;
		opacity: 0.8;
		line-height: 1.6;
	}

	.description {
		text-align: center;
		max-width: 36rem;
		opacity: 0.7;
		font-size: 0.95rem;
		margin-bottom: 1rem;
	}

	code {
		background: color-mix(in srgb, var(--color-foreground) 10%, transparent);
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
	}

	.demo-container {
		max-width: 320px;
		width: 100%;
		padding: 1rem;
		border-radius: 0.75rem;
		background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-foreground) 10%, transparent);
	}

	.selected-info {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-primary);
	}
</style>
