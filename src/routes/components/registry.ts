import type { ComponentWorkbench } from '../../lib/docs/types.ts';
import type { IconName } from '../../lib/base/icon/types.ts';
import type { PageProps } from '../../internal/layout/types.ts';
import { workbench } from './workbench/snippets.ts';

export const componentWorkbenches = [
	{
		slug: 'workbench',
		title: 'Component Workbench',
		description: 'Executable documentation contract for v1 components',
		icon: 'view_quilt',
		workbench
	}
] satisfies readonly {
	slug: string;
	title: string;
	description: string;
	icon: IconName;
	workbench: ComponentWorkbench;
}[];

export const componentWorkbenchPages: PageProps[] = componentWorkbenches.map(
	({ slug, title, description, icon }) => ({
		title,
		description,
		href: `/components/${slug}`,
		icon
	})
);
