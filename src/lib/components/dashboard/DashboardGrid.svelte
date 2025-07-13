<script lang="ts">
  import WidgetContainer from './WidgetContainer.svelte';

  interface GridLayout {
    x: number;
    y: number;
    w: number;
    h: number;
  }

  interface WidgetConfig {
    id: string;
    type: 'chart' | 'table' | 'kpi';
    title: string;
    layout: GridLayout;
    config: any;
  }

  interface DashboardConfig {
    id: string;
    name: string;
    gridCols: number;
    gridRows: number;
    widgets: WidgetConfig[];
  }

  interface Props {
    config: DashboardConfig;
    editMode?: boolean;
    onWidgetUpdate?: (widgetId: string, updates: Partial<WidgetConfig>) => void;
    onWidgetRemove?: (widgetId: string) => void;
    onWidgetAdd?: (widget: WidgetConfig) => void;
  }

  let {
    config,
    editMode = false,
    onWidgetUpdate,
    onWidgetRemove,
    onWidgetAdd,
    children
  }: Props = $props();

  // Grid state
  let gridElement: HTMLDivElement;
  let gridCellSize = $state(50);
  let isDragging = $state(false);
  let draggedWidget: WidgetConfig | null = $state(null);
  let draggedElement: HTMLElement | null = $state(null);
  let dropZone: { x: number; y: number } | null = $state(null);

  // Calculate grid template using $derived
  const gridTemplateColumns = $derived(`repeat(${config.gridCols}, 1fr)`);
  const maxRowNeeded = $derived(() => {
    return config.widgets.reduce((max, widget) => {
      return Math.max(max, widget.layout.y + widget.layout.h);
    }, config.gridRows);
  });
  const gridTemplateRows = $derived(`repeat(${Math.max(config.gridRows, maxRowNeeded())}, minmax(60px, auto))`);

  // Check for widget collisions
  function hasCollision(widget: WidgetConfig, otherWidgets: WidgetConfig[]): boolean {
    return otherWidgets.some(other => {
      if (other.id === widget.id) return false;
      
      return !(
        widget.layout.x >= other.layout.x + other.layout.w ||
        widget.layout.x + widget.layout.w <= other.layout.x ||
        widget.layout.y >= other.layout.y + other.layout.h ||
        widget.layout.y + widget.layout.h <= other.layout.y
      );
    });
  }

  // Find available position for a widget
  function findAvailablePosition(widget: WidgetConfig): GridLayout {
    const { w, h } = widget.layout;
    
    for (let y = 0; y < config.gridRows * 2; y++) {
      for (let x = 0; x <= config.gridCols - w; x++) {
        const testWidget = {
          ...widget,
          layout: { x, y, w, h }
        };
        
        if (!hasCollision(testWidget, config.widgets)) {
          return { x, y, w, h };
        }
      }
    }
    
    // If no position found, place at end
    const maxY = maxRowNeeded();
    return { x: 0, y: maxY, w, h };
  }

  // Handle widget resize
  function handleWidgetResize(widgetId: string, newLayout: GridLayout) {
    const widget = config.widgets.find(w => w.id === widgetId);
    if (!widget) return;

    const updatedWidget = {
      ...widget,
      layout: newLayout
    };

    // Check for collisions and adjust if needed
    const otherWidgets = config.widgets.filter(w => w.id !== widgetId);
    if (hasCollision(updatedWidget, otherWidgets)) {
      // Try to find a nearby available position
      const availableLayout = findAvailablePosition(updatedWidget);
      onWidgetUpdate?.(widgetId, { layout: availableLayout });
    } else {
      onWidgetUpdate?.(widgetId, { layout: newLayout });
    }
  }

  // Enhanced drag handling with collision detection
  function handleWidgetDragStart(widgetId: string, event: MouseEvent) {
    if (!editMode) return;
    
    const widget = config.widgets.find(w => w.id === widgetId);
    if (!widget) return;
    
    isDragging = true;
    draggedWidget = widget;
    draggedElement = event.target as HTMLElement;
    
    // Add global drag event listeners
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  }

  function handleGlobalMouseMove(event: MouseEvent) {
    if (!isDragging || !draggedWidget || !gridElement) return;
    
    const gridRect = gridElement.getBoundingClientRect();
    const cellWidth = gridRect.width / config.gridCols;
    const cellHeight = gridCellSize;
    
    // Calculate grid position from mouse coordinates
    const x = Math.floor((event.clientX - gridRect.left) / cellWidth);
    const y = Math.floor((event.clientY - gridRect.top) / cellHeight);
    
    // Clamp to grid bounds
    const clampedX = Math.max(0, Math.min(x, config.gridCols - draggedWidget.layout.w));
    const clampedY = Math.max(0, y);
    
    dropZone = { x: clampedX, y: clampedY };
  }

  function handleGlobalMouseUp() {
    if (!isDragging || !draggedWidget || !dropZone) {
      cleanupDrag();
      return;
    }
    
    const newLayout = {
      ...draggedWidget.layout,
      x: dropZone.x,
      y: dropZone.y
    };
    
    const updatedWidget = { ...draggedWidget, layout: newLayout };
    const otherWidgets = config.widgets.filter(w => w.id !== draggedWidget.id);
    
    // Check for collisions and place widget
    if (!hasCollision(updatedWidget, otherWidgets)) {
      onWidgetUpdate?.(draggedWidget.id, { layout: newLayout });
    } else {
      // Find alternative position if collision detected
      const availableLayout = findAvailablePosition(updatedWidget);
      onWidgetUpdate?.(draggedWidget.id, { layout: availableLayout });
    }
    
    cleanupDrag();
  }

  function cleanupDrag() {
    isDragging = false;
    draggedWidget = null;
    draggedElement = null;
    dropZone = null;
    
    document.removeEventListener('mousemove', handleGlobalMouseMove);
    document.removeEventListener('mouseup', handleGlobalMouseUp);
  }

  // Handle widget drag (legacy method for compatibility)
  function handleWidgetDrag(widgetId: string, newLayout: GridLayout) {
    const widget = config.widgets.find(w => w.id === widgetId);
    if (!widget) return;

    const updatedWidget = {
      ...widget,
      layout: newLayout
    };

    // Check for collisions
    const otherWidgets = config.widgets.filter(w => w.id !== widgetId);
    if (!hasCollision(updatedWidget, otherWidgets)) {
      onWidgetUpdate?.(widgetId, { layout: newLayout });
    }
  }

  // Handle widget removal
  function handleWidgetRemove(widgetId: string) {
    onWidgetRemove?.(widgetId);
  }

  // Calculate grid cell size for responsive behavior
  $effect(() => {
    if (!gridElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        gridCellSize = width / config.gridCols;
      }
    });

    resizeObserver.observe(gridElement);

    return () => {
      resizeObserver.disconnect();
    };
  });

  // Grid overlay cells for edit mode with collision detection
  const gridOverlayCells = $derived(() => {
    const rows = maxRowNeeded();
    const cells = [];
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < config.gridCols; x++) {
        const isOccupied = config.widgets.some(widget => 
          x >= widget.layout.x && 
          x < widget.layout.x + widget.layout.w &&
          y >= widget.layout.y && 
          y < widget.layout.y + widget.layout.h
        );
        
        const isDropZone = dropZone && 
          draggedWidget &&
          x >= dropZone.x && 
          x < dropZone.x + draggedWidget.layout.w &&
          y >= dropZone.y && 
          y < dropZone.y + draggedWidget.layout.h;
        
        const wouldCollide = isDropZone && draggedWidget && config.widgets.some(widget => 
          widget.id !== draggedWidget.id &&
          !(dropZone.x >= widget.layout.x + widget.layout.w ||
            dropZone.x + draggedWidget.layout.w <= widget.layout.x ||
            dropZone.y >= widget.layout.y + widget.layout.h ||
            dropZone.y + draggedWidget.layout.h <= widget.layout.y)
        );
        
        cells.push({
          x,
          y,
          index: y * config.gridCols + x,
          isOccupied,
          isDropZone,
          wouldCollide
        });
      }
    }
    
    return cells;
  });
