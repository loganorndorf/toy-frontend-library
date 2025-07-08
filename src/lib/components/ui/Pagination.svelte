<script lang="ts">
	import { paginationVariants } from '$lib/utils/variants.js';
	import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'outline' | 'ghost';
	type Size = 'sm' | 'md' | 'lg';

	interface PaginationProps extends HTMLAttributes<HTMLElement> {
		variant?: Variant;
		size?: Size;
		currentPage?: number;
		totalPages?: number;
		totalItems?: number;
		itemsPerPage?: number;
		showInfo?: boolean;
		showFirstLast?: boolean;
		siblingCount?: number;
		onPageChange?: (page: number) => void;
		class?: string;
	}

	let {
		variant = 'default',
		size = 'md',
		currentPage = $bindable(1),
		totalPages = 1,
		totalItems,
		itemsPerPage = 10,
		showInfo = false,
		showFirstLast = true,
		siblingCount = 1,
		onPageChange,
		class: className = '',
		...restProps
	}: PaginationProps = $props();

	// Calculate total pages if totalItems is provided
	const calculatedTotalPages = $derived(
		totalItems ? Math.ceil(totalItems / itemsPerPage) : totalPages
	);

	// Calculate start and end item numbers for info display
	const startItem = $derived((currentPage - 1) * itemsPerPage + 1);
	const endItem = $derived(Math.min(currentPage * itemsPerPage, totalItems || calculatedTotalPages * itemsPerPage));

	// Generate page numbers to display
	const pageNumbers = $derived(() => {
		const pages: (number | 'ellipsis')[] = [];
		const total = calculatedTotalPages;

		if (total <= 7) {
			// Show all pages if 7 or fewer
			for (let i = 1; i <= total; i++) {
				pages.push(i);
			}
		} else {
			// Always show first page
			pages.push(1);

			// Calculate range around current page
			const leftSibling = Math.max(currentPage - siblingCount, 2);
			const rightSibling = Math.min(currentPage + siblingCount, total - 1);

			// Add ellipsis after first page if needed
			if (leftSibling > 2) {
				pages.push('ellipsis');
			}

			// Add pages around current page
			for (let i = leftSibling; i <= rightSibling; i++) {
				pages.push(i);
			}

			// Add ellipsis before last page if needed
			if (rightSibling < total - 1) {
				pages.push('ellipsis');
			}

			// Always show last page if more than 1 page
			if (total > 1) {
				pages.push(total);
			}
		}

		return pages;
	});

	function handlePageChange(page: number) {
		if (page >= 1 && page <= calculatedTotalPages && page !== currentPage) {
			currentPage = page;
			if (onPageChange) {
				onPageChange(page);
			}
		}
	}

	function goToFirstPage() {
		handlePageChange(1);
	}

	function goToLastPage() {
		handlePageChange(calculatedTotalPages);
	}

	function goToPreviousPage() {
		handlePageChange(currentPage - 1);
	}

	function goToNextPage() {
		handlePageChange(currentPage + 1);
	}

	const styles = $derived(paginationVariants({ variant, size, showInfo }));
</script>

<nav class={styles.nav()} aria-label="Pagination" {...restProps}>
	{#if showInfo && totalItems}
		<div class={styles.info()}>
			Showing {startItem} to {endItem} of {totalItems} results
		</div>
	{/if}

	<ul class={styles.list()}>
		<!-- First Page Button -->
		{#if showFirstLast && calculatedTotalPages > 1}
			<li>
				<button
					class={styles.item()}
					disabled={currentPage === 1}
					onclick={goToFirstPage}
					aria-label="Go to first page"
				>
					<ChevronsLeft class="h-4 w-4" />
				</button>
			</li>
		{/if}

		<!-- Previous Page Button -->
		<li>
			<button
				class={styles.item()}
				disabled={currentPage === 1}
				onclick={goToPreviousPage}
				aria-label="Go to previous page"
			>
				<ChevronLeft class="h-4 w-4" />
			</button>
		</li>

		<!-- Page Numbers -->
		{#each pageNumbers as page}
			<li>
				{#if page === 'ellipsis'}
					<span class={styles.ellipsis()} aria-hidden="true">
						<MoreHorizontal class="h-4 w-4" />
					</span>
				{:else}
					<button
						class={styles.item()}
						data-active={page === currentPage}
						onclick={() => handlePageChange(page)}
						aria-label="Go to page {page}"
						aria-current={page === currentPage ? 'page' : undefined}
					>
						{page}
					</button>
				{/if}
			</li>
		{/each}

		<!-- Next Page Button -->
		<li>
			<button
				class={styles.item()}
				disabled={currentPage === calculatedTotalPages}
				onclick={goToNextPage}
				aria-label="Go to next page"
			>
				<ChevronRight class="h-4 w-4" />
			</button>
		</li>

		<!-- Last Page Button -->
		{#if showFirstLast && calculatedTotalPages > 1}
			<li>
				<button
					class={styles.item()}
					disabled={currentPage === calculatedTotalPages}
					onclick={goToLastPage}
					aria-label="Go to last page"
				>
					<ChevronsRight class="h-4 w-4" />
				</button>
			</li>
		{/if}
	</ul>
</nav>