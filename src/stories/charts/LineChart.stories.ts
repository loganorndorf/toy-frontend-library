import type { Meta, StoryObj } from '@storybook/svelte';
import LineChartExample from '../ui/charts/LineChartExample.svelte';

const meta = {
  title: 'Charts/Layer Cake/LineChart',
  component: LineChartExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A smooth line chart built with Layer Cake for tracking trends over time. Features animated line drawing, interactive data points, and curved paths.'
      }
    }
  },
  argTypes: {
    animated: {
      control: { type: 'boolean' },
      description: 'Whether to animate line drawing'
    },
    showGrid: {
      control: { type: 'boolean' },
      description: 'Whether to show grid lines'
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Whether to show interactive tooltips'
    },
    containerWidth: {
      control: { type: 'number' },
      description: 'Fixed width for the chart container'
    },
    containerHeight: {
      control: { type: 'number' },
      description: 'Height of the chart container'
    }
  },
  args: {
    animated: true,
    showGrid: true,
    showTooltip: true,
    containerWidth: undefined,
    containerHeight: 400
  }
} satisfies Meta<LineChartExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    animated: true,
    showGrid: true,
    showTooltip: true,
    containerHeight: 400
  }
};

export const NoAnimation: Story = {
  args: {
    animated: false,
    showGrid: true,
    showTooltip: true,
    containerHeight: 400
  }
};

export const CleanMinimal: Story = {
  args: {
    animated: false,
    showGrid: false,
    showTooltip: false,
    containerHeight: 300
  }
};

export const Large: Story = {
  args: {
    animated: true,
    showGrid: true,
    showTooltip: true,
    containerHeight: 600
  }
};

export const Compact: Story = {
  args: {
    animated: false,
    showGrid: false,
    showTooltip: true,
    containerHeight: 200
  }
};