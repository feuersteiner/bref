import type { IconProps } from '../icon/types.ts';
import type { Color, Size, Variant } from '../types.ts';

export interface PillProps {
	label: string;
	size?: Size;
	color?: Color;
	variant?: Variant;
	icon?: Pick<IconProps, 'name' | 'filled' | 'ariaLabel'>;
	onClick?: () => void;
	disabled?: boolean;
}
