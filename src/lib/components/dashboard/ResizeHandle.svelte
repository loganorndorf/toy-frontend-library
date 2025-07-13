<script lang="ts">
  interface GridLayout {
    x: number;
    y: number;
    w: number;
    h: number;
  }

  interface Props {
    layout: GridLayout;
    gridCols?: number;
    gridRows?: number;
    onResize?: (newLayout: GridLayout) => void;
    onResizeStart?: () => void;
    onResizeEnd?: () => void;
    disabled?: boolean;
  }

  let {
    layout,
    gridCols = 12,
    gridRows = 8,
    onResize,
    onResizeStart,
    onResizeEnd,
    disabled = false
  }: Props = $props();

  let isResizing = $state(false);
  let startPosition = $state({ x: 0, y: 0 });
  let startLayout = $state<GridLayout>({ x: 0, y: 0, w: 0, h: 0 });

  function handleMouseDown(event: MouseEvent, direction: 'se' | 'e' | 's') {
    if (disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    isResizing = true;
    startPosition = { x: event.clientX, y: event.clientY };
    startLayout = { ...layout };
    
    onResizeStart?.();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = moveEvent.clientX - startPosition.x;
      const deltaY = moveEvent.clientY - startPosition.y;
      
      // Get container dimensions to calculate grid size
      const container = event.target.closest('.dashboard-grid');
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const cellWidth = containerRect.width / gridCols;
      const cellHeight = containerRect.height / gridRows;
      
      // Calculate new dimensions based on direction
      let newLayout = { ...startLayout };
      
      if (direction === 'se' || direction === 'e') {
        const deltaGridX = Math.round(deltaX / cellWidth);
        newLayout.w = Math.max(1, Math.min(gridCols - newLayout.x, startLayout.w + deltaGridX));
      }
      
      if (direction === 'se' || direction === 's') {
        const deltaGridY = Math.round(deltaY / cellHeight);
        newLayout.h = Math.max(1, Math.min(gridRows - newLayout.y, startLayout.h + deltaGridY));
      }
      
      onResize?.(newLayout);
    };

    const handleMouseUp = () => {
      isResizing = false;
      onResizeEnd?.();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
</script>

{#if !disabled}
  <!-- Southeast corner resize handle -->
  <div
    class="resize-handle resize-handle-se"
    class:active={isResizing}
    onmousedown={(e) => handleMouseDown(e, 'se')}
    role="button"
    tabindex="0"
    aria-label="Resize widget"
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M12 12L0 12L12 0V12Z" fill="currentColor" opacity="0.3"/>
      <path d="M8.5 12L12 8.5V12H8.5Z" fill="currentColor"/>
      <path d="M5 12L12 5V7L7 12H5Z" fill="currentColor"/>
    </svg>
  </div>

  <!-- Right edge resize handle -->
  <div
    class="resize-handle resize-handle-e"
    class:active={isResizing}
    onmousedown={(e) => handleMouseDown(e, 'e')}
    role="button"
    tabindex="0"
    aria-label="Resize widget width"
  />

  <!-- Bottom edge resize handle -->
  <div
    class="resize-handle resize-handle-s"
    class:active={isResizing}
    onmousedown={(e) => handleMouseDown(e, 's')}
    role="button"
    tabindex="0"
    aria-label="Resize widget height"
  />
{/if}

<style>
  .resize-handle {
    @apply absolute;
    @apply opacity-0 transition-opacity duration-200;
    @apply z-10;
  }

  /* Show handles on parent hover */
  :global(.widget-container:hover) .resize-handle {
    @apply opacity-100;
  }

  .resize-handle.active {
    @apply opacity-100;
  }

  .resize-handle-se {
    @apply bottom-0 right-0 w-4 h-4;
    @apply cursor-nw-resize;
    @apply text-blue-500;
    @apply flex items-center justify-center;
  }

  .resize-handle-e {
    @apply top-2 bottom-2 right-0 w-1;
    @apply cursor-ew-resize;
    @apply bg-blue-500;
  }

  .resize-handle-s {
    @apply bottom-0 left-2 right-2 h-1;
    @apply cursor-ns-resize;
    @apply bg-blue-500;
  }

  .resize-handle:hover {
    @apply opacity-100;
  }

  .resize-handle-se:hover {
    @apply text-blue-600;
  }

  .resize-handle-e:hover,
  .resize-handle-s:hover {
    @apply bg-blue-600;
  }

  .resize-handle.active {
    @apply z-20;
  }

  .resize-handle-se.active {
    @apply text-blue-700;
  }

  .resize-handle-e.active,
  .resize-handle-s.active {
    @apply bg-blue-700;
  }
</style>