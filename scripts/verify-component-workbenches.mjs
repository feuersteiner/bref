import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'src/routes/components';
const registry = readFileSync(join(root, 'registry.ts'), 'utf8');
const workbenches = readdirSync(root, { withFileTypes: true }).filter((entry) =>
	entry.isDirectory()
);
const errors = [];

for (const entry of workbenches) {
	const directory = join(root, entry.name);
	const page = join(directory, '+page.svelte');
	const snippets = join(directory, 'snippets.ts');
	if (!existsSync(page) || !existsSync(snippets)) {
		errors.push(`${entry.name} must contain +page.svelte and snippets.ts.`);
		continue;
	}
	const source = readFileSync(page, 'utf8');
	if (!source.includes('ComponentPage') || !source.includes("from './snippets.ts'")) {
		errors.push(`${entry.name} must render ComponentPage with its local snippets.`);
	}
	if (
		!registry.includes(`./${entry.name}/snippets`) ||
		!registry.includes(`slug: '${entry.name}'`)
	) {
		errors.push(`${entry.name} must be registered in src/routes/components/registry.ts.`);
	}
}

if (errors.length)
	throw new Error(`Component workbench verification failed:\n${errors.join('\n')}`);
