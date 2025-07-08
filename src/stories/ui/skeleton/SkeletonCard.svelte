<script>
	import Skeleton from '../../../lib/components/ui/Skeleton.svelte';
	import Card from '../../../lib/components/ui/Card.svelte';
</script>

<Card>
	<div class="p-6">
		<Skeleton class="h-4 w-3/4 mb-4" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-full" />
			<Skeleton class="h-4 w-full" />
			<Skeleton class="h-4 w-2/3" />
		</div>
		<div class="mt-4 flex justify-between">
			<Skeleton class="h-10 w-20" />
			<Skeleton class="h-10 w-20" />
		</div>
	</div>
</Card>