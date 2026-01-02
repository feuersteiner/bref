<script lang="ts">
	import DemoAuthor from '$lib/internal/demo-author.svelte';
	import DemoButton from '$lib/internal/demo-button.svelte';
	import DemoHeader from '$lib/internal/demo-header.svelte';
	import DemoIconButton from '$lib/internal/demo-icon-button.svelte';
	import DemoIconSection from '$lib/internal/demo-icon-section.svelte';
	import DemoSection from '$lib/internal/demo-section.svelte';
	import DemoTheming from '$lib/internal/demo-theming.svelte';
	import DemoTypes from '$lib/internal/demo-types.svelte';
</script>

<main>
	<DemoHeader />
	<DemoSection title="Table of Contents">
		<ul>
			<li><a href="#theming">Theming</a></li>
			<li><a href="#types">Types</a></li>
			<li><a href="#buttons">Buttons</a></li>
			<li><a href="#icons">Icons</a></li>
		</ul>
	</DemoSection>
	<DemoTheming />
	<DemoTypes />
	<DemoIconSection />
	<DemoButton />
	<DemoIconButton />
	<DemoAuthor />
</main>

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
	main {
		width: 100vw;
		min-height: 100vh;
		height: fit-content;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 2rem;
		padding: 4rem;
		background-color: #edebd7;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
		background-size: 200px 200px;
		background-repeat: repeat;
		background-blend-mode: overlay;
	}
</style>
