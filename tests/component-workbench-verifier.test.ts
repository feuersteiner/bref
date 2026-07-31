import { describe, expect, it } from 'vitest';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { verifyComponentWorkbenches } from '../scripts/verify-component-workbenches.mjs';

const fixture = (name: string) =>
	resolve('tests/fixtures/component-workbenches', name, 'components');

const mutatedValidFixture = (mutate: (root: string) => void) => {
	const temporary = mkdtempSync(join(tmpdir(), 'bref-workbench-verifier-'));
	const root = join(temporary, 'components');
	cpSync(fixture('valid'), root, { recursive: true });
	mutate(root);
	return { root, cleanup: () => rmSync(temporary, { recursive: true, force: true }) };
};

describe('component workbench verifier', () => {
	it('accepts a structural route, workbench value, registry, and navigation contract', () => {
		expect(verifyComponentWorkbenches(fixture('valid'))).toEqual([]);
	});

	it('rejects comments, unrelated exports, and stale registry entries', () => {
		const errors = verifyComponentWorkbenches(fixture('spoofed'));

		expect(errors).toContain(
			'workbench/+page.svelte must import and render ComponentPage with local workbench.'
		);
		expect(errors).toContain('workbench/snippets.ts must export a valid workbench contract.');
		expect(errors).toContain('missing is registered but has no workbench directory.');
	});

	it('rejects every malformed, duplicate, private, or non-array registry declaration', () => {
		const errors = verifyComponentWorkbenches(fixture('spoofed'));

		expect(errors).toContain('workbench registry entry must use its direct workbench import.');
		expect(errors).toContain('workbench is registered more than once.');
		expect(errors).toContain(
			'registry entry 4 must contain exactly slug, title, description, icon, and workbench.'
		);
		expect(errors).toContain('registry entry 5 must be an object.');
		expect(verifyComponentWorkbenches(fixture('private-registry'))).toContain(
			'registry must export exactly one componentWorkbenches array declaration.'
		);
		expect(verifyComponentWorkbenches(fixture('numeric-registry'))).toContain(
			'registry must export a componentWorkbenches array.'
		);
	});

	it('rejects numeric workbench exports and registry entries omitted from navigation', () => {
		expect(verifyComponentWorkbenches(fixture('numeric-workbench'))).toContain(
			'workbench/snippets.ts must export a valid workbench contract.'
		);
		expect(verifyComponentWorkbenches(fixture('navigation-drift'))).toContain(
			'second is registered but missing navigation metadata.'
		);
	});

	it('rejects type-asserted workbench values that cannot satisfy the real contract', () => {
		expect(verifyComponentWorkbenches(fixture('contract-value-spoof'))).toContain(
			'workbench/snippets.ts must export a valid workbench contract.'
		);
	});

	it('rejects extensionless and indirect navigation imports of route-local demos', () => {
		expect(verifyComponentWorkbenches(fixture('navigation-eager-import'))).toContain(
			'navigation manifest must not import route-local workbenches or registry.'
		);
	});

	it('rejects non-Svelte demo imports and non-object demo props without executing modules', () => {
		const valueDemo = mutatedValidFixture((root) => {
			const snippets = join(root, 'workbench/snippets.ts');
			writeFileSync(
				join(root, 'workbench/fixture-value.ts'),
				"import type { Component } from 'svelte';\nexport default 42 as unknown as Component;\n"
			);
			writeFileSync(
				snippets,
				readFileSync(snippets, 'utf8').replace(
					"import FixtureDemo from './fixture-demo.svelte';",
					"import FixtureDemo from './fixture-value.ts';"
				)
			);
		});
		const invalidProps = mutatedValidFixture((root) => {
			const snippets = join(root, 'workbench/snippets.ts');
			writeFileSync(
				snippets,
				readFileSync(snippets, 'utf8').replace(
					'demo: { component: FixtureDemo }',
					'demo: { component: FixtureDemo, props: 42 }'
				)
			);
		});
		try {
			expect(verifyComponentWorkbenches(valueDemo.root)).toContain(
				'workbench/snippets.ts must export a valid workbench contract.'
			);
			expect(verifyComponentWorkbenches(invalidProps.root)).toContain(
				'workbench/snippets.ts must export a valid workbench contract.'
			);
		} finally {
			valueDemo.cleanup();
			invalidProps.cleanup();
		}
	});

	it('rejects duplicate states and type-only registry imports', () => {
		const duplicateStates = mutatedValidFixture((root) => {
			const snippets = join(root, 'workbench/snippets.ts');
			writeFileSync(
				snippets,
				readFileSync(snippets, 'utf8').replace(
					'\n\t],\n\tdenseUsage:',
					",\n\t\t{\n\t\t\tname: 'disabled',\n\t\t\tcoverage: 'shown',\n\t\t\tdescription: 'Duplicate disabled fixture.',\n\t\t\tdemo: { component: FixtureDemo }\n\t\t}\n\t],\n\tdenseUsage:"
				)
			);
		});
		const typeOnlyRegistry = mutatedValidFixture((root) => {
			const registry = join(root, 'registry.ts');
			writeFileSync(
				registry,
				readFileSync(registry, 'utf8').replace(
					"import { workbench } from './workbench/snippets.ts';",
					"import type { workbench } from './workbench/snippets.ts';"
				)
			);
		});
		try {
			expect(verifyComponentWorkbenches(duplicateStates.root)).toContain(
				'workbench/snippets.ts must export a valid workbench contract.'
			);
			expect(verifyComponentWorkbenches(typeOnlyRegistry.root)).toContain(
				'workbench registry entry must use its direct workbench import.'
			);
		} finally {
			duplicateStates.cleanup();
			typeOnlyRegistry.cleanup();
		}
	});
});
