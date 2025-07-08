<script>
	import Card from '../../../lib/components/ui/Card.svelte';
	import Button from '../../../lib/components/ui/Button.svelte';
	import Input from '../../../lib/components/ui/Input.svelte';
	import TextArea from '../../../lib/components/ui/TextArea.svelte';
</script>

<Card>
	<div class="p-6">
		<h3 class="text-lg font-semibold mb-4">Card with Form</h3>
		<div class="space-y-4">
			<Input label="Name" placeholder="Enter your name" />
			<TextArea label="Message" placeholder="Enter your message..." />
			<Button>Submit</Button>
		</div>
	</div>
</Card>