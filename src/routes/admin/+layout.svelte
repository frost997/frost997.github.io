<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth, ui } from '$stores';
	import { cn } from '$utils';
	import AdminSidebar from '$components/layout/AdminSidebar.svelte';
	import AdminHeader from '$components/layout/AdminHeader.svelte';
	import Spinner from '$components/shared/Spinner.svelte';

	let { children } = $props();
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	// Redirect non-admins
	$effect(() => {
		if (mounted && !auth.isLoading && !auth.isAdmin) {
			goto('/');
		}
	});
</script>

{#if auth.isLoading}
	<div class="min-h-screen flex items-center justify-center bg-surface-50">
		<Spinner size="lg" />
	</div>
{:else if auth.isAdmin}
	<div class="min-h-screen bg-surface-50">
		<AdminSidebar />
		<div class={cn('transition-all duration-300', ui.sidebarOpen ? 'lg:ml-64' : 'lg:ml-20')}>
			<AdminHeader />
			<main class="p-4 lg:p-6">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
