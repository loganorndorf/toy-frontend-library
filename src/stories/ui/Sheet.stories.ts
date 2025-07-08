import type { Meta, StoryObj } from '@storybook/svelte';
import SheetExample from './sheet/SheetExample.svelte';

const meta = {
  title: 'Layout/Sheet',
  component: SheetExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A slide-out panel component that appears from the edges of the screen. Perfect for navigation menus, settings panels, or detailed views.'
      }
    }
  },
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side the sheet slides in from'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the sheet'
    },
    title: {
      control: { type: 'text' },
      description: 'Sheet title'
    },
    buttonText: {
      control: { type: 'text' },
      description: 'Button text to open sheet'
    }
  },
  args: {
    side: 'right',
    size: 'md',
    title: 'Sheet Title',
    buttonText: 'Open Sheet'
  }
} satisfies Meta<SheetExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RightSheet: Story = {
  args: {
    side: 'right',
    size: 'md',
    title: 'Right Panel',
    buttonText: 'Open Right Sheet'
  }
};

export const LeftSheet: Story = {
  args: {
    side: 'left',
    size: 'md',
    title: 'Navigation',
    buttonText: 'Open Left Sheet'
  }
};

export const TopSheet: Story = {
  args: {
    side: 'top',
    size: 'md',
    title: 'Notifications',
    buttonText: 'Open Top Sheet'
  }
};

export const BottomSheet: Story = {
  args: {
    side: 'bottom',
    size: 'sm',
    title: 'Quick Actions',
    buttonText: 'Open Bottom Sheet'
  }
};

export const SmallSize: Story = {
  args: {
    side: 'right',
    size: 'sm',
    title: 'Small Sheet',
    buttonText: 'Open Small Sheet'
  }
};

export const LargeSize: Story = {
  args: {
    side: 'right',
    size: 'lg',
    title: 'Large Sheet',
    buttonText: 'Open Large Sheet'
  }
};