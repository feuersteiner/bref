import type { Color, Size } from '../types.ts';
import type { IconName, IconProps } from '../icon/types.ts';

export interface NodeDataProps {
	id: string;
	label: string;
	icon?: IconName;
	children?: NodeDataProps[];
}

export interface BaseTreeProps {
	onSelect: (id: string) => void;
	selectedIds: Set<string>;
	size?: Size;
	filledIcon?: IconProps['filled'];
	wide?: boolean;
	expandOnSelect?: boolean;
}

export interface TreeViewProps extends BaseTreeProps {
	data: NodeDataProps[];
}

export interface TreeNodeProps extends BaseTreeProps {
	node: NodeDataProps;
	level: number;
}
