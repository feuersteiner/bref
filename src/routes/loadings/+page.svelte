<script lang="ts">
	import Section from '$lib/internal/layout/section.svelte';
	import CircularLoading from '$lib/base/loading/circular-loading.svelte';
	import PulsingDotsLoading from '$lib/base/loading/pulsing-dots-loading.svelte';
	import MorphingShapesLoading from '$lib/base/loading/morphing-shapes-loading.svelte';
	import TextualLoading from '$lib/base/loading/textual-loading.svelte';
</script>

<Section>
	<p class="intro">
		Choose from circular spinners, pulsing dots, morphing shapes, or textual indicators to match
		your application's style and communicate loading states effectively.
	</p>
</Section>

<Section title="Circular Loading" description="A classic spinning circle indicator.">
	<CircularLoading size="medium" />
	<a href="/loadings/circular">View full demo →</a>
</Section>

<Section title="Pulsing Dots Loading" description="Three dots that pulse in sequence.">
	<PulsingDotsLoading size="medium" />
	<a href="/loadings/pulsing-dots">View full demo →</a>
</Section>

<Section title="Morphing Shapes Loading" description="A shape that transforms through organic forms.">
	<MorphingShapesLoading size="medium" />
	<a href="/loadings/morphing-shapes">View full demo →</a>
</Section>

<Section title="Textual Loading" description="Animated text with a typewriter effect.">
	<TextualLoading />
	<a href="/loadings/textual">View full demo →</a>
</Section>

<style>
	.intro {
		text-align: center;
		max-width: 40rem;
		font-size: 1rem;
		opacity: 0.8;
		line-height: 1.6;
	}
</style>
