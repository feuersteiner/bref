<script lang="ts">
	import type { LoadingProps } from './types.ts';

	const { size = 'medium', color = 'primary' }: LoadingProps = $props();
</script>

<div class={`${size} ${color}`} role="status" aria-label="Loading">
	<span></span>
	<span></span>
	<span></span>
</div>

<style>
	div {
		--internal-dot-size: 0.5rem;
		--internal-gap: 0.375rem;

		display: flex;
		align-items: center;
		gap: var(--internal-gap);
		flex-shrink: 0;
	}

	span {
		width: var(--internal-dot-size);
		height: var(--internal-dot-size);
		border-radius: 50%;
		background-color: var(--internal-current-color);
		animation: pulse 1.4s ease-in-out infinite;
	}

	span:nth-child(1) {
		animation-delay: 0s;
	}

	span:nth-child(2) {
		animation-delay: 0.2s;
	}

	span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes pulse {
		0%,
		80%,
		100% {
			opacity: 0.3;
			transform: scale(0.8);
		}
		40% {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Sizes */
	.x-small {
		--internal-dot-size: 0.25rem;
		--internal-gap: 0.2rem;
	}

	.small {
		--internal-dot-size: 0.375rem;
		--internal-gap: 0.25rem;
	}

	.medium {
		--internal-dot-size: 0.5rem;
		--internal-gap: 0.375rem;
	}

	.large {
		--internal-dot-size: 0.625rem;
		--internal-gap: 0.5rem;
	}

	.x-large {
		--internal-dot-size: 0.75rem;
		--internal-gap: 0.5rem;
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
