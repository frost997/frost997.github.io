<script lang="ts">
	import { page } from '$app/stores';
	import { auth, ui } from '$stores';
	import { cn } from '$utils';
	import Avatar from '$components/shared/Avatar.svelte';

	const navGroups = [
		{
			label: 'Overview',
			items: [{ href: '/admin', label: 'Dashboard', icon: 'dashboard' }]
		},
		{
			label: 'Management',
			items: [
				{ href: '/admin/products', label: 'Products', icon: 'products' },
				{ href: '/admin/transactions', label: 'Transactions', icon: 'transactions' },
				{ href: '/admin/carts', label: 'Carts', icon: 'carts' },
				{ href: '/admin/users', label: 'Users', icon: 'users' }
			]
		}
	];

	const icons: Record<string, string> = {
		dashboard: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>`,
		products: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
		transactions: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`,
		carts: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
		users: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
	};

	function isActive(href: string): boolean {
		if (href === '/admin') return $page.url.pathname === '/admin';
		return $page.url.pathname.startsWith(href);
	}
</script>

<!-- Desktop Sidebar -->
<aside class={cn(
	'hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-secondary-950 text-white transition-all duration-300 z-50',
	ui.sidebarOpen ? 'w-64' : 'w-20'
)}>
	<!-- Logo -->
	<div class="flex items-center gap-3 px-4 h-16 border-b border-secondary-800">
		<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
			<span class="text-xl">🏪</span>
		</div>
		{#if ui.sidebarOpen}
			<div class="overflow-hidden">
				<span class="font-display font-bold text-white">Campus</span>
				<span class="font-display font-bold text-primary-400">Store</span>
			</div>
		{/if}
	</div>

	<!-- Navigation -->
	<nav class="flex-1 overflow-y-auto py-4">
		{#each navGroups as group}
			{#if ui.sidebarOpen}
				<p class="px-4 mb-2 text-xs font-semibold text-secondary-400 uppercase tracking-wider">
					{group.label}
				</p>
			{/if}
			<ul class="space-y-1 px-2 mb-6">
				{#each group.items as item}
					<li>
						<a 
							href={item.href}
							class={cn(
								'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
								isActive(item.href)
									? 'bg-primary-500 text-white shadow-glow'
									: 'text-secondary-300 hover:bg-secondary-800 hover:text-white'
							)}
							title={!ui.sidebarOpen ? item.label : undefined}
						>
							<span class="flex-shrink-0">{@html icons[item.icon]}</span>
							{#if ui.sidebarOpen}
								<span class="text-sm font-medium">{item.label}</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		{/each}
	</nav>

	<!-- User section -->
	<div class="border-t border-secondary-800 p-4">
		{#if auth.user}
			<div class="flex items-center gap-3">
				<Avatar name={auth.user.name} size="sm" />
				{#if ui.sidebarOpen}
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-white truncate">{auth.user.name}</p>
						<p class="text-xs text-secondary-400 truncate">{auth.user.email}</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Toggle button -->
	<button
		type="button"
		class="absolute -right-3 top-20 w-6 h-6 rounded-full bg-secondary-800 border border-secondary-700 text-secondary-400 hover:text-white flex items-center justify-center shadow-lg"
		onclick={() => ui.toggleSidebar()}
		aria-label={ui.sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
	>
		<svg class={cn('w-4 h-4 transition-transform', !ui.sidebarOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>
</aside>

<!-- Mobile sidebar backdrop -->
<div 
	class={cn(
		'lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity',
		ui.mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
	)}
	onclick={() => ui.closeMobileMenu()}
	onkeydown={(e) => e.key === 'Escape' && ui.closeMobileMenu()}
	role="button"
	tabindex="-1"
	aria-label="Close sidebar"
></div>

<!-- Mobile Sidebar -->
<aside class={cn(
	'lg:hidden fixed left-0 top-0 h-screen w-64 bg-secondary-950 text-white z-50 transition-transform duration-300',
	ui.mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
)}>
	<div class="flex items-center justify-between px-4 h-16 border-b border-secondary-800">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
				<span class="text-xl">🏪</span>
			</div>
			<div>
				<span class="font-display font-bold text-white">Campus</span>
				<span class="font-display font-bold text-primary-400">Store</span>
			</div>
		</div>
		<button
			type="button"
			class="p-2 rounded-lg text-secondary-400 hover:text-white hover:bg-secondary-800"
			onclick={() => ui.closeMobileMenu()}
			aria-label="Close sidebar"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<nav class="flex-1 overflow-y-auto py-4">
		{#each navGroups as group}
			<p class="px-4 mb-2 text-xs font-semibold text-secondary-400 uppercase tracking-wider">
				{group.label}
			</p>
			<ul class="space-y-1 px-2 mb-6">
				{#each group.items as item}
					<li>
						<a 
							href={item.href}
							class={cn(
								'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
								isActive(item.href)
									? 'bg-primary-500 text-white'
									: 'text-secondary-300 hover:bg-secondary-800 hover:text-white'
							)}
							onclick={() => ui.closeMobileMenu()}
						>
							<span>{@html icons[item.icon]}</span>
							<span class="text-sm font-medium">{item.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		{/each}
	</nav>

	<div class="border-t border-secondary-800 p-4">
		<a href="/" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary-300 hover:bg-secondary-800 hover:text-white transition-colors">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			<span class="text-sm font-medium">Back to Store</span>
		</a>
	</div>
</aside>
