<script lang="ts">
	import { delay } from 'lodash-es';
	const {
		snippet
	}: {
		snippet: string;
	} = $props();

	let hasCopied = $state(false);

	const onCopyClick = () => {
		navigator.clipboard.writeText(snippet).then(() => {
			hasCopied = true;
			delay(() => (hasCopied = false), 3000);
		});
	};
</script>

<div>
	<pre>
		<code>{snippet}</code>
	</pre>
	<button onclick={onCopyClick}>copy</button>
</div>

<style>
	div {
		display: flex;
		width: 100%;
		height: fit-content;
		padding: 1rem;
		gap: 1rem;
		flex-direction: column;
		border-radius: 0.5rem;
		background-color: white;
		border: 1px solid #e0e0e0;
	}
	code {
		white-space: pre-wrap;
		word-break: break-word;
		flex-grow: 1;
		font-family: monospace;
		font-weight: 400;
		text-align: left;
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
	button {
		display: flex;
		padding: 0.5rem 1rem;
		width: 100%;
		height: fit-content;
		text-transform: capitalize;
		align-items: center;
		cursor: pointer;
		justify-content: center;
	}
</style>
