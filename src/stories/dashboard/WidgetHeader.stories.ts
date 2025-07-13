import type { Meta, StoryObj } from '@storybook/svelte';
import WidgetHeaderExample from '../ui/dashboard/WidgetHeaderExample.svelte';

const meta = {
  title: 'Dashboard/WidgetHeader',
  component: WidgetHeaderExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A configurable widget header component with drag handles, type badges, and action buttons for dashboard widgets.'
      }
    }
  },
  argTypes: {
    editMode: {
      control: { type: 'boolean' },
      description: 'Whether the header is in edit mode'
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Whether to show action buttons'
    },
    draggable: {
      control: { type: 'boolean' },
      description: 'Whether the widget can be dragged'
    },
    widgetType: {
      control: { type: 'select' },
      options: ['chart', 'table', 'kpi'],
      description: 'Type of widget content'
    }
  },
  args: {
    editMode: false,
    showActions: true,
    draggable: true,
    widgetType: 'chart'
  }
} satisfies Meta<WidgetHeaderExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    editMode: false,
    showActions: true,
    draggable: true,
    widgetType: 'chart'
  }
};

export const EditMode: Story = {
  args: {
    editMode: true,
    showActions: true,
    draggable: true,
    widgetType: 'chart'
  }
};

export const NoActions: Story = {
  args: {
    editMode: false,
    showActions: false,
    draggable: true,
    widgetType: 'chart'
  }
};

export const TableWidget: Story = {
  args: {
    editMode: false,
    showActions: true,
    draggable: true,
    widgetType: 'table'
  }
};

export const KPIWidget: Story = {
  args: {
    editMode: false,
    showActions: true,
    draggable: true,
    widgetType: 'kpi'
  }
};

export const NonDraggable: Story = {
  args: {
    editMode: false,
    showActions: true,
    draggable: false,
    widgetType: 'chart'
  }
};