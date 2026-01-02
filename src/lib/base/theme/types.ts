export type ThemeMode = 'light' | 'dark';

export interface ThemeProps {
	paletteHex: {
		primary: string;
		secondary: string;
		success: string;
		warning: string;
		danger: string;
		info: string;
	};
	surfaceHex: {
		background: string;
		foreground: string;
	};
	border: {
		widthPx: number;
		radiusRem: number;
		colorHex: string;
	};
	spacingRem: number;
}

export interface ColorTokenProps {
	soft: string;
	base: string;
	contrast: string;
}

export const DEFAULT_THEME: ThemeProps = {
	paletteHex: {
		primary: '#736CED',
		secondary: '#E08D79',
		success: '#60935D',
		warning: '#E67F0D',
		danger: '#F03A47',
		info: '#4D9DE0'
	},
	surfaceHex: {
		background: '#eee',
		foreground: '#222'
	},
	border: {
		widthPx: 1,
		radiusRem: 0.5,
		colorHex: '#CCCCCC'
	},
	spacingRem: 1
};
