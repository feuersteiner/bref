<script lang="ts">
	import Theme from '$lib/base/theme/theme.svelte';
	import Sidebar from '../internal/layout/sidebar/sidebar.svelte';
	import Header from '../internal/layout/header.svelte';

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
		scroll-behavior: smooth;
		scroll-snap-type: y mandatory;
		flex-direction: column;
		gap: 1rem;
		background-color: transparent;
	}
</style>
