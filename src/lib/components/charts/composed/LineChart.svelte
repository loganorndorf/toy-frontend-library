<script lang="ts">
  import { scaleLinear, scaleTime } from 'd3-scale';
  import { line } from 'd3-shape';
  import { LayerCake, Svg } from 'layercake';
  import ChartAxis from '../core/ChartAxis.svelte';
  import ChartTooltip from '../core/ChartTooltip.svelte';
  import ChartLegend from '../core/ChartLegend.svelte';

  interface DataPoint {
    x: any; // Date or number
    y: number;
    series?: string;
    [key: string]: any;
  }

  interface LineSeriesConfig {
    key: string;
    label: string;
    color: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    visible?: boolean;
  }

  interface Props {
    data: DataPoint[];
    title?: string;
    width?: number;
    height?: number;
    series?: LineSeriesConfig[];
    xKey?: string;
    yKey?: string;
    xLabel?: string;
    yLabel?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    animate?: boolean;
    padding?: { top: number; right: number; bottom: number; left: number };
  }

  let {
    data,
    title,
    width = 600,
    height = 400,
    series = [{ key: 'default', label: 'Value', color: '#3b82f6' }],
    xKey = 'x',
    yKey = 'y',
    xLabel = '',
    yLabel = '',
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    animate = true,
    padding = { top: 20, right: 20, bottom: 60, left: 80 }
  }: Props = $props();

  // Tooltip state
  let tooltipData = $state(null);
  let tooltipVisible = $state(false);
  let mousePosition = $state({ x: 0, y: 0 });

  // Ensure data is always an array
  const chartData = $derived(() => Array.isArray(data) ? data : []);

  // Process data by series
  const processedData = $derived(() => {
    console.log('Processing data:', { 
      chartData: chartData(), 
      xKey, 
      yKey, 
      series 
    });
    
    if (series.length === 1 && series[0].key === 'default') {
      // Single series from data array
      const processed = [{
        key: 'default',
        data: chartData().map(d => ({ x: d[xKey], y: d[yKey], original: d })),
        config: series[0]
      }];
      console.log('Processed single series:', processed);
      return processed;
    } else {
      // Multiple series - group by series key
      return series.map(seriesConfig => {
        const seriesData = chartData().filter(d => d.series === seriesConfig.key || !d.series)
          .map(d => ({ x: d[xKey], y: d[yKey], original: d }));
        return {
          key: seriesConfig.key,
          data: seriesData,
          config: seriesConfig
        };
      });
    }
  });

  // Create scales
  const xScale = $derived(() => {
    const allData = processedData().flatMap(s => s.data);
    const xValues = allData.map(d => d.x);
    
    if (xValues[0] instanceof Date || typeof xValues[0] === 'string') {
      return scaleTime()
        .domain([new Date(Math.min(...xValues.map(v => new Date(v).getTime()))), 
                 new Date(Math.max(...xValues.map(v => new Date(v).getTime())))])
        .range([0, width - padding.left - padding.right]);
    } else {
      return scaleLinear()
        .domain([Math.min(...xValues), Math.max(...xValues)])
        .range([0, width - padding.left - padding.right]);
    }
  });

  const yScale = $derived(() => {
    const allData = processedData().flatMap(s => s.data);
    const yValues = allData.map(d => d.y);
    const yMin = Math.min(0, Math.min(...yValues));
    const yMax = Math.max(...yValues);
    const yPadding = (yMax - yMin) * 0.1;

    return scaleLinear()
      .domain([yMin - yPadding, yMax + yPadding])
      .range([height - padding.top - padding.bottom, 0]);
  });

  // Create line generator
  const lineGenerator = $derived(() => {
    const currentXScale = xScale();
    const currentYScale = yScale();
    console.log('Creating line generator with scales:', { currentXScale, currentYScale });
    
    return line()
      .x(d => currentXScale(d.x))
      .y(d => currentYScale(d.y));
  });

  // Generate line paths
  const linePaths = $derived(() => {
    const result = processedData().map(series => {
      const path = lineGenerator()(series.data);
      console.log('Generated path for series:', { 
        key: series.key, 
        dataLength: series.data.length, 
        path,
        sampleData: series.data.slice(0, 2)
      });
      return {
        ...series,
        path
      };
    });
    console.log('All line paths:', result);
    return result;
  });

  // Legend items
  const legendItems = $derived(() => {
    return series.map(s => ({
      label: s.label,
      color: s.color,
      visible: s.visible !== false
    }));
  });

  // Handle legend toggle
  function handleLegendToggle(index: number, visible: boolean) {
    series[index].visible = visible;
  }

  // Handle mouse events for tooltip
  function handleMouseMove(event: MouseEvent) {
    if (!showTooltip) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - padding.left;
    const y = event.clientY - rect.top - padding.top;

    // Find closest data point
    let closestPoint = null;
    let closestDistance = Infinity;
    let closestSeries = null;

    processedData().forEach(series => {
      if (series.config.visible === false) return;

      series.data.forEach(point => {
        const px = xScale()(point.x);
        const py = yScale()(point.y);
        const distance = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));

        if (distance < closestDistance && distance < 30) {
          closestDistance = distance;
          closestPoint = point;
          closestSeries = series;
        }
      });
    });

    if (closestPoint && closestSeries) {
      mousePosition = { x: event.clientX, y: event.clientY };
      tooltipData = {
        title: formatXValue(closestPoint.x),
        items: [{
          label: closestSeries.config.label,
          value: closestPoint.y,
          color: closestSeries.config.color
        }]
      };
      tooltipVisible = true;
    } else {
      tooltipVisible = false;
    }
  }

  function handleMouseLeave() {
    tooltipVisible = false;
  }

  // Format functions
  function formatXValue(value: any): string {
    if (value instanceof Date) {
      return value.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
    return String(value);
  }

  // Data points for hover detection
  const dataPoints = $derived(() => {
    const currentXScale = xScale();
    const currentYScale = yScale();
    
    const result = processedData().flatMap(series => 
      series.data.map(point => ({
        x: currentXScale(point.x),
        y: currentYScale(point.y),
        data: point,
        series: series.config
      }))
    );
    
    console.log('Data points calculated:', { 
      count: result.length, 
      sample: result.slice(0, 2) 
    });
    
    return result;
  });
</script>

<div class="line-chart-wrapper" style:width="{width}px" style:height="{height}px">
  {#if title}
    <h3 class="chart-title">{title}</h3>
  {/if}
  
  <LayerCake
    data={processedData().flatMap(s => s.data)}
    {padding}
    x="x"
    y="y"
    xScale={xScale()}
    yScale={yScale()}
    width={width - 32}
    height={height - 32 - (title ? 40 : 0)}
  >
    <Svg>
      <!-- Grid lines -->
      {#if showGrid}
        <ChartAxis type="x" gridLines={true} />
        <ChartAxis type="y" gridLines={true} />
      {/if}

      <!-- Axes -->
      <ChartAxis type="x" label={xLabel} />
      <ChartAxis type="y" label={yLabel} />

      <!-- Line paths -->
      {#each linePaths() as series}
        {#if series.config.visible !== false}
          <path
            class="line-path"
            class:animate-line={animate}
            d={series.path}
            stroke={series.config.color}
            stroke-width={series.config.strokeWidth || 2}
            stroke-dasharray={series.config.strokeDasharray || 'none'}
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        {/if}
      {/each}

      <!-- Data points for hover -->
      {#each dataPoints() as point}
        {#if point.series.visible !== false}
          <circle
            class="data-point"
            cx={point.x}
            cy={point.y}
            r="4"
            fill={point.series.color}
            stroke="white"
            stroke-width="2"
            opacity="0"
          />
        {/if}
      {/each}

      <!-- Interactive overlay -->
      <rect
        class="interaction-overlay"
        width={width - padding.left - padding.right}
        height={height - padding.top - padding.bottom}
        fill="transparent"
        onmousemove={handleMouseMove}
        onmouseleave={handleMouseLeave}
      />
    </Svg>
  </LayerCake>

  <!-- Tooltip -->
  {#if showTooltip}
    <ChartTooltip
      {tooltipData}
      x={mousePosition.x}
      y={mousePosition.y}
      visible={tooltipVisible}
    />
  {/if}

  <!-- Legend -->
  {#if showLegend && series.length > 1}
    <ChartLegend
      items={legendItems()}
      onToggle={handleLegendToggle}
      position="bottom"
    />
  {/if}
</div>

<style>
  .line-chart-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    position: relative;
  }
  
  .chart-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #374151;
  }

  .line-path {
    transition: all 0.3s ease-in-out;
  }

  .line-path:hover {
    stroke-width: 3;
  }

  .animate-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw-line 1s ease-out forwards;
  }

  @keyframes draw-line {
    to {
      stroke-dashoffset: 0;
    }
  }

  .data-point {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .data-point:hover {
    opacity: 1 !important;
    r: 6;
  }

  .interaction-overlay {
    @apply cursor-crosshair;
  }

  /* Container query responsive adjustments */
  @container (max-width: 400px) {
    .line-path {
      stroke-width: 1.5;
    }

    .data-point {
      r: 3;
    }
  }
</style>