<script lang="ts">
	import Slider from '$lib/base/slider/slider.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';

	let value = $state(50);
	let stepValue = $state(3);
	let percentValue = $state(25);

	const usageSnippet = `<Slider
  value={volume}
  min={0}
  max={100}
  onChange={(v) => volume = v}
/>`;
</script>

<Section>
	<p class="intro">
		A minimalist slider component for selecting numeric values within a range.
	</p>
</Section>

<Section title="Basic" description="Default slider with standard styling.">
	<div class="demo">
		<Slider value={value} onChange={(v) => (value = v)} />
		<span class="value-display">{value}</span>
	</div>
</Section>

<Section title="Sizes" description="Five size options from x-small to x-large.">
	<div class="demo vertical">
		<div class="size-row">
			<span class="size-label">x-small</span>
			<Slider value={value} size="x-small" onChange={(v) => (value = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">small</span>
			<Slider value={value} size="small" onChange={(v) => (value = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">medium</span>
			<Slider value={value} size="medium" onChange={(v) => (value = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">large</span>
			<Slider value={value} size="large" onChange={(v) => (value = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">x-large</span>
			<Slider value={value} size="x-large" onChange={(v) => (value = v)} />
		</div>
	</div>
</Section>

<Section title="Colors" description="Primary and foreground color options.">
	<div class="demo vertical">
		<div class="size-row">
			<span class="size-label">primary</span>
			<Slider value={value} color="primary" onChange={(v) => (value = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">foreground</span>
			<Slider value={value} color="foreground" onChange={(v) => (value = v)} />
		</div>
	</div>
</Section>

<Section title="Steps" description="Discrete value selection with custom step intervals.">
	<div class="demo vertical">
		<div class="size-row">
			<span class="size-label">1-5</span>
			<Slider value={stepValue} min={1} max={5} step={1} onChange={(v) => (stepValue = v)} />
			<span class="value-display">{stepValue}</span>
		</div>
		<div class="size-row">
			<span class="size-label">0-100 by 25</span>
			<Slider value={percentValue} min={0} max={100} step={25} onChange={(v) => (percentValue = v)} />
			<span class="value-display">{percentValue}%</span>
		</div>
	</div>
</Section>

<Section title="Wide" description="Full-width slider for forms and layouts.">
	<div class="demo wide-container">
		<Slider value={value} wide onChange={(v) => (value = v)} />
	</div>
</Section>

<Section title="Disabled" description="Disabled state for unavailable inputs.">
	<div class="demo">
		<Slider value={50} disabled onChange={() => {}} />
	</div>
</Section>

<Section title="Usage" description="Example code for implementing a slider.">
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
		gap: 1rem;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.demo.vertical {
		flex-direction: column;
		align-items: stretch;
		max-width: 300px;
	}

	.size-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.size-label {
		font-size: 0.75rem;
		opacity: 0.6;
		min-width: 60px;
	}

	.value-display {
		font-size: 0.875rem;
		opacity: 0.7;
		font-variant-numeric: tabular-nums;
	}

	.wide-container {
		flex-direction: column;
		width: 100%;
		max-width: 400px;
	}
</style>
