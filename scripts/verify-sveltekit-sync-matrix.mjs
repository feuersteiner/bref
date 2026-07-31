import { execFileSync } from 'node:child_process';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';

const syncMatrixTokens = [
	'[slug]',
	'[[optional]]',
	'[...rest]',
	'[x+61]',
	'[x+5b]',
	'[x+5d]',
	'[u+0061]',
	'[u+61-62]',
	'[u+005b]',
	'[u+005d]'
];

export const verifySvelteKitSyncMatrix = async ({
	fixtureName,
	lintRouteFixture,
	projectDirectory
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
	const verifyRoute = async (name, segment, expectedSync) => {
		const route = `${syncMatrixDirectory}/${name}/${segment}/+page.svelte`;
		const messages = await lintRouteFixture(route, '<p>sync oracle</p>\n');
		const syncPassed = syncAccepts();
		if (expectedSync !== undefined && syncPassed !== expectedSync) {
			throw new Error(
				`${segment} unexpectedly ${syncPassed ? 'passed' : 'failed'} svelte-kit sync`
			);
		}
		if ((messages.length === 0) !== syncPassed) {
			throw new Error(`${segment} disagrees with svelte-kit sync: ${JSON.stringify(messages)}`);
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
		['decoded-close-before-param', '[x+5d][slug]']
	]) {
		await verifyRoute(name, segment, false);
	}
	for (const [leftIndex, left] of syncMatrixTokens.entries()) {
		for (const [rightIndex, right] of syncMatrixTokens.entries()) {
			await verifyRoute(`${leftIndex}-${rightIndex}`, `${left}${right}`);
		}
	}
	execFileSync('node_modules/.bin/svelte-kit', ['sync']);
};
