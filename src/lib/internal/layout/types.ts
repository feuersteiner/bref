import type { IconName } from '../../base/icon/types.ts';

export interface PageProps {
	title: string;
	description: string;
	href: string;
	icon: IconName;
	children?: PageProps[];
}

export const PAGES: PageProps[] = [
	{
		title: 'Getting Started',
		description: 'Installation and setup guide',
		href: '/',
		icon: 'rocket_launch'
	},
	{
		title: 'Theming',
		description: 'Customize colors and modes',
		href: '/theming',
		icon: 'palette',
		children: [
			{
				title: 'Theme Mode',
				description: 'Theme Mode',
				href: '/theming#theme-mode',
				icon: 'palette'
			},
			{ title: 'Colors', description: 'Colors', href: '/theming#colors', icon: 'palette' },
			{ title: 'Usage', description: 'Usage', href: '/theming#usage', icon: 'palette' }
		]
	},
	{
		title: 'Types',
		description: 'Shared types for components',
		href: '/types',
		icon: 'data_object',
		children: [
			{ title: 'Colors', description: 'Colors', href: '/types#colors', icon: 'data_object' },
			{ title: 'Variants', description: 'Variants', href: '/types#variants', icon: 'data_object' },
			{ title: 'Sizes', description: 'Sizes', href: '/types#sizes', icon: 'data_object' }
		]
	},
	{
		title: 'Icon',
		description: 'Material Symbols icons',
		href: '/icon',
		icon: 'emoji_symbols',
		children: [
			{ title: 'Sizes', description: 'Sizes', href: '/icon#sizes', icon: 'emoji_symbols' },
			{ title: 'Colors', description: 'Colors', href: '/icon#colors', icon: 'emoji_symbols' },
			{
				title: 'Filled vs Outlined',
				description: 'Filled vs Outlined',
				href: '/icon#fill',
				icon: 'emoji_symbols'
			},
			{ title: 'Usage', description: 'Usage', href: '/icon#usage', icon: 'emoji_symbols' }
		]
	},
	{
		title: 'Buttons',
		description: 'Button with label and optional icon',
		href: '/buttons',
		icon: 'left_click',
		children: [
			{
				title: 'Icon Button',
				description: 'Icon Button for buttons with only an icon',
				href: '/icon-button',
				icon: 'radio_button_checked'
			},
			{
				title: '(Normal) Button',
				description: 'A button with label and optional icon',
				href: '/button',
				icon: 'left_click'
			}
		]
	},
	{
		title: 'Loading',
		description: 'Loading indicators',
		href: '/loading',
		icon: 'progress_activity',
		children: [
			{
				title: 'Circular',
				description: 'Circular',
				href: '/loading#circular',
				icon: 'progress_activity'
			},
			{
				title: 'Pulsing Dots',
				description: 'Pulsing Dots',
				href: '/loading#pulsing-dots',
				icon: 'progress_activity'
			},
			{
				title: 'Morphing Shapes',
				description: 'Morphing Shapes',
				href: '/loading#morphing-shapes',
				icon: 'progress_activity'
			},
			{
				title: 'Textual',
				description: 'Textual',
				href: '/loading#textual',
				icon: 'progress_activity'
			}
		]
	},
	{
		title: 'TreeView',
		description: 'Hierarchical tree component',
		href: '/tree-view',
		icon: 'account_tree'
	}
];
