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
		const pages = PAGES.flatMap((entry) => [entry, ...(entry.children || [])]);
		for (const workbench of componentWorkbenches) {
			const route = `/components/${workbench.slug}`;
			expect(pages).toContainEqual(
				expect.objectContaining({ href: route, title: workbench.title })
			);
			expect(pageForPath(route)).toMatchObject({ href: route, title: workbench.title });
		}
	});

	it('renders the workbench route with live component and state demos', () => {
		const { body } = render(WorkbenchRoute);

		expect(body).toContain('aria-label="Live demo: Variants"');
		expect(body).toContain('aria-label="Live disabled state demo"');
		expect(body).toContain('Reference action');
		expect(body).toContain('No reference actions yet');
		expect(body).toContain('Working…');
		expect(body).toContain('role="alert"');
		expect(body).toContain('This deliberately long status message remains readable');
		const loadingButton = body.match(/<button\b[^>]*\baria-busy=(?:"true"|'true')[^>]*>/)?.[0];
		expect(loadingButton).toBeDefined();
		expect(loadingButton).toMatch(/\bdisabled(?:\s|=|>)/);
	});

	it('keeps root navigation free of route-local demo manifests', async () => {
		const { readFile } = await import('node:fs/promises');
		const [layoutTypes, navigation] = await Promise.all([
			readFile('src/internal/layout/types.ts', 'utf8'),
			readFile('src/routes/components/navigation.ts', 'utf8')
		]);

		expect(layoutTypes).not.toContain('components/registry.ts');
		expect(navigation).not.toContain('./workbench/snippets.ts');
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
