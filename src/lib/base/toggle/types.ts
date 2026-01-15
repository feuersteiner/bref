import type { Size } from '../types.ts';

export interface ToggleProps {
	onChange: (checked: boolean) => void;
	checked?: boolean;
	disabled?: boolean;
	size?: Size;
}
