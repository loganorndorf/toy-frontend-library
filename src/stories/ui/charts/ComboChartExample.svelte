<script lang="ts">
	import ComboChart from '$lib/components/charts/composed/ComboChart.svelte';

	let {
		animated = true,
		showGrid = true,
		showTooltip = true,
		showLegend = true,
		containerWidth = undefined,
		containerHeight = 400
	} = $props();

	// Sample compensation vs wRVU data
	const comboData = [
		{ 
			label: 'Jan 2024', 
			barValue: 285000,
			lineValue: 4200,
			metadata: { month: 'January', providers: 45, cases: 1240 }
		},
		{ 
			label: 'Feb 2024', 
			barValue: 292000,
			lineValue: 4350,
			metadata: { month: 'February', providers: 47, cases: 1290 }
		},
		{ 
			label: 'Mar 2024', 
			barValue: 298000,
			lineValue: 4450,
			metadata: { month: 'March', providers: 48, cases: 1340 }
		},
		{ 
			label: 'Apr 2024', 
			barValue: 305000,
			lineValue: 4600,
			metadata: { month: 'April', providers: 50, cases: 1380 }
		},
		{ 
			label: 'May 2024', 
			barValue: 312000,
			lineValue: 4750,
			metadata: { month: 'May', providers: 52, cases: 1420 }
		},
		{ 
			label: 'Jun 2024', 
			barValue: 318000,
			lineValue: 4850,
			metadata: { month: 'June', providers: 54, cases: 1450 }
		}
	];

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(value);
	};

	const formatwRVU = (value: number) => {
		return value.toLocaleString();
	};

	const formatTooltip = (dataPoint: any) => {
		return `
			<div class="font-medium">${dataPoint.label}</div>
			<div>Compensation: ${formatCurrency(dataPoint.barValue)}</div>
			<div>wRVU: ${formatwRVU(dataPoint.lineValue)}</div>
			<div class="text-xs opacity-75">Providers: ${dataPoint.metadata.providers} | Cases: ${dataPoint.metadata.cases}</div>
		`;
	};

	function handleBarClick(dataPoint: any) {
		console.log('Clicked bar:', dataPoint);
		alert(`${dataPoint.metadata.month} Compensation\n${formatCurrency(dataPoint.barValue)}`);
	}

	function handleLineClick(dataPoint: any) {
		console.log('Clicked line point:', dataPoint);
		alert(`${dataPoint.metadata.month} wRVU\n${formatwRVU(dataPoint.lineValue)}`);
	}

	// Calculate correlation
	const avgCompensation = comboData.reduce((sum, d) => sum + d.barValue, 0) / comboData.length;
	const avgwRVU = comboData.reduce((sum, d) => sum + d.lineValue, 0) / comboData.length;
</script>

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-6xl mx-auto">
		<h3 class="text-2xl font-semibold mb-8 text-center">ComboChart - Compensation vs wRVU Trends</h3>

		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-8">
			<ComboChart
				data={comboData}
				{animated}
				{showGrid}
				{showTooltip}
				{showLegend}
				{containerWidth}
				{containerHeight}
				title="Monthly Compensation & wRVU Performance"
				xAxisLabel="Month"
				yAxisLabel="Compensation ($)"
				y2AxisLabel="wRVU"
				barLabel="Compensation"
				lineLabel="wRVU"
				formatBarValue={formatCurrency}
				formatLineValue={formatwRVU}
				formatTooltip={formatTooltip}
				onBarClick={handleBarClick}
				onLineClick={handleLineClick}
			/>
		</div>

		<!-- Analysis -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
				<h4 class="font-medium text-slate-900 mb-2">Avg Compensation</h4>
				<div class="text-2xl font-bold text-blue-600">
					{formatCurrency(avgCompensation)}
				</div>
				<div class="text-sm text-slate-500">Per month</div>
			</div>

			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
				<h4 class="font-medium text-slate-900 mb-2">Avg wRVU</h4>
				<div class="text-2xl font-bold text-emerald-600">
					{formatwRVU(avgwRVU)}
				</div>
				<div class="text-sm text-slate-500">Per month</div>
			</div>

			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
				<h4 class="font-medium text-slate-900 mb-2">Latest Month</h4>
				<div class="text-lg font-bold text-purple-600">
					{formatCurrency(comboData[comboData.length - 1].barValue)}
				</div>
				<div class="text-lg font-bold text-purple-600">
					{formatwRVU(comboData[comboData.length - 1].lineValue)} wRVU
				</div>
				<div class="text-sm text-slate-500">{comboData[comboData.length - 1].metadata.month}</div>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-slate-500">
			Dual-axis chart combining bars and line series. Click elements for detailed views.
		</div>
	</div>
</div>