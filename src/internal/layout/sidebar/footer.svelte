<script lang="ts">
	import Icon from '$lib/base/icon/icon.svelte';
</script>

<div>
	<span>
		Made with <Icon name="favorite" color="danger" filled size="x-small" /> in Paris, by
		<a href="https://github.com/feuersteiner" target="_blank" rel="noopener noreferrer"
			>Feuerstein.</a
		>
	</span>
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: fit-content;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
	}

	a {
		text-decoration: none;
		color: inherit;
		display: inline-block;
		width: 5rem;
		height: 1.5rem;
	}

	a:hover {
		font-weight: bold;
	}

	span {
		font-size: 0.75rem;
		text-align: center;
		align-items: center;
		color: color-mix(in srgb, var(--color-foreground) 50%, var(--color-background));
	}
</style>
