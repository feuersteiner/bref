#!/usr/bin/env node

const command = process.argv[2];

if (command === '--help' || command === '-h' || command === undefined) {
	console.log('Usage: bref <command>');
	console.log('\nCommands:');
	console.log('  theme  Generate an editable Bref theme');
	process.exit(0);
}

console.error(`Unknown command: ${command}`);
console.error('Run "bref --help" for available commands.');
process.exitCode = 1;
