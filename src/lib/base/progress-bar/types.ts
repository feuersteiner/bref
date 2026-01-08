import type { Size, Color } from '../types.ts';

export interface ProgressBarProps {
	value?: number;
	size?: Size;
	color?: Color;
	wide?: boolean;
	animateValue?: boolean;
	onValueClick?: (clickedValue: number) => void;
}
