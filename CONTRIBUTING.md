# Contributing to Bref-UI

Guidelines for adding new components to the library.

## Checklist

- [ ] Component folder with `.svelte`, `types.ts`, `index.ts`
- [ ] Export added to `src/lib/base/index.ts`
- [ ] Demo page at `src/routes/<name>/+page.svelte`
- [ ] Entry in `PAGES` array in `src/lib/internal/layout/types.ts`
- [ ] Entry in `src/routes/llms.txt/+server.ts`

---

## 1. Component Structure

Create a folder under `src/lib/base/<component-name>/` with:

```
src/lib/base/<component-name>/
├── <component-name>.svelte   # Main component
├── types.ts                  # Props interface
└── index.ts                  # Exports
```

### types.ts

Define props interface using shared types from `../types.ts`:

```ts
import type { Color, Size, Variant } from '../types.ts';

export interface MyComponentProps {
	// required props first
	label: string;
	onClick: () => void;
	// optional props with ?
	size?: Size;
	color?: Color;
	disabled?: boolean;
}
```

### index.ts

Export component and types:

```ts
export { default as MyComponent } from './my-component.svelte';
export * from './types.ts';
```

## Register the exports:

Both in `src/lib/base/index.ts` and `src/lib/index.ts`, add export line:

```ts
export * from './my-component/index.ts';
```

---

## 2. CSS Patterns

### Variable Naming

| Prefix                                 | Usage                      |
| -------------------------------------- | -------------------------- |
| `--color-*`, `--spacing`, `--border-*` | Theme tokens (external)    |
| `--internal-*`                         | Component-scoped (private) |

### Centralized Interaction Variables

Define magic numbers once in base selector:

```css
button {
	--internal-btn-transition-bg: 0.15s;
	--internal-btn-scale-active: 0.98;
	--internal-btn-disabled-opacity: 0.5;
}
```

### Color Mix Percentages

Store as variables for easy adjustment:

```css
button {
	--internal-btn-hover-mix: 85%;
	--internal-btn-active-mix: 70%;
}

.filled:not(:disabled):hover {
	background-color: color-mix(
		in oklch,
		var(--internal-current-color) var(--internal-btn-hover-mix),
		black
	);
}
```

### Size Variants

Override variables, not properties:

```css
/* Base defaults */
--internal-btn-padding-y: calc(var(--spacing) * 0.5);
--internal-btn-font-size: 1rem;

/* Size classes override variables only */
.x-small {
	--internal-btn-padding-y: calc(var(--spacing) * 0.25);
	--internal-btn-font-size: 0.75rem;
}
```

### Dynamic Color Mapping

Map theme colors to generic `--internal-current-*` variables:

```css
.primary {
	--internal-current-color: var(--color-primary);
	--internal-current-color-soft: var(--color-primary-soft);
	--internal-current-contrast: var(--color-primary-contrast);
}

/* Variants use generic variables */
.filled {
	background-color: var(--internal-current-color);
	color: var(--internal-current-contrast);
}
```

### Svelte Styling Best Practices

- Use scoped styles for component-specific rules
- Must always prefer selectors over classes when possible

---

## 3. Demo Site

### Add Route

Create demo page at `src/routes/<component-name>/+page.svelte`:

```svelte
<script lang="ts">
	import MyComponent from '$lib/base/my-component/my-component.svelte';
	import Section from '$lib/internal/layout/section.svelte';
	import CodeSnippet from '$lib/internal/layout/code-snippet.svelte';

	const usageSnippet = `<MyComponent
  label="Example"
  color="primary"
  onClick={() => handle()}
/>`;
</script>

<Section>
	<p class="intro">One sentence description of the component.</p>
</Section>

<Section title="Feature Name" description="Brief description.">
	<div class="demo">
		<MyComponent label="Example" onClick={() => {}} />
	</div>
</Section>

<Section title="Usage" description="Example code.">
	<CodeSnippet snippet={usageSnippet} />
</Section>
```

### Register in Navigation

Add to `src/lib/internal/layout/types.ts` in `PAGES` array:

```ts
{
  title: 'My Component',
  description: 'Brief description for sidebar',
  href: '/my-component',
  icon: 'icon_name'
}
```

For grouped components, nest under parent with `children`:

```ts
{
  title: 'Parent Category',
  description: 'Category description',
  href: '/parent',
  icon: 'category_icon',
  children: [
    {
      title: 'My Component',
      description: 'Component description',
      href: '/parent/my-component',
      icon: 'component_icon'
    }
  ]
}
```

---

## 4. LLM Documentation

Add component entry to `src/routes/llms.txt/+server.ts`.

### Structure

```
## ComponentName

One sentence description.

**Props:**
- \`requiredProp\`: type (required)
- \`optionalProp?\`: type

\`\`\`svelte
<ComponentName
  requiredProp="value"
  optionalProp="value"
/>
\`\`\`

---
```

### Guidelines

- One sentence description max
- Props: required first, then optional with `?`
- Code example: minimal, shows key props
- Keep token count low

### Example Entry

```
## MyComponent

Brief action-oriented description.

**Props:**
- \`label\`: string (required)
- \`onClick\`: () => void (required)
- \`size?\`: Size
- \`color?\`: Color
- \`disabled?\`: boolean

\`\`\`svelte
<MyComponent
  label="Click me"
  color="primary"
  onClick={() => handleClick()}
/>
\`\`\`

---
```
