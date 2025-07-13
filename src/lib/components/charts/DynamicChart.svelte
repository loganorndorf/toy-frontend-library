<script lang="ts">
  import BarChartLayerCake from './composed/BarChartLayerCake.svelte';
  import LineChart from './composed/LineChart.svelte';
  import ScatterPlot from './composed/ScatterPlot.svelte';
  import ComboChart from './composed/ComboChart.svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface DataSourceConfig {
    endpoint?: string;
    staticData?: any[];
    transform?: (data: any[]) => any[];
  }

  interface DimensionsConfig {
    x: string;
    y: string;
    y2?: string;
    color?: string;
    size?: string;
  }

  interface StylingConfig {
    colors?: string[];
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    animated?: boolean;
  }

  interface AxesConfig {
    x?: {
      label?: string;
      format?: (value: any) => string;
    };
    y?: {
      label?: string;
      format?: (value: number) => string;
    };
    y2?: {
      label?: string;
      format?: (value: number) => string;
    };
  }

  interface ChartConfig {
    id: string;
    type: 'line' | 'bar' | 'scatter' | 'combo';
    title?: string;
    dataSource: DataSourceConfig;
    dimensions: DimensionsConfig;
    styling?: StylingConfig;
    axes?: AxesConfig;
  }

  interface Props extends HTMLAttributes<HTMLDivElement> {
    config: ChartConfig;
    containerWidth?: number;
    containerHeight?: number;
    size?: 'small' | 'medium' | 'large';
    onDataPointClick?: (dataPoint: any, chartType: string) => void;
  }

  let {
    config,
    containerWidth,
    containerHeight,
    size = 'medium',
    onDataPointClick,
    ...restProps
  }: Props = $props();

  let data = $state<any[]>([]);
  let loading = $state(false);
  let error = $state<string | null>(null);

  // Responsive sizing based on container size
  const responsiveConfig = $derived(() => {
    const baseConfig = {
      showGrid: config.styling?.showGrid ?? true,
      showTooltip: config.styling?.showTooltip ?? true,
      showLegend: config.styling?.showLegend ?? true,
      animated: config.styling?.animated ?? true,
    };

    // Adjust features based on size
    if (size === 'small') {
      return {
        ...baseConfig,
        showLegend: false,
        padding: { top: 10, right: 10, bottom: 30, left: 40 },
      };
    } else if (size === 'medium') {
      return {
        ...baseConfig,
        padding: { top: 20, right: 40, bottom: 50, left: 60 },
      };
    } else {
      return {
        ...baseConfig,
        padding: { top: 30, right: 60, bottom: 70, left: 80 },
      };
    }
  });

  // Load data from config
  async function loadData() {
    loading = true;
    error = null;

    try {
      let rawData: any[] = [];

      if (config.dataSource.endpoint) {
        // Fetch from API
        const response = await fetch(config.dataSource.endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        rawData = await response.json();
      } else if (config.dataSource.staticData) {
        // Use static data
        rawData = config.dataSource.staticData;
      }

      // Apply transform if provided
      if (config.dataSource.transform) {
        rawData = config.dataSource.transform(rawData);
      }

      data = rawData;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load data';
      console.error('DynamicChart data loading error:', err);
    } finally {
      loading = false;
    }
  }

  // Load data when config changes
  $effect(() => {
    loadData();
  });

  // Map data to chart-specific format
  const chartData = $derived(() => {
    if (!data.length) return [];

    return data.map((item, index) => {
      const result: any = {
        label: item[config.dimensions.x] || 'Unknown',
        value: item[config.dimensions.y] || 0,
        metadata: item
      };

      // For LineChart compatibility, add x and y properties
      if (config.type === 'line') {
        result.x = index; // Use index for x-axis positioning
        result.y = item[config.dimensions.y] || 0;
      }

      // Add additional dimensions for specific chart types
      if (config.type === 'combo' && config.dimensions.y2) {
        result.barValue = item[config.dimensions.y] || 0;
        result.lineValue = item[config.dimensions.y2] || 0;
      }

      if (config.type === 'scatter') {
        result.x = item[config.dimensions.x] || 0;
        result.y = item[config.dimensions.y] || 0;
      }

      if (config.dimensions.color) {
        result.color = item[config.dimensions.color];
      }

      if (config.dimensions.size) {
        result.size = item[config.dimensions.size];
      }

      return result;
    });
  });

  function handleDataPointClick(dataPoint: any) {
    onDataPointClick?.(dataPoint, config.type);
  }
</script>

<div class="dynamic-chart-container" {...restProps}>
  {#if loading}
    <div class="flex items-center justify-center h-full min-h-[200px]">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="ml-2 text-slate-600">Loading chart data...</span>
    </div>
  {:else if error}
    <div class="flex items-center justify-center h-full min-h-[200px]">
      <div class="text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-600 font-medium">Failed to load chart</p>
        <p class="text-slate-500 text-sm mt-1">{error}</p>
        <button 
          class="mt-3 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onclick={loadData}
        >
          Retry
        </button>
      </div>
    </div>
  {:else if config.type === 'bar'}
    <BarChartLayerCake
      data={chartData}
      title={config.title}
      xAxisLabel={config.axes?.x?.label}
      yAxisLabel={config.axes?.y?.label}
      formatValue={config.axes?.y?.format}
      formatTooltip={config.axes?.y?.format ? (d) => `${d.label}: ${config.axes.y.format(d.value)}` : undefined}
      onBarClick={handleDataPointClick}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      colorScheme="gradient"
      theme="light"
      {...responsiveConfig}
    />
  {:else if config.type === 'line'}
    <LineChart
      data={chartData}
      title={config.title}
      xAxisLabel={config.axes?.x?.label}
      yAxisLabel={config.axes?.y?.label}
      formatValue={config.axes?.y?.format}
      onPointClick={handleDataPointClick}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      colorScheme="gradient"
      theme="light"
      {...responsiveConfig}
    />
  {:else if config.type === 'scatter'}
    <ScatterPlot
      data={chartData}
      title={config.title}
      xAxisLabel={config.axes?.x?.label}
      yAxisLabel={config.axes?.y?.label}
      formatValue={config.axes?.y?.format}
      formatTooltip={config.axes?.y?.format ? (d) => `${d.label}: ${config.axes.y.format(d.value)}` : undefined}
      onPointClick={handleDataPointClick}
      {containerWidth}
      {containerHeight}
      {...responsiveConfig}
    />
  {:else if config.type === 'combo'}
    <ComboChart
      data={chartData}
      title={config.title}
      xAxisLabel={config.axes?.x?.label}
      yAxisLabel={config.axes?.y?.label}
      y2AxisLabel={config.axes?.y2?.label}
      formatBarValue={config.axes?.y?.format}
      formatLineValue={config.axes?.y2?.format}
      onBarClick={handleDataPointClick}
      onLineClick={(d) => handleDataPointClick(d)}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
      colorScheme="gradient"
      theme="light"
      {...responsiveConfig}
    />
  {:else}
    <div class="flex items-center justify-center h-full min-h-[200px]">
      <div class="text-center">
        <svg class="w-12 h-12 text-yellow-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <p class="text-yellow-600 font-medium">Unsupported chart type</p>
        <p class="text-slate-500 text-sm mt-1">Chart type "{config.type}" is not supported</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .dynamic-chart-container {
    @apply w-full h-full;
  }
</style>