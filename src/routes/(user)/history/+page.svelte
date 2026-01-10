<script lang="ts">
	import Card from '$components/shared/Card.svelte';
	import EmptyState from '$components/shared/EmptyState.svelte';
</script>

<svelte:head>
	<title>Order History - Campus Store</title>
</svelte:head>

<div class="page-container">
	<h1 class="section-title mb-8">Order History</h1>
	<Card>
		<EmptyState
			icon="receipt"
			title="No orders yet"
			description="Once you make a purchase, your orders will appear here."
			actionLabel="Start Shopping"
			actionHref="/"
		/>
	</Card>
</div>
