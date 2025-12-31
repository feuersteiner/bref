<script lang="ts">
	import type { Size, Color, Variant } from '../base/types.ts';
	import DemoSection from './demo-section.svelte';

	const colors: Color[] = [
		'primary',
		'secondary',
		'success',
		'warning',
		'danger',
		'info',
		'foreground',
		'background'
	];
	const variants: Variant[] = ['filled', 'soft', 'ghost'];
	const sizes: Size[] = ['x-small', 'small', 'medium', 'large', 'x-large'];
</script>

<DemoSection
	title="Types"
	id="types"
	description="Available types for various components such as Buttons, Inputs, etc."
>
	<h3>Colors</h3>
	<div>
		{#each colors as color}
			<span>{color}</span>
		{/each}
	</div>

	<h3>Variants</h3>
	<div>
		{#each variants as variant}
			<span>{variant}</span>
		{/each}
	</div>

	<h3>Sizes</h3>
	<div>
		{#each sizes as size}
			<span>{size}</span>
		{/each}
	</div>
</DemoSection>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	span {
		font-family: monospace;
		font-size: 0.8125rem;
		padding: 0.25rem 0.5rem;
		background: color-mix(in srgb, var(--color-background) 80%, var(--color-foreground));
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
	}
</style>
