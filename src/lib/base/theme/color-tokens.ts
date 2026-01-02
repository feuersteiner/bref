import { colord } from 'colord';
import type { ColorTokenProps, ThemeMode, ThemeProps } from './types.ts';

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
	mode === 'light' ? colord(baseColor).darken(0.1).toHex() : colord(baseColor).lighten(0.1).toHex();

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
	mode === 'light' ? colord(baseColor).darken(0.2).toHex() : colord(baseColor).lighten(0.2).toHex();

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
 * Each token is set as `--color-{mode}-{colorKey}-{variant}` on the document root.
 *
 * @param colorKey - The semantic name for the color (e.g., 'primary', 'success')
 * @param baseColor - The base color in any valid CSS color format
 * @param mode - The current theme mode ('light' or 'dark')
 */
const setColorTokens = (colorKey: string, baseColor: string, mode: ThemeMode) => {
	const tokens = generateColorTokens(baseColor, mode);
	Object.entries(tokens).forEach(([variant, value]) => {
		setCSSProperty(`--color-${mode}-${colorKey}-${variant}`, value);
	});
};

/**
 * Flips the background and foreground colors of the theme for dark mode.
 * In dark mode, the background becomes the foreground and vice versa.
 * This ensures appropriate contrast and readability in dark themes.
 *
 * @param theme - The theme configuration object containing surface colors
 * @param mode - The current theme mode ('light' or 'dark')
 * @returns A new ThemeProps object with flipped background and foreground if in dark mode
 */
const flipThemeBackgroundAndForeground = (theme: ThemeProps, mode: ThemeMode): ThemeProps => {
	const flippedTheme = structuredClone(theme);
	if (mode === 'dark') {
		const darkBackground = theme.surfaceHex.background;
		const lightForeground = theme.surfaceHex.foreground;
		flippedTheme.surfaceHex.background = lightForeground;
		flippedTheme.surfaceHex.foreground = darkBackground;
	}
	return flippedTheme;
};

/**
 * Applies all color tokens for a specific theme mode as CSS custom properties.
 * Sets palette colors, surface colors, and border color for the given mode.
 *
 * @param theme - The theme configuration object containing palette and surface colors
 * @param mode - The theme mode ('light' or 'dark') to apply
 */
const setThemeMode = (userTheme: ThemeProps, mode: ThemeMode) => {
	const theme = flipThemeBackgroundAndForeground(userTheme, mode);

	Object.entries(theme.paletteHex).forEach(([color, value]) => {
		setCSSProperty(`--color-${mode}-${color}`, value);
		setColorTokens(color, value, mode);
	});
	Object.entries(theme.surfaceHex).forEach(([surface, value]) => {
		setCSSProperty(`--color-${mode}-${surface}`, value);
	});
	setCSSProperty(`--color-${mode}-border`, theme.border.colorHex);
};

export { generateColorTokens, setCSSProperty, setThemeMode };
export default setColorTokens;
