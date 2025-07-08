import type { Meta, StoryObj } from '@storybook/svelte';
import Spinner from '../../lib/components/ui/Spinner.svelte';

const meta = {
	title: 'UI/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'light', 'muted'],
		},
	},
} satisfies Meta<Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Small: Story = {
	args: {
		size: 'sm',
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
	},
};

export const ExtraLarge: Story = {
	args: {
		size: 'xl',
	},
};

export const Light: Story = {
	args: {
		variant: 'light',
	},
	parameters: {
		backgrounds: { default: 'dark' },
	},
};

export const Muted: Story = {
	args: {
		variant: 'muted',
	},
};