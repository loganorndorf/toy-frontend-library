import type { Meta, StoryObj } from '@storybook/svelte';
import ContainerExample from './container/ContainerExample.svelte';

const meta = {
  title: 'Layout/Container',
  component: ContainerExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive container component that provides consistent max-width and padding across different screen sizes.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width of the container'
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Horizontal padding of the container'
    }
  },
  args: {
    size: 'xl',
    padding: 'md'
  }
} satisfies Meta<ContainerExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'xl',
    padding: 'md'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    padding: 'md'
  }
};

export const Medium: Story = {
  args: {
    size: 'md',
    padding: 'md'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    padding: 'md'
  }
};

export const NoPadding: Story = {
  args: {
    size: 'md',
    padding: 'none'
  }
};

export const FullWidth: Story = {
  args: {
    size: 'full',
    padding: 'lg'
  }
};