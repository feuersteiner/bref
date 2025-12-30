<script lang="ts">
	import DemoSection from '$lib/internal/demo-section.svelte';
</script>

<DemoSection>
	<img src={'favicon.svg'} alt="Logo" />
	<h1>Bref</h1>
	<p>A truly Svelte-esque UI Component Library.</p>

	<div>
		<span class="word">bref</span>
		<span class="phonetic">/bʁɛf/</span>
		<span class="part-of-speech">adjective</span>
	</div>

	<div>
		<span class="origin-label">Origin</span>
		<span class="origin-value">French</span>
	</div>

	<ol>
		<li>Brief, short, concise</li>
		<li><em>In short</em> — used to summarize or conclude</li>
		<li>Components that do more with less</li>
	</ol>
</DemoSection>

<style>
	.word {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.phonetic {
		font-family: 'Courier New', monospace;
		font-size: 0.95rem;
		opacity: 0.7;
		letter-spacing: 0.02em;
	}

	.part-of-speech {
		font-size: 0.75rem;
		font-style: italic;
		opacity: 0.6;
	}

	.origin-label {
		opacity: 0.5;
		text-transform: uppercase;
		font-size: 0.65rem;
		letter-spacing: 0.08em;
	}

	.origin-value {
		opacity: 0.8;
	}
</style>
