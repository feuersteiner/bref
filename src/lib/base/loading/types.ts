import type { Color, Size } from '../types.ts';

export interface LoadingProps {
	size?: Size;
	color?: Color;
}

export interface TextualLoadingProps extends LoadingProps {
	words?: string;
    dots?: boolean;
    intervalMs?: 250 | 500 | 750 | 1000;
}
