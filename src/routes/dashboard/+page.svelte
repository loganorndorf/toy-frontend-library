<script lang="ts">
  import { 
    DashboardGrid, 
    WidgetContainer, 
    WidgetHeader, 
    ResizeHandle, 
    GridOverlay 
  } from '$lib/components/dashboard';
  import { BarChartLayerCake, LineChart, ComboChart } from '$lib/components/charts';

  interface WidgetConfig {
    id: string;
    title: string;
    type: 'chart' | 'table' | 'kpi';
    layout: {
      x: number;
      y: number; 
      w: number;
      h: number;
    };
  }

  let editMode = $state(false);
  let showGrid = $state(false);

  // Sample widget configurations
  let widgets: WidgetConfig[] = $state([
    {
      id: 'compensation-bars',
      title: 'Physician Compensation',
      type: 'chart',
      layout: { x: 0, y: 0, w: 6, h: 3 }
    },
    {
      id: 'trend-line',
      title: 'Quarterly Trends', 
      type: 'chart',
      layout: { x: 6, y: 0, w: 6, h: 3 }
    },
    {
      id: 'combo-analysis',
      title: 'Compensation & wRVU Analysis',
      type: 'chart', 
      layout: { x: 0, y: 3, w: 8, h: 4 }
    },
    {
      id: 'kpi-summary',
      title: 'Key Metrics',
      type: 'kpi',
      layout: { x: 8, y: 3, w: 4, h: 2 }
    }
  ]);

  // Sample data
  const compensationData = [
    { label: 'Dr. Smith', value: 285000 },
    { label: 'Dr. Johnson', value: 312000 },
    { label: 'Dr. Williams', value: 275000 },
    { label: 'Dr. Brown', value: 298000 }
  ];

  const trendData = [
    { label: 'Q1', value: 285000 },
    { label: 'Q2', value: 292000 },
    { label: 'Q3', value: 298000 },
    { label: 'Q4', value: 305000 }
  ];

  const comboData = [
    { label: 'Jan', barValue: 285000, lineValue: 4200 },
    { label: 'Feb', barValue: 292000, lineValue: 4350 },
    { label: 'Mar', barValue: 298000, lineValue: 4450 },
    { label: 'Apr', barValue: 305000, lineValue: 4600 }
  ];

  function toggleEditMode() {
    editMode = !editMode;
    showGrid = editMode;
  }

  function handleWidgetEdit(config: WidgetConfig) {
    console.log('Edit widget:', config);
  }

  function handleWidgetRemove(config: WidgetConfig) {
    widgets = widgets.filter(w => w.id !== config.id);
  }

  function handleWidgetFullscreen(config: WidgetConfig) {
    console.log('Fullscreen widget:', config);
  }

  function handleWidgetRefresh(config: WidgetConfig) {
    console.log('Refresh widget:', config);
  }

  function handleLayoutResize(widgetId: string, newLayout: any) {
    widgets = widgets.map(w => 
      w.id === widgetId ? { ...w, layout: newLayout } : w
    );
  }
</script>

<svelte:head>
  <title>Dashboard Demo</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Dashboard Header -->
  <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Clinical Dashboard</h1>
        <p class="text-gray-600">Physician compensation and productivity metrics</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          onclick={() => showGrid = !showGrid}
        >
          {showGrid ? 'Hide Grid' : 'Show Grid'}
        </button>
        <button
          class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onclick={toggleEditMode}
        >
          {editMode ? 'Exit Edit' : 'Edit Layout'}
        </button>
      </div>
    </div>
  </header>

  <!-- Dashboard Content -->
  <main class="p-6">
    <div class="dashboard-container relative">
      <!-- Grid Overlay -->
      {#if showGrid}
        <GridOverlay gridCols={12} gridRows={8} showGrid={true} />
      {/if}

      <!-- Dashboard Grid -->
      <div 
        class="dashboard-grid grid gap-4 min-h-[600px] relative"
        class:dragging={editMode}
        style="grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(8, 1fr);"
      >
        {#each widgets as widget (widget.id)}
          <div
            class="widget-container relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            style:grid-column="{widget.layout.x + 1} / {widget.layout.x + widget.layout.w + 1}"
            style:grid-row="{widget.layout.y + 1} / {widget.layout.y + widget.layout.h + 1}"
          >
            <!-- Widget Header -->
            <WidgetHeader
              config={widget}
              {editMode}
              draggable={true}
              showActions={true}
              onEdit={handleWidgetEdit}
              onRemove={handleWidgetRemove}
              onFullscreen={handleWidgetFullscreen}
              onRefresh={handleWidgetRefresh}
            />

            <!-- Widget Content -->
            <div class="widget-content p-4 h-full">
              {#if widget.id === 'compensation-bars'}
                <BarChartLayerCake
                  data={compensationData}
                  xAxisLabel="Physicians"
                  yAxisLabel="Compensation"
                  formatValue={(value) => `$${(value / 1000).toFixed(0)}K`}
                  animated={true}
                  padding={{ top: 10, right: 20, bottom: 40, left: 50 }}
                />
              {:else if widget.id === 'trend-line'}
                <LineChart
                  data={trendData}
                  xAxisLabel="Quarter"
                  yAxisLabel="Avg Compensation"
                  formatValue={(value) => `$${(value / 1000).toFixed(0)}K`}
                  animated={true}
                  padding={{ top: 10, right: 20, bottom: 40, left: 50 }}
                />
              {:else if widget.id === 'combo-analysis'}
                <ComboChart
                  data={comboData}
                  xAxisLabel="Month"
                  yAxisLabel="Compensation"
                  y2AxisLabel="wRVU"
                  barLabel="Compensation"
                  lineLabel="wRVU"
                  formatBarValue={(value) => `$${(value / 1000).toFixed(0)}K`}
                  formatLineValue={(value) => value.toLocaleString()}
                  animated={true}
                  showLegend={true}
                  padding={{ top: 20, right: 60, bottom: 50, left: 60 }}
                />
              {:else if widget.id === 'kpi-summary'}
                <div class="h-full flex flex-col justify-center">
                  <div class="grid grid-cols-1 gap-4">
                    <div class="text-center">
                      <div class="text-2xl font-bold text-blue-600">$298K</div>
                      <div class="text-sm text-gray-600">Avg Compensation</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-green-600">4,350</div>
                      <div class="text-sm text-gray-600">Avg wRVU</div>
                    </div>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Resize Handles -->
            {#if editMode}
              <ResizeHandle
                layout={widget.layout}
                onResize={(newLayout) => handleLayoutResize(widget.id, newLayout)}
              />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </main>

  <!-- Status Bar -->
  {#if editMode}
    <div class="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        <span class="text-sm font-medium">Edit Mode Active</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .dashboard-grid.dragging {
    @apply bg-blue-50 bg-opacity-50;
  }

  .widget-container {
    @apply transition-all duration-200;
  }

  .widget-container:hover {
    @apply shadow-md;
  }

  .widget-content {
    height: calc(100% - 48px); /* Subtract header height */
  }
</style>