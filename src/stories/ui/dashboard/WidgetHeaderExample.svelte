<script lang="ts">
	import WidgetHeader from '$lib/components/dashboard/WidgetHeader.svelte';

	let {
		editMode = false,
		showActions = true,
		draggable = true,
		widgetType = 'chart'
	} = $props();

	const sampleConfig = {
		id: 'sample-widget',
		title: 'Sample Widget Title',
		type: widgetType
	};

	function handleEdit(config) {
		console.log('Edit widget:', config);
		alert(`Edit: ${config.title}`);
	}

	function handleRemove(config) {
		console.log('Remove widget:', config);
		alert(`Remove: ${config.title}`);
	}

	function handleFullscreen(config) {
		console.log('Fullscreen widget:', config);
		alert(`Fullscreen: ${config.title}`);
	}

	function handleRefresh(config) {
		console.log('Refresh widget:', config);
		alert(`Refresh: ${config.title}`);
	}

	function handleDragStart(event) {
		console.log('Drag start:', event);
	}
</script>

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-4xl mx-auto">
		<h3 class="text-2xl font-semibold mb-8 text-center">WidgetHeader Component</h3>

		<div class="space-y-8">
			<!-- Normal Mode -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
				<WidgetHeader
					config={sampleConfig}
					{editMode}
					{showActions}
					{draggable}
					onEdit={handleEdit}
					onRemove={handleRemove}
					onFullscreen={handleFullscreen}
					onRefresh={handleRefresh}
					onDragStart={handleDragStart}
				/>
				<div class="p-6 bg-gray-50">
					<p class="text-gray-600">Widget content area</p>
				</div>
			</div>

			<!-- Different Widget Types -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
					<WidgetHeader
						config={{ id: 'chart-widget', title: 'Chart Widget', type: 'chart' }}
						{editMode}
						{showActions}
						{draggable}
						onEdit={handleEdit}
						onRemove={handleRemove}
						onFullscreen={handleFullscreen}
						onRefresh={handleRefresh}
					/>
					<div class="p-4 bg-blue-50 text-center">
						📊 Chart Content
					</div>
				</div>

				<div class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
					<WidgetHeader
						config={{ id: 'table-widget', title: 'Data Table', type: 'table' }}
						{editMode}
						{showActions}
						{draggable}
						onEdit={handleEdit}
						onRemove={handleRemove}
						onFullscreen={handleFullscreen}
						onRefresh={handleRefresh}
					/>
					<div class="p-4 bg-green-50 text-center">
						📋 Table Content
					</div>
				</div>

				<div class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
					<WidgetHeader
						config={{ id: 'kpi-widget', title: 'KPI Metrics', type: 'kpi' }}
						{editMode}
						{showActions}
						{draggable}
						onEdit={handleEdit}
						onRemove={handleRemove}
						onFullscreen={handleFullscreen}
						onRefresh={handleRefresh}
					/>
					<div class="p-4 bg-purple-50 text-center">
						📈 KPI Content
					</div>
				</div>
			</div>

			<!-- Configuration Display -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h4 class="font-semibold mb-4">Current Configuration</h4>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
					<div>
						<span class="font-medium">Edit Mode:</span>
						<span class="ml-2 px-2 py-1 rounded {editMode ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
							{editMode ? 'On' : 'Off'}
						</span>
					</div>
					<div>
						<span class="font-medium">Actions:</span>
						<span class="ml-2 px-2 py-1 rounded {showActions ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
							{showActions ? 'Shown' : 'Hidden'}
						</span>
					</div>
					<div>
						<span class="font-medium">Draggable:</span>
						<span class="ml-2 px-2 py-1 rounded {draggable ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}">
							{draggable ? 'Yes' : 'No'}
						</span>
					</div>
					<div>
						<span class="font-medium">Type:</span>
						<span class="ml-2 px-2 py-1 rounded bg-orange-100 text-orange-800 capitalize">
							{widgetType}
						</span>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-slate-500">
			Interactive widget header with configurable actions and drag functionality.
		</div>
	</div>
</div>