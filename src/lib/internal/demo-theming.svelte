<script lang="ts">
	import {
		initializeThemeMode,
		toggleThemeMode,
		DEFAULT_THEME,
		type ThemeMode
	} from '../base/theme/index.ts';
	import Button from '../base/button/button.svelte';
	import DemoSection from './demo-section.svelte';
	import DemoCodeSnippet from './demo-code-snippet.svelte';
	import { untrack } from 'svelte';

	let themeMode: ThemeMode = $state('light');

	$effect.pre(() => {
		untrack(() => {
			themeMode = initializeThemeMode();
		});
	});

	const onThemeToggle = () => {
		const newMode = themeMode === 'dark' ? 'light' : 'dark';
		toggleThemeMode(newMode);
		themeMode = newMode;
	};

	const paletteColors = Object.entries(DEFAULT_THEME.paletteHex) as [string, string][];
	const surfaceColors = ['background', 'foreground'] as const;

	const usageSnippet = `<script lang="ts">
  import { Theme } from 'bref/base/theme';
<\/script>

<!-- Use default theme -->
<Theme />

<!-- Or customize with your own colors -->
<Theme
  paletteHex={{
    primary: '#6366f1',
    secondary: '#ec4899',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  }}
  surfaceHex={{
    background: '#f8fafc',
    foreground: '#1e293b'
  }}
  border={{ widthPx: 1, radiusRem: 0.5, colorHex: '#e2e8f0' }}
  spacingRem={1}
/>`;
</script>

{#snippet colorCard(name: string)}
	<div class="color-card">
		<div class="color-header">{name}</div>
		<div class="color-variants">
			{#each ['base', 'soft', 'saturated', 'contrast'] as variant}
				{@const cssVar = variant === 'base' ? `--color-${name}` : `--color-${name}-${variant}`}
				<div class="color-swatch" style:background={`var(${cssVar})`}>
					<span class="swatch-label">{variant}</span>
				</div>
			{/each}
		</div>
	</div>
{/snippet}

<DemoSection title="Theming" id="theming">
	<h3>Theme Mode</h3>
	<p>
		Toggle between light and dark modes. The system respects <code>prefers-color-scheme</code> by default
		and persists your choice in localStorage.
	</p>
	<Button
		icon={{ name: themeMode === 'dark' ? 'light_mode' : 'dark_mode' }}
		label="Toggle {themeMode === 'dark' ? 'light' : 'dark'}"
		onClick={onThemeToggle}
	/>

	<h3>Colors</h3>
	<p>
		Semantic palette colors and surface colors. Each generates <strong>soft</strong>,
		<strong>saturated</strong>, and <strong>contrast</strong> variants.
	</p>
	<div class="color-grid">
		{#each paletteColors as [name]}
			{@render colorCard(name)}
		{/each}
		{#each surfaceColors as name}
			{@render colorCard(name)}
		{/each}
	</div>

	<h3>Usage</h3>
	<p>
		Add the Theme component at the root of your app. It generates CSS custom properties and handles
		light/dark mode switching.
	</p>
	<DemoCodeSnippet snippet={usageSnippet} />
</DemoSection>

<style>
	h3 {
		font-size: 1.4rem;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		width: 100%;
		text-align: center;
	}

	p {
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
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1rem;
		width: 100%;
	}

	.color-card {
		display: flex;
		flex-direction: column;
		border-radius: 0.75rem;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-foreground) 10%, transparent);
	}

	.color-header {
		padding: 0.5rem;
		text-align: center;
		font-weight: 600;
		text-transform: capitalize;
		background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
		font-size: 0.85rem;
	}

	.color-variants {
		display: flex;
		flex-direction: column;
	}

	.color-swatch {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.6rem 0.75rem;
		font-size: 0.75rem;
	}
    
	.swatch-label {
        color: var(--color-foreground);
        padding: 0.15rem 0.4rem;
        text-transform: capitalize  ;
        background: color-mix(in srgb, var(--color-background) 50%, transparent);
        border-radius: 0.25rem;
		font-weight: 500;
	}
</style>
