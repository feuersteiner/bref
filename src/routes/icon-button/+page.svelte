<script lang="ts">
	import IconButton from '$lib/base/button/icon-button.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';

	const usageSnippet = `<IconButton
  name="favorite"
  filled={true}
  color="danger"
  variant="soft"
  size="large"
  rounded
  onClick={() => handleClick()}
/>`;
</script>

<Section
	title="Icon Button"
	description="Icon buttons with customizable size, color, variant, and shape."
>
	<p class="intro">
		A compact button component displaying only an icon, perfect for toolbars, close buttons, and
		actions where space is limited.
	</p>
</Section>

<Section title="Variants" description="Choose between filled, soft, or ghost styles.">
	<div class="demo">
		<IconButton name="add" variant="filled" onClick={() => {}} />
		<IconButton name="add" variant="soft" onClick={() => {}} />
		<IconButton name="add" variant="ghost" onClick={() => {}} />
	</div>
</Section>

<Section title="Colors" description="Semantic colors for different actions and states.">
	<div class="demo">
		<IconButton name="favorite" color="primary" onClick={() => {}} />
		<IconButton name="favorite" color="secondary" onClick={() => {}} />
		<IconButton name="favorite" color="success" onClick={() => {}} />
		<IconButton name="favorite" color="warning" onClick={() => {}} />
		<IconButton name="favorite" color="danger" onClick={() => {}} />
		<IconButton name="favorite" color="info" onClick={() => {}} />
		<IconButton name="favorite" color="foreground" onClick={() => {}} />
		<IconButton name="favorite" color="background" onClick={() => {}} />
	</div>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo">
		<IconButton name="settings" size="x-small" onClick={() => {}} />
		<IconButton name="settings" size="small" onClick={() => {}} />
		<IconButton name="settings" size="medium" onClick={() => {}} />
		<IconButton name="settings" size="large" onClick={() => {}} />
		<IconButton name="settings" size="x-large" onClick={() => {}} />
	</div>
</Section>

<Section title="Rounded" description="Circular buttons for a softer appearance.">
	<div class="demo">
		<IconButton name="close" rounded onClick={() => {}} />
		<IconButton name="close" rounded variant="soft" onClick={() => {}} />
		<IconButton name="close" rounded variant="ghost" onClick={() => {}} />
	</div>
</Section>

<Section title="Filled Icons" description="Use filled icon variants for emphasis.">
	<div class="demo">
		<IconButton name="star" filled onClick={() => {}} />
		<IconButton name="star" filled variant="soft" color="warning" onClick={() => {}} />
		<IconButton name="star" filled variant="ghost" color="warning" onClick={() => {}} />
	</div>
</Section>

<Section title="Disabled" description="Disabled state for unavailable actions.">
	<div class="demo">
		<IconButton name="edit" disabled onClick={() => {}} />
		<IconButton name="edit" disabled variant="soft" onClick={() => {}} />
		<IconButton name="edit" disabled variant="ghost" onClick={() => {}} />
	</div>
</Section>

<Section title="Usage" description="Example code for implementing an icon button.">
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
	}
</style>
