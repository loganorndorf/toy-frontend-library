<script lang="ts">
  import { 
    BarChartLayerCake, 
    LineChart, 
    ScatterPlot, 
    ComboChart,
    DynamicChart 
  } from '$lib/components/charts';

  // Sample compensation data
  const compensationData = [
    { label: 'Dr. Smith', value: 285000, metadata: { department: 'Cardiology', wRVU: 4200 } },
    { label: 'Dr. Johnson', value: 312000, metadata: { department: 'Orthopedics', wRVU: 4800 } },
    { label: 'Dr. Williams', value: 275000, metadata: { department: 'Internal Medicine', wRVU: 3900 } },
    { label: 'Dr. Brown', value: 298000, metadata: { department: 'Emergency', wRVU: 4100 } },
    { label: 'Dr. Davis', value: 325000, metadata: { department: 'Surgery', wRVU: 5200 } },
    { label: 'Dr. Miller', value: 265000, metadata: { department: 'Family Practice', wRVU: 3600 } }
  ];

  // Trend data for line chart
  const trendData = [
    { label: 'Q1 2024', value: 285000 },
    { label: 'Q2 2024', value: 292000 },
    { label: 'Q3 2024', value: 298000 },
    { label: 'Q4 2024', value: 305000 },
    { label: 'Q1 2025', value: 312000 }
  ];

  // Scatter plot data (wRVU vs Compensation)
  const scatterData = compensationData.map(d => ({
    label: d.label,
    value: d.value,
    x: d.metadata.wRVU,
    y: d.value,
    metadata: d.metadata
  }));

  // Combo chart data
  const comboData = [
    { label: 'Jan', barValue: 285000, lineValue: 4200 },
    { label: 'Feb', barValue: 292000, lineValue: 4350 },
    { label: 'Mar', barValue: 298000, lineValue: 4450 },
    { label: 'Apr', barValue: 305000, lineValue: 4600 },
    { label: 'May', barValue: 312000, lineValue: 4750 }
  ];

  // Dynamic chart config
  const dynamicConfig = {
    id: 'demo-chart',
    type: 'bar' as const,
    title: 'Dynamic Chart Demo',
    dataSource: {
      staticData: compensationData
    },
    dimensions: {
      x: 'label',
      y: 'value'
    },
    styling: {
      showGrid: true,
      showTooltip: true,
      animated: true
    },
    axes: {
      x: { label: 'Physicians' },
      y: { 
        label: 'Compensation ($)',
        format: (value: number) => `$${(value / 1000).toFixed(0)}K`
      }
    }
  };
</script>

<svelte:head>
  <title>Chart Components Demo</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-slate-900 mb-2">Chart Components Demo</h1>
    <p class="text-slate-600">Showcase of Layer Cake powered chart components with clinical compensation data</p>
  </div>

  <!-- Layer Cake Bar Chart -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-slate-800 mb-4">Layer Cake Bar Chart</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <BarChartLayerCake
        data={compensationData}
        title="Physician Compensation by Provider"
        xAxisLabel="Physicians"
        yAxisLabel="Compensation ($)"
        formatValue={(value) => `$${(value / 1000).toFixed(0)}K`}
        containerHeight={400}
        animated={true}
        showGrid={true}
        showTooltip={true}
      />
    </div>
  </section>

  <!-- Line Chart -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-slate-800 mb-4">Line Chart</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <LineChart
        data={trendData}
        title="Compensation Trend Over Time"
        xAxisLabel="Quarter"
        yAxisLabel="Average Compensation ($)"
        formatValue={(value) => `$${(value / 1000).toFixed(0)}K`}
        containerHeight={400}
        animated={true}
        showGrid={true}
      />
    </div>
  </section>

  <!-- Scatter Plot -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-slate-800 mb-4">Scatter Plot</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <ScatterPlot
        data={scatterData}
        title="wRVU vs Compensation Analysis"
        xAxisLabel="wRVU"
        yAxisLabel="Compensation ($)"
        formatValue={(value) => `$${(value / 1000).toFixed(0)}K`}
        containerHeight={400}
        animated={true}
        showGrid={true}
      />
    </div>
  </section>

  <!-- Combo Chart -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-slate-800 mb-4">Combo Chart</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <ComboChart
        data={comboData}
        title="Compensation & wRVU Trends"
        xAxisLabel="Month"
        yAxisLabel="Compensation ($)"
        y2AxisLabel="wRVU"
        barLabel="Compensation"
        lineLabel="wRVU"
        formatBarValue={(value) => `$${(value / 1000).toFixed(0)}K`}
        formatLineValue={(value) => `${value.toLocaleString()}`}
        containerHeight={400}
        animated={true}
        showGrid={true}
        showLegend={true}
      />
    </div>
  </section>

  <!-- Dynamic Chart -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-slate-800 mb-4">Dynamic Chart</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <DynamicChart
        config={dynamicConfig}
        containerHeight={400}
        size="large"
      />
    </div>
  </section>

  <!-- Size Variations -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-slate-800 mb-4">Size Variations</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-lg font-medium mb-3">Small</h3>
        <BarChartLayerCake
          data={compensationData.slice(0, 4)}
          title="Small Chart"
          containerHeight={200}
          padding={{ top: 10, right: 10, bottom: 30, left: 40 }}
          animated={true}
        />
      </div>
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-lg font-medium mb-3">Medium</h3>
        <BarChartLayerCake
          data={compensationData.slice(0, 4)}
          title="Medium Chart"
          containerHeight={250}
          padding={{ top: 15, right: 30, bottom: 40, left: 50 }}
          animated={true}
        />
      </div>
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-lg font-medium mb-3">Large</h3>
        <BarChartLayerCake
          data={compensationData.slice(0, 4)}
          title="Large Chart"
          containerHeight={300}
          padding={{ top: 20, right: 40, bottom: 50, left: 60 }}
          animated={true}
        />
      </div>
    </div>
  </section>
</div>