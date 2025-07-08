<script>
	import Skeleton from '../../../lib/components/ui/Skeleton.svelte';
	import Card from '../../../lib/components/ui/Card.svelte';
</script>

<Card>
	<div class="p-6">
		<div class="flex items-center space-x-4">
			<Skeleton variant="circle" class="h-12 w-12" />
			<div class="space-y-2 flex-1">
				<Skeleton class="h-4 w-1/4" />
				<Skeleton class="h-4 w-1/2" />
			</div>
		</div>
	</div>
</Card>