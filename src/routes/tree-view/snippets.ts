export const TREE_VIEW_BASIC_CODE_SNIPPET = `<script lang="ts">
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
  const onSelect = (id: string) => {
    selectedIds = new Set([id]);
  };
<\/script>

<TreeView {data} {selectedIds} {onSelect} />`;

export const TREE_VIEW_SELECTION_CODE_SNIPPET = `<script lang="ts">
  import { TreeView, type NodeDataProps } from 'bref-ui';

  let selectedIds = $state<Set<string>>(new Set());

  const onSelect = (id: string) => {
    selectedIds = new Set([id]);
    console.log('Selected:', id);
  };
<\/script>

<TreeView {data} {selectedIds} {onSelect} />

{#if selectedIds.size > 0}
  <p>Selected: {[...selectedIds].join(', ')}</p>
{/if}`;

export const TREE_VIEW_PROPS_CODE_SNIPPET = `interface NodeDataProps {
  id: string;           // Unique identifier for the node
  label: string;        // Display text for the node
  icon?: IconName;      // Material icon name (optional)
  children?: NodeDataProps[]; // Nested child nodes (optional)
}

interface TreeViewProps {
  data: NodeDataProps[];        // Tree structure data
  selectedIds: Set<string>;     // Currently selected node IDs
  onSelect: (id: string) => void; // Selection callback
  size?: Size;                  // 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
  wide?: boolean;               // Full width mode
  filledIcon?: boolean;         // Use filled icon style
}`;
