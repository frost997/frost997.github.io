<script lang="ts">
	import { page } from "$app/stores";
	import { auth, cart, ui } from "$stores";
	import { cn } from "$utils";
	import Button from "$components/shared/Button.svelte";
	import Avatar from "$components/shared/Avatar.svelte";

	let menuOpen = $state(false);

	const navLinks = [
		{ href: "/", label: "Shop", icon: "home" },
		{ href: "/cart", label: "Cart", icon: "cart" },
		{ href: "/history", label: "Orders", icon: "receipt" },
	];

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	$inspect(auth.isAdmin);
</script>

<header
	class="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-surface-200"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 group">
				<div
					class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow"
				>
					<span class="text-xl">🏪</span>
				</div>
				<div class="hidden sm:block">
					<span class="font-display font-bold text-surface-900"
						>Campus</span
					>
					<span class="font-display font-bold text-primary-500"
						>Store</span
					>
				</div>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center gap-1">
				{#each navLinks as link}
					<a
						href={link.href}
						class={cn(
							"px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
							$page.url.pathname === link.href
								? "bg-primary-50 text-primary-600"
								: "text-surface-600 hover:bg-surface-100 hover:text-surface-900",
						)}
					>
						{link.label}
						{#if link.icon === "cart" && cart.itemCount > 0}
							<span
								class="ml-1.5 px-1.5 py-0.5 text-xs font-bold bg-primary-500 text-white rounded-full"
							>
								{cart.itemCount}
							</span>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- Right side actions -->
			<div class="flex items-center gap-3">
				{#if auth.isAdmin}
					<Button
						href="/admin"
						variant="secondary"
						size="sm"
						class="hidden sm:inline-flex"
					>
						Admin Panel
					</Button>
				{/if}

				<!-- User menu -->
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
							<span
								class="hidden sm:block text-sm font-medium text-surface-700"
								>{auth.user.name}</span
							>
							<svg
								class={cn(
									"w-4 h-4 text-surface-400 transition-transform",
									menuOpen && "rotate-180",
								)}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>

						{#if menuOpen}
							<div
								class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-surface-200 py-1 animate-fade-in"
								role="menu"
							>
								<div
									class="px-4 py-2 border-b border-surface-100"
								>
									<p
										class="text-sm font-medium text-surface-900"
									>
										{auth.user.name}
									</p>
									<p class="text-xs text-surface-500">
										{auth.user.email}
									</p>
								</div>
								{#if auth.isAdmin}
									<a
										href="/admin"
										class="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 sm:hidden"
										onclick={closeMenu}
									>
										Admin Panel
									</a>
								{/if}
								<a
									href="/history"
									class="block px-4 py-2 text-sm text-surface-700 hover:bg-surface-50"
									onclick={closeMenu}
								>
									Order History
								</a>
								<hr class="my-1 border-surface-100" />
								<a
									href="/logout"
									class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
									onclick={closeMenu}
								>
									Sign Out
								</a>
							</div>
						{/if}
					</div>
				{:else}
					<Button href="/login" variant="ghost" size="sm">
						Sign In
					</Button>
					<Button
						href="/register"
						size="sm"
						class="hidden sm:inline-flex"
					>
						Get Started
					</Button>
				{/if}

				<!-- Mobile menu button -->
				<button
					type="button"
					class="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100"
					onclick={() => ui.toggleMobileMenu()}
					aria-label="Toggle mobile menu"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Navigation -->
	{#if ui.mobileMenuOpen}
		<div
			class="md:hidden border-t border-surface-200 bg-white animate-slide-up"
		>
			<nav class="px-4 py-3 space-y-1">
				{#each navLinks as link}
					<a
						href={link.href}
						class={cn(
							"flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
							$page.url.pathname === link.href
								? "bg-primary-50 text-primary-600"
								: "text-surface-600 hover:bg-surface-100",
						)}
						onclick={() => ui.closeMobileMenu()}
					>
						{link.label}
						{#if link.icon === "cart" && cart.itemCount > 0}
							<span
								class="ml-auto px-2 py-0.5 text-xs font-bold bg-primary-500 text-white rounded-full"
							>
								{cart.itemCount}
							</span>
						{/if}
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>

<!-- Backdrop for user menu -->
{#if menuOpen}
	<div
		class="fixed inset-0 z-30"
		onclick={closeMenu}
		onkeydown={(e) => e.key === "Escape" && closeMenu()}
		role="button"
		tabindex="-1"
		aria-label="Close menu"
	></div>
{/if}
