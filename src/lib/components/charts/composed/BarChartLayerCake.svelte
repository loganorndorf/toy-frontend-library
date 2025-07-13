<script lang="ts">
  import { LayerCake, Svg } from 'layercake';
  import { scaleBand, scaleLinear } from 'd3-scale';
  import ChartAxis from '../core/ChartAxis.svelte';
  import ChartTooltip from '../core/ChartTooltip.svelte';
  import Bars from '../layers/Bars.svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface DataPoint {
    label: string;
    value: number;
    color?: string;
    metadata?: Record<string, any>;
  }

  interface Props extends HTMLAttributes<HTMLDivElement> {
    data: DataPoint[];
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    animated?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    formatValue?: (value: number) => string;
    formatTooltip?: (dataPoint: DataPoint) => string;
    onBarClick?: (dataPoint: DataPoint) => void;
    padding?: { top?: number; right?: number; bottom?: number; left?: number };
    containerWidth?: number;
    containerHeight?: number;
  }

  let {
    data = [],
    title,
    xAxisLabel,
    yAxisLabel,
    animated = true,
    showGrid = true,
    showTooltip = true,
    formatValue = (value: number) => value.toLocaleString(),
    formatTooltip = (dataPoint: DataPoint) => `${dataPoint.label}: ${formatValue(dataPoint.value)}`,
    onBarClick,
    padding = { top: 20, right: 40, bottom: 60, left: 60 },
    containerWidth = 600,
    containerHeight = 400,
    ...restProps
  }: Props = $props();
  
  // Ensure data is always an array
  const chartData = $derived(() => Array.isArray(data) ? data : []);

  let hoveredBar: DataPoint | null = $state(null);
  let tooltipPosition = $state({ x: 0, y: 0 });

  const xScale = scaleBand().padding(0.1);
  const yScale = scaleLinear();

  function handleBarHover(event: MouseEvent, dataPoint: DataPoint) {
    if (showTooltip) {
      hoveredBar = dataPoint;
      tooltipPosition = {
        x: event.clientX + 10,
        y: event.clientY - 10
      };
    }
  }

  function handleBarLeave() {
    hoveredBar = null;
  }

  function handleBarClick(dataPoint: DataPoint) {
    onBarClick?.(dataPoint);
  }
</script>

<div class="chart-container" style:width="{containerWidth}px" style:height="{containerHeight}px" {...restProps}>
  {#if title}
    <h3 class="chart-title">{title}</h3>
  {/if}
  
  <LayerCake
    {padding}
    x="label"
    y="value"
    xScale={xScale}
    yScale={yScale}
    data={chartData()}
    width={containerWidth - 32}
    height={containerHeight - 32 - (title ? 40 : 0)}
  >
    <Svg>
      <ChartAxis type="x" position="bottom" label={xAxisLabel} />
      <ChartAxis type="y" position="left" label={yAxisLabel} gridLines={showGrid} format={formatValue} />
      <Bars 
        {animated}
        onBarHover={(d) => handleBarHover(event, d)}
        onBarLeave={handleBarLeave}
        onBarClick={handleBarClick}
      />
    </Svg>
  </LayerCake>

  {#if hoveredBar && showTooltip}
    <ChartTooltip 
      content={formatTooltip(hoveredBar)}
      x={tooltipPosition.x}
      y={tooltipPosition.y}
      visible={true}
    />
  {/if}
</div>

<style>
  .chart-container {
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
</style>