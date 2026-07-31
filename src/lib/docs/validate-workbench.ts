import type { ComponentWorkbench, StateCoverage } from './types.ts';

const requiredStates: StateCoverage['name'][] = [
	'disabled',
	'empty',
	'loading',
	'error',
	'long-content'
];

const isPresent = (value: string) => value.trim().length > 0;

export const validateWorkbench = (workbench: ComponentWorkbench) => {
	const errors: string[] = [];
	const requireText = (value: string, label: string) => {
		if (!isPresent(value)) errors.push(`${label} must not be empty.`);
	};

	requireText(workbench.component, 'component');
	requireText(workbench.description, 'description');
	if (!workbench.api.length) errors.push('api must document every public member.');
	if (!workbench.types.length) errors.push('types must document complete public types.');
	if (!workbench.variants.length)
		errors.push('variants must be documented or marked not applicable.');
	if (!workbench.sizes.length) errors.push('sizes must be documented or marked not applicable.');
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
	}
	for (const instruction of workbench.keyboard) {
		requireText(instruction.keys, 'keyboard keys');
		requireText(instruction.behavior, 'keyboard behavior');
	}
	for (const note of workbench.accessibility) requireText(note, 'accessibility note');
	for (const example of [...workbench.variants, ...workbench.sizes, workbench.denseUsage]) {
		requireText(example.title, 'example title');
		requireText(example.description, 'example description');
		requireText(example.code, 'example code');
	}
	if (workbench.controller.coverage === 'shown' && !isPresent(workbench.controller.code ?? '')) {
		errors.push('shown controller coverage needs an example.');
	}
	requireText(workbench.controller.description, 'controller coverage description');

	return errors;
};
