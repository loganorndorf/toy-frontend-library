<script lang="ts">
	import { inputVariants } from '$lib/utils/variants.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Variant = 'default' | 'error';

	interface InputProps extends HTMLInputAttributes {
		variant?: Variant;
		error?: string;
		label?: string;
		class?: string;
	}

	let {
		variant = 'default',
		error,
		label,
		class: className = '',
		...restProps
	}: InputProps = $props();

	// Automatically set variant to error if error message is provided
	const computedVariant = $derived(error ? 'error' : variant);
</script>

<div class="w-full">
	{#if label}
		<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
			{label}
		</label>
	{/if}
	
	<input
		class={inputVariants({ variant: computedVariant, className })}
		{...restProps}
	/>
	
	{#if error}
		<p class="text-sm text-red-500 mt-1">{error}</p>
	{/if}
</div>