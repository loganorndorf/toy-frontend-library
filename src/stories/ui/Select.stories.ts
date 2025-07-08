import type { Meta, StoryObj } from '@storybook/svelte';
import Select from '../../lib/components/ui/Select.svelte';

const meta = {
	title: 'UI/Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
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
} satisfies Meta<Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'cherry', label: 'Cherry' },
	{ value: 'date', label: 'Date' },
];

export const Default: Story = {
	args: {
		options: defaultOptions,
		placeholder: 'Select a fruit...',
	},
};

export const WithLabel: Story = {
	args: {
		options: defaultOptions,
		label: 'Choose Fruit',
		placeholder: 'Select a fruit...',
	},
};

export const WithError: Story = {
	args: {
		options: defaultOptions,
		label: 'Required Field',
		placeholder: 'Select an option...',
		error: 'This field is required',
	},
};

export const Disabled: Story = {
	args: {
		options: defaultOptions,
		placeholder: 'Disabled select',
		disabled: true,
	},
};

export const WithDisabledOptions: Story = {
	args: {
		options: [
			{ value: 'option1', label: 'Available Option' },
			{ value: 'option2', label: 'Disabled Option', disabled: true },
			{ value: 'option3', label: 'Another Available Option' },
			{ value: 'option4', label: 'Another Disabled Option', disabled: true },
		],
		placeholder: 'Some options disabled...',
	},
};