</script>

<div 
  bind:this={gridElement}
  class="dashboard-grid"
  class:edit-mode={editMode}
  class:dragging={isDragging}
  style:grid-template-columns={gridTemplateColumns}
  style:grid-template-rows={gridTemplateRows}
  style:gap="{editMode ? '8px' : '16px'}"
>
  {#each config.widgets as widget (widget.id)}
    <WidgetContainer 
      config={widget}
      {editMode}
      gridCols={config.gridCols}
      dragging={isDragging && draggedWidget?.id === widget.id}
      onResize={handleWidgetResize}
      onDrag={handleWidgetDrag}
      onDragStart={(event) => handleWidgetDragStart(widget.id, event)}
      onRemove={handleWidgetRemove}
    >
      {#snippet children()}
        <!-- Render different widget types -->
        {#if widget.type === 'chart'}
          <div class="placeholder-content chart-placeholder">
            <div class="placeholder-icon">📊</div>
            <div class="placeholder-text">Chart: {widget.config?.type || 'Unknown'}</div>
          </div>
        {:else if widget.type === 'table'}
          <div class="placeholder-content table-placeholder">
            <div class="placeholder-icon">📋</div>
            <div class="placeholder-text">Data Table</div>
          </div>
        {:else if widget.type === 'kpi'}
          <div class="placeholder-content kpi-placeholder">
            <div class="placeholder-icon">📈</div>
            <div class="placeholder-text">KPI Metrics</div>
          </div>
        {:else}
          <div class="placeholder-content">
            <div class="placeholder-text">Unknown Widget Type</div>
          </div>
        {/if}
      {/snippet}
    </WidgetContainer>
  {/each}

  <!-- Enhanced grid overlay for edit mode -->
  {#if editMode}
    <div class="grid-overlay">
      {#each gridOverlayCells() as cell (cell.index)}
        <div 
          class="grid-cell" 
          class:occupied={cell.isOccupied}
          class:drop-zone={cell.isDropZone && !cell.wouldCollide}
          class:collision={cell.wouldCollide}
          data-x={cell.x}
          data-y={cell.y}
        ></div>
      {/each}
    </div>
  {/if}
</div>

<!-- Dashboard actions -->
{#if editMode}
  <div class="dashboard-actions">
    <button class="action-button primary">
      + Add Widget
    </button>
    <button class="action-button secondary">
      Save Layout
    </button>
  </div>
{/if}

<style>
  .dashboard-grid {
    @apply w-full min-h-screen;
    display: grid;
    @apply p-4;
    @apply relative;
    transition: gap 0.2s ease;
  }

  .dashboard-grid.edit-mode {
    @apply bg-gray-50;
  }

  .dashboard-grid.dragging {
    @apply bg-blue-50;
  }

  .grid-overlay {
    @apply absolute inset-4;
    display: grid;
    grid-template-columns: inherit;
    grid-template-rows: inherit;
    gap: inherit;
    pointer-events: none;
    z-index: 0;
  }

  .grid-cell {
    @apply border border-gray-200 border-dashed;
    @apply bg-transparent;
    min-height: 60px;
    opacity: 0.3;
    transition: all 0.2s ease;
  }

  .grid-cell.occupied {
    @apply bg-gray-100 border-gray-300;
    opacity: 0.5;
  }

  .grid-cell.drop-zone {
    @apply bg-green-100 border-green-400;
    @apply border-solid;
    opacity: 0.8;
  }

  .grid-cell.collision {
    @apply bg-red-100 border-red-400;
    @apply border-solid;
    opacity: 0.8;
  }

  .placeholder-content {
    @apply h-full flex flex-col items-center justify-center;
    @apply text-gray-500 text-center;
    @apply p-4;
  }

  .placeholder-icon {
    @apply text-4xl mb-2;
    @apply opacity-50;
  }

  .placeholder-text {
    @apply text-sm font-medium;
    @apply opacity-70;
  }

  .chart-placeholder {
    @apply bg-blue-50 text-blue-600;
  }

  .table-placeholder {
    @apply bg-green-50 text-green-600;
  }

  .kpi-placeholder {
    @apply bg-purple-50 text-purple-600;
  }

  .dashboard-actions {
    @apply fixed bottom-6 right-6;
    @apply flex gap-3;
    @apply z-50;
  }

  .action-button {
    @apply px-4 py-2 rounded-lg font-medium;
    @apply shadow-lg border;
    @apply transition-all duration-200;
    @apply flex items-center gap-2;
  }

  .action-button.primary {
    @apply bg-blue-600 text-white border-blue-600;
    @apply hover:bg-blue-700 hover:border-blue-700;
  }

  .action-button.secondary {
    @apply bg-white text-gray-700 border-gray-300;
    @apply hover:bg-gray-50 hover:border-gray-400;
  }

  .action-button:hover {
    @apply shadow-xl;
    transform: translateY(-1px);
  }
</style>