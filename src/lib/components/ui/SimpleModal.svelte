<script lang="ts">
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
		open = $bindable(false),
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

	const styles = modalVariants({ size });

	function closeModal() {
		console.log('Close modal called');
		open = false;
		if (onOpenChange) {
			onOpenChange(false);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (closeOnEscape && event.key === 'Escape') {
			closeModal();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (closeOnOutsideClick && event.target === event.currentTarget) {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<!-- Overlay -->
	<div
		class={styles.overlay()}
		transition:fade={{ duration: 150 }}
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		aria-describedby={description ? 'modal-description' : undefined}
	>
		<!-- Content -->
		<div
			class={styles.content({ className })}
			transition:scale={{ duration: 200, start: 0.95 }}
			onclick={(e) => e.stopPropagation()}
			{...restProps}
		>
			<!-- Close button -->
			{#if showCloseButton}
				<button
					class={styles.close()}
					onclick={closeModal}
					aria-label="Close modal"
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
							<h2 id="modal-title" class={styles.title()}>{title}</h2>
						{/if}
						{#if description}
							<p id="modal-description" class={styles.description()}>{description}</p>
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
	</div>
{/if}