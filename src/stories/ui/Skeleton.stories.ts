import type { Meta, StoryObj } from '@storybook/svelte';
import Skeleton from '../../lib/components/ui/Skeleton.svelte';
import SkeletonCard from './skeleton/SkeletonCard.svelte';
import SkeletonProfile from './skeleton/SkeletonProfile.svelte';
import SkeletonArticle from './skeleton/SkeletonArticle.svelte';
import SkeletonDefault from './skeleton/SkeletonDefault.svelte';
import SkeletonTextLine from './skeleton/SkeletonTextLine.svelte';
import SkeletonRectangle from './skeleton/SkeletonRectangle.svelte';

const meta = {
	title: 'UI/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'circle', 'text'],
		},
	},
} satisfies Meta<Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		Component: SkeletonDefault,
	}),
};

export const Circle: Story = {
	args: {
		variant: 'circle',
		class: 'h-12 w-12',
	},
};

export const TextLine: Story = {
	render: () => ({
		Component: SkeletonTextLine,
	}),
};

export const Rectangle: Story = {
	render: () => ({
		Component: SkeletonRectangle,
	}),
};

export const ProfileCard: Story = {
	render: () => ({
		Component: SkeletonProfile,
	}),
};

export const ContentCard: Story = {
	render: () => ({
		Component: SkeletonCard,
	}),
};

export const ArticlePreview: Story = {
	render: () => ({
		Component: SkeletonArticle,
	}),
};