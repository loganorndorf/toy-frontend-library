<script lang="ts">
	import CommandPalette from '$lib/components/ui/CommandPalette.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let {
		size = 'md',
		placeholder = 'Type a command or search...',
		emptyMessage = 'No results found.'
	} = $props();

	let open = $state(false);
	let lastCommand = $state('');

	// Mock icons using emoji functions
	const mockIcons = {
		Home: () => '🏠',
		Search: () => '🔍',
		Settings: () => '⚙️',
		User: () => '👤',
		FileText: () => '📄',
		Folder: () => '📁',
		Calendar: () => '📅',
		Mail: () => '📧',
		Bell: () => '🔔',
		Download: () => '⬇️',
		Upload: () => '⬆️',
		Copy: () => '📋',
		Edit: () => '✏️',
		Trash: () => '🗑️',
		Plus: () => '➕',
		Minus: () => '➖',
		Star: () => '⭐',
		Heart: () => '❤️',
		Share: () => '🔄',
		Lock: () => '🔒'
	};

	const sampleCommands = [
		// Navigation
		{
			id: 'nav-home',
			label: 'Go to Dashboard',
			description: 'Navigate to the main dashboard',
			icon: mockIcons.Home,
			group: 'Navigation',
			shortcut: '⌘H',
			onSelect: () => console.log('Navigate to dashboard')
		},
		{
			id: 'nav-search',
			label: 'Global Search',
			description: 'Search across all content',
			icon: mockIcons.Search,
			group: 'Navigation',
			shortcut: '⌘K',
			onSelect: () => console.log('Open global search')
		},
		{
			id: 'nav-settings',
			label: 'Open Settings',
			description: 'Access application settings',
			icon: mockIcons.Settings,
			group: 'Navigation',
			shortcut: '⌘,',
			onSelect: () => console.log('Open settings')
		},
		{
			id: 'nav-profile',
			label: 'View Profile',
			description: 'Go to your user profile',
			icon: mockIcons.User,
			group: 'Navigation',
			onSelect: () => console.log('View profile')
		},

		// File Operations
		{
			id: 'file-new',
			label: 'New Document',
			description: 'Create a new document',
			icon: mockIcons.FileText,
			group: 'File',
			shortcut: '⌘N',
			onSelect: () => console.log('Create new document')
		},
		{
			id: 'file-open',
			label: 'Open File',
			description: 'Open an existing file',
			icon: mockIcons.Folder,
			group: 'File',
			shortcut: '⌘O',
			onSelect: () => console.log('Open file')
		},
		{
			id: 'file-copy',
			label: 'Copy Selection',
			description: 'Copy selected content',
			icon: mockIcons.Copy,
			group: 'File',
			shortcut: '⌘C',
			onSelect: () => console.log('Copy selection')
		},
		{
			id: 'file-delete',
			label: 'Delete File',
			description: 'Delete the current file',
			icon: mockIcons.Trash,
			group: 'File',
			shortcut: '⌘D',
			disabled: true,
			onSelect: () => console.log('Delete file')
		},

		// Tools
		{
			id: 'tool-calendar',
			label: 'Open Calendar',
			description: 'View your calendar',
			icon: mockIcons.Calendar,
			group: 'Tools',
			onSelect: () => console.log('Open calendar')
		},
		{
			id: 'tool-mail',
			label: 'Check Email',
			description: 'Open your email inbox',
			icon: mockIcons.Mail,
			group: 'Tools',
			onSelect: () => console.log('Check email')
		},
		{
			id: 'tool-notifications',
			label: 'View Notifications',
			description: 'See recent notifications',
			icon: mockIcons.Bell,
			group: 'Tools',
			onSelect: () => console.log('View notifications')
		},

		// Actions
		{
			id: 'action-download',
			label: 'Download Project',
			description: 'Download current project as ZIP',
			icon: mockIcons.Download,
			group: 'Actions',
			onSelect: () => console.log('Download project')
		},
		{
			id: 'action-share',
			label: 'Share Project',
			description: 'Share project with others',
			icon: mockIcons.Share,
			group: 'Actions',
			onSelect: () => console.log('Share project')
		},
		{
			id: 'action-star',
			label: 'Add to Favorites',
			description: 'Mark this item as favorite',
			icon: mockIcons.Star,
			group: 'Actions',
			onSelect: () => console.log('Add to favorites')
		}
	];

	function handleCommandSelect(command) {
		lastCommand = command.label;
		console.log('Command selected:', command);
	}

	function openCommandPalette() {
		open = true;
	}

	// Handle Cmd+K to open command palette
	function handleKeydown(event) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			openCommandPalette();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-2xl mx-auto">
		<div class="text-center mb-8">
			<h3 class="text-2xl font-semibold mb-4">Command Palette Example</h3>
			<p class="text-slate-600 mb-6">
				Press <kbd class="px-2 py-1 bg-slate-200 rounded text-sm font-mono">⌘K</kbd> or click the button to open the command palette
			</p>
			
			<Button onclick={openCommandPalette} variant="default">
				Open Command Palette
			</Button>
		</div>

		{#if lastCommand}
			<div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
				<div class="flex items-center">
					<div class="text-green-600 mr-2">✅</div>
					<div>
						<div class="font-medium text-green-900">Command Executed</div>
						<div class="text-sm text-green-700">"{lastCommand}" was selected</div>
					</div>
				</div>
			</div>
		{/if}

		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
			<h4 class="font-semibold mb-4">Available Commands</h4>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
				<div>
					<h5 class="font-medium text-slate-900 mb-2">Navigation</h5>
					<ul class="space-y-1 text-slate-600">
						<li>• Go to Dashboard (⌘H)</li>
						<li>• Global Search (⌘K)</li>
						<li>• Open Settings (⌘,)</li>
						<li>• View Profile</li>
					</ul>
				</div>
				<div>
					<h5 class="font-medium text-slate-900 mb-2">File Operations</h5>
					<ul class="space-y-1 text-slate-600">
						<li>• New Document (⌘N)</li>
						<li>• Open File (⌘O)</li>
						<li>• Copy Selection (⌘C)</li>
						<li>• Delete File (⌘D) <span class="text-slate-400">[Disabled]</span></li>
					</ul>
				</div>
				<div>
					<h5 class="font-medium text-slate-900 mb-2">Tools</h5>
					<ul class="space-y-1 text-slate-600">
						<li>• Open Calendar</li>
						<li>• Check Email</li>
						<li>• View Notifications</li>
					</ul>
				</div>
				<div>
					<h5 class="font-medium text-slate-900 mb-2">Actions</h5>
					<ul class="space-y-1 text-slate-600">
						<li>• Download Project</li>
						<li>• Share Project</li>
						<li>• Add to Favorites</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="mt-6 text-center text-sm text-slate-500">
			Try searching for commands like "new", "settings", "calendar", or "download"
		</div>
	</div>
</div>

<CommandPalette
	{size}
	{placeholder}
	{emptyMessage}
	bind:open
	commands={sampleCommands}
	onCommandSelect={handleCommandSelect}
/>