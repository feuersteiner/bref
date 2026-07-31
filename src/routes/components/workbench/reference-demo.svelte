<script lang="ts">
	let variant = $state<'primary' | 'secondary'>('primary');
	let size = $state<'small' | 'medium'>('medium');
	let disabled = $state(false);
	let presses = $state(0);

	const label = $derived(
		disabled ? 'Reference action unavailable' : `Reference action pressed ${presses} times`
	);
</script>

<div class="reference-demo">
	<label>
		Variant
		<select bind:value={variant} aria-label="Reference demo variant">
			<option value="primary">Primary</option>
			<option value="secondary">Secondary</option>
		</select>
	</label>
	<label>
		Size
		<select bind:value={size} aria-label="Reference demo size">
			<option value="small">Small</option>
			<option value="medium">Medium</option>
		</select>
	</label>
	<label><input type="checkbox" bind:checked={disabled} /> Disabled</label>
	<button
		class:secondary={variant === 'secondary'}
		class:small={size === 'small'}
		disabled
		onclick={() => (presses += 1)}
	>
		Reference action
	</button>
	<p aria-live="polite">{label}</p>
</div>

<style>
	.reference-demo {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
	}
	label {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}
	button {
		padding: 0.5rem 0.75rem;
		border: 0;
		border-radius: 0.5rem;
		background: var(--color-primary);
		color: var(--color-primary-foreground);
	}
	button.secondary {
		background: var(--color-secondary);
		color: var(--color-secondary-foreground);
	}
	button.small {
		padding: 0.25rem 0.5rem;
	}
	button:disabled {
		opacity: 0.55;
	}
	p {
		width: 100%;
		margin: 0;
	}
</style>
