<script lang="ts">
	import { page } from '$app/state';
</script>

<div>
	<h1>
		{page.status}
	</h1>
	<p>
		{page.error?.message || 'An unexpected error occurred.'}
	</p>
</div>

<style>
	div {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
</style>
