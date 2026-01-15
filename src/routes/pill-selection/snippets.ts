export const PILL_SELECTION_USAGE_SNIPPET = `<script lang="ts">
  import { PillSelection } from 'bref-ui';

  let selection = $state<string[]>([]);

  const items = [
    { id: 'svelte', label: 'Svelte', icon: { name: 'code' } },
    { id: 'react', label: 'React', icon: { name: 'code' } },
    { id: 'vue', label: 'Vue', icon: { name: 'code' } }
  ];
</script>

<PillSelection
  {items}
  {selection}
  onSelect={(s) => selection = s}
  color="primary"
/>`;

export const PILL_SELECTION_MAX_LENGTH_SNIPPET = `<PillSelection
  {items}
  {selection}
  maxSelectionLength={2}
  onSelect={(s) => selection = s}
/>`;

export const PILL_SELECTION_DISABLE_OTHERS_SNIPPET = `<PillSelection
  {items}
  {selection}
  maxSelectionLength={2}
  disableOthersOnFull
  onSelect={(s) => selection = s}
/>`;
