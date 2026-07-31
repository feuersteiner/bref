import { unrelated } from './workbench/snippets.ts';

// slug: 'workbench'; ./workbench/snippets.ts
export const componentWorkbenches = [
	{
		slug: 'workbench',
		title: 'Workbench',
		description: 'A spoofed fixture',
		icon: 'view_quilt',
		workbench: unrelated
	},
	{
		slug: 'missing',
		title: 'Missing',
		description: 'A stale entry',
		icon: 'view_quilt',
		workbench: unrelated
	},
	{
		slug: 'workbench',
		title: 'Duplicate',
		description: 'A duplicate fixture',
		icon: 'view_quilt',
		workbench: unrelated
	},
	{
		slug: 'broken',
		title: 'Broken',
		description: 'An incomplete fixture',
		icon: 'view_quilt'
	},
	42
];
