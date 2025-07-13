<script lang="ts">
  import { LayerCake, Svg } from 'layercake';
  import { scaleLinear, scaleTime } from 'd3-scale';
  import { line, curveMonotoneX } from 'd3-shape';
  import ChartAxis from '../core/ChartAxis.svelte';
  import ChartTooltip from '../core/ChartTooltip.svelte';
  import Line from '../layers/Line.svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface DataPoint {
    x: number | Date;
    y: number;
    label?: string;
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
    showDots?: boolean;
    formatValue?: (value: number) => string;
    formatXValue?: (value: any) => string;
    formatTooltip?: (dataPoint: DataPoint) => string;
    onPointClick?: (dataPoint: DataPoint) => void;
    padding?: { top?: number; right?: number; bottom?: number; left?: number };
    containerWidth?: number;
    containerHeight?: number;
    colorScheme?: 'blue' | 'purple' | 'gradient' | 'vibrant';
    theme?: 'light' | 'dark';
    curveType?: 'linear' | 'monotone' | 'natural';
  }

  let {
    data = [],
    title = '',
    subtitle = '',
    xAxisLabel = '',
    yAxisLabel = '',
    animated = true,
    showGrid = true,
    showTooltip = true,
    showDots = true,
    formatValue = (value: number) => {
      if (value === undefined || value === null || isNaN(value)) {
        return '0';
      }
      const numValue = Number(value);
      if (numValue >= 1000000) {
        return `${(numValue / 1000000).toFixed(1)}M`;
      } else if (numValue >= 1000) {
        return `${(numValue / 1000).toFixed(0)}K`;
      }
      return numValue.toLocaleString();
    },
    formatXValue = (value: any) => {
      if (value === undefined || value === null) {
        return '';
      }
      if (value instanceof Date) {
        return value.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      }
      return String(value);
    },
    formatTooltip = (dataPoint: DataPoint) => {
      if (!dataPoint) return '';
      return `${formatXValue(dataPoint.x)}: ${formatValue(dataPoint.y)}`;
    },
    onPointClick = undefined,
    padding = { top: 30, right: 50, bottom: 70, left: 90 },
    containerWidth = 600,
    containerHeight = 400,
    colorScheme = 'gradient',
    theme = 'light',
    curveType = 'monotone',
    ...restProps
  }: Props = $props();
  
  // Ensure data is always an array and sorted by x
  const chartData = $derived(() => {
    if (!data || !Array.isArray(data)) return [];
    
    const validData = data.filter(d => 
      d && 
      d.x !== undefined && 
      d.x !== null && 
      d.y !== undefined && 
      d.y !== null && 
      !isNaN(d.y)
    );
    
    const sortedData = [...validData];
    return sortedData.sort((a, b) => {
      const aVal = a.x instanceof Date ? a.x.getTime() : Number(a.x);
      const bVal = b.x instanceof Date ? b.x.getTime() : Number(b.x);
      return aVal - bVal;
    });
  });

  let hoveredPoint: DataPoint | null = $state(null);
  let tooltipPosition = $state({ x: 0, y: 0 });
  let chartContainer: HTMLDivElement;

  // Calculate statistics
  const stats = $derived(() => {
    const currentData = chartData();
    if (!currentData || currentData.length === 0) {
      return { min: 0, max: 0, avg: 0, trend: 0 };
    }
    
    const values = currentData.map(d => d.y).filter(v => v !== undefined && v !== null && !isNaN(v));
    if (values.length === 0) return { min: 0, max: 0, avg: 0, trend: 0 };
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    // Calculate simple trend (positive/negative)
    if (values.length < 2) return { min, max, avg, trend: 0 };
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    if (firstHalf.length === 0 || secondHalf.length === 0) {
      return { min, max, avg, trend: 0 };
    }
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    const trend = firstAvg === 0 ? 0 : ((secondAvg - firstAvg) / firstAvg) * 100;
    
    return { min, max, avg, trend };
  });

  // Determine scale types and domains
  const xDomain = $derived(() => {
    const currentData = chartData();
    if (!currentData || currentData.length === 0) return [0, 1];
    
    const xValues = currentData.map(d => d.x).filter(v => v !== undefined && v !== null);
    if (xValues.length === 0) return [0, 1];
    
    if (xValues[0] instanceof Date) {
      return [xValues[0], xValues[xValues.length - 1]];
    }
    
    const numericValues = xValues.map(v => Number(v)).filter(v => !isNaN(v));
    if (numericValues.length === 0) return [0, 1];
    
    return [Math.min(...numericValues), Math.max(...numericValues)];
  });

  const yDomain = $derived(() => {
    const currentData = chartData();
    if (!currentData || currentData.length === 0) return [0, 1];
    
    const yValues = currentData.map(d => d.y).filter(v => v !== undefined && v !== null && !isNaN(v));
    if (yValues.length === 0) return [0, 1];
    
    const min = Math.min(0, Math.min(...yValues));
    const max = Math.max(...yValues);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  });

  const xScale = $derived(() => {
    const currentData = chartData();
    if (!currentData || currentData.length === 0) return scaleLinear();
    
    const firstX = currentData[0]?.x;
    if (firstX instanceof Date) {
      return scaleTime();
    }
    return scaleLinear();
  });

  // Color schemes
  const colorSchemes = {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    gradient: 'url(#lineGradient)',
    vibrant: '#ef4444'
  };
  
  const gradientMap = {
    gradient: 'url(#lineGradient)',
    purple: 'url(#lineGradientPurple)',
    vibrant: 'url(#lineGradientVibrant)',
    blue: '#3b82f6'
  };
  
  // Get the color for the current scheme
  const getColor = (scheme: string) => {
    return gradientMap[scheme as keyof typeof gradientMap] || gradientMap.gradient;
  };
  
  // Get solid color for dots and tooltips
  const dotColor = () => {
    const solidColors = {
      blue: '#3b82f6',
      purple: '#8b5cf6',
      gradient: '#3b82f6',
      vibrant: '#ef4444'
    };
    return solidColors[colorScheme as keyof typeof solidColors] || '#3b82f6';
  };

  function handlePointHover(dataPoint: DataPoint, event?: MouseEvent) {
    if (showTooltip && event && chartContainer) {
      hoveredPoint = dataPoint;
      const rect = chartContainer.getBoundingClientRect();
      tooltipPosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }

  function handlePointLeave() {
    hoveredPoint = null;
  }

  function handlePointClick(dataPoint: DataPoint) {
    onPointClick?.(dataPoint);
  }
</script>

<div 
  bind:this={chartContainer}
  class="chart-container {theme}" 
  style:width="{containerWidth}px" 
  style:height="{containerHeight}px" 
  {...restProps}
>
  {#if !chartData() || chartData().length === 0}
    <div class="empty-state">
      <p>No data available</p>
    </div>
  {:else}
    <div class="chart-content" data-color-scheme={colorScheme}>
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
            <span class="stat-label">Min</span>
            <span class="stat-value">{formatValue(stats.min)}</span>
          </div>
          <div class="stat-badge">
            <span class="stat-label">Max</span>
            <span class="stat-value">{formatValue(stats.max)}</span>
          </div>
          <div class="stat-badge trend" class:positive={stats.trend > 0} class:negative={stats.trend < 0}>
            <span class="stat-label">Trend</span>
            <span class="stat-value">
              {stats.trend > 0 ? '+' : ''}{isNaN(stats.trend) ? '0' : stats.trend.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      
      <!-- Chart area -->
      <div class="chart-wrapper">
      <LayerCake
        {padding}
        x="x"
        y="y"
        xScale={xScale()}
        yScale={scaleLinear()}
        xDomain={xDomain()}
        yDomain={yDomain()}
        data={chartData()}
      >
        <Svg>
          <!-- Gradient definitions -->
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
            </linearGradient>
            
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.05" />
            </linearGradient>

            <!-- Glow filter -->
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <!-- Background pattern -->
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(226, 232, 240, 0.3)" stroke-width="1"/>
            </pattern>
          </defs>
          
          <!-- Optional background -->
          <rect width="100%" height="100%" fill="url(#grid-pattern)" opacity="0.5" />
          
          <ChartAxis type="x" position="bottom" label={xAxisLabel} format={(v) => v != null ? formatXValue(v) : ''} />
          <ChartAxis type="y" position="left" label={yAxisLabel} gridLines={showGrid} format={(v) => v != null ? formatValue(v) : '0'} />
          
          <Line 
            {animated}
            {colorScheme}
            {curveType}
            {showDots}
            onPointHover={handlePointHover}
            onPointLeave={handlePointLeave}
            onPointClick={handlePointClick}
          />
        </Svg>
      </LayerCake>
    </div>
  </div>

  {#if hoveredPoint && showTooltip}
    <ChartTooltip 
        data={{
          title: formatXValue(hoveredPoint.x),
          items: [
            {
              label: hoveredPoint.label || 'Value',
              value: formatValue(hoveredPoint.y),
              color: dotColor()
            }
          ]
        }}
        x={tooltipPosition.x}
        y={tooltipPosition.y}
        visible={true}
        {theme}
      />
    {/if}
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
    overflow: hidden;
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
  
  [data-color-scheme="blue"] .chart-title {
    color: #1e3a8a;
  }
  
  [data-color-scheme="purple"] .chart-title {
    color: #581c87;
  }
  
  [data-color-scheme="vibrant"] .chart-title {
    color: #991b1b;
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
    min-width: 70px;
    transition: all 0.3s ease;
  }
  
  /* Color scheme specific badges */
  [data-color-scheme="blue"] .stat-badge {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    border-color: rgba(59, 130, 246, 0.2);
  }
  
  [data-color-scheme="purple"] .stat-badge {
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
    border-color: rgba(139, 92, 246, 0.2);
  }
  
  [data-color-scheme="vibrant"] .stat-badge {
    background: linear-gradient(135deg, #fef3c7, #fed7aa);
    border-color: rgba(239, 68, 68, 0.2);
  }

  .stat-badge.trend.positive {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    border-color: rgba(16, 185, 129, 0.2);
  }

  .stat-badge.trend.negative {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    border-color: rgba(239, 68, 68, 0.2);
  }

  .dark .stat-badge {
    background: linear-gradient(135deg, #374151, #1f2937);
    border-color: rgba(75, 85, 99, 0.5);
  }

  .dark .stat-badge.trend.positive {
    background: linear-gradient(135deg, #064e3b, #065f46);
    border-color: rgba(16, 185, 129, 0.3);
  }

  .dark .stat-badge.trend.negative {
    background: linear-gradient(135deg, #7f1d1d, #991b1b);
    border-color: rgba(239, 68, 68, 0.3);
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
  
  [data-color-scheme="blue"] .stat-value {
    color: #1e40af;
  }
  
  [data-color-scheme="purple"] .stat-value {
    color: #6b21a8;
  }
  
  [data-color-scheme="vibrant"] .stat-value {
    color: #dc2626;
  }

  .trend.positive .stat-value {
    color: #059669;
  }

  .trend.negative .stat-value {
    color: #dc2626;
  }

  .dark .stat-label {
    color: #9ca3af;
  }

  .dark .stat-value {
    color: #f9fafb;
  }

  .dark .trend.positive .stat-value {
    color: #10b981;
  }

  .dark .trend.negative .stat-value {
    color: #ef4444;
  }

  .chart-wrapper {
    width: 100%;
    height: calc(100% - 100px); /* Increased from 80px to account for header */
    position: relative;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    padding: 4px;
    overflow: hidden; /* Prevent overflow */
  }
  
  [data-color-scheme="blue"] .chart-wrapper {
    background: rgba(219, 234, 254, 0.2);
  }
  
  [data-color-scheme="purple"] .chart-wrapper {
    background: rgba(237, 233, 254, 0.2);
  }
  
  [data-color-scheme="vibrant"] .chart-wrapper {
    background: rgba(254, 243, 199, 0.2);
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

  .chart-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #6b7280;
    font-size: 1rem;
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
      min-width: 60px;
    }
  }
</style>