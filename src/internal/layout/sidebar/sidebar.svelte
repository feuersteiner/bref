<script lang="ts">
	import Logo from './logo.svelte';
	import Footer from './footer.svelte';
	import { PAGES, type PageProps } from '../types.ts';
	import { pageForPath } from '../navigation.ts';
	import { page } from '$app/state';
	import TreeView from '$lib/base/tree-view/tree-view.svelte';
	import type { NodeDataProps } from '../../../lib/index.ts';
	import navigateTo from '../../navigate.ts';

	const pageToNode = (page: PageProps): NodeDataProps => ({
		id: page.href,
		label: page.title,
		icon: page.icon,
		children: page.children?.map(pageToNode)
	});
	const selectedPage = $derived.by(() => {
		return pageForPath(page.url.pathname);
	});
	const selectedIds = $derived(new Set([selectedPage.href]));
	const onSelect = (href: string) => navigateTo(href);
</script>

<div class="container">
	<Logo />
	<div class="content">
		<TreeView
			wide
			size="small"
			{selectedIds}
			{onSelect}
			data={PAGES.map(pageToNode)}
			expandOnSelect
		/>
	</div>
	<Footer />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
	.container {
		max-width: 15rem;
		width: 15rem;
		/* height: 100%; */
	}
	.content {
		flex: 1;
		width: 100%;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 1rem;
		overflow-y: auto;
	}
</style>
