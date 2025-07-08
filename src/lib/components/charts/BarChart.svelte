<script lang="ts">
	import { barChartVariants, chartContainerVariants } from '$lib/utils/variants.js';
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type ChartVariant = 'default' | 'success' | 'warning' | 'danger' | 'gradient';
	type ChartSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
	type Orientation = 'vertical' | 'horizontal';

	interface DataPoint {
		label: string;
		value: number;
		color?: string;
		metadata?: Record<string, any>;
	}

	interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
		data: DataPoint[];
		variant?: ChartVariant;
		size?: ChartSize;
		orientation?: Orientation;
		showGrid?: boolean;
		showTooltip?: boolean;
		showValues?: boolean;
		animated?: boolean;
		title?: string;
		xAxisLabel?: string;
		yAxisLabel?: string;
		formatValue?: (value: number) => string;
		formatTooltip?: (dataPoint: DataPoint) => string;
		onBarClick?: (dataPoint: DataPoint) => void;
		class?: string;
		padding?: 'none' | 'sm' | 'md' | 'lg';
	}

	let {
		data = [],
		variant = 'default',
		size = 'md',
		orientation = 'vertical',
		showGrid = true,
		showTooltip = true,
		showValues = false,
		animated = true,
		title,
		xAxisLabel,
		yAxisLabel,
		formatValue = (value: number) => value.toLocaleString(),
		formatTooltip = (dataPoint: DataPoint) => `${dataPoint.label}: ${formatValue(dataPoint.value)}`,
		onBarClick,
		class: className = '',
		padding = 'md',
		...restProps
	}: BarChartProps = $props();

	let chartContainer: HTMLDivElement;
	let tooltip: HTMLDivElement;
	let hoveredBar: DataPoint | null = $state(null);
	let tooltipPosition = $state({ x: 0, y: 0 });

	// Chart dimensions and margins
	const margins = { top: 40, right: 40, bottom: 100, left: 100 };
	let chartWidth = $state(800);
	let chartHeight = $state(500);
	
	// Reactive calculations
	const innerWidth = $derived(chartWidth - margins.left - margins.right);
	const innerHeight = $derived(chartHeight - margins.bottom - margins.top);
	const maxValue = $derived(Math.max(...data.map(d => d.value), 0));
	const minValue = $derived(Math.min(...data.map(d => d.value), 0));
	const valueRange = $derived(maxValue - minValue || 1);

	// Scale functions
	function getBarValue(value: number) {
		if (orientation === 'vertical') {
			return ((value - minValue) / valueRange) * innerHeight;
		} else {
			return ((value - minValue) / valueRange) * innerWidth;
		}
	}

	function getBarPosition(index: number) {
		const bandwidth = orientation === 'vertical' 
			? innerWidth / data.length 
			: innerHeight / data.length;
		return index * bandwidth + bandwidth * 0.1; // 10% padding
	}

	function getBarSize() {
		const bandwidth = orientation === 'vertical' 
			? innerWidth / data.length 
			: innerHeight / data.length;
		return bandwidth * 0.8; // 80% of bandwidth, 20% for padding
	}

	// Grid lines
	const gridLines = $derived(() => {
		const lines = [];
		const tickCount = 5;
		for (let i = 0; i <= tickCount; i++) {
			const value = minValue + (valueRange * i / tickCount);
			const position = getBarValue(value);
			lines.push({ value, position });
		}
		return lines;
	});

	// Update chart dimensions
	function updateDimensions() {
		if (chartContainer) {
			const rect = chartContainer.getBoundingClientRect();
			chartWidth = rect.width;
			chartHeight = rect.height;
		}
	}

	// Handle mouse events
	function handleBarMouseEnter(event: MouseEvent, dataPoint: DataPoint) {
		if (showTooltip) {
			hoveredBar = dataPoint;
			tooltipPosition = {
				x: event.clientX + 10,
				y: event.clientY - 10
			};
		}
	}

	function handleBarMouseLeave() {
		hoveredBar = null;
	}

	function handleBarMouseMove(event: MouseEvent) {
		if (hoveredBar) {
			tooltipPosition = {
				x: event.clientX + 10,
				y: event.clientY - 10
			};
		}
	}

	function handleBarClick(dataPoint: DataPoint) {
		if (onBarClick) {
			onBarClick(dataPoint);
		}
	}

	// Initialize chart
	onMount(() => {
		updateDimensions();
		
		const resizeObserver = new ResizeObserver(() => {
			updateDimensions();
		});
		
		if (chartContainer) {
			resizeObserver.observe(chartContainer);
		}

		return () => {
			resizeObserver.disconnect();
		};
	});

	const containerStyles = $derived(chartContainerVariants({ size, padding }));
	const chartStyles = $derived(barChartVariants({ variant, orientation }));
</script>

<div 
	bind:this={chartContainer}
	class="{containerStyles} {className}"
	{...restProps}
