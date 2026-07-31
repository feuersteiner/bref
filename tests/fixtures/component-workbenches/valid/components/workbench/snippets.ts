import type { ComponentWorkbench } from '../../../../../../src/lib/docs/types.ts';
import FixtureDemo from './fixture-demo.svelte';

export const workbench = {
	component: 'Fixture',
	description: 'A static contract verifier fixture.',
	api: [{ name: 'value', type: 'string', required: true, description: 'Fixture value.' }],
	types: [{ name: 'FixtureProps', definition: 'interface FixtureProps { value: string; }' }],
	variants: {
		coverage: 'shown',
		examples: [
			{
				title: 'Variant',
				description: 'A live fixture.',
				code: '<Fixture />',
				demo: { component: FixtureDemo }
			}
		]
	},
	sizes: {
		coverage: 'not-applicable',
		rationale: 'The fixture has no sizes.'
	},
	states: [
		{
			name: 'disabled',
			coverage: 'shown',
			description: 'Disabled fixture.',
			demo: { component: FixtureDemo }
		},
		{
			name: 'empty',
			coverage: 'shown',
			description: 'Empty fixture.',
			demo: { component: FixtureDemo }
		},
		{
			name: 'loading',
			coverage: 'shown',
			description: 'Loading fixture.',
			demo: { component: FixtureDemo }
		},
		{
			name: 'error',
			coverage: 'shown',
			description: 'Error fixture.',
			demo: { component: FixtureDemo }
		},
		{
			name: 'long-content',
			coverage: 'shown',
			description: 'Long fixture.',
			demo: { component: FixtureDemo }
		}
	],
	denseUsage: {
		title: 'Dense fixture',
		description: 'A live dense fixture.',
		code: '<Fixture />',
		demo: { component: FixtureDemo }
	},
	keyboard: [{ keys: 'Enter', behavior: 'Activates the fixture.' }],
	accessibility: ['The fixture has an accessible name.'],
	controller: {
		coverage: 'shown',
		description: 'Fixture controller.',
		code: 'const fixture = true;'
	}
} satisfies ComponentWorkbench;
