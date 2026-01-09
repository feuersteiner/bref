<script lang="ts">
	import ProgressBar from '$lib/base/progress-bar/progress-bar.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';
	import Button from '$lib/base/button/button.svelte';
	import { PROGRESS_BAR_USAGE_CODE_SNIPPET } from './snippets';

	let interactiveValue = $state(50);
	let animatedValue = $state(25);

	const handleValueClick = (value: number) => {
		interactiveValue = value;
	};

	const incrementAnimated = () => {
		animatedValue = Math.min(100, animatedValue + 10);
	};

	const decrementAnimated = () => {
		animatedValue = Math.max(0, animatedValue - 10);
	};
</script>

<Section>
	<p class="intro">
		A versatile progress bar component for showing determinate progress or indeterminate loading
		states. Supports click interaction and smooth value animations.
	</p>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo vertical">
		<ProgressBar size="x-small" value={60} wide />
		<ProgressBar size="small" value={60} wide />
		<ProgressBar size="medium" value={60} wide />
		<ProgressBar size="large" value={60} wide />
		<ProgressBar size="x-large" value={60} wide />
	</div>
</Section>

<Section title="Colors" description="Semantic colors for different contexts.">
	<div class="demo vertical">
		<ProgressBar color="primary" value={70} wide />
		<ProgressBar color="secondary" value={70} wide />
		<ProgressBar color="success" value={70} wide />
		<ProgressBar color="warning" value={70} wide />
		<ProgressBar color="danger" value={70} wide />
		<ProgressBar color="info" value={70} wide />
	</div>
</Section>

<Section title="Indeterminate" description="When value is undefined, shows a loading animation.">
	<div class="demo vertical">
		<ProgressBar color="primary" wide />
		<ProgressBar color="success" wide />
		<ProgressBar color="info" wide />
	</div>
</Section>

<Section title="Interactive" description="Click anywhere on the bar to set the value.">
	<div class="demo vertical">
		<ProgressBar
			value={interactiveValue}
			onValueClick={handleValueClick}
			color="primary"
			size="large"
			wide
		/>
		<span class="value-display">Value: {interactiveValue}%</span>
	</div>
</Section>

<Section title="Animated Value" description="Smooth transitions when the value changes.">
	<div class="demo vertical">
		<ProgressBar value={animatedValue} animateValue color="success" size="large" wide />
		<div class="button-row">
			<Button onClick={decrementAnimated} label="- 10%" variant="soft" size="small" />
			<span class="value-display">{animatedValue}%</span>
			<Button onClick={incrementAnimated} label="+ 10%" variant="soft" size="small" />
		</div>
	</div>
</Section>

<Section title="Usage" description="Example code for implementing the progress bar.">
	<CodeSnippet snippet={PROGRESS_BAR_USAGE_CODE_SNIPPET} />
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
		width: 100%;
	}

	.demo.vertical {
		flex-direction: column;
		max-width: 24rem;
	}

	.value-display {
		font-size: 0.875rem;
		opacity: 0.7;
		font-variant-numeric: tabular-nums;
	}

	.button-row {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
</style>
