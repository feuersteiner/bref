export type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
export const COLOR_VALUES = [
	'primary',
	'secondary',
	'success',
	'warning',
	'danger',
	'info',
	'foreground',
	'background'
] as const;

export type Color = (typeof COLOR_VALUES)[number];
export type Variant = 'filled' | 'soft' | 'ghost';
export type Speed = 'slow' | 'normal' | 'fast';
