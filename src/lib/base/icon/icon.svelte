<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import Glyph from './glyph.svelte';
	import type { IconProps } from './types.ts';

	const {
		name,
		label,
		filled,
		weight,
		grade,
		size = 'medium',
		color,
		background,
		class: className,
		...rest
	}: IconProps & SvelteHTMLElements['span'] = $props();

	const fontSize = $derived(
		{
			'x-small': '0.75rem',
			small: '1rem',
			medium: '1.5rem',
			large: '2rem',
			'x-large': '3rem'
		}[size]
	);
	const foregroundColor = $derived(
		color ? `var(--color-${color})` : background ? `var(--color-${background}-contrast)` : undefined
	);
	const backgroundColor = $derived(background ? `var(--color-${background})` : undefined);
</script>

<span
	class={className}
	class:bref_icon={true}
	style:font-size={fontSize}
	style:color={foregroundColor}
	style:background-color={backgroundColor}
>
	<Glyph {...rest} {name} {label} {filled} {weight} {grade} />
</span>

<style>
	.bref_icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.125em;
	}
</style>
