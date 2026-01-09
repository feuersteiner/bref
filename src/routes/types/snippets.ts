export const COLOR_TYPE_CODE_SNIPPET = `export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'foreground'
  | 'background';`;

export const VARIANT_TYPE_CODE_SNIPPET = `export type Variant = 'filled' | 'soft' | 'ghost';`;

export const SIZE_TYPE_CODE_SNIPPET = `export type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';`;

export const SPEED_TYPE_CODE_SNIPPET = `export type Speed = 'slow' | 'normal' | 'fast';`;

export const TYPES_USAGE_CODE_SNIPPET = `<script lang="ts">
  import { Button } from 'bref-ui';
  import type { Color, Size, Variant } from 'bref-ui';

  let color: Color = 'primary';
  let size: Size = 'medium';
  let variant: Variant = 'filled';
<\/script>

<Button label="Click me" {color} {size} {variant} />`;
