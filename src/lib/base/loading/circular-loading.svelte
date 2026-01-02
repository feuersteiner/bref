<script lang="ts">
	import type { LoadingProps } from './types.ts';

	const { size = 'medium', color = 'primary' }: LoadingProps = $props();
</script>

<div class={`${size} ${color}`} role="status" aria-label="Loading"></div>

<style>
	div {
		--internal-loader-size: 2rem;
		--internal-loader-border-width: 3px;

		width: var(--internal-loader-size);
		height: var(--internal-loader-size);
		border-radius: 50%;
		border: var(--internal-loader-border-width) solid transparent;
		border-top-color: var(--internal-current-color);
		animation: spin 0.9s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Sizes */
	.x-small {
		--internal-loader-size: 1rem;
		--internal-loader-border-width: 2px;
	}

	.small {
		--internal-loader-size: 1.5rem;
		--internal-loader-border-width: 2px;
	}

	.medium {
		--internal-loader-size: 2rem;
		--internal-loader-border-width: 3px;
	}

	.large {
		--internal-loader-size: 2.5rem;
		--internal-loader-border-width: 3px;
	}

	.x-large {
		--internal-loader-size: 3rem;
		--internal-loader-border-width: 4px;
	}

	/* Color mappings */
	.primary {
		--internal-current-color: var(--color-primary);
		--internal-current-color-soft: var(--color-primary-soft);
	}

	.secondary {
		--internal-current-color: var(--color-secondary);
		--internal-current-color-soft: var(--color-secondary-soft);
	}

	.success {
		--internal-current-color: var(--color-success);
		--internal-current-color-soft: var(--color-success-soft);
	}

	.warning {
		--internal-current-color: var(--color-warning);
		--internal-current-color-soft: var(--color-warning-soft);
	}

	.danger {
		--internal-current-color: var(--color-danger);
		--internal-current-color-soft: var(--color-danger-soft);
	}

	.info {
		--internal-current-color: var(--color-info);
		--internal-current-color-soft: var(--color-info-soft);
	}

	.foreground {
		--internal-current-color: var(--color-foreground);
		--internal-current-color-soft: var(--color-foreground-soft);
	}

	.background {
		--internal-current-color: var(--color-background);
		--internal-current-color-soft: var(--color-background-soft);
	}
</style>
