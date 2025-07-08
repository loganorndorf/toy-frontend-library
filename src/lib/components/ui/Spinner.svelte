<script lang="ts">
	import { spinnerVariants } from '$lib/utils/variants.js';

	type Size = 'sm' | 'md' | 'lg' | 'xl';
	type Variant = 'default' | 'light' | 'muted';

	interface SpinnerProps {
		size?: Size;
		variant?: Variant;
		class?: string;
		'aria-label'?: string;
	}

	let {
		size = 'md',
		variant = 'default',
		class: className = '',
		'aria-label': ariaLabel = 'Loading',
		...restProps
	}: SpinnerProps = $props();
</script>

<div
	class={spinnerVariants({ size, variant, className })}
	role="status"
	aria-label={ariaLabel}
	{...restProps}
>
	<span class="sr-only">{ariaLabel}</span>
</div>