<script lang="ts">
	import GridOverlay from '$lib/components/dashboard/GridOverlay.svelte';

	let {
		gridCols = 12,
		gridRows = 6,
		showGrid = true,
		cellGap = 8,
		opacity = 0.3
	} = $props();
</script>

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-6xl mx-auto">
		<h3 class="text-2xl font-semibold mb-8 text-center">GridOverlay Component</h3>

		<div class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-8" style="height: 400px;">
			<div class="relative h-full p-4" style="display: grid; grid-template-columns: repeat({gridCols}, 1fr); grid-template-rows: repeat({gridRows}, 1fr); gap: {cellGap}px;">
				
				<!-- Some sample content to show overlay interaction -->
				<div class="bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-blue-800 text-sm font-medium" style="grid-column: 1 / 5; grid-row: 1 / 3;">
					Sample Widget 1
				</div>
				
				<div class="bg-green-100 border border-green-300 rounded flex items-center justify-center text-green-800 text-sm font-medium" style="grid-column: 5 / 9; grid-row: 1 / 3;">
					Sample Widget 2
				</div>
				
				<div class="bg-purple-100 border border-purple-300 rounded flex items-center justify-center text-purple-800 text-sm font-medium" style="grid-column: 9 / 13; grid-row: 1 / 4;">
					Sample Widget 3
				</div>
				
				<div class="bg-orange-100 border border-orange-300 rounded flex items-center justify-center text-orange-800 text-sm font-medium" style="grid-column: 1 / 7; grid-row: 3 / 5;">
					Sample Widget 4
				</div>
				
				<div class="bg-pink-100 border border-pink-300 rounded flex items-center justify-center text-pink-800 text-sm font-medium" style="grid-column: 7 / 9; grid-row: 4 / 6;">
					Widget 5
				</div>

				<!-- Grid Overlay -->
				<GridOverlay 
					{gridCols}
					{gridRows}
					{showGrid}
					{cellGap}
					{opacity}
				/>
			</div>
		</div>

		<!-- Configuration -->
		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-8">
			<h4 class="font-semibold mb-4">Current Configuration</h4>
			<div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
				<div>
					<span class="font-medium">Columns:</span>
					<span class="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-800">
						{gridCols}
					</span>
				</div>
				<div>
					<span class="font-medium">Rows:</span>
					<span class="ml-2 px-2 py-1 rounded bg-green-100 text-green-800">
						{gridRows}
					</span>
				</div>
				<div>
					<span class="font-medium">Gap:</span>
					<span class="ml-2 px-2 py-1 rounded bg-purple-100 text-purple-800">
						{cellGap}px
					</span>
				</div>
				<div>
					<span class="font-medium">Opacity:</span>
					<span class="ml-2 px-2 py-1 rounded bg-orange-100 text-orange-800">
						{opacity}
					</span>
				</div>
				<div>
					<span class="font-medium">Visible:</span>
					<span class="ml-2 px-2 py-1 rounded {showGrid ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}">
						{showGrid ? 'Yes' : 'No'}
					</span>
				</div>
			</div>
		</div>

		<!-- Feature Description -->
		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
			<h4 class="font-semibold mb-4">GridOverlay Features</h4>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h5 class="font-medium mb-2">Visual Feedback:</h5>
					<ul class="space-y-1 text-sm text-gray-600">
						<li>• Dashed grid lines for cell boundaries</li>
						<li>• Configurable opacity and styling</li>
						<li>• Responsive to grid configuration</li>
						<li>• CSS-based cell highlighting</li>
					</ul>
				</div>
				<div>
					<h5 class="font-medium mb-2">Use Cases:</h5>
					<ul class="space-y-1 text-sm text-gray-600">
						<li>• Dashboard edit mode visualization</li>
						<li>• Widget placement guidance</li>
						<li>• Grid system debugging</li>
						<li>• Alignment reference</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-slate-500">
			Visual grid overlay component for dashboard editing interfaces.
		</div>
	</div>
</div>