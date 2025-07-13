<script lang="ts">
  interface LegendItem {
    label: string;
    color: string;
    value?: string | number;
    visible?: boolean;
  }

  interface Props {
    items: LegendItem[];
    position?: 'top' | 'bottom' | 'left' | 'right';
    orientation?: 'horizontal' | 'vertical';
    onToggle?: (index: number, visible: boolean) => void;
    interactive?: boolean;
    showValues?: boolean;
    maxWidth?: number;
  }

  let {
    items,
    position = 'bottom',
    orientation = 'horizontal',
    onToggle,
    interactive = true,
    showValues = false,
    maxWidth = 400
  }: Props = $props();

  // Auto-determine orientation based on position if not explicitly set
  const legendOrientation = $derived(() => {
    if (orientation) return orientation;
    return (position === 'left' || position === 'right') ? 'vertical' : 'horizontal';
  });

  // Handle legend item toggle
  function handleToggle(index: number) {
    if (!interactive || !onToggle) return;
    
    const item = items[index];
    const newVisible = item.visible !== false ? false : true;
    onToggle(index, newVisible);
  }

  // Format values for display
  function formatValue(value: string | number): string {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}K`;
      } else if (value % 1 === 0) {
        return value.toLocaleString();
      } else {
        return value.toFixed(1);
      }
    }
    return String(value);
  }
</script>

<div 
  class="chart-legend"
  class:legend-top={position === 'top'}
  class:legend-bottom={position === 'bottom'}
  class:legend-left={position === 'left'}
  class:legend-right={position === 'right'}
  class:legend-horizontal={legendOrientation() === 'horizontal'}
  class:legend-vertical={legendOrientation() === 'vertical'}
  class:legend-interactive={interactive}
  style:max-width="{maxWidth}px"
>
  <div class="legend-items">
    {#each items as item, index}
      <div
        class="legend-item"
        class:legend-item-hidden={item.visible === false}
        class:legend-item-clickable={interactive}
        role={interactive ? 'button' : undefined}
        tabindex={interactive ? 0 : undefined}
        onclick={() => handleToggle(index)}
        onkeydown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleToggle(index);
          }
        }}
      >
        <!-- Color indicator -->
        <div 
          class="legend-color"
          style:background-color={item.color}
          class:legend-color-hidden={item.visible === false}
        ></div>

        <!-- Label and value -->
        <div class="legend-content">
          <span class="legend-label">{item.label}</span>
          {#if showValues && item.value !== undefined}
            <span class="legend-value">({formatValue(item.value)})</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .chart-legend {
    flex-shrink: 0;
  }

  .legend-items {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .legend-horizontal .legend-items {
    flex-direction: row;
  }

  .legend-vertical .legend-items {
    flex-direction: column;
    gap: 0.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.2s ease-in-out;
    font-size: 0.875rem;
  }

  .legend-item-clickable {
    cursor: pointer;
    user-select: none;
    border-radius: 0.25rem;
    padding: 0.125rem 0.25rem;
  }

  .legend-item-clickable:hover {
    opacity: 0.8;
  }

  .legend-item-clickable:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  .legend-item-hidden {
    opacity: 0.5;
  }

  .legend-color {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    flex-shrink: 0;
    transition: all 0.2s ease-in-out;
  }

  .legend-color-hidden {
    background-color: #d1d5db;
  }

  .legend-content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-width: 0;
  }

  .legend-label {
    color: #374151;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .legend-value {
    color: #6b7280;
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  /* Position-specific styles */
  .legend-top {
    margin-bottom: 1rem;
  }

  .legend-bottom {
    margin-top: 1rem;
  }

  .legend-left {
    margin-right: 1rem;
  }

  .legend-right {
    margin-left: 1rem;
  }

  /* Responsive adjustments */
  .legend-horizontal .legend-items {
    justify-content: center;
  }

  .legend-vertical .legend-items {
    align-items: flex-start;
  }

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    .legend-label {
      color: #e5e7eb;
    }

    .legend-value {
      color: #9ca3af;
    }

    .legend-item-clickable:focus {
      box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5);
    }

    .legend-color-hidden {
      background-color: #4b5563;
    }
  }

  /* Container query responsive adjustments */
  @container (max-width: 300px) {
    .legend-horizontal .legend-items {
      flex-direction: column;
      gap: 0.5rem;
    }

    .legend-item {
      font-size: 0.75rem;
    }

    .legend-color {
      width: 0.625rem;
      height: 0.625rem;
    }
  }

  /* Hide values on very small screens */
  @container (max-width: 200px) {
    .legend-value {
      display: none;
    }
  }
</style>