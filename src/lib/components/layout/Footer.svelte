<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-surface-50 border-t border-surface-200">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="flex flex-col md:flex-row items-center justify-between gap-4">
			<!-- Logo and tagline -->
			<div class="flex items-center gap-3">
				<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
					<span class="text-sm">🏪</span>
				</div>
				<div>
					<span class="font-display font-bold text-surface-700">Campus</span>
					<span class="font-display font-bold text-primary-500">Store</span>
				</div>
			</div>

			<!-- Links -->
			<nav class="flex items-center gap-6 text-sm">
				<a href="/" class="text-surface-600 hover:text-primary-500 transition-colors">
					Shop
				</a>
				<a href="/history" class="text-surface-600 hover:text-primary-500 transition-colors">
					Orders
				</a>
				<a href="/help" class="text-surface-600 hover:text-primary-500 transition-colors">
					Help
				</a>
			</nav>

			<!-- Copyright -->
			<p class="text-sm text-surface-500">
				© {currentYear} CampusStore. Built with ❤️ for students.
			</p>
		</div>
	</div>
</footer>
