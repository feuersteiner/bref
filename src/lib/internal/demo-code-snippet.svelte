<script lang="ts">
	import Button from '$lib/base/button/button.svelte';

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
	<Button
		{onClick}
		wide
		size="small"
		color="foreground"
		variant="soft"
		label={hasCopied ? 'Copied!' : 'Copy Code'}
		icon={{
			name: hasCopied ? 'check' : 'copy_all'
		}}
		disabled={hasCopied}
	/>
</div>

<style>
	div {
		display: flex;
		width: 100%;
		height: fit-content;
		padding: 1rem;
		gap: 1rem;
		flex-direction: column;
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
		height: fit-content;
	}
	pre {
		align-items: flex-start;
		display: flex;
		justify-content: flex-start;
	}
</style>
