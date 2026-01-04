<script lang="ts">
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';
	import Section from '$lib/internal/layout/section.svelte';
</script>

<Section>
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
		<li><em>In short</em>: used to summarize or conclude</li>
		<li>Components that do more with less</li>
	</ol>
</Section>
<Section
	title="Installation"
	description="Install Bref via npm or bun or your favorite package manager."
>
	<CodeSnippet snippet="npm install bref-ui" />
</Section>
<Section
	title="Philosophy"
	description="Why Bref? What makes it different from other Svelte component libraries?"
>
	<p>Bref takes a different approach to Svelte component libraries:</p>
	<ul>
		<li>
			<strong>Pure CSS</strong>: Uses Svelte's built-in scoped styling instead of Tailwind. If you chose
			Svelte for its elegant styling solution, Bref keeps that promise.
		</li>
		<li>
			<strong>Minimal</strong>: Only essential components, nothing extra. No bloat, no unnecessary dependencies.
		</li>
		<li>
			<strong>Flexible</strong>: Use as an npm package or copy components directly into your project
			with our CLI tool.
		</li>
		<li>
			<strong>Batteries Included Theming</strong>: Just provide your base colors and Bref handles shade
			generation, contrast calculation, and dark mode automatically.
		</li>
	</ul>
</Section>
<Section title="Roadmap" description="We're building Bref in phases:">
	<ul>
		<li>
			<strong>Base Components</strong>: Button, Icon, Input, Select, Checkbox, and other foundational
			UI elements.
		</li>
		<li>
			<strong>Section Components</strong>: Nav, Card, Accordion, Tabs, Table, Form, and Toast for complex
			layouts.
		</li>
		<li>
			<strong>Marketing Components</strong>: Hero, Features, Pricing, FAQ, and CTA sections for landing
			pages.
		</li>
		<li>
			<strong>CLI Tool</strong>: Import components directly into your codebase and customize them at
			will.
		</li>
	</ul>
	<p>
		Check out the <a href="https://github.com/feuersteiner/bref">GitHub repo</a> to follow our progress
		or contribute!
	</p>
</Section>

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
