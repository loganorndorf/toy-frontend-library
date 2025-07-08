<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { modalVariants } from '$lib/utils/variants.js';
	import { X } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';
	import type { HTMLAttributes } from 'svelte/elements';

	type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	interface ModalProps extends HTMLAttributes<HTMLDivElement> {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
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
		open = false,
		onOpenChange,
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
	}: ModalProps = $props();

	const dialog = createDialog({
		defaultOpen: false,
		closeOnEscape,
		closeOnOutsideClick,
		onOpenChange: (newOpen) => {
			if (onOpenChange) {
				onOpenChange(newOpen);
			}
		}
	});

	const {
		elements: { overlay, content, close, portalled },
		states: { open: dialogOpen }
	} = dialog;

	const styles = modalVariants({ size });

	// Sync external open prop with internal dialog state
	$effect(() => {
		console.log('Modal open changed:', open);
		if (dialogOpen && typeof dialogOpen.set === 'function') {
			dialogOpen.set(open);
		}
	});

	$effect(() => {
		console.log('Dialog open state:', $dialogOpen);
		console.log('dialogOpen store:', dialogOpen);
	});
</script>

<div use:melt={$portalled}>
	{#if $dialogOpen}
		<div
			use:melt={$overlay}
			class={styles.overlay()}
			transition:fade={{ duration: 150 }}
		></div>
		<div
			use:melt={$content}
			class={styles.content({ className })}
			transition:scale={{ duration: 200, start: 0.95 }}
			{...restProps}
		>
			<!-- Close button -->
			{#if showCloseButton}
				<button use:melt={$close} class={styles.close()}>
					<X class="h-4 w-4" />
					<span class="sr-only">Close</span>
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
							<h2 class={styles.title()}>{title}</h2>
						{/if}
						{#if description}
							<p class={styles.description()}>{description}</p>
						{/if}
					{/if}
				</div>
			{/if}

			<!-- Content -->
			{#if children}
				<div class="py-4">
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
	{/if}
</div>

