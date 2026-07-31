export const THEME_USAGE_CODE_SNIPPET = `<script lang="ts">
  import { Theme } from 'bref-ui';
</script>

<!-- Add once at the application root. -->
<Theme />`;

export const CSS_VARIABLES_CODE_SNIPPET = `/* Semantic colors */
--color-background
--color-surface
--color-surface-hover
--color-border
--color-foreground
--color-muted
--color-accent
--color-focus

/* Component color aliases */
--color-primary, --color-primary-soft, --color-primary-saturated, --color-primary-contrast
--color-secondary, --color-secondary-soft, --color-secondary-contrast
--color-success, --color-success-soft, --color-success-contrast
--color-warning, --color-warning-soft, --color-warning-contrast
--color-danger, --color-danger-soft, --color-danger-contrast
--color-info, --color-info-soft, --color-info-contrast

/* Foundation tokens */
--space-1, --space-2, --space-3, --space-4, --space-6, --space-8
--font-family, --font-family-display
--font-size-small … --font-size-large
--radius-small … --radius-large
--shadow-small, --shadow-medium, --shadow-control, --shadow-control-hover
--motion-fast, --motion-normal, --motion-slow
--motion-ease
--focus-ring
--control-small, --control-medium, --control-large`;
