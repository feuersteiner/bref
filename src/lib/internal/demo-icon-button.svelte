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
		<IconButton icon={{ name: 'add' }} variant="filled" onClick={() => {}} />
		<IconButton icon={{ name: 'add' }} variant="soft" onClick={() => {}} />
		<IconButton icon={{ name: 'add' }} variant="ghost" onClick={() => {}} />
	</div>
	<h3>Colors</h3>
	<div>
		<IconButton icon={{ name: 'favorite' }} color="primary" onClick={() => {}} />
		<IconButton icon={{ name: 'favorite' }} color="secondary" onClick={() => {}} />
		<IconButton icon={{ name: 'favorite' }} color="success" onClick={() => {}} />
		<IconButton icon={{ name: 'favorite' }} color="warning" onClick={() => {}} />
		<IconButton icon={{ name: 'favorite' }} color="danger" onClick={() => {}} />
		<IconButton icon={{ name: 'favorite' }} color="info" onClick={() => {}} />
		<IconButton icon={{ name: 'favorite' }} color="foreground" onClick={() => {}} />
		<IconButton icon={{ name: 'favorite' }} color="background" onClick={() => {}} />
	</div>
	<h3>Sizes</h3>
	<div>
		<IconButton icon={{ name: 'settings' }} size="x-small" onClick={() => {}} />
		<IconButton icon={{ name: 'settings' }} size="small" onClick={() => {}} />
		<IconButton icon={{ name: 'settings' }} size="medium" onClick={() => {}} />
		<IconButton icon={{ name: 'settings' }} size="large" onClick={() => {}} />
		<IconButton icon={{ name: 'settings' }} size="x-large" onClick={() => {}} />
	</div>
	<h3>Rounded</h3>
	<div>
		<IconButton icon={{ name: 'close' }} rounded onClick={() => {}} />
		<IconButton icon={{ name: 'close' }} rounded variant="soft" onClick={() => {}} />
		<IconButton icon={{ name: 'close' }} rounded variant="ghost" onClick={() => {}} />
	</div>
	<h3>Filled Icons</h3>
	<div>
		<IconButton icon={{ name: 'star', filled: true }} onClick={() => {}} />
		<IconButton icon={{ name: 'star', filled: true }} variant="soft" color="warning" onClick={() => {}} />
		<IconButton icon={{ name: 'star' }} variant="ghost" color="warning" onClick={() => {}} />
	</div>
	<h3>Disabled</h3>
	<div>
		<IconButton icon={{ name: 'edit' }} disabled onClick={() => {}} />
		<IconButton icon={{ name: 'edit' }} disabled variant="soft" onClick={() => {}} />
		<IconButton icon={{ name: 'edit' }} disabled variant="ghost" onClick={() => {}} />
	</div>
	<h3>Usage Example</h3>
	<DemoCodeSnippet
		snippet={`<IconButton
  icon={{ name: 'favorite', filled: true }}
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
