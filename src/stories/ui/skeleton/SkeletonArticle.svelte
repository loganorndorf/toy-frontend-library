<script>
	import Skeleton from '../../../lib/components/ui/Skeleton.svelte';
	import Card from '../../../lib/components/ui/Card.svelte';
</script>

<Card>
	<div class="p-6">
		<Skeleton class="h-48 w-full mb-4" />
		<Skeleton class="h-6 w-3/4 mb-2" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-full" />
			<Skeleton class="h-4 w-full" />
			<Skeleton class="h-4 w-2/3" />
		</div>
		<div class="flex items-center mt-4 space-x-2">
			<Skeleton variant="circle" class="h-6 w-6" />
			<Skeleton class="h-4 w-24" />
			<Skeleton class="h-4 w-16" />
		</div>
	</div>
</Card>