<script lang="ts">
	import type { TextualLoadingProps } from './types.ts';
	import { onMount, onDestroy } from 'svelte';

	const {
		size = 'medium',
		color = 'primary',
		words = 'Loading',
		dots = true,
		intervalMs = 500
	}: TextualLoadingProps = $props();

	let dotCount = $state(0);
	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		if (dots) {
			interval = setInterval(() => {
				dotCount = (dotCount + 1) % 4;
			}, intervalMs);
		}
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<span class={`${size} ${color}`} role="status" aria-label="Loading">
	{words}{#if dots}{'.'.repeat(dotCount)}{/if}
</span>

<style>
	span {
		--internal-font-size: 1rem;

		font-size: var(--internal-font-size);
		color: var(--internal-current-color);
		font-weight: 500;
	}

	/* Sizes */
	.x-small {
		--internal-font-size: 0.75rem;
	}

	.small {
		--internal-font-size: 0.875rem;
	}

	.medium {
		--internal-font-size: 1rem;
	}

	.large {
		--internal-font-size: 1.125rem;
	}

	.x-large {
		--internal-font-size: 1.25rem;
	}

	/* Color mappings */
	.primary {
		--internal-current-color: var(--color-primary);
	}

	.secondary {
		--internal-current-color: var(--color-secondary);
	}

	.success {
		--internal-current-color: var(--color-success);
	}

	.warning {
		--internal-current-color: var(--color-warning);
	}

	.danger {
		--internal-current-color: var(--color-danger);
	}

	.info {
		--internal-current-color: var(--color-info);
	}

	.foreground {
		--internal-current-color: var(--color-foreground);
	}

	.background {
		--internal-current-color: var(--color-background);
	}
</style>
