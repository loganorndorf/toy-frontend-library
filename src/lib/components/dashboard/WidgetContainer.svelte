<script lang="ts">
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

  interface Props {
    config: WidgetConfig;
    resizable?: boolean;
    draggable?: boolean;
    editMode?: boolean;
    gridCols?: number;
    onResize?: (id: string, layout: GridLayout) => void;
    onDrag?: (id: string, layout: GridLayout) => void;
    onRemove?: (id: string) => void;
    children?: any;
  }

  let {
    config,
    resizable = true,
    draggable = true,
    editMode = false,
    gridCols = 12,
    onResize,
    onDrag,
    onRemove,
    children
  }: Props = $props();

  // Grid positioning styles
  const gridStyles = $derived({
    gridColumn: `${config.layout.x + 1} / span ${config.layout.w}`,
    gridRow: `${config.layout.y + 1} / span ${config.layout.h}`,
  });

  // Drag state
  let isDragging = $state(false);
  let dragOffset = $state({ x: 0, y: 0 });

  // Resize state
  let isResizing = $state(false);
  let resizeDirection = $state<'se' | 'e' | 's' | null>(null);

  // Handle drag start
  function handleDragStart(event: MouseEvent) {
    if (!draggable || !editMode) return;
    
    isDragging = true;
    dragOffset = {
      x: event.clientX,
      y: event.clientY
    };
    
    event.preventDefault();
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  }

  // Handle drag move
  function handleDragMove(event: MouseEvent) {
    if (!isDragging) return;
    
    // Calculate grid position change based on mouse movement
    const deltaX = event.clientX - dragOffset.x;
    const deltaY = event.clientY - dragOffset.y;
    
    // Convert pixel movement to grid units (approximate)
    const gridUnit = 50; // Approximate grid cell size
    const gridDeltaX = Math.round(deltaX / gridUnit);
    const gridDeltaY = Math.round(deltaY / gridUnit);
    
    if (Math.abs(gridDeltaX) >= 1 || Math.abs(gridDeltaY) >= 1) {
      const newLayout = {
        ...config.layout,
        x: Math.max(0, Math.min(gridCols - config.layout.w, config.layout.x + gridDeltaX)),
        y: Math.max(0, config.layout.y + gridDeltaY)
      };
      
      onDrag?.(config.id, newLayout);
      dragOffset = { x: event.clientX, y: event.clientY };
    }
  }

  // Handle drag end
  function handleDragEnd() {
    isDragging = false;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  }

  // Handle resize start
  function handleResizeStart(event: MouseEvent, direction: 'se' | 'e' | 's') {
    if (!resizable || !editMode) return;
    
    isResizing = true;
    resizeDirection = direction;
    dragOffset = {
      x: event.clientX,
      y: event.clientY
    };
    
    event.stopPropagation();
    event.preventDefault();
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  }

  // Handle resize move
  function handleResizeMove(event: MouseEvent) {
    if (!isResizing || !resizeDirection) return;
    
    const deltaX = event.clientX - dragOffset.x;
    const deltaY = event.clientY - dragOffset.y;
    
    const gridUnit = 50;
    const gridDeltaX = Math.round(deltaX / gridUnit);
    const gridDeltaY = Math.round(deltaY / gridUnit);
    
    if (Math.abs(gridDeltaX) >= 1 || Math.abs(gridDeltaY) >= 1) {
      const newLayout = { ...config.layout };
      
      if (resizeDirection.includes('e')) {
        newLayout.w = Math.max(1, Math.min(gridCols - config.layout.x, config.layout.w + gridDeltaX));
      }
      if (resizeDirection.includes('s')) {
        newLayout.h = Math.max(1, config.layout.h + gridDeltaY);
      }
      
      onResize?.(config.id, newLayout);
      dragOffset = { x: event.clientX, y: event.clientY };
    }
  }

  // Handle resize end
  function handleResizeEnd() {
    isResizing = false;
    resizeDirection = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  }

  // Handle remove widget
  function handleRemove() {
    onRemove?.(config.id);
  }
</script>

<div 
  class="widget-container"
  class:edit-mode={editMode}
  class:dragging={isDragging}
  class:resizing={isResizing}
  style:grid-column={gridStyles.gridColumn}
  style:grid-row={gridStyles.gridRow}
>
  <!-- Widget Header -->
  <div 
    class="widget-header"
    class:draggable={draggable && editMode}
    role="button"
    tabindex={draggable && editMode ? 0 : -1}
    onmousedown={handleDragStart}
  >
    <h3 class="widget-title">{config.title}</h3>
    
    {#if editMode}
      <div class="widget-actions">
        <button 
          class="action-btn"
          onclick={handleRemove}
          title="Remove widget"
        >
          ×
        </button>
      </div>
    {/if}
  </div>

  <!-- Widget Content -->
  <div class="widget-content">
    {@render children?.()}
  </div>

  <!-- Resize Handles -->
  {#if resizable && editMode}
    <div class="resize-handles">
      <!-- Bottom-right handle -->
      <div 
        class="resize-handle resize-se"
        role="button"
        tabindex="0"
        onmousedown={(e) => handleResizeStart(e, 'se')}
      ></div>
      
      <!-- Right handle -->
      <div 
        class="resize-handle resize-e"
        role="button"
        tabindex="0"
        onmousedown={(e) => handleResizeStart(e, 'e')}
      ></div>
      
      <!-- Bottom handle -->
      <div 
        class="resize-handle resize-s"
        role="button"
        tabindex="0"
        onmousedown={(e) => handleResizeStart(e, 's')}
      ></div>
    </div>
  {/if}
</div>

<style>
  .widget-container {
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 200px;
    transition: all 0.2s ease;
  }

  .widget-container.edit-mode {
    border-color: #93c5fd;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .widget-container.dragging {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 10;
    border-color: #3b82f6;
    transform: rotate(2deg);
  }

  .widget-container.resizing {
    border-color: #3b82f6;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .widget-header {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9fafb;
    border-radius: 0.5rem 0.5rem 0 0;
    user-select: none;
  }

  .widget-header.draggable {
    cursor: move;
  }

  .widget-header.draggable:hover {
    background-color: #f3f4f6;
  }

  .widget-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .widget-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .action-btn {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    color: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    font-weight: 700;
    transition: color 0.15s ease-in-out;
  }
  
  .action-btn:hover {
    color: #4b5563;
  }

  .action-btn:hover {
    background-color: #e5e7eb;
  }

  .widget-content {
    flex: 1;
    padding: 1rem;
    overflow: hidden;
  }

  .resize-handles {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }

  .resize-handle {
    position: absolute;
    pointer-events: auto;
    background-color: #3b82f6;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }

  .edit-mode .resize-handle {
    opacity: 0.6;
  }

  .resize-handle:hover {
    opacity: 1;
  }

  .resize-se {
    bottom: 0;
    right: 0;
    width: 0.75rem;
    height: 0.75rem;
    cursor: se-resize;
    border-radius: 0 0 0.5rem 0;
  }

  .resize-e {
    top: 2rem;
    right: 0;
    width: 0.25rem;
    bottom: 0.75rem;
    cursor: e-resize;
  }

  .resize-s {
    bottom: 0;
    left: 2rem;
    right: 0.75rem;
    height: 0.25rem;
    cursor: s-resize;
  }
</style>