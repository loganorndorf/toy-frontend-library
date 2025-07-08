<script lang="ts">
	import { dropdownMenuVariants } from '$lib/utils/variants.js';
	import { ChevronDown } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ComponentType } from 'svelte';

	type Variant = 'default' | 'outline' | 'ghost';
	type Size = 'sm' | 'md' | 'lg';
	type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right';

	interface DropdownItem {
		label: string;
		value?: string;
		icon?: ComponentType;
		shortcut?: string;
		disabled?: boolean;
		onClick?: () => void;
		href?: string;
	}

	interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
		variant?: Variant;
		size?: Size;
		placement?: Placement;
		triggerText?: string;
		items?: DropdownItem[];
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		class?: string;
		children?: any;
	}

	let {
		variant = 'default',
		size = 'md',
		placement = 'bottom-start',
		triggerText = 'Menu',
		items = [],
		open = $bindable(false),
		onOpenChange,
		class: className = '',
		children,
		...restProps
	}: DropdownMenuProps = $props();

	let triggerElement: HTMLButtonElement;
	let contentElement: HTMLDivElement;

	// Close on outside click
	function handleOutsideClick(event: MouseEvent) {
		if (
			open &&
			triggerElement &&
			contentElement &&
			!triggerElement.contains(event.target as Node) &&
			!contentElement.contains(event.target as Node)
		) {
			closeMenu();
		}
	}

	// Close on escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			closeMenu();
		}
	}

	function toggleMenu() {
		open = !open;
		if (onOpenChange) {
			onOpenChange(open);
		}
	}

	function closeMenu() {
		open = false;
		if (onOpenChange) {
			onOpenChange(false);
		}
	}

	function handleItemClick(item: DropdownItem) {
		if (item.disabled) return;
		
		if (item.onClick) {
			item.onClick();
		}
		closeMenu();
	}

	// Position calculation
	function getContentPosition() {
		if (!triggerElement) return {};

		const rect = triggerElement.getBoundingClientRect();
		const positions: Record<Placement, any> = {
			'bottom-start': {
				top: `${rect.bottom + 4}px`,
				left: `${rect.left}px`
			},
			'bottom-end': {
				top: `${rect.bottom + 4}px`,
				right: `${window.innerWidth - rect.right}px`
			},
			'top-start': {
				bottom: `${window.innerHeight - rect.top + 4}px`,
				left: `${rect.left}px`
			},
			'top-end': {
				bottom: `${window.innerHeight - rect.top + 4}px`,
				right: `${window.innerWidth - rect.right}px`
			},
			'left': {
				top: `${rect.top}px`,
				right: `${window.innerWidth - rect.left + 4}px`
			},
			'right': {
				top: `${rect.top}px`,
				left: `${rect.right + 4}px`
			}
		};

		return positions[placement] || positions['bottom-start'];
	}

	$effect(() => {
		if (open) {
			document.addEventListener('click', handleOutsideClick);
			document.addEventListener('keydown', handleKeydown);
			return () => {
				document.removeEventListener('click', handleOutsideClick);
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});

	const styles = $derived(dropdownMenuVariants({ variant, size }));
</script>

<div class="relative inline-block {className}" {...restProps}>
	<!-- Trigger Button -->
	<button
		bind:this={triggerElement}
		class={styles.trigger()}
		onclick={toggleMenu}
		aria-expanded={open}
		aria-haspopup="true"
	>
		{triggerText}
		<ChevronDown class="ml-2 h-4 w-4 transition-transform {open ? 'rotate-180' : ''}" />
	</button>

	<!-- Dropdown Content -->
	{#if open}
		<div
			bind:this={contentElement}
			class={styles.content()}
			style="position: fixed; {Object.entries(getContentPosition()).map(([key, value]) => `${key}: ${value}`).join('; ')}"
		>
			{#if children}
				{@render children()}
			{:else if items.length > 0}
				{#each items as item}
					{#if item.label === 'separator'}
						<div class={styles.separator()}></div>
					{:else if item.href}
						<a
							href={item.href}
							class={styles.item()}
							class:opacity-50={item.disabled}
							onclick={() => handleItemClick(item)}
						>
							{#if item.icon}
								<item.icon class={styles.icon()} />
							{/if}
							{item.label}
							{#if item.shortcut}
								<span class={styles.shortcut()}>{item.shortcut}</span>
							{/if}
						</a>
					{:else}
						<button
							class={styles.item()}
							class:opacity-50={item.disabled}
							disabled={item.disabled}
							onclick={() => handleItemClick(item)}
						>
							{#if item.icon}
								<item.icon class={styles.icon()} />
							{/if}
							{item.label}
							{#if item.shortcut}
								<span class={styles.shortcut()}>{item.shortcut}</span>
							{/if}
						</button>
					{/if}
				{/each}
			{/if}
		</div>
	{/if}
</div>