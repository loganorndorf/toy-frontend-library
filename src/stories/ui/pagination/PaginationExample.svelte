<script lang="ts">
	import Pagination from '$lib/components/ui/Pagination.svelte';

	let {
		variant = 'default',
		size = 'md',
		totalPages = 10,
		totalItems = 100,
		itemsPerPage = 10,
		showInfo = true,
		showFirstLast = true,
		siblingCount = 1
	} = $props();

	let currentPage = $state(1);

	function handlePageChange(page: number) {
		currentPage = page;
		console.log('Page changed to:', page);
	}

	// Sample data to simulate pagination
	const sampleData = Array.from({ length: totalItems }, (_, i) => ({
		id: i + 1,
		name: `Item ${i + 1}`,
		description: `This is sample item number ${i + 1}`
	}));

	// Calculate which items to show for current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = sampleData.slice(startIndex, endIndex);
</script>

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-4xl mx-auto">
		<h3 class="text-xl font-semibold mb-6 text-center">Pagination Example</h3>
		
		<!-- Sample Data Display -->
		<div class="bg-white rounded-lg border border-slate-200 shadow-sm mb-6">
			<div class="p-4 border-b border-slate-200">
				<h4 class="font-medium text-slate-900">Sample Data (Page {currentPage})</h4>
			</div>
			<div class="divide-y divide-slate-200">
				{#each currentItems as item}
					<div class="p-4 flex items-center justify-between">
						<div>
							<div class="font-medium text-slate-900">{item.name}</div>
							<div class="text-sm text-slate-500">{item.description}</div>
						</div>
						<div class="text-xs text-slate-400">ID: {item.id}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Pagination Component -->
		<div class="flex justify-center">
			<Pagination
				{variant}
				{size}
				{totalPages}
				{totalItems}
				{itemsPerPage}
				{showInfo}
				{showFirstLast}
				{siblingCount}
				bind:currentPage
				onPageChange={handlePageChange}
			/>
		</div>

		<!-- Current State Info -->
		<div class="mt-6 text-center text-sm text-slate-600">
			<div>Current Page: {currentPage}</div>
			<div>Total Pages: {totalPages}</div>
			<div>Items per Page: {itemsPerPage}</div>
		</div>
	</div>
</div>