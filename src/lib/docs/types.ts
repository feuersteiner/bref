import type { Component } from 'svelte';

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
	demo: LiveDemo;
}

export interface LiveDemo {
	component: Component;
	props?: Record<string, unknown>;
}

export type ExampleCoverage =
	| { coverage: 'shown'; examples: readonly DocumentedExample[] }
	| { coverage: 'not-applicable'; rationale: string };

export type StateCoverage =
	| {
			name: 'disabled' | 'empty' | 'loading' | 'error' | 'long-content';
			coverage: 'shown';
			description: string;
			demo: LiveDemo;
	  }
	| {
			name: 'disabled' | 'empty' | 'loading' | 'error' | 'long-content';
			coverage: 'not-applicable';
			description: string;
	  };

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
	variants: ExampleCoverage;
	sizes: ExampleCoverage;
	states: readonly StateCoverage[];
	denseUsage: DocumentedExample;
	keyboard: readonly KeyboardInstruction[];
	accessibility: readonly string[];
	controller: ControllerCoverage;
}
