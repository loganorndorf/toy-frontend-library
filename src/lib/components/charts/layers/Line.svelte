<script lang="ts">
  import { getContext } from 'svelte';
  import { line, curveMonotoneX, curveLinear, curveNatural } from 'd3-shape';
  
  interface Props {
    animated?: boolean;
    onPointClick?: (d: any) => void;
    onPointHover?: (d: any, event?: MouseEvent) => void;
    onPointLeave?: () => void;
    colorScheme?: 'blue' | 'purple' | 'gradient' | 'vibrant';
    curveType?: 'linear' | 'monotone' | 'natural';
    showDots?: boolean;
  }
  
  let { 
    animated = true,
    onPointClick,
    onPointHover,
    onPointLeave,
    colorScheme = 'gradient',
    curveType = 'monotone',
    showDots = true
  }: Props = $props();
  
  // Get Layer Cake context - these are stores
  const { data, xGet, yGet, xScale, yScale, width, height } = getContext('LayerCake');
  
  // Color schemes
  const colorSchemes = {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    gradient: 'url(#lineGradient)',
    vibrant: '#ef4444'
  };

  // Curve types
  const curveTypes = {
    linear: curveLinear,
    monotone: curveMonotoneX,
    natural: curveNatural
  };

  // Create line generator
  const linePath = $derived(() => {
    const lineGen = line()
      .x(d => $xGet(d))
      .y(d => $yGet(d))
      .curve(curveTypes[curveType])
      .defined(d => d.y != null && !isNaN(d.y));
    
    return lineGen($data) || '';
  });

  // Create area path for gradient fill
  const areaPath = $derived(() => {
    if ($data.length < 2) return '';
    
    const points = $data.map(d => `${$xGet(d)},${$yGet(d)}`).join(' L');
    const firstX = $xGet($data[0]);
    const lastX = $xGet($data[$data.length - 1]);
    
    return `M${firstX},${$height} L${points} L${lastX},${$height} Z`;
  });

  let hoveredIndex: number | null = $state(null);
</script>

<!-- Area gradient fill -->
<path
  class="area-fill"
  d={areaPath()}
  fill="url(#areaGradient)"
  opacity="0.3"
/>

<!-- Main line -->
<path
  class="line-path"
  class:animate-line={animated}
  d={linePath()}
  stroke={colorSchemes[colorScheme]}
  stroke-width="3"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
/>

<!-- Interactive dots -->
{#if showDots}
  <g class="dots-layer">
    {#each $data as d, i}
      {@const x = $xGet(d)}
      {@const y = $yGet(d)}
      {@const isHovered = hoveredIndex === i}
      
      {#if x !== undefined && y !== undefined}
        <g class="dot-group">
          <!-- Outer ring for hover effect -->
          <circle
            cx={x}
            cy={y}
            r={isHovered ? 12 : 8}
            fill={colorScheme === 'gradient' ? '#3b82f6' : colorSchemes[colorScheme]}
            opacity={isHovered ? 0.2 : 0}
            class="dot-ring"
            style:transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          />
          
          <!-- Main dot -->
          <circle
            cx={x}
            cy={y}
            r={isHovered ? 6 : 4}
            fill={colorScheme === 'gradient' ? '#3b82f6' : colorSchemes[colorScheme]}
            stroke="white"
            stroke-width="2"
            class="dot"
            class:animate-dot={animated}
            style:animation-delay="{i * 50}ms"
            style:filter={isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'}
            style:transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            onmouseenter={(event) => {
              hoveredIndex = i;
              onPointHover?.(d, event);
            }}
            onmouseleave={() => {
              hoveredIndex = null;
              onPointLeave?.();
            }}
            onclick={() => onPointClick?.(d)}
            role="button"
            tabindex="0"
            aria-label="Data point at {d.x}: {d.y}"
          />
        </g>
      {/if}
    {/each}
  </g>
{/if}

<!-- Invisible wider line for better hover detection -->
<path
  class="hover-line"
  d={linePath()}
  stroke="transparent"
  stroke-width="20"
  fill="none"
  style:cursor="pointer"
/>

<style>
  .line-path {
    transition: stroke-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .line-path:hover {
    stroke-width: 4;
  }
  
  .animate-line {
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation: draw-line 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  @keyframes draw-line {
    to {
      stroke-dashoffset: 0;
    }
  }

  .area-fill {
    transition: opacity 0.3s ease;
  }

  .dot {
    cursor: pointer;
    transform-origin: center;
  }
  
  .animate-dot {
    opacity: 0;
    transform: scale(0);
    animation: dot-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  @keyframes dot-appear {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .dot-ring {
    pointer-events: none;
  }

  .hover-line {
    pointer-events: stroke;
  }
</style>