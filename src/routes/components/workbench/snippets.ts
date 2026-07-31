import type { ComponentWorkbench } from '../../../lib/docs/types.ts';

export const workbench: ComponentWorkbench = {
	component: 'Reference component',
	description: 'The required documentation shape for every v1 Bref component.',
	api: [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'The consumer-owned value; bind it when the component is interactive.'
		}
	],
	types: [
		{
			name: 'ReferenceComponentProps',
			definition: `interface ReferenceComponentProps {\n\tvalue: string;\n\tdisabled?: boolean;\n}`
		}
	],
	variants: [
		{
			title: 'Variants',
			description: 'Show every supported variant, or explicitly record that variants do not apply.',
			code: '<Component variant="primary" />\n<Component variant="secondary" />'
		}
	],
	sizes: [
		{
			title: 'Sizes',
			description: 'Show every supported size, or explicitly record that sizes do not apply.',
			code: '<Component size="small" />\n<Component size="medium" />'
		}
	],
	states: [
		{
			name: 'disabled',
			coverage: 'shown',
			description: 'Show the disabled control and its explanation.'
		},
		{
			name: 'empty',
			coverage: 'shown',
			description: 'Show the empty collection or no-result state.'
		},
		{
			name: 'loading',
			coverage: 'shown',
			description: 'Show the loading affordance without hiding context.'
		},
		{
			name: 'error',
			coverage: 'shown',
			description: 'Show recovery guidance with the error state.'
		},
		{
			name: 'long-content',
			coverage: 'shown',
			description: 'Show long labels, values, and descriptions without clipping essential content.'
		}
	],
	denseUsage: {
		title: 'Dense productivity surface',
		description: 'Use realistic compact content, adjacent controls, and a constrained width.',
		code: `<Component value="Quarterly planning" size="small" />\n<Component value="Review pull request #42" size="small" />`
	},
	keyboard: [
		{ keys: 'Tab / Shift+Tab', behavior: 'Moves focus into and out of the component.' },
		{ keys: 'Enter / Space', behavior: 'Activates native button-like controls.' },
		{
			keys: 'Arrow / Home / End / Escape',
			behavior: 'Document when the component uses a custom composite pattern.'
		}
	],
	accessibility: [
		'Use the native element first and forward applicable native attributes.',
		'Expose an accessible name, visible focus indicator, and non-color-only state indicator.',
		'Include reduced-motion behavior when animation is non-essential.'
	],
	controller: {
		coverage: 'shown',
		description:
			'Interactive state transitions belong in controller.svelte.ts; pure transforms belong in logic.ts.',
		code: `// controller.svelte.ts\nexport const createController = () => {\n\tlet open = $state(false);\n\treturn { get open() { return open; }, toggle: () => (open = !open) };\n};`
	}
};
