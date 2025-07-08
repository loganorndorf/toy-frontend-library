<script lang="ts">
	import { containerVariants } from '$lib/utils/variants.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	type Padding = 'none' | 'sm' | 'md' | 'lg';

	interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
		size?: Size;
		padding?: Padding;
		class?: string;
		children?: any;
	}

	let {
		size = 'xl',
		padding = 'md',
		class: className = '',
		children,
		...restProps
	}: ContainerProps = $props();
</script>

<div class={containerVariants({ size, padding, className })} {...restProps}>
	{#if typeof children === 'string'}
		{@html children}
	{:else if children}
		{@render children()}
	{/if}
</div>