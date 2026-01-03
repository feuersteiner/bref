<script lang="ts">
	import Button from '$lib/base/button/button.svelte';
	import DemoSection from '$lib/internal/demo-section.svelte';
	import DemoCodeSnippet from './demo-code-snippet.svelte';
</script>

<DemoSection
	title="Buttons"
	id="buttons"
	description="Buttons with customizable size, color, variant, and optional icons."
>
	<h3>Variants</h3>
	<div>
		<Button label="Filled" variant="filled" onClick={() => {}} />
		<Button label="Soft" variant="soft" onClick={() => {}} />
		<Button label="Ghost" variant="ghost" onClick={() => {}} />
	</div>
	<h3>Colors</h3>
	<div>
		<Button label="Primary" color="primary" onClick={() => {}} />
		<Button label="Secondary" color="secondary" onClick={() => {}} />
		<Button label="Success" color="success" onClick={() => {}} />
		<Button label="Warning" color="warning" onClick={() => {}} />
		<Button label="Danger" color="danger" onClick={() => {}} />
		<Button label="Info" color="info" onClick={() => {}} />
		<Button label="Foreground" color="foreground" onClick={() => {}} />
		<Button label="Background" color="background" onClick={() => {}} />
	</div>
	<h3>Sizes</h3>
	<div>
		<Button label="X-Small" size="x-small" onClick={() => {}} />
		<Button label="Small" size="small" onClick={() => {}} />
		<Button label="Medium" size="medium" onClick={() => {}} />
		<Button label="Large" size="large" onClick={() => {}} />
		<Button label="X-Large" size="x-large" onClick={() => {}} />
	</div>
	<h3>With Icons</h3>
	<div>
		<Button label="Add" icon={{ name: 'add' }} onClick={() => {}} />
		<Button label="Favorite" icon={{ name: 'favorite', filled: true }} color="danger" onClick={() => {}} />
		<Button label="Settings" icon={{ name: 'settings' }} variant="soft" onClick={() => {}} />
		<Button label="Delete" icon={{ name: 'delete' }} variant="ghost" color="danger" onClick={() => {}} />
	</div>
	<h3>Wide</h3>
	<div class="wide-container">
		<Button label="Full Width Button" wide onClick={() => {}} />
		<Button label="Full Width Soft" wide variant="soft" color="secondary" onClick={() => {}} />
	</div>
	<h3>Disabled</h3>
	<div>
		<Button label="Disabled" disabled onClick={() => {}} />
		<Button label="Disabled Soft" disabled variant="soft" onClick={() => {}} />
		<Button label="Disabled Ghost" disabled variant="ghost" onClick={() => {}} />
	</div>
	<h3>Usage Example</h3>
	<DemoCodeSnippet
		snippet={`<Button
  label="Submit"
  icon={{ name: 'check', filled: true }}
  color="success"
  variant="filled"
  size="large"
  onClick={() => handleSubmit()}
/>`}
	/>
</DemoSection>

<style>
	div {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.wide-container {
		flex-direction: column;
		width: 100%;
		max-width: 300px;
	}
</style>
