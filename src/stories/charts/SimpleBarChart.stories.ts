import type { Meta, StoryObj } from '@storybook/svelte';
import { SimpleBarChart } from '$lib/components/charts';

const meta = {
  title: 'Charts/Layer Cake/SimpleBarChart',
  component: SimpleBarChart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A minimal bar chart built with Layer Cake to test basic functionality.'
      }
    }
  },
  argTypes: {
    data: {
      control: false,
      description: 'Chart data array'
    },
    title: {
      control: { type: 'text' },
      description: 'Chart title'
    },
    width: {
      control: { type: 'number' },
      description: 'Chart width'
    },
    height: {
      control: { type: 'number' },
      description: 'Chart height'
    }
  },
  args: {
    data: [
      { label: 'A', value: 100 },
      { label: 'B', value: 200 },
      { label: 'C', value: 150 },
      { label: 'D', value: 300 }
    ],
    title: 'Simple Test Chart',
    width: 600,
    height: 400
  }
} satisfies Meta<typeof SimpleBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { label: 'A', value: 100 },
      { label: 'B', value: 200 },
      { label: 'C', value: 150 },
      { label: 'D', value: 300 }
    ],
    title: 'Simple Test Chart',
    width: 600,
    height: 400
  }
};