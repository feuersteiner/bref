export const prerender = true;

export function GET() {
	const content = `# Bref-UI

Minimal Svelte 5 UI component library. Scoped CSS, no dependencies, batteries-included theming.

Install: \`npm|bun|pnpm install bref-ui\`

Import: \`import { Button, Icon, TextInput, TreeView, Pill, Theme } from 'bref-ui';\`

## Types

\`\`\`ts
type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'foreground' | 'background'
type Variant = 'filled' | 'soft' | 'ghost'
type Speed = 'slow' | 'normal' | 'fast'
\`\`\`

---

## Theme

Generates CSS custom properties for theming. Add at app root.

**Props:**
- \`paletteHex\`: { primary, secondary, success, warning, danger, info: string }
- \`surfaceHex\`: { background, foreground: string }
- \`border\`: { widthPx: number, radiusRem: number, colorHex: string }
- \`spacingRem\`: number

\`\`\`svelte
<Theme
  paletteHex={{
    primary: '#6366f1',
    secondary: '#ec4899',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  }}
  surfaceHex={{ background: '#f8fafc', foreground: '#1e293b' }}
  border={{ widthPx: 1, radiusRem: 0.5, colorHex: '#e2e8f0' }}
  spacingRem={1}
/>
\`\`\`

---

## Button

Versatile button with variants, colors, sizes, optional icon.

**Props:**
- \`label\`: string (required)
- \`onClick\`: () => void (required)
- \`size?\`: Size
- \`color?\`: Color
- \`variant?\`: Variant
- \`disabled?\`: boolean
- \`wide?\`: boolean
- \`icon?\`: { name: IconName, filled?: boolean }

\`\`\`svelte
<Button
  label="Submit"
  icon={{ name: 'check', filled: true }}
  color="success"
  variant="filled"
  size="large"
  onClick={() => handleSubmit()}
/>
\`\`\`

---

## IconButton

Icon-only button for toolbars and compact actions.

**Props:**
- \`name\`: IconName (required)
- \`onClick\`: () => void (required)
- \`filled?\`: boolean
- \`size?\`: Size
- \`color?\`: Color
- \`variant?\`: Variant
- \`disabled?\`: boolean
- \`rounded?\`: boolean
- \`ariaLabel?\`: string

\`\`\`svelte
<IconButton
  name="favorite"
  filled={true}
  color="danger"
  variant="soft"
  size="large"
  rounded
  onClick={() => handleClick()}
/>
\`\`\`

---

## Icon

Google Material Symbols Rounded icons.

**Props:**
- \`name\`: IconName (required)
- \`filled?\`: boolean
- \`size?\`: Size
- \`color?\`: Color
- \`ariaLabel?\`: string
- \`contrastMode?\`: boolean

\`\`\`svelte
<Icon
  name="favorite"
  filled={true}
  color="danger"
  size="large"
/>
\`\`\`

---

## TextInput

Single-line input with optional icon, CTA button, validation.

**Props:**
- \`value\`: string (required)
- \`onChange\`: (value: string) => void (required)
- \`placeholder?\`: string
- \`disabled?\`: boolean
- \`wide?\`: boolean
- \`startIcon?\`: IconName
- \`variant?\`: 'soft' | 'ghost'
- \`validation?\`: { regex: RegExp, message: string }
- \`ctaIconButton?\`: IconButtonProps & { triggerOnEnter?: boolean, clearOnTrigger?: boolean }

\`\`\`svelte
<TextInput
  value={name}
  placeholder="Enter your name"
  startIcon="person"
  variant="soft"
  onChange={(v) => name = v}
/>
\`\`\`

With CTA and validation:

\`\`\`svelte
<TextInput
  value={email}
  placeholder="Enter email"
  validation={{
    regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    message: 'Please enter a valid email'
  }}
  ctaIconButton={{
    name: 'check',
    variant: 'ghost',
    triggerOnEnter: true,
    onClick: () => submit()
  }}
  onChange={(v) => email = v}
/>
\`\`\`

---

## AreaTextInput

Multi-line textarea with configurable rows.

**Props:**
- \`value\`: string (required)
- \`onChange\`: (value: string) => void (required)
- \`placeholder?\`: string
- \`disabled?\`: boolean
- \`wide?\`: boolean
- \`rows?\`: number (default: 3)
- \`resizable?\`: boolean (default: true)

\`\`\`svelte
<AreaTextInput
  value={description}
  placeholder="Enter a description..."
  rows={4}
  onChange={(v) => description = v}
/>
\`\`\`

---

## TreeView

Collapsible nested tree for hierarchical data.

**Data structure:**
\`\`\`ts
interface NodeDataProps {
  id: string;
  label: string;
  icon?: IconName;
  children?: NodeDataProps[];
}
\`\`\`

**Props:**
- \`data\`: NodeDataProps[] (required)
- \`selectedIds\`: Set<string> (required)
- \`onSelect\`: (id: string) => void (required)
- \`size?\`: Size
- \`wide?\`: boolean
- \`filledIcon?\`: boolean
- \`expandOnSelect?\`: boolean

\`\`\`svelte
<script lang="ts">
  import { TreeView, type NodeDataProps } from 'bref-ui';

  const data: NodeDataProps[] = [
    {
      id: '1',
      label: 'Documents',
      icon: 'folder',
      children: [
        { id: '1-1', label: 'report.pdf', icon: 'description' },
        { id: '1-2', label: 'notes.txt', icon: 'article' }
      ]
    }
  ];

  let selectedIds = $state<Set<string>>(new Set());
  const onSelect = (id: string) => {
    selectedIds = new Set([id]);
  };
</script>

<TreeView {data} {selectedIds} {onSelect} />
\`\`\`

---

## CircularLoading

Spinning circular loader.

**Props:**
- \`size?\`: Size
- \`color?\`: Color

\`\`\`svelte
<CircularLoading size="medium" color="primary" />
\`\`\`

---

## PulsingDotsLoading

Three dots pulsing in sequence.

**Props:**
- \`size?\`: Size
- \`color?\`: Color

\`\`\`svelte
<PulsingDotsLoading size="medium" color="primary" />
\`\`\`

---

## MorphingShapesLoading

Shape-shifting animated loader.

**Props:**
- \`size?\`: Size
- \`color?\`: Color
- \`speed?\`: Speed
- \`isGradient?\`: boolean
- \`pulseShadow?\`: boolean

\`\`\`svelte
<MorphingShapesLoading
  size="medium"
  color="primary"
  speed="normal"
  isGradient
  pulseShadow
/>
\`\`\`

---

## TextualLoading

Rotating words with typing animation.

**Props:**
- \`size?\`: Size
- \`color?\`: Color
- \`words?\`: string[] (default: 20 fun words)
- \`hideDots?\`: boolean
- \`typeSpeed?\`: Speed
- \`pauseSpeed?\`: Speed

\`\`\`svelte
<TextualLoading
  words={['Thinking', 'Processing', 'Generating']}
  typeSpeed="fast"
  pauseSpeed="normal"
/>
\`\`\`

---

## ProgressBar

Horizontal progress bar with determinate and indeterminate modes.

**Props:**
- \`value?\`: number (0-100, omit for indeterminate mode)
- \`size?\`: Size
- \`color?\`: Color
- \`wide?\`: boolean
- \`animateValue?\`: boolean (smooth value transitions)
- \`onValueClick?\`: (clickedValue: number) => void (makes bar clickable)

\`\`\`svelte
<ProgressBar value={75} color="success" size="medium" />
\`\`\`

Indeterminate mode (loading):

\`\`\`svelte
<ProgressBar color="primary" />
\`\`\`

Clickable with animation:

\`\`\`svelte
<ProgressBar
  value={progress}
  animateValue
  onValueClick={(v) => progress = v}
/>
\`\`\`

---

## Slider

Range input slider for selecting numeric values.

**Props:**
- \`value\`: number (required)
- \`onChange\`: (value: number) => void (required)
- \`min?\`: number (default: 0)
- \`max?\`: number (default: 100)
- \`step?\`: number (default: 1)
- \`disabled?\`: boolean
- \`wide?\`: boolean
- \`size?\`: Size
- \`color?\`: 'primary' | 'foreground'

\`\`\`svelte
<script lang="ts">
  let volume = $state(50);
</script>

<Slider
  value={volume}
  min={0}
  max={100}
  onChange={(v) => volume = v}
/>
\`\`\`

With step and custom range:

\`\`\`svelte
<Slider
  value={temperature}
  min={-10}
  max={40}
  step={0.5}
  wide
  onChange={(v) => temperature = v}
/>
\`\`\`

---

## Pill

Compact label for tags and statuses.

**Props:**
- \`label\`: string (required)
- \`size?\`: Size
- \`color?\`: Color
- \`variant?\`: Variant
- \`icon?\`: { name: IconName, filled?: boolean }

\`\`\`svelte
<Pill label="New" color="success" />
\`\`\`

With icon:

\`\`\`svelte
<Pill label="Featured" icon={{ name: 'star', filled: true }} color="warning" />
\`\`\`

---

## Common Icon Names

home, settings, search, menu, close, check, add, delete, edit, refresh, download, upload, favorite, star, person, send, mail, folder, description, article, image, warning, error, check_circle, arrow_back, arrow_forward, chevron_right, chevron_left
`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
