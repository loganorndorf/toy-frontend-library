import type { Meta, StoryObj } from '@storybook/svelte';
import Card from '../../../lib/components/ui/Card.svelte';
import CardDefault from './CardDefault.svelte';
import CardOutline from './CardOutline.svelte';
import CardElevated from './CardElevated.svelte';
import CardWithForm from './CardWithForm.svelte';

const meta = {
	title: 'UI/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'outline', 'elevated'],
		},
	},
} satisfies Meta<Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		Component: CardDefault,
	}),
};

export const Outline: Story = {
	render: () => ({
		Component: CardOutline,
	}),
};

export const Elevated: Story = {
	render: () => ({
		Component: CardElevated,
	}),
};

export const WithForm: Story = {
	render: () => ({
		Component: CardWithForm,
	}),
};