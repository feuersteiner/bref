# Bref: a truly Svelte-esque UI Component Library

**[Live Demo](https://feuersteiner.github.io/bref/)**

Bref is a Svelte UI component library designed to be minimal, flexible, and easy to use.
Think of it as, what if `Shadcn/ui` was built specifically for Svelte, used only CSS styling and no Tailwind CSS, fully embracing Svelte's unique capabilities and idioms.

## What We Promise

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

There are excellent Svelte component libraries out there. [Flowbite Svelte](https://github.com/themesberg/flowbite-svelte) and [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) are doing great work, and you should check them out.

Bref takes a different approach:

- **Pure CSS**: Uses Svelte's built-in scoped styling instead of Tailwind CSS. If you chose Svelte for its elegant styling solution, Bref keeps that promise.
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

- [ ] Button
- [ ] Input
- [ ] Textarea
- [ ] Select
- [ ] Checkbox
- [ ] Radio
- [ ] Switch
- [ ] Label
- [ ] Avatar
- [ ] Img
- [ ] Icon
- [ ] Progress
- [ ] Meter
- [ ] Skeleton
- [ ] Spinner
- [ ] Badge
- [ ] Tooltip
- [ ] Popover
- [ ] Dialog

## Section Components

- [ ] Nav
- [ ] Aside
- [ ] Header
- [ ] Footer
- [ ] Article
- [ ] Card
- [ ] Accordion
- [ ] Tabs
- [ ] Table
- [ ] Form
- [ ] Toast

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
