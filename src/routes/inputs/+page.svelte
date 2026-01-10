<script lang="ts">
	import Section from '../../internal/layout/section.svelte';
	import TextInput from '$lib/base/text-input/text-input.svelte';
	import AreaTextInput from '$lib/base/text-input/area-text-input.svelte';
	import Slider from '$lib/base/slider/slider.svelte';
	import navigateTo from '../../internal/navigate.ts';

	let textValue = $state('');
	let areaValue = $state('');
	let sliderValue = $state(50);
</script>

<Section
	title="Text Input"
	description="Single-line text input with icons, CTA buttons, and validation."
>
	<TextInput
		value={textValue}
		placeholder="Enter text..."
		startIcon="search"
		onChange={(v) => (textValue = v)}
	/>
	<a
		href="/inputs/text-input"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/inputs/text-input');
		}}>View full demo →</a
	>
</Section>

<Section title="Area Text Input" description="Multi-line textarea for longer content.">
	<AreaTextInput
		value={areaValue}
		placeholder="Enter longer text..."
		rows={3}
		onChange={(v) => (areaValue = v)}
	/>
	<a
		href="/inputs/area-text-input"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/inputs/area-text-input');
		}}>View full demo →</a
	>
</Section>

<Section title="Slider" description="Range slider for selecting numeric values.">
	<Slider value={sliderValue} onChange={(v) => (sliderValue = v)} />
	<a
		href="/inputs/slider"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/inputs/slider');
		}}>View full demo →</a
	>
</Section>
