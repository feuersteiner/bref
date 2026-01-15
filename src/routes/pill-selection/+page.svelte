<script lang="ts">
	import PillSelection from '$lib/base/pill-selection/pill-selection.svelte';
	import Section from '../../internal/layout/section.svelte';
	import CodeSnippet from '../../internal/layout/code-snippet.svelte';
	import {
		PILL_SELECTION_USAGE_SNIPPET,
		PILL_SELECTION_MAX_LENGTH_SNIPPET,
		PILL_SELECTION_DISABLE_OTHERS_SNIPPET
	} from './snippets.ts';

	let basicSelection = $state<string[]>([]);
	let colorSelection = $state<string[]>(['primary']);
	let maxSelection = $state<string[]>([]);
	let disableSelection = $state<string[]>([]);
	let sizeSelection = $state<string[]>(['medium']);
	let iconSelection = $state<string[]>([]);

	const frameworkItems = [
		{ id: 'svelte', label: 'Svelte' },
		{ id: 'react', label: 'React' },
		{ id: 'vue', label: 'Vue' },
		{ id: 'angular', label: 'Angular' },
		{ id: 'solid', label: 'Solid' }
	];

	const iconItems = [
		{ id: 'home', label: 'Home', icon: { name: 'home' as const } },
		{ id: 'settings', label: 'Settings', icon: { name: 'settings' as const } },
		{ id: 'favorite', label: 'Favorite', icon: { name: 'favorite' as const, filled: true } },
		{ id: 'search', label: 'Search', icon: { name: 'search' as const } }
	];
</script>

<Section>
	<p class="intro">A multi-select pill component for choosing one or more options from a set.</p>
</Section>

<Section title="Basic Selection" description="Click pills to toggle selection.">
	<div class="demo">
		<PillSelection
			items={frameworkItems}
			selection={basicSelection}
			onSelect={(s) => (basicSelection = s)}
		/>
	</div>
	<p class="selection-display">
		Selected: {basicSelection.length ? basicSelection.join(', ') : 'none'}
	</p>
</Section>

<Section title="Colors" description="Available color options for pill selection.">
	<div class="demo-column">
		<div class="demo">
			<span class="label">Primary:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={colorSelection}
				onSelect={(s) => (colorSelection = s)}
				color="primary"
			/>
		</div>
		<div class="demo">
			<span class="label">Secondary:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={colorSelection}
				onSelect={(s) => (colorSelection = s)}
				color="secondary"
			/>
		</div>
		<div class="demo">
			<span class="label">Success:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={colorSelection}
				onSelect={(s) => (colorSelection = s)}
				color="success"
			/>
		</div>
		<div class="demo">
			<span class="label">Warning:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={colorSelection}
				onSelect={(s) => (colorSelection = s)}
				color="warning"
			/>
		</div>
		<div class="demo">
			<span class="label">Danger:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={colorSelection}
				onSelect={(s) => (colorSelection = s)}
				color="danger"
			/>
		</div>
		<div class="demo">
			<span class="label">Info:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={colorSelection}
				onSelect={(s) => (colorSelection = s)}
				color="info"
			/>
		</div>
	</div>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo-column">
		<div class="demo">
			<span class="label">X-Small:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={sizeSelection}
				onSelect={(s) => (sizeSelection = s)}
				size="x-small"
			/>
		</div>
		<div class="demo">
			<span class="label">Small:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={sizeSelection}
				onSelect={(s) => (sizeSelection = s)}
				size="small"
			/>
		</div>
		<div class="demo">
			<span class="label">Medium:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={sizeSelection}
				onSelect={(s) => (sizeSelection = s)}
				size="medium"
			/>
		</div>
		<div class="demo">
			<span class="label">Large:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={sizeSelection}
				onSelect={(s) => (sizeSelection = s)}
				size="large"
			/>
		</div>
		<div class="demo">
			<span class="label">X-Large:</span>
			<PillSelection
				items={frameworkItems.slice(0, 3)}
				selection={sizeSelection}
				onSelect={(s) => (sizeSelection = s)}
				size="x-large"
			/>
		</div>
	</div>
</Section>

<Section title="With Icons" description="Add leading icons to enhance visual context.">
	<div class="demo">
		<PillSelection
			items={iconItems}
			selection={iconSelection}
			onSelect={(s) => (iconSelection = s)}
			color="secondary"
		/>
	</div>
	<p class="selection-display">
		Selected: {iconSelection.length ? iconSelection.join(', ') : 'none'}
	</p>
</Section>

<Section
	title="Max Selection Length (Dequeue)"
	description="Limit selection to 2 items. Selecting a new item removes the oldest."
>
	<div class="demo">
		<PillSelection
			items={frameworkItems}
			selection={maxSelection}
			onSelect={(s) => (maxSelection = s)}
			maxSelectionLength={2}
			color="success"
		/>
	</div>
	<p class="selection-display">
		Selected: {maxSelection.length ? maxSelection.join(', ') : 'none'} (max 2, dequeue oldest)
	</p>
</Section>

<Section
	title="Max Selection Length (Disable Others)"
	description="Limit selection to 2 items. Disables unselected items when full."
>
	<div class="demo">
		<PillSelection
			items={frameworkItems}
			selection={disableSelection}
			onSelect={(s) => (disableSelection = s)}
			maxSelectionLength={2}
			disableOthersOnFull
			color="danger"
		/>
	</div>
	<p class="selection-display">
		Selected: {disableSelection.length ? disableSelection.join(', ') : 'none'} (max 2, others disabled)
	</p>
</Section>

<Section title="Usage" description="Basic implementation example.">
	<CodeSnippet snippet={PILL_SELECTION_USAGE_SNIPPET} />
</Section>

<Section
	title="Max Selection with Dequeue"
	description="Oldest selection is removed when max is reached."
>
	<CodeSnippet snippet={PILL_SELECTION_MAX_LENGTH_SNIPPET} />
</Section>

<Section
	title="Max Selection with Disable"
	description="Unselected items are disabled when max is reached."
>
	<CodeSnippet snippet={PILL_SELECTION_DISABLE_OTHERS_SNIPPET} />
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

	.demo-column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}

	.label {
		min-width: 5rem;
		font-size: 0.875rem;
		opacity: 0.7;
	}

	.selection-display {
		margin-top: 1rem;
		font-size: 0.875rem;
		opacity: 0.7;
		text-align: center;
	}
</style>
