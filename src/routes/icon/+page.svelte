<script lang="ts">
	import Icon from '$lib/base/icon/icon.svelte';
	import Section from '../../internal/layout/section.svelte';
	import CodeSnippet from '../../internal/layout/code-snippet.svelte';
	import { ICON_USAGE_CODE_SNIPPET } from './snippets';
</script>

<Section>
	<p class="intro">
		A flexible icon component using Google Material Symbols Rounded, supporting multiple sizes,
		semantic colors, and filled or outlined styles.
	</p>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo">
		<Icon size="x-small" name="person_2" />
		<Icon size="small" name="person_2" />
		<Icon size="medium" name="person_2" />
		<Icon size="large" name="person_2" />
		<Icon size="x-large" name="person_2" />
	</div>
</Section>

<Section title="Colors" description="Semantic colors for different contexts and states.">
	<div class="demo">
		<Icon name="favorite" color="primary" />
		<Icon name="favorite" color="secondary" />
		<Icon name="favorite" color="success" />
		<Icon name="favorite" color="warning" />
		<Icon name="favorite" color="danger" />
		<Icon name="favorite" color="info" />
		<Icon name="favorite" color="foreground" />
	</div>
</Section>

<Section title="Filled vs Outlined" description="Toggle between filled and outlined icon styles.">
	<div class="demo">
		<div class="icon-pair">
			<Icon name="star" size="large" />
			<span class="label">Outlined</span>
		</div>
		<div class="icon-pair">
			<Icon name="star" size="large" filled />
			<span class="label">Filled</span>
		</div>
	</div>
</Section>

<Section title="Common Icons" description="A selection of commonly used icons.">
	<div class="demo icons-grid">
		<div class="icon-item">
			<Icon name="home" size="large" />
			<span class="icon-name">home</span>
		</div>
		<div class="icon-item">
			<Icon name="settings" size="large" />
			<span class="icon-name">settings</span>
		</div>
		<div class="icon-item">
			<Icon name="search" size="large" />
			<span class="icon-name">search</span>
		</div>
		<div class="icon-item">
			<Icon name="menu" size="large" />
			<span class="icon-name">menu</span>
		</div>
		<div class="icon-item">
			<Icon name="close" size="large" />
			<span class="icon-name">close</span>
		</div>
		<div class="icon-item">
			<Icon name="check" size="large" />
			<span class="icon-name">check</span>
		</div>
		<div class="icon-item">
			<Icon name="add" size="large" />
			<span class="icon-name">add</span>
		</div>
		<div class="icon-item">
			<Icon name="delete" size="large" />
			<span class="icon-name">delete</span>
		</div>
		<div class="icon-item">
			<Icon name="edit" size="large" />
			<span class="icon-name">edit</span>
		</div>
		<div class="icon-item">
			<Icon name="refresh" size="large" />
			<span class="icon-name">refresh</span>
		</div>
		<div class="icon-item">
			<Icon name="download" size="large" />
			<span class="icon-name">download</span>
		</div>
		<div class="icon-item">
			<Icon name="upload" size="large" />
			<span class="icon-name">upload</span>
		</div>
	</div>
</Section>

<Section title="Accessibility" description="Icons with aria labels for screen readers.">
	<div class="demo">
		<Icon name="warning" color="warning" size="large" ariaLabel="Warning indicator" />
		<Icon name="check_circle" color="success" size="large" ariaLabel="Success indicator" />
		<Icon name="error" color="danger" size="large" ariaLabel="Error indicator" />
	</div>
</Section>

<Section title="Usage" description="Example code for implementing an icon.">
	<CodeSnippet snippet={ICON_USAGE_CODE_SNIPPET} />
</Section>

<Section title="Browse All Icons" description="Explore the full Material Symbols library from Google.">
	<p class="browse-text">
		This component uses Google Material Symbols Rounded. Browse the full icon library at
		<a
			href="https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Rounded"
			target="_blank"
			rel="noopener noreferrer"
		>
			fonts.google.com/icons
		</a>
		to find the perfect icon for your needs.
	</p>
</Section>

<style>
	.intro {
		text-align: center;
		max-width: 40rem;
		font-size: 1rem;
		opacity: 0.8;
		line-height: 1.6;
	}

	.demo {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.icon-pair {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.label {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.icons-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
		gap: 1.5rem;
		max-width: 500px;
	}

	.icon-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.icon-name {
		font-size: 0.65rem;
		opacity: 0.6;
		font-family: monospace;
	}

	.browse-text {
		text-align: center;
	}

	.browse-text a {
		color: var(--color-primary);
	}
</style>
