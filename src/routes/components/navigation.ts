import type { IconName } from '../../lib/base/icon/types.ts';
import type { PageProps } from '../../internal/layout/types.ts';

interface ComponentWorkbenchNavigation {
	slug: string;
	title: string;
	description: string;
	icon: IconName;
}

// Navigation intentionally contains no workbench imports. Root layout consumers
// can use this metadata without downloading route-local live demos.
export const componentWorkbenchNavigation: readonly ComponentWorkbenchNavigation[] = [
	{
		slug: 'workbench',
		title: 'Component Workbench',
		description: 'Executable documentation contract for v1 components',
		icon: 'view_quilt'
	}
];

export const componentWorkbenchPages: PageProps[] = componentWorkbenchNavigation.map(
	({ slug, title, description, icon }) => ({
		title,
		description,
		href: `/components/${slug}`,
		icon
	})
);
