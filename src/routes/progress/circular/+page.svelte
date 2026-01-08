<script lang="ts">
	import CircularLoading from '$lib/base/loading/circular-loading.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';

	const usageSnippet = `<CircularLoading
  size="medium"
  color="primary"
/>

<!-- Different sizes -->
<CircularLoading size="x-small" />
<CircularLoading size="small" />
<CircularLoading size="medium" />
<CircularLoading size="large" />
<CircularLoading size="x-large" />

<!-- Different colors -->
<CircularLoading color="success" />
<CircularLoading color="danger" />`;
</script>

<Section>
	<p class="intro">
		The circular loading component provides a familiar, clean spinning animation that works well for
		general-purpose loading indicators across your application.
	</p>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo">
		<CircularLoading size="x-small" />
		<CircularLoading size="small" />
		<CircularLoading size="medium" />
		<CircularLoading size="large" />
		<CircularLoading size="x-large" />
	</div>
</Section>

<Section title="Colors" description="Semantic colors for different contexts.">
	<div class="demo">
		<CircularLoading color="primary" />
		<CircularLoading color="secondary" />
		<CircularLoading color="success" />
		<CircularLoading color="warning" />
		<CircularLoading color="danger" />
		<CircularLoading color="info" />
	</div>
</Section>

<Section title="Foreground & Background" description="Adaptive colors for any surface.">
	<div class="demo">
		<CircularLoading color="foreground" />
		<div class="dark-bg">
			<CircularLoading color="background" />
		</div>
	</div>
</Section>

<Section title="Usage" description="Example code for implementing circular loading.">
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
		gap: 1.5rem;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.dark-bg {
		background-color: var(--color-foreground);
		padding: 1rem;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
