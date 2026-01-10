<script lang="ts">
	import { page } from '$app/stores';
	import { auth, ui } from '$stores';
	import { cn } from '$utils';
	import Avatar from '$components/shared/Avatar.svelte';

	let menuOpen = $state(false);

	let pageTitle = $derived(getPageTitle($page.url.pathname));

	function getPageTitle(pathname: string): string {
		const segments = pathname.split('/').filter(Boolean);
		if (segments.length <= 1) return 'Dashboard';
		const lastSegment = segments[segments.length - 1];
		return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class={cn(
	'sticky top-0 z-30 h-16 bg-white border-b border-surface-200 transition-all duration-300',
	ui.sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
)}>
	<div class="flex items-center justify-between h-full px-4 lg:px-6">
		<div class="flex items-center gap-4">
			<button
				type="button"
				class="lg:hidden p-2 -ml-2 rounded-lg text-surface-600 hover:bg-surface-100"
				onclick={() => ui.toggleMobileMenu()}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>

			<div>
				<h1 class="text-lg font-display font-semibold text-surface-900">{pageTitle}</h1>
				<p class="text-sm text-surface-500 hidden sm:block">Manage your college convenience store</p>
			</div>
		</div>

		<div class="flex items-center gap-3">
			<a href="/" class="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100 transition-colors">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
				View Store
			</a>

			{#if auth.user}
				<div class="relative">
					<button
						type="button"
						class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100 transition-colors"
						onclick={toggleMenu}
						aria-expanded={menuOpen}
						aria-haspopup="true"
					>
						<Avatar name={auth.user.name} size="sm" />
						<span class="hidden sm:block text-sm font-medium text-surface-700">{auth.user.name}</span>
					</button>

					{#if menuOpen}
						<div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-surface-200 py-1 animate-fade-in" role="menu">
							<div class="px-4 py-2 border-b border-surface-100">
								<p class="text-sm font-medium text-surface-900">{auth.user.name}</p>
								<p class="text-xs text-surface-500">{auth.user.email}</p>
							</div>
							<a href="/" class="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 sm:hidden" onclick={closeMenu}>View Store</a>
							<hr class="my-1 border-surface-100 sm:hidden" />
							<a href="/logout" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50" onclick={closeMenu}>Sign Out</a>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</header>

{#if menuOpen}
	<div class="fixed inset-0 z-20" onclick={closeMenu} onkeydown={(e) => e.key === 'Escape' && closeMenu()} role="button" tabindex="-1" aria-label="Close menu"></div>
{/if}
