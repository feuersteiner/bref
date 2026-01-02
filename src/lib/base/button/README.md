# Button Component Styling Patterns

This document describes the CSS architecture and patterns used in the Button component.

## CSS Variable Naming Convention

### Internal vs External Variables

| Prefix | Meaning | Example |
|--------|---------|---------|
| `--color-*`, `--spacing`, `--border-radius` | **External/Theme tokens** – global design system variables | `--color-primary`, `--spacing` |
| `--internal-*` | **Internal/Private** – component-scoped variables, implementation details | `--internal-btn-hover-mix` |

The `--internal-` prefix signals that these variables are not part of the public API and should not be overridden by consumers.

---

## Pattern 1: Centralized Interaction Variables

All magic numbers for interactions are defined once in the base `button` selector:

```css
button {
  --internal-btn-transition-bg: 0.15s;
  --internal-btn-transition-transform: 0.08s;
  --internal-btn-scale-active: 0.98;
  --internal-btn-disabled-opacity: 0.5;
}
```

**Benefits:**
- Single source of truth for timing/effects
- Easy to tweak all hover/active states at once
- Self-documenting variable names

---

## Pattern 2: Color Mix Percentages as Variables

Instead of hardcoding percentages in `color-mix()`, they're stored as variables:

```css
button {
  --internal-btn-hover-mix: 85%;
  --internal-btn-active-mix: 70%;
  --internal-btn-ghost-hover-opacity: 10%;
  --internal-btn-ghost-active-opacity: 25%;
}
```

**Usage:**
```css
.filled:not(:disabled):hover {
  background-color: color-mix(in oklch, var(--internal-current-color) var(--internal-btn-hover-mix), black);
}
```

---

## Pattern 3: Size Variants via Variable Overrides

Instead of repeating `padding`, `font-size`, `border-radius` in each size class, we override internal variables:

```css
/* Defaults set in button {} */
--internal-btn-padding-y: calc(var(--spacing) * 0.5);
--internal-btn-padding-x: calc(var(--spacing) * 1);
--internal-btn-font-size: 1rem;
--internal-btn-radius: calc(var(--border-radius) * 1.25);

/* Size classes only override the variables */
.x-small {
  --internal-btn-padding-y: calc(var(--spacing) * 0.25);
  --internal-btn-padding-x: calc(var(--spacing) * 0.5);
  --internal-btn-font-size: 0.75rem;
  --internal-btn-radius: calc(var(--border-radius) * 0.75);
}
```

The actual properties are applied once in the base selector:
```css
button {
  padding: var(--internal-btn-padding-y) var(--internal-btn-padding-x);
  font-size: var(--internal-btn-font-size);
  border-radius: var(--internal-btn-radius);
}
```

---

## Pattern 4: Dynamic Color Mapping

Color classes map theme tokens to "current" internal variables:

```css
.primary {
  --internal-current-color: var(--color-primary);
  --internal-current-color-soft: var(--color-primary-soft);
  --internal-current-contrast: var(--color-primary-contrast);
}

.danger {
  --internal-current-color: var(--color-danger);
  --internal-current-color-soft: var(--color-danger-soft);
  --internal-current-contrast: var(--color-danger-contrast);
}
```

Variants then use these generic variables:

```css
.filled {
  background-color: var(--internal-current-color);
  color: var(--internal-current-contrast);
}

.soft {
  background-color: var(--internal-current-color-soft);
  color: var(--internal-current-color);
}

.ghost {
  background-color: transparent;
  color: var(--internal-current-color);
}
```

**Benefits:**
- Adding a new color = 1 small block (3 lines)
- Variants are color-agnostic (DRY)
- ~270 lines → ~180 lines

---

## Pattern 5: Consistent Color Spaces

| Variant | Color Space | Reason |
|---------|-------------|--------|
| `filled`, `soft` | `oklch` | Perceptually uniform darkening with black |
| `ghost` | `srgb` | Mixing with `transparent` works better in srgb |

```css
/* Filled/Soft: darken with black */
color-mix(in oklch, var(--internal-current-color) 85%, black)

/* Ghost: fade to transparent */
color-mix(in srgb, var(--internal-current-color-soft) 10%, transparent)
```

---

## Summary

| Pattern | What It Solves |
|---------|----------------|
| Internal prefix (`--internal-*`) | Signals private implementation details |
| Centralized interaction vars | No scattered magic numbers |
| Color mix percentages as vars | Adjust hover/active intensity in one place |
| Size via variable overrides | Sizes don't repeat property declarations |
| Dynamic color mapping | Variants are color-agnostic; adding colors is trivial |
