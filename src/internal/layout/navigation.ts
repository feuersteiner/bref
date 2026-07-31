import { PAGES, type PageProps } from './types.ts';

export const allPages = PAGES.flatMap((page) => [page, ...(page.children || [])]);

export const pageForPath = (pathname: string): PageProps =>
	allPages.find((entry) => entry.href === pathname) ?? PAGES[0];
