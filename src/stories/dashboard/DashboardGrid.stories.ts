import type { Meta, StoryObj } from '@storybook/svelte';
import DashboardGridExample from '../ui/dashboard/DashboardGridExample.svelte';

const meta = {
  title: 'Dashboard/DashboardGrid',
  component: DashboardGridExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive dashboard grid system with drag/drop functionality, collision detection, and responsive layout management.'
      }
    }
  },
  argTypes: {
    editMode: {
      control: { type: 'boolean' },
      description: 'Whether the grid is in edit mode for drag/drop'
    },
    gridCols: {
      control: { type: 'number', min: 6, max: 24, step: 1 },
      description: 'Number of grid columns'
    },
    gridRows: {
      control: { type: 'number', min: 4, max: 12, step: 1 },
      description: 'Number of grid rows'
    }
  },
  args: {
    editMode: false,
    gridCols: 12,
    gridRows: 6
  }
} satisfies Meta<DashboardGridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    editMode: false,
    gridCols: 12,
    gridRows: 6
  }
};

export const EditMode: Story = {
  args: {
    editMode: true,
    gridCols: 12,
    gridRows: 6
  }
};

export const CompactGrid: Story = {
  args: {
    editMode: false,
    gridCols: 8,
    gridRows: 4
  }
};

export const LargeGrid: Story = {
  args: {
    editMode: false,
    gridCols: 16,
    gridRows: 8
  }
};

export const EditModeCompact: Story = {
  args: {
    editMode: true,
    gridCols: 8,
    gridRows: 4
  }
};

export const EditModeLarge: Story = {
  args: {
    editMode: true,
    gridCols: 16,
    gridRows: 8
  }
};