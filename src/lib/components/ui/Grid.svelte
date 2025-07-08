<script lang="ts">
	import { gridVariants } from '$lib/utils/variants.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'none' | 'subgrid';
	type Rows = 1 | 2 | 3 | 4 | 5 | 6 | 'none' | 'subgrid';
	type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	type Flow = 'row' | 'col' | 'dense' | 'col-dense';

	interface GridProps extends HTMLAttributes<HTMLDivElement> {
		cols?: Cols;
		rows?: Rows;
		gap?: Gap;
		flow?: Flow;
		class?: string;
		children?: any;
	}

	let {
		cols = 1,
		rows,
		gap = 'md',
		flow = 'row',
		class: className = '',
		children,
		...restProps
	}: GridProps = $props();
</script>

<div class={gridVariants({ cols, rows, gap, flow, className })} {...restProps}>
	{#if typeof children === 'string'}
		{@html children}
	{:else if children}
		{@render children()}
	{/if}
</div>