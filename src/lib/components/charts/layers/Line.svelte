<script lang="ts">
  import { getContext } from 'svelte';
  import { line } from 'd3-shape';
  
  interface Props {
    data?: any[];
    animated?: boolean;
    strokeWidth?: number;
    curve?: any;
    onPointHover?: (d: any, index: number) => void;
    onPointLeave?: () => void;
    onPointClick?: (d: any, index: number) => void;
  }
  
  let { 
    data = [],
    animated = true,
    strokeWidth = 2,
    curve,
    onPointHover,
    onPointLeave,
    onPointClick
  }: Props = $props();
  
  const { data: contextData, xGet, yGet } = getContext('LayerCake');
  
  const finalData = $derived(data.length > 0 ? data : contextData);
  
  const lineGenerator = $derived(() => {
    const generator = line()
      .x(d => xGet(d))
      .y(d => yGet(d));
    
    if (curve) {
      generator.curve(curve);
    }
    
    return generator;
  });
  
  const pathData = $derived(() => lineGenerator(finalData));
  const pathLength = $derived(() => {
    if (typeof document !== 'undefined' && pathData) {
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', pathData);
      return tempPath.getTotalLength();
    }
    return 0;
  });
</script>

<g class="line-layer">
  <!-- Line path -->
  <path
    d={pathData}
    class="line-path stroke-blue-500 fill-none"
    style:stroke-width="{strokeWidth}px"
    style:stroke-dasharray={animated ? pathLength : 'none'}
    style:stroke-dashoffset={animated ? pathLength : 0}
    style:animation={animated ? 'draw-line 1s ease-out forwards' : 'none'}
  />
  
  <!-- Data points -->
  {#each finalData as d, i}
    <circle
      cx={xGet(d)}
      cy={yGet(d)}
      r="4"
      class="line-point fill-blue-500 stroke-white cursor-pointer transition-all"
      style:stroke-width="2px"
      style:opacity={animated ? 0 : 1}
      style:animation={animated ? `fade-in 0.3s ease-out ${0.5 + i * 0.1}s forwards` : 'none'}
      onmouseenter={() => onPointHover?.(d, i)}
      onmouseleave={() => onPointLeave?.()}
      onclick={() => onPointClick?.(d, i)}
      role="button"
      tabindex="0"
      aria-label="Data point {i + 1}: {d.value}"
    />
  {/each}
</g>

<style>
  .line-point:hover {
    transform: scale(1.25);
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }
  
  .line-path {
    transition: color 0.15s ease-in-out;
  }
  
  @keyframes draw-line {
    to {
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>