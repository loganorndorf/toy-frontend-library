import type { Meta, StoryObj } from '@storybook/svelte';
import GridOverlayExample from '../ui/dashboard/GridOverlayExample.svelte';

const meta = {
  title: 'Dashboard/GridOverlay',
  component: GridOverlayExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A visual grid overlay component for dashboard edit modes. Provides visual feedback for grid structure and widget positioning.'
      }
    }
  },
  argTypes: {
    gridCols: {
      control: { type: 'number', min: 6, max: 24, step: 1 },
      description: 'Number of grid columns'
    },
    gridRows: {
      control: { type: 'number', min: 4, max: 12, step: 1 },
      description: 'Number of grid rows'
    },
    showGrid: {
      control: { type: 'boolean' },
      description: 'Whether to show the grid overlay'
    },
    cellGap: {
      control: { type: 'number', min: 0, max: 20, step: 2 },
      description: 'Gap between grid cells in pixels'
    },
    opacity: {
      control: { type: 'number', min: 0.1, max: 1, step: 0.1 },
      description: 'Opacity of the grid overlay'
    }
  },
  args: {
    gridCols: 12,
    gridRows: 6,
    showGrid: true,
    cellGap: 8,
    opacity: 0.3
  }
} satisfies Meta<GridOverlayExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gridCols: 12,
    gridRows: 6,
    showGrid: true,
    cellGap: 8,
    opacity: 0.3
  }
};

export const HighOpacity: Story = {
  args: {
    gridCols: 12,
    gridRows: 6,
    showGrid: true,
    cellGap: 8,
    opacity: 0.8
  }
};

export const NoGap: Story = {
  args: {
    gridCols: 12,
    gridRows: 6,
    showGrid: true,
    cellGap: 0,
    opacity: 0.3
  }
};

export const LargeGap: Story = {
  args: {
    gridCols: 12,
    gridRows: 6,
    showGrid: true,
    cellGap: 16,
    opacity: 0.3
  }
};

export const CompactGrid: Story = {
  args: {
    gridCols: 8,
    gridRows: 4,
    showGrid: true,
    cellGap: 8,
    opacity: 0.4
  }
};

export const LargeGrid: Story = {
  args: {
    gridCols: 16,
    gridRows: 8,
    showGrid: true,
    cellGap: 8,
    opacity: 0.3
  }
};

export const Hidden: Story = {
  args: {
    gridCols: 12,
    gridRows: 6,
    showGrid: false,
    cellGap: 8,
    opacity: 0.3
  }
};