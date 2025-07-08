<script lang="ts">
	import { navbarVariants, navItemVariants } from '$lib/utils/variants.js';
	import { Menu, X } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'transparent' | 'elevated';
	type Size = 'sm' | 'md' | 'lg';

	interface NavItem {
		label: string;
		href?: string;
		active?: boolean;
		onClick?: () => void;
	}

	interface NavbarProps extends HTMLAttributes<HTMLElement> {
		variant?: Variant;
		size?: Size;
		brand?: string;
		items?: NavItem[];
		class?: string;
		children?: any;
	}

	let {
		variant = 'default',
		size = 'md',
		brand,
		items = [],
		class: className = '',
		children,
		...restProps
	}: NavbarProps = $props();

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function handleItemClick(item: NavItem) {
		if (item.onClick) {
			item.onClick();
		}
		// Close mobile menu when item is clicked
		mobileMenuOpen = false;
	}
</script>

<nav class={navbarVariants({ variant, size, className })} {...restProps}>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-full items-center justify-between">
			<!-- Brand -->
			{#if brand}
				<div class="flex-shrink-0">
					<h1 class="text-xl font-bold text-slate-900">{brand}</h1>
				</div>
			{/if}

			<!-- Desktop Navigation -->
			<div class="hidden md:flex flex-1 items-center justify-center">
				<div class="flex items-center space-x-1">
					{#each items as item}
						{#if item.href}
							<a
								href={item.href}
								class={navItemVariants({ variant: item.active ? 'active' : 'ghost' })}
								onclick={() => handleItemClick(item)}
							>
								{item.label}
							</a>
						{:else}
							<button
								class={navItemVariants({ variant: item.active ? 'active' : 'ghost' })}
								onclick={() => handleItemClick(item)}
							>
								{item.label}
							</button>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Custom content (right side) -->
			{#if children}
				<div class="hidden md:block">
					{#if typeof children === 'string'}
						{children}
					{:else}
						{@render children()}
					{/if}
				</div>
			{/if}

			<!-- Mobile menu button -->
			<div class="md:hidden">
				<button
					class="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
					onclick={toggleMobileMenu}
					aria-expanded={mobileMenuOpen}
					aria-label="Toggle navigation menu"
				>
					{#if mobileMenuOpen}
						<X class="h-6 w-6" />
					{:else}
						<Menu class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Navigation -->
	{#if mobileMenuOpen}
		<div class="md:hidden">
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-200">
				{#each items as item}
					{#if item.href}
						<a
							href={item.href}
							class="{navItemVariants({ variant: item.active ? 'active' : 'ghost' })} block w-full text-left"
							onclick={() => handleItemClick(item)}
						>
							{item.label}
						</a>
					{:else}
						<button
							class="{navItemVariants({ variant: item.active ? 'active' : 'ghost' })} block w-full text-left"
							onclick={() => handleItemClick(item)}
						>
							{item.label}
						</button>
					{/if}
				{/each}
				
				<!-- Mobile custom content -->
				{#if children}
					<div class="pt-2 border-t border-slate-200">
						{#if typeof children === 'string'}
							{children}
						{:else}
							{@render children()}
						{/if}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</nav>