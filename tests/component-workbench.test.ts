import { describe, expect, it } from 'vitest';
import { componentWorkbenches } from '../src/routes/components/registry.ts';
import { validateWorkbench } from '../src/lib/docs/validate-workbench.ts';

describe('component workbench contract', () => {
	it('keeps every registered component page reviewable', () => {
		expect(componentWorkbenches).not.toHaveLength(0);
		for (const { workbench } of componentWorkbenches) {
			expect(validateWorkbench(workbench)).toEqual([]);
		}
	});
});
