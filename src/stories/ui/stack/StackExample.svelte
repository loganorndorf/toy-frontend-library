<script lang="ts">
	import Stack from '$lib/components/ui/Stack.svelte';

	let {
		direction = 'vertical',
		spacing = 'md',
		align = 'stretch',
		justify = 'start'
	} = $props();
</script>

<div class="p-8 bg-slate-50 min-h-96">
	<h3 class="text-lg font-semibold mb-4">Stack Example ({direction})</h3>
	<div class="border-2 border-dashed border-slate-300 p-4 rounded-lg bg-white">
		<Stack {direction} {spacing} {align} {justify}>
			{#snippet children()}
				<div class="bg-blue-100 border border-blue-300 p-4 rounded-md text-center">
					<strong class="text-blue-900">First Item</strong>
					<div class="text-sm text-blue-700 mt-1">This is the first item in the stack</div>
				</div>
				<div class="bg-green-100 border border-green-300 p-4 rounded-md text-center">
					<strong class="text-green-900">Second Item</strong>
					<div class="text-sm text-green-700 mt-1">This is the second item in the stack</div>
				</div>
				<div class="bg-yellow-100 border border-yellow-300 p-4 rounded-md text-center">
					<strong class="text-yellow-900">Third Item</strong>
					<div class="text-sm text-yellow-700 mt-1">This is the third item in the stack</div>
				</div>
			{/snippet}
		</Stack>
	</div>
</div>