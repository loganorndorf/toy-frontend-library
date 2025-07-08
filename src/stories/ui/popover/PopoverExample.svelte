<script lang="ts">
	import Popover from '$lib/components/ui/Popover.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let {
		variant = 'default',
		size = 'md',
		placement = 'bottom',
		trigger = 'click',
		showArrow = true,
		delay = 0
	} = $props();

	let clickOpen = $state(false);
	let hoverOpen = $state(false);
	let focusOpen = $state(false);

	const getExampleContent = (type: string) => {
		switch (type) {
			case 'info':
				return `
					<div>
						<h4 style="margin: 0 0 8px 0; font-weight: 600;">Information</h4>
						<p style="margin: 0; color: #64748b; font-size: 14px;">
							This is a popover with useful information. You can include rich content like headings, paragraphs, and more.
						</p>
					</div>
				`;
			case 'form':
				return `
					<div>
						<h4 style="margin: 0 0 12px 0; font-weight: 600;">Quick Form</h4>
						<div style="display: flex; flex-direction: column; gap: 8px;">
							<input 
								type="text" 
								placeholder="Enter your name"
								style="padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px;"
							/>
							<button 
								style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer;"
							>
								Submit
							</button>
						</div>
					</div>
				`;
			case 'tooltip':
				return `
					<div style="font-size: 14px;">
						This is a tooltip with helpful information
					</div>
				`;
			case 'warning':
				return `
					<div>
						<h4 style="margin: 0 0 8px 0; font-weight: 600;">Warning</h4>
						<p style="margin: 0; font-size: 14px;">
							This action cannot be undone. Are you sure you want to continue?
						</p>
					</div>
				`;
			case 'success':
				return `
					<div>
						<h4 style="margin: 0 0 8px 0; font-weight: 600;">Success!</h4>
						<p style="margin: 0; font-size: 14px;">
							Your changes have been saved successfully.
						</p>
					</div>
				`;
			default:
				return `
					<div>
						<h4 style="margin: 0 0 8px 0; font-weight: 600;">Popover Content</h4>
						<p style="margin: 0; color: #64748b; font-size: 14px;">
							This is the content of the popover. It can contain any HTML content.
						</p>
					</div>
				`;
		}
	};
</script>

