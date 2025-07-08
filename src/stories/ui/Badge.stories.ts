import type { Meta, StoryObj } from '@storybook/svelte';
import Badge from '../../lib/components/ui/Badge.svelte';

const meta = {
	title: 'UI/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
		},
		children: {
			control: { type: 'text' },
			description: 'Badge text content',
		},
	},
} satisfies Meta<Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Badge',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Secondary',
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		children: 'Destructive',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		children: 'Outline',
	},
};

export const Success: Story = {
	args: {
		variant: 'success',
		children: 'Success',
	},
};

export const Warning: Story = {
	args: {
		variant: 'warning',
		children: 'Warning',
	},
};

export const WithCount: Story = {
	args: {
		variant: 'destructive',
		children: '99+',
	},
};

export const StatusActive: Story = {
	args: {
		variant: 'success',
		children: 'Active',
	},
};