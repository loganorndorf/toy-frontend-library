import type { Meta, StoryObj } from '@storybook/svelte';
import TextArea from '../../lib/components/ui/TextArea.svelte';

const meta = {
	title: 'UI/TextArea',
	component: TextArea,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'error'],
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
		rows: {
			control: { type: 'number' },
		},
	},
} satisfies Meta<TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter your message...',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Message',
		placeholder: 'Enter your message...',
	},
};

export const WithError: Story = {
	args: {
		label: 'Description',
		placeholder: 'Describe your project...',
		error: 'Description is required',
	},
};

export const Disabled: Story = {
	args: {
		placeholder: 'Disabled textarea',
		disabled: true,
	},
};

export const CustomRows: Story = {
	args: {
		label: 'Long Description',
		placeholder: 'Enter a detailed description...',
		rows: 6,
	},
};