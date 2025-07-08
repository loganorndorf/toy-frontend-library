<script lang="ts">
	import Sidebar from '$lib/components/ui/Sidebar.svelte';

	// Mock icons using emoji
	const mockIcons = {
		Home: () => '🏠',
		BarChart3: () => '📊',
		Users: () => '👥',
		Settings: () => '⚙️'
	};

	const sampleItems = [
		{ label: 'Dashboard', href: '#dashboard', icon: mockIcons.Home, active: true },
		{ label: 'Analytics', href: '#analytics', icon: mockIcons.BarChart3 },
		{ label: 'Users', href: '#users', icon: mockIcons.Users },
		{ label: 'Settings', href: '#settings', icon: mockIcons.Settings }
	];
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-80">
	<!-- Default -->
	<div class="border border-slate-200 rounded-lg overflow-hidden flex">
		<Sidebar variant="default" width="sm" items={sampleItems} />
		<div class="flex-1 p-4 bg-slate-50 flex items-center justify-center">
			<span class="text-slate-600 text-sm">Default</span>
		</div>
	</div>
	
	<!-- Bordered -->
	<div class="border border-slate-200 rounded-lg overflow-hidden flex bg-slate-50 p-2">
		<Sidebar variant="bordered" width="sm" items={sampleItems} />
		<div class="flex-1 p-4 flex items-center justify-center">
			<span class="text-slate-600 text-sm">Bordered</span>
		</div>
	</div>
	
	<!-- Elevated -->
	<div class="border border-slate-200 rounded-lg overflow-hidden flex bg-slate-50">
		<Sidebar variant="elevated" width="sm" items={sampleItems} />
		<div class="flex-1 p-4 flex items-center justify-center">
			<span class="text-slate-600 text-sm">Elevated</span>
		</div>
	</div>
</div>