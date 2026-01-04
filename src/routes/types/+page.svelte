<script lang="ts">
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';

	const colors = [
		'primary',
		'secondary',
		'success',
		'warning',
		'danger',
		'info',
		'foreground',
		'background'
	] as const;

	const variants = ['filled', 'soft', 'ghost'] as const;
	const sizes = ['x-small', 'small', 'medium', 'large', 'x-large'] as const;
	const speeds = ['slow', 'normal', 'fast'] as const;

	const colorSnippet = `export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'foreground'
  | 'background';`;

	const variantSnippet = `export type Variant = 'filled' | 'soft' | 'ghost';`;

	const sizeSnippet = `export type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';`;

	const speedSnippet = `export type Speed = 'slow' | 'normal' | 'fast';`;

	const usageSnippet = `<script lang="ts">
  import { Button } from 'bref-ui';
  import type { Color, Size, Variant } from 'bref-ui';

  let color: Color = 'primary';
  let size: Size = 'medium';
  let variant: Variant = 'filled';
<\/script>

<Button label="Click me" {color} {size} {variant} />`;
</script>

<Section
	title="Generic Types"
	description="Shared TypeScript types used across components for consistent styling and behavior."
>
	<p class="intro">
		Bref UI uses a set of shared types to ensure consistency across all components. These types
		define common properties like colors, sizes, variants, and animation speeds.
	</p>
</Section>

<Section title="Color" description="Semantic color options for component styling.">
	<p class="description">
		Colors are mapped to CSS custom properties, allowing them to adapt to light and dark themes
		automatically.
	</p>
	<div class="type-grid">
		{#each colors as color}
			<div class="type-item color-item" style="--item-color: var(--color-{color})">
				<span class="color-swatch"></span>
				<code>{color}</code>
			</div>
		{/each}
	</div>
	<CodeSnippet snippet={colorSnippet} />
</Section>

<Section title="Variant" description="Visual style variations for interactive components.">
	<p class="description">
		Variants control the visual weight and emphasis of components like buttons and inputs.
	</p>
	<div class="type-grid variant-grid">
		{#each variants as variant}
			<div class="type-item variant-item" data-variant={variant}>
				<code>{variant}</code>
				<span class="variant-desc">
					{#if variant === 'filled'}
						Solid background, high emphasis
					{:else if variant === 'soft'}
						Subtle background, medium emphasis
					{:else}
						Transparent, low emphasis
					{/if}
				</span>
			</div>
		{/each}
	</div>
	<CodeSnippet snippet={variantSnippet} />
</Section>

<Section title="Size" description="Consistent sizing scale for components.">
	<p class="description">
		Sizes follow a 5-step scale from extra small to extra large, providing flexibility for different
		UI contexts.
	</p>
	<div class="type-grid size-grid">
		{#each sizes as size}
			<div class="type-item size-item" data-size={size}>
				<code>{size}</code>
			</div>
		{/each}
	</div>
	<CodeSnippet snippet={sizeSnippet} />
</Section>

<Section title="Speed" description="Animation speed presets for loading indicators.">
	<p class="description">
		Speed types control animation timing for components like loading indicators.
	</p>
	<div class="type-grid">
		{#each speeds as speed}
			<div class="type-item">
				<code>{speed}</code>
				<span class="speed-indicator" data-speed={speed}></span>
			</div>
		{/each}
	</div>
	<CodeSnippet snippet={speedSnippet} />
</Section>

<Section title="Usage Example" description="How to use these types in your components.">
	<p class="description">
		Import types directly from <code>bref-ui</code> to get full TypeScript support in your
		components.
	</p>
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

	.description {
		text-align: center;
		max-width: 36rem;
		opacity: 0.7;
		font-size: 0.95rem;
		margin-bottom: 1rem;
	}

	.description code {
		background: color-mix(in srgb, var(--color-foreground) 10%, transparent);
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
	}

	.type-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	.type-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-foreground) 10%, transparent);
		border-radius: 0.5rem;
		font-size: 0.875rem;
	}

	.type-item code {
		font-family: monospace;
		font-size: 0.8125rem;
	}

	/* Color items */
	.color-item {
		flex-direction: column;
		gap: 0.25rem;
		min-width: 5.5rem;
	}

	.color-swatch {
		width: 2rem;
		height: 2rem;
		border-radius: 0.375rem;
		background: var(--item-color);
		border: 1px solid color-mix(in srgb, var(--color-foreground) 15%, transparent);
	}

	/* Variant items */
	.variant-grid {
		gap: 1rem;
	}

	.variant-item {
		flex-direction: column;
		padding: 0.75rem 1rem;
		min-width: 10rem;
	}

	.variant-item[data-variant='filled'] {
		background: var(--color-primary);
		color: var(--color-background);
		border-color: var(--color-primary);
	}

	.variant-item[data-variant='soft'] {
		background: color-mix(in srgb, var(--color-primary) 15%, transparent);
		border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
	}

	.variant-item[data-variant='ghost'] {
		background: transparent;
		border-color: var(--color-primary);
	}

	.variant-desc {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	/* Size items */
	.size-grid {
		align-items: flex-end;
	}

	.size-item[data-size='x-small'] {
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
	}

	.size-item[data-size='small'] {
		padding: 0.375rem 0.625rem;
		font-size: 0.8125rem;
	}

	.size-item[data-size='medium'] {
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
	}

	.size-item[data-size='large'] {
		padding: 0.625rem 0.875rem;
		font-size: 0.9375rem;
	}

	.size-item[data-size='x-large'] {
		padding: 0.75rem 1rem;
		font-size: 1rem;
	}

	/* Speed items */
	.speed-indicator {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--color-primary);
		animation: pulse 1s ease-in-out infinite;
	}

	.speed-indicator[data-speed='slow'] {
		animation-duration: 2s;
	}

	.speed-indicator[data-speed='normal'] {
		animation-duration: 1s;
	}

	.speed-indicator[data-speed='fast'] {
		animation-duration: 0.5s;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(0.8);
		}
	}
</style>
