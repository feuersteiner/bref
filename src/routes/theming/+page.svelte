<script lang="ts">
	import Section from '../../internal/layout/section.svelte';
	import CodeSnippet from '../../internal/layout/code-snippet.svelte';
	import { THEME_USAGE_CODE_SNIPPET, CSS_VARIABLES_CODE_SNIPPET } from './snippets.ts';

	const DEFAULT_THEME = {
		paletteHex: {
			primary: '#736CED',
			secondary: '#E08D79',
			success: '#60935D',
			warning: '#E67F0D',
			danger: '#F03A47',
			info: '#4D9DE0'
		},
		surfaceHex: {
			background: '#eee',
			foreground: '#222'
		},
		border: {
			widthPx: 1,
			radiusRem: 0.5,
			colorHex: '#CCCCCC'
		},
		spacingRem: 1
	};

	const paletteColors = Object.entries(DEFAULT_THEME.paletteHex) as [string, string][];
	const surfaceColors = ['background', 'foreground'] as const;
	const variants = ['base', 'soft', 'saturated', 'contrast'] as const;
</script>

<Section>
	<p class="intro">
		The Theme component generates semantic color tokens from your base colors, handling shade
		generation, contrast calculation, and dark mode automatically.
	</p>
</Section>

<Section title="Palette Colors" description="Semantic colors for your UI components.">
	<p class="description">
		Each palette color generates four variants: <strong>base</strong>, <strong>soft</strong>,
		<strong>saturated</strong>, and <strong>contrast</strong>.
	</p>
	<div class="color-grid">
		{#each paletteColors as [name, hex]}
			<div class="color-card">
				<div class="color-header">
					<span class="color-name">{name}</span>
					<span class="color-hex">{hex}</span>
				</div>
				<div class="color-variants">
					{#each variants as variant}
						{@const cssVar = variant === 'base' ? `--color-${name}` : `--color-${name}-${variant}`}
						<div class="color-swatch" style:background={`var(${cssVar})`}>
							<span class="swatch-label">{variant}</span>
							<code class="swatch-var">{cssVar}</code>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Section>

<Section title="Surface Colors" description="Background and foreground colors for layouts.">
	<p class="description">
		Surface colors define the base canvas of your application and also generate variants.
	</p>
	<div class="color-grid surface-grid">
		{#each surfaceColors as name}
			{@const hex = DEFAULT_THEME.surfaceHex[name]}
			<div class="color-card">
				<div class="color-header">
					<span class="color-name">{name}</span>
					<span class="color-hex">{hex}</span>
				</div>
				<div class="color-variants">
					{#each variants as variant}
						{@const cssVar = variant === 'base' ? `--color-${name}` : `--color-${name}-${variant}`}
						<div class="color-swatch" style:background={`var(${cssVar})`}>
							<span class="swatch-label">{variant}</span>
							<code class="swatch-var">{cssVar}</code>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Section>

<Section title="CSS Variables" description="All generated CSS custom properties.">
	<p class="description">
		Use these variables anywhere in your CSS to maintain consistency with your theme.
	</p>
	<CodeSnippet snippet={CSS_VARIABLES_CODE_SNIPPET} />
</Section>

<Section title="Usage" description="Add the Theme component at the root of your app.">
	<p class="description">
		It generates CSS custom properties and handles light/dark mode switching automatically.
	</p>
	<CodeSnippet snippet={THEME_USAGE_CODE_SNIPPET} />
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

	code {
		background: color-mix(in srgb, var(--color-foreground) 10%, transparent);
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
	}

	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		width: 100%;
		max-width: 80rem;
	}

	.surface-grid {
		max-width: 50rem;
	}

	.color-card {
		display: flex;
		flex-direction: column;
		border-radius: 0.75rem;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-foreground) 15%, transparent);
		background: color-mix(in srgb, var(--color-background) 50%, transparent);
	}

	.color-header {
		padding: 0.75rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--color-foreground) 10%, transparent);
	}

	.color-name {
		font-weight: 600;
		text-transform: capitalize;
		font-size: 0.95rem;
	}

	.color-hex {
		font-family: monospace;
		font-size: 0.75rem;
		opacity: 0.6;
	}

	.color-variants {
		display: flex;
		flex-direction: column;
	}

	.color-swatch {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		min-height: 3rem;
	}

	.swatch-label {
		color: var(--color-foreground);
		padding: 0.2rem 0.5rem;
		text-transform: capitalize;
		background: color-mix(in srgb, var(--color-background) 70%, transparent);
		border-radius: 0.25rem;
		font-weight: 500;
		font-size: 0.8rem;
	}

	.swatch-var {
		font-size: 0.65rem;
		padding: 0.15rem 0.35rem;
		background: color-mix(in srgb, var(--color-background) 70%, transparent);
		opacity: 0.9;
	}
</style>
