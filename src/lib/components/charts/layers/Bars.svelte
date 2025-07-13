<script lang="ts">
  import { getContext } from 'svelte';
  
  interface Props {
    data?: any[];
    animated?: boolean;
    onBarClick?: (d: any) => void;
    onBarHover?: (d: any) => void;
    onBarLeave?: () => void;
  }
  
  let { 
    data = [],
    animated = true,
    onBarClick,
    onBarHover,
    onBarLeave
  }: Props = $props();
  
  const { data: contextData, xGet, yGet, xScale, height } = getContext('LayerCake');
  
  const finalData = $derived(() => {
    if (data && data.length > 0) return data;
    if (contextData) {
      // Don't use $state.snapshot on the data since it might not be cloneable
      return Array.isArray(contextData) ? contextData : [];
    }
    return [];
  });
  
  const bandwidth = $derived(() => {
    // Don't use $state.snapshot on D3 scales as they contain non-cloneable functions
    if (xScale && typeof xScale.bandwidth === 'function') {
      return xScale.bandwidth();
    }
    return 0;
  });
</script>

<g class="bars-layer">
  {#each finalData() as d, i}
    <rect
      x={$xGet(d)}
      y={$yGet(d)}
      width={bandwidth()}
      height={Math.max(0, $height - $yGet(d))}
      class="bar"
      class:animate-grow={animated}
      style:animation-delay="{i * 50}ms"
      onmouseenter={() => onBarHover?.(d)}
      onmouseleave={() => onBarLeave?.()}
      onclick={() => onBarClick?.(d)}
      role="button"
      tabindex="0"
      aria-label="Bar for {d.label}: {d.value}"
    />
  {/each}
</g>

<style>
  .bar {
    fill: #3b82f6;
    stroke: none;
    cursor: pointer;
    transition: fill 0.2s ease-in-out;
  }
  
  .bar:hover {
    fill: #2563eb;
  }
  
  .animate-grow {
    animation: growUp 0.6s ease-out forwards;
    transform-origin: bottom;
  }
  
  @keyframes growUp {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }
</style>