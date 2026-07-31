/* eslint-disable @typescript-eslint/ban-ts-comment -- this script bridges TypeScript and Svelte compiler ASTs without a shared AST type. */
// @ts-nocheck
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { parse as parseSvelte } from 'svelte/compiler';
import ts from 'typescript';

const unwrap = (expression) => {
	while (
		ts.isAsExpression(expression) ||
		ts.isSatisfiesExpression(expression) ||
		ts.isParenthesizedExpression(expression)
	) {
		expression = expression.expression;
	}
	return expression;
};

const property = (object, name) =>
	object.properties.find(
		(entry) =>
			ts.isPropertyAssignment(entry) &&
			((ts.isIdentifier(entry.name) && entry.name.text === name) ||
				(ts.isStringLiteral(entry.name) && entry.name.text === name))
	);

const stringProperty = (object, name) => {
	const entry = property(object, name);
	return entry && ts.isStringLiteral(entry.initializer) ? entry.initializer.text : undefined;
};

const identifierProperty = (object, name) => {
	const entry = property(object, name);
	if (entry && ts.isIdentifier(entry.initializer)) return entry.initializer.text;
	const shorthand = object.properties.find(
		(entry) => ts.isShorthandPropertyAssignment(entry) && entry.name.text === name
	);
	return shorthand?.name.text;
};

const parseTypescript = (filename) =>
	ts.createSourceFile(filename, readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);

const exportedWorkbench = (filename) => {
	const source = parseTypescript(filename);
	return source.statements.some(
		(statement) =>
			ts.isVariableStatement(statement) &&
			statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) &&
			statement.declarationList.declarations.some(
				(declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === 'workbench'
			)
	);
};

const pageRendersLocalWorkbench = (filename) => {
	let ast;
	try {
		ast = parseSvelte(readFileSync(filename, 'utf8'), { filename });
	} catch (error) {
		return { valid: false, reason: error.message };
	}
	const imports =
		ast.instance?.content.body.filter((entry) => entry.type === 'ImportDeclaration') ?? [];
	const componentImport = imports.find(
		(entry) =>
			entry.source.value === '#lib/docs/component-page.svelte' &&
			entry.specifiers.some(
				(specifier) =>
					specifier.type === 'ImportDefaultSpecifier' && specifier.local.name === 'ComponentPage'
			)
	);
	const workbenchImport = imports.find(
		(entry) =>
			entry.source.value === './snippets.ts' &&
			entry.specifiers.some(
				(specifier) =>
					specifier.type === 'ImportSpecifier' &&
					specifier.local.name === 'workbench' &&
					specifier.imported.name === 'workbench'
			)
	);
	const component = ast.html.children.find(
		(entry) => entry.type === 'InlineComponent' && entry.name === 'ComponentPage'
	);
	const passesWorkbench = component?.attributes.some(
		(attribute) =>
			attribute.type === 'Attribute' &&
			attribute.name === 'workbench' &&
			attribute.value.some(
				(value) =>
					value.type === 'AttributeShorthand' &&
					value.expression.type === 'Identifier' &&
					value.expression.name === 'workbench'
			)
	);

	return { valid: Boolean(componentImport && workbenchImport && component && passesWorkbench) };
};

const registryEntries = (registryFile) => {
	const source = parseTypescript(registryFile);
	const imports = new Map();
	for (const statement of source.statements) {
		if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier))
			continue;
		const workbenchSpecifier = statement.importClause?.namedBindings;
		if (!workbenchSpecifier || !ts.isNamedImports(workbenchSpecifier)) continue;
		for (const specifier of workbenchSpecifier.elements) {
			if ((specifier.propertyName?.text ?? specifier.name.text) === 'workbench') {
				imports.set(specifier.name.text, statement.moduleSpecifier.text);
			}
		}
	}

	const declaration = source.statements
		.filter(ts.isVariableStatement)
		.flatMap((statement) => statement.declarationList.declarations)
		.find((entry) => ts.isIdentifier(entry.name) && entry.name.text === 'componentWorkbenches');
	const initializer = declaration?.initializer && unwrap(declaration.initializer);
	if (!initializer || !ts.isArrayLiteralExpression(initializer)) {
		return { imports, entries: [], error: 'registry must export a componentWorkbenches array.' };
	}
	const entries = initializer.elements.flatMap((entry) => {
		if (!ts.isObjectLiteralExpression(entry)) return [];
		const slug = stringProperty(entry, 'slug');
		const title = stringProperty(entry, 'title');
		const description = stringProperty(entry, 'description');
		const icon = stringProperty(entry, 'icon');
		const workbench = identifierProperty(entry, 'workbench');
		return slug && title && description && icon && workbench ? [{ slug, workbench }] : [];
	});
	return { imports, entries };
};

export const verifyComponentWorkbenches = (root = resolve('src/routes/components')) => {
	const errors = [];
	const registryFile = join(root, 'registry.ts');
	if (!existsSync(registryFile)) return [`Missing registry: ${registryFile}`];

	const workbenches = readdirSync(root, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
	const { imports, entries, error } = registryEntries(registryFile);
	if (error) errors.push(error);
	const entryBySlug = new Map(entries.map((entry) => [entry.slug, entry]));

	for (const slug of workbenches) {
		const directory = join(root, slug);
		const page = join(directory, '+page.svelte');
		const snippets = join(directory, 'snippets.ts');
		if (!existsSync(page) || !existsSync(snippets)) {
			errors.push(`${slug} must contain +page.svelte and snippets.ts.`);
			continue;
		}
		if (!exportedWorkbench(snippets)) errors.push(`${slug}/snippets.ts must export workbench.`);
		const route = pageRendersLocalWorkbench(page);
		if (!route.valid) {
			errors.push(
				`${slug}/+page.svelte must import and render ComponentPage with local workbench.`
			);
		}
		const entry = entryBySlug.get(slug);
		if (!entry) {
			errors.push(`${slug} must be registered in registry.ts.`);
			continue;
		}
		if (imports.get(entry.workbench) !== `./${slug}/snippets.ts`) {
			errors.push(`${slug} registry entry must use its direct workbench import.`);
		}
	}

	for (const entry of entries) {
		if (!workbenches.includes(entry.slug)) {
			errors.push(`${entry.slug} is registered but has no workbench directory.`);
		}
	}
	return errors;
};

const rootArgument = process.argv.indexOf('--root');
const root = rootArgument === -1 ? undefined : resolve(process.argv[rootArgument + 1]);
const errors = verifyComponentWorkbenches(root);
if (errors.length)
	throw new Error(`Component workbench verification failed:\n${errors.join('\n')}`);
