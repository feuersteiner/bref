import type { Color } from '../types.ts';

/**
 * Every public Color needs a complete semantic-token mapping. Record<Color, ...>
 * makes adding an alias fail type checking until Button and IconButton support it.
 */
export const BUTTON_COLOR_VARIABLES: Record<Color, string> = {
	primary:
		'--internal-current-color: var(--color-primary); --internal-current-color-soft: var(--color-primary-soft); --internal-current-contrast: var(--color-primary-contrast)',
	secondary:
		'--internal-current-color: var(--color-secondary); --internal-current-color-soft: var(--color-secondary-soft); --internal-current-contrast: var(--color-secondary-contrast)',
	success:
		'--internal-current-color: var(--color-success); --internal-current-color-soft: var(--color-success-soft); --internal-current-contrast: var(--color-success-contrast)',
	warning:
		'--internal-current-color: var(--color-warning); --internal-current-color-soft: var(--color-warning-soft); --internal-current-contrast: var(--color-warning-contrast)',
	danger:
		'--internal-current-color: var(--color-danger); --internal-current-color-soft: var(--color-danger-soft); --internal-current-contrast: var(--color-danger-contrast)',
	info: '--internal-current-color: var(--color-info); --internal-current-color-soft: var(--color-info-soft); --internal-current-contrast: var(--color-info-contrast)',
	foreground:
		'--internal-current-color: var(--color-foreground); --internal-current-color-soft: var(--color-background-saturated); --internal-current-contrast: var(--color-background)',
	background:
		'--internal-current-color: var(--color-background); --internal-current-color-soft: var(--color-foreground-saturated); --internal-current-contrast: var(--color-foreground)'
};
