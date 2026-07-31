# Bref: a Svelte UI Component Library

**[Live Demo](https://feuersteiner.github.io/bref/)**

Bref is a Svelte UI component library designed to be minimal, flexible, and easy to use. It uses Svelte's built-in scoped CSS for styling, no external CSS frameworks required.

## What We Promise

- **Pure CSS with scoped styles**: Uses Svelte's native styling system for clean, maintainable components
- **Base UI components with escape hatches**: Access raw CSS properties when you need full control
- **Clear naming conventions**: Component names resemble HTML as much as possible to avoid confusion
- **Section-based components**: For more complex UI needs like navbars, modals, and cards
- **Marketing site components**: Ready-made components for building landing pages and marketing sites
- **Dark theme foundation**: Explicit semantic tokens for colors, spacing, typography, radius, shadow, motion, and focus
- **WIP: CLI tool**: Import components directly into your codebase and customize them at will

## Installation

```
npm install bref-ui
```

## Usage

```tsx
<script lang="ts">
  import { Button } from 'bref-ui';
</script>

<Button onclick={() => console.log('Clicked!')}>Click Me</Button>
```

## Why Bref?

- **Scoped CSS**: Uses Svelte's built-in scoped styling, each component's styles are encapsulated and won't leak or conflict.
- **Minimal**: Only essential components, nothing extra.
- **Flexible**: Use as an npm package or copy components directly into your project with our CLI tool (WIP).
- **Stable semantic tokens**: Components reference shared CSS tokens instead of raw colors.

## Theming: Explicit Dark Tokens

Add \`<Theme />\` once at the application root to install Bref's dark-only semantic tokens. The theme is static: it does not calculate colors at runtime and does not provide a light mode.

The foundation documents tokens for semantic color, spacing, typography, radius, shadow, motion, focus, and dense control sizes. Components consume these tokens rather than embedding color values.

## Base Components

- [x] Icon
- [x] Button
- [x] Icon Button
- [x] Progress / Loading
  - [x] Progress Bar
  - [x] Circular
  - [x] Pulsing Dots
  - [x] Morphing Shapes
  - [x] Textual
- [x] Tree View
- [x] Pill
- [-] Inputs
  - [x] Text Input (single line)
  - [x] Area Text Input
  - [x] Slider (range)
  - [ ] File Input
  - [ ] Image Input
- [ ] Avatar
- [ ] Select
- [ ] Skeleton
- [ ] Checkbox
- [ ] Badge
- [ ] Popover
- [ ] Radio
- [ ] Switch
- [ ] Tooltip
- [ ] Dialog
- [ ] Toast
- [ ] Accordion

## Section Components

- [ ] Nav
- [ ] Aside
- [ ] Header
- [ ] Footer
- [ ] Article
- [ ] Card
- [ ] Tabs
- [ ] Table
- [ ] Form

## Marketing Components

- [ ] Hero
- [ ] Features
- [ ] Pricing
- [ ] FAQ
- [ ] Testimonials
- [ ] CTA

> If you need something you don't see here, feel free to open an issue or a PR!

## License

MIT
