import type { ComponentWorkbench } from '../../lib/docs/types.ts';
import { workbench } from './workbench/snippets.ts';

export const componentWorkbenches = [{ slug: 'workbench', workbench }] satisfies readonly {
	slug: string;
	workbench: ComponentWorkbench;
}[];
