<script lang="ts">
	import IconButton from '$lib/base/button/icon-button.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';
	import { ICON_BUTTON_USAGE_CODE_SNIPPET } from './snippets';
</script>

<Section>
	<p class="intro">
		A compact button component displaying only an icon, perfect for toolbars, close buttons, and
		actions where space is limited.
	</p>
</Section>

<Section title="Filled Variant" description="Solid background icon buttons for primary actions.">
	<div class="demo">
		<IconButton name="favorite" variant="filled" color="primary" onClick={() => {}} />
		<IconButton name="favorite" variant="filled" color="secondary" onClick={() => {}} />
		<IconButton name="favorite" variant="filled" color="success" onClick={() => {}} />
		<IconButton name="favorite" variant="filled" color="warning" onClick={() => {}} />
		<IconButton name="favorite" variant="filled" color="danger" onClick={() => {}} />
		<IconButton name="favorite" variant="filled" color="info" onClick={() => {}} />
		<IconButton name="favorite" variant="filled" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="favorite" variant="filled" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Soft Variant" description="Subtle background icon buttons for secondary actions.">
	<div class="demo">
		<IconButton name="favorite" variant="soft" color="primary" onClick={() => {}} />
		<IconButton name="favorite" variant="soft" color="secondary" onClick={() => {}} />
		<IconButton name="favorite" variant="soft" color="success" onClick={() => {}} />
		<IconButton name="favorite" variant="soft" color="warning" onClick={() => {}} />
		<IconButton name="favorite" variant="soft" color="danger" onClick={() => {}} />
		<IconButton name="favorite" variant="soft" color="info" onClick={() => {}} />
		<IconButton name="favorite" variant="soft" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="favorite" variant="soft" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Ghost Variant" description="Transparent icon buttons for minimal UI impact.">
	<div class="demo">
		<IconButton name="favorite" variant="ghost" color="primary" onClick={() => {}} />
		<IconButton name="favorite" variant="ghost" color="secondary" onClick={() => {}} />
		<IconButton name="favorite" variant="ghost" color="success" onClick={() => {}} />
		<IconButton name="favorite" variant="ghost" color="warning" onClick={() => {}} />
		<IconButton name="favorite" variant="ghost" color="danger" onClick={() => {}} />
		<IconButton name="favorite" variant="ghost" color="info" onClick={() => {}} />
		<IconButton name="favorite" variant="ghost" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="favorite" variant="ghost" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Sizes" description="Five sizes from extra small to extra large.">
	<div class="demo">
		<IconButton name="settings" size="x-small" onClick={() => {}} />
		<IconButton name="settings" size="small" onClick={() => {}} />
		<IconButton name="settings" size="medium" onClick={() => {}} />
		<IconButton name="settings" size="large" onClick={() => {}} />
		<IconButton name="settings" size="x-large" onClick={() => {}} />
	</div>
</Section>

