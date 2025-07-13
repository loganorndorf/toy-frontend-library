<script lang="ts">
	import { LineChart } from '$lib/components/charts';

	let {
		animated = true,
		showGrid = true,
		showTooltip = true,
		containerWidth = undefined,
		containerHeight = 400
	} = $props();

	// Sample quarterly compensation trend data
	const trendData = [
		{ 
			label: 'Q1 2023', 
			value: 285000,
			metadata: { quarter: 'Q1', year: 2023, providers: 45 }
		},
		{ 
			label: 'Q2 2023', 
			value: 292000,
			metadata: { quarter: 'Q2', year: 2023, providers: 47 }
		},
		{ 
			label: 'Q3 2023', 
			value: 298000,
			metadata: { quarter: 'Q3', year: 2023, providers: 48 }
		},
		{ 
			label: 'Q4 2023', 
			value: 305000,
			metadata: { quarter: 'Q4', year: 2023, providers: 50 }
		},
		{ 
			label: 'Q1 2024', 
			value: 312000,
			metadata: { quarter: 'Q1', year: 2024, providers: 52 }
		},
		{ 
			label: 'Q2 2024', 
			value: 318000,
			metadata: { quarter: 'Q2', year: 2024, providers: 54 }
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
			<div class="text-xs opacity-75">Active Providers: ${dataPoint.metadata.providers}</div>
		`;
	};

	function handlePointClick(dataPoint: any) {
		console.log('Clicked data point:', dataPoint);
		alert(`${dataPoint.label}\nCompensation: ${formatCurrency(dataPoint.value)}\nProviders: ${dataPoint.metadata.providers}`);
	}

	// Calculate growth metrics
	const totalGrowth = ((trendData[trendData.length - 1].value - trendData[0].value) / trendData[0].value) * 100;
	const avgGrowth = totalGrowth / (trendData.length - 1);
</script>

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-6xl mx-auto">
		<h3 class="text-2xl font-semibold mb-8 text-center">LineChart - Compensation Trends Over Time</h3>

		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-8">
			<LineChart
				data={trendData}
				{animated}
				{showGrid}
				{showTooltip}
				width={containerWidth}
				height={containerHeight}
				title="Average Quarterly Compensation Trends"
				xKey="label"
				yKey="value"
				xLabel="Quarter"
				yLabel="Compensation ($)"
			/>
		</div>

		<!-- Trend Analysis -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
				<h4 class="font-medium text-slate-900 mb-2">Total Growth</h4>
				<div class="text-2xl font-bold text-green-600">
					+{totalGrowth.toFixed(1)}%
				</div>
				<div class="text-sm text-slate-500">Since Q1 2023</div>
			</div>

			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
				<h4 class="font-medium text-slate-900 mb-2">Avg Quarterly Growth</h4>
				<div class="text-2xl font-bold text-blue-600">
					+{avgGrowth.toFixed(1)}%
				</div>
				<div class="text-sm text-slate-500">Per quarter</div>
			</div>

			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
				<h4 class="font-medium text-slate-900 mb-2">Latest Quarter</h4>
				<div class="text-2xl font-bold text-purple-600">
					{formatCurrency(trendData[trendData.length - 1].value)}
				</div>
				<div class="text-sm text-slate-500">{trendData[trendData.length - 1].label}</div>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-slate-500">
			Layer Cake line chart with smooth curves and animated drawing. Click points for details.
		</div>
	</div>
</div>