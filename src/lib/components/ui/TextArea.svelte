<script lang="ts">
	import { textareaVariants } from '$lib/utils/variants.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	type Variant = 'default' | 'error';

	interface TextAreaProps extends HTMLTextareaAttributes {
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
	}: TextAreaProps = $props();

	// Automatically set variant to error if error message is provided
	const computedVariant = $derived(error ? 'error' : variant);
</script>

<div class="w-full">
	{#if label}
		<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
			{label}
		</label>
	{/if}
	
	<textarea
		class={textareaVariants({ variant: computedVariant, className })}
		{...restProps}
	></textarea>
	
	{#if error}
		<p class="text-sm text-red-500 mt-1">{error}</p>
	{/if}
</div>