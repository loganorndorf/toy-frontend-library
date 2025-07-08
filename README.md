# Toy Frontend Component Library

A modern, accessible component library built with Svelte 5, TypeScript, and Tailwind CSS. This library provides a comprehensive set of UI components following atomic design principles.

## Tech Stack

### Core Framework Stack

**Frontend Framework:**
- **Svelte 5** - Modern reactive framework with runes mode ($state, $effect, $props)
- **SvelteKit** - Full-stack Svelte framework for routing, SSR, and project structure

**Styling & Design System:**
- **Tailwind CSS v4** - Utility-first CSS framework for styling
- **tailwind-variants** - Component variant system for consistent, composable styling
- **Lucide Svelte** - Icon library providing consistent iconography

**Component Architecture:**
- **Melt UI** - Headless component primitives for accessibility
- **Custom Component System** - Built with Svelte 5 snippets for flexible content slots

**Development Tools:**
- **TypeScript** - Type safety throughout the codebase
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting

**Documentation & Testing:**
- **Storybook** - Component documentation and isolated development environment
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing

### Architecture Patterns

**Design System Approach:**
- **Atomic Design** - Building from basic UI elements up to complex layouts
- **Variant-driven styling** - Consistent theming through tailwind-variants
- **Composable components** - Using Svelte snippets for flexible content areas

**Component Categories:**
1. **Basic UI (9)** - Button, Input, TextArea, Card, Badge, Select, Avatar, Spinner, Skeleton
2. **Layout (7)** - Container, Stack, Grid, Navbar, Sidebar, Modal, Sheet
3. **Interactive (4)** - Dropdown Menu, Pagination, Command Palette, Popover

## Getting Started

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
