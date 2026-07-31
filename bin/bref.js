#!/usr/bin/env node

import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { DEFAULT_SEEDS, normalizeHex, writeTheme } from './theme.js';

const SEED_NAMES = ['background', 'foreground', 'accent', 'success', 'warning', 'error'];

function printHelp() {
	console.log(`Usage: bref theme [options]

Generate an editable Svelte theme at src/lib/theme/theme.svelte.

Options:
  --output <path>       Output path (default: src/lib/theme/theme.svelte)
  --background <hex>    Background seed
  --foreground <hex>    Foreground seed
  --accent <hex>        Accent seed
  --success <hex>       Success seed
  --warning <hex>       Warning seed
  --error <hex>         Error seed
  --yes                 Use defaults for unspecified seeds without prompting
  -h, --help            Show this help`);
}

function parseThemeArguments(argumentsList) {
	const options = { output: 'src/lib/theme/theme.svelte', yes: false, seeds: {} };

	for (let index = 0; index < argumentsList.length; index += 1) {
		const argument = argumentsList[index];

		if (argument === '--yes') {
			options.yes = true;
			continue;
		}

		if (argument === '--help' || argument === '-h') {
			options.help = true;
			continue;
		}

		if (argument === '--output' || SEED_NAMES.includes(argument.slice(2))) {
			const value = argumentsList[index + 1];

			if (!value || value.startsWith('--')) {
				throw new Error(`Missing value for ${argument}.`);
			}

			if (argument === '--output') {
				options.output = value;
			} else {
				options.seeds[argument.slice(2)] = normalizeHex(value);
			}

			index += 1;
			continue;
		}

		throw new Error(`Unknown option: ${argument}`);
	}

	return options;
}

async function promptForSeeds(initialSeeds) {
	const prompt = createInterface({ input, output });
	const seeds = { ...initialSeeds };

	try {
		for (const name of SEED_NAMES) {
			if (seeds[name]) continue;

			const answer = await prompt.question(`${name} (${DEFAULT_SEEDS[name]}): `);
			seeds[name] = answer.trim() ? normalizeHex(answer) : DEFAULT_SEEDS[name];
		}
	} finally {
		prompt.close();
	}

	return seeds;
}

async function run() {
	const [command, ...argumentsList] = process.argv.slice(2);

	if (command === '--help' || command === '-h' || command === undefined) {
		printHelp();
		return;
	}

	if (command !== 'theme') {
		throw new Error(`Unknown command: ${command}`);
	}

	const options = parseThemeArguments(argumentsList);

	if (options.help) {
		printHelp();
		return;
	}

	const seeds =
		options.yes || !input.isTTY
			? { ...DEFAULT_SEEDS, ...options.seeds }
			: await promptForSeeds(options.seeds);
	const target = await writeTheme(options.output, seeds);

	console.log(`Theme created at ${target}`);
}

run().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
