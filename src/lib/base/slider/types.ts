import type { Size, Color } from '../types.ts';

export interface SliderProps {
	value: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	wide?: boolean;
	size?: Size;
	color?: Extract<Color, 'primary' | 'foreground'>;
	onChange: (value: number) => void;
}
