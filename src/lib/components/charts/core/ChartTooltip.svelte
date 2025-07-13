<script lang="ts">
  import { getContext } from 'svelte';

  interface TooltipData {
    title?: string;
    items: Array<{
      label: string;
      value: string | number;
      color?: string;
    }>;
  }

  interface Props {
    data?: TooltipData | null;
    content?: string;
    x?: number;
    y?: number;
    visible?: boolean;
    followCursor?: boolean;
  }

  let {
    data = null,
    content,
    x = 0,
    y = 0,
    visible = false,
    followCursor = true
  }: Props = $props();

  // Get Layer Cake context for positioning
  const { width, height, padding } = getContext('LayerCake') || {};

  let tooltipElement: HTMLDivElement = $state();
  let tooltipWidth = $state(0);
  let tooltipHeight = $state(0);

  // Calculate tooltip position to keep it within bounds
  const tooltipPosition = $derived(() => {
    if (!visible || (!data && !content) || !tooltipElement) {
      return { x: 0, y: 0, opacity: 0 };
    }

    let posX = x;
    let posY = y;

    // Adjust horizontal position if tooltip would go off-screen
    if (width && posX + tooltipWidth > width - (padding?.right || 0)) {
      posX = posX - tooltipWidth - 10;
    } else {
      posX = posX + 10;
    }

    // Adjust vertical position if tooltip would go off-screen
    if (height && posY + tooltipHeight > height - (padding?.bottom || 0)) {
      posY = posY - tooltipHeight - 10;
    } else {
      posY = posY + 10;
    }

    return {
      x: Math.max(padding?.left || 0, posX),
      y: Math.max(padding?.top || 0, posY),
      opacity: 1
    };
  });

  // Measure tooltip dimensions when content changes
  $effect(() => {
    if (tooltipElement && visible && (data || content)) {
      const rect = tooltipElement.getBoundingClientRect();
      tooltipWidth = rect.width;
      tooltipHeight = rect.height;
    }
  });

  // Format value for display
  function formatValue(value: string | number): string {
    if (typeof value === 'number') {
      // Format numbers with appropriate precision
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      } else if (value % 1 !== 0) {
        return value.toFixed(2);
      }
      return value.toString();
    }
    return value;
  }
</script>

{#if visible && (data || content)}
  <div 
    bind:this={tooltipElement}
    class="chart-tooltip"
    style:left="{tooltipPosition.x}px"
    style:top="{tooltipPosition.y}px"
    style:opacity={tooltipPosition.opacity}
  >
    {#if content}
      <div class="tooltip-content">
        {@html content}
      </div>
    {:else if data}
      {#if data.title}
        <div class="tooltip-title">
          {data.title}
        </div>
      {/if}
      
      <div class="tooltip-content">
        {#each data.items as item}
          <div class="tooltip-item">
            {#if item.color}
              <div 
                class="tooltip-color-indicator"
                style:background-color={item.color}
              ></div>
            {/if}
            <span class="tooltip-label">{item.label}:</span>
            <span class="tooltip-value">{formatValue(item.value)}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .chart-tooltip {
    position: absolute;
    pointer-events: none;
    z-index: 50;
    background-color: #111827;
    color: white;
    border-radius: 0.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 0.75rem;
    font-size: 0.875rem;
    border: 1px solid #374151;
    transition: opacity 0.2s ease-in-out;
    max-width: 250px;
    backdrop-filter: blur(8px);
  }

  .tooltip-title {
    font-weight: 500;
    color: #f3f4f6;
    margin-bottom: 0.25rem;
    border-bottom: 1px solid #374151;
    padding-bottom: 0.25rem;
  }

  .tooltip-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .tooltip-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 20px;
  }

  .tooltip-color-indicator {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid #4b5563;
  }

  .tooltip-label {
    color: #d1d5db;
    flex-shrink: 0;
  }

  .tooltip-value {
    font-weight: 500;
    color: white;
    margin-left: auto;
    font-variant-numeric: tabular-nums;
  }

  /* Light theme variant */
  .chart-tooltip.light {
    background-color: white;
    color: #111827;
    border-color: #e5e7eb;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .light .tooltip-title {
    color: #111827;
    border-color: #e5e7eb;
  }

  .light .tooltip-label {
    color: #4b5563;
  }

  .light .tooltip-value {
    color: #111827;
  }

  .light .tooltip-color-indicator {
    border-color: #d1d5db;
  }
</style>