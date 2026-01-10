<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth, cart, toast } from '$stores';

	onMount(async () => {
		await auth.logout();
		cart.reset();
		toast.success('Signed out successfully');
		goto('/');
	});
</script>

<div class="min-h-screen flex items-center justify-center">
	<p class="text-surface-500">Signing out...</p>
</div>
