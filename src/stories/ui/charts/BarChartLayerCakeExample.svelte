<script lang="ts">
	import { BarChartLayerCake } from '$lib/components/charts';

	let {
		animated = true,
		showGrid = true,
		showTooltip = true,
		containerWidth = undefined,
		containerHeight = 400
	} = $props();

	// Sample clinician compensation data
	const compensationData = [
		{ 
			label: 'Emergency Medicine', 
			value: 395000,
			metadata: { department: 'EM', providers: 12, wRVU: 8500 }
		},
		{ 
			label: 'Cardiology', 
			value: 485000,
			metadata: { department: 'Cardio', providers: 8, wRVU: 9200 }
		},
		{ 
			label: 'Orthopedics', 
			value: 520000,
			metadata: { department: 'Ortho', providers: 6, wRVU: 9800 }
		},
		{ 
			label: 'Family Medicine', 
			value: 285000,
			metadata: { department: 'FM', providers: 15, wRVU: 6500 }
		},
		{ 
			label: 'Radiology', 
			value: 445000,
			metadata: { department: 'Rad', providers: 10, wRVU: 8800 }
		}
	];

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(value);
	};

	const formatTooltip = (dataPoint: any) => {
		return `
			<div class="font-medium">${dataPoint.label}</div>
			<div>Avg Compensation: ${formatCurrency(dataPoint.value)}</div>
			<div class="text-xs opacity-75">Providers: ${dataPoint.metadata.providers} | wRVU: ${dataPoint.metadata.wRVU.toLocaleString()}</div>
		`;
	};

	function handleBarClick(dataPoint: any) {
		console.log('Clicked specialty:', dataPoint);
		alert(`Clicked: ${dataPoint.label}\nCompensation: ${formatCurrency(dataPoint.value)}`);
	}
</script>

<div class="p-4 bg-gray-50 min-h-screen">
	<div class="max-w-6xl mx-auto">
		<h3 class="text-2xl font-semibold mb-8 text-center">Layer Cake BarChart - Clinician Compensation</h3>

		<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
			<BarChartLayerCake
				data={compensationData}
				{animated}
				{showGrid}
				{showTooltip}
				{containerWidth}
				{containerHeight}
				title="Average Annual Compensation by Medical Specialty"
				xAxisLabel="Medical Specialties"
				yAxisLabel="Compensation ($)"
				formatValue={formatCurrency}
				formatTooltip={formatTooltip}
				onBarClick={handleBarClick}
			/>
		</div>

		<!-- Data Summary -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
				<h4 class="font-medium text-gray-900 mb-2">Highest Paid</h4>
				<div class="text-2xl font-bold text-green-600">
					{formatCurrency(Math.max(...compensationData.map(d => d.value)))}
				</div>
				<div class="text-sm text-gray-500">Orthopedics</div>
			</div>

			<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
				<h4 class="font-medium text-gray-900 mb-2">Average</h4>
				<div class="text-2xl font-bold text-blue-600">
					{formatCurrency(compensationData.reduce((sum, d) => sum + d.value, 0) / compensationData.length)}
				</div>
				<div class="text-sm text-gray-500">Across all specialties</div>
			</div>

			<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
				<h4 class="font-medium text-gray-900 mb-2">Total Providers</h4>
				<div class="text-2xl font-bold text-purple-600">
					{compensationData.reduce((sum, d) => sum + d.metadata.providers, 0)}
				</div>
				<div class="text-sm text-gray-500">Across all departments</div>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-gray-500">
			Layer Cake powered chart with D3 scaling. Click bars for details, hover for tooltips.
		</div>
	</div>
</div>