<div class="p-8 bg-slate-50 min-h-screen">
	<div class="max-w-4xl mx-auto">
		<h3 class="text-2xl font-semibold mb-8 text-center">Popover Examples</h3>

		<!-- Main Example -->
		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-8 mb-8">
			<h4 class="font-semibold mb-4">Interactive Example</h4>
			<div class="flex justify-center">
				<Popover
					{variant}
					{size}
					{placement}
					{trigger}
					{showArrow}
					{delay}
				>
					<Button variant="default">
						{trigger === 'click' ? 'Click me' : trigger === 'hover' ? 'Hover me' : 'Focus me'}
					</Button>
					
					{#snippet content()}
						{@html getExampleContent('info')}
					{/snippet}
				</Popover>
			</div>
		</div>

		<!-- Trigger Examples -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<!-- Click Trigger -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h5 class="font-medium mb-3">Click Trigger</h5>
				<div class="flex justify-center">
					<Popover trigger="click" bind:open={clickOpen}>
						<Button variant="outline">Click Popover</Button>
						
						{#snippet content()}
							{@html getExampleContent('form')}
						{/snippet}
					</Popover>
				</div>
				<div class="mt-2 text-xs text-center text-slate-500">
					Status: {clickOpen ? 'Open' : 'Closed'}
				</div>
			</div>

			<!-- Hover Trigger -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h5 class="font-medium mb-3">Hover Trigger</h5>
				<div class="flex justify-center">
					<Popover trigger="hover" variant="tooltip" size="auto" bind:open={hoverOpen}>
						<Button variant="ghost">Hover Tooltip</Button>
						
						{#snippet content()}
							{@html getExampleContent('tooltip')}
						{/snippet}
					</Popover>
				</div>
				<div class="mt-2 text-xs text-center text-slate-500">
					Status: {hoverOpen ? 'Open' : 'Closed'}
				</div>
			</div>

			<!-- Focus Trigger -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h5 class="font-medium mb-3">Focus Trigger</h5>
				<div class="flex justify-center">
					<Popover trigger="focus" bind:open={focusOpen}>
						<input
							type="text"
							placeholder="Focus me"
							class="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						
						{#snippet content()}
							{@html getExampleContent('info')}
						{/snippet}
					</Popover>
				</div>
				<div class="mt-2 text-xs text-center text-slate-500">
					Status: {focusOpen ? 'Open' : 'Closed'}
				</div>
			</div>
		</div>

		<!-- Variant Examples -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			<!-- Default Variant -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h5 class="font-medium mb-3">Default</h5>
				<div class="flex justify-center">
					<Popover variant="default" trigger="click">
						<Button variant="default">Default</Button>
						
						{#snippet content()}
							{@html getExampleContent('info')}
						{/snippet}
					</Popover>
				</div>
			</div>

			<!-- Warning Variant -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h5 class="font-medium mb-3">Warning</h5>
				<div class="flex justify-center">
					<Popover variant="warning" trigger="click">
						<Button variant="destructive">Warning</Button>
						
						{#snippet content()}
							{@html getExampleContent('warning')}
						{/snippet}
					</Popover>
				</div>
			</div>

			<!-- Success Variant -->
			<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
				<h5 class="font-medium mb-3">Success</h5>
				<div class="flex justify-center">
					<Popover variant="success" trigger="click">
						<Button variant="secondary">Success</Button>
						
						{#snippet content()}
							{@html getExampleContent('success')}
						{/snippet}
					</Popover>
				</div>
			</div>
		</div>

		<!-- Placement Examples -->
		<div class="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
			<h4 class="font-semibold mb-6 text-center">Placement Options</h4>
			<div class="grid grid-cols-3 gap-4 max-w-md mx-auto">
				<!-- Top Row -->
				<div class="flex justify-center">
					<Popover placement="top-start" trigger="click">
						<Button variant="outline" size="sm">↖ Top Start</Button>
						{#snippet content()}
							<div class="text-sm">Top Start</div>
						{/snippet}
					</Popover>
				</div>
				<div class="flex justify-center">
					<Popover placement="top" trigger="click">
						<Button variant="outline" size="sm">↑ Top</Button>
						{#snippet content()}
							<div class="text-sm">Top Center</div>
						{/snippet}
					</Popover>
				</div>
				<div class="flex justify-center">
					<Popover placement="top-end" trigger="click">
						<Button variant="outline" size="sm">↗ Top End</Button>
						{#snippet content()}
							<div class="text-sm">Top End</div>
						{/snippet}
					</Popover>
				</div>

				<!-- Middle Row -->
				<div class="flex justify-center">
					<Popover placement="left" trigger="click">
						<Button variant="outline" size="sm">← Left</Button>
						{#snippet content()}
							<div class="text-sm">Left</div>
						{/snippet}
					</Popover>
				</div>
				<div class="flex justify-center">
					<div class="w-16 h-16 bg-slate-100 rounded-md flex items-center justify-center text-xs text-slate-500">
						Center
					</div>
				</div>
				<div class="flex justify-center">
					<Popover placement="right" trigger="click">
						<Button variant="outline" size="sm">→ Right</Button>
						{#snippet content()}
							<div class="text-sm">Right</div>
						{/snippet}
					</Popover>
				</div>

				<!-- Bottom Row -->
				<div class="flex justify-center">
					<Popover placement="bottom-start" trigger="click">
						<Button variant="outline" size="sm">↙ Bottom Start</Button>
						{#snippet content()}
							<div class="text-sm">Bottom Start</div>
						{/snippet}
					</Popover>
				</div>
				<div class="flex justify-center">
					<Popover placement="bottom" trigger="click">
						<Button variant="outline" size="sm">↓ Bottom</Button>
						{#snippet content()}
							<div class="text-sm">Bottom Center</div>
						{/snippet}
					</Popover>
				</div>
				<div class="flex justify-center">
					<Popover placement="bottom-end" trigger="click">
						<Button variant="outline" size="sm">↘ Bottom End</Button>
						{#snippet content()}
							<div class="text-sm">Bottom End</div>
						{/snippet}
					</Popover>
				</div>
			</div>
		</div>
	</div>
</div>