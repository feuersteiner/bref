<script lang="ts">
	import MorphingShapesLoading from '$lib/base/loading/morphing-shapes-loading.svelte';
	import Section from '../../../internal/layout/section.svelte';
	import CodeSnippet from '../../../internal/layout/code-snippet.svelte';
	import { MORPHING_SHAPES_LOADING_USAGE_CODE_SNIPPET } from './snippets';
</script>

<Section>
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

<Section title="Speeds" description="Control animation speed for different contexts.">
	<div class="demo">
		<div class="speed-item">
			<MorphingShapesLoading speed="slow" />
			<span class="speed-label">Slow</span>
		</div>
		<div class="speed-item">
			<MorphingShapesLoading speed="normal" />
			<span class="speed-label">Normal</span>
		</div>
		<div class="speed-item">
			<MorphingShapesLoading speed="fast" />
			<span class="speed-label">Fast</span>
		</div>
	</div>
</Section>

<Section title="Gradient" description="Animated gradient cycling through theme colors.">
	<div class="demo">
		<MorphingShapesLoading isGradient size="small" />
		<MorphingShapesLoading isGradient size="medium" />
		<MorphingShapesLoading isGradient size="large" />
		<MorphingShapesLoading isGradient size="x-large" />
	</div>
</Section>

<Section title="Pulse Shadow" description="Subtle pulsing glow effect.">
	<div class="demo">
		<MorphingShapesLoading pulseShadow size="small" />
		<MorphingShapesLoading pulseShadow size="medium" />
		<MorphingShapesLoading pulseShadow size="large" />
		<MorphingShapesLoading pulseShadow isGradient size="large" />
	</div>
</Section>

<Section title="Usage" description="Example code for implementing morphing shapes loading.">
	<CodeSnippet snippet={MORPHING_SHAPES_LOADING_USAGE_CODE_SNIPPET} />
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

	.speed-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.speed-label {
		font-size: 0.875rem;
		opacity: 0.7;
	}
</style>
