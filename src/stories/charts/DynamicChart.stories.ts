import type { Meta, StoryObj } from '@storybook/svelte';
import DynamicChartExample from '../ui/charts/DynamicChartExample.svelte';

const meta = {
  title: 'Charts/Layer Cake/DynamicChart',
  component: DynamicChartExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A powerful configuration-driven chart component that can render any supported chart type based on a config object. Perfect for backend-driven dashboards.'
      }
    }
  },
  argTypes: {
    chartType: {
      control: { type: 'select' },
      options: ['bar', 'line', 'scatter', 'combo'],
      description: 'Type of chart to render'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size preset for the chart'
    },
    containerHeight: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: 'Height of the chart container'
    }
  },
  args: {
    chartType: 'bar',
    size: 'medium',
    containerHeight: 400
  }
} satisfies Meta<DynamicChartExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BarChart: Story = {
  args: {
    chartType: 'bar',
    size: 'medium',
    containerHeight: 400
  }
};

export const LineChart: Story = {
  args: {
    chartType: 'line',
    size: 'medium',
    containerHeight: 400
  }
};

export const ScatterPlot: Story = {
  args: {
    chartType: 'scatter',
    size: 'medium',
    containerHeight: 400
  }
};

export const ComboChart: Story = {
  args: {
    chartType: 'combo',
    size: 'medium',
    containerHeight: 400
  }
};

export const SmallSize: Story = {
  args: {
    chartType: 'bar',
    size: 'small',
    containerHeight: 300
  }
};

export const LargeSize: Story = {
  args: {
    chartType: 'combo',
    size: 'large',
    containerHeight: 500
  }
};

export const CompactView: Story = {
  args: {
    chartType: 'line',
    size: 'small',
    containerHeight: 250
  }
};

export const BarChartLarge: Story = {
  args: {
    chartType: 'bar',
    size: 'large',
    containerHeight: 600
  }
};

export const LineChartMedium: Story = {
  args: {
    chartType: 'line',
    size: 'medium',
    containerHeight: 450
  }
};

export const ComboChartWide: Story = {
  args: {
    chartType: 'combo',
    size: 'large',
    containerHeight: 600
  }
};