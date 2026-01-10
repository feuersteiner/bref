<script lang="ts">
	import IconButton from '$lib/base/button/icon-button.svelte';

	const {
		snippet
	}: {
		snippet: string;
	} = $props();

	let hasCopied = $state(false);

	const onClick = () => {
		navigator.clipboard.writeText(snippet).then(() => {
			hasCopied = true;
			setTimeout(() => (hasCopied = false), 3000);
		});
	};
</script>

<div>
	<pre>
		<code>{snippet}</code>
	</pre>

	<IconButton
		{onClick}
		size="x-small"
		color={hasCopied ? 'success' : 'foreground'}
		variant={hasCopied ? 'filled' : 'ghost'}
		rounded
		name={hasCopied ? 'check' : 'copy_all'}
		disabled={hasCopied}
	/>
</div>

<style>
	div {
		display: flex;
		width: 100%;
		position: relative;
		height: fit-content;
		padding: 1rem;
		gap: 0.5rem;
		border-radius: 0.75rem;
		background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-border) 30%, transparent);
		backdrop-filter: blur(8px);
	}
	code {
		white-space: pre-wrap;
		word-break: break-word;
		flex-grow: 1;
		font-family: monospace;
		font-weight: 400;
		text-align: left;
		opacity: 60%;
		font-size: small;
	}
	code,
	pre {
		width: 100%;
		flex: 1;
		align-self: center;
		height: fit-content;
	}
	pre {
		align-items: flex-start;
		display: flex;
		justify-content: flex-start;
	}
</style>
