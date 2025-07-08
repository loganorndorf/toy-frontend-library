import type { Meta, StoryObj } from '@storybook/svelte';
import StackExample from './stack/StackExample.svelte';

const meta = {
  title: 'Layout/Stack',
  component: StackExample,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexbox utility component for creating consistent vertical or horizontal layouts with controlled spacing and alignment.'
      }
    }
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout direction'
    },
    spacing: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Gap between items'
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Cross-axis alignment'
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis alignment'
    }
  },
  args: {
    direction: 'vertical',
    spacing: 'md',
    align: 'stretch',
    justify: 'start'
  }
} satisfies Meta<StackExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    spacing: 'md'
  }
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'md'
  }
};

export const SmallSpacing: Story = {
  args: {
    direction: 'vertical',
    spacing: 'sm'
  }
};

export const LargeSpacing: Story = {
  args: {
    direction: 'vertical',
    spacing: 'xl'
  }
};

export const CenteredAlignment: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'md',
    align: 'center',
    justify: 'center'
  }
};

export const SpaceBetween: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'none',
    justify: 'between',
    align: 'center'
  }
};