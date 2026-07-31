import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { dirname, relative, sep } from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import checkFile from 'eslint-plugin-check-file';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));
const routesPath = fileURLToPath(new URL('./src/routes/', import.meta.url));

// These components exceed 100 non-blank, non-comment lines only because their scoped CSS belongs
// with their markup. Each remains within the limit when its scoped style block is excluded.
const cssHeavyComponents = [
	'src/lib/base/{button/{button,icon-button},icon/icon,loading/{morphing-shapes-loading,textual-loading},pill/pill,progress-bar/progress-bar,select/select,slider/slider,text-input/text-input,tree-view/tree-node}.svelte',
	'src/routes/{+page,buttons/{+page,button/+page},inputs/area-text-input/+page,progress/{morphing-shapes/+page,progress-bar/+page,textual/+page},theming/+page,tree-view/+page}.svelte'
];

// These documentation pages intentionally keep complete, copyable examples in one route. They are
// not CSS-heavy and must be considered separately from cssHeavyComponents.
const demoPageComponents = [
	'src/routes/{buttons/icon-button/+page,icon/+page,inputs/{select/+page,slider/+page,text-input/+page},pill-selection/+page,pill/+page,types/+page}.svelte'
];

const svelteKitSpecialFiles = [
	'src/routes/**/[+]page.{js,svelte,ts}',
	'src/routes/**/[+]page.server.{js,ts}',
	'src/routes/**/[+]layout.{js,svelte,ts}',
	'src/routes/**/[+]layout.server.{js,ts}',
	'src/routes/**/[+]error.svelte',
	'src/routes/**/[+]server.{js,ts}'
];

// SvelteKit component routes may reset to the root layout (`+page@.svelte`) or an ancestor
// segment (`+layout@segment.svelte`). Named-layout references are invalid in route modules.
const svelteKitRouteResetComponents = [
	'src/routes/**/[+]page@*.svelte',
	'src/routes/**/[+]layout@*.svelte'
];

// This mirrors the parser: Unicode escapes have 4–6 total hexadecimal-or-hyphen characters,
// then SvelteKit splits their code points on hyphens (so `[u+61-62]` is valid).
const routeParameter = String.raw`\[(?:\w+(?:=\w+)?|\[\w+(?:=\w+)?\]|\.\.\.\w+(?:=\w+)?|x\+[0-9a-f]{2}|u\+(?=[0-9a-f-]{4,6}\])[0-9a-f-]*[0-9a-f][0-9a-f-]*)\]`;
const svelteKitRouteSegment = (segment, isRoot) =>
	(isRoot && segment === 'llms.txt') ||
	/^\([^)]+\)$/.test(segment) ||
	(!/\]\[/.test(segment) &&
		/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
			segment.replaceAll(new RegExp(routeParameter, 'g'), 'parameter')
		));
const svelteKitRouteFolders = {
	rules: {
		'folder-naming': {
			meta: {
				messages: { invalid: 'Route folder "{{folder}}" is not valid SvelteKit route syntax.' },
				type: 'layout'
			},
			create: (context) => ({
				Program: (node) => {
					const folders = relative(routesPath, dirname(context.physicalFilename))
						.split(sep)
						.filter(Boolean);
					for (const [index, folder] of folders.entries()) {
						if (!svelteKitRouteSegment(folder, index === 0))
							context.report({ node, messageId: 'invalid', data: { folder } });
					}
				}
			})
		}
	}
};

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
		files: ['src/**/*.{js,ts,svelte}'],
		plugins: { 'check-file': checkFile },
		rules: {
			'check-file/filename-naming-convention': [
				'error',
				{
					'src/**/*.{js,ts,svelte}': 'KEBAB_CASE'
				},
				{ ignoreMiddleExtensions: true }
			],
			'check-file/folder-naming-convention': [
				'error',
				{
					'src/**/': 'KEBAB_CASE'
				}
			]
		}
	},
	{
		// SvelteKit's supported special modules are allowed only below src/routes.
		files: svelteKitSpecialFiles,
		rules: {
			'check-file/filename-naming-convention': [
				'error',
				{ 'src/routes/**/[+]*.{js,ts,svelte}': '[+]@(page|layout|error|server)' },
				{ ignoreMiddleExtensions: true }
			]
		}
	},
	{
		// This mirrors SvelteKit's component grammar: only +page/+layout Svelte components may
		// use @<segment>, including the empty target that resets to the root layout.
		files: svelteKitRouteResetComponents,
		rules: {
			'check-file/filename-naming-convention': [
				'error',
				{ 'src/routes/**/[+]@(page|layout)@*.svelte': '[+]@(page|layout)@*' },
				{ ignoreMiddleExtensions: true }
			]
		}
	},
	{
		// SvelteKit permits groups, params, optional/rest params and escaped segments below routes.
		// Elsewhere, and for ordinary route folders, the kebab-case policy remains in force.
		files: ['src/routes/**/*.{js,ts,svelte}'],
		plugins: { sveltekit: svelteKitRouteFolders },
		rules: {
			'check-file/folder-naming-convention': 'off',
			'sveltekit/folder-naming': 'error'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts'],

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
		// TypeScript's project service does not include compound .svelte.js extensions, but they
		// remain valid Svelte parser inputs and must receive the same filename policy above.
		files: ['**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		files: ['**/*.svelte'],
		rules: {
			// Dynamic Svelte class expressions produce an empty placeholder in the parser. Static
			// classes still require a matching scoped selector. `container` is consumed by the
			// intentional :global(.container) rule in src/routes/+layout.svelte.
			'svelte/no-unused-class-name': ['error', { allowedClassNames: ['/^$/', 'container'] }],
			'svelte/valid-compile': 'error'
		}
	},
	{
		files: demoPageComponents,
		rules: {
			'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }]
		}
	},
	{
		// The policy declaration and its adversarial verifier enumerate rules and fixtures rather than
		// application logic; retain a bounded allowance while keeping source modules at 100 lines.
		files: ['eslint.config.js', 'scripts/verify-lint-rules.mjs'],
		rules: { 'max-lines': ['error', { max: 220, skipBlankLines: true, skipComments: true }] }
	},
	{
		files: cssHeavyComponents,
		rules: {
			'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }]
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
