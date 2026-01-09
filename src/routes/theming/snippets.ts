export const THEME_USAGE_CODE_SNIPPET = `<script lang="ts">
  import { Theme } from 'bref-ui/base/theme';
<\/script>

<!-- Use default theme -->
<Theme />

<!-- Or customize with your own colors -->
<Theme
  paletteHex={{
    primary: '#6366f1',
    secondary: '#ec4899',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  }}
  surfaceHex={{
    background: '#f8fafc',
    foreground: '#1e293b'
  }}
  border={{ widthPx: 1, radiusRem: 0.5, colorHex: '#e2e8f0' }}
  spacingRem={1}
/>`;

export const CSS_VARIABLES_CODE_SNIPPET = `/* Palette colors - each generates 4 variants */
--color-primary          /* Base color */
--color-primary-soft     /* Lighter, subtle version */
--color-primary-saturated /* More vibrant version */
--color-primary-contrast /* Text color for use on base */

/* Surface colors */
--color-background
--color-foreground

/* Layout tokens */
--border-width
--border-radius
--border-color
--spacing`;
