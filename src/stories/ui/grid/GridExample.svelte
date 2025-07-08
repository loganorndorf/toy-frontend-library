<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';

	let {
		cols = 3,
		rows,
		gap = 'md',
		flow = 'row'
	} = $props();

	// Generate grid items based on columns
	const itemCount = typeof cols === 'number' ? cols * 2 : 6;
	const items = Array.from({ length: itemCount }, (_, i) => i + 1);
</script>

<div class="p-8 bg-slate-50 min-h-96">
	<h3 class="text-lg font-semibold mb-4">Grid Example ({cols} columns)</h3>
	<div class="border-2 border-dashed border-slate-300 p-4 rounded-lg bg-white">
		<Grid {cols} {rows} {gap} {flow}>
			{#snippet children()}
				{#each items as item}
					<div class="bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 p-4 rounded-md text-center">
						<strong class="text-slate-900">Item {item}</strong>
						<div class="text-xs text-slate-600 mt-1">Grid item {item}</div>
					</div>
				{/each}
			{/snippet}
		</Grid>
	</div>
</div>