<Section title="Rounded - Filled Variant" description="Circular filled icon buttons.">
	<div class="demo">
		<IconButton name="close" rounded variant="filled" color="primary" onClick={() => {}} />
		<IconButton name="close" rounded variant="filled" color="secondary" onClick={() => {}} />
		<IconButton name="close" rounded variant="filled" color="success" onClick={() => {}} />
		<IconButton name="close" rounded variant="filled" color="warning" onClick={() => {}} />
		<IconButton name="close" rounded variant="filled" color="danger" onClick={() => {}} />
		<IconButton name="close" rounded variant="filled" color="info" onClick={() => {}} />
		<IconButton name="close" rounded variant="filled" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="close" rounded variant="filled" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Rounded - Soft Variant" description="Circular soft icon buttons.">
	<div class="demo">
		<IconButton name="close" rounded variant="soft" color="primary" onClick={() => {}} />
		<IconButton name="close" rounded variant="soft" color="secondary" onClick={() => {}} />
		<IconButton name="close" rounded variant="soft" color="success" onClick={() => {}} />
		<IconButton name="close" rounded variant="soft" color="warning" onClick={() => {}} />
		<IconButton name="close" rounded variant="soft" color="danger" onClick={() => {}} />
		<IconButton name="close" rounded variant="soft" color="info" onClick={() => {}} />
		<IconButton name="close" rounded variant="soft" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="close" rounded variant="soft" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Rounded - Ghost Variant" description="Circular ghost icon buttons.">
	<div class="demo">
		<IconButton name="close" rounded variant="ghost" color="primary" onClick={() => {}} />
		<IconButton name="close" rounded variant="ghost" color="secondary" onClick={() => {}} />
		<IconButton name="close" rounded variant="ghost" color="success" onClick={() => {}} />
		<IconButton name="close" rounded variant="ghost" color="warning" onClick={() => {}} />
		<IconButton name="close" rounded variant="ghost" color="danger" onClick={() => {}} />
		<IconButton name="close" rounded variant="ghost" color="info" onClick={() => {}} />
		<IconButton name="close" rounded variant="ghost" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="close" rounded variant="ghost" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Filled Icons - Filled Variant" description="Use filled icon variants with solid backgrounds.">
	<div class="demo">
		<IconButton name="star" filled variant="filled" color="primary" onClick={() => {}} />
		<IconButton name="star" filled variant="filled" color="secondary" onClick={() => {}} />
		<IconButton name="star" filled variant="filled" color="success" onClick={() => {}} />
		<IconButton name="star" filled variant="filled" color="warning" onClick={() => {}} />
		<IconButton name="star" filled variant="filled" color="danger" onClick={() => {}} />
		<IconButton name="star" filled variant="filled" color="info" onClick={() => {}} />
		<IconButton name="star" filled variant="filled" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="star" filled variant="filled" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Filled Icons - Soft Variant" description="Use filled icon variants with subtle backgrounds.">
	<div class="demo">
		<IconButton name="star" filled variant="soft" color="primary" onClick={() => {}} />
		<IconButton name="star" filled variant="soft" color="secondary" onClick={() => {}} />
		<IconButton name="star" filled variant="soft" color="success" onClick={() => {}} />
		<IconButton name="star" filled variant="soft" color="warning" onClick={() => {}} />
		<IconButton name="star" filled variant="soft" color="danger" onClick={() => {}} />
		<IconButton name="star" filled variant="soft" color="info" onClick={() => {}} />
		<IconButton name="star" filled variant="soft" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="star" filled variant="soft" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Filled Icons - Ghost Variant" description="Use filled icon variants with transparent backgrounds.">
	<div class="demo">
		<IconButton name="star" filled variant="ghost" color="primary" onClick={() => {}} />
		<IconButton name="star" filled variant="ghost" color="secondary" onClick={() => {}} />
		<IconButton name="star" filled variant="ghost" color="success" onClick={() => {}} />
		<IconButton name="star" filled variant="ghost" color="warning" onClick={() => {}} />
		<IconButton name="star" filled variant="ghost" color="danger" onClick={() => {}} />
		<IconButton name="star" filled variant="ghost" color="info" onClick={() => {}} />
		<IconButton name="star" filled variant="ghost" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="star" filled variant="ghost" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Disabled - Filled Variant" description="Disabled filled icon buttons.">
	<div class="demo">
		<IconButton name="edit" disabled variant="filled" color="primary" onClick={() => {}} />
		<IconButton name="edit" disabled variant="filled" color="secondary" onClick={() => {}} />
		<IconButton name="edit" disabled variant="filled" color="success" onClick={() => {}} />
		<IconButton name="edit" disabled variant="filled" color="warning" onClick={() => {}} />
		<IconButton name="edit" disabled variant="filled" color="danger" onClick={() => {}} />
		<IconButton name="edit" disabled variant="filled" color="info" onClick={() => {}} />
		<IconButton name="edit" disabled variant="filled" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="edit" disabled variant="filled" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Disabled - Soft Variant" description="Disabled soft icon buttons.">
	<div class="demo">
		<IconButton name="edit" disabled variant="soft" color="primary" onClick={() => {}} />
		<IconButton name="edit" disabled variant="soft" color="secondary" onClick={() => {}} />
		<IconButton name="edit" disabled variant="soft" color="success" onClick={() => {}} />
		<IconButton name="edit" disabled variant="soft" color="warning" onClick={() => {}} />
		<IconButton name="edit" disabled variant="soft" color="danger" onClick={() => {}} />
		<IconButton name="edit" disabled variant="soft" color="info" onClick={() => {}} />
		<IconButton name="edit" disabled variant="soft" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="edit" disabled variant="soft" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Disabled - Ghost Variant" description="Disabled ghost icon buttons.">
	<div class="demo">
		<IconButton name="edit" disabled variant="ghost" color="primary" onClick={() => {}} />
		<IconButton name="edit" disabled variant="ghost" color="secondary" onClick={() => {}} />
		<IconButton name="edit" disabled variant="ghost" color="success" onClick={() => {}} />
		<IconButton name="edit" disabled variant="ghost" color="warning" onClick={() => {}} />
		<IconButton name="edit" disabled variant="ghost" color="danger" onClick={() => {}} />
		<IconButton name="edit" disabled variant="ghost" color="info" onClick={() => {}} />
		<IconButton name="edit" disabled variant="ghost" color="foreground" onClick={() => {}} />
		<span class="background-demo">
			<IconButton name="edit" disabled variant="ghost" color="background" onClick={() => {}} />
		</span>
	</div>
</Section>

<Section title="Usage" description="Example code for implementing an icon button.">
	<CodeSnippet snippet={ICON_BUTTON_USAGE_CODE_SNIPPET} />
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
	}

	.background-demo {
		background-color: gray;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
