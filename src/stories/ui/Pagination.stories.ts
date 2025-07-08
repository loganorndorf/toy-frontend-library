import type { Meta, StoryObj } from '@storybook/svelte';
import PaginationExample from './pagination/PaginationExample.svelte';

const meta = {
  title: 'Interactive/Pagination',
  component: PaginationExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A pagination component for navigating through large datasets with page numbers, navigation controls, and optional information display.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
      description: 'Visual style variant of the pagination'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the pagination controls'
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages'
    },
    totalItems: {
      control: { type: 'number', min: 1, max: 1000 },
      description: 'Total number of items (used to calculate pages)'
    },
    itemsPerPage: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Number of items per page'
    },
    showInfo: {
      control: { type: 'boolean' },
      description: 'Whether to show items count information'
    },
    showFirstLast: {
      control: { type: 'boolean' },
      description: 'Whether to show first/last page buttons'
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Number of page siblings to show around current page'
    }
  },
  args: {
    variant: 'default',
    size: 'md',
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    showInfo: true,
    showFirstLast: true,
    siblingCount: 1
  }
} satisfies Meta<PaginationExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    showInfo: true,
    showFirstLast: true,
    siblingCount: 1
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    totalPages: 15,
    totalItems: 150,
    itemsPerPage: 10,
    showInfo: true,
    showFirstLast: true,
    siblingCount: 1
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    totalPages: 8,
    totalItems: 80,
    itemsPerPage: 10,
    showInfo: false,
    showFirstLast: false,
    siblingCount: 2
  }
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    showInfo: true,
    showFirstLast: true,
    siblingCount: 1
  }
};

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    totalPages: 12,
    totalItems: 120,
    itemsPerPage: 10,
    showInfo: true,
    showFirstLast: true,
    siblingCount: 2
  }
};

export const ManyPages: Story = {
  args: {
    variant: 'default',
    size: 'md',
    totalPages: 50,
    totalItems: 500,
    itemsPerPage: 10,
    showInfo: true,
    showFirstLast: true,
    siblingCount: 1
  }
};

export const FewPages: Story = {
  args: {
    variant: 'default',
    size: 'md',
    totalPages: 3,
    totalItems: 25,
    itemsPerPage: 10,
    showInfo: true,
    showFirstLast: false,
    siblingCount: 1
  }
};

export const NoInfo: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    totalPages: 15,
    totalItems: 150,
    itemsPerPage: 10,
    showInfo: false,
    showFirstLast: true,
    siblingCount: 1
  }
};

export const MinimalControls: Story = {
  args: {
    variant: 'ghost',
    size: 'sm',
    totalPages: 25,
    totalItems: 250,
    itemsPerPage: 10,
    showInfo: false,
    showFirstLast: false,
    siblingCount: 0
  }
};