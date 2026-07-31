import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import checkFile from 'eslint-plugin-check-file';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

const sharedRules = {
	'func-style': ['error', 'expression'],
	'@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
	'@typescript-eslint/consistent-type-imports': [
		'error',
		{ prefer: 'type-imports', fixStyle: 'separate-type-imports' }
	],
	'@typescript-eslint/naming-convention': [
		'error',
		{
			selector: 'typeLike',
			format: ['PascalCase']
		}
	],
	'max-lines': ['error', { max: 100, skipBlankLines: true, skipComments: true }]
};

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },

		rules: {
			...sharedRules,
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['src/**/*.{ts,svelte}'],
		plugins: { 'check-file': checkFile },
		rules: {
			'check-file/filename-naming-convention': [
				'error',
				{
					'**/!+(*).{ts,svelte}': 'KEBAB_CASE'
				}
			],
			'check-file/folder-naming-convention': [
				'error',
				{
					'**/!(*.txt)/': 'KEBAB_CASE'
				}
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],

		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		files: ['**/*.svelte'],
		rules: {
			// A component's template and scoped styles share one file; retain the 100-line limit for
			// script modules while allowing style-heavy components enough room to remain cohesive.
			'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
			// Dynamic Svelte class expressions produce an empty placeholder in the parser. Static
			// classes still require a matching scoped selector.
			'svelte/no-unused-class-name': ['error', { allowedClassNames: ['/^$/'] }]
		}
	},
	{
		// These declaration-only/generated modules are intentionally kept as single registries.
		// #41 may rename icon/types.ts to icon-names.ts, which remains covered here.
		files: [
			'src/internal/layout/types.ts',
			'src/lib/base/icon/{types,icon-names}.ts',
			'src/routes/llms.txt/+server.ts'
		],
		rules: { 'max-lines': 'off' }
	}
);
