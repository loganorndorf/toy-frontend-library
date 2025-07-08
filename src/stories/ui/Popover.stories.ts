import type { Meta, StoryObj } from '@storybook/svelte';
import PopoverExample from './popover/PopoverExample.svelte';

const meta = {
  title: 'Interactive/Popover',
  component: PopoverExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A floating content panel that appears relative to a trigger element. Perfect for tooltips, context menus, form helpers, and rich content overlays with smart positioning and multiple trigger options.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'tooltip', 'destructive', 'warning', 'success'],
      description: 'Visual style variant of the popover'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'auto'],
      description: 'Size of the popover content'
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'],
      description: 'Position of the popover relative to trigger'
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover', 'focus', 'manual'],
      description: 'How the popover is triggered'
    },
    showArrow: {
      control: { type: 'boolean' },
      description: 'Whether to show the arrow pointing to trigger'
    },
    delay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in milliseconds before showing popover'
    }
  },
  args: {
    variant: 'default',
    size: 'md',
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    delay: 0
  }
} satisfies Meta<PopoverExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    delay: 0
  }
};

export const Tooltip: Story = {
  args: {
    variant: 'tooltip',
    size: 'auto',
    placement: 'top',
    trigger: 'hover',
    showArrow: true,
    delay: 500
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    size: 'md',
    placement: 'bottom',
    trigger: 'click',
    showArrow: true,
    delay: 0
  }
};

export const Success: Story = {
  args: {
    variant: 'success',
    size: 'md',
    placement: 'top',
    trigger: 'click',
    showArrow: true,
    delay: 0
  }
};

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    placement: 'right',
    trigger: 'click',
    showArrow: true,
    delay: 0
  }
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    placement: 'left',
    trigger: 'click',
    showArrow: true,
    delay: 0
  }
};

export const FocusTrigger: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placement: 'bottom',
    trigger: 'focus',
    showArrow: true,
    delay: 0
  }
};

export const NoArrow: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placement: 'bottom',
    trigger: 'click',
    showArrow: false,
    delay: 0
  }
};

export const DelayedHover: Story = {
  args: {
    variant: 'tooltip',
    size: 'auto',
    placement: 'top',
    trigger: 'hover',
    showArrow: true,
    delay: 800
  }
};