<script lang="ts">
  interface Props {
    gridCols?: number;
    gridRows?: number;
    showGrid?: boolean;
    cellGap?: number;
    opacity?: number;
  }

  let {
    gridCols = 12,
    gridRows = 8,
    showGrid = true,
    cellGap = 8,
    opacity = 0.1
  }: Props = $props();

  // Generate grid lines
  const gridLines = $derived(() => {
    const lines = [];
    
    // Vertical lines
    for (let i = 0; i <= gridCols; i++) {
      lines.push({
        type: 'vertical',
        position: `${(i / gridCols) * 100}%`,
        key: `v-${i}`
      });
    }
    
    // Horizontal lines
    for (let i = 0; i <= gridRows; i++) {
      lines.push({
        type: 'horizontal',
        position: `${(i / gridRows) * 100}%`,
        key: `h-${i}`
      });
    }
    
    return lines;
  });

  // Generate grid cells for better visual feedback
  const gridCells = $derived(() => {
    const cells = [];
    
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        cells.push({
          row,
          col,
          key: `cell-${row}-${col}`,
          style: {
            gridColumn: `${col + 1} / ${col + 2}`,
            gridRow: `${row + 1} / ${row + 2}`
          }
        });
      }
    }
    
    return cells;
  });
</script>

{#if showGrid}
  <div 
    class="grid-overlay"
    style:opacity={opacity}
    style:grid-template-columns="repeat({gridCols}, 1fr)"
    style:grid-template-rows="repeat({gridRows}, 1fr)"
    style:gap="{cellGap}px"
  >
    <!-- Grid cells for visual feedback -->
    {#each gridCells as cell (cell.key)}
      <div 
        class="grid-cell"
        style:grid-column={cell.style.gridColumn}
        style:grid-row={cell.style.gridRow}
        data-row={cell.row}
        data-col={cell.col}
      />
    {/each}
    
    <!-- Grid lines overlay -->
    <div class="grid-lines">
      {#each gridLines as line (line.key)}
        {#if line.type === 'vertical'}
          <div 
            class="grid-line vertical"
            style:left={line.position}
          />
        {:else}
          <div 
            class="grid-line horizontal"
            style:top={line.position}
          />
        {/if}
      {/each}
    </div>
  </div>
{/if}

<style>
  .grid-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    z-index: 0;
    display: grid;
  }

  .grid-cell {
    background-color: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(147, 197, 253, 0.2);
    border-radius: 0.125rem;
    transition: all 0.2s ease-in-out;
  }

  .grid-cell:hover {
    background-color: rgba(59, 130, 246, 0.1);
    border-color: rgba(147, 197, 253, 0.4);
  }

  .grid-lines {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }

  .grid-line {
    position: absolute;
    background-color: rgba(96, 165, 250, 0.3);
    pointer-events: none;
  }

  .grid-line.vertical {
    width: 1px;
    height: 100%;
  }

  .grid-line.horizontal {
    height: 1px;
    width: 100%;
  }

  /* Enhanced visibility during drag operations */
  :global(.dashboard-grid.dragging) .grid-cell {
    background-color: rgba(59, 130, 246, 0.15);
    border-color: rgba(147, 197, 253, 0.6);
  }

  :global(.dashboard-grid.dragging) .grid-line {
    background-color: rgba(96, 165, 250, 0.5);
  }

  /* Drop zone highlighting */
  .grid-cell[data-drop-zone="true"] {
    background-color: rgba(34, 197, 94, 0.2);
    border-color: rgba(74, 222, 128, 0.6);
  }

  .grid-cell[data-invalid-drop="true"] {
    background-color: rgba(239, 68, 68, 0.2);
    border-color: rgba(248, 113, 113, 0.6);
  }
</style>