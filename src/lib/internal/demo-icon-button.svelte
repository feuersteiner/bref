<script lang="ts">
	import IconButton from '$lib/base/button/icon-button.svelte';
	import DemoSection from '$lib/internal/demo-section.svelte';
	import DemoCodeSnippet from './demo-code-snippet.svelte';
</script>

<DemoSection
	title="Icon Buttons"
	id="buttons"
	description="Icon buttons with customizable size, color, variant, and shape."
>
	<h3>Variants</h3>
	<div>
		<IconButton name="add" variant="filled" onClick={() => {}} />
		<IconButton name="add" variant="soft" onClick={() => {}} />
		<IconButton name="add" variant="ghost" onClick={() => {}} />
	</div>
	<h3>Colors</h3>
	<div>
		<IconButton name="favorite" color="primary" onClick={() => {}} />
		<IconButton name="favorite" color="secondary" onClick={() => {}} />
		<IconButton name="favorite" color="success" onClick={() => {}} />
		<IconButton name="favorite" color="warning" onClick={() => {}} />
		<IconButton name="favorite" color="danger" onClick={() => {}} />
		<IconButton name="favorite" color="info" onClick={() => {}} />
		<IconButton name="favorite" color="foreground" onClick={() => {}} />
		<IconButton name="favorite" color="background" onClick={() => {}} />
	</div>
	<h3>Sizes</h3>
	<div>
		<IconButton name="settings" size="x-small" onClick={() => {}} />
		<IconButton name="settings" size="small" onClick={() => {}} />
		<IconButton name="settings" size="medium" onClick={() => {}} />
		<IconButton name="settings" size="large" onClick={() => {}} />
		<IconButton name="settings" size="x-large" onClick={() => {}} />
	</div>
	<h3>Rounded</h3>
	<div>
		<IconButton name="close" rounded onClick={() => {}} />
		<IconButton name="close" rounded variant="soft" onClick={() => {}} />
		<IconButton name="close" rounded variant="ghost" onClick={() => {}} />
	</div>
	<h3>Filled Icons</h3>
	<div>
		<IconButton name="star" filled onClick={() => {}} />
		<IconButton name="star" filled variant="soft" color="warning" onClick={() => {}} />
		<IconButton name="star" filled variant="ghost" color="warning" onClick={() => {}} />
	</div>
	<h3>Disabled</h3>
	<div>
		<IconButton name="edit" disabled onClick={() => {}} />
		<IconButton name="edit" disabled variant="soft" onClick={() => {}} />
		<IconButton name="edit" disabled variant="ghost" onClick={() => {}} />
	</div>
	<h3>Usage Example</h3>
	<DemoCodeSnippet
		snippet={`<IconButton
  name="favorite"
  filled={true}
  color="danger"
  variant="soft"
  size="large"
  rounded
  onClick={() => handleClick()}
/>`}
	/>
</DemoSection>

<style>
	div {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
</style>
