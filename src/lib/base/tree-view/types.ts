import type { Color, Size } from '../types.ts';
import type { IconName, IconProps } from '../icon/types.ts';

export interface NodeDataProps {
	id: string;
	label: string;
	icon?: IconName;
	children?: NodeDataProps[];
}

export interface BaseTreeProps {
	size?: Size;
	iconFill?: IconProps['filled'];
	onSelectionChange?: (selectedIds: Set<string>) => void;
}

export interface TreeViewProps extends BaseTreeProps {
	data: NodeDataProps[];
	multiSelect?: boolean;
}

export interface TreeNodeProps extends BaseTreeProps {
	onSelect: (node: NodeDataProps) => void;
	node: NodeDataProps;
	level: number;
	selectedIds?: Set<string>;
}
