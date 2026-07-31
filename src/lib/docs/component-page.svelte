<script lang="ts">
	import Section from '../../internal/layout/section.svelte';
	import CodeSnippet from '../../internal/layout/code-snippet.svelte';
	import type { ComponentWorkbench, DocumentedExample, ExampleCoverage } from './types.ts';

	let { workbench }: { workbench: ComponentWorkbench } = $props();

	const status = (coverage: string) => (coverage === 'shown' ? 'Shown' : 'Not applicable');
	const examplesFor = (coverage: ExampleCoverage) =>
		coverage.coverage === 'shown' ? coverage.examples : [];
</script>

{#snippet liveDemo(example: DocumentedExample)}
	{@const Demo = example.demo.component}
	<div class="demo" aria-label={`Live demo: ${example.title}`}>
		<Demo {...example.demo.props} />
	</div>
{/snippet}

<Section>
	<p class="intro">{workbench.description}</p>
</Section>

<Section title="Public API" description="Required and optional consumer-facing members.">
	<ul>
		{#each workbench.api as member (member.name)}
			<li>
				<code>{member.name}{member.required ? '' : '?'}</code>: {member.type} — {member.description}
			</li>
		{/each}
	</ul>
</Section>

<Section title="Types" description="Complete public type definitions used by this component.">
	{#each workbench.types as type (type.name)}
		<h3>{type.name}</h3>
		<CodeSnippet snippet={type.definition} />
	{/each}
</Section>

<Section title="Variants and sizes" description="Every visual option has an executable example.">
	{#each examplesFor(workbench.variants) as example (example.title)}
		<h3>{example.title}</h3>
		<p>{example.description}</p>
		{@render liveDemo(example)}
		<CodeSnippet snippet={example.code} />
	{/each}
	{#if workbench.variants.coverage === 'not-applicable'}
		<p><strong>Variants:</strong> Not applicable — {workbench.variants.rationale}</p>
	{/if}
	{#each examplesFor(workbench.sizes) as example (example.title)}
		<h3>{example.title}</h3>
		<p>{example.description}</p>
		{@render liveDemo(example)}
		<CodeSnippet snippet={example.code} />
	{/each}
	{#if workbench.sizes.coverage === 'not-applicable'}
		<p><strong>Sizes:</strong> Not applicable — {workbench.sizes.rationale}</p>
	{/if}
</Section>

<Section
	title="State coverage"
	description="Each relevant boundary state is represented before release."
>
	<ul>
		{#each workbench.states as state (state.name)}
			<li>
				<strong>{state.name}</strong> ({status(state.coverage)}): {state.description}
				{#if state.coverage === 'shown'}
					{@const StateDemo = state.demo.component}
					<div class="demo" aria-label={`Live ${state.name} state demo`}>
						<StateDemo {...state.demo.props} />
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</Section>

<Section title="Dense usage" description={workbench.denseUsage.description}>
	{@render liveDemo(workbench.denseUsage)}
	<CodeSnippet snippet={workbench.denseUsage.code} />
</Section>

<Section
	title="Keyboard and accessibility"
	description="Documented behavior is part of the public contract."
>
	<ul>
		{#each workbench.keyboard as instruction (instruction.keys)}
			<li><kbd>{instruction.keys}</kbd>: {instruction.behavior}</li>
		{/each}
		{#each workbench.accessibility as note (note)}
			<li>{note}</li>
		{/each}
	</ul>
</Section>

<Section title="Controller coverage" description={workbench.controller.description}>
	{#if workbench.controller.code}
		<CodeSnippet snippet={workbench.controller.code} />
	{/if}
</Section>

<style>
	.intro {
		max-width: 40rem;
		text-align: center;
	}
	ul {
		display: grid;
		gap: 0.75rem;
		max-width: 48rem;
	}
	code,
	kbd {
		font-family: monospace;
	}
	h3 {
		font-size: 1.25rem;
	}
	.demo {
		margin: 0.75rem 0;
		padding: 1rem;
		border: 1px solid color-mix(in srgb, var(--color-foreground) 20%, transparent);
		border-radius: 0.75rem;
	}
</style>
