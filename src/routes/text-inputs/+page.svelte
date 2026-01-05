<script lang="ts">
	import Section from '$lib/internal/layout/section.svelte';
	import TextInput from '$lib/base/text-input/text-input.svelte';
	import AreaTextInput from '$lib/base/text-input/area-text-input.svelte';
	import navigateTo from '../../lib/internal/navigate.ts';

	let textValue = $state('');
	let areaValue = $state('');
</script>

<Section title="Text Input" description="Single-line text input with icons, CTA buttons, and validation.">
	<TextInput
		value={textValue}
		placeholder="Enter text..."
		startIcon="search"
		onChange={(v) => (textValue = v)}
	/>
	<a href="/text-inputs/text-input" onclick={(e) => { e.preventDefault(); navigateTo('/text-inputs/text-input'); }}>View full demo →</a>
</Section>

<Section title="Area Text Input" description="Multi-line textarea for longer content.">
	<AreaTextInput
		value={areaValue}
		placeholder="Enter longer text..."
		rows={3}
		onChange={(v) => (areaValue = v)}
	/>
	<a href="/text-inputs/area-text-input" onclick={(e) => { e.preventDefault(); navigateTo('/text-inputs/area-text-input'); }}>View full demo →</a>
</Section>

<Section title="Multi Author (WIP)" description="Work in progress - multi-author input component.">
	<a href="/text-inputs/multi-author" onclick={(e) => { e.preventDefault(); navigateTo('/text-inputs/multi-author'); }}>View Multi Author Demo →</a>
</Section>