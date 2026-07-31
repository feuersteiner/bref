<script lang="ts">
	import Section from '../../internal/layout/section.svelte';
	import CodeSnippet from '../../internal/layout/code-snippet.svelte';
	import { CSS_VARIABLES_CODE_SNIPPET, THEME_USAGE_CODE_SNIPPET } from './snippets.ts';

	const colors = [
		['background', '--color-background'],
		['background soft', '--color-background-soft'],
		['background saturated', '--color-background-saturated'],
		['background contrast', '--color-background-contrast'],
		['surface', '--color-surface'],
		['surface hover', '--color-surface-hover'],
		['border', '--color-border'],
		['foreground', '--color-foreground'],
		['foreground soft', '--color-foreground-soft'],
		['foreground saturated', '--color-foreground-saturated'],
		['foreground contrast', '--color-foreground-contrast'],
		['muted', '--color-muted'],
		['accent', '--color-accent'],
		['focus', '--color-focus']
	] as const;

	const componentColors = [
		[
			'primary',
			'--color-primary',
			'--color-primary-soft',
			'--color-primary-saturated',
			'--color-primary-contrast'
		],
		['secondary', '--color-secondary', '--color-secondary-soft', '--color-secondary-contrast'],
		['success', '--color-success', '--color-success-soft', '--color-success-contrast'],
		['warning', '--color-warning', '--color-warning-soft', '--color-warning-contrast'],
		['danger', '--color-danger', '--color-danger-soft', '--color-danger-contrast'],
		['info', '--color-info', '--color-info-soft', '--color-info-contrast']
	] as const;
</script>

<Section>
	<p class="intro">
		Bref provides one explicit dark theme. The Theme component sets semantic CSS tokens without
		runtime color generation or mode switching.
	</p>
</Section>

<Section
	title="Component color aliases"
	description="Use these aliases for component intent and variants."
>
	<ul class="alias-list">
		{#each componentColors as [name, ...tokens] (name)}
			<li>
				<strong>{name}:</strong>
				{#each tokens as token, index (token)}
					<code>{token}</code>{#if index < tokens.length - 1},
					{/if}
				{/each}
			</li>
		{/each}
	</ul>
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
			<code>--space-3</code>, <code>--space-4</code>, <code>--space-6</code>,
			<code>--space-8</code>, and <code>--spacing</code>.
		</li>
		<li>
			<strong>Controls:</strong> <code>--control-small</code>, <code>--control-medium</code>, and
			<code>--control-large</code>.
		</li>
		<li>
			<strong>Typography:</strong> <code>--font-family</code>, <code>--font-family-display</code>,
			<code>--font-size-small</code>, <code>--font-size-medium</code>,
			<code>--font-size-large</code>, <code>--font-weight-normal</code>,
			<code>--font-weight-semibold</code>, <code>--line-height-tight</code>, and
			<code>--line-height-normal</code>.
		</li>
		<li>
			<strong>Shape:</strong> <code>--radius-small</code>, <code>--radius-medium</code>,
			<code>--radius-large</code>, <code>--border-width</code>, and <code>--border-radius</code>.
		</li>
		<li>
			<strong>Shadow:</strong> <code>--shadow-small</code>, <code>--shadow-medium</code>,
			<code>--shadow-control</code>, and <code>--shadow-control-hover</code>.
		</li>
		<li>
			<strong>Motion:</strong> <code>--motion-fast</code>, <code>--motion-normal</code>,
			<code>--motion-slow</code>, and <code>--motion-ease</code>.
		</li>
		<li>
			<strong>Focus:</strong> <code>--focus-ring</code>, applied with <code>:focus-visible</code>.
		</li>
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

	.alias-list {
		list-style: none;
		padding-left: 0;
	}

	.alias-list li {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		align-items: baseline;
	}
</style>
