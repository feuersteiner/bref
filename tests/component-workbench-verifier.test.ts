import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { verifyComponentWorkbenches } from '../scripts/verify-component-workbenches.mjs';

const fixture = (name: string) =>
	resolve('tests/fixtures/component-workbenches', name, 'components');

describe('component workbench verifier', () => {
	it('accepts a structural route, export, and registry contract', () => {
		expect(verifyComponentWorkbenches(fixture('valid'))).toEqual([]);
	});

	it('rejects comments, unrelated exports, and stale registry entries', () => {
		const errors = verifyComponentWorkbenches(fixture('spoofed'));

		expect(errors).toContain(
			'workbench/+page.svelte must import and render ComponentPage with local workbench.'
		);
		expect(errors).toContain('workbench/snippets.ts must export workbench.');
		expect(errors).toContain('missing is registered but has no workbench directory.');
	});
});
