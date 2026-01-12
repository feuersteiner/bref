<script lang="ts">
	import Select from '$lib/base/select/select.svelte';
	import Section from '../../../internal/layout/section.svelte';
	import CodeSnippet from '../../../internal/layout/code-snippet.svelte';
	import { SELECT_USAGE_SNIPPET } from './snippets.js';

	let selectedFruit = $state('');

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'orange', label: 'Orange' }
	];
</script>

<Section>
	<p class="intro">
		A customizable select dropdown using the new CSS <code>appearance: base-select</code> for native-like
		behavior with full styling control.
	</p>
</Section>

<Section title="Basic Select" description="Simple dropdown with text options.">
	<div class="demo">
		<Select
			value={selectedFruit}
			options={fruits}
			placeholder="Choose a fruit"
			onChange={(v) => (selectedFruit = v)}
		/>
	</div>
</Section>

<Section title="Start Icon" description="Select with a leading icon.">
	<div class="demo">
		<Select
			value=""
			options={fruits}
			placeholder="Select fruit"
			startIcon={{ name: 'nutrition' }}
			onChange={() => {}}
		/>
	</div>
</Section>

<Section title="Wide" description="Full-width select for forms and layouts.">
	<div class="demo wide-container">
		<Select
			value={selectedFruit}
			options={fruits}
			placeholder="Full width select"
			wide
			onChange={(v) => (selectedFruit = v)}
		/>
	</div>
</Section>

<Section title="Disabled" description="Disabled state for unavailable selections.">
	<div class="demo">
		<Select value="apple" options={fruits} disabled onChange={() => {}} />
	</div>
</Section>

<Section title="Sizes" description="Available size variants from x-small to x-large.">
	<div class="demo">
		<Select value="" options={fruits} placeholder="X-Small" size="x-small" onChange={() => {}} />
		<Select value="" options={fruits} placeholder="Small" size="small" onChange={() => {}} />
		<Select value="" options={fruits} placeholder="Medium" size="medium" onChange={() => {}} />
		<Select value="" options={fruits} placeholder="Large" size="large" onChange={() => {}} />
		<Select value="" options={fruits} placeholder="X-Large" size="x-large" onChange={() => {}} />
	</div>
</Section>

<Section title="Colors" description="Color applies to the start icon.">
	<div class="demo">
		<Select
			value=""
			options={fruits}
			placeholder="Primary"
			startIcon={{ name: 'nutrition', color: 'primary' }}
			onChange={() => {}}
		/>
		<Select
			value=""
			options={fruits}
			placeholder="Success"
			startIcon={{ name: 'nutrition', color: 'success' }}
			onChange={() => {}}
		/>
		<Select
			value=""
			options={fruits}
			placeholder="Warning"
			startIcon={{ name: 'nutrition', color: 'warning' }}
			onChange={() => {}}
		/>
		<Select
			value=""
			options={fruits}
			placeholder="Danger"
			startIcon={{ name: 'nutrition', color: 'danger' }}
			onChange={() => {}}
		/>
	</div>
</Section>

<Section title="Usage" description="Example code for implementing a select.">
	<CodeSnippet snippet={SELECT_USAGE_SNIPPET} />
</Section>

<style>
	.intro {
		text-align: center;
		max-width: 40rem;
		font-size: 1rem;
		opacity: 0.8;
		line-height: 1.6;
	}

	.intro code {
		background-color: color-mix(in srgb, var(--color-foreground) 10%, transparent);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	.demo {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.wide-container {
		flex-direction: column;
		width: 100%;
		max-width: 400px;
	}
</style>