>
	{#if title}
		<div class="mb-4">
			<h3 class="text-lg font-semibold text-slate-900">{title}</h3>
		</div>
	{/if}

	<div class={chartStyles.container}>
		<svg class={chartStyles.svg} viewBox="0 0 {chartWidth} {chartHeight}">
			<!-- Gradient definitions -->
			{#if variant === 'gradient'}
				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
						<stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
					</linearGradient>
				</defs>
			{/if}

			<!-- Chart area group -->
			<g transform="translate({margins.left}, {margins.top})">
				
				<!-- Grid lines -->
				{#if showGrid}
					{#each gridLines as line}
						{#if orientation === 'vertical'}
							<line
								x1="0"
								y1={innerHeight - line.position}
								x2={innerWidth}
								y2={innerHeight - line.position}
								class={chartStyles.grid}
							/>
						{:else}
							<line
								x1={line.position}
								y1="0"
								x2={line.position}
								y2={innerHeight}
								class={chartStyles.grid}
							/>
						{/if}
					{/each}
				{/if}

				<!-- Bars -->
				{#each data as dataPoint, index}
					{@const barValue = getBarValue(dataPoint.value)}
					{@const barPosition = getBarPosition(index)}
					{@const barSize = getBarSize()}
					
					{#if orientation === 'vertical'}
						<rect
							x={barPosition}
							y={innerHeight - barValue}
							width={barSize}
							height={barValue}
							class={chartStyles.bar}
							style={dataPoint.color ? `fill: ${dataPoint.color}` : ''}
							style:transform={animated ? `scaleY(${barValue > 0 ? 1 : 0})` : ''}
							style:transform-origin="bottom"
							style:transition={animated ? 'transform 0.6s ease-out' : 'none'}
							onmouseenter={(e) => handleBarMouseEnter(e, dataPoint)}
							onmouseleave={handleBarMouseLeave}
							onmousemove={handleBarMouseMove}
							onclick={() => handleBarClick(dataPoint)}
							role="button"
							tabindex="0"
							aria-label="Bar for {dataPoint.label}: {formatValue(dataPoint.value)}"
						/>
					{:else}
						<rect
							x="0"
							y={barPosition}
							width={barValue}
							height={barSize}
							class={chartStyles.bar}
							style={dataPoint.color ? `fill: ${dataPoint.color}` : ''}
							style:transform={animated ? `scaleX(${barValue > 0 ? 1 : 0})` : ''}
							style:transform-origin="left"
							style:transition={animated ? 'transform 0.6s ease-out' : 'none'}
							onmouseenter={(e) => handleBarMouseEnter(e, dataPoint)}
							onmouseleave={handleBarMouseLeave}
							onmousemove={handleBarMouseMove}
							onclick={() => handleBarClick(dataPoint)}
							role="button"
							tabindex="0"
							aria-label="Bar for {dataPoint.label}: {formatValue(dataPoint.value)}"
						/>
					{/if}

					<!-- Value labels -->
					{#if showValues}
						{#if orientation === 'vertical'}
							<text
								x={barPosition + barSize / 2}
								y={innerHeight - barValue - 5}
								text-anchor="middle"
								class={chartStyles.label}
							>
								{formatValue(dataPoint.value)}
							</text>
						{:else}
							<text
								x={barValue + 5}
								y={barPosition + barSize / 2}
								dominant-baseline="central"
								class={chartStyles.label}
							>
								{formatValue(dataPoint.value)}
							</text>
						{/if}
					{/if}
				{/each}

				<!-- X Axis -->
				<line
					x1="0"
					y1={innerHeight}
					x2={innerWidth}
					y2={innerHeight}
					class={chartStyles.axis}
				/>

				<!-- Y Axis -->
				<line
					x1="0"
					y1="0"
					x2="0"
					y2={innerHeight}
					class={chartStyles.axis}
				/>

				<!-- X Axis Labels -->
				{#if orientation === 'vertical'}
					{#each data as dataPoint, index}
						{@const barPosition = getBarPosition(index)}
						{@const barSize = getBarSize()}
						<text
							x={barPosition + barSize / 2}
							y={innerHeight + 40}
							text-anchor="middle"
							class={chartStyles.label}
							font-size="11"
							transform="rotate(-45, {barPosition + barSize / 2}, {innerHeight + 40})"
						>
							{dataPoint.label}
						</text>
					{/each}
				{/if}

				<!-- Y Axis Labels -->
				{#if orientation === 'horizontal'}
					{#each data as dataPoint, index}
						{@const barPosition = getBarPosition(index)}
						{@const barSize = getBarSize()}
						<text
							x="-10"
							y={barPosition + barSize / 2}
							text-anchor="end"
							dominant-baseline="central"
							class={chartStyles.label()}
						>
							{dataPoint.label}
						</text>
					{/each}
				{/if}

				<!-- Value axis labels -->
				{#each gridLines as line}
					{#if orientation === 'vertical'}
						<text
							x="-10"
							y={innerHeight - line.position}
							text-anchor="end"
							dominant-baseline="central"
							class={chartStyles.label()}
						>
							{formatValue(line.value)}
						</text>
					{:else}
						<text
							x={line.position}
							y={innerHeight + 15}
							text-anchor="middle"
							class={chartStyles.label()}
						>
							{formatValue(line.value)}
						</text>
					{/if}
				{/each}
			</g>

			<!-- Axis labels -->
			{#if xAxisLabel}
				<text
					x={chartWidth / 2}
					y={chartHeight - 10}
					text-anchor="middle"
					class={chartStyles.label()}
					font-weight="600"
				>
					{xAxisLabel}
				</text>
			{/if}

			{#if yAxisLabel}
				<text
					x="15"
					y={chartHeight / 2}
					text-anchor="middle"
					transform="rotate(-90, 15, {chartHeight / 2})"
					class={chartStyles.label()}
					font-weight="600"
				>
					{yAxisLabel}
				</text>
			{/if}
		</svg>
	</div>
</div>

<!-- Tooltip -->
{#if hoveredBar && showTooltip}
	<div
		bind:this={tooltip}
		class={chartStyles.tooltip}
		style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
	>
		{@html formatTooltip(hoveredBar)}
	</div>
{/if}