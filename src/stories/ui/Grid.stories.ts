import type { Meta, StoryObj } from '@storybook/svelte';
import GridExample from './grid/GridExample.svelte';

const meta = {
  title: 'Layout/Grid',
  component: GridExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A CSS Grid utility component for creating responsive grid layouts with controlled columns, rows, and spacing.'
      }
    }
  },
  argTypes: {
    cols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 12, 'none', 'subgrid'],
      description: 'Number of columns'
    },
    rows: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'none', 'subgrid'],
      description: 'Number of rows'
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Gap between grid items'
    },
    flow: {
      control: { type: 'select' },
      options: ['row', 'col', 'dense', 'col-dense'],
      description: 'Grid auto-flow direction'
    }
  },
  args: {
    cols: 3,
    gap: 'md',
    flow: 'row'
  }
} satisfies Meta<GridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: 'md'
  }
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: 'md'
  }
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: 'md'
  }
};

export const SmallGap: Story = {
  args: {
    cols: 3,
    gap: 'sm'
  }
};

export const LargeGap: Story = {
  args: {
    cols: 3,
    gap: 'xl'
  }
};

export const WithRows: Story = {
  args: {
    cols: 3,
    rows: 2,
    gap: 'md'
  }
};