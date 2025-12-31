import { colord } from 'colord';
import type { ColorTokenProps, ThemeMode } from './types.ts';

/**
 * Generates a soft background color from the base color.
 * In light mode, produces a much lighter shade (like a 100-200 on a color scale)
 * suitable as a background when using the base color as foreground.
 * In dark mode, produces a darker, desaturated version for the same effect.
 *
 * @param baseColor - The base color in any valid CSS color format
 * @param mode - The current theme mode ('light' or 'dark')
 * @returns A hex color string representing the soft background color
 */
const generateSoftColor = (baseColor: string, mode: ThemeMode): string =>
	mode === 'light'
		? colord(baseColor).lighten(0.35).desaturate(0.1).toHex()
		: colord(baseColor).darken(0.35).desaturate(0.2).toHex();

/**
 * Returns the base color unchanged.
 * This function serves as a passthrough to maintain consistency
 * in the color token generation API.
 *
 * @param baseColor - The base color in any valid CSS color format
 * @param _mode - The current theme mode (unused, kept for API consistency)
 * @returns The base color as a hex string
 */
const generateBaseColor = (baseColor: string, _mode: ThemeMode): string =>
	colord(baseColor).toHex();

/**
 * Generates a hover state color from the base color.
 * In light mode, produces a slightly darker shade to indicate interactivity.
 * In dark mode, produces a slightly lighter shade for the same visual feedback.
 *
 * @param baseColor - The base color in any valid CSS color format
 * @param mode - The current theme mode ('light' or 'dark')
 * @returns A hex color string for the hover state
 */
const generateHoverColor = (baseColor: string, mode: ThemeMode): string =>
	mode === 'light'
		? colord(baseColor).darken(0.1).toHex()
		: colord(baseColor).lighten(0.1).toHex();

/**
 * Generates an active/pressed state color from the base color.
 * In light mode, produces a more pronounced darker shade than hover.
 * In dark mode, produces a more pronounced lighter shade than hover.
 * Used to indicate active state on click or tap interactions.
 *
 * @param baseColor - The base color in any valid CSS color format
 * @param mode - The current theme mode ('light' or 'dark')
 * @returns A hex color string for the active state
 */
const generateActiveColor = (baseColor: string, mode: ThemeMode): string =>
	mode === 'light'
		? colord(baseColor).darken(0.2).toHex()
		: colord(baseColor).lighten(0.2).toHex();

/**
 * Generates a muted/desaturated version of the base color.
 * Useful for disabled states, placeholder elements, or less prominent UI elements.
 * Also slightly adjusts lightness based on theme mode for better visual balance.
 *
 * @param baseColor - The base color in any valid CSS color format
 * @param mode - The current theme mode ('light' or 'dark')
 * @returns A hex color string representing the muted color
 */
const generateMutedColor = (baseColor: string, mode: ThemeMode): string =>
	mode === 'light'
		? colord(baseColor).desaturate(0.4).lighten(0.15).toHex()
		: colord(baseColor).desaturate(0.4).darken(0.15).toHex();

/**
 * Generates a contrast color for text or icons placed on top of the base color.
 * Returns either black or white depending on the base color's perceived brightness,
 * ensuring readability and accessibility (WCAG compliance).
 *
 * @param baseColor - The base color in any valid CSS color format
 * @param _mode - The current theme mode (unused, contrast is based on color luminance)
 * @returns '#ffffff' for dark base colors, '#000000' for light base colors
 */
const generateContrastColor = (baseColor: string, _mode: ThemeMode): string =>
	colord(baseColor).isDark() ? '#ffffff' : '#000000';

/**
 * Generates a complete set of color tokens based on a base color and theme mode.
 * Produces consistent, accessible color variations for UI components including
 * soft backgrounds, hover states, active states, muted variants, and contrast colors.
 *
 * @param color - The base color in any valid CSS color format
 * @param mode - The current theme mode ('light' or 'dark')
 * @returns An object containing all color token variations
 */
const generateColorTokens = (color: string, mode: ThemeMode): ColorTokenProps => ({
	soft: generateSoftColor(color, mode),
	base: generateBaseColor(color, mode),
	hover: generateHoverColor(color, mode),
	active: generateActiveColor(color, mode),
	muted: generateMutedColor(color, mode),
	contrast: generateContrastColor(color, mode)
});

export default generateColorTokens;
