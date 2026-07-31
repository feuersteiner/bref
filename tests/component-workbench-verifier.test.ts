import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { verifyComponentWorkbenches } from '../scripts/verify-component-workbenches.mjs';

const fixture = (name: string) =>
	resolve('tests/fixtures/component-workbenches', name, 'components');

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
});
