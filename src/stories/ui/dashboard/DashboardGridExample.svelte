<script lang="ts">
	import DashboardGrid from '$lib/components/dashboard/DashboardGrid.svelte';

	let {
		editMode = false,
		gridCols = 12,
		gridRows = 6
	} = $props();

	let dashboardConfig = $state({
		id: 'demo-dashboard',
		name: 'Demo Dashboard',
		gridCols,
		gridRows,
		widgets: [
			{
				id: 'chart-1',
				type: 'chart',
				title: 'Revenue Chart',
				layout: { x: 0, y: 0, w: 6, h: 3 },
				config: { type: 'bar' }
			},
			{
				id: 'chart-2',
				type: 'chart',
				title: 'Trends Line',
				layout: { x: 6, y: 0, w: 6, h: 3 },
				config: { type: 'line' }
			},
			{
				id: 'table-1',
				type: 'table',
				title: 'Data Table',
				layout: { x: 0, y: 3, w: 8, h: 3 },
				config: {}
			},
			{
				id: 'kpi-1',
				type: 'kpi',
				title: 'Key Metrics',
				layout: { x: 8, y: 3, w: 4, h: 3 },
				config: {}
			}
		]
	});

	function handleWidgetUpdate(widgetId, updates) {
		dashboardConfig.widgets = dashboardConfig.widgets.map(widget => 
			widget.id === widgetId ? { ...widget, ...updates } : widget
		);
		console.log('Widget updated:', widgetId, updates);
	}

	function handleWidgetRemove(widgetId) {
		dashboardConfig.widgets = dashboardConfig.widgets.filter(widget => widget.id !== widgetId);
		console.log('Widget removed:', widgetId);
	}

	function handleWidgetAdd(widget) {
		dashboardConfig.widgets = [...dashboardConfig.widgets, widget];
		console.log('Widget added:', widget);
	}

	// Update grid configuration when props change
	$effect(() => {
		dashboardConfig.gridCols = gridCols;
		dashboardConfig.gridRows = gridRows;
	});
</script>

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-full mx-auto">
		<div class="mb-8 text-center">
			<h3 class="text-2xl font-semibold mb-4">DashboardGrid Component</h3>
			<div class="inline-flex items-center gap-4 text-sm">
				<div class="flex items-center gap-2">
					<span>Grid: {gridCols}×{gridRows}</span>
				</div>
				<div class="flex items-center gap-2">
					<span>Mode:</span>
					<span class="px-2 py-1 rounded {editMode ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
						{editMode ? 'Edit' : 'View'}
					</span>
				</div>
				<div class="flex items-center gap-2">
					<span>Widgets: {dashboardConfig.widgets.length}</span>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden" style="height: 600px;">
			<DashboardGrid
				config={dashboardConfig}
				{editMode}
				onWidgetUpdate={handleWidgetUpdate}
				onWidgetRemove={handleWidgetRemove}
				onWidgetAdd={handleWidgetAdd}
			/>
		</div>

		<div class="mt-8 space-y-4">
			<!-- Instructions -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h4 class="font-semibold mb-4">How to Use</h4>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
					<div>
						<h5 class="font-medium mb-2">View Mode:</h5>
						<ul class="space-y-1 text-gray-600">
							<li>• Widgets display normally</li>
							<li>• Action buttons available in headers</li>
							<li>• No drag/resize functionality</li>
						</ul>
					</div>
					<div>
						<h5 class="font-medium mb-2">Edit Mode:</h5>
						<ul class="space-y-1 text-gray-600">
							<li>• Drag widgets to reposition</li>
							<li>• Visual grid overlay</li>
							<li>• Collision detection</li>
							<li>• Resize handles (if available)</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Widget Summary -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h4 class="font-semibold mb-4">Current Widgets</h4>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{#each dashboardConfig.widgets as widget}
						<div class="border border-gray-200 rounded-lg p-3">
							<div class="font-medium text-sm">{widget.title}</div>
							<div class="text-xs text-gray-500 mt-1">
								Type: <span class="capitalize">{widget.type}</span>
							</div>
							<div class="text-xs text-gray-500">
								Position: {widget.layout.x},{widget.layout.y}
							</div>
							<div class="text-xs text-gray-500">
								Size: {widget.layout.w}×{widget.layout.h}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-slate-500">
			Responsive grid system with drag/drop, collision detection, and real-time layout updates.
		</div>
	</div>
</div>