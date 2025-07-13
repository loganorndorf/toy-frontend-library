<script lang="ts">
  import { getContext } from 'svelte';

  interface Props {
    type: 'x' | 'y';
    tickCount?: number;
    tickSize?: number;
    tickPadding?: number;
    format?: (value: any) => string;
    label?: string;
    labelOffset?: number;
    gridLines?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
  }

  let {
    type,
    tickCount = 5,
    tickSize = 6,
    tickPadding = 12,
    format,
    label,
    labelOffset = 40,
    gridLines = false,
    position
  }: Props = $props();

  // Get Layer Cake context
  const { width, height, xScale, yScale, padding } = getContext('LayerCake');

  // Determine axis position based on type and explicit position prop
  const axisPosition = $derived(() => {
    if (position) return position;
    return type === 'x' ? 'bottom' : 'left';
  });

  // Get the appropriate scale
  const scale = $derived(type === 'x' ? $xScale : $yScale);

  // Generate tick values
  const ticks = $derived(() => {
    const currentScale = scale;
    if (!currentScale) return [];
    
    if (typeof currentScale.ticks === 'function') {
      return currentScale.ticks(tickCount);
    } else if (typeof currentScale.domain === 'function') {
      // For ordinal scales (like band scales)
      const domain = currentScale.domain();
      // For x-axis with text labels, show all or reduce based on available space
      if (type === 'x' && domain.length > 8) {
        // Skip some labels to prevent overlap
        const step = Math.ceil(domain.length / 6);
        return domain.filter((_, i) => i % step === 0);
      }
      return domain;
    }
    return [];
  });

  // Format tick values
  const formatTick = $derived(() => {
    if (format) return format;
    
    // Default formatters based on data type
    return (value: any) => {
      if (typeof value === 'number') {
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}K`;
        } else if (value % 1 === 0) {
          return value.toString();
        } else {
          return value.toFixed(1);
        }
      } else if (value instanceof Date) {
        return value.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      }
      return String(value);
    };
  });

  // Calculate axis line coordinates
  const axisLine = $derived(() => {
    const pos = axisPosition();
    switch (pos) {
      case 'bottom':
        return {
          x1: 0,
          y1: $height,
          x2: $width,
          y2: $height
        };
      case 'top':
        return {
          x1: 0,
          y1: 0,
          x2: $width,
          y2: 0
        };
      case 'left':
        return {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: $height
        };
      case 'right':
        return {
          x1: $width,
          y1: 0,
          x2: $width,
          y2: $height
        };
      default:
        return { x1: 0, y1: 0, x2: 0, y2: 0 };
    }
  });

  // Calculate tick positions and properties
  const tickData = $derived(() => {
    const currentScale = scale;
    if (!currentScale) return [];
    
    return ticks().map(tick => {
      const pos = axisPosition();
      const scaledValue = currentScale(tick);
      
      let x = 0, y = 0, x2 = 0, y2 = 0;
      let textX = 0, textY = 0;
      let textAnchor = 'middle';
      let dominantBaseline = 'central';

      if (type === 'x') {
        // Center ticks for band scales
        const offset = currentScale.bandwidth ? currentScale.bandwidth() / 2 : 0;
        x = x2 = scaledValue + offset;
        if (pos === 'bottom') {
          y = $height;
          y2 = $height + tickSize;
          textX = scaledValue + offset;
          textY = $height + tickSize + tickPadding;
          dominantBaseline = 'hanging';
        } else {
          y = 0;
          y2 = -tickSize;
          textX = scaledValue + offset;
          textY = -tickSize - tickPadding;
          dominantBaseline = 'baseline';
        }
      } else {
        y = y2 = scaledValue;
        if (pos === 'left') {
          x = 0;
          x2 = -tickSize;
          textX = -tickSize - tickPadding;
          textY = scaledValue;
          textAnchor = 'end';
        } else {
          x = $width;
          x2 = $width + tickSize;
          textX = $width + tickSize + tickPadding;
          textY = scaledValue;
          textAnchor = 'start';
        }
      }

      return {
        value: tick,
        x, y, x2, y2,
        textX, textY, textAnchor, dominantBaseline,
        gridX1: type === 'x' ? scaledValue : 0,
        gridY1: type === 'x' ? 0 : scaledValue,
        gridX2: type === 'x' ? scaledValue : $width,
        gridY2: type === 'x' ? $height : scaledValue
      };
    });
  });

  // Calculate label position
  const labelPosition = $derived(() => {
    if (!label) return null;
    
    const pos = axisPosition();
    let x = 0, y = 0, rotation = 0, textAnchor = 'middle';

    if (type === 'x') {
      x = $width / 2;
      if (pos === 'bottom') {
        y = $height + labelOffset;
      } else {
        y = -labelOffset;
      }
    } else {
      y = $height / 2;
      rotation = -90;
      if (pos === 'left') {
        x = -labelOffset;
      } else {
        x = $width + labelOffset;
      }
    }

    return { x, y, rotation, textAnchor };
  });
</script>

<g class="axis axis-{type}" class:axis-with-grid={gridLines}>
  <!-- Grid lines first so they're behind everything -->
  {#if gridLines}
    <g class="grid-lines">
      {#each tickData() as tick, i}
        <line
          class="grid-line"
          x1={tick.gridX1}
          y1={tick.gridY1}
          x2={tick.gridX2}
          y2={tick.gridY2}
          style:opacity={0.6 - (i * 0.05)}
        />
      {/each}
    </g>
  {/if}

  <!-- Axis line -->
  <line 
    class="axis-line"
    x1={axisLine().x1}
    y1={axisLine().y1}
    x2={axisLine().x2}
    y2={axisLine().y2}
  />

  <!-- Ticks and labels -->
  <g class="ticks">
    {#each tickData() as tick, i}
      <g class="tick-group" style:opacity={1 - (i * 0.02)}>
        <!-- Tick mark -->
        <line
          class="tick"
          x1={tick.x}
          y1={tick.y}
          x2={tick.x2}
          y2={tick.y2}
        />
        
        <!-- Tick label with background for better readability -->
        <text
          class="tick-label"
          x={tick.textX}
          y={tick.textY}
          text-anchor={tick.textAnchor}
          dominant-baseline={tick.dominantBaseline}
        >
          {formatTick()(tick.value)}
        </text>
      </g>
    {/each}
  </g>

  <!-- Axis label -->
  {#if labelPosition()}
    <text
      class="axis-label"
      x={labelPosition().x}
      y={labelPosition().y}
      text-anchor={labelPosition().textAnchor}
      transform={labelPosition().rotation !== 0 ? `rotate(${labelPosition().rotation} ${labelPosition().x} ${labelPosition().y})` : ''}
    >
      {label}
    </text>
  {/if}
</g>

<style>
  .axis-line {
    stroke: #e5e7eb;
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
  }

  .tick {
    stroke: #e5e7eb;
    stroke-width: 2;
    stroke-linecap: round;
  }

  .tick-label {
    fill: #6b7280;
    font-size: 12px;
    font-weight: 500;
    font-family: system-ui, -apple-system, sans-serif;
    letter-spacing: 0.01em;
  }

  .axis-label {
    fill: #374151;
    font-size: 13px;
    font-weight: 600;
    font-family: system-ui, -apple-system, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .grid-line {
    stroke: #f3f4f6;
    stroke-width: 1;
    stroke-dasharray: none;
  }

  /* Add subtle animations */
  .tick-group {
    transition: opacity 0.3s ease;
  }

  .axis:hover .tick-group {
    opacity: 1 !important;
  }

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    .axis-line {
      stroke: #374151;
    }

    .tick {
      stroke: #374151;
    }

    .tick-label {
      fill: #9ca3af;
    }

    .axis-label {
      fill: #d1d5db;
    }

    .grid-line {
      stroke: #1f2937;
    }
  }

  /* Responsive adjustments */
  @container (max-width: 400px) {
    .tick-label {
      font-size: 10px;
    }

    .axis-label {
      font-size: 11px;
    }
  }
</style>