<script lang="ts">
	import {
		initializeThemeMode,
		toggleThemeMode,
		DEFAULT_THEME,
		type ThemeMode
	} from '../base/theme/index.ts';
	import Button from '../base/button/button.svelte';
	import DemoSection from './demo-section.svelte';
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
</script>

{#snippet colorCard(name: string, isSurface: boolean = false)}
	<div class="color-card">
		<div class="color-header">{name}</div>
		<div class="color-variants">
			{#each ['base', 'soft', 'saturated', 'contrast'] as variant}
				{@const cssVar = variant === 'base' ? `--color-${name}` : `--color-${name}-${variant}`}
				{@const contrastVar =
					variant === 'contrast' ? `--color-${name}` : `--color-${name}-contrast`}
				<div class="color-swatch" style="background: var({cssVar}); color: var({contrastVar})">
					<span class="swatch-label">{variant}</span>
				</div>
			{/each}
		</div>
	</div>
{/snippet}

<DemoSection title="Theming" id="theming">
	<p class="intro">
		The theme system provides a flexible, token-based approach to styling with automatic light/dark
		mode support.
	</p>

	<!-- Theme Mode Toggle -->

	<h3>Theme Mode</h3>
	<p class="description">
		Toggle between light and dark modes. The system respects <code>prefers-color-scheme</code> by default
		and persists your choice in localStorage.
	</p>
	<Button
		icon={{ name: themeMode === 'dark' ? 'light_mode' : 'dark_mode' }}
		label="Toggle to {themeMode === 'dark' ? 'light' : 'dark'}"
		onClick={onThemeToggle}
	/>

	<!-- Palette Colors -->

	<h3>Palette Colors</h3>
	<p class="description">
		Semantic colors that remain consistent across light and dark modes. Each color generates three
		variants: <strong>soft</strong>, <strong>saturated</strong>, and
		<strong>contrast</strong>.
	</p>
	<div class="color-grid">
		{#each paletteColors as [name]}
			{@render colorCard(name)}
		{/each}
	</div>

	<!-- Surface Colors -->

	<h3>Surface Colors</h3>
	<p class="description">
		Background and foreground colors that automatically swap between light and dark modes. These
		define the base canvas and text colors.
	</p>
	<div class="color-grid surface-grid">
		{#each surfaceColors as name}
			{@render colorCard(name, true)}
		{/each}
	</div>

	<!-- Token Generation Logic -->

	<h3>Token Generation Logic</h3>
	<ul class="bullet-list">
		<li>
			<strong>Soft:</strong> <code>lighten(25%) + desaturate(10%)</code> — A lighter, muted variant ideal
			for backgrounds when using the base as foreground.
		</li>
		<li>
			<strong>Saturated:</strong> <code>darken(15%) + saturate(10%)</code> — A deeper, more intense shade
			for emphasis or active states.
		</li>
		<li>
			<strong>Contrast:</strong> <code>isDark() ? white : black</code> — Automatically picks black or
			white for text/icons ensuring WCAG compliance.
		</li>
	</ul>

	<!-- Architecture Overview -->

	<h3>Architecture</h3>
	<ul class="bullet-list">
		<li>
			All tokens are exposed as <code>--color-*</code> custom properties on <code>:root</code>.
		</li>
		<li>
			Surface colors use <code>data-theme</code> attribute with automatic fallback to
			<code>prefers-color-scheme</code>.
		</li>
		<li>User preference is persisted in <code>localStorage</code>.</li>
		<li>
			Hover states are delegated to components using <code>color-mix()</code> for context-aware derivation.
		</li>
	</ul>
</DemoSection>

<style>
	.intro {
		text-align: center;
		font-size: 1.1rem;
		max-width: 40rem;
		opacity: 0.8;
	}

	h3 {
		font-size: 1.4rem;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		width: 100%;
		text-align: center;
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

	/* Color Grid */
	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1rem;
		width: 100%;
	}

	.surface-grid {
		max-width: 320px;
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
		font-weight: 500;
	}

	/* Bullet Lists */
	.bullet-list {
		list-style: disc;
		padding-left: 1.5rem;
		max-width: 40rem;
		text-align: left;
	}

	.bullet-list li {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.bullet-list li:last-child {
		margin-bottom: 0;
	}
</style>
