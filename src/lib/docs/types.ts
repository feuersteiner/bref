export type Coverage = 'shown' | 'not-applicable';

export interface ApiMember {
	name: string;
	type: string;
	required: boolean;
	description: string;
}

export interface TypeDefinition {
	name: string;
	definition: string;
}

export interface DocumentedExample {
	title: string;
	description: string;
	code: string;
}

export interface StateCoverage {
	name: 'disabled' | 'empty' | 'loading' | 'error' | 'long-content';
	coverage: Coverage;
	description: string;
}

export interface KeyboardInstruction {
	keys: string;
	behavior: string;
}

export interface ControllerCoverage {
	coverage: Coverage;
	description: string;
	code?: string;
}

export interface ComponentWorkbench {
	component: string;
	description: string;
	api: readonly ApiMember[];
	types: readonly TypeDefinition[];
	variants: readonly DocumentedExample[];
	sizes: readonly DocumentedExample[];
	states: readonly StateCoverage[];
	denseUsage: DocumentedExample;
	keyboard: readonly KeyboardInstruction[];
	accessibility: readonly string[];
	controller: ControllerCoverage;
}
