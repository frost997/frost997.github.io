<script lang="ts">
	import { formatCurrency } from '$utils';
	import Card from '$components/shared/Card.svelte';

	// Stats - in real app these would come from API
	let stats = $state({
		totalProducts: 48,
		totalUsers: 156,
		totalTransactions: 89,
		totalRevenue: 2847.50,
		pendingOrders: 12,
		lowStockItems: 5
	});

	// Use $inspect to debug stats in development
	// $inspect(stats);
</script>

<svelte:head>
	<title>Admin Dashboard - Campus Store</title>
</svelte:head>

<div class="space-y-6">
	<!-- Stats grid -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
		<Card>
			<p class="text-sm font-medium text-surface-500">Total Products</p>
			<p class="mt-1 text-3xl font-display font-bold text-surface-900">{stats.totalProducts}</p>
		</Card>
		<Card>
			<p class="text-sm font-medium text-surface-500">Total Users</p>
			<p class="mt-1 text-3xl font-display font-bold text-surface-900">{stats.totalUsers}</p>
		</Card>
		<Card>
			<p class="text-sm font-medium text-surface-500">Transactions</p>
			<p class="mt-1 text-3xl font-display font-bold text-surface-900">{stats.totalTransactions}</p>
		</Card>
		<Card>
			<p class="text-sm font-medium text-surface-500">Revenue</p>
			<p class="mt-1 text-3xl font-display font-bold text-surface-900">{formatCurrency(stats.totalRevenue)}</p>
		</Card>
	</div>

	<!-- Quick links -->
	<Card>
		<h2 class="text-lg font-display font-semibold text-surface-900 mb-4">Quick Actions</h2>
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
			<a href="/admin/products" class="flex flex-col items-center gap-2 p-4 rounded-xl border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-center">
				<div class="p-3 rounded-xl bg-primary-100 text-primary-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
				</div>
				<span class="text-sm font-medium text-surface-700">Products</span>
			</a>
			<a href="/admin/transactions" class="flex flex-col items-center gap-2 p-4 rounded-xl border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-center">
				<div class="p-3 rounded-xl bg-secondary-100 text-secondary-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
				</div>
				<span class="text-sm font-medium text-surface-700">Orders</span>
			</a>
			<a href="/admin/users" class="flex flex-col items-center gap-2 p-4 rounded-xl border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-center">
				<div class="p-3 rounded-xl bg-accent-100 text-accent-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
				</div>
				<span class="text-sm font-medium text-surface-700">Users</span>
			</a>
			<a href="/admin/carts" class="flex flex-col items-center gap-2 p-4 rounded-xl border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-center">
				<div class="p-3 rounded-xl bg-yellow-100 text-yellow-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
				</div>
				<span class="text-sm font-medium text-surface-700">Carts</span>
			</a>
		</div>
	</Card>
</div>
