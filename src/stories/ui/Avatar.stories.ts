import type { Meta, StoryObj } from '@storybook/svelte';
import Avatar from '../../lib/components/ui/Avatar.svelte';

const meta = {
	title: 'UI/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
		},
		src: {
			control: { type: 'text' },
		},
		alt: {
			control: { type: 'text' },
		},
		fallback: {
			control: { type: 'text' },
		},
	},
} satisfies Meta<Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
		alt: 'Profile picture',
		fallback: 'John Doe',
	},
};

export const WithInitials: Story = {
	args: {
		fallback: 'Jane Smith',
	},
};

export const SingleInitial: Story = {
	args: {
		fallback: 'A',
	},
};

export const NoFallback: Story = {
	args: {},
};

export const BrokenImage: Story = {
	args: {
		src: 'https://broken-url.com/image.jpg',
		fallback: 'Error Test',
	},
};

export const Small: Story = {
	args: {
		src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
		fallback: 'John Doe',
		size: 'sm',
	},
};

export const Large: Story = {
	args: {
		src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
		fallback: 'John Doe',
		size: 'lg',
	},
};

export const ExtraLarge: Story = {
	args: {
		src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
		fallback: 'John Doe',
		size: 'xl',
	},
};