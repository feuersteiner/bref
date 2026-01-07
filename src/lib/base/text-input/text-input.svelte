<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import IconButton from '../button/icon-button.svelte';
	import { fade } from 'svelte/transition';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { TextInputProps } from './types.ts';
	import { untrack } from 'svelte';

	const {
		value,
		placeholder,
		disabled = false,
		onChange,
		wide = false,
		startIcon,
		ctaIconButton,
		variant = 'soft',
		validation,
		...rest
	}: TextInputProps & Omit<SvelteHTMLElements['input'], 'value'> = $props();

	const VALIDATION_DEBOUNCE_MS = 1000;

	let lastEdit = $state(new Date());
	let now = $state(new Date());

	$effect(() => {
		const interval = setInterval(() => {
			untrack(() => {
				now = new Date();
			});
		}, 250);
		return () => clearInterval(interval);
	});

	const canJudgeValidity = $derived(now.getTime() - lastEdit.getTime() > VALIDATION_DEBOUNCE_MS);
	const isValid = $derived(!validation || value === '' || validation.regex.test(value));
	const validationError = $derived(
		canJudgeValidity && validation && value !== '' && !isValid ? validation.message : null
	);

	const handleInput = (e: Event) => {
		const newValue = (e.currentTarget as HTMLInputElement).value;
		onChange(newValue);
		lastEdit = new Date();
	};

	const handleTrigger = () => {
		if (!ctaIconButton || (validation && !isValid)) return;

		ctaIconButton.onClick();

		if (ctaIconButton.clearOnTrigger) onChange('');
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && ctaIconButton?.triggerOnEnter) {
			e.preventDefault();
			handleTrigger();
		}
	};
</script>

<div class="input-container" class:wide>
	<div class="input-wrapper {variant}" class:wide class:disabled class:invalid={!!validationError}>
		{#if startIcon}
			<Icon name={startIcon} size="small" />
		{/if}
		<input
			{...rest}
			type="text"
			{placeholder}
			{disabled}
			{value}
			oninput={handleInput}
			onkeydown={handleKeydown}
		/>
		{#if ctaIconButton}
			<IconButton
				name={ctaIconButton.name}
				variant={ctaIconButton.variant}
				color={ctaIconButton.color}
				filled={ctaIconButton.filled}
				rounded={ctaIconButton.rounded}
				ariaLabel={ctaIconButton.ariaLabel}
				size="small"
				disabled={disabled || ctaIconButton.disabled}
				onClick={handleTrigger}
			/>
		{/if}
	</div>
	{#if validationError}
		<span class="validation-error" transition:fade>{validationError}</span>
	{/if}
</div>

<style>
	.input-container {
		display: inline-flex;
		flex-direction: column;
		gap: 0.25rem;
		margin: 3px;
		flex-shrink: 0;
	}

	.input-container.wide {
		width: 100%;
	}

	.input-wrapper {
		--internal-input-bg-opacity: 5%;
		--internal-input-hover-opacity: 7%;
		--internal-input-disabled-opacity: 0.5;
		--internal-input-padding-y: calc(var(--spacing) * 0.5);
		--internal-input-padding-x: calc(var(--spacing) * 0.75);
		--internal-input-radius: calc(var(--border-radius) * 1);

		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: var(--internal-input-padding-y) var(--internal-input-padding-x);
		border-radius: var(--internal-input-radius);
		transition:
			background-color 0.15s ease,
			outline-color 0.15s ease;
	}

	.input-wrapper:focus-within {
		outline: 2px solid var(--color-primary);
		outline-offset: 1px;
	}

	.input-wrapper.invalid {
		outline: 2px solid var(--color-danger);
		outline-offset: 1px;
	}

	.input-wrapper.invalid:focus-within {
		outline-color: var(--color-danger);
	}

	input {
		flex: 1;
		border: none;
		background: transparent;
		color: var(--color-foreground);
		font-size: 1rem;
		outline: none;
		min-width: 0;
	}

	input::placeholder {
		color: var(--color-foreground);
		opacity: 0.5;
	}

	.validation-error {
		color: var(--color-danger);
		font-size: 0.75rem;
		opacity: 0.5;
		padding-left: var(--internal-input-padding-x);
	}

	/* Soft variant */
	.soft {
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-input-bg-opacity),
			transparent
		);
	}

	.soft:hover:not(.disabled) {
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-input-hover-opacity),
			transparent
		);
	}

	.soft:focus-within {
		background-color: color-mix(
			in srgb,
			var(--color-foreground) var(--internal-input-hover-opacity),
			transparent
		);
	}

	/* Ghost variant */
	.ghost {
		background-color: transparent;
	}

	.ghost:hover:not(.disabled) {
		background-color: color-mix(in srgb, var(--color-foreground) 3%, transparent);
	}

	/* Wide */
	.input-wrapper.wide {
		width: 100%;
	}

	/* Disabled */
	.disabled {
		opacity: var(--internal-input-disabled-opacity);
		cursor: not-allowed;
	}

	.disabled input {
		cursor: not-allowed;
	}
</style>
