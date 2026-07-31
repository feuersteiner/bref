import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import { componentWorkbenches } from '../src/routes/components/registry.ts';
import { PAGES } from '../src/internal/layout/types.ts';
import { pageForPath } from '../src/internal/layout/navigation.ts';
import { validateWorkbench } from '../src/lib/docs/validate-workbench.ts';
import WorkbenchRoute from '../src/routes/components/workbench/+page.svelte';

describe('component workbench contract', () => {
	it('keeps every registered component page reviewable', () => {
		expect(componentWorkbenches).not.toHaveLength(0);
		for (const { workbench } of componentWorkbenches) {
			expect(validateWorkbench(workbench)).toEqual([]);
		}
	});

	it('exposes each workbench through the runtime navigation source', () => {
		const workbench = componentWorkbenches[0];
		const route = `/components/${workbench.slug}`;

		expect(PAGES.flatMap((entry) => [entry, ...(entry.children || [])])).toContainEqual(
			expect.objectContaining({ href: route, title: workbench.title })
		);
		expect(pageForPath(route)).toMatchObject({ href: route, title: workbench.title });
	});

	it('renders the workbench route with live component and state demos', () => {
		const { body } = render(WorkbenchRoute);

		expect(body).toContain('aria-label="Live demo: Variants"');
		expect(body).toContain('aria-label="Live disabled state demo"');
		expect(body).toContain('Reference action');
	});

	it('requires executable examples and allows explicit not-applicable coverage', () => {
		const workbench = componentWorkbenches[0].workbench;
		const withoutDemo = {
			...workbench,
			variants: {
				coverage: 'shown' as const,
				examples: [{ ...workbench.denseUsage, demo: undefined }]
			}
		} as unknown as typeof workbench;
		const notApplicable = {
			...workbench,
			variants: {
				coverage: 'not-applicable' as const,
				rationale: 'This component has no variants.'
			},
			sizes: {
				coverage: 'not-applicable' as const,
				rationale: 'This component has one fixed size.'
			}
		};

		expect(validateWorkbench(withoutDemo)).toContain('example demo must render a live component.');
		expect(validateWorkbench(notApplicable)).toEqual([]);
	});
});
