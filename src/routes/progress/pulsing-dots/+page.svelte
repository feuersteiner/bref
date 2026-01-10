<script lang="ts">
	import PulsingDotsLoading from '$lib/base/loading/pulsing-dots-loading.svelte';
	import Section from '../../../internal/layout/section.svelte';
	import CodeSnippet from '../../../internal/layout/code-snippet.svelte';
	import { PULSING_DOTS_LOADING_USAGE_CODE_SNIPPET } from './snippets';
</script>

<Section>
	<p class="intro">
		The pulsing dots loading component offers a subtle, rhythmic animation with three dots that
		pulse in sequence. Ideal for inline contexts, chat interfaces, and subtle loading states.
	</p>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo">
		<PulsingDotsLoading size="x-small" />
		<PulsingDotsLoading size="small" />
		<PulsingDotsLoading size="medium" />
		<PulsingDotsLoading size="large" />
		<PulsingDotsLoading size="x-large" />
	</div>
</Section>

<Section title="Colors" description="Semantic colors for different contexts.">
	<div class="demo">
		<PulsingDotsLoading color="primary" />
		<PulsingDotsLoading color="secondary" />
		<PulsingDotsLoading color="success" />
		<PulsingDotsLoading color="warning" />
		<PulsingDotsLoading color="danger" />
		<PulsingDotsLoading color="info" />
	</div>
</Section>

<Section title="Foreground & Background" description="Adaptive colors for any surface.">
	<div class="demo">
		<PulsingDotsLoading color="foreground" />
		<div class="dark-bg">
			<PulsingDotsLoading color="background" />
		</div>
	</div>
</Section>

<Section title="Usage" description="Example code for implementing pulsing dots loading.">
	<CodeSnippet snippet={PULSING_DOTS_LOADING_USAGE_CODE_SNIPPET} />
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
