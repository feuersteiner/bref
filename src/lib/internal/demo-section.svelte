<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		title,
		description,
		id
	}: {
		children: Snippet;
		title?: string;
		description?: string;
		id?: string;
	} = $props();
</script>

<section {id}>
	{#if title}
		<h2>{title}</h2>
	{/if}
	{#if description}
		<p>{description}</p>
	{/if}
	{@render children()}
</section>

<style>
	section {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-direction: column;
		background-color: color-mix(in srgb, var(--color-background) 90%, transparent);
		backdrop-filter: blur(2rem);
		padding: 2rem;
		width: 100%;
		max-width: 50rem;
		transition: all 0.3s ease;
		border-radius: 2rem;
		border: 1px solid color-mix(in srgb, var(--color-foreground) 10%, transparent);
	}
	section:hover {
		border: 1px solid color-mix(in srgb, var(--color-foreground) 20%, transparent);
		box-shadow: 0 0 3rem color-mix(in srgb, var(--color-background) 50%, transparent);
	}
	h2 {
		font-size: 2rem;
	}
	p {
		font-size: 1.1rem;
	}
</style>
