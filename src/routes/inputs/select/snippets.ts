export const SELECT_USAGE_SNIPPET = `<script lang="ts">
  import { Select } from 'bref-ui';

  let selected = $state('');

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ];
</script>

<Select
  value={selected}
  options={options}
  placeholder="Choose an option"
  onChange={(v) => (selected = v)}
/>`;

export const SELECT_WITH_ICONS_SNIPPET = `<script lang="ts">
  import { Select } from 'bref-ui';

  let selected = $state('');

  const options = [
    { value: 'active', label: 'Active', icon: 'check_circle' },
    { value: 'pending', label: 'Pending', icon: 'schedule' },
    { value: 'inactive', label: 'Inactive', icon: 'cancel' }
  ];
</script>

<Select
  value={selected}
  options={options}
  placeholder="Select status"
  onChange={(v) => (selected = v)}
/>`;
