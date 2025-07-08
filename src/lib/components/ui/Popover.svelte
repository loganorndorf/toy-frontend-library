<script lang="ts">
	import { popoverVariants } from '$lib/utils/variants.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'tooltip' | 'destructive' | 'warning' | 'success';
	type Size = 'sm' | 'md' | 'lg' | 'auto';
	type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
	type Trigger = 'click' | 'hover' | 'focus' | 'manual';

	interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
		variant?: Variant;
		size?: Size;
		placement?: Placement;
		trigger?: Trigger;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		showArrow?: boolean;
		offset?: number;
		delay?: number;
		closeOnOutsideClick?: boolean;
		closeOnEscape?: boolean;
		class?: string;
		triggerElement?: HTMLElement;
		children?: any;
		content?: any;
	}

	let {
		variant = 'default',
		size = 'md',
		placement = 'bottom',
		trigger = 'click',
		open = $bindable(false),
		onOpenChange,
		showArrow = true,
		offset = 8,
		delay = 0,
		closeOnOutsideClick = true,
		closeOnEscape = true,
		class: className = '',
		triggerElement,
		children,
		content,
		...restProps
	}: PopoverProps = $props();

	let triggerRef: HTMLElement;
	let contentRef: HTMLElement;
	let arrowRef: HTMLElement;
	let timeoutId: number;

	// Calculate position and arrow placement
	function calculatePosition() {
		if (!triggerRef || !contentRef) return {};

		const triggerRect = triggerRef.getBoundingClientRect();
		const contentRect = contentRef.getBoundingClientRect();
		const arrowSize = 8; // 2 * 4px (half width/height)

		const positions: Record<Placement, any> = {
			top: {
				content: {
					left: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,
					top: triggerRect.top - contentRect.height - offset
				},
				arrow: {
					left: contentRect.width / 2 - arrowSize / 2,
					top: contentRect.height - 1,
					transform: 'rotate(45deg)'
				}
			},
			bottom: {
				content: {
					left: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,
					top: triggerRect.bottom + offset
				},
				arrow: {
					left: contentRect.width / 2 - arrowSize / 2,
					top: -arrowSize / 2,
					transform: 'rotate(45deg)'
				}
			},
			left: {
				content: {
					left: triggerRect.left - contentRect.width - offset,
					top: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
				},
				arrow: {
					left: contentRect.width - 1,
					top: contentRect.height / 2 - arrowSize / 2,
					transform: 'rotate(45deg)'
				}
			},
			right: {
				content: {
					left: triggerRect.right + offset,
					top: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
				},
				arrow: {
					left: -arrowSize / 2,
					top: contentRect.height / 2 - arrowSize / 2,
					transform: 'rotate(45deg)'
				}
			},
			'top-start': {
				content: {
					left: triggerRect.left,
					top: triggerRect.top - contentRect.height - offset
				},
				arrow: {
					left: Math.min(triggerRect.width / 2, contentRect.width - arrowSize * 2),
					top: contentRect.height - 1,
					transform: 'rotate(45deg)'
				}
			},
			'top-end': {
				content: {
					left: triggerRect.right - contentRect.width,
					top: triggerRect.top - contentRect.height - offset
				},
				arrow: {
					right: Math.min(triggerRect.width / 2, contentRect.width - arrowSize * 2),
					top: contentRect.height - 1,
					transform: 'rotate(45deg)'
				}
			},
			'bottom-start': {
				content: {
					left: triggerRect.left,
					top: triggerRect.bottom + offset
				},
				arrow: {
					left: Math.min(triggerRect.width / 2, contentRect.width - arrowSize * 2),
					top: -arrowSize / 2,
					transform: 'rotate(45deg)'
				}
			},
			'bottom-end': {
				content: {
					left: triggerRect.right - contentRect.width,
					top: triggerRect.bottom + offset
				},
				arrow: {
					right: Math.min(triggerRect.width / 2, contentRect.width - arrowSize * 2),
					top: -arrowSize / 2,
					transform: 'rotate(45deg)'
				}
			},
			'left-start': {
				content: {
					left: triggerRect.left - contentRect.width - offset,
					top: triggerRect.top
				},
				arrow: {
					left: contentRect.width - 1,
					top: Math.min(triggerRect.height / 2, contentRect.height - arrowSize * 2),
					transform: 'rotate(45deg)'
				}
			},
			'left-end': {
				content: {
					left: triggerRect.left - contentRect.width - offset,
					top: triggerRect.bottom - contentRect.height
				},
				arrow: {
					left: contentRect.width - 1,
					bottom: Math.min(triggerRect.height / 2, contentRect.height - arrowSize * 2),
					transform: 'rotate(45deg)'
				}
			},
			'right-start': {
				content: {
					left: triggerRect.right + offset,
					top: triggerRect.top
				},
				arrow: {
					left: -arrowSize / 2,
					top: Math.min(triggerRect.height / 2, contentRect.height - arrowSize * 2),
					transform: 'rotate(45deg)'
				}
			},
			'right-end': {
				content: {
					left: triggerRect.right + offset,
					top: triggerRect.bottom - contentRect.height
				},
				arrow: {
					left: -arrowSize / 2,
					bottom: Math.min(triggerRect.height / 2, contentRect.height - arrowSize * 2),
					transform: 'rotate(45deg)'
				}
			}
		};

		return positions[placement] || positions.bottom;
	}

	// Handle opening/closing
	function openPopover() {
		if (timeoutId) clearTimeout(timeoutId);
		if (delay > 0) {
			timeoutId = setTimeout(() => {
				open = true;
				if (onOpenChange) onOpenChange(true);
			}, delay);
		} else {
			open = true;
			if (onOpenChange) onOpenChange(true);
		}
	}

	function closePopover() {
		if (timeoutId) clearTimeout(timeoutId);
		open = false;
		if (onOpenChange) onOpenChange(false);
	}

	function togglePopover() {
		if (open) {
			closePopover();
		} else {
			openPopover();
		}
	}

	// Event handlers
	function handleTriggerClick() {
		if (trigger === 'click') {
			togglePopover();
		}
	}

	function handleTriggerMouseEnter() {
		if (trigger === 'hover') {
			openPopover();
		}
	}

	function handleTriggerMouseLeave() {
		if (trigger === 'hover') {
			closePopover();
		}
	}

	function handleTriggerFocus() {
		if (trigger === 'focus') {
			openPopover();
		}
	}

	function handleTriggerBlur() {
		if (trigger === 'focus') {
			closePopover();
		}
	}

	function handleOutsideClick(event: MouseEvent) {
		if (
			open &&
			closeOnOutsideClick &&
			triggerRef &&
			contentRef &&
			!triggerRef.contains(event.target as Node) &&
			!contentRef.contains(event.target as Node)
		) {
			closePopover();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (open && closeOnEscape && event.key === 'Escape') {
			closePopover();
		}
	}

	// Position content when it opens
	$effect(() => {
		if (open && triggerRef && contentRef) {
			const position = calculatePosition();
			
			// Apply content position
			if (position.content) {
				contentRef.style.position = 'fixed';
				contentRef.style.left = `${Math.max(8, position.content.left)}px`;
				contentRef.style.top = `${Math.max(8, position.content.top)}px`;
			}

			// Apply arrow position
			if (showArrow && arrowRef && position.arrow) {
				Object.assign(arrowRef.style, {
					position: 'absolute',
					left: position.arrow.left !== undefined ? `${position.arrow.left}px` : 'auto',
					right: position.arrow.right !== undefined ? `${position.arrow.right}px` : 'auto',
					top: position.arrow.top !== undefined ? `${position.arrow.top}px` : 'auto',
					bottom: position.arrow.bottom !== undefined ? `${position.arrow.bottom}px` : 'auto',
					transform: position.arrow.transform || 'rotate(45deg)'
				});
			}
		}
	});

	// Set up event listeners
	$effect(() => {
		const currentTrigger = triggerElement || triggerRef;
		if (!currentTrigger) return;

		currentTrigger.addEventListener('click', handleTriggerClick);
		currentTrigger.addEventListener('mouseenter', handleTriggerMouseEnter);
		currentTrigger.addEventListener('mouseleave', handleTriggerMouseLeave);
		currentTrigger.addEventListener('focus', handleTriggerFocus);
		currentTrigger.addEventListener('blur', handleTriggerBlur);

		if (open) {
			document.addEventListener('click', handleOutsideClick);
			document.addEventListener('keydown', handleKeydown);
		}

		return () => {
			currentTrigger.removeEventListener('click', handleTriggerClick);
			currentTrigger.removeEventListener('mouseenter', handleTriggerMouseEnter);
			currentTrigger.removeEventListener('mouseleave', handleTriggerMouseLeave);
			currentTrigger.removeEventListener('focus', handleTriggerFocus);
			currentTrigger.removeEventListener('blur', handleTriggerBlur);
			document.removeEventListener('click', handleOutsideClick);
			document.removeEventListener('keydown', handleKeydown);
			if (timeoutId) clearTimeout(timeoutId);
		};
	});

	const styles = $derived(popoverVariants({ variant, size }));
</script>

<!-- Trigger Element -->
<div
	bind:this={triggerRef}
	class="inline-block {className}"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>

<!-- Popover Content -->
{#if open}
	<div
		bind:this={contentRef}
		class={styles.content()}
		role="tooltip"
		aria-hidden={!open}
	>
		{#if showArrow}
			<div
				bind:this={arrowRef}
				class={styles.arrow()}
				aria-hidden="true"
			></div>
		{/if}
		
		{#if content}
			{@render content()}
		{/if}
	</div>
{/if}