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
    theme?: 'dark' | 'light';
  }

  let {
    data = null,
    content,
    x = 0,
    y = 0,
    visible = false,
    followCursor = true,
    theme = 'dark'
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
    class="chart-tooltip {theme}"
    style:left="{tooltipPosition.x}px"
    style:top="{tooltipPosition.y}px"
    style:opacity={tooltipPosition.opacity}
  >
    <!-- Tooltip arrow -->
    <div class="tooltip-arrow"></div>
    
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
                style:background={`linear-gradient(135deg, ${item.color}, ${item.color}dd)`}
              ></div>
            {/if}
            <span class="tooltip-label">{item.label}</span>
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
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.2),
      0 10px 10px -5px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    padding: 12px 16px;
    font-size: 0.875rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 280px;
    backdrop-filter: blur(12px);
    transform: translateY(0);
  }

  .chart-tooltip.light {
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    color: #111827;
    border-color: rgba(229, 231, 235, 0.8);
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04),
      0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  .tooltip-arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    transform: rotate(45deg);
    left: -4px;
    top: 50%;
    margin-top: -4px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .light .tooltip-arrow {
    border-color: rgba(229, 231, 235, 0.8);
  }

  .tooltip-title {
    font-weight: 600;
    color: #f3f4f6;
    margin-bottom: 8px;
    font-size: 0.9375rem;
    letter-spacing: -0.01em;
  }

  .light .tooltip-title {
    color: #111827;
  }

  .tooltip-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .tooltip-item {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 24px;
  }

  .tooltip-color-indicator {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tooltip-label {
    color: #9ca3af;
    flex-shrink: 0;
    font-size: 0.8125rem;
    letter-spacing: 0.01em;
  }

  .light .tooltip-label {
    color: #6b7280;
  }

  .tooltip-value {
    font-weight: 600;
    color: white;
    margin-left: auto;
    font-variant-numeric: tabular-nums;
    font-size: 0.9375rem;
  }

  .light .tooltip-value {
    color: #111827;
  }

  /* Hover effect for better interactivity feel */
  .chart-tooltip:hover {
    transform: translateY(-1px);
    box-shadow: 
      0 25px 30px -5px rgba(0, 0, 0, 0.25),
      0 15px 15px -5px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .chart-tooltip.light:hover {
    box-shadow: 
      0 25px 30px -5px rgba(0, 0, 0, 0.15),
      0 15px 15px -5px rgba(0, 0, 0, 0.08),
      0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  /* Animation for appearance */
  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .chart-tooltip {
    animation: tooltipFadeIn 0.2s ease-out;
  }
</style>
