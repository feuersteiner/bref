<script lang="ts">
	import '@fontsource/spectral';
	import '@fontsource/meow-script';
	import Theme from '$lib/base/theme/theme.svelte';
	import Sidebar from '$lib/internal/layout/sidebar/sidebar.svelte';
	import Header from '$lib/internal/layout/header.svelte';

	const { children } = $props();
</script>

<Theme />

<div>
	<Sidebar />
	<main>
		<Header />
		{@render children()}
	</main>
</div>

<style>
	:global(*) {
		font-family: 'Spectral', serif;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(h1) {
		font-family: 'Meow Script', cursive;
		font-size: 5rem;
	}
	:global(body) {
		width: 100vw;
		min-height: 100vh;
		height: fit-content;
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #edebd7;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
		background-size: 200px 200px;
		background-repeat: repeat;
		background-blend-mode: overlay;
	}
	:global(.container) {
		display: flex;
		gap: 1rem;
		overflow: hidden;
		flex-direction: column;
		background-color: color-mix(in srgb, var(--color-background) 90%, transparent);
		backdrop-filter: blur(2rem);
		transition: all 0.2s ease;
		border-radius: 2rem;
		border: 1px solid color-mix(in srgb, var(--color-foreground) 10%, transparent);
	}
	:global(.container:hover) {
		border: 1px solid color-mix(in srgb, var(--color-foreground) 20%, transparent);
		box-shadow: 0 0 3rem color-mix(in srgb, var(--color-background) 50%, transparent);
	}
	div {
		display: flex;
		gap: 1rem;
		max-width: 60rem;
		height: 100vh;
		max-height: 100vh;
		width: 100%;
		padding: 2rem;
	}
	main {
		flex: 1;
		height: 100%;
		display: flex;
		width: 100%;
		overflow: auto;
		flex-direction: column;
		gap: 1rem;
		background-color: transparent;
	}
</style>
