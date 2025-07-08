<script lang="ts">
	import { commandPaletteVariants } from '$lib/utils/variants.js';
	import { Search } from 'lucide-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ComponentType } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Command {
		id: string;
		label: string;
		description?: string;
		icon?: ComponentType;
		shortcut?: string;
		group?: string;
		disabled?: boolean;
		onSelect?: () => void;
		href?: string;
	}

	interface CommandPaletteProps extends HTMLAttributes<HTMLDivElement> {
		size?: Size;
		placeholder?: string;
		emptyMessage?: string;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		commands?: Command[];
		onCommandSelect?: (command: Command) => void;
		class?: string;
	}

	let {
		size = 'md',
		placeholder = 'Type a command or search...',
		emptyMessage = 'No results found.',
		open = $bindable(false),
		onOpenChange,
		commands = [],
		onCommandSelect,
		class: className = '',
		...restProps
	}: CommandPaletteProps = $props();

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let inputElement: HTMLInputElement;

	// Simple fuzzy search implementation
	function fuzzyScore(text: string, query: string): number {
		if (!query) return 1;
		
		const textLower = text.toLowerCase();
		const queryLower = query.toLowerCase();
		
		// Exact match gets highest score
		if (textLower.includes(queryLower)) {
			return 2 + (queryLower.length / textLower.length);
		}
		
		// Character-by-character fuzzy matching
		let score = 0;
		let textIndex = 0;
		
		for (let i = 0; i < queryLower.length; i++) {
			const char = queryLower[i];
			let found = false;
			
			for (let j = textIndex; j < textLower.length; j++) {
				if (textLower[j] === char) {
					score += 1 / (j - textIndex + 1);
					textIndex = j + 1;
					found = true;
					break;
				}
			}
			
			if (!found) return 0;
		}
		
		return score;
	}

	// Filter and sort commands based on search query
	const filteredCommands = $derived(() => {
		if (!searchQuery.trim()) return commands;

		return commands
			.map(command => ({
				...command,
				score: fuzzyScore(command.label + ' ' + (command.description || ''), searchQuery)
			}))
			.filter(command => command.score > 0)
			.sort((a, b) => b.score - a.score);
	});

	// Group commands by their group property
	const groupedCommands = $derived(() => {
		const groups = new Map<string, Command[]>();
		
		filteredCommands.forEach(command => {
			const group = command.group || 'Commands';
			if (!groups.has(group)) {
				groups.set(group, []);
			}
			groups.get(group)!.push(command);
		});

		return Array.from(groups.entries());
	});

	// Flatten commands for keyboard navigation
	const flatCommands = $derived(() => {
		return groupedCommands.flatMap(([_, commands]) => commands);
	});

	// Reset selected index when filtered commands change
	$effect(() => {
		if (filteredCommands.length > 0 && selectedIndex >= filteredCommands.length) {
			selectedIndex = 0;
		}
	});

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (!open) return;

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				closeDialog();
				break;
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, flatCommands.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				break;
			case 'Enter':
				event.preventDefault();
				if (flatCommands[selectedIndex]) {
					selectCommand(flatCommands[selectedIndex]);
				}
				break;
		}
	}

	// Handle command selection
	function selectCommand(command: Command) {
		if (command.disabled) return;

		if (command.onSelect) {
			command.onSelect();
		}

		if (onCommandSelect) {
			onCommandSelect(command);
		}

		closeDialog();
	}

	// Close dialog
	function closeDialog() {
		open = false;
		searchQuery = '';
		selectedIndex = 0;
		if (onOpenChange) {
			onOpenChange(false);
		}
	}

	// Handle outside click
	function handleOutsideClick(event: MouseEvent) {
		if (open && event.target instanceof Element) {
			const dialog = event.target.closest('[role="dialog"]');
			if (!dialog) {
				closeDialog();
			}
		}
	}

	// Focus input when dialog opens
	$effect(() => {
		if (open && inputElement) {
			inputElement.focus();
		}
	});

	// Add keyboard event listener
	$effect(() => {
		if (open) {
			document.addEventListener('keydown', handleKeydown);
			document.addEventListener('click', handleOutsideClick);
			return () => {
				document.removeEventListener('keydown', handleKeydown);
				document.removeEventListener('click', handleOutsideClick);
			};
		}
	});

	const styles = $derived(commandPaletteVariants({ size }));
</script>

{#if open}
	<!-- Overlay -->
	<div class={styles.overlay()}></div>

	<!-- Dialog -->
	<div 
		class={styles.dialog()} 
		role="dialog" 
		aria-modal="true" 
		aria-labelledby="command-palette-label"
		{...restProps}
	>
		<!-- Header with Search -->
		<div class={styles.header()}>
			<Search class={styles.searchIcon()} />
			<input
				bind:this={inputElement}
				bind:value={searchQuery}
				class={styles.input()}
				placeholder={placeholder}
				type="text"
				id="command-palette-input"
				autocomplete="off"
				aria-label="Search commands"
			/>
		</div>

		<!-- Content -->
		<div class={styles.content()}>
			{#if flatCommands.length === 0}
				<div class={styles.empty()}>
					{emptyMessage}
				</div>
			{:else}
				{#each groupedCommands as [groupName, groupCommands], groupIndex}
					<div class={styles.group()}>
						{#if groupName && groupedCommands.length > 1}
							<div class={styles.groupHeading()}>
								{groupName}
							</div>
						{/if}
						
						{#each groupCommands as command, commandIndex}
							{@const flatIndex = flatCommands.findIndex(c => c.id === command.id)}
							<button
								class={styles.item()}
								class:opacity-50={command.disabled}
								aria-selected={selectedIndex === flatIndex}
								disabled={command.disabled}
								onclick={() => selectCommand(command)}
								onmouseenter={() => selectedIndex = flatIndex}
								type="button"
							>
								{#if command.icon}
									<command.icon class={styles.itemIcon()} />
								{/if}
								
								<div class="flex-1 text-left">
									<div class="font-medium">{command.label}</div>
									{#if command.description}
										<div class="text-xs text-slate-500 mt-0.5">{command.description}</div>
									{/if}
								</div>
								
								{#if command.shortcut}
									<span class={styles.itemShortcut()}>{command.shortcut}</span>
								{/if}
							</button>
						{/each}
					</div>
					
					{#if groupIndex < groupedCommands.length - 1}
						<div class={styles.separator()}></div>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
{/if}