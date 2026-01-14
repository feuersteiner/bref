<script lang="ts">
	import TextInput from '$lib/base/text-input/text-input.svelte';
	import Section from '../../../internal/layout/section.svelte';
	import CodeSnippet from '../../../internal/layout/code-snippet.svelte';
	import {
		TEXT_INPUT_USAGE_CODE_SNIPPET,
		TEXT_INPUT_CTA_USAGE_CODE_SNIPPET,
		TEXT_INPUT_VALIDATION_CODE_SNIPPET
	} from './snippets.ts';

	let textValue = $state('');
	let searchValue = $state('');
	let emailValue = $state('');
	let messageValue = $state('');
</script>

<Section>
	<p class="intro">
		A single-line text input component with optional start icon, CTA button, and two styling
		variants for different visual contexts.
	</p>
</Section>

<Section title="Soft Variant" description="Subtle background for forms and contained layouts.">
	<div class="demo">
		<TextInput
			value={textValue}
			placeholder="Enter text..."
			variant="soft"
			onChange={(v) => (textValue = v)}
		/>
	</div>
</Section>

<Section title="Ghost Variant" description="Minimal styling for inline or transparent contexts.">
	<div class="demo">
		<TextInput
			value={textValue}
			placeholder="Enter text..."
			variant="ghost"
			onChange={(v) => (textValue = v)}
		/>
	</div>
</Section>

<Section title="With Start Icon" description="Add a leading icon for visual context.">
	<div class="demo vertical">
		<TextInput
			value={textValue}
			placeholder="Enter your name"
			startIcon="person"
			onChange={(v) => (textValue = v)}
		/>
		<TextInput
			value={searchValue}
			placeholder="Search..."
			startIcon="search"
			onChange={(v) => (searchValue = v)}
		/>
		<TextInput
			value={textValue}
			placeholder="Enter email"
			startIcon="mail"
			onChange={(v) => (textValue = v)}
		/>
	</div>
</Section>

<Section
	title="With CTA Button"
	description="Add an action button on the right for send, submit, or other actions."
>
	<div class="demo vertical">
		<TextInput
			value={textValue}
			placeholder="Type a message..."
			ctaIconButton={{
				name: 'send',
				variant: 'ghost',
				onClick: () => alert('Message sent!')
			}}
			onChange={(v) => (textValue = v)}
		/>
		<TextInput
			value={searchValue}
			placeholder="Search..."
			startIcon="search"
			ctaIconButton={{
				name: 'tune',
				variant: 'ghost',
				onClick: () => alert('Open filters')
			}}
			onChange={(v) => (searchValue = v)}
		/>
		<TextInput
			value={textValue}
			placeholder="Add item..."
			ctaIconButton={{
				name: 'add',
				variant: 'filled',
				color: 'primary',
				onClick: () => alert('Item added!')
			}}
			onChange={(v) => (textValue = v)}
		/>
	</div>
</Section>

<Section
	title="Trigger on Enter"
	description="Press Enter to trigger the CTA action, with optional auto-clear."
>
	<div class="demo vertical">
		<TextInput
			value={messageValue}
			placeholder="Type and press Enter..."
			ctaIconButton={{
				name: 'send',
				variant: 'ghost',
				triggerOnEnter: true,
				clearOnTrigger: true,
				onClick: () => alert('Sent: ' + messageValue)
			}}
			onChange={(v) => (messageValue = v)}
		/>
	</div>
</Section>

<Section
	title="Validation"
	description="Regex-based validation with debounced error display. Errors appear after 1 second of inactivity to avoid interrupting typing. When invalid, the CTA button action is automatically blocked."
>
	<div class="demo vertical">
		<TextInput
			value={emailValue}
			placeholder="Enter email address"
			startIcon="mail"
			validation={{
				regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Please enter a valid email address'
			}}
			ctaIconButton={{
				name: 'check',
				variant: 'ghost',
				onClick: () => alert('Email submitted: ' + emailValue)
			}}
			onChange={(v) => (emailValue = v)}
		/>
	</div>
</Section>

<Section title="Wide" description="Full-width inputs for forms and layouts.">
	<div class="demo wide-container">
		<TextInput
			value={textValue}
			placeholder="Full width input"
			wide
			onChange={(v) => (textValue = v)}
		/>
		<TextInput
			value={textValue}
			placeholder="Full width with icon and CTA"
			wide
			startIcon="edit"
			ctaIconButton={{
				name: 'check',
				variant: 'ghost',
				color: 'success',
				onClick: () => alert('Saved!')
			}}
			onChange={(v) => (textValue = v)}
		/>
	</div>
</Section>

<Section title="Disabled" description="Disabled state for unavailable inputs.">
	<div class="demo">
		<TextInput
			value="Disabled input"
			placeholder="Disabled"
			disabled
			variant="soft"
			onChange={() => {}}
		/>
		<TextInput
			value="Disabled ghost"
			placeholder="Disabled"
			disabled
			variant="ghost"
			onChange={() => {}}
		/>
	</div>
</Section>

<Section title="Usage" description="Example code for implementing a text input.">
	<CodeSnippet snippet={TEXT_INPUT_USAGE_CODE_SNIPPET} />
</Section>

<Section title="With CTA Button" description="Example with an action button.">
	<CodeSnippet snippet={TEXT_INPUT_CTA_USAGE_CODE_SNIPPET} />
</Section>

<Section title="With Validation" description="Example with input validation.">
	<CodeSnippet snippet={TEXT_INPUT_VALIDATION_CODE_SNIPPET} />
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

	.demo.vertical {
		flex-direction: column;
		align-items: stretch;
		max-width: 300px;
	}

	.wide-container {
		flex-direction: column;
		width: 100%;
		max-width: 400px;
	}
</style>
