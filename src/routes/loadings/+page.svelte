<script lang="ts">
	import Section from '$lib/internal/layout/section.svelte';
	import Button from '$lib/base/button/button.svelte';
	import CircularLoading from '$lib/base/loading/circular-loading.svelte';
	import PulsingDotsLoading from '$lib/base/loading/pulsing-dots-loading.svelte';
	import MorphingShapesLoading from '$lib/base/loading/morphing-shapes-loading.svelte';
	import TextualLoading from '$lib/base/loading/textual-loading.svelte';
	import { goto } from '$app/navigation';

	const navigate = (href: string) => goto(href);
</script>

<Section
	title="Loadings"
	description="Bref provides multiple loading indicator styles for different visual contexts."
>
	<p class="intro">
		Choose from circular spinners, pulsing dots, morphing shapes, or textual indicators to match
		your application's style and communicate loading states effectively.
	</p>
</Section>

<Section title="Circular Loading" description="A classic spinning circle indicator.">
	<p class="description">
		The circular loading indicator provides a familiar, clean animation ideal for general-purpose
		loading states.
	</p>
	<div class="preview">
		<CircularLoading size="medium" />
	</div>
	<Button
		label="View Circular Loading"
		icon={{ name: 'progress_activity' }}
		onClick={() => navigate('/circular-loading')}
	/>
</Section>

<Section title="Pulsing Dots Loading" description="Three dots that pulse in sequence.">
	<p class="description">
		Pulsing dots offer a subtle, rhythmic animation that works well in inline contexts and chat
		interfaces.
	</p>
	<div class="preview">
		<PulsingDotsLoading size="medium" />
	</div>
	<Button
		label="View Pulsing Dots Loading"
		icon={{ name: 'more_horiz' }}
		onClick={() => navigate('/pulsing-dots-loading')}
	/>
</Section>

<Section
	title="Morphing Shapes Loading"
	description="A shape that transforms through organic forms."
>
	<p class="description">
		Morphing shapes create an engaging, modern animation that captures attention while indicating
		progress.
	</p>
	<div class="preview">
		<MorphingShapesLoading size="medium" />
	</div>
	<Button
		label="View Morphing Shapes Loading"
		icon={{ name: 'shapes' }}
		onClick={() => navigate('/morphing-shapes-loading')}
	/>
</Section>

<Section title="Textual Loading" description="Animated text with a typewriter effect.">
	<p class="description">
		Textual loading displays rotating words with a typing animation, adding personality and context
		to loading states.
	</p>
	<div class="preview">
		<TextualLoading />
	</div>
	<Button
		label="View Textual Loading"
		icon={{ name: 'text_fields' }}
		onClick={() => navigate('/textual-loading')}
	/>
</Section>

<style>
	.intro {
		text-align: center;
		max-width: 40rem;
		font-size: 1rem;
		opacity: 0.8;
		line-height: 1.6;
	}

	.description {
		text-align: center;
		max-width: 36rem;
		opacity: 0.7;
		font-size: 0.95rem;
		margin-bottom: 1rem;
	}

	.preview {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1.5rem;
		margin-bottom: 1rem;
	}
</style>
