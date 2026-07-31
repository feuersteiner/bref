import { hasValidSvelteKitManifestSyntax } from './sveltekit-manifest-syntax.mjs';

// SvelteKit 2.49.2 parse_route_id splits `u+` payloads, unlike the earlier manifest stage.
// prettier-ignore
const routeEscape = String.raw`\[(?:x\+[0-9a-f]{2}|u\+(?=[0-9a-f-]{4,6}\])[0-9a-f-]*[0-9a-f][0-9a-f-]*)\]`;
const routeParameter = String.raw`\[(?:\w+(?:=\w+)?|\[\w+(?:=\w+)?\]|\.\.\.\w+(?:=\w+)?)\]`;
const routeToken = new RegExp(`${routeEscape}|${routeParameter}`, 'y');
const decodeRouteEscape = (value) =>
	String.fromCharCode(
		...(value.startsWith('[u+') ? value.slice(3, -1).split('-') : [value.slice(3, -1)]).map(
			(code) => parseInt(code, 16)
		)
	);
const escapeRoutePattern = (value) =>
	value
		.normalize()
		.replace(/[[\]]/g, '\\$&')
		.replace(
			/[%/?#]/g,
			(character) => ({ '%': '%25', '/': '%2[Ff]', '?': '%3[Ff]', '#': '%23' })[character]
		)
		.replace(/[.*+?^${}()|\\]/g, '\\$&');
const tokenize = (segment) => {
	const tokens = [];
	for (let index = 0; index < segment.length; ) {
		if (segment[index] !== '[') {
			const end = segment.indexOf('[', index);
			const value = segment.slice(index, end === -1 ? undefined : end);
			if (!/^[a-z0-9-]+$/.test(value)) return null;
			tokens.push({ type: 'static', value });
			index += value.length;
			continue;
		}
		routeToken.lastIndex = index;
		const match = routeToken.exec(segment);
		if (!match) return null;
		const value = match[0];
		const isEscape = value.startsWith('[x+') || value.startsWith('[u+');
		tokens.push({
			type: isEscape ? 'escape' : 'parameter',
			value: isEscape ? decodeRouteEscape(value) : value
		});
		index = routeToken.lastIndex;
	}
	return tokens;
};
const canParse = (tokens) => {
	const pattern = tokens
		.map((token) => {
			if (token.type !== 'parameter') return escapeRoutePattern(token.value);
			if (token.value.startsWith('[[')) return '([^/]*)?';
			return token.value.startsWith('[...') ? '([^]*?)' : '([^/]+?)';
		})
		.join('');
	try {
		new RegExp(`^/${pattern}/?$`);
		return true;
	} catch {
		return false;
	}
};
export const svelteKitRouteSegment = (segment, isRoot) => {
	if (isRoot && segment === 'llms.txt') return true;
	if (!hasValidSvelteKitManifestSyntax(segment)) return false;
	if (/^\([^)]+\)$/.test(segment)) return true;
	const tokens = tokenize(segment);
	if (!tokens || !canParse(tokens)) return false;
	return tokens.every((token, index) => {
		const previous = tokens[index - 1];
		const next = tokens[index + 1];
		if (token.type === 'parameter')
			return previous?.type !== 'parameter' && next?.type !== 'parameter';
		if (token.type === 'escape') return true;
		return (
			!token.value.includes('--') &&
			(!token.value.startsWith('-') || (previous !== undefined && previous.type !== 'static')) &&
			(!token.value.endsWith('-') || (next !== undefined && next.type !== 'static')) &&
			!(/[a-z0-9]$/.test(token.value) && next?.type === 'parameter') &&
			!(/^[a-z0-9]/.test(token.value) && previous?.type === 'parameter')
		);
	});
};
