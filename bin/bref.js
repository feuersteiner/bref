#!/usr/bin/env node

const command = process.argv[2];

if (command === '--help' || command === '-h' || command === undefined) {
	console.log('Usage: bref <command>');
	console.log('\nNo commands are available yet.');
	process.exit(0);
}

console.error(`Unknown command: ${command}`);
console.error('Run "bref --help" for available commands.');
process.exitCode = 1;
