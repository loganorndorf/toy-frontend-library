<script lang="ts">
	import DynamicChart from '$lib/components/charts/DynamicChart.svelte';

	let {
		chartType = 'bar',
		size = 'medium',
		containerHeight = 400
	} = $props();

	// Sample data for different chart types
	const compensationData = [
		{ 
			label: 'Emergency Medicine', 
			value: 395000,
			secondaryValue: 8500,
			metadata: { department: 'EM', providers: 12 }
		},
		{ 
			label: 'Cardiology', 
			value: 485000,
			secondaryValue: 9200,
			metadata: { department: 'Cardio', providers: 8 }
		},
		{ 
			label: 'Orthopedics', 
			value: 520000,
			secondaryValue: 9800,
			metadata: { department: 'Ortho', providers: 6 }
		},
		{ 
			label: 'Family Medicine', 
			value: 285000,
			secondaryValue: 6500,
			metadata: { department: 'FM', providers: 15 }
		},
		{ 
			label: 'Radiology', 
			value: 445000,
			secondaryValue: 8800,
			metadata: { department: 'Rad', providers: 10 }
		}
	];

	const trendData = [
		{ label: 'Q1 2023', value: 285000 },
		{ label: 'Q2 2023', value: 292000 },
		{ label: 'Q3 2023', value: 298000 },
		{ label: 'Q4 2023', value: 305000 },
		{ label: 'Q1 2024', value: 312000 },
		{ label: 'Q2 2024', value: 318000 }
	];

	const scatterData = compensationData.map(d => ({
		label: d.label,
		value: d.value,
		x: d.secondaryValue,
		y: d.value,
		metadata: d.metadata
	}));

	const comboData = [
		{ label: 'Jan', barValue: 285000, lineValue: 4200 },
		{ label: 'Feb', barValue: 292000, lineValue: 4350 },
		{ label: 'Mar', barValue: 298000, lineValue: 4450 },
		{ label: 'Apr', barValue: 305000, lineValue: 4600 },
		{ label: 'May', barValue: 312000, lineValue: 4750 }
	];

	// Dynamic chart configuration
	const chartConfigs = {
		bar: {
			id: 'dynamic-bar',
			type: 'bar',
			title: 'Compensation by Specialty',
			dataSource: { staticData: compensationData },
			dimensions: { x: 'label', y: 'value' },
			styling: { showGrid: true, showTooltip: true, animated: true },
			axes: {
				x: { label: 'Medical Specialties' },
				y: { 
					label: 'Compensation ($)',
					format: (value) => new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
						maximumFractionDigits: 0
					}).format(value)
				}
			}
		},
		line: {
			id: 'dynamic-line',
			type: 'line',
			title: 'Compensation Trends',
			dataSource: { staticData: trendData },
			dimensions: { x: 'label', y: 'value' },
			styling: { showGrid: true, showTooltip: true, animated: true },
			axes: {
				x: { label: 'Quarter' },
				y: { 
					label: 'Compensation ($)',
					format: (value) => new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
						maximumFractionDigits: 0
					}).format(value)
				}
			}
		},
		scatter: {
			id: 'dynamic-scatter',
			type: 'scatter',
			title: 'wRVU vs Compensation',
			dataSource: { staticData: scatterData },
			dimensions: { x: 'x', y: 'y' },
			styling: { showGrid: true, showTooltip: true, animated: true },
			axes: {
				x: { label: 'wRVU' },
				y: { 
					label: 'Compensation ($)',
					format: (value) => new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
						maximumFractionDigits: 0
					}).format(value)
				}
			}
		},
		combo: {
			id: 'dynamic-combo',
			type: 'combo',
			title: 'Compensation & wRVU Trends',
			dataSource: { staticData: comboData },
			dimensions: { x: 'label', y: 'barValue', y2: 'lineValue' },
			styling: { showGrid: true, showTooltip: true, animated: true, showLegend: true },
			axes: {
				x: { label: 'Month' },
				y: { 
					label: 'Compensation ($)',
					format: (value) => new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
						maximumFractionDigits: 0
					}).format(value)
				},
				y2: { 
					label: 'wRVU',
					format: (value) => value.toLocaleString()
				}
			}
		}
	};

	const currentConfig = $derived(chartConfigs[chartType]);

	function handleDataPointClick(dataPoint, chartType) {
		console.log('Data point clicked:', dataPoint, chartType);
		alert(`${chartType} chart clicked!\nData: ${JSON.stringify(dataPoint, null, 2)}`);
	}
</script>

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-6xl mx-auto">
		<h3 class="text-2xl font-semibold mb-8 text-center">DynamicChart - Config-Driven Charts</h3>

		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-8">
			<DynamicChart
				config={currentConfig}
				{size}
				{containerHeight}
				onDataPointClick={handleDataPointClick}
			/>
		</div>

		<!-- Configuration Display -->
		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-8">
			<h4 class="font-semibold mb-4">Current Configuration</h4>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
				<div>
					<span class="font-medium">Chart Type:</span>
					<span class="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-800 capitalize">
						{chartType}
					</span>
				</div>
				<div>
					<span class="font-medium">Size:</span>
					<span class="ml-2 px-2 py-1 rounded bg-green-100 text-green-800 capitalize">
						{size}
					</span>
				</div>
				<div>
					<span class="font-medium">Height:</span>
					<span class="ml-2 px-2 py-1 rounded bg-purple-100 text-purple-800">
						{containerHeight}px
					</span>
				</div>
			</div>

			<div class="mt-4">
				<h5 class="font-medium mb-2">Configuration Object:</h5>
				<pre class="bg-gray-50 p-3 rounded text-xs overflow-auto">
{JSON.stringify(currentConfig, null, 2)}
				</pre>
			</div>
		</div>

		<!-- Features -->
		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
			<h4 class="font-semibold mb-4">Dynamic Chart Features</h4>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h5 class="font-medium mb-2">Supported Chart Types:</h5>
					<ul class="space-y-1 text-sm text-gray-600">
						<li>• <strong>Bar:</strong> Categorical data comparison</li>
						<li>• <strong>Line:</strong> Trends over time</li>
						<li>• <strong>Scatter:</strong> Correlation analysis</li>
						<li>• <strong>Combo:</strong> Dual-axis combinations</li>
					</ul>
				</div>
				<div>
					<h5 class="font-medium mb-2">Key Features:</h5>
					<ul class="space-y-1 text-sm text-gray-600">
						<li>• Config-driven rendering</li>
						<li>• Responsive sizing</li>
						<li>• Dynamic data loading</li>
						<li>• Error handling</li>
						<li>• Custom formatters</li>
						<li>• Interactive callbacks</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-slate-500">
			Configuration-driven chart system powered by Layer Cake. Switch chart types to see different visualizations.
		</div>
	</div>
</div>