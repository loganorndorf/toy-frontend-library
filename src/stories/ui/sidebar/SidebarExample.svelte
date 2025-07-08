<script lang="ts">
	import Sidebar from '$lib/components/ui/Sidebar.svelte';

	let {
		variant = 'default',
		width = 'md',
		position = 'left',
		title = 'Navigation',
		collapsible = false,
		collapsed = false
	} = $props();

	// Mock icons using emoji
	const mockIcons = {
		Home: () => '🏠',
		BarChart3: () => '📊',
		Users: () => '👥',
		Mail: () => '📧',
		Settings: () => '⚙️',
		Calendar: () => '📅',
		FileText: () => '📄',
		HelpCircle: () => '❓'
	};

	const sampleItems = [
		{ label: 'Dashboard', href: '#dashboard', icon: mockIcons.Home, active: true },
		{ label: 'Analytics', href: '#analytics', icon: mockIcons.BarChart3 },
		{ label: 'Users', href: '#users', icon: mockIcons.Users },
		{ label: 'Messages', href: '#messages', icon: mockIcons.Mail },
		{ label: 'Settings', href: '#settings', icon: mockIcons.Settings }
	];

	let currentCollapsed = $state(collapsed);

	function handleCollapsedChange(newCollapsed) {
		currentCollapsed = newCollapsed;
	}
</script>

<div class="flex h-96 border border-slate-200 rounded-lg overflow-hidden {variant === 'elevated' ? 'p-4' : ''}">
	{#if position === 'right'}
		<div class="flex-1 p-6 bg-slate-50 flex items-center justify-center">
			<div class="text-center">
				<h3 class="text-lg font-semibold text-slate-900 mb-2">Main Content</h3>
				<p class="text-slate-600 text-sm">
					{#if collapsible}
						{currentCollapsed ? 'Sidebar is collapsed' : 'Sidebar is expanded'}
					{:else}
						Content area next to the sidebar (right positioned)
					{/if}
				</p>
			</div>
		</div>
		
		<Sidebar 
			{variant} 
			{width} 
			{position} 
			{title}
			{collapsible}
			collapsed={currentCollapsed}
			onCollapsedChange={handleCollapsedChange}
			items={sampleItems}
		>
			{#snippet children()}
				{#if variant === 'default' && title === 'Dashboard'}
					<div class="border-t border-slate-200 pt-4">
						<div class="flex flex-col gap-3">
							<div class="flex items-center gap-2">
								<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
									JD
								</div>
								<div class="text-xs">
									<div class="font-medium text-slate-900">John Doe</div>
									<div class="text-slate-500">Admin</div>
								</div>
							</div>
							<button class="w-full bg-transparent border border-slate-300 text-slate-700 px-3 py-2 rounded-md text-xs hover:bg-slate-50 transition-colors">
								Sign Out
							</button>
						</div>
					</div>
				{/if}
			{/snippet}
		</Sidebar>
	{:else}
		<Sidebar 
			{variant} 
			{width} 
			{position} 
			{title}
			{collapsible}
			collapsed={currentCollapsed}
			onCollapsedChange={handleCollapsedChange}
			items={sampleItems}
		>
			{#snippet children()}
				{#if variant === 'default' && title === 'Dashboard'}
					<div class="border-t border-slate-200 pt-4">
						<div class="flex flex-col gap-3">
							<div class="flex items-center gap-2">
								<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
									JD
								</div>
								<div class="text-xs">
									<div class="font-medium text-slate-900">John Doe</div>
									<div class="text-slate-500">Admin</div>
								</div>
							</div>
							<button class="w-full bg-transparent border border-slate-300 text-slate-700 px-3 py-2 rounded-md text-xs hover:bg-slate-50 transition-colors">
								Sign Out
							</button>
						</div>
					</div>
				{/if}
			{/snippet}
		</Sidebar>
		
		<div class="flex-1 p-6 bg-slate-50 flex items-center justify-center">
			<div class="text-center">
				<h3 class="text-lg font-semibold text-slate-900 mb-2">Main Content</h3>
				<p class="text-slate-600 text-sm">
					{#if collapsible}
						{currentCollapsed ? 'Sidebar is collapsed' : 'Sidebar is expanded'}
					{:else}
						Content area next to the sidebar
					{/if}
				</p>
			</div>
		</div>
	{/if}
</div>