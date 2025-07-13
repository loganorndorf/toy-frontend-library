import type { Meta, StoryObj } from '@storybook/svelte';
import { BarChartLayerCake } from '$lib/components/charts';

const meta = {
  title: 'Charts/Layer Cake/BarChart',
  component: BarChartLayerCake,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modern bar chart built with Layer Cake and D3 utilities. Features smooth animations, responsive scaling, and clinician-focused data visualization patterns.'
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
    containerWidth: {
      control: { type: 'number' },
      description: 'Chart container width'
    },
    containerHeight: {
      control: { type: 'number' },
      description: 'Chart container height'
    }
  },
  args: {
    data: [
      { label: 'Emergency Medicine', value: 395000 },
      { label: 'Cardiology', value: 485000 },
      { label: 'Orthopedics', value: 520000 },
      { label: 'Family Medicine', value: 285000 },
      { label: 'Radiology', value: 445000 }
    ],
    title: 'Compensation by Specialty',
    containerWidth: 600,
    containerHeight: 400
  }
} satisfies Meta<typeof BarChartLayerCake>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { label: 'Emergency Medicine', value: 395000 },
      { label: 'Cardiology', value: 485000 },
      { label: 'Orthopedics', value: 520000 },
      { label: 'Family Medicine', value: 285000 },
      { label: 'Radiology', value: 445000 }
    ],
    title: 'Compensation by Specialty',
    containerWidth: 600,
    containerHeight: 400
  }
};

export const Small: Story = {
  args: {
    ...Default.args,
    containerWidth: 400,
    containerHeight: 300
  }
};

export const Large: Story = {
  args: {
    ...Default.args,
    containerWidth: 800,
    containerHeight: 500
  }
};