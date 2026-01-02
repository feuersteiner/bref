import type { IconProps } from '../icon/types.ts';
import type { Color, Size, Variant } from '../types.ts';

export interface BaseButtonProps {
	size?: Size;
	color?: Color;
	disabled?: boolean;
	onClick: () => void;
	variant?: Variant;
}

export interface IconButtonProps
	extends BaseButtonProps, Pick<IconProps, 'name' | 'filled' | 'ariaLabel'> {
	rounded?: boolean;
}

export interface ButtonProps extends BaseButtonProps {
	label: string;
	wide?: boolean;
	icon?: Pick<IconProps, 'name' | 'filled' | 'ariaLabel'>;
}
