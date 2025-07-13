<script lang="ts">
  import { LayerCake, Svg } from 'layercake';
  import { scaleBand, scaleLinear } from 'd3-scale';
  import { curveMonotoneX } from 'd3-shape';
  import ChartContainer from '../core/ChartContainer.svelte';
  import ChartAxis from '../core/ChartAxis.svelte';
  import ChartTooltip from '../core/ChartTooltip.svelte';
  import ChartLegend from '../core/ChartLegend.svelte';
  import Bars from '../layers/Bars.svelte';
  import Line from '../layers/Line.svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface DataPoint {
    label: string;
    barValue: number;
    lineValue: number;
    metadata?: Record<string, any>;
  }

  interface Props extends HTMLAttributes<HTMLDivElement> {
    data: DataPoint[];
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    y2AxisLabel?: string;
    animated?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    barLabel?: string;
    lineLabel?: string;
    formatBarValue?: (value: number) => string;
    formatLineValue?: (value: number) => string;
    formatTooltip?: (dataPoint: DataPoint) => string;
    onBarClick?: (dataPoint: DataPoint) => void;
    onLineClick?: (dataPoint: DataPoint, index: number) => void;
    padding?: { top?: number; right?: number; bottom?: number; left?: number };
    containerWidth?: number;
    containerHeight?: number;
  }

  let {
    data = [],
    title,
    xAxisLabel,
    yAxisLabel,
    y2AxisLabel,
    animated = true,
    showGrid = true,
    showTooltip = true,
    showLegend = true,
    barLabel = 'Bars',
    lineLabel = 'Line',
    formatBarValue = (value: number) => value.toLocaleString(),
    formatLineValue = (value: number) => value.toLocaleString(),
    formatTooltip = (dataPoint: DataPoint) => 
      `${dataPoint.label}<br/>${barLabel}: ${formatBarValue(dataPoint.barValue)}<br/>${lineLabel}: ${formatLineValue(dataPoint.lineValue)}`,
    onBarClick,
    onLineClick,
    padding = { top: 20, right: 60, bottom: 60, left: 60 },
    containerWidth,
    containerHeight,
    ...restProps
  }: Props = $props();

  let hoveredItem: { type: 'bar' | 'line'; data: DataPoint; index?: number } | null = $state(null);
  let tooltipPosition = $state({ x: 0, y: 0 });

  // Prepare data for Layer Cake - bars use left scale, line uses right scale
  const barData = $derived(data.map(d => ({ ...d, value: d.barValue, label: d.label })));
  const lineData = $derived(data.map(d => ({ ...d, value: d.lineValue, label: d.label })));

  // Scales
  const xScale = scaleBand().padding(0.1);
  const yScale = scaleLinear(); // Left axis for bars
  const y2Scale = scaleLinear(); // Right axis for line

  // Legend data
  const legendData = $derived(() => [
    { label: barLabel, color: 'rgb(59, 130, 246)', type: 'bar' },
    { label: lineLabel, color: 'rgb(16, 185, 129)', type: 'line' }
  ]);

  function handleBarHover(event: MouseEvent, dataPoint: DataPoint) {
    if (showTooltip) {
      hoveredItem = { type: 'bar', data: dataPoint };
      tooltipPosition = {
        x: event.clientX + 10,
        y: event.clientY - 10
      };
    }
  }

  function handleLineHover(event: MouseEvent, dataPoint: DataPoint, index: number) {
    if (showTooltip) {
      hoveredItem = { type: 'line', data: dataPoint, index };
      tooltipPosition = {
        x: event.clientX + 10,
        y: event.clientY - 10
      };
    }
  }

  function handleHoverLeave() {
    hoveredItem = null;
  }

  function handleBarClick(dataPoint: DataPoint) {
    onBarClick?.(dataPoint);
  }

  function handleLineClick(dataPoint: DataPoint, index: number) {
    onLineClick?.(dataPoint, index);
  }
</script>

<ChartContainer {title} width={containerWidth} height={containerHeight} {...restProps}>
  <!-- Bars Layer -->
  <LayerCake
    {padding}
    x="label"
    y="value"
    xScale={xScale}
    yScale={yScale}
    data={barData}
  >
    <Svg>
      <ChartAxis dimension="x" position="bottom" label={xAxisLabel} />
      <ChartAxis dimension="y" position="left" label={yAxisLabel} {showGrid} formatValue={formatBarValue} />
      <Bars 
        {animated}
        onBarHover={(d) => handleBarHover(event, d)}
        onBarLeave={handleHoverLeave}
        onBarClick={handleBarClick}
      />
    </Svg>
  </LayerCake>

  <!-- Line Layer -->
  <LayerCake
    {padding}
    x="label"
    y="value"
    xScale={xScale}
    yScale={y2Scale}
    data={lineData}
  >
    <Svg>
      <ChartAxis dimension="y" position="right" label={y2AxisLabel} formatValue={formatLineValue} />
      <Line 
        {animated}
        curve={curveMonotoneX}
        strokeWidth={3}
        onPointHover={(d, i) => handleLineHover(event, d, i)}
        onPointLeave={handleHoverLeave}
        onPointClick={handleLineClick}
      />
    </Svg>
  </LayerCake>

  {#if showLegend}
    <ChartLegend items={legendData} position="top-right" />
  {/if}

  {#if hoveredItem && showTooltip}
    <ChartTooltip 
      content={formatTooltip(hoveredItem.data)}
      x={tooltipPosition.x}
      y={tooltipPosition.y}
    />
  {/if}
</ChartContainer>

<style>
  /* Custom styling for line in combo chart */
  :global(.line-layer .line-path) {
    stroke: #10b981;
  }
  
  :global(.line-layer .line-point) {
    fill: #10b981;
  }
</style>