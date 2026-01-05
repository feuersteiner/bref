<script lang="ts">
	import TextualLoading from '$lib/base/loading/textual-loading.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';

	const usageSnippet = `<!-- Uses 20 fun default words -->
<TextualLoading />

<!-- Custom words -->
<TextualLoading
  words={['Thinking', 'Processing', 'Generating']}
/>

<!-- Hide dots -->
<TextualLoading
  words={['Please wait', 'Almost there']}
  hideDots
/>

<!-- Custom speeds -->
<TextualLoading
  words={['Ready', 'Set', 'Go']}
  typeSpeed="slow"
  pauseSpeed="slow"
/>

<!-- Different colors and sizes -->
<TextualLoading size="large" color="success" />`;
</script>

<Section>
	<p class="intro">
		The textual loading component displays rotating words with a typing animation, adding
		personality and context to loading states. Comes with 20 fun default words or use your own
		custom messages.
	</p>
</Section>

<Section title="Default Words" description="Uses a curated list of 20 engaging default words.">
	<div class="demo textual">
		<TextualLoading />
	</div>
</Section>

<Section title="Custom Words" description="Provide your own words to match your context.">
	<div class="demo textual">
		<TextualLoading words={['Thinking', 'Processing', 'Generating']} />
		<TextualLoading words={['Loading data', 'Fetching results', 'Almost there']} />
		<TextualLoading words={['Brewing coffee', 'Feeding hamsters', 'Polishing pixels']} />
	</div>
</Section>

<Section title="Without Dots" description="Clean text without trailing dots.">
	<div class="demo textual">
		<TextualLoading words={['Please wait', 'Almost ready']} hideDots />
		<TextualLoading words={['One moment', 'Just a sec']} hideDots />
	</div>
</Section>

<Section title="Speeds" description="Control typing and pause speeds independently.">
	<div class="demo textual">
		<div class="speed-row">
			<span class="label">Fast typing, fast pause:</span>
			<TextualLoading words={['Quick', 'Speedy', 'Swift']} typeSpeed="fast" pauseSpeed="fast" />
		</div>
		<div class="speed-row">
			<span class="label">Normal typing, normal pause:</span>
			<TextualLoading words={['Normal', 'Standard', 'Regular']} />
		</div>
		<div class="speed-row">
			<span class="label">Slow typing, slow pause:</span>
			<TextualLoading words={['Slow', 'Relaxed', 'Calm']} typeSpeed="slow" pauseSpeed="slow" />
		</div>
	</div>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo textual">
		<TextualLoading size="x-small" words={['X-Small']} />
		<TextualLoading size="small" words={['Small']} />
		<TextualLoading size="medium" words={['Medium']} />
		<TextualLoading size="large" words={['Large']} />
		<TextualLoading size="x-large" words={['X-Large']} />
	</div>
</Section>

<Section title="Colors" description="Semantic colors for different contexts.">
	<div class="demo textual">
		<TextualLoading color="primary" words={['Primary']} />
		<TextualLoading color="secondary" words={['Secondary']} />
		<TextualLoading color="success" words={['Success']} />
		<TextualLoading color="warning" words={['Warning']} />
		<TextualLoading color="danger" words={['Danger']} />
		<TextualLoading color="info" words={['Info']} />
	</div>
</Section>

<Section title="Usage" description="Example code for implementing textual loading.">
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

	.textual {
		flex-direction: column;
		gap: 1rem;
	}

	.speed-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		justify-content: center;
	}

	.label {
		font-size: 0.875rem;
		opacity: 0.7;
		min-width: 12rem;
		text-align: right;
	}
</style>
