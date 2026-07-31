<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

{#if children}
	{@render children()}
{/if}

<style>
	:global(:root) {
		color-scheme: dark;

		/* Semantic color tokens */
		--color-background: #181818;
		--color-background-soft: #202020;
		--color-background-saturated: #111111;
		--color-background-contrast: #cccccc;
		--color-surface: #1f1f1f;
		--color-surface-hover: #2a2d2e;
		--color-border: #343434;
		--color-foreground: #cccccc;
		--color-foreground-soft: #8b8b8b;
		--color-foreground-saturated: #eeeeee;
		--color-foreground-contrast: #181818;
		--color-muted: #8b8b8b;
		--color-accent: #4daafc;
		--color-focus: #007fd4;

		/* Component color aliases */
		--color-primary: var(--color-accent);
		--color-primary-soft: #173752;
		--color-primary-saturated: #84c4ff;
		--color-primary-contrast: #08121b;
		--color-secondary: #e08d79;
		--color-secondary-soft: #4a2d26;
		--color-secondary-contrast: #181818;
		--color-success: #77b374;
		--color-success-soft: #263b25;
		--color-success-contrast: #101810;
		--color-warning: #e6a73a;
		--color-warning-soft: #4d3815;
		--color-warning-contrast: #181205;
		--color-danger: #f06b76;
		--color-danger-soft: #4e2428;
		--color-danger-contrast: #1b090b;
		--color-info: #62b3e8;
		--color-info-soft: #1c3d51;
		--color-info-contrast: #09151c;

		/* Spacing and dense control sizing */
		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-6: 1.5rem;
		--space-8: 2rem;
		--spacing: var(--space-4);
		--control-small: 1.5rem;
		--control-medium: 1.75rem;
		--control-large: 2rem;

		/* Typography */
		--font-family: system-ui, sans-serif;
		--font-family-display: ui-serif, Georgia, serif;
		--font-size-small: 0.875rem;
		--font-size-medium: 1rem;
		--font-size-large: 1.125rem;
		--font-weight-normal: 400;
		--font-weight-semibold: 600;
		--line-height-tight: 1.2;
		--line-height-normal: 1.5;

		/* Shape, elevation, motion, and focus */
		--radius-small: 0.25rem;
		--radius-medium: 0.5rem;
		--radius-large: 1rem;
		--border-width: 1px;
		--border-radius: var(--radius-medium);
		--shadow-small: 0 1px 2px rgb(0 0 0 / 0.3);
		--shadow-medium: 0 4px 12px rgb(0 0 0 / 0.35);
		--shadow-control: 0 0.03rem 0.125rem rgb(0 0 0 / 0.08);
		--shadow-control-hover: 0 0.0625rem 0.25rem rgb(0 0 0 / 0.1);
		--motion-fast: 120ms;
		--motion-normal: 200ms;
		--motion-slow: 320ms;
		--motion-ease: ease;
		--focus-ring: 0 0 0 2px var(--color-focus);
	}

	:global(body) {
		margin: 0;
		background: var(--color-background);
		color: var(--color-foreground);
		font-family: var(--font-family);
		line-height: var(--line-height-normal);
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(h1) {
		font-family: var(--font-family-display);
	}

	:global(*:focus-visible) {
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
		box-shadow: var(--focus-ring);
	}

	@media (forced-colors: active) {
		:global(*:focus-visible) {
			outline-color: Highlight;
		}
	}
</style>
