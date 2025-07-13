<script lang="ts">
  import { scaleLinear } from 'd3-scale';
  import ChartContainer from '../core/ChartContainer.svelte';
  import ChartAxis from '../core/ChartAxis.svelte';
  import ChartTooltip from '../core/ChartTooltip.svelte';
  import ChartLegend from '../core/ChartLegend.svelte';

  interface DataPoint {
    x: number;
    y: number;
    category?: string;
    size?: number;
    label?: string;
    [key: string]: any;
  }

  interface ScatterSeriesConfig {
    key: string;
    label: string;
    color: string;
    size?: number;
    opacity?: number;
    visible?: boolean;
  }

  interface Props {
    data: DataPoint[];
    width?: number;
    height?: number;
    series?: ScatterSeriesConfig[];
    xKey?: string;
    yKey?: string;
    categoryKey?: string;
    sizeKey?: string;
    xLabel?: string;
    yLabel?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    animate?: boolean;
    padding?: { top: number; right: number; bottom: number; left: number };
    pointSize?: number;
    colors?: string[];
  }

  let {
    data,
    width = 600,
    height = 400,
    series,
    xKey = 'x',
    yKey = 'y',
    categoryKey = 'category',
    sizeKey,
    xLabel = 'wRVU',
    yLabel = 'Compensation ($)',
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    animate = true,
    padding = { top: 20, right: 20, bottom: 60, left: 80 },
    pointSize = 6,
    colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6']
  }: Props = $props();

  // Tooltip state
  let tooltipData = $state(null);
  let tooltipVisible = $state(false);
  let mousePosition = $state({ x: 0, y: 0 });

  // Ensure data is always an array
  const chartData = $derived(() => Array.isArray(data) ? data : []);

  // Process data and determine series
  const processedData = $derived(() => {
    if (series) {
      // Use provided series configuration
      return series.map((s, i) => ({
        ...s,
        color: s.color || colors[i % colors.length],
        data: chartData().filter(d => d[categoryKey] === s.key)
      }));
    } else {
      // Auto-generate series from categories
      const categories = [...new Set(chartData().map(d => d[categoryKey]).filter(Boolean))];
      if (categories.length === 0) {
        // Single series
        return [{
          key: 'default',
          label: 'Data',
          color: colors[0],
          data: chartData(),
          visible: true
        }];
      } else {
        // Multiple series based on categories
        return categories.map((cat, i) => ({
          key: cat,
          label: String(cat),
          color: colors[i % colors.length],
          data: chartData().filter(d => d[categoryKey] === cat),
          visible: true
        }));
      }
    }
  });

  // Create scales
  const xScale = $derived(() => {
    const allData = processedData().flatMap(s => s.data);
    const xValues = allData.map(d => d[xKey]).filter(v => v != null);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const xPadding = (xMax - xMin) * 0.05;

    return scaleLinear()
      .domain([xMin - xPadding, xMax + xPadding])
      .range([0, width - padding.left - padding.right]);
  });

  const yScale = $derived(() => {
    const allData = processedData().flatMap(s => s.data);
    const yValues = allData.map(d => d[yKey]).filter(v => v != null);
    const yMin = Math.min(0, Math.min(...yValues));
    const yMax = Math.max(...yValues);
    const yPadding = (yMax - yMin) * 0.05;

    return scaleLinear()
      .domain([yMin - yPadding, yMax + yPadding])
      .range([height - padding.top - padding.bottom, 0]);
  });

  // Size scale for variable point sizes
  const sizeScale = $derived(() => {
    if (!sizeKey) return null;
    
    const allData = processedData().flatMap(s => s.data);
    const sizeValues = allData.map(d => d[sizeKey]).filter(v => v != null);
    const sizeMin = Math.min(...sizeValues);
    const sizeMax = Math.max(...sizeValues);

    return scaleLinear()
      .domain([sizeMin, sizeMax])
      .range([3, 12]);
  });

  // Generate scatter points
  const scatterPoints = $derived(() => {
    return processedData().flatMap(series => 
      series.data.map(point => ({
        x: xScale()(point[xKey]),
        y: yScale()(point[yKey]),
        size: sizeScale() ? sizeScale()(point[sizeKey]) : (series.size || pointSize),
        color: series.color,
        opacity: series.opacity || 0.7,
        data: point,
        series: series,
        visible: series.visible !== false
      }))
    );
  });

  // Legend items
  const legendItems = $derived(() => {
    return processedData().map(s => ({
      label: s.label,
      color: s.color,
      visible: s.visible !== false
    }));
  });

  // Handle legend toggle
  function handleLegendToggle(index: number, visible: boolean) {
    if (series) {
      series[index].visible = visible;
    } else {
      // Update auto-generated series
      processedData()[index].visible = visible;
    }
  }

  // Handle mouse events for tooltip
  function handleMouseMove(event: MouseEvent) {
    if (!showTooltip) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - padding.left;
    const y = event.clientY - rect.top - padding.top;

    // Find closest point within hover radius
    let closestPoint = null;
    let closestDistance = Infinity;
    const hoverRadius = 15;

    scatterPoints().forEach(point => {
      if (!point.visible) return;

      const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
      if (distance < hoverRadius && distance < closestDistance) {
        closestDistance = distance;
        closestPoint = point;
      }
    });

    if (closestPoint) {
      mousePosition = { x: event.clientX, y: event.clientY };
      tooltipData = {
        title: closestPoint.data.label || `${closestPoint.series.label} Point`,
        items: [
          {
            label: xLabel,
            value: closestPoint.data[xKey],
            color: closestPoint.color
          },
          {
            label: yLabel,
            value: formatYValue(closestPoint.data[yKey])
          },
          ...(sizeKey ? [{
            label: 'Size',
            value: closestPoint.data[sizeKey]
          }] : [])
        ]
      };
      tooltipVisible = true;
    } else {
      tooltipVisible = false;
    }
  }

  function handleMouseLeave() {
    tooltipVisible = false;
  }

  // Format Y axis values (compensation)
  function formatYValue(value: number): string {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  }

  // Format X axis values (wRVU)
  function formatXValue(value: number): string {
    return value.toLocaleString();
  }
