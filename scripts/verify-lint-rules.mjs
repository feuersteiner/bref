import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { ESLint } from 'eslint';
import { compile } from 'svelte/compiler';

const projectDirectory = process.cwd();
const fixtureName = `lint-fixtures-${randomUUID()}`;
const fixtureDirectories = [
	join(projectDirectory, 'src', fixtureName),
	join(projectDirectory, 'src', 'routes', fixtureName),
	join(projectDirectory, 'src', 'routes', 'llms.txt', fixtureName),
	join(projectDirectory, 'src', 'lib', fixtureName)
];
const fixtureDirectory = fixtureDirectories[0];

if (
	fixtureDirectories.some(
		(directory) =>
			!directory.startsWith(join(projectDirectory, 'src', '')) || !directory.endsWith(fixtureName)
	)
) {
	throw new Error(
		`Refusing to use unexpected fixture directories: ${fixtureDirectories.join(', ')}`
	);
}
await Promise.all(fixtureDirectories.map((directory) => mkdir(directory)));
const eslint = new ESLint({ cwd: projectDirectory });

const writeFixture = (name, contents) => writeFile(join(fixtureDirectory, name), contents);
const lintFixture = async (name) =>
	(await eslint.lintFiles([join(fixtureDirectory, name)]))[0].messages;
const lintVirtualFixture = async (name, contents) => {
	const path = join(projectDirectory, name);
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, contents);
	return (await eslint.lintFiles([path]))[0].messages;
};
const lintTextFixture = async (name, contents) =>
	(await eslint.lintText(contents, { filePath: join(projectDirectory, name) }))[0].messages;
const expect = async (name, messagesPromise, ruleId) => {
	const messages = await messagesPromise;
	const failed = ruleId
		? !messages.some((message) => message.ruleId === ruleId)
		: messages.length > 0;
	if (failed)
		throw new Error(
			`${name} did not ${ruleId ? `report ${ruleId}` : 'pass'}: ${JSON.stringify(messages)}`
		);
};

try {
	await Promise.all([
		writeFixture('good-name.ts', 'export const validName = true;\n'),
		writeFixture('good-name.svelte', '<p>valid</p>\n'),
		writeFixture('good-name.svelte.ts', 'export const validName = true;\n'),
		writeFixture('good-name.js', 'export const validName = true;\n'),
		writeFixture('good-name.svelte.js', 'export const validName = true;\n'),
		writeFixture('BadName.ts', 'export const validName = true;\n'),
		writeFixture('BadName.js', 'export const validName = true;\n'),
		writeFixture('BadName.svelte.js', 'export const validName = true;\n'),
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
		expect('good-name.ts', lintFixture('good-name.ts')),
		expect('good-name.svelte', lintFixture('good-name.svelte')),
		expect('good-name.svelte.ts', lintFixture('good-name.svelte.ts')),
		expect('good-name.js', lintFixture('good-name.js')),
		expect('good-name.svelte.js', lintFixture('good-name.svelte.js')),
		expect('BadName.ts', lintFixture('BadName.ts'), 'check-file/filename-naming-convention'),
		expect('BadName.js', lintFixture('BadName.js'), 'check-file/filename-naming-convention'),
		expect(
			'BadName.svelte.js',
			lintFixture('BadName.svelte.js'),
			'check-file/filename-naming-convention'
		),
		expect(
			'bad_name.svelte',
			lintFixture('bad_name.svelte'),
			'check-file/filename-naming-convention'
		),
		expect(
			'BadFolder/good-name.ts',
			lintFixture('BadFolder/good-name.ts'),
			'check-file/folder-naming-convention'
		),
		expect('ordinary-component.svelte', lintFixture('ordinary-component.svelte'), 'max-lines'),
		expect('orphan-selector.svelte', lintFixture('orphan-selector.svelte'), 'svelte/valid-compile')
	]);
	await Promise.all([
		expect(
			`src/routes/${fixtureName}/+page.svelte`,
			lintVirtualFixture(`src/routes/${fixtureName}/+page.svelte`, '<p>route</p>\n')
		),
		expect(
			`src/routes/${fixtureName}/+layout.server.ts`,
			lintVirtualFixture(
				`src/routes/${fixtureName}/+layout.server.ts`,
				'export const load = () => ({});\n'
			)
		),
		expect(
			`src/routes/${fixtureName}/+page.js`,
			lintVirtualFixture(`src/routes/${fixtureName}/+page.js`, 'export const load = () => ({});\n')
		),
		expect(
			'src/lib/review-good-folder/good-name.js',
			lintTextFixture('src/lib/review-good-folder/good-name.js', 'export const validName = true;\n')
		),
		expect(
			'src/lib/review-good-folder/good-name.svelte.js',
			lintTextFixture(
				'src/lib/review-good-folder/good-name.svelte.js',
				'export const validName = true;\n'
			)
		),
		expect(
			'src/lib/ReviewBadFolder/BadName.js',
			lintTextFixture('src/lib/ReviewBadFolder/BadName.js', 'export const validName = true;\n'),
			'check-file/filename-naming-convention'
		),
		expect(
			'src/lib/ReviewBadFolder/BadName.svelte.js',
			lintTextFixture(
				'src/lib/ReviewBadFolder/BadName.svelte.js',
				'export const validName = true;\n'
			),
			'check-file/filename-naming-convention'
		),
		expect(
			`src/lib/${fixtureName}/+BadName.svelte`,
			lintVirtualFixture(`src/lib/${fixtureName}/+BadName.svelte`, '<p>invalid</p>\n'),
			'check-file/filename-naming-convention'
		),
		expect(
			`src/lib/${fixtureName}/BadFolder.txt/good-name.ts`,
			lintVirtualFixture(
				`src/lib/${fixtureName}/BadFolder.txt/good-name.ts`,
				'export const validName = true;\n'
			),
			'check-file/folder-naming-convention'
		),
		expect(
			`src/routes/llms.txt/${fixtureName}/good-name.ts`,
			lintVirtualFixture(
				`src/routes/llms.txt/${fixtureName}/good-name.ts`,
				'export const validName = true;\n'
			)
		),
		expect(
			`src/routes/llms.txt/${fixtureName}/good-name.js`,
			lintVirtualFixture(
				`src/routes/llms.txt/${fixtureName}/good-name.js`,
				'export const validName = true;\n'
			)
		),
		expect(
			`src/routes/llms.txt/${fixtureName}/BadFolder/good-name.ts`,
			lintVirtualFixture(
				`src/routes/llms.txt/${fixtureName}/BadFolder/good-name.ts`,
				'export const validName = true;\n'
			),
			'check-file/folder-naming-convention'
		)
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
	await Promise.all(
		fixtureDirectories.map((directory) => rm(directory, { recursive: true, force: true }))
	);
}
