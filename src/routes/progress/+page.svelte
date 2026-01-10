<script lang="ts">
	import Section from '../../internal/layout/section.svelte';
	import ProgressBar from '$lib/base/progress-bar/progress-bar.svelte';
	import CircularLoading from '$lib/base/loading/circular-loading.svelte';
	import PulsingDotsLoading from '$lib/base/loading/pulsing-dots-loading.svelte';
	import MorphingShapesLoading from '$lib/base/loading/morphing-shapes-loading.svelte';
	import TextualLoading from '$lib/base/loading/textual-loading.svelte';
	import navigateTo from '../../internal/navigate.ts';
</script>

<Section>
	<p class="intro">
		Progress indicators and loading animations to communicate state changes effectively. Choose
		from progress bars for determinate progress, or various loading animations for indeterminate
		states.
	</p>
</Section>

<Section title="Progress Bar" description="A versatile progress bar with click interaction.">
	<ProgressBar value={65} size="medium" />
	<a
		href="/progress/progress-bar"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/progress/progress-bar');
		}}>View full demo →</a
	>
</Section>

<Section title="Circular Loading" description="A classic spinning circle indicator.">
	<CircularLoading size="medium" />
	<a
		href="/progress/circular"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/progress/circular');
		}}>View full demo →</a
	>
</Section>

<Section title="Pulsing Dots Loading" description="Three dots that pulse in sequence.">
	<PulsingDotsLoading size="medium" />
	<a
		href="/progress/pulsing-dots"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/progress/pulsing-dots');
		}}>View full demo →</a
	>
</Section>

<Section
	title="Morphing Shapes Loading"
	description="A shape that transforms through organic forms."
>
	<MorphingShapesLoading size="medium" />
	<a
		href="/progress/morphing-shapes"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/progress/morphing-shapes');
		}}>View full demo →</a
	>
</Section>

<Section title="Textual Loading" description="Animated text with a typewriter effect.">
	<TextualLoading />
	<a
		href="/progress/textual"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/progress/textual');
		}}>View full demo →</a
	>
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
