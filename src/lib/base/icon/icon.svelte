<script lang="ts">
	import '@fontsource-variable/material-symbols-rounded/fill.css';
	import '@fontsource-variable/material-symbols-outlined';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { IconProps } from './types.ts';

	const {
		name,
		filled = false,
		size = 'medium',
		color = 'foreground',
		...rest
	}: IconProps & SvelteHTMLElements['span'] = $props();
</script>

<span {...rest} class:filled class={`${size} ${color}`} aria-hidden="true">
	{name}
</span>

<style>
	span {
		font-family: 'Material Symbols Outlined Variable';
		font-weight: normal;
		font-style: normal;
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;
		user-select: none;
	}

	.filled {
		font-family: 'Material Symbols Rounded Variable';
	}

	.x-small {
		font-size: 0.75rem;
	}
	.small {
		font-size: 1rem;
	}
	.medium {
		font-size: 1.5rem;
	}
	.large {
		font-size: 2rem;
	}
	.x-large {
		font-size: 3rem;
	}
	.foreground {
		color: var(--color-foreground);
	}
	.primary {
		color: var(--color-primary);
	}
	.secondary {
		color: var(--color-secondary);
	}
	.success {
		color: var(--color-success);
	}
	.warning {
		color: var(--color-warning);
	}
	.danger {
		color: var(--color-danger);
	}
	.background {
		color: var(--color-background);
	}
	.info {
		color: var(--color-info);
	}
</style>
