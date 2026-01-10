<script lang="ts">
	import Card from '$components/shared/Card.svelte';
	import Button from '$components/shared/Button.svelte';
</script>

<svelte:head>
	<title>Checkout - Campus Store</title>
</svelte:head>

<div class="page-container">
	<Card class="max-w-lg mx-auto text-center py-12">
		<div class="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-100 flex items-center justify-center">
			<svg class="w-10 h-10 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		</div>
		<h1 class="text-2xl font-display font-bold text-surface-900 mb-2">Order Confirmed! 🎉</h1>
		<p class="text-surface-600 mb-6">Thank you for your order.</p>
		<Button href="/">Continue Shopping</Button>
	</Card>
</div>
