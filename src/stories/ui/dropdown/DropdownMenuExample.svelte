<script lang="ts">
	import DropdownMenu from '$lib/components/ui/DropdownMenu.svelte';
	import { User, Settings, LogOut, Copy, Edit, Trash2, Download } from 'lucide-svelte';

	let {
		variant = 'default',
		size = 'md',
		placement = 'bottom-start',
		triggerText = 'Actions',
		showIcons = true,
		showShortcuts = true
	} = $props();

	// Mock icons
	const mockIcons = {
		User: () => '👤',
		Settings: () => '⚙️',
		LogOut: () => '🚪',
		Copy: () => '📋',
		Edit: () => '✏️',
		Trash2: () => '🗑️',
		Download: () => '⬇️'
	};

	const sampleItems = [
		{
			label: 'Edit',
			value: 'edit',
			icon: showIcons ? mockIcons.Edit : undefined,
			shortcut: showShortcuts ? '⌘E' : undefined,
			onClick: () => console.log('Edit clicked')
		},
		{
			label: 'Copy',
			value: 'copy',
			icon: showIcons ? mockIcons.Copy : undefined,
			shortcut: showShortcuts ? '⌘C' : undefined,
			onClick: () => console.log('Copy clicked')
		},
		{
			label: 'Download',
			value: 'download',
			icon: showIcons ? mockIcons.Download : undefined,
			shortcut: showShortcuts ? '⌘D' : undefined,
			onClick: () => console.log('Download clicked')
		},
		{ label: 'separator' },
		{
			label: 'Settings',
			value: 'settings',
			icon: showIcons ? mockIcons.Settings : undefined,
			onClick: () => console.log('Settings clicked')
		},
		{
			label: 'Profile',
			value: 'profile',
			icon: showIcons ? mockIcons.User : undefined,
			onClick: () => console.log('Profile clicked')
		},
		{ label: 'separator' },
		{
			label: 'Delete',
			value: 'delete',
			icon: showIcons ? mockIcons.Trash2 : undefined,
			disabled: false,
			onClick: () => console.log('Delete clicked')
		},
		{
			label: 'Sign Out',
			value: 'logout',
			icon: showIcons ? mockIcons.LogOut : undefined,
			onClick: () => console.log('Sign out clicked')
		}
	];

	let open = $state(false);
</script>

<div class="p-8 bg-slate-50 min-h-96 flex items-center justify-center">
	<div class="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
		<h3 class="text-lg font-semibold mb-4 text-center">Dropdown Menu Example</h3>
		<div class="flex items-center justify-center">
			<DropdownMenu
				{variant}
				{size}
				{placement}
				{triggerText}
				items={sampleItems}
				bind:open
			/>
		</div>
		<div class="mt-4 text-center text-sm text-slate-600">
			Click the button to open the dropdown menu
		</div>
		{#if open}
			<div class="mt-2 text-xs text-blue-600 text-center">
				Menu is currently open
			</div>
		{/if}
	</div>
</div>