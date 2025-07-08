<script lang="ts">
	import { ChevronDown, Check } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	interface Option {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface SelectProps {
		options: Option[];
		placeholder?: string;
		label?: string;
		error?: string;
		disabled?: boolean;
		value?: string;
		class?: string;
	}

	let {
		options = [],
		placeholder = 'Select an option...',
		label,
		error,
		disabled = false,
		value = undefined,
		class: className = '',
	}: SelectProps = $props();

	let isOpen = $state(false);
	let selectedOption = $state<Option | undefined>();

	// Update selected option when value prop changes
	$effect(() => {
		if (value !== undefined) {
			selectedOption = options.find(opt => opt.value === value);
		}
	});

	function toggleDropdown() {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	function selectOption(option: Option) {
		if (!option.disabled) {
			selectedOption = option;
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}
</script>

<div class="relative w-full">
	{#if label}
		<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
			{label}
		</label>
	{/if}

	<button
		class="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {className}"
		onclick={toggleDropdown}
		onkeydown={handleKeydown}
		{disabled}
	>
		{selectedOption?.label || placeholder}
		<ChevronDown class="h-4 w-4 opacity-50 {isOpen ? 'rotate-180' : ''} transition-transform" />
	</button>

	{#if isOpen}
		<div
			class="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md"
			transition:fade={{ duration: 150 }}
		>
			{#each options as option}
				<div
					class="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 {option.disabled ? 'pointer-events-none opacity-50' : ''}"
					onclick={() => selectOption(option)}
					role="option"
					tabindex="0"
				>
					<div class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
						{#if selectedOption?.value === option.value}
							<Check class="h-4 w-4" />
						{/if}
					</div>
					{option.label}
				</div>
			{/each}
		</div>
	{/if}

	{#if error}
		<p class="text-sm text-red-500 mt-1">{error}</p>
	{/if}
</div>