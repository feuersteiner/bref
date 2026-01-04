<script lang="ts">
	import DemoAuthor from '$lib/internal/demo-author.svelte';
	import DemoButton from '$lib/internal/demo-button.svelte';
	import DemoHeader from '$lib/internal/demo-header.svelte';
	import DemoIconButton from '$lib/internal/demo-icon-button.svelte';
	import DemoIconSection from '$lib/internal/demo-icon-section.svelte';
	import DemoLoading from '$lib/internal/demo-loading.svelte';
	import DemoSection from '$lib/internal/demo-section.svelte';
	import DemoTheming from '$lib/internal/demo-theming.svelte';
	import DemoTreeView from '$lib/internal/demo-tree-view.svelte';
	import DemoTypes from '$lib/internal/demo-types.svelte';
</script>

<DemoHeader />
<DemoSection title="Table of Contents">
	<ul>
		<li><a href="#theming">Theming</a></li>
		<li><a href="#types">Types</a></li>
		<li><a href="#buttons">Buttons</a></li>
		<li><a href="#icons">Icons</a></li>
		<li><a href="#loading">Loading</a></li>
		<li><a href="#tree-view">Tree View</a></li>
	</ul>
</DemoSection>
<DemoTheming />
<DemoTypes />
<DemoIconSection />
<DemoButton />
<DemoIconButton />
<DemoLoading />
<DemoTreeView />
<DemoAuthor />

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
</style>
