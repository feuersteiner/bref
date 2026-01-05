import type { Color, Size, Speed } from '../types.ts';

export interface LoadingProps {
	size?: Size;
	color?: Color;
}

export interface TextualLoadingProps extends LoadingProps {
	words?: string[];
	hideDots?: boolean;
	typeSpeed?: Speed;
	pauseSpeed?: Speed;
}

export interface MorphingShapesLoadingProps extends LoadingProps {
	speed?: Speed;
	isGradient?: boolean;
	pulseShadow?: boolean;
}
