import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterEach, describe, expect, it } from 'vitest';
import { contrastRatio, generateTokens, renderTheme, writeTheme } from './theme.js';

const temporaryDirectories = [];

afterEach(async () => {
	await Promise.all(
		temporaryDirectories
			.splice(0)
			.map((directory) => rm(directory, { recursive: true, force: true }))
	);
});

async function temporaryDirectory() {
	const directory = await mkdtemp(path.join(tmpdir(), 'bref-theme-'));
	temporaryDirectories.push(directory);
	return directory;
}

describe('theme generation', () => {
	it('creates explicit tokens with accessible foreground and component contrast', () => {
		const tokens = generateTokens({
			background: '#ffffff',
			foreground: '#aaaaaa',
			accent: '#87ceeb'
		});

		expect(
			contrastRatio(tokens['--color-foreground'], tokens['--color-background'])
		).toBeGreaterThanOrEqual(4.5);
		expect(
			contrastRatio(tokens['--color-primary-contrast'], tokens['--color-primary'])
		).toBeGreaterThanOrEqual(4.5);
		expect(tokens['--color-primary']).toMatch(/^#[\da-f]{6}$/);
		expect(renderTheme({ accent: '#0ea5e9' })).toContain('--color-focus:');
	});

	it('creates a new theme without overwriting an existing one', async () => {
		const directory = await temporaryDirectory();
		const target = path.join(directory, 'src/lib/theme/theme.svelte');

		await expect(writeTheme(target, { accent: '#0ea5e9' })).resolves.toBe(path.resolve(target));
		expect(await readFile(target, 'utf8')).toContain('--color-accent: #0ea5e9;');
		await expect(writeTheme(target, {})).rejects.toThrow(
			`Theme already exists at ${path.resolve(target)}`
		);
	});

	it('preserves a colliding file', async () => {
		const directory = await temporaryDirectory();
		const target = path.join(directory, 'theme.svelte');

		await writeFile(target, 'keep this theme', 'utf8');
		await expect(writeTheme(target, {})).rejects.toThrow('Theme already exists');
		expect(await readFile(target, 'utf8')).toBe('keep this theme');
	});

	it('accepts non-interactive seeds and reports a collision through the CLI', async () => {
		const directory = await temporaryDirectory();
		const target = path.join(directory, 'theme.svelte');
		const argumentsList = [
			'bin/bref.js',
			'theme',
			'--yes',
			'--accent',
			'#0ea5e9',
			'--output',
			target
		];

		expect(spawnSync(process.execPath, argumentsList).status).toBe(0);
		expect(await readFile(target, 'utf8')).toContain('--color-accent: #0ea5e9;');

		const collision = spawnSync(process.execPath, argumentsList, { encoding: 'utf8' });
		expect(collision.status).toBe(1);
		expect(collision.stderr).toContain(`Theme already exists at ${path.resolve(target)}`);
	});
});
