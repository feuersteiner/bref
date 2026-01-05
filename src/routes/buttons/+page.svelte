<script lang="ts">
	import Section from '$lib/internal/layout/section.svelte';
	import Button from '$lib/base/button/button.svelte';
	import navigateTo from '../../lib/internal/navigate.ts';

	const navigate = (href: string) => navigateTo(href);
</script>

<Section>
	<p>
		Choose between a full-featured button with labels and icons, or a compact icon-only button for
		toolbar actions and tight spaces.
	</p>
</Section>

<Section title="Button" description="A versatile button with label and optional icon.">
	<p>
		Use the standard Button component when you need text labels, icons, or both. Supports multiple
		variants, colors, and sizes.
	</p>
	<Button label="View Button" icon={{ name: 'buttons_alt' }} onClick={() => navigate('/buttons/button')} />
</Section>

<Section title="Icon Button" description="A compact button displaying only an icon.">
	<p>
		Use the IconButton component for actions where an icon alone is sufficient, such as toolbars,
		close buttons, or compact UI elements.
	</p>
	<Button
		label="View Icon Button"
		icon={{ name: 'adjust' }}
		onClick={() => navigate('/buttons/icon-button')}
	/>
</Section>
