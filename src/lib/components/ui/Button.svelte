<script lang="ts">
	import { buttonVariants } from '$lib/utils/variants.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	type Size = 'default' | 'sm' | 'lg' | 'icon';

	interface ButtonProps extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		class?: string;
		children?: any;
	}

	let {
		variant = 'default',
		size = 'default',
		class: className = '',
		children,
		...restProps
	}: ButtonProps = $props();
</script>

<button class={buttonVariants({ variant, size, className })} {...restProps}>
	{#if typeof children === 'string'}
		{children}
	{:else if children}
		{@render children()}
	{/if}
</button>