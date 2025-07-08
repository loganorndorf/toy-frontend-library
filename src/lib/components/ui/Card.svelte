<script lang="ts">
	import { cardVariants } from '$lib/utils/variants.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'outline' | 'elevated';
	type Padding = 'none' | 'sm' | 'md' | 'lg';

	interface CardProps extends HTMLAttributes<HTMLDivElement> {
		variant?: Variant;
		padding?: Padding;
		class?: string;
		children?: any;
	}

	let {
		variant = 'default',
		padding = 'none',
		class: className = '',
		children,
		...restProps
	}: CardProps = $props();
</script>

<div class={cardVariants({ variant, padding, className })} {...restProps}>
	{#if typeof children === 'string'}
		{children}
	{:else if children}
		{@render children()}
	{/if}
</div>