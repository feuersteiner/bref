import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { ESLint } from 'eslint';
import { compile } from 'svelte/compiler';

const projectDirectory = process.cwd();
const fixtureDirectory = join(projectDirectory, 'src/lint-fixtures');
await rm(fixtureDirectory, { recursive: true, force: true });
await mkdir(fixtureDirectory);
const eslint = new ESLint({ cwd: projectDirectory });

const writeFixture = (name, contents) => writeFile(join(fixtureDirectory, name), contents);
const lintFixture = async (name) =>
	(await eslint.lintFiles([join(fixtureDirectory, name)]))[0].messages;
const expectRule = async (name, ruleId) => {
	const messages = await lintFixture(name);
	if (!messages.some((message) => message.ruleId === ruleId)) {
		throw new Error(`${name} did not report ${ruleId}: ${JSON.stringify(messages)}`);
	}
};
const expectClean = async (name) => {
	const messages = await lintFixture(name);
	if (messages.length > 0)
		throw new Error(`${name} unexpectedly failed: ${JSON.stringify(messages)}`);
};

try {
	await Promise.all([
		writeFixture('good-name.ts', 'export const validName = true;\n'),
		writeFixture('good-name.svelte', '<p>valid</p>\n'),
		writeFixture('good-name.svelte.ts', 'export const validName = true;\n'),
		writeFixture('+page.svelte', '<p>route</p>\n'),
		writeFixture('BadName.ts', 'export const validName = true;\n'),
		writeFixture('bad_name.svelte', '<p>invalid</p>\n'),
		writeFixture(
			'ordinary-component.svelte',
			`${Array.from({ length: 101 }, () => '<p>line</p>').join('\n')}\n`
		),
		writeFixture('orphan-selector.svelte', '<p>used</p>\n<style>.orphan { color: red; }</style>\n')
	]);
	await mkdir(join(fixtureDirectory, 'BadFolder'));
	await writeFile(
		join(fixtureDirectory, 'BadFolder/good-name.ts'),
		'export const validName = true;\n'
	);

	await Promise.all([
		expectClean('good-name.ts'),
		expectClean('good-name.svelte'),
		expectClean('good-name.svelte.ts'),
		expectClean('+page.svelte'),
		expectRule('BadName.ts', 'check-file/filename-naming-convention'),
		expectRule('bad_name.svelte', 'check-file/filename-naming-convention'),
		expectRule('BadFolder/good-name.ts', 'check-file/folder-naming-convention'),
		expectRule('ordinary-component.svelte', 'max-lines'),
		expectRule('orphan-selector.svelte', 'svelte/valid-compile')
	]);

	const cssHeavyConfig = await eslint.calculateConfigForFile('src/lib/base/select/select.svelte');
	if (cssHeavyConfig.rules['max-lines'][1].max !== 300)
		throw new Error('CSS-heavy Select exemption is absent');

	const selectSource = await readFile('src/lib/base/select/select.svelte', 'utf8');
	if (!selectSource.includes('{#each options as option, index (index)}')) {
		throw new Error('Select does not use an index key for duplicate option values');
	}
	compile(
		"<script>const options = [{ value: 'same' }, { value: 'same' }];</script>{#each options as option, index (index)}<option value={option.value}>{option.value}</option>{/each}",
		{ generate: 'client' }
	);

	console.log(`Lint rule fixtures passed: ${relative(projectDirectory, fixtureDirectory)}`);
} finally {
	await rm(fixtureDirectory, { recursive: true, force: true });
}
