import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as fontkit from 'fontkit';

const typeFile = fileURLToPath(new URL('../src/lib/base/icon/types.ts', import.meta.url));
const fontFile = fileURLToPath(
	new URL(
		'../src/lib/base/icon/assets/material-symbols-rounded-latin-full-normal.woff2',
		import.meta.url
	)
);
const characters = 'abcdefghijklmnopqrstuvwxyz_0123456789';

function coverageGlyphIds(coverage) {
	if (coverage.version === 1) return coverage.glyphs;

	return coverage.rangeRecords.flatMap(({ start, end }) =>
		Array.from({ length: end - start + 1 }, (_, index) => start + index)
	);
}

function iconNamesFromFont() {
	const font = fontkit.openSync(fontFile);
	const characterByGlyphId = new Map(
		[...characters].map((character) => [
			font.glyphForCodePoint(character.codePointAt(0)).id,
			character
		])
	);
	const names = new Set();

	for (const lookup of font.GSUB.lookupList.toArray()) {
		for (const subTable of lookup.subTables) {
			if (subTable.lookupType !== 4) continue;

			const ligatures = subTable.extension;
			const firstGlyphIds = coverageGlyphIds(ligatures.coverage);
			for (const [index, firstGlyphId] of firstGlyphIds.entries()) {
				for (const ligature of ligatures.ligatureSets.get(index)) {
					const glyphIds = [firstGlyphId, ...ligature.components];
					const name = glyphIds.map((glyphId) => characterByGlyphId.get(glyphId)).join('');
					if (name.length !== glyphIds.length) {
						throw new Error(`Unsupported ligature glyph sequence: ${glyphIds.join(', ')}`);
					}
					names.add(name);
				}
			}
		}
	}

	return [...names].sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
}

function generatedTypes(names) {
	const union = names.map((name) => `\t| '${name}'`).join('\n');
	return `import type { Color, Size } from '../types.ts';

// Generated from ligatures in material-symbols-rounded-latin-full-normal.woff2.
// Run \`bun run generate:icon-names\` after replacing the vendored font.
export type IconName =
${union};

export interface GlyphProps {
	name: IconName;
	label?: string;
	filled?: boolean;
	weight?: number;
	grade?: number;
}

export interface IconProps extends GlyphProps {
	size?: Size;
	color?: Color;
	background?: Color;
}
`;
}

const output = generatedTypes(iconNamesFromFont());

if (process.argv.includes('--check')) {
	if (readFileSync(typeFile, 'utf8') !== output) {
		console.error('src/lib/base/icon/types.ts is not generated from the vendored font.');
		process.exitCode = 1;
	}
} else {
	writeFileSync(typeFile, output);
}
