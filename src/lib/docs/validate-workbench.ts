import type {
	ComponentWorkbench,
	DocumentedExample,
	ExampleCoverage,
	StateCoverage
} from './types.ts';

const requiredStates: StateCoverage['name'][] = [
	'disabled',
	'empty',
	'loading',
	'error',
	'long-content'
];

const isPresent = (value: string) => value.trim().length > 0;

const validateExample = (example: DocumentedExample, errors: string[]) => {
	const requireText = (value: string, label: string) => {
		if (!isPresent(value)) errors.push(`${label} must not be empty.`);
	};

	requireText(example.title, 'example title');
	requireText(example.description, 'example description');
	requireText(example.code, 'example code');
	if (!example.demo?.component) errors.push('example demo must render a live component.');
};

const validateExampleCoverage = (coverage: ExampleCoverage, label: string, errors: string[]) => {
	if (coverage.coverage === 'not-applicable') {
		if (!isPresent(coverage.rationale)) {
			errors.push(`${label} not-applicable coverage needs a rationale.`);
		}
		return;
	}

	if (!coverage.examples.length) errors.push(`${label} shown coverage needs an example.`);
	for (const example of coverage.examples) validateExample(example, errors);
};

export const validateWorkbench = (workbench: ComponentWorkbench) => {
	const errors: string[] = [];
	const requireText = (value: string, label: string) => {
		if (!isPresent(value)) errors.push(`${label} must not be empty.`);
	};

	requireText(workbench.component, 'component');
	requireText(workbench.description, 'description');
	if (!workbench.api.length) errors.push('api must document every public member.');
	if (!workbench.types.length) errors.push('types must document complete public types.');
	validateExampleCoverage(workbench.variants, 'variants', errors);
	validateExampleCoverage(workbench.sizes, 'sizes', errors);
	if (!workbench.keyboard.length) errors.push('keyboard instructions are required.');
	if (!workbench.accessibility.length) errors.push('accessibility notes are required.');
	for (const member of workbench.api) {
		requireText(member.name, 'api member name');
		requireText(member.type, 'api member type');
		requireText(member.description, 'api member description');
	}
	for (const type of workbench.types) {
		requireText(type.name, 'type name');
		requireText(type.definition, 'type definition');
	}

	for (const state of requiredStates) {
		if (!workbench.states.some((entry) => entry.name === state)) {
			errors.push(`${state} state coverage is required.`);
		}
	}

	for (const state of workbench.states) {
		requireText(state.description, `${state.name} state description`);
		if (state.coverage === 'shown' && !state.demo?.component) {
			errors.push(`${state.name} shown state coverage needs a live demo.`);
		}
	}
	for (const instruction of workbench.keyboard) {
		requireText(instruction.keys, 'keyboard keys');
		requireText(instruction.behavior, 'keyboard behavior');
	}
	for (const note of workbench.accessibility) requireText(note, 'accessibility note');
	validateExample(workbench.denseUsage, errors);
	if (workbench.controller.coverage === 'shown' && !isPresent(workbench.controller.code ?? '')) {
		errors.push('shown controller coverage needs an example.');
	}
	requireText(workbench.controller.description, 'controller coverage description');

	return errors;
};
