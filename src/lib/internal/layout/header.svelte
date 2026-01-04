<script lang="ts">
	import Icon from '$lib/base/icon/icon.svelte';
	import { PAGES, type PageProps } from '../layout/types.ts';
	import { page } from '$app/state';

	const { title, description, icon } = $derived.by((): PageProps => {
		if (page.status !== 200) {
			return {
				title: 'Error: ' + page.status,
				description: page.error?.message || 'An unexpected error occurred.',
				icon: 'error',
				href: ''
			};
		}
		const firstPage = PAGES[0];
		const currentPage = PAGES.find((p) => page.url.pathname.includes(p.href));
		return currentPage || firstPage;
	});
</script>

<div class="container">
	<div>
		<Icon name={icon} size="large" color="primary" />
		<h1>{title}</h1>
	</div>
	<p>{description}</p>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		min-height: fit-content;
		height: fit-content;
	}
	.container {
		width: 100%;
		padding: 2rem;
		flex-direction: column;
		align-items: flex-start;
		flex-shrink: 0;
	}
	p {
		opacity: 0.8;
	}
	h1 {
		font-size: 3rem;
	}
</style>
