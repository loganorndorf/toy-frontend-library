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
    subtitle?: string;
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
    colorScheme?: 'blue' | 'purple' | 'gradient' | 'vibrant';
    theme?: 'light' | 'dark';
  }

  let {
    data = [],
    title,
    subtitle,
    xAxisLabel,
    yAxisLabel,
    animated = true,
    showGrid = true,
    showTooltip = true,
    formatValue = (value: number) => {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
      }
      return `$${value.toLocaleString()}`;
    },
    formatTooltip = (dataPoint: DataPoint) => `${dataPoint.label}: ${formatValue(dataPoint.value)}`,
    onBarClick,
    padding = { top: 20, right: 40, bottom: 60, left: 80 },
    containerWidth = 600,
    containerHeight = 400,
    colorScheme = 'gradient',
    theme = 'light',
    ...restProps
  }: Props = $props();
  
  // Ensure data is always an array
  const chartData = $derived(Array.isArray(data) ? data : []);

  let hoveredBar: DataPoint | null = $state(null);
  let tooltipPosition = $state({ x: 0, y: 0 });
  let chartContainer: HTMLDivElement;

  // Create scale functions that Layer Cake will use
  const xDomain = $derived(chartData.map(d => d.label));
  const yDomain = $derived([0, Math.max(...chartData.map(d => d.value)) * 1.1]); // Add 10% padding

  function handleBarHover(dataPoint: DataPoint, event?: MouseEvent) {
    if (showTooltip && event && chartContainer) {
      hoveredBar = dataPoint;
      const rect = chartContainer.getBoundingClientRect();
      tooltipPosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }

  function handleBarLeave() {
    hoveredBar = null;
  }

  function handleBarClick(dataPoint: DataPoint) {
    onBarClick?.(dataPoint);
  }

  // Calculate total for stats
  const total = $derived(chartData.reduce((sum, d) => sum + d.value, 0));
  const average = $derived(chartData.length > 0 ? total / chartData.length : 0);
</script>

<div 
  bind:this={chartContainer}
  class="chart-container {theme}" 
  style:width="{containerWidth}px" 
  style:height="{containerHeight}px" 
  {...restProps}
>
  <!-- Header section -->
  <div class="chart-header">
    <div class="header-content">
      {#if title}
        <h3 class="chart-title">{title}</h3>
      {/if}
      {#if subtitle}
        <p class="chart-subtitle">{subtitle}</p>
      {/if}
    </div>
    
    <!-- Stats badges -->
    <div class="chart-stats">
      <div class="stat-badge">
        <span class="stat-label">Total</span>
        <span class="stat-value">{formatValue(total)}</span>
      </div>
      <div class="stat-badge">
        <span class="stat-label">Average</span>
        <span class="stat-value">{formatValue(average)}</span>
      </div>
    </div>
  </div>
  
  <!-- Chart area -->
  <div class="chart-wrapper">
    <LayerCake
      {padding}
      x="label"
      y="value"
      xScale={scaleBand().padding(0.2)}
      yScale={scaleLinear()}
      xDomain={xDomain}
      yDomain={yDomain}
      data={chartData}
    >
      <Svg>
        <!-- Background pattern -->
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(226, 232, 240, 0.3)" stroke-width="1"/>
          </pattern>
        </defs>
        
        <!-- Optional background -->
        <rect width="100%" height="100%" fill="url(#grid-pattern)" opacity="0.5" />
        
        <ChartAxis type="x" position="bottom" label={xAxisLabel} />
        <ChartAxis type="y" position="left" label={yAxisLabel} gridLines={showGrid} format={formatValue} />
        <Bars 
          {animated}
          {colorScheme}
          onBarHover={handleBarHover}
          onBarLeave={handleBarLeave}
          onBarClick={handleBarClick}
        />
      </Svg>
    </LayerCake>
  </div>

  {#if hoveredBar && showTooltip}
    <ChartTooltip 
      data={{
        title: hoveredBar.label,
        items: [
          {
            label: 'Value',
            value: formatValue(hoveredBar.value),
            color: '#06b6d4'
          },
          {
            label: '% of Total',
            value: `${((hoveredBar.value / total) * 100).toFixed(1)}%`,
            color: '#8b5cf6'
          }
        ]
      }}
      x={tooltipPosition.x}
      y={tooltipPosition.y}
      visible={true}
    />
  {/if}
</div>

<style>
  .chart-container {
    background: linear-gradient(to bottom, #ffffff, #fafbfc);
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    box-shadow: 
      0 1px 3px rgba(0, 0, 0, 0.05),
      0 10px 40px -10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .chart-container:hover {
    box-shadow: 
      0 1px 3px rgba(0, 0, 0, 0.05),
      0 20px 60px -15px rgba(0, 0, 0, 0.15);
  }

  .chart-container.dark {
    background: linear-gradient(to bottom, #1f2937, #111827);
    border-color: rgba(55, 65, 81, 0.5);
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  .header-content {
    flex: 1;
  }
  
  .chart-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: #1f2937;
    letter-spacing: -0.025em;
  }

  .chart-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 4px 0 0 0;
  }

  .dark .chart-title {
    color: #f9fafb;
  }

  .dark .chart-subtitle {
    color: #9ca3af;
  }
  
  .chart-stats {
    display: flex;
    gap: 12px;
  }

  .stat-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 16px;
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
    border-radius: 12px;
    border: 1px solid rgba(229, 231, 235, 0.5);
    min-width: 80px;
  }

  .dark .stat-badge {
    background: linear-gradient(135deg, #374151, #1f2937);
    border-color: rgba(75, 85, 99, 0.5);
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-value {
    font-size: 1rem;
    font-weight: 700;
    color: #1f2937;
    margin-top: 2px;
    font-variant-numeric: tabular-nums;
  }

  .dark .stat-label {
    color: #9ca3af;
  }

  .dark .stat-value {
    color: #f9fafb;
  }

  .chart-wrapper {
    width: 100%;
    height: calc(100% - 80px);
    position: relative;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    padding: 4px;
  }

  .dark .chart-wrapper {
    background: rgba(17, 24, 39, 0.5);
  }
  
  /* Enhanced axis styles */
  :global(.chart-container .axis-line) {
    stroke: #e5e7eb;
    stroke-width: 2;
  }

  :global(.dark .axis-line) {
    stroke: #374151;
  }

  :global(.chart-container .tick-label) {
    font-size: 12px;
    font-weight: 500;
    fill: #6b7280;
    font-family: system-ui, -apple-system, sans-serif;
  }

  :global(.dark .tick-label) {
    fill: #9ca3af;
  }

  :global(.chart-container .axis-label) {
    font-size: 13px;
    font-weight: 600;
    fill: #374151;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  :global(.dark .axis-label) {
    fill: #d1d5db;
  }

  :global(.chart-container .grid-line) {
    stroke: #f3f4f6;
    stroke-width: 1;
    stroke-dasharray: none;
  }

  :global(.dark .grid-line) {
    stroke: #1f2937;
  }

  /* Responsive design */
  @media (max-width: 640px) {
    .chart-header {
      flex-direction: column;
      gap: 16px;
    }

    .chart-stats {
      width: 100%;
      justify-content: flex-start;
    }

    .stat-badge {
      flex: 1;
    }
  }
</style>