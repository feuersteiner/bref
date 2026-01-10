<script lang="ts">
	import AreaTextInput from '$lib/base/text-input/area-text-input.svelte';
	import Section from '../../../internal/layout/section.svelte';
	import CodeSnippet from '../../../internal/layout/code-snippet.svelte';
	import {
		AREA_TEXT_INPUT_USAGE_CODE_SNIPPET,
		AREA_TEXT_INPUT_RESIZABLE_CODE_SNIPPET
	} from './snippets';

	let textValue = $state('');
	let bioValue = $state('');
	let notesValue = $state('');
</script>

<Section>
	<p class="intro">
		A multi-line text area component for longer text input, with configurable rows and optional
		resize behavior.
	</p>
</Section>

<Section title="Default" description="Basic textarea with default 3 rows.">
	<div class="demo">
		<AreaTextInput
			value={textValue}
			placeholder="Enter text..."
			onChange={(v) => (textValue = v)}
		/>
	</div>
</Section>

<Section title="Custom Rows" description="Configure the initial height with the rows prop.">
	<div class="demo vertical">
		<AreaTextInput
			value={textValue}
			placeholder="2 rows"
			rows={2}
			onChange={(v) => (textValue = v)}
		/>
		<AreaTextInput
			value={bioValue}
			placeholder="5 rows for longer content..."
			rows={5}
			onChange={(v) => (bioValue = v)}
		/>
	</div>
</Section>

<Section title="Resizable" description="Control whether users can resize the textarea vertically.">
	<div class="demo vertical">
		<div class="demo-item">
			<span class="label">Resizable (default)</span>
			<AreaTextInput
				value={textValue}
				placeholder="Drag the corner to resize..."
				resizable={true}
				onChange={(v) => (textValue = v)}
			/>
		</div>
		<div class="demo-item">
			<span class="label">Fixed size</span>
			<AreaTextInput
				value={notesValue}
				placeholder="Cannot be resized..."
				resizable={false}
				onChange={(v) => (notesValue = v)}
			/>
		</div>
	</div>
</Section>

<Section title="Wide" description="Full-width textarea for forms and layouts.">
	<div class="demo wide-container">
		<AreaTextInput
			value={textValue}
			placeholder="Full width textarea..."
			wide
			rows={4}
			onChange={(v) => (textValue = v)}
		/>
	</div>
</Section>

<Section title="Disabled" description="Disabled state for unavailable inputs.">
	<div class="demo">
		<AreaTextInput
			value="This textarea is disabled"
			placeholder="Disabled"
			disabled
			onChange={() => {}}
		/>
	</div>
</Section>

<Section title="Usage" description="Example code for implementing an area text input.">
	<CodeSnippet snippet={AREA_TEXT_INPUT_USAGE_CODE_SNIPPET} />
</Section>

<Section title="Resizable Options" description="Control resize behavior.">
	<CodeSnippet snippet={AREA_TEXT_INPUT_RESIZABLE_CODE_SNIPPET} />
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
		align-items: flex-start;
		justify-content: center;
		flex-wrap: wrap;
	}

	.demo.vertical {
		flex-direction: column;
		align-items: stretch;
		max-width: 350px;
	}

	.demo-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.label {
		font-size: 0.875rem;
		opacity: 0.7;
	}

	.wide-container {
		flex-direction: column;
		width: 100%;
		max-width: 500px;
	}
</style>
