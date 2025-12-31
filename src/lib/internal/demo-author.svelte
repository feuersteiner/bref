<script lang="ts">
	import Icon from '$lib/base/icon/icon.svelte';
</script>

<span>
	Made with <Icon name="favorite" color="danger" filled /> in Paris, by
	<a href="https://github.com/feuersteiner" target="_blank" rel="noopener noreferrer">Feuerstein.</a>
</span>

<style>
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
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: color-mix(in srgb, var(--color-foreground) 50%, var(--color-background));
	}
</style>
