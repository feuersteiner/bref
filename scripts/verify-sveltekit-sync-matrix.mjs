import { execFileSync } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';

const syncMatrixTokens = [
	'[slug]',
	'[id]',
	'[[optional]]',
	'[[other]]',
	'[...rest]',
	'[...path]',
	'[x+61]',
	'[x+62]',
	'[x+5b]',
	'[x+5d]',
	'[x+2d]',
	'[x+23]',
	'[u+0061]',
	'[u+0062]',
	'[u+61-62]',
	'[u+61-5d]',
	'[u+5d-61]',
	'[u+5b-61]',
	'[u+61-5b]',
	'[u+005b]',
	'[u+005d]',
	'[u+abcd]'
];

export const verifySvelteKitSyncMatrix = async ({
	fixtureName,
	lintRouteFixture,
	projectDirectory,
	matcherName
}) => {
	const syncMatrixDirectory = `route-sync-matrix-${fixtureName}`;
	const syncAccepts = () => {
		try {
			execFileSync('node_modules/.bin/svelte-kit', ['sync'], { stdio: 'pipe' });
			return true;
		} catch {
			return false;
		}
	};
	const verifyRoute = async (name, segments, expectedSync) => {
		const route = `${syncMatrixDirectory}/${name}/${segments.join('/')}/+page.svelte`;
		const messages = await lintRouteFixture(route, '<p>sync oracle</p>\n');
		const syncPassed = syncAccepts();
		if (expectedSync !== undefined && syncPassed !== expectedSync) {
			throw new Error(
				`${segments.join('/')} unexpectedly ${syncPassed ? 'passed' : 'failed'} svelte-kit sync`
			);
		}
		if ((messages.length === 0) !== syncPassed) {
			throw new Error(
				`${segments.join('/')} disagrees with svelte-kit sync: ${JSON.stringify(messages)}`
			);
		}
		await rm(join(projectDirectory, 'src', 'routes', fixtureName, syncMatrixDirectory, name), {
			recursive: true,
			force: true
		});
	};

	for (const [name, segment] of [
		['decoded-open-after-param', '[slug][x+5b]'],
		['decoded-open-alone', '[x+5b]'],
		['decoded-unicode-open', '[u+005b]'],
		['decoded-close-before-param', '[x+5d][slug]'],
		['manifest-whole-unicode-accepts', '[u+61-5d][slug]'],
		['manifest-whole-unicode-rejects', '[u+5d-61][slug]']
	]) {
		await verifyRoute(name, [segment], name === 'manifest-whole-unicode-accepts');
	}
	if (syncMatrixTokens.length !== 22) throw new Error('Expected a complete 22-token sync matrix');
	for (const [leftIndex, left] of syncMatrixTokens.entries()) {
		for (const [rightIndex, right] of syncMatrixTokens.entries()) {
			await verifyRoute(`${leftIndex}-${rightIndex}`, [`${left}${right}`]);
		}
	}
	for (const [name, segment, expectedSync] of [
		['group-valid', '(group)', true],
		['group-valid-escape', '([u+0061])', true],
		['group-raw-hash', '(foo#bar)', false],
		['group-uppercase-escape', '([X+61])', false],
		['group-invalid-unicode', '([u+zzzz])', false]
	]) {
		await verifyRoute(name, [segment], expectedSync);
	}
	for (const [name, segments, expectedSync] of [
		['rest-then-required', ['[...rest]', '[slug]'], true],
		['optional-then-rest', ['[[optional]]', '[...rest]'], true],
		['rest-then-optional', ['[...rest]', '[[optional]]'], false],
		['rest-then-matched-optional', ['[...rest]', `[[optional=${matcherName}]]`], false]
	]) {
		await verifyRoute(name, segments, expectedSync);
	}
	execFileSync('node_modules/.bin/svelte-kit', ['sync']);
};
