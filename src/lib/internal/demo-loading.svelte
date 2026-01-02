<script lang="ts">
	import CircularLoading from '$lib/base/loading/circular-loading.svelte';
	import PulsingDotsLoading from '$lib/base/loading/pulsing-dots-loading.svelte';
	import MorphingShapesLoading from '$lib/base/loading/morphing-shapes-loading.svelte';
	import TextualLoading from '$lib/base/loading/textual-loading.svelte';
	import DemoSection from '$lib/internal/demo-section.svelte';
	import DemoCodeSnippet from './demo-code-snippet.svelte';
</script>

<DemoSection
	title="Loading"
	id="loading"
	description="Loading indicators with multiple styles: circular spinner, pulsing dots, morphing shapes, and textual."
>
	<h3>Circular Loading</h3>
	<div>
		<CircularLoading size="x-small" />
		<CircularLoading size="small" />
		<CircularLoading size="medium" />
		<CircularLoading size="large" />
		<CircularLoading size="x-large" />
	</div>
	<h3>Pulsing Dots Loading</h3>
	<div>
		<PulsingDotsLoading size="x-small" />
		<PulsingDotsLoading size="small" />
		<PulsingDotsLoading size="medium" />
		<PulsingDotsLoading size="large" />
		<PulsingDotsLoading size="x-large" />
	</div>
	<h3>Morphing Shapes Loading</h3>
	<div>
		<MorphingShapesLoading size="x-small" />
		<MorphingShapesLoading size="small" />
		<MorphingShapesLoading size="medium" />
		<MorphingShapesLoading size="large" />
		<MorphingShapesLoading size="x-large" />
	</div>
	<h3>Textual Loading</h3>
	<div>
		<TextualLoading words="Loading" />
		<TextualLoading words="Thinking" intervalMs={250} />
		<TextualLoading words="Processing" intervalMs={750} />
		<TextualLoading words="Done" dots={false} />
	</div>
	<h3>Colors</h3>
	<div>
		<CircularLoading color="primary" />
		<CircularLoading color="secondary" />
		<CircularLoading color="success" />
		<CircularLoading color="warning" />
		<CircularLoading color="danger" />
		<CircularLoading color="info" />
	</div>
	<div>
		<PulsingDotsLoading color="primary" />
		<PulsingDotsLoading color="secondary" />
		<PulsingDotsLoading color="success" />
		<PulsingDotsLoading color="warning" />
		<PulsingDotsLoading color="danger" />
		<PulsingDotsLoading color="info" />
	</div>
	<h3>Usage Example</h3>
	<DemoCodeSnippet
		snippet={`<CircularLoading size="medium" color="primary" />

<PulsingDotsLoading size="small" color="info" />

<MorphingShapesLoading size="large" color="success" />

<TextualLoading
  words="Thinking"
  dots={true}
  intervalMs={500}
/>`}
	/>
</DemoSection>

<style>
	div {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
