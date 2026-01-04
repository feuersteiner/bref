<script lang="ts">
	import Section from '$lib/internal/layout/section.svelte';
	import Button from '$lib/base/button/button.svelte';
	import { goto } from '$app/navigation';

	const navigate = (href: string) => goto(href);
</script>

<Section
	title="Buttons"
	description="Bref provides two types of button components for different use cases."
>
	<p class="intro">
		Choose between a full-featured button with labels and icons, or a compact icon-only button for
		toolbar actions and tight spaces.
	</p>
</Section>

<Section title="Button" description="A versatile button with label and optional icon.">
	<p class="description">
		Use the standard Button component when you need text labels, icons, or both. Supports multiple
		variants, colors, and sizes.
	</p>
	<Button label="View Button" icon={{ name: 'buttons_alt' }} onClick={() => navigate('/button')} />
</Section>

<Section title="Icon Button" description="A compact button displaying only an icon.">
	<p class="description">
		Use the IconButton component for actions where an icon alone is sufficient, such as toolbars,
		close buttons, or compact UI elements.
	</p>
	<Button
		label="View Icon Button"
		icon={{ name: 'adjust' }}
		onClick={() => navigate('/icon-button')}
	/>
</Section>

<style>
	.intro {
		text-align: center;
		max-width: 40rem;
		font-size: 1rem;
		opacity: 0.8;
		line-height: 1.6;
	}

	.description {
		text-align: center;
		max-width: 36rem;
		opacity: 0.7;
		font-size: 0.95rem;
		margin-bottom: 1rem;
	}
</style>
