// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
// @ts-expect-error SvelteKit resolves the public `svelte` entry to SSR in tests.
import { flushSync, mount, unmount } from '../node_modules/svelte/src/index-client.js';
import ReferenceDemo from '../src/routes/components/workbench/reference-demo.svelte';

describe('reference demo interaction', () => {
	it('activates while enabled and stops activating after the disabled transition', () => {
		const target = document.createElement('div');
		const demo = mount(ReferenceDemo, { target });
		const button = target.querySelector('button');
		const checkbox = target.querySelector<HTMLInputElement>('input[type="checkbox"]');

		expect(button).not.toBeNull();
		expect(checkbox).not.toBeNull();
		expect(button?.disabled).toBe(false);
		button?.click();
		flushSync();
		expect(target.textContent).toContain('Reference action pressed 1 times');

		if (!checkbox) throw new Error('Missing disabled toggle');
		checkbox.checked = true;
		checkbox.dispatchEvent(new Event('change', { bubbles: true }));
		flushSync();
		expect(button?.disabled).toBe(true);
		button?.click();
		flushSync();
		expect(target.textContent).toContain('Reference action unavailable');

		unmount(demo);
	});
});
