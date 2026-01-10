<script lang="ts">
	import Section from '../../internal/layout/section.svelte';
	import Button from '$lib/base/button/button.svelte';
	import IconButton from '$lib/base/button/icon-button.svelte';
	import navigateTo from '../../internal/navigate.ts';
</script>

<Section>
	<p>
		Choose between a full-featured button with labels and icons, or a compact icon-only button for
		toolbar actions and tight spaces.
	</p>
</Section>

<Section title="Button" description="A versatile button with label and optional icon.">
	<Button label="Click me" icon={{ name: 'add' }} onClick={() => {}} />
	<a
		href="/buttons/button"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/buttons/button');
		}}>View full demo →</a
	>
</Section>

<Section title="Icon Button" description="A compact button displaying only an icon.">
	<IconButton name="settings" onClick={() => {}} />
	<a
		href="/buttons/icon-button"
		onclick={(e) => {
			e.preventDefault();
			navigateTo('/buttons/icon-button');
		}}>View full demo →</a
	>
</Section>
