<script lang="ts">
	import '@fontsource/spectral';
	import '@fontsource/meow-script';

	const { children } = $props();
</script>

{@render children()}

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
</style>
