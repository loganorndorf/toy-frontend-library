<script lang="ts">
	import { avatarVariants } from '$lib/utils/variants.js';
	import { User } from 'lucide-svelte';

	type Size = 'sm' | 'md' | 'lg' | 'xl';

	interface AvatarProps {
		src?: string;
		alt?: string;
		fallback?: string;
		size?: Size;
		class?: string;
	}

	let {
		src,
		alt = 'Avatar',
		fallback,
		size = 'md',
		class: className = '',
	}: AvatarProps = $props();

	let imageError = $state(false);
	let imageLoaded = $state(false);

	// Generate initials from fallback text
	const initials = $derived(() => {
		if (!fallback) return '';
		return fallback
			.split(' ')
			.map(word => word.charAt(0).toUpperCase())
			.slice(0, 2)
			.join('');
	});

	// Reset error state when src changes
	$effect(() => {
		if (src) {
			imageError = false;
			imageLoaded = false;
		}
	});

	function handleImageError() {
		imageError = true;
	}

	function handleImageLoad() {
		imageLoaded = true;
	}

	// Size classes for text scaling
	const textSizeClasses = {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base',
		xl: 'text-lg',
	};
</script>

<div class={avatarVariants({ size, className })}>
	{#if src && !imageError}
		<img
			{src}
			{alt}
			class="aspect-square h-full w-full object-cover"
			onerror={handleImageError}
			onload={handleImageLoad}
		/>
	{:else if fallback}
		<div class="flex h-full w-full items-center justify-center bg-slate-100 text-slate-600 font-medium {textSizeClasses[size]}">
			{initials()}
		</div>
	{:else}
		<div class="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
			<User class="h-4 w-4" />
		</div>
	{/if}
</div>