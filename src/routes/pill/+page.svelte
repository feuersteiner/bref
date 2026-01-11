<script lang="ts">
	import Pill from '$lib/base/pill/pill.svelte';
	import Section from '../../internal/layout/section.svelte';
	import CodeSnippet from '../../internal/layout/code-snippet.svelte';
	import { PILL_USAGE_CODE_SNIPPET } from './snippets.ts';
</script>

<Section>
	<p class="intro">A compact label component for tags, statuses, and categories.</p>
</Section>

<Section title="Filled Variant" description="Solid background pills for primary labels.">
	<div class="demo">
		<Pill label="Primary" variant="filled" color="primary" />
		<Pill label="Secondary" variant="filled" color="secondary" />
		<Pill label="Success" variant="filled" color="success" />
		<Pill label="Warning" variant="filled" color="warning" />
		<Pill label="Danger" variant="filled" color="danger" />
		<Pill label="Info" variant="filled" color="info" />
		<Pill label="Foreground" variant="filled" color="foreground" />
		<span class="background-demo">
			<Pill label="Background" variant="filled" color="background" />
		</span>
	</div>
</Section>

<Section title="Soft Variant" description="Subtle background pills for secondary labels.">
	<div class="demo">
		<Pill label="Primary" variant="soft" color="primary" />
		<Pill label="Secondary" variant="soft" color="secondary" />
		<Pill label="Success" variant="soft" color="success" />
		<Pill label="Warning" variant="soft" color="warning" />
		<Pill label="Danger" variant="soft" color="danger" />
		<Pill label="Info" variant="soft" color="info" />
		<Pill label="Foreground" variant="soft" color="foreground" />
		<span class="background-demo">
			<Pill label="Background" variant="soft" color="background" />
		</span>
	</div>
</Section>

<Section title="Ghost Variant" description="Transparent pills for minimal UI impact.">
	<div class="demo">
		<Pill label="Primary" variant="ghost" color="primary" />
		<Pill label="Secondary" variant="ghost" color="secondary" />
		<Pill label="Success" variant="ghost" color="success" />
		<Pill label="Warning" variant="ghost" color="warning" />
		<Pill label="Danger" variant="ghost" color="danger" />
		<Pill label="Info" variant="ghost" color="info" />
		<Pill label="Foreground" variant="ghost" color="foreground" />
		<span class="background-demo">
			<Pill label="Background" variant="ghost" color="background" />
		</span>
	</div>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo">
		<Pill label="X-Small" size="x-small" />
		<Pill label="Small" size="small" />
		<Pill label="Medium" size="medium" />
		<Pill label="Large" size="large" />
		<Pill label="X-Large" size="x-large" />
	</div>
</Section>

<Section title="With Icons" description="Add leading icons to enhance visual context.">
	<div class="demo">
		<Pill label="New" icon={{ name: 'add' }} color="success" />
		<Pill label="Favorite" icon={{ name: 'favorite', filled: true }} color="danger" />
		<Pill label="Settings" icon={{ name: 'settings' }} variant="soft" color="secondary" />
		<Pill label="Warning" icon={{ name: 'warning' }} variant="ghost" color="warning" />
	</div>
</Section>

<Section title="Icons at Different Sizes" description="Icons scale appropriately with pill size.">
	<div class="demo">
		<Pill label="X-Small" icon={{ name: 'star' }} size="x-small" color="warning" />
		<Pill label="Small" icon={{ name: 'star' }} size="small" color="warning" />
		<Pill label="Medium" icon={{ name: 'star' }} size="medium" color="warning" />
		<Pill label="Large" icon={{ name: 'star' }} size="large" color="warning" />
		<Pill label="X-Large" icon={{ name: 'star' }} size="x-large" color="warning" />
	</div>
	<div class="demo">
		<Pill
			label="Filled"
			icon={{ name: 'check_circle', filled: true }}
			size="small"
			color="success"
		/>
		<Pill
			label="Filled"
			icon={{ name: 'check_circle', filled: true }}
			size="medium"
			color="success"
		/>
		<Pill
			label="Filled"
			icon={{ name: 'check_circle', filled: true }}
			size="large"
			color="success"
		/>
	</div>
	<div class="demo">
		<Pill label="Soft" icon={{ name: 'info' }} size="small" variant="soft" color="info" />
		<Pill label="Soft" icon={{ name: 'info' }} size="medium" variant="soft" color="info" />
		<Pill label="Soft" icon={{ name: 'info' }} size="large" variant="soft" color="info" />
	</div>
	<div class="demo">
		<Pill label="Ghost" icon={{ name: 'bolt' }} size="small" variant="ghost" color="danger" />
		<Pill label="Ghost" icon={{ name: 'bolt' }} size="medium" variant="ghost" color="danger" />
		<Pill label="Ghost" icon={{ name: 'bolt' }} size="large" variant="ghost" color="danger" />
	</div>
</Section>

<Section title="Usage" description="Example code for implementing pills.">
	<CodeSnippet snippet={PILL_USAGE_CODE_SNIPPET} />
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

	.background-demo {
		background-color: gray;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
