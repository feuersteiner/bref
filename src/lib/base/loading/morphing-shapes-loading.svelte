<script lang="ts">
	import type { MorphingShapesLoadingProps } from './types.ts';

	const {
		size = 'medium',
		color = 'primary',
		speed = 'normal',
		isGradient = false,
		pulseShadow = false
	}: MorphingShapesLoadingProps = $props();
</script>

<div
	class={`holder ${size} ${speed} ${isGradient ? 'gradient' : color} ${pulseShadow ? 'pulse-shadow' : ''}`}
	role="status"
	aria-label="Loading"
>
	<div class="shape"></div>
</div>

<style>
	.holder {
		--internal-shape-size: 2rem;
		--internal-morph-duration: 4s;
		--internal-rotate-duration: 5s;
		width: var(--internal-shape-size);
		height: var(--internal-shape-size);
	}

	.shape {
		width: 100%;
		height: 100%;
		background: var(--internal-current-color);
		animation:
			morph var(--internal-morph-duration) cubic-bezier(0.4, 0, 0.2, 1) infinite,
			rotate var(--internal-rotate-duration) cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
	}

	.gradient .shape {
		background: linear-gradient(
			135deg,
			var(--color-primary),
			var(--color-secondary),
			var(--color-success),
			var(--color-info),
			var(--color-warning),
			var(--color-danger),
			var(--color-primary)
		);
		background-size: 600% 600%;
		animation:
			morph var(--internal-morph-duration) cubic-bezier(0.4, 0, 0.2, 1) infinite,
			rotate var(--internal-rotate-duration) cubic-bezier(0.22, 0.61, 0.36, 1) infinite,
			gradient-flow 12s ease-in-out infinite;
	}

	@keyframes gradient-flow {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	@keyframes morph {
		0%,
		100% {
			border-radius: 50%;
			corner-shape: round;
			transform: scale(1);
		}
		8% {
			border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
			corner-shape: squircle;
			transform: scale(1.02);
		}
		18% {
			border-radius: 30%;
			corner-shape: notch;
			transform: scale(0.96);
		}
		28% {
			border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
			corner-shape: round;
			transform: scale(1.04);
		}
		40% {
			border-radius: 35%;
			corner-shape: scoop;
			transform: scale(0.98);
		}
		52% {
			border-radius: 70% 30% 70% 30% / 30% 52% 48% 70%;
			corner-shape: squircle;
			transform: scale(1.03);
		}
		64% {
			border-radius: 25% 75% 25% 75% / 75% 25% 75% 25%;
			corner-shape: bevel;
			transform: scale(0.95);
		}
		76% {
			border-radius: 50% 50% 30% 70% / 60% 40% 60% 40%;
			corner-shape: round;
			transform: scale(1.05);
		}
		88% {
			border-radius: 40% 60% 50% 50% / 50% 60% 40% 50%;
			corner-shape: squircle;
			transform: scale(0.97);
		}
	}

	@keyframes rotate {
		0% {
			rotate: 0deg;
		}
		15% {
			rotate: 75deg;
		}
		30% {
			rotate: 110deg;
		}
		50% {
			rotate: 200deg;
		}
		65% {
			rotate: 280deg;
		}
		80% {
			rotate: 320deg;
		}
		100% {
			rotate: 360deg;
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

	/* Speed mappings */
	.slow {
		--internal-morph-duration: 6s;
		--internal-rotate-duration: 7.5s;
	}

	.normal {
		--internal-morph-duration: 4s;
		--internal-rotate-duration: 5s;
	}

	.fast {
		--internal-morph-duration: 2.4s;
		--internal-rotate-duration: 3s;
	}

	/* Pulse shadow */
	.pulse-shadow .shape {
		--internal-shadow-size: calc(var(--internal-shape-size) * 0.5);
		animation:
			morph var(--internal-morph-duration) cubic-bezier(0.4, 0, 0.2, 1) infinite,
			rotate var(--internal-rotate-duration) cubic-bezier(0.22, 0.61, 0.36, 1) infinite,
			pulse-shadow 2s ease-in-out infinite;
	}

	.pulse-shadow.gradient .shape {
		animation:
			morph var(--internal-morph-duration) cubic-bezier(0.4, 0, 0.2, 1) infinite,
			rotate var(--internal-rotate-duration) cubic-bezier(0.22, 0.61, 0.36, 1) infinite,
			gradient-flow 12s ease-in-out infinite,
			pulse-shadow 2s ease-in-out infinite;
	}

	@keyframes pulse-shadow {
		0%,
		100% {
			box-shadow: 0 0 var(--internal-shadow-size) color-mix(in srgb, var(--color-foreground) 15%, transparent);
		}
		50% {
			box-shadow: 0 0 var(--internal-shadow-size) color-mix(in srgb, var(--color-foreground) 35%, transparent);
		}
	}
</style>
