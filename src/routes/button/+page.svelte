<script lang="ts">
	import Button from '$lib/base/button/button.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';

	const usageSnippet = `<Button
  label="Submit"
  icon={{ name: 'check', filled: true }}
  color="success"
  variant="filled"
  size="large"
  onClick={() => handleSubmit()}
/>`;
</script>

<Section
	title="Button"
	description="Buttons with customizable size, color, variant, and optional icons."
>
	<p class="intro">
		A versatile button component supporting multiple variants, colors, sizes, and optional icons
		for a wide range of use cases.
	</p>
</Section>

<Section title="Variants" description="Choose between filled, soft, or ghost styles.">
	<div class="demo">
		<Button label="Filled" variant="filled" onClick={() => {}} />
		<Button label="Soft" variant="soft" onClick={() => {}} />
		<Button label="Ghost" variant="ghost" onClick={() => {}} />
	</div>
</Section>

<Section title="Colors" description="Semantic colors for different actions and states.">
	<div class="demo">
		<Button label="Primary" color="primary" onClick={() => {}} />
		<Button label="Secondary" color="secondary" onClick={() => {}} />
		<Button label="Success" color="success" onClick={() => {}} />
		<Button label="Warning" color="warning" onClick={() => {}} />
		<Button label="Danger" color="danger" onClick={() => {}} />
		<Button label="Info" color="info" onClick={() => {}} />
		<Button label="Foreground" color="foreground" onClick={() => {}} />
		<Button label="Background" color="background" onClick={() => {}} />
	</div>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo">
		<Button label="X-Small" size="x-small" onClick={() => {}} />
		<Button label="Small" size="small" onClick={() => {}} />
		<Button label="Medium" size="medium" onClick={() => {}} />
		<Button label="Large" size="large" onClick={() => {}} />
		<Button label="X-Large" size="x-large" onClick={() => {}} />
	</div>
</Section>

<Section title="With Icons" description="Add leading icons to enhance visual context.">
	<div class="demo">
		<Button label="Add" icon={{ name: 'add' }} onClick={() => {}} />
		<Button label="Favorite" icon={{ name: 'favorite', filled: true }} color="danger" onClick={() => {}} />
		<Button label="Settings" icon={{ name: 'settings' }} variant="soft" onClick={() => {}} />
		<Button label="Delete" icon={{ name: 'delete' }} variant="ghost" color="danger" onClick={() => {}} />
	</div>
</Section>

<Section title="Wide" description="Full-width buttons for forms and CTAs.">
	<div class="demo wide-container">
		<Button label="Full Width Button" wide onClick={() => {}} />
		<Button label="Full Width Soft" wide variant="soft" color="secondary" onClick={() => {}} />
	</div>
</Section>

<Section title="Disabled" description="Disabled state for unavailable actions.">
	<div class="demo">
		<Button label="Disabled" disabled onClick={() => {}} />
		<Button label="Disabled Soft" disabled variant="soft" onClick={() => {}} />
		<Button label="Disabled Ghost" disabled variant="ghost" onClick={() => {}} />
	</div>
</Section>

<Section title="Usage" description="Example code for implementing a button.">
	<CodeSnippet snippet={usageSnippet} />
</Section>

<style>
	.intro {
		text-align: center;
		max-width: 40rem;
		font-size: 1rem;
		opacity: 0.8;
		line-height: 1.6;
	}

	.demo {
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
