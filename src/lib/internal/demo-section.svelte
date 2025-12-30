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
		background-color: rgba(255, 255, 255, 0.25);
		padding: 2rem;
		width: 100%;
		max-width: 50rem;
		transition: all 0.3s ease;
		border-radius: 2rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	section:hover {
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-shadow: 0 0 3rem rgba(255, 255, 255, 0.5);
	}
	h2 {
		font-size: 2rem;
	}
	p {
		font-size: 1.1rem;
	}
</style>
