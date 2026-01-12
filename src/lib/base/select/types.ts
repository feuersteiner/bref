import type { Size } from '../types.ts';
import type { IconProps } from '../icon/types.ts';

export interface SelectOptionProps {
	value: string;
	label: string;
}

export interface SelectProps {
	value: string;
	options: SelectOptionProps[];
	placeholder?: string;
	disabled?: boolean;
	onChange: (value: string) => void;
	wide?: boolean;
	startIcon?: Exclude<IconProps, 'size'>;
	size?: Size;
}
