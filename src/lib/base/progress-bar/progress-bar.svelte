<script lang="ts">
	import type { ProgressBarProps } from './types.ts';

	const {
		value,
		size = 'medium',
		color = 'primary',
		wide = false,
		animateValue = false,
		onValueClick
	}: ProgressBarProps = $props();

	const isIndeterminate = $derived(value === undefined);
	const progressWidth = $derived(
		value === undefined ? undefined : `${Math.min(100, Math.max(0, value))}%`
	);
	const isClickable = $derived(onValueClick !== undefined);

	const handleClick = (e: MouseEvent) => {
		if (!onValueClick) return;
		const element = e.currentTarget as HTMLElement;
		const rect = element.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const percentage = Math.round((clickX / rect.width) * 100);
		onValueClick(Math.min(100, Math.max(0, percentage)));
	};
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class={`${size} ${color}`}
	class:wide
	class:clickable={isClickable}
	class:indeterminate={isIndeterminate}
	class:animate={animateValue}
	role="progressbar"
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuetext={isIndeterminate ? 'Loading' : `${value}%`}
	onclick={isClickable ? handleClick : undefined}
>
	<span class:indeterminate={isIndeterminate} style:width={progressWidth}></span>
</div>

<style>
	div {
		--internal-progress-height: 0.5rem;
		--internal-progress-radius: calc(var(--internal-progress-height) * 0.5);

		position: relative;
		display: flex;
		min-width: 4rem;
		width: 8rem;
		max-width: 100%;
		height: var(--internal-progress-height);
		background-color: var(--internal-current-color-soft);
		border-radius: var(--internal-progress-radius);
		overflow: hidden;
	}

	.wide {
		width: 100%;
	}

	.clickable {
		cursor: pointer;
	}

	span {
		height: 100%;
		display: flex;
		background-color: var(--internal-current-color);
		border-radius: var(--internal-progress-radius);
	}

	.animate span:not(.indeterminate) {
		transition: width 0.3s ease-out;
	}

	span.indeterminate {
		animation: indeterminate-fill 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	div.indeterminate {
		justify-content: flex-start;
		animation: indeterminate-container 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	@keyframes indeterminate-fill {
		0%,
		100% {
			width: 25%;
			opacity: 0.5;
		}

		50% {
			width: 100%;
			opacity: 0.25;
		}
	}

	@keyframes indeterminate-container {
		0%,
		100% {
			padding-left: 0;
		}
		50% {
			padding-left: 75%;
		}
	}

	/* Sizes */
	.x-small {
		--internal-progress-height: 0.25rem;
	}

	.small {
		--internal-progress-height: 0.375rem;
	}

	.medium {
		--internal-progress-height: 0.5rem;
	}

	.large {
		--internal-progress-height: 0.625rem;
	}

	.x-large {
		--internal-progress-height: 0.75rem;
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
		--internal-current-color-soft: var(--color-background-saturated);
	}

	.background {
		--internal-current-color: var(--color-background);
		--internal-current-color-soft: var(--color-foreground-saturated);
	}
</style>
