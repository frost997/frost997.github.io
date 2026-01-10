<script lang="ts">
	import { cn } from '$utils';

	interface Props {
		currentPage?: number;
		totalPages?: number;
		maxVisible?: number;
		class?: string;
		onchange?: (page: number) => void;
	}

	let {
		currentPage = 1,
		totalPages = 1,
		maxVisible = 5,
		class: className,
		onchange
	}: Props = $props();

	function generatePages(current: number, total: number, max: number): (number | '...')[] {
		if (total <= max) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		const result: (number | '...')[] = [];
		const sideWidth = Math.floor((max - 3) / 2);

		if (current <= sideWidth + 2) {
			for (let i = 1; i <= max - 2; i++) result.push(i);
			result.push('...');
			result.push(total);
		} else if (current >= total - sideWidth - 1) {
			result.push(1);
			result.push('...');
			for (let i = total - max + 3; i <= total; i++) result.push(i);
		} else {
			result.push(1);
			result.push('...');
			for (let i = current - sideWidth; i <= current + sideWidth; i++) result.push(i);
			result.push('...');
			result.push(total);
		}

		return result;
	}

	let pages = $derived(generatePages(currentPage, totalPages, maxVisible));

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onchange?.(page);
		}
	}
</script>

{#if totalPages > 1}
	<nav 
		class={cn('flex items-center justify-center gap-1', className)}
		aria-label="Pagination"
	>
		<!-- Previous -->
		<button
			type="button"
			class={cn(
				'p-2 rounded-lg text-surface-600 transition-colors',
				currentPage === 1 
					? 'opacity-50 cursor-not-allowed' 
					: 'hover:bg-surface-100'
			)}
			disabled={currentPage === 1}
			onclick={() => goToPage(currentPage - 1)}
			aria-label="Previous page"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<!-- Page numbers -->
		{#each pages as page}
			{#if page === '...'}
				<span class="px-3 py-2 text-surface-400">...</span>
			{:else}
				<button
					type="button"
					class={cn(
						'px-3 py-2 min-w-[40px] rounded-lg text-sm font-medium transition-colors',
						page === currentPage
							? 'bg-primary-500 text-white'
							: 'text-surface-600 hover:bg-surface-100'
					)}
					onclick={() => goToPage(page)}
					aria-current={page === currentPage ? 'page' : undefined}
				>
					{page}
				</button>
			{/if}
		{/each}

		<!-- Next -->
		<button
			type="button"
			class={cn(
				'p-2 rounded-lg text-surface-600 transition-colors',
				currentPage === totalPages 
					? 'opacity-50 cursor-not-allowed' 
					: 'hover:bg-surface-100'
			)}
			disabled={currentPage === totalPages}
			onclick={() => goToPage(currentPage + 1)}
			aria-label="Next page"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</nav>
{/if}
