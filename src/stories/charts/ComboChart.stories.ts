import type { Meta, StoryObj } from '@storybook/svelte';
import ComboChartExample from '../ui/charts/ComboChartExample.svelte';

const meta = {
  title: 'Charts/Layer Cake/ComboChart',
  component: ComboChartExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A powerful combination chart with dual y-axes supporting both bar and line series. Perfect for comparing related metrics like compensation and productivity.'
      }
    }
  },
  argTypes: {
    animated: {
      control: { type: 'boolean' },
      description: 'Whether to animate chart elements'
    },
    showGrid: {
      control: { type: 'boolean' },
      description: 'Whether to show grid lines'
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Whether to show interactive tooltips'
    },
    showLegend: {
      control: { type: 'boolean' },
      description: 'Whether to show the chart legend'
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
    showLegend: true,
    containerWidth: undefined,
    containerHeight: 400
  }
} satisfies Meta<ComboChartExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    animated: true,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    containerHeight: 400
  }
};

export const NoLegend: Story = {
  args: {
    animated: true,
    showGrid: true,
    showTooltip: true,
    showLegend: false,
    containerHeight: 400
  }
};

export const CleanView: Story = {
  args: {
    animated: true,
    showGrid: false,
    showTooltip: true,
    showLegend: false,
    containerHeight: 350
  }
};

export const NoAnimation: Story = {
  args: {
    animated: false,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    containerHeight: 400
  }
};

export const Large: Story = {
  args: {
    animated: true,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    containerHeight: 500
  }
};

export const Compact: Story = {
  args: {
    animated: true,
    showGrid: false,
    showTooltip: true,
    showLegend: false,
    containerHeight: 250
  }
};