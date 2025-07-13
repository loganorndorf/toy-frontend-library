<script lang="ts">
  interface WidgetConfig {
    id: string;
    title: string;
    type: 'chart' | 'table' | 'kpi';
  }

  interface Props {
    config: WidgetConfig;
    editMode?: boolean;
    draggable?: boolean;
    showActions?: boolean;
    onDragStart?: (event: MouseEvent) => void;
    onRemove?: (config: WidgetConfig) => void;
    onEdit?: (config: WidgetConfig) => void;
    onFullscreen?: (config: WidgetConfig) => void;
    onRefresh?: (config: WidgetConfig) => void;
  }

  let {
    config,
    editMode = false,
    draggable = true,
    showActions = true,
    onDragStart,
    onRemove,
    onEdit,
    onFullscreen,
    onRefresh
  }: Props = $props();

  function handleDragStart(event: MouseEvent) {
    if (!draggable || !editMode) return;
    onDragStart?.(event);
  }

  function handleRemove() {
    onRemove?.(config);
  }

  function handleEdit() {
    onEdit?.(config);
  }

  function handleFullscreen() {
    onFullscreen?.(config);
  }

  function handleRefresh() {
    onRefresh?.(config);
  }
</script>

<div 
  class="widget-header"
  class:draggable={draggable && editMode}
  class:edit-mode={editMode}
  role="button"
  tabindex={draggable && editMode ? 0 : -1}
  onmousedown={handleDragStart}
>
  <!-- Drag handle indicator -->
  {#if editMode && draggable}
    <div class="drag-handle">
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="1" fill="currentColor"/>
        <circle cx="6" cy="2" r="1" fill="currentColor"/>
        <circle cx="2" cy="6" r="1" fill="currentColor"/>
        <circle cx="6" cy="6" r="1" fill="currentColor"/>
        <circle cx="2" cy="10" r="1" fill="currentColor"/>
        <circle cx="6" cy="10" r="1" fill="currentColor"/>
      </svg>
    </div>
  {/if}

  <!-- Widget title and type badge -->
  <div class="flex items-center gap-2 flex-1">
    <h3 class="widget-title">{config.title}</h3>
    <span class="widget-type-badge">{config.type}</span>
  </div>

  <!-- Action buttons -->
  {#if showActions}
    <div class="widget-actions">
      {#if !editMode}
        <!-- Normal mode actions -->
        {#if onRefresh}
          <button 
            class="action-btn"
            onclick={handleRefresh}
            title="Refresh widget"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
          </button>
        {/if}

        {#if onEdit}
          <button 
            class="action-btn"
            onclick={handleEdit}
            title="Edit widget"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        {/if}
        
        {#if onFullscreen}
          <button 
            class="action-btn"
            onclick={handleFullscreen}
            title="Fullscreen"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
              <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
              <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
              <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
            </svg>
          </button>
        {/if}
      {:else}
        <!-- Edit mode actions -->
        {#if onRemove}
          <button 
            class="action-btn remove-btn"
            onclick={handleRemove}
            title="Remove widget"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c-1 0 2 1 2 2v2"/>
            </svg>
          </button>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style>
  .widget-header {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: #f9fafb;
    border-radius: 0.5rem 0.5rem 0 0;
    user-select: none;
    transition: color 0.15s ease-in-out;
    min-height: 48px;
  }

  .widget-header.draggable {
    cursor: move;
  }

  .widget-header.draggable:hover {
    background-color: #f3f4f6;
  }

  .widget-header.edit-mode {
    background-color: #eff6ff;
    border-color: #bfdbfe;
  }

  .widget-header.edit-mode.draggable:hover {
    background-color: #dbeafe;
  }

  .drag-handle {
    color: #9ca3af;
    flex-shrink: 0;
    transition: color 0.15s ease-in-out;
  }

  .widget-header.draggable:hover .drag-handle {
    color: #4b5563;
  }

  .widget-header.edit-mode .drag-handle {
    color: #3b82f6;
  }

  .widget-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.25;
  }

  .widget-header.edit-mode .widget-title {
    color: #1e3a8a;
  }

  .widget-type-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background-color: #f3f4f6;
    color: #4b5563;
    border-radius: 9999px;
    text-transform: capitalize;
    flex-shrink: 0;
  }

  .widget-header.edit-mode .widget-type-badge {
    background-color: #dbeafe;
    color: #1d4ed8;
  }

  .widget-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
  }

  .action-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    color: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
  }
  
  .action-btn:hover {
    color: #4b5563;
    background-color: #e5e7eb;
  }

  .action-btn:hover {
    transform: scale(1.05);
  }

  .remove-btn {
    color: #f87171;
  }
  
  .remove-btn:hover {
    color: #dc2626;
    background-color: #fee2e2;
  }

  /* Prevent drag on action buttons */
  .widget-actions {
    pointer-events: auto;
  }

  .action-btn {
    pointer-events: auto;
  }

  .action-btn:active {
    transform: scale(0.95);
  }
</style>