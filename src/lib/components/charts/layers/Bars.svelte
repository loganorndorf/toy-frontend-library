<script lang="ts">
  import { getContext } from 'svelte';
  
  interface Props {
    animated?: boolean;
    onBarClick?: (d: any) => void;
    onBarHover?: (d: any, event?: MouseEvent) => void;
    onBarLeave?: () => void;
    colorScheme?: 'blue' | 'purple' | 'gradient' | 'vibrant';
  }
  
  let { 
    animated = true,
    onBarClick,
    onBarHover,
    onBarLeave,
    colorScheme = 'gradient'
  }: Props = $props();
  
  // Get Layer Cake context - these are stores
  const { data, xGet, yGet, xScale, yScale, height } = getContext('LayerCake');
  
  // Calculate bandwidth from the x scale
  const bandwidth = $derived(() => {
    const scale = $xScale;
    if (scale && typeof scale.bandwidth === 'function') {
      return scale.bandwidth();
    }
    return 0;
  });
  
  // Ensure we have valid bar dimensions
  function getBarHeight(d: any): number {
    const yValue = $yGet(d);
    const chartHeight = $height;
    if (typeof yValue === 'number' && typeof chartHeight === 'number') {
      return Math.max(0, chartHeight - yValue);
    }
    return 0;
  }

  // Color schemes
  const colorSchemes = {
    blue: ['#60a5fa', '#3b82f6'],
    purple: ['#a78bfa', '#8b5cf6'],
    gradient: ['#06b6d4', '#3b82f6'],
    vibrant: ['#f59e0b', '#ef4444']
  };

  function getBarColor(index: number, scheme: string): string {
    const colors = colorSchemes[scheme as keyof typeof colorSchemes] || colorSchemes.gradient;
    return colors[index % colors.length];
  }

  let hoveredIndex: number | null = $state(null);
</script>

<!-- Gradient definitions -->
<defs>
  <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
  </linearGradient>
  
  <linearGradient id="barGradientHover" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style="stop-color:#0891b2;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
  </linearGradient>

  <!-- Shadow filter -->
  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
    <feOffset dx="0" dy="2" result="offsetblur"/>
    <feFlood flood-color="#000000" flood-opacity="0.1"/>
    <feComposite in2="offsetblur" operator="in"/>
    <feMerge>
      <feMergeNode/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>

  <!-- Glow effect -->
  <filter id="glow">
    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>

<g class="bars-layer">
  {#each $data as d, i}
    {@const xPos = $xGet(d)}
    {@const yPos = $yGet(d)}
    {@const barHeight = getBarHeight(d)}
    {@const barWidth = bandwidth() * 0.8} <!-- Make bars slightly thinner for modern look -->
    {@const xOffset = bandwidth() * 0.1} <!-- Center the thinner bars -->
    {@const isHovered = hoveredIndex === i}
    
    {#if xPos !== undefined && yPos !== undefined && barWidth > 0}
      <g class="bar-group">
        <!-- Bar background for depth -->
        <rect
          x={xPos + xOffset}
          y={yPos - 2}
          width={barWidth}
          height={barHeight + 2}
          rx="4"
          ry="4"
          fill="rgba(0,0,0,0.03)"
          class="bar-shadow"
        />
        
        <!-- Main bar -->
        <rect
          x={xPos + xOffset}
          y={yPos}
          width={barWidth}
          height={barHeight}
          rx="4"
          ry="4"
          class="bar"
          class:animate-grow={animated}
          class:hovered={isHovered}
          style:animation-delay="{i * 50}ms"
          style:fill={colorScheme === 'gradient' 
            ? (isHovered ? 'url(#barGradientHover)' : 'url(#barGradient)')
            : getBarColor(i, colorScheme)}
          style:filter={isHovered ? 'url(#shadow)' : 'none'}
          style:transform={isHovered ? 'translateY(-2px)' : 'translateY(0)'}
          onmouseenter={(event) => {
            hoveredIndex = i;
            onBarHover?.(d, event);
          }}
          onmouseleave={() => {
            hoveredIndex = null;
            onBarLeave?.();
          }}
          onclick={() => onBarClick?.(d)}
          role="button"
          tabindex="0"
          aria-label="Bar for {d.label}: {d.value}"
        />
        
        <!-- Top highlight for 3D effect -->
        <rect
          x={xPos + xOffset}
          y={yPos}
          width={barWidth}
          height="4"
          rx="4"
          ry="4"
          fill="rgba(255,255,255,0.2)"
          style:pointer-events="none"
          class:animate-grow={animated}
          style:animation-delay="{i * 50}ms"
        />
      </g>
    {/if}
  {/each}
</g>

<style>
  .bar {
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: bottom;
  }
  
  .bar:hover {
    filter: brightness(1.1);
  }
  
  .bar-shadow {
    transition: all 0.3s ease;
  }
  
  .bar.hovered + .bar-shadow {
    fill: rgba(0,0,0,0.08);
  }
  
  .animate-grow {
    animation: growUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  @keyframes growUp {
    0% {
      transform: scaleY(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  .bar-group {
    transition: all 0.3s ease;
  }
</style>