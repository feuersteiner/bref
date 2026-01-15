<script lang="ts">
	import Toggle from '$lib/base/toggle/toggle.svelte';
	import Section from '../../../internal/layout/section.svelte';
	import CodeSnippet from '../../../internal/layout/code-snippet.svelte';

	let checked = $state(false);

	const usageSnippet = `<script lang="ts">
  let checked = $state(false);
<\/script>

<Toggle
  checked={checked}
  onChange={(v) => checked = v}
/>`;
</script>

<Section>
	<p class="intro">A minimal toggle switch for binary on/off states.</p>
</Section>

<Section title="Basic" description="Default toggle with bouncy animation.">
	<div class="demo">
		<Toggle {checked} onChange={(v) => (checked = v)} />
		<span class="value-display">{checked ? 'On' : 'Off'}</span>
	</div>
</Section>

<Section title="Sizes" description="Five size options from x-small to x-large.">
	<div class="demo vertical">
		<div class="size-row">
			<span class="size-label">x-small</span>
			<Toggle {checked} size="x-small" onChange={(v) => (checked = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">small</span>
			<Toggle {checked} size="small" onChange={(v) => (checked = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">medium</span>
			<Toggle {checked} size="medium" onChange={(v) => (checked = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">large</span>
			<Toggle {checked} size="large" onChange={(v) => (checked = v)} />
		</div>
		<div class="size-row">
			<span class="size-label">x-large</span>
			<Toggle {checked} size="x-large" onChange={(v) => (checked = v)} />
		</div>
	</div>
</Section>

<Section title="Disabled" description="Disabled state for unavailable inputs.">
	<div class="demo">
		<Toggle checked={false} disabled onChange={() => {}} />
		<Toggle checked={true} disabled onChange={() => {}} />
	</div>
</Section>

<Section title="Usage" description="Example code for implementing a toggle.">
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
		max-width: 200px;
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
	}
</style>
