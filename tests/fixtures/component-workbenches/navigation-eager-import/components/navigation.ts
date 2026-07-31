// @ts-nocheck -- intentionally extensionless to exercise static module resolution.
import { workbench } from './shared';

void workbench;

export const componentWorkbenchNavigation = [
	{
		slug: 'workbench',
		title: 'Workbench',
		description: 'An eager-import fixture',
		icon: 'view_quilt'
	}
];
