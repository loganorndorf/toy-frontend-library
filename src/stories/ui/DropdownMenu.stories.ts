import type { Meta, StoryObj } from '@storybook/svelte';
import DropdownMenuExample from './dropdown/DropdownMenuExample.svelte';

const meta = {
  title: 'Interactive/DropdownMenu',
  component: DropdownMenuExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile dropdown menu component for actions, navigation, and context menus with keyboard navigation and accessibility support.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
      description: 'Visual style variant of the trigger button'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the dropdown menu and trigger'
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left', 'right'],
      description: 'Position of the dropdown relative to trigger'
    },
    triggerText: {
      control: { type: 'text' },
      description: 'Text displayed on the trigger button'
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Whether to show icons in menu items'
    },
    showShortcuts: {
      control: { type: 'boolean' },
      description: 'Whether to show keyboard shortcuts'
    }
  },
  args: {
    variant: 'default',
    size: 'md',
    placement: 'bottom-start',
    triggerText: 'Actions',
    showIcons: true,
    showShortcuts: true
  }
} satisfies Meta<DropdownMenuExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placement: 'bottom-start',
    triggerText: 'Actions',
    showIcons: true,
    showShortcuts: true
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    placement: 'bottom-start',
    triggerText: 'Options',
    showIcons: true,
    showShortcuts: false
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    placement: 'bottom-start',
    triggerText: 'Menu',
    showIcons: false,
    showShortcuts: false
  }
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    placement: 'bottom-start',
    triggerText: 'Small Menu',
    showIcons: true,
    showShortcuts: false
  }
};

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    placement: 'bottom-start',
    triggerText: 'Large Menu',
    showIcons: true,
    showShortcuts: true
  }
};

export const BottomEnd: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placement: 'bottom-end',
    triggerText: 'Bottom End',
    showIcons: true,
    showShortcuts: false
  }
};

export const TopStart: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placement: 'top-start',
    triggerText: 'Top Start',
    showIcons: true,
    showShortcuts: false
  }
};

export const RightPlacement: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    placement: 'right',
    triggerText: 'Right Menu',
    showIcons: true,
    showShortcuts: true
  }
};