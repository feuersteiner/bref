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
		icon: 'palette'
	},
	{
		title: 'Generic Types',
		description: 'Shared types for components',
		href: '/types',
		icon: 'data_object'
	},
	{
		title: 'Icon',
		description: 'Material Symbols icons with various sizes, colors, and fill options',
		href: '/icon',
		icon: 'emoji_symbols'
	},
	{
		title: 'Buttons',
		description: '2 types of buttons: Icon Button and a `Normal` Button',
		href: '/buttons',
		icon: 'touch_app',
		children: [
			{
				title: 'Icon Button',
				description: 'Icon Button for buttons with only an icon',
				href: '/icon-button',
				icon: 'adjust'
			},
			{
				title: '(Normal) Button',
				description: 'A button with label and optional icon',
				href: '/button',
				icon: 'buttons_alt'
			}
		]
	},
	{
		title: 'Loading',
		description: 'Loading indicators to a state that content is being loaded',
		href: '/loadings',
		icon: 'hourglass_empty',
		children: [
			{
				title: 'Circular',
				description:
					'A spinning circular indicator for general loading states with customizable size and color',
				href: '/circular-loading',
				icon: 'autorenew'
			},
			{
				title: 'Pulsing Dots',
				description: 'Animated dots that pulse in sequence, ideal for chat or messaging interfaces',
				href: '/pulsing-dots-loading',
				icon: 'more_horiz'
			},
			{
				title: 'Morphing Shapes',
				description:
					'Smooth shape transitions creating a fluid animation effect for creative loading states',
				href: '/morphing-shapes-loading',
				icon: 'animation'
			},
			{
				title: 'Textual',
				description:
					'Text-based loading indicator with customizable messages and animated ellipsis',
				href: '/textual-loading',
				icon: 'text_fields'
			}
		]
	},
	{
		title: 'TreeView',
		description:
			'Hierarchical tree component for displaying nested data structures with expandable nodes',
		href: '/tree-view',
		icon: 'account_tree'
	}
];
