<script lang="ts">
	import { stackVariants } from '$lib/utils/variants.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Direction = 'vertical' | 'horizontal';
	type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	type Align = 'start' | 'center' | 'end' | 'stretch';
	type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

	interface StackProps extends HTMLAttributes<HTMLDivElement> {
		direction?: Direction;
		spacing?: Spacing;
		align?: Align;
		justify?: Justify;
		class?: string;
		children?: any;
	}

	let {
		direction = 'vertical',
		spacing = 'md',
		align = 'stretch',
		justify = 'start',
		class: className = '',
		children,
		...restProps
	}: StackProps = $props();
</script>

<div class={stackVariants({ direction, spacing, align, justify, className })} {...restProps}>
	{#if typeof children === 'string'}
		{@html children}
	{:else if children}
		{@render children()}
	{/if}
</div>