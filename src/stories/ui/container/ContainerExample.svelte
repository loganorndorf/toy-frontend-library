<script lang="ts">
	import Container from '$lib/components/ui/Container.svelte';

	let {
		size = 'xl',
		padding = 'md'
	} = $props();
</script>

<div class="bg-slate-100 min-h-screen p-8">
	<Container {size} {padding}>
		<div class="bg-white border-2 border-dashed border-slate-300 p-8 text-center rounded-lg">
			<h2 class="text-xl font-semibold text-slate-900 mb-4">Container Content</h2>
			<p class="text-slate-600 mb-4">
				This content is contained within the Container component with size="{size}" and padding="{padding}".
			</p>
			<div class="text-xs text-slate-500">
				The dashed border shows the container boundaries
			</div>
		</div>
	</Container>
</div>