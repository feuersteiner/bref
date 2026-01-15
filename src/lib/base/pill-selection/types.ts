import type { IconProps } from '../icon/types.ts';
import type { Color, Size } from '../types.ts';

export interface PillSelectionItem {
	id: string;
	label: string;
	icon?: Pick<IconProps, 'name' | 'filled' | 'ariaLabel'>;
}

export interface PillSelectionProps {
	items: PillSelectionItem[];
	selection: string[];
	onSelect: (selection: string[]) => void;
	maxSelectionLength?: number;
	disableOthersOnFull?: boolean;
	size?: Size;
	color?: Color;
}
