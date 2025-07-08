<script lang="ts">
	import { sidebarVariants, sidebarItemVariants } from '$lib/utils/variants.js';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ComponentType } from 'svelte';

	type Variant = 'default' | 'bordered' | 'elevated';
	type Width = 'sm' | 'md' | 'lg';
	type Position = 'left' | 'right';

	interface SidebarItem {
		label: string;
		href?: string;
		icon?: ComponentType;
		active?: boolean;
		onClick?: () => void;
	}

	interface SidebarProps extends HTMLAttributes<HTMLElement> {
		variant?: Variant;
		width?: Width;
		position?: Position;
		title?: string;
		items?: SidebarItem[];
		collapsible?: boolean;
		collapsed?: boolean;
		onCollapsedChange?: (collapsed: boolean) => void;
		class?: string;
		children?: any;
	}

	let {
		variant = 'default',
		width = 'md',
		position = 'left',
		title,
		items = [],
		collapsible = false,
		collapsed = false,
		onCollapsedChange,
		class: className = '',
		children,
		...restProps
	}: SidebarProps = $props();

	function toggleCollapsed() {
		const newCollapsed = !collapsed;
		if (onCollapsedChange) {
			onCollapsedChange(newCollapsed);
		}
	}

	function handleItemClick(item: SidebarItem) {
		if (item.onClick) {
			item.onClick();
		}
	}
</script>

<aside class={sidebarVariants({ variant, width: collapsed ? 'sm' : width, position, className })} {...restProps}>
	<!-- Header -->
	{#if title || collapsible}
		<div class="flex items-center justify-between p-4 border-b border-slate-200">
			{#if title && !collapsed}
				<h2 class="text-lg font-semibold text-slate-900">{title}</h2>
			{/if}
			
			{#if collapsible}
				<button
					onclick={toggleCollapsed}
					class="p-1 rounded-md hover:bg-slate-100 transition-colors"
					aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				>
					{#if position === 'left'}
						{#if collapsed}
							<ChevronRight class="h-4 w-4" />
						{:else}
							<ChevronLeft class="h-4 w-4" />
						{/if}
					{:else}
						{#if collapsed}
							<ChevronLeft class="h-4 w-4" />
						{:else}
							<ChevronRight class="h-4 w-4" />
						{/if}
					{/if}
				</button>
			{/if}
		</div>
	{/if}

	<!-- Navigation -->
	{#if items.length > 0}
		<nav class="flex-1 p-4 space-y-1">
			{#each items as item}
				{#if item.href}
					<a
						href={item.href}
						class={sidebarItemVariants({ variant: item.active ? 'active' : 'ghost' })}
						onclick={() => handleItemClick(item)}
					>
						{#if item.icon}
							<item.icon class="h-4 w-4" />
						{/if}
						{#if !collapsed}
							<span>{item.label}</span>
						{/if}
					</a>
				{:else}
					<button
						class={sidebarItemVariants({ variant: item.active ? 'active' : 'ghost' })}
						onclick={() => handleItemClick(item)}
					>
						{#if item.icon}
							<item.icon class="h-4 w-4" />
						{/if}
						{#if !collapsed}
							<span>{item.label}</span>
						{/if}
					</button>
				{/if}
			{/each}
		</nav>
	{/if}

	<!-- Custom content -->
	{#if children}
		<div class="p-4">
			{#if typeof children === 'string'}
				{children}
			{:else}
				{@render children()}
			{/if}
		</div>
	{/if}
</aside>