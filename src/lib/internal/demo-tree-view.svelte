<script lang="ts">
	import { TreeView, type NodeDataProps } from '../base/tree-view/index.ts';
	import DemoSection from './demo-section.svelte';
	import DemoCodeSnippet from './demo-code-snippet.svelte';

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
					label: 'screenshot.png',
					icon: 'image',
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

	const handleSelectionChange = (ids: Set<string>) => {
		selectedIds = ids;
	};

	const snippet: string = `<script lang="ts">
  import { TreeView } from 'bref-ui';
  import type { NodeDataProps } from 'bref-ui';

  const data: NodeDataProps[] = [
    {
      id: '1',
      label: 'Documents',
      icon: 'folder',
      children: [
        { id: '1-1', label: 'report.pdf', icon: 'description' },
        { id: '1-2', label: 'notes.txt', icon: 'article' }
      ]
    },
    {
      id: '2',
      label: 'Images',
      icon: 'folder',
      children: [
        { id: '2-1', label: 'photo.jpg', icon: 'image' }
      ]
    }
  ];

  let selectedIds = $state<Set<string>>(new Set());

  const handleSelectionChange = (ids: Set<string>) => {
    selectedIds = ids;
    console.log('Selected:', [...ids]);
  };`;
</script>

<DemoSection
	title="Tree View"
	id="tree-view"
	description="A hierarchical tree component for displaying nested data structures like file systems or navigation menus."
>
	<h3>Basic Tree View</h3>
	<div class="demo-container">
		<TreeView {data} onSelectionChange={handleSelectionChange} />
	</div>
	{#if selectedIds.size > 0}
		<p class="selected-info">Selected: {[...selectedIds].join(', ')}</p>
	{/if}

	<h3>Usage Example</h3>
	<DemoCodeSnippet {snippet} />
</DemoSection>

<style>
	.demo-container {
		max-width: 300px;
		padding: 1rem;
		border-radius: var(--border-radius);
		background-color: color-mix(in srgb, var(--color-foreground) 5%, transparent);
	}

	.selected-info {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-primary);
	}
</style>
