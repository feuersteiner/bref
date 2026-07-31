import type { ComponentWorkbench } from '../../../lib/docs/types.ts';
import ReferenceDemo from './reference-demo.svelte';

const demo = { component: ReferenceDemo };

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
	variants: {
		coverage: 'shown',
		examples: [
			{
				title: 'Variants',
				description: 'Switch between every supported variant in the live demo.',
				code: '<Component variant="primary" />\n<Component variant="secondary" />',
				demo
			}
		]
	},
	sizes: {
		coverage: 'shown',
		examples: [
			{
				title: 'Sizes',
				description: 'Switch between each supported size in the live demo.',
				code: '<Component size="small" />\n<Component size="medium" />',
				demo
			}
		]
	},
	states: [
		{
			name: 'disabled',
			coverage: 'shown',
			description:
				'Toggle the disabled control in the live demo and observe its unavailable state.',
			demo
		},
		{
			name: 'empty',
			coverage: 'shown',
			description: 'The live demo starts with no recorded activations.',
			demo
		},
		{
			name: 'loading',
			coverage: 'shown',
			description: 'Use the disabled affordance while work is pending without hiding context.',
			demo
		},
		{
			name: 'error',
			coverage: 'shown',
			description: 'Keep the action and its status message available for recovery.',
			demo
		},
		{
			name: 'long-content',
			coverage: 'shown',
			description: 'The status text remains visible as its activation count grows.',
			demo
		}
	],
	denseUsage: {
		title: 'Dense productivity surface',
		description: 'Use realistic compact content, adjacent controls, and a constrained width.',
		code: `<Component value="Quarterly planning" size="small" />\n<Component value="Review pull request #42" size="small" />`,
		demo
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
