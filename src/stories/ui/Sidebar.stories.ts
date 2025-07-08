import type { Meta, StoryObj } from '@storybook/svelte';
import SidebarVariants from './sidebar/SidebarVariants.svelte';
import SidebarExample from './sidebar/SidebarExample.svelte';

const meta = {
  title: 'Layout/Sidebar',
  component: SidebarExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A navigation sidebar component with support for collapsible states, different variants, and custom content.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'elevated'],
      description: 'Visual variant of the sidebar'
    },
    width: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Width of the sidebar'
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the sidebar'
    },
    title: {
      control: { type: 'text' },
      description: 'Title displayed in the sidebar header'
    },
    collapsible: {
      control: { type: 'boolean' },
      description: 'Whether the sidebar can be collapsed'
    },
    collapsed: {
      control: { type: 'boolean' },
      description: 'Whether the sidebar is collapsed by default'
    }
  },
  args: {
    variant: 'default',
    width: 'md',
    position: 'left',
    title: 'Navigation',
    collapsible: false,
    collapsed: false
  }
} satisfies Meta<SidebarExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => ({
    Component: SidebarVariants
  })
};

export const Default: Story = {
  args: {
    variant: 'default',
    width: 'md',
    position: 'left',
    title: 'Navigation',
    collapsible: false,
    collapsed: false
  }
};

export const Collapsible: Story = {
  args: {
    variant: 'default',
    width: 'md',
    position: 'left',
    title: 'Dashboard',
    collapsible: true,
    collapsed: false
  }
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    width: 'md',
    position: 'left',
    title: 'Menu',
    collapsible: false,
    collapsed: false
  }
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    width: 'lg',
    position: 'left',
    title: 'Navigation',
    collapsible: false,
    collapsed: false
  }
};

export const RightPosition: Story = {
  args: {
    variant: 'default',
    width: 'md',
    position: 'right',
    title: 'Secondary Nav',
    collapsible: false,
    collapsed: false
  }
};