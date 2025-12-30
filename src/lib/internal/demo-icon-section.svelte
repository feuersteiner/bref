<script lang="ts">
	import Icon from '$lib/base/icon/icon.svelte';
	import DemoSection from '$lib/internal/demo-section.svelte';
	import DemoCodeSnippet from './demo-code-snippet.svelte';
</script>

<DemoSection title="Icons" id="icons">
	<span> Sizes: </span>
	<div>
		<Icon size="x-small" name="person_2" />
		<Icon size="small" name="person_2" />
		<Icon size="medium" name="person_2" />
		<Icon size="large" name="person_2" />
		<Icon size="x-large" name="person_2" />
	</div>
	<span> Colors: </span>
	<div>
		<Icon name="person_2" color="primary" />
		<Icon name="person_2" color="secondary" />
		<Icon name="person_2" color="success" />
		<Icon name="person_2" color="warning" />
		<Icon name="person_2" color="danger" />
		<Icon name="person_2" color="info" />
		<Icon name="person_2" color="foreground" />
	</div>
	<span> Filled vs Outlined: </span>
	<div>
		<Icon name="person_2" />
		<Icon name="person_2" filled />
	</div>
	<span> Usage Example: </span>
	<DemoCodeSnippet snippet={`<Icon size="large" color="primary" name="person_2" filled />`} />
</DemoSection>

<style>
	div {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
</style>
