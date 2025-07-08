import type { Meta, StoryObj } from '@storybook/svelte';
import CommandPaletteExample from './command/CommandPaletteExample.svelte';

const meta = {
  title: 'Interactive/CommandPalette',
  component: CommandPaletteExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A powerful command palette interface for quick command execution and navigation. Features fuzzy search, keyboard navigation, grouped commands, and keyboard shortcuts.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the command palette dialog'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the search input'
    },
    emptyMessage: {
      control: { type: 'text' },
      description: 'Message shown when no commands match the search'
    }
  },
  args: {
    size: 'md',
    placeholder: 'Type a command or search...',
    emptyMessage: 'No results found.'
  }
} satisfies Meta<CommandPaletteExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    placeholder: 'Type a command or search...',
    emptyMessage: 'No results found.'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Search commands...',
    emptyMessage: 'No commands found.'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Type a command or search...',
    emptyMessage: 'No results found.'
  }
};

export const CustomPlaceholder: Story = {
  args: {
    size: 'md',
    placeholder: 'What would you like to do?',
    emptyMessage: 'Try searching for "new", "open", or "settings"'
  }
};

export const FocusedSearch: Story = {
  args: {
    size: 'md',
    placeholder: 'Start typing to find commands quickly...',
    emptyMessage: 'No matching commands. Try different keywords.'
  }
};