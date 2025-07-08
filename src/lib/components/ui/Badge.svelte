<script lang="ts">
	import { badgeVariants } from '$lib/utils/variants.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';

	interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
		variant?: Variant;
		class?: string;
		children?: any;
	}

	let {
		variant = 'default',
		class: className = '',
		children,
		...restProps
	}: BadgeProps = $props();
</script>

<span class={badgeVariants({ variant, className })} {...restProps}>
	{#if typeof children === 'string'}
		{children}
	{:else if children}
		{@render children()}
	{/if}
</span>