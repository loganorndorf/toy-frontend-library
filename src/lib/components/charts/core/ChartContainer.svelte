<script lang="ts">
  import { LayerCake, Svg, Html, Canvas } from 'layercake';
  import type { ComponentType } from 'svelte';

  interface Props {
    data: any[];
    width?: number;
    height?: number;
    padding?: { top: number; right: number; bottom: number; left: number };
    x?: string | ((d: any) => any);
    y?: string | ((d: any) => any);
    xScale?: any;
    yScale?: any;
    children?: any;
  }

  let {
    data,
    width = 400,
    height = 300,
    padding = { top: 20, right: 20, bottom: 40, left: 60 },
    x,
    y,
    xScale,
    yScale,
    children
  }: Props = $props();

  // Responsive container with container queries
  let containerElement: HTMLDivElement;
  let containerWidth = $state(width);
  let containerHeight = $state(height);

  // Use ResizeObserver for responsive behavior
  $effect(() => {
    if (!containerElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidth = entry.contentRect.width || width;
        containerHeight = entry.contentRect.height || height;
      }
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  });
</script>

<div 
  bind:this={containerElement} 
  class="chart-container w-full h-full min-h-[200px]"
  style:width="{width}px"
  style:height="{height}px"
>
  <LayerCake
    {data}
    {x}
    {y}
    {xScale}
    {yScale}
    {padding}
    width={containerWidth}
    height={containerHeight}
  >
    <Svg>
      {@render children?.svg?.()}
    </Svg>
    
    <Html>
      {@render children?.html?.()}
    </Html>
    
    <Canvas>
      {@render children?.canvas?.()}
    </Canvas>
  </LayerCake>
</div>

<style>
  .chart-container {
    container-type: size;
    position: relative;
  }

  /* Container query responsive adjustments */
  @container (max-width: 300px) {
    .chart-container {
      font-size: 12px;
    }
  }

  @container (min-width: 600px) {
    .chart-container {
      font-size: 14px;
    }
  }
</style>