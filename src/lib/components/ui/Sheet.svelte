<script lang="ts">
	import { sheetVariants } from '$lib/utils/variants.js';
	import { X } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import type { HTMLAttributes } from 'svelte/elements';

	type Side = 'top' | 'bottom' | 'left' | 'right';
	type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	interface SheetProps extends HTMLAttributes<HTMLDivElement> {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		side?: Side;
		size?: Size;
		title?: string;
		description?: string;
		showCloseButton?: boolean;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
		class?: string;
		children?: any;
		header?: any;
		footer?: any;
	}

	let {
		open = $bindable(false),
		onOpenChange,
		side = 'right',
		size = 'md',
		title,
		description,
		showCloseButton = true,
		closeOnEscape = true,
		closeOnOutsideClick = true,
		class: className = '',
		children,
		header,
		footer,
		...restProps
	}: SheetProps = $props();

	const styles = sheetVariants({ side, size });

	function closeSheet() {
		open = false;
		if (onOpenChange) {
			onOpenChange(false);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (closeOnEscape && event.key === 'Escape') {
			closeSheet();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (closeOnOutsideClick && event.target === event.currentTarget) {
			closeSheet();
		}
	}

	// Determine transition direction based on side
	function getTransitionProps() {
		switch (side) {
			case 'top':
				return { y: -300, duration: 300 };
			case 'bottom':
				return { y: 300, duration: 300 };
			case 'left':
				return { x: -300, duration: 300 };
			case 'right':
				return { x: 300, duration: 300 };
			default:
				return { x: 300, duration: 300 };
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<!-- Overlay -->
	<div
		class={styles.overlay()}
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'sheet-title' : undefined}
		aria-describedby={description ? 'sheet-description' : undefined}
	>
		<!-- Content -->
		<div
			class={styles.content({ className })}
			transition:fly={getTransitionProps()}
			onclick={(e) => e.stopPropagation()}
			{...restProps}
		>
			<!-- Close button -->
			{#if showCloseButton}
				<button
					class={styles.close()}
					onclick={closeSheet}
					aria-label="Close sheet"
				>
					<X class="h-4 w-4" />
				</button>
			{/if}

			<!-- Header -->
			{#if header || title || description}
				<div class={styles.header()}>
					{#if header}
						{#if typeof header === 'string'}
							{header}
						{:else}
							{@render header()}
						{/if}
					{:else}
						{#if title}
							<h2 id="sheet-title" class={styles.title()}>{title}</h2>
						{/if}
						{#if description}
							<p id="sheet-description" class={styles.description()}>{description}</p>
						{/if}
					{/if}
				</div>
			{/if}

			<!-- Content -->
			{#if children}
				<div class="flex-1 py-4 overflow-y-auto">
					{#if typeof children === 'string'}
						{children}
					{:else}
						{@render children()}
					{/if}
				</div>
			{/if}

			<!-- Footer -->
			{#if footer}
				<div class={styles.footer()}>
					{#if typeof footer === 'string'}
						{footer}
					{:else}
						{@render footer()}
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}