import { colord } from 'colord';
import type { ColorTokenProps, ThemeMode, ThemeProps } from './types.ts';

/**
 * Generates a soft background color from the base color.
 * Produces a lighter, slightly desaturated shade suitable as a
 * background when using the base color as foreground.
 *
 * @param baseColor - The base color in any valid CSS color format
 * @returns A hex color string representing the soft background color
 */
const generateSoftColor = (baseColor: string): string =>
	colord(baseColor).lighten(0.25).desaturate(0.1).toHex();

/**
 * Generates a saturated (darker) version of the base color.
 * Produces a deeper, more intense shade suitable for emphasis or contrast.
 *
 * @param baseColor - The base color in any valid CSS color format
 * @returns A hex color string representing the saturated color
 */
const generateSaturatedColor = (baseColor: string): string =>
	colord(baseColor).darken(0.15).saturate(0.1).toHex();

/**
 * Generates a contrast color for text or icons placed on top of the base color.
 * Returns either black or white depending on the base color's perceived brightness,
 * ensuring readability and accessibility (WCAG compliance).
 *
 * @param baseColor - The base color in any valid CSS color format
 * @returns '#ffffff' for dark base colors, '#000000' for light base colors
 */
const generateContrastColor = (baseColor: string): string =>
	colord(baseColor).isDark() ? '#ffffff' : '#000000';

/**
 * Generates a minimal set of color tokens based on a base color.
 * Produces soft, saturated, and contrast variants. Hover/active states are
 * left to components using CSS color-mix() for context-aware state derivation.
 *
 * @param color - The base color in any valid CSS color format
 * @returns An object containing soft, saturated, and contrast color tokens
 */
const generateColorTokens = (color: string): ColorTokenProps => ({
	soft: generateSoftColor(color),
	saturated: generateSaturatedColor(color),
	contrast: generateContrastColor(color)
});

/**
 * Sets a CSS custom property on the document root element.
 * Automatically prefixes the key with '--' if not already present.
 *
 * @param key - The CSS custom property name (with or without '--' prefix)
 * @param value - The value to assign to the CSS custom property
 */
const setCSSProperty = (key: string, value: string) => {
	const prefixedKey = key.startsWith('--') ? key : `--${key}`;
	document.documentElement.style.setProperty(prefixedKey, value);
};

/**
 * Generates and applies a complete set of color tokens as CSS custom properties.
 * Each token is set as `--color-{colorKey}` and `--color-{colorKey}-{variant}` on the document root.
 *
 * @param colorKey - The semantic name for the color (e.g., 'primary', 'success')
 * @param baseColor - The base color in any valid CSS color format
 */
const setColorTokens = (colorKey: string, baseColor: string) => {
	const tokens = generateColorTokens(baseColor);
	setCSSProperty(`--color-${colorKey}`, baseColor);
	Object.entries(tokens).forEach(([variant, value]) => {
		setCSSProperty(`--color-${colorKey}-${variant}`, value);
	});
};

/**
 * Generates and applies surface color tokens with mode prefix for light/dark switching.
 * Each token is set as `--color-{mode}-{surfaceKey}-{variant}` on the document root.
 *
 * @param surfaceKey - The semantic name for the surface (e.g., 'background', 'foreground')
 * @param baseColor - The base color in any valid CSS color format
 * @param mode - The theme mode ('light' or 'dark')
 */
const setSurfaceTokens = (surfaceKey: string, baseColor: string, mode: ThemeMode) => {
	const tokens = generateColorTokens(baseColor);
	setCSSProperty(`--color-${mode}-${surfaceKey}`, baseColor);
	Object.entries(tokens).forEach(([variant, value]) => {
		setCSSProperty(`--color-${mode}-${surfaceKey}-${variant}`, value);
	});
};

/**
 * Applies all theme tokens as CSS custom properties.
 * Palette colors are set without mode prefix (consistent across themes).
 * Surface colors (background/foreground) are set with mode prefix for light/dark switching.
 *
 * @param theme - The theme configuration object containing palette and surface colors
 */
const setThemeTokens = (theme: ThemeProps) => {
	// Palette colors: same across light/dark modes
	Object.entries(theme.paletteHex).forEach(([color, value]) => {
		setColorTokens(color, value);
	});

	// Surface colors: different for light/dark modes
	// Light mode uses colors as-is
	Object.entries(theme.surfaceHex).forEach(([surface, value]) => {
		setSurfaceTokens(surface, value, 'light');
	});

	// Dark mode flips background and foreground
	setSurfaceTokens('background', theme.surfaceHex.foreground, 'dark');
	setSurfaceTokens('foreground', theme.surfaceHex.background, 'dark');

	// Border color
	setCSSProperty('--color-border', theme.border.colorHex);
};

export { generateColorTokens, setCSSProperty, setThemeTokens };
export default setColorTokens;
