<script lang="ts">
	import { skeletonVariants } from '$lib/utils/variants.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'circle' | 'text';

	interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
		variant?: Variant;
		class?: string;
	}

	let {
		variant = 'default',
		class: className = '',
		...restProps
	}: SkeletonProps = $props();
</script>

<div
	class={skeletonVariants({ variant, className })}
	{...restProps}
></div>