// This is SvelteKit 2.49.2's manifest-walk validation before pathless groups are filtered.
// Source: core/sync/create_manifest_data/index.js in the pinned @sveltejs/kit package.
const decodeManifestEscapes = (segment) => {
	try {
		return segment.replace(/\[([ux])\+([^\]]+)\]/gi, (match, type, code) => {
			if (match !== match.toLowerCase() || !/[0-9a-f]+/.test(code)) throw new Error();
			if (
				(type === 'x' && code.length !== 2) ||
				(type === 'u' && (code.length < 4 || code.length > 6))
			)
				throw new Error();
			return String.fromCharCode(parseInt(code, 16));
		});
	} catch {
		return null;
	}
};

export const hasValidSvelteKitManifestSyntax = (segment) => {
	const unescaped = decodeManifestEscapes(segment);
	return (
		unescaped !== null &&
		!/\]\[/.test(unescaped) &&
		(segment.match(/\[/g)?.length ?? 0) === (segment.match(/\]/g)?.length ?? 0) &&
		!segment.includes('#') &&
		!segment.includes('[[...')
	);
};
