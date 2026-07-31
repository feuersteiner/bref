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

<section {id} class="container">
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
		padding: 2rem;
		width: 100%;
		flex-shrink: 0;
	}
	h2 {
		font-size: 2rem;
	}
	p {
		font-size: 1.1rem;
	}
</style>
