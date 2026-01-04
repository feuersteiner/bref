<script lang="ts">
	import MorphingShapesLoading from '$lib/base/loading/morphing-shapes-loading.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';

	const usageSnippet = `<MorphingShapesLoading
  size="medium"
  color="primary"
/>

<!-- Different sizes -->
<MorphingShapesLoading size="x-small" />
<MorphingShapesLoading size="small" />
<MorphingShapesLoading size="medium" />
<MorphingShapesLoading size="large" />
<MorphingShapesLoading size="x-large" />

<!-- Different colors -->
<MorphingShapesLoading color="success" />
<MorphingShapesLoading color="warning" />`;
</script>

<Section
	title="Morphing Shapes Loading"
	description="A shape that transforms through organic forms while rotating."
>
	<p class="intro">
		The morphing shapes loading component creates an engaging, modern animation where a shape
		continuously transforms through circles, squircles, blobs, and other organic forms while
		rotating. Perfect for capturing attention during longer loading states.
	</p>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo">
		<MorphingShapesLoading size="x-small" />
		<MorphingShapesLoading size="small" />
		<MorphingShapesLoading size="medium" />
		<MorphingShapesLoading size="large" />
		<MorphingShapesLoading size="x-large" />
	</div>
</Section>

<Section title="Colors" description="Semantic colors for different contexts.">
	<div class="demo">
		<MorphingShapesLoading color="primary" />
		<MorphingShapesLoading color="secondary" />
		<MorphingShapesLoading color="success" />
		<MorphingShapesLoading color="warning" />
		<MorphingShapesLoading color="danger" />
		<MorphingShapesLoading color="info" />
	</div>
</Section>

<Section title="Foreground & Background" description="Adaptive colors for any surface.">
	<div class="demo">
		<MorphingShapesLoading color="foreground" />
		<div class="dark-bg">
			<MorphingShapesLoading color="background" />
		</div>
	</div>
</Section>

<Section title="Usage" description="Example code for implementing morphing shapes loading.">
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