</script>

<div class="scatter-plot-wrapper">
  <ChartContainer 
    data={data} 
    {width} 
    {height} 
    {padding}
    x={xKey}
    y={yKey}
    xScale={xScale()}
    yScale={yScale()}
  >
    {#snippet svg()}
      <!-- Grid lines -->
      {#if showGrid}
        <ChartAxis type="x" gridLines={true} format={formatXValue} />
        <ChartAxis type="y" gridLines={true} format={formatYValue} />
      {/if}

      <!-- Axes -->
      <ChartAxis type="x" label={xLabel} format={formatXValue} />
      <ChartAxis type="y" label={yLabel} format={formatYValue} />

      <!-- Scatter points -->
      {#each scatterPoints() as point, i}
        {#if point.visible}
          <circle
            class="scatter-point"
            class:animate-point={animate}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill={point.color}
            fill-opacity={point.opacity}
            stroke="white"
            stroke-width="1"
            style:animation-delay="{animate ? `${i * 20}ms` : '0ms'}"
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
    {/snippet}

    {#snippet html()}
      <!-- Tooltip -->
      {#if showTooltip}
        <ChartTooltip
          data={tooltipData}
          x={mousePosition.x}
          y={mousePosition.y}
          visible={tooltipVisible}
        />
      {/if}
    {/snippet}
  </ChartContainer>

  <!-- Legend -->
  {#if showLegend && legendItems().length > 1}
    <ChartLegend
      items={legendItems()}
      onToggle={handleLegendToggle}
      position="bottom"
    />
  {/if}
</div>

<style>
  .scatter-plot-wrapper {
    @apply w-full h-full flex flex-col;
  }

  .scatter-point {
    @apply transition-all duration-200;
    @apply cursor-pointer;
  }

  .scatter-point:hover {
    stroke-width: 2;
    r: calc(var(--point-size, 6) + 2);
    fill-opacity: 0.9;
  }

  .animate-point {
    opacity: 0;
    animation: fade-in-scale 0.5s ease-out forwards;
  }

  @keyframes fade-in-scale {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 0.7;
      transform: scale(1);
    }
  }

  .interaction-overlay {
    @apply cursor-crosshair;
  }

  /* Container query responsive adjustments */
  @container (max-width: 400px) {
    .scatter-point {
      r: 4;
    }

    .scatter-point:hover {
      r: 6;
    }
  }

  /* Clinical data specific styling */
  .scatter-point[data-department="cardiology"] {
    stroke: #ef4444;
  }

  .scatter-point[data-department="orthopedics"] {
    stroke: #10b981;
  }

  .scatter-point[data-department="radiology"] {
    stroke: #f59e0b;
  }
</style>