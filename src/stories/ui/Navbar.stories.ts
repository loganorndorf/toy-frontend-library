import type { Meta, StoryObj } from '@storybook/svelte';
import Navbar from '$lib/components/ui/Navbar.svelte';

const meta = {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive navigation bar component with mobile menu support, customizable variants, and flexible content areas.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'transparent', 'elevated'],
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Height size of the navbar'
    },
    brand: {
      control: { type: 'text' },
      description: 'Brand/logo text'
    },
    items: {
      control: { type: 'object' },
      description: 'Navigation items array'
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  },
  args: {
    variant: 'default',
    size: 'md',
    brand: 'Brand',
    items: [
      { label: 'Home', href: '#home', active: true },
      { label: 'Products', href: '#products' },
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Contact', onClick: () => alert('Contact clicked!') }
    ]
  }
} satisfies Meta<Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    brand: 'My App',
    items: [
      { label: 'Home', href: '#home', active: true },
      { label: 'Products', href: '#products' },
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Contact', onClick: () => alert('Contact clicked!') }
    ]
  }
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    size: 'md',
    brand: 'Transparent Nav',
    items: [
      { label: 'Home', href: '#home', active: true },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Contact', href: '#contact' }
    ]
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }
      ]
    }
  }
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    size: 'lg',
    brand: 'Elevated Brand',
    items: [
      { label: 'Dashboard', href: '#dashboard', active: true },
      { label: 'Analytics', href: '#analytics' },
      { label: 'Users', href: '#users' },
      { label: 'Settings', href: '#settings' }
    ]
  }
};

export const WithCustomContent: Story = {
  args: {
    variant: 'default',
    size: 'md',
    brand: 'App Name',
    items: [
      { label: 'Home', href: '#home' },
      { label: 'Dashboard', href: '#dashboard', active: true },
      { label: 'Profile', href: '#profile' }
    ]
  },
  render: (args) => ({
    Component: Navbar,
    props: args,
    slots: {
      children: `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="background: #22c55e; color: white; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">Pro</span>
          <button style="background: transparent; border: 1px solid #d1d5db; padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; cursor: pointer;">Login</button>
        </div>
      `
    }
  })
};

export const MinimalNavigation: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    brand: 'Minimal',
    items: [
      { label: 'Home', href: '#home', active: true },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' }
    ]
  }
};

export const EcommerceExample: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
    brand: 'Store',
    items: [
      { label: 'Shop', href: '#shop', active: true },
      { label: 'Categories', href: '#categories' },
      { label: 'Sale', href: '#sale' },
      { label: 'About', href: '#about' }
    ]
  },
  render: (args) => ({
    Component: Navbar,
    props: args,
    slots: {
      children: `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="position: relative;">
            <svg style="width: 20px; height: 20px; color: #6b7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <div style="position: relative;">
            <svg style="width: 20px; height: 20px; color: #6b7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H2m5 8v7a1 1 0 001 1h8a1 1 0 001-1v-7m-9 0h9"></path>
            </svg>
            <span style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; font-size: 10px;">3</span>
          </div>
          <div style="width: 32px; height: 32px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 600; color: #374151;">JD</div>
        </div>
      `
    }
  })
};

export const ResponsiveDemo: Story = {
  args: {
    variant: 'default',
    size: 'md',
    brand: 'Responsive App',
    items: [
      { label: 'Dashboard', href: '#dashboard', active: true },
      { label: 'Projects', href: '#projects' },
      { label: 'Team', href: '#team' },
      { label: 'Analytics', href: '#analytics' },
      { label: 'Settings', href: '#settings' },
      { label: 'Help', href: '#help' }
    ]
  },
  render: (args) => ({
    Component: Navbar,
    props: args,
    slots: {
      children: `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: 600;">JD</div>
            <span style="font-size: 0.875rem; font-weight: 500; color: #374151;">John Doe</span>
          </div>
        </div>
      `
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Resize the viewport to see the mobile hamburger menu in action. The navbar automatically adapts to smaller screens.'
      }
    }
  }
};