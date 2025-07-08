<script lang="ts">
	import Sheet from '$lib/components/ui/Sheet.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let {
		side = 'right',
		size = 'md',
		title = 'Sheet Title',
		buttonText = 'Open Sheet'
	} = $props();

	let open = $state(false);
</script>

<div>
	<Button onclick={() => open = true}>
		{buttonText}
	</Button>

	<Sheet bind:open={open} {side} {size} {title}>
		{#snippet children()}
			<div class="space-y-4 p-4">
				<p class="text-slate-600">
					This sheet slides in from the {side} side of the screen.
				</p>
				
				{#if side === 'right'}
					<div class="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
						<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
							JD
						</div>
						<div>
							<p class="text-sm font-medium">John Doe</p>
							<p class="text-xs text-slate-500">Administrator</p>
						</div>
					</div>
				{:else if side === 'left'}
					<nav class="space-y-2">
						<a href="#" class="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-100 text-slate-900">
							<span>🏠</span>
							<span>Home</span>
						</a>
						<a href="#" class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
							<span>📊</span>
							<span>Analytics</span>
						</a>
						<a href="#" class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
							<span>👥</span>
							<span>Users</span>
						</a>
					</nav>
				{:else if side === 'top'}
					<div class="space-y-3">
						<div class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
							<div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<p class="text-sm font-medium">New message received</p>
								<p class="text-xs text-slate-500">From John Doe • 2 minutes ago</p>
							</div>
						</div>
						<div class="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
							<div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<p class="text-sm font-medium">Task completed</p>
								<p class="text-xs text-slate-500">Project setup finished • 5 minutes ago</p>
							</div>
						</div>
					</div>
				{:else if side === 'bottom'}
					<div class="grid grid-cols-2 gap-2">
						<button class="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
							<span>📅</span>
							<span class="text-sm">Schedule</span>
						</button>
						<button class="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
							<span>📧</span>
							<span class="text-sm">Message</span>
						</button>
						<button class="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
							<span>📄</span>
							<span class="text-sm">Document</span>
						</button>
						<button class="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
							<span>👥</span>
							<span class="text-sm">Team</span>
						</button>
					</div>
				{/if}
			</div>
		{/snippet}
	</Sheet>
</div>