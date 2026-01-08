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
		description: "Bref's theming system uses CSS custom properties for complete flexibility",
		href: '/theming',
		icon: 'palette'
	},
	{
		title: 'Generic Types',
		description:
			'Shared TypeScript types used across components for consistent styling and behavior',
		href: '/types',
		icon: 'data_object'
	},
	{
		title: 'Icon',
		description: 'Icons with customizable size, color, and fill. Based on Google Material Symbols',
		href: '/icon',
		icon: 'emoji_symbols'
	},
	{
		title: 'Buttons',
		description: 'Full-featured buttons with labels and icons, or compact icon-only buttons',
		href: '/buttons',
		icon: 'touch_app',
		children: [
			{
				title: 'Button',
				description: 'Buttons with customizable size, color, variant, and optional icons',
				href: '/buttons/button',
				icon: 'buttons_alt'
			},
			{
				title: 'Icon Button',
				description: 'Icon buttons with customizable size, color, variant, and shape',
				href: '/buttons/icon-button',
				icon: 'adjust'
			}
		]
	},
	{
		title: 'Inputs',
		description: 'Input fields for text, numbers, and selections',
		href: '/inputs',
		icon: 'input',
		children: [
			{
				title: 'Text Input',
				description: 'Single-line text input fields with labels, placeholders, and icons',
				href: '/inputs/text-input',
				icon: 'short_text'
			},
			{
				title: 'Area Text Input',
				description: 'Multi-line text area input fields with labels and placeholders',
				href: '/inputs/area-text-input',
				icon: 'notes'
			},
			{
				title: 'Slider',
				description: 'Range slider for selecting numeric values within a range',
				href: '/inputs/slider',
				icon: 'tune'
			}
		]
	},
	{
		title: 'Progress / Loading',
		description: 'Progress indicators and loading animations',
		href: '/progress',
		icon: 'hourglass_empty',
		children: [
			{
				title: 'Progress Bar',
				description: 'A progress bar with determinate and indeterminate states',
				href: '/progress/progress-bar',
				icon: 'linear_scale'
			},
			{
				title: 'Circular',
				description: 'A classic spinning circle indicator for loading states',
				href: '/progress/circular',
				icon: 'autorenew'
			},
			{
				title: 'Pulsing Dots',
				description: 'Three dots that pulse in sequence to indicate loading',
				href: '/progress/pulsing-dots',
				icon: 'more_horiz'
			},
			{
				title: 'Morphing Shapes',
				description: 'A shape that transforms through organic forms while rotating',
				href: '/progress/morphing-shapes',
				icon: 'animation'
			},
			{
				title: 'Textual',
				description: 'Animated text with a typewriter effect that cycles through words',
				href: '/progress/textual',
				icon: 'text_fields'
			}
		]
	},
	{
		title: 'Tree View',
		description: 'A hierarchical tree component for displaying nested data structures',
		href: '/tree-view',
		icon: 'account_tree'
	}
];
