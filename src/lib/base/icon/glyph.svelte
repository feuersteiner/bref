<script module lang="ts">
	import fontUrl from './assets/material-symbols-rounded-latin-full-normal.woff2?url';

	if (
		typeof document !== 'undefined' &&
		!document.head.querySelector('[data-bref-material-symbols]')
	) {
		const preload = document.createElement('link');
		preload.rel = 'preload';
		preload.href = fontUrl;
		preload.as = 'font';
		preload.type = 'font/woff2';
		preload.crossOrigin = 'anonymous';
		preload.dataset.brefMaterialSymbols = '';
		document.head.append(preload);
	}
</script>

<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { GlyphProps } from './types.ts';

	const {
		name,
		label,
		filled = false,
		weight,
		grade,
		class: className,
		...rest
	}: GlyphProps & SvelteHTMLElements['span'] = $props();

	const variationSettings = $derived(`\"FILL\" ${filled ? 1 : 0}, \"GRAD\" ${grade ?? 0}`);
</script>

<span
	{...rest}
	class={['glyph', className].filter(Boolean).join(' ')}
	style:font-weight={weight}
	style:font-variation-settings={variationSettings}
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
>
	{name}
</span>

<style>
	@font-face {
		font-family: 'Bref Material Symbols Rounded';
		font-style: normal;
		font-weight: 100 700;
		font-display: block;
		src: url('./assets/material-symbols-rounded-latin-full-normal.woff2') format('woff2');
	}

	.glyph {
		color: inherit;
		font-family: 'Bref Material Symbols Rounded';
		font-size: inherit;
		font-weight: inherit;
		font-style: normal;
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;
		flex-shrink: 0;
		user-select: none;
	}
</style>
