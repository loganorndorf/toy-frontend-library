<script lang="ts">
  import BarChartLayerCake from './BarChartLayerCake.svelte';
  import LineChart from './LineChart.svelte';
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
    subtitle?: string;
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
    colorScheme?: 'blue' | 'purple' | 'gradient' | 'vibrant';
    theme?: 'light' | 'dark';
  }

  let {
    data = [],
    title,
    subtitle,
    xAxisLabel,
    yAxisLabel,
    y2AxisLabel,
    animated = true,
    showGrid = true,
    showTooltip = true,
    showLegend = true,
    barLabel = 'Bars',
    lineLabel = 'Line',
    formatBarValue = (value: number) => {
      if (value === undefined || value === null || isNaN(value)) return '0';
      return Number(value).toLocaleString();
    },
    formatLineValue = (value: number) => {
      if (value === undefined || value === null || isNaN(value)) return '0';
      return Number(value).toLocaleString();
    },
    formatTooltip = (dataPoint: DataPoint) => 
      `${dataPoint.label}<br/>${barLabel}: ${formatBarValue(dataPoint.barValue)}<br/>${lineLabel}: ${formatLineValue(dataPoint.lineValue)}`,
    onBarClick,
    onLineClick,
    padding = { top: 20, right: 60, bottom: 60, left: 60 },
    containerWidth = 800,
    containerHeight = 500,
    colorScheme = 'gradient',
    theme = 'light',
    ...restProps
  }: Props = $props();

  // Prepare data for each chart component
  const barData = $derived(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(d => ({ 
      label: d?.label || 'Unknown', 
      value: Number(d?.barValue) || 0, 
      metadata: d?.metadata 
    }));
  });

  const lineData = $derived(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((d, index) => ({ 
      x: index, 
      y: Number(d?.lineValue) || 0, 
      label: d?.label || 'Unknown'
    }));
  });

  // Chart dimensions for side-by-side layout
  const chartWidth = $derived(() => containerWidth || 800);
  const chartHeight = $derived(() => containerHeight || 500);
  
  // Stats for the header
  const stats = $derived(() => {
    if (!data || data.length === 0) return { barAvg: 0, lineAvg: 0, barTotal: 0, lineTotal: 0 };
    
    const barTotal = data.reduce((sum, d) => sum + (d.barValue || 0), 0);
    const lineTotal = data.reduce((sum, d) => sum + (d.lineValue || 0), 0);
    const barAvg = data.length > 0 ? barTotal / data.length : 0;
    const lineAvg = data.length > 0 ? lineTotal / data.length : 0;
    
    return { barAvg, lineAvg, barTotal, lineTotal };
  });
</script>

<div 
  class="combo-chart-container {theme}" 
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
      <div class="stat-badge bar-badge">
        <span class="stat-label">{barLabel} Avg</span>
        <span class="stat-value">{formatBarValue(stats?.barAvg || 0)}</span>
      </div>
      <div class="stat-badge line-badge">
        <span class="stat-label">{lineLabel} Avg</span>
        <span class="stat-value">{formatLineValue(stats?.lineAvg || 0)}</span>
      </div>
    </div>
  </div>
  
  <!-- Chart area with side-by-side layout -->
  <div class="charts-grid">
    <!-- Bar Chart -->
    <div class="chart-section">
      <h4 class="section-title">{barLabel} ({yAxisLabel})</h4>
      <BarChartLayerCake
        data={barData()}
        {animated}
        {showGrid}
        {showTooltip}
        containerWidth={Math.max(300, Math.floor(chartWidth * 0.48))}
        containerHeight={Math.max(200, chartHeight - 120)}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        formatValue={formatBarValue}
        onBarClick={onBarClick}
        {colorScheme}
        {theme}
      />
    </div>
    
    <!-- Line Chart -->
    <div class="chart-section">
      <h4 class="section-title">{lineLabel} ({y2AxisLabel})</h4>
      <LineChart
        data={lineData()}
        {animated}
        {showGrid}
        {showTooltip}
        containerWidth={Math.max(300, Math.floor(chartWidth * 0.48))}
        containerHeight={Math.max(200, chartHeight - 120)}
        xAxisLabel={xAxisLabel}
        yAxisLabel={y2AxisLabel}
        formatValue={formatLineValue}
        formatXValue={(index) => {
          const item = data[index];
          return item ? item.label : String(index);
        }}
        onPointClick={onLineClick}
        {colorScheme}
        {theme}
      />
    </div>
  </div>
</div>

<style>
  .combo-chart-container {
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

  .combo-chart-container:hover {
    box-shadow: 
      0 1px 3px rgba(0, 0, 0, 0.05),
      0 20px 60px -15px rgba(0, 0, 0, 0.15);
  }

  .combo-chart-container.dark {
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
    border-radius: 12px;
    border: 1px solid rgba(229, 231, 235, 0.5);
    min-width: 100px;
  }

  .bar-badge {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    border-color: rgba(59, 130, 246, 0.2);
  }

  .line-badge {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    border-color: rgba(16, 185, 129, 0.2);
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

  .charts-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    height: calc(100% - 100px);
  }

  .chart-section {
    display: flex;
    flex-direction: column;
  }

  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 12px 0;
    text-align: center;
  }

  .dark .section-title {
    color: #e5e7eb;
  }

  /* Responsive design */
  @media (max-width: 1024px) {
    .charts-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .chart-header {
      flex-direction: column;
      gap: 16px;
    }

    .chart-stats {
      width: 100%;
      justify-content: flex-start;
    }
  }

  @media (max-width: 640px) {
    .stat-badge {
      flex: 1;
      min-width: 80px;
    }
  }
</style>