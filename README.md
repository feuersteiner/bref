# Bref: a Svelte UI Component Library

**[Live Demo](https://feuersteiner.github.io/bref/)**

Bref is a Svelte UI component library designed to be minimal, flexible, and easy to use. It uses Svelte's built-in scoped CSS for styling, no external CSS frameworks required.

## What We Promise

- **Pure CSS with scoped styles**: Uses Svelte's native styling system for clean, maintainable components
- **Base UI components with escape hatches**: Access raw CSS properties when you need full control
- **Clear naming conventions**: Component names resemble HTML as much as possible to avoid confusion
- **Section-based components**: For more complex UI needs like navbars, modals, and cards
- **Marketing site components**: Ready-made components for building landing pages and marketing sites
- **Theming component**: A simple component to style the entire UI library (colors, padding, spacing, fonts, borders...) to your desires
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
- **Batteries included theming**: Just provide your base colors and we handle the rest (see below).

## Theming: Just Bring Your Colors

Bref is a **batteries included** theming solution. You don't need to be a color theory expert or spend hours crafting the perfect palette.

Simply provide your base theme colors, and Bref automatically generates all the necessary CSS variables with proper contrast ratios, hover states, and luminance variations. No more manually calculating shades, tints, or ensuring accessibility compliance.

Bref handles:

- **Shade generation**: Automatically creates lighter and darker variants
- **Contrast calculation**: Ensures text remains readable on all backgrounds
- **State variations**: Hover, active, and disabled states just work
- **Dark mode**: Seamlessly adapts your palette for dark themes

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
