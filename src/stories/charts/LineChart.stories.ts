import type { Meta, StoryObj } from '@storybook/svelte';
import { LineChartLayerCake } from '$lib/components/charts';

const meta = {
  title: 'Charts/Layer Cake/LineChart',
  component: LineChartLayerCake,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'subtle',
      values: [
        { name: 'subtle', value: '#f8fafc' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    docs: {
      description: {
        component: 'A modern line chart built with Layer Cake and D3 utilities. Features smooth animations, gradient fills, interactive data points, and trend analysis. Perfect for visualizing time series data and trends.'
      }
    }
  },
  argTypes: {
    data: {
      control: false,
      description: 'Chart data array with x and y values'
    },
    title: {
      control: { type: 'text' },
      description: 'Main chart title'
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Optional subtitle for additional context'
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['gradient', 'blue', 'purple', 'vibrant'],
      description: 'Color scheme for the line'
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Chart theme'
    },
    curveType: {
      control: { type: 'select' },
      options: ['linear', 'monotone', 'natural'],
      description: 'Line curve interpolation type'
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Enable entrance animations'
    },
    showGrid: {
      control: { type: 'boolean' },
      description: 'Show grid lines'
    },
    showDots: {
      control: { type: 'boolean' },
      description: 'Show data point dots'
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Enable interactive tooltips'
    },
    containerWidth: {
      control: { type: 'range', min: 300, max: 1200, step: 50 },
      description: 'Chart container width'
    },
    containerHeight: {
      control: { type: 'range', min: 200, max: 800, step: 50 },
      description: 'Chart container height'
    }
  },
  args: {
    data: [
      { x: new Date('2024-01-01'), y: 45000 },
      { x: new Date('2024-02-01'), y: 52000 },
      { x: new Date('2024-03-01'), y: 48000 },
      { x: new Date('2024-04-01'), y: 61000 },
      { x: new Date('2024-05-01'), y: 58000 },
      { x: new Date('2024-06-01'), y: 65000 },
      { x: new Date('2024-07-01'), y: 72000 }
    ],
    title: 'Monthly Revenue Trend',
    subtitle: '2024 Financial Performance',
    colorScheme: 'gradient',
    theme: 'light',
    curveType: 'monotone',
    animated: true,
    showGrid: true,
    showDots: true,
    showTooltip: true,
    containerWidth: 700,
    containerHeight: 450
  }
} satisfies Meta<typeof LineChartLayerCake>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...meta.args
  }
};

export const DarkTheme: Story = {
  args: {
    ...meta.args,
    theme: 'dark'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

export const NumericXAxis: Story = {
  args: {
    data: [
      { x: 0, y: 10 },
      { x: 1, y: 25 },
      { x: 2, y: 20 },
      { x: 3, y: 35 },
      { x: 4, y: 30 },
      { x: 5, y: 45 },
      { x: 6, y: 42 },
      { x: 7, y: 55 },
      { x: 8, y: 48 },
      { x: 9, y: 60 }
    ],
    title: 'Performance Metrics',
    subtitle: 'Score over iterations',
    xAxisLabel: 'Iteration',
    yAxisLabel: 'Score',
    colorScheme: 'blue'
  }
};

export const PurpleVibrant: Story = {
  args: {
    ...meta.args,
    colorScheme: 'purple',
    title: 'Patient Recovery Rate',
    subtitle: 'Post-treatment progress tracking',
    data: [
      { x: new Date('2024-01-01'), y: 65 },
      { x: new Date('2024-01-15'), y: 72 },
      { x: new Date('2024-02-01'), y: 78 },
      { x: new Date('2024-02-15'), y: 82 },
      { x: new Date('2024-03-01'), y: 85 },
      { x: new Date('2024-03-15'), y: 88 },
      { x: new Date('2024-04-01'), y: 91 }
    ],
    formatValue: (value: number) => `${value}%`,
    yAxisLabel: 'Recovery Rate (%)'
  }
};

export const LinearInterpolation: Story = {
  args: {
    ...meta.args,
    curveType: 'linear',
    colorScheme: 'vibrant',
    title: 'Stock Price Movement',
    subtitle: 'Daily closing prices',
    data: [
      { x: new Date('2024-06-01'), y: 152.35 },
      { x: new Date('2024-06-02'), y: 154.20 },
      { x: new Date('2024-06-03'), y: 151.80 },
      { x: new Date('2024-06-04'), y: 155.45 },
      { x: new Date('2024-06-05'), y: 157.90 },
      { x: new Date('2024-06-06'), y: 156.25 },
      { x: new Date('2024-06-07'), y: 159.10 }
    ],
    formatValue: (value: number) => `$${value.toFixed(2)}`
  }
};

export const NaturalCurve: Story = {
  args: {
    ...meta.args,
    curveType: 'natural',
    title: 'Temperature Variation',
    subtitle: 'Daily average temperature',
    data: [
      { x: new Date('2024-07-01'), y: 22 },
      { x: new Date('2024-07-02'), y: 24 },
      { x: new Date('2024-07-03'), y: 26 },
      { x: new Date('2024-07-04'), y: 28 },
      { x: new Date('2024-07-05'), y: 27 },
      { x: new Date('2024-07-06'), y: 25 },
      { x: new Date('2024-07-07'), y: 23 }
    ],
    formatValue: (value: number) => `${value}°C`,
    yAxisLabel: 'Temperature (°C)'
  }
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 30 }, (_, i) => ({
      x: new Date(2024, 0, i + 1),
      y: Math.sin(i / 5) * 50 + 100 + Math.random() * 20
    })),
    title: 'Monthly Activity Levels',
    subtitle: 'Daily measurements over 30 days',
    showDots: false, // Too many dots would be cluttered
    containerWidth: 1000,
    containerHeight: 500
  }
};

export const Small: Story = {
  args: {
    data: [
      { x: 1, y: 20 },
      { x: 2, y: 35 },
      { x: 3, y: 30 },
      { x: 4, y: 45 }
    ],
    title: 'Quarterly Growth',
    subtitle: undefined,
    containerWidth: 400,
    containerHeight: 300,
    xAxisLabel: 'Quarter',
    yAxisLabel: 'Growth %',
    formatValue: (value: number) => `${value}%`
  }
};

export const NoAnimation: Story = {
  args: {
    ...meta.args,
    animated: false,
    title: 'Static Chart Example'
  }
};

export const NoGrid: Story = {
  args: {
    ...meta.args,
    showGrid: false,
    title: 'Clean Chart Design'
  }
};

export const NoDots: Story = {
  args: {
    ...meta.args,
    showDots: false,
    title: 'Continuous Line View'
  }
};

export const Interactive: Story = {
  args: {
    ...meta.args,
    title: 'Click points for details',
    onPointClick: (dataPoint) => {
      alert(`You clicked on: ${dataPoint.x.toLocaleDateString()} - Value: ${dataPoint.y}`);
    }
  }
};

export const CustomLabels: Story = {
  args: {
    data: [
      { x: new Date('2024-01-01'), y: 120, label: 'Q1 Start' },
      { x: new Date('2024-02-01'), y: 145, label: 'February Peak' },
      { x: new Date('2024-03-01'), y: 130, label: 'March Adjustment' },
      { x: new Date('2024-04-01'), y: 165, label: 'Q2 Start' },
      { x: new Date('2024-05-01'), y: 158, label: 'May Performance' },
      { x: new Date('2024-06-01'), y: 180, label: 'June Record' }
    ],
    title: 'Labeled Data Points',
    subtitle: 'Hover over points to see custom labels',
    formatTooltip: (dataPoint) => dataPoint.label || 'No label'
  }
};