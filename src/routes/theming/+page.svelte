<script lang="ts">
	import Section from '../../internal/layout/section.svelte';
	import CodeSnippet from '../../internal/layout/code-snippet.svelte';
	import { CSS_VARIABLES_CODE_SNIPPET, THEME_USAGE_CODE_SNIPPET } from './snippets.ts';

	const colors = [
		['background', '--color-background'],
		['surface', '--color-surface'],
		['surface hover', '--color-surface-hover'],
		['border', '--color-border'],
		['foreground', '--color-foreground'],
		['muted', '--color-muted'],
		['accent', '--color-accent'],
		['focus', '--color-focus']
	] as const;
</script>

<Section>
	<p class="intro">
		Bref provides one explicit dark theme. The Theme component sets semantic CSS tokens without
		runtime color generation or mode switching.
	</p>
</Section>

<Section title="Semantic colors" description="Use intent-based tokens instead of raw color values.">
	<div class="color-grid">
		{#each colors as [name, token] (token)}
			<div class="color-card">
				<span class="swatch" style:background={`var(${token})`}></span>
				<div>
					<strong>{name}</strong>
					<code>{token}</code>
				</div>
			</div>
		{/each}
	</div>
</Section>

<Section title="Foundation tokens" description="Stable tokens for dense, accessible interfaces.">
	<ul>
		<li>
			<strong>Spacing:</strong> <code>--space-1</code>, <code>--space-2</code>,
			<code>--space-3</code>, <code>--space-4</code>, <code>--space-6</code>, and
			<code>--space-8</code>.
		</li>
		<li><strong>Typography:</strong> font family, sizes, weights, and line heights.</li>
		<li>
			<strong>Radius:</strong> <code>--radius-small</code> through <code>--radius-large</code>.
		</li>
		<li><strong>Shadow:</strong> <code>--shadow-small</code> and <code>--shadow-medium</code>.</li>
		<li><strong>Motion:</strong> duration and easing tokens.</li>
		<li>
			<strong>Focus:</strong> <code>--focus-ring</code>, applied with <code>:focus-visible</code>.
		</li>
		<li><strong>Controls:</strong> 1.5rem, 1.75rem, and 2rem minimum dense sizes.</li>
	</ul>
</Section>

<Section title="CSS variables" description="Reference these tokens from component CSS.">
	<CodeSnippet snippet={CSS_VARIABLES_CODE_SNIPPET} />
</Section>

<Section title="Usage" description="Add Theme once at the root of an application.">
	<CodeSnippet snippet={THEME_USAGE_CODE_SNIPPET} />
</Section>

<style>
	.intro {
		max-width: 42rem;
		text-align: center;
		color: var(--color-muted);
	}

	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		gap: var(--space-3);
		width: 100%;
	}

	.color-card {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3);
		border: var(--border-width) solid var(--color-border);
		border-radius: var(--radius-medium);
		background: var(--color-surface);
	}

	.swatch {
		width: var(--control-large);
		height: var(--control-large);
		border-radius: var(--radius-small);
	}

	code {
		display: block;
		color: var(--color-muted);
	}

	ul {
		display: grid;
		gap: var(--space-2);
		padding-left: var(--space-6);
	}
</style>
