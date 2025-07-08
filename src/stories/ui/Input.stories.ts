import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '../../lib/components/ui/Input.svelte';

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'error'],
		},
		type: {
			control: { type: 'select' },
			options: ['text', 'email', 'password', 'number', 'tel', 'url'],
		},
		disabled: {
			control: { type: 'boolean' },
		},
		placeholder: {
			control: { type: 'text' },
		},
		label: {
			control: { type: 'text' },
		},
		error: {
			control: { type: 'text' },
		},
	},
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter text...',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Username',
		placeholder: 'Enter your username',
	},
};

export const WithError: Story = {
	args: {
		label: 'Email',
		placeholder: 'your@email.com',
		error: 'Please enter a valid email address',
	},
};

export const Disabled: Story = {
	args: {
		placeholder: 'Disabled input',
		disabled: true,
	},
};

export const Email: Story = {
	args: {
		type: 'email',
		label: 'Email Address',
		placeholder: 'your@email.com',
	},
};

export const Password: Story = {
	args: {
		type: 'password',
		label: 'Password',
		placeholder: 'Enter password',
	},
};