import { workbench } from './workbench/snippets.ts';
import { workbench as secondWorkbench } from './second/snippets.ts';

export const componentWorkbenches = [
	{
		slug: 'workbench',
		title: 'Workbench',
		description: 'A valid fixture',
		icon: 'view_quilt',
		workbench
	},
	{
		slug: 'second',
		title: 'Second workbench',
		description: 'A valid second fixture',
		icon: 'view_quilt',
		workbench: secondWorkbench
	}
];
