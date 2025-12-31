import type { ThemeMode } from './types.ts';

export const toggleThemeMode = (mode: ThemeMode) => {
	if (typeof window === 'undefined') return console.warn('toggleThemeMode called on server side');
	document.documentElement.setAttribute('data-theme', mode);
	localStorage.setItem('theme-mode', mode);
};

export const initializeThemeMode = (): ThemeMode => {
	if (typeof window === 'undefined') return 'light';

	const stored = localStorage.getItem('theme-mode') as ThemeMode | null;
	const resolved: ThemeMode =
		stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

	toggleThemeMode(resolved);

	return resolved;
};
