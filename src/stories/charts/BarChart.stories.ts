import type { Meta, StoryObj } from '@storybook/svelte';
import BarChartExample from '../ui/charts/BarChartExample.svelte';

const meta = {
  title: 'Charts/BarChart',
  component: BarChartExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A configurable bar chart component perfect for comparing clinician compensation, department metrics, and performance data. Features responsive design, interactive tooltips, and multiple visual variants.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'gradient'],
      description: 'Visual style variant of the bars'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the chart container'
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Orientation of the bars'
    },
    showGrid: {
      control: { type: 'boolean' },
      description: 'Whether to show grid lines'
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Whether to show interactive tooltips'
    },
    showValues: {
      control: { type: 'boolean' },
      description: 'Whether to show values on bars'
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Whether to animate bar entrance'
    }
  },
  args: {
    variant: 'default',
    size: 'lg',
    orientation: 'vertical',
    showGrid: true,
    showTooltip: true,
    showValues: false,
    animated: true
  }
} satisfies Meta<BarChartExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    orientation: 'vertical',
    showGrid: true,
    showTooltip: true,
    showValues: false,
    animated: true
  }
};

export const Horizontal: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    orientation: 'horizontal',
    showGrid: true,
    showTooltip: true,
    showValues: false,
    animated: true
  }
};

export const WithValues: Story = {
  args: {
    variant: 'success',
    size: 'lg',
    orientation: 'vertical',
    showGrid: true,
    showTooltip: true,
    showValues: true,
    animated: true
  }
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    size: 'xl',
    orientation: 'vertical',
    showGrid: true,
    showTooltip: true,
    showValues: false,
    animated: true
  }
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    orientation: 'vertical',
    showGrid: false,
    showTooltip: true,
    showValues: false,
    animated: true
  }
};

export const NoAnimation: Story = {
  args: {
    variant: 'warning',
    size: 'md',
    orientation: 'vertical',
    showGrid: true,
    showTooltip: true,
    showValues: true,
    animated: false
  }
};

export const Minimal: Story = {
  args: {
    variant: 'default',
    size: 'md',
    orientation: 'vertical',
    showGrid: false,
    showTooltip: false,
    showValues: false,
    animated: true
  }
};