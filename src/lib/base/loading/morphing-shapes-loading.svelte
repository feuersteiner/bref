<script lang="ts">
	import type { LoadingProps } from './types.ts';

	const { size = 'medium', color = 'primary' }: LoadingProps = $props();
</script>

<div class={`${size} ${color}`} role="status" aria-label="Loading">
	<div class="shape"></div>
</div>

<style>
	div {
		--internal-shape-size: 2rem;
		width: var(--internal-shape-size);
		height: var(--internal-shape-size);
	}

	.shape {
		width: 100%;
		height: 100%;
		background-color: var(--internal-current-color);
		animation:
			morph 4s ease-in-out infinite,
			rotate 8s linear infinite;
	}

	@keyframes morph {
		0% {
			/* Circle */
			border-radius: 50%;
			corner-shape: round;
		}
		14% {
			/* Squircle */
			border-radius: 35%;
			corner-shape: squircle;
		}
		28% {
			/* Blob with bevel corners */
			border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
			corner-shape: bevel;
		}
		42% {
			/* Scoop corners */
			border-radius: 40%;
			corner-shape: scoop;
		}
		57% {
			/* Organic blob */
			border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
			corner-shape: round;
		}
		71% {
			/* Notched */
			border-radius: 30%;
			corner-shape: notch;
		}
		85% {
			/* Another blob with squircle */
			border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%;
			corner-shape: squircle;
		}
		100% {
			/* Back to circle */
			border-radius: 50%;
			corner-shape: round;
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
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
