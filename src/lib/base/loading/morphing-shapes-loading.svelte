<script lang="ts">
	import type { LoadingProps } from './types.ts';

	const { size = 'medium', color = 'primary' }: LoadingProps = $props();
</script>

<div class={`${size} ${color}`} role="status" aria-label="Loading"></div>

<style>
	div {
		--internal-shape-size: 2rem;

		width: var(--internal-shape-size);
		height: var(--internal-shape-size);
		background-color: var(--internal-current-color);
		animation: morph 2s ease-in-out infinite;
	}

	@keyframes morph {
		0% {
			border-radius: 0%;
			transform: rotate(0deg);
		}
		25% {
			border-radius: 50% 0% 50% 0%;
			transform: rotate(90deg);
		}
		50% {
			border-radius: 50%;
			transform: rotate(180deg);
		}
		75% {
			border-radius: 0% 50% 0% 50%;
			transform: rotate(270deg);
		}
		100% {
			border-radius: 0%;
			transform: rotate(360deg);
		}
	}

	/* Sizes */
	.x-small {
		--internal-shape-size: 1rem;
	}

	.small {
		--internal-shape-size: 1.5rem;
	}

	.medium {
		--internal-shape-size: 2rem;
	}

	.large {
		--internal-shape-size: 2.5rem;
	}

	.x-large {
		--internal-shape-size: 3rem;
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
