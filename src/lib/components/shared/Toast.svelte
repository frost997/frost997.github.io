<script lang="ts">
	import { toast } from '$stores';
	import { cn } from '$utils';

	const iconMap = {
		success: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
		error: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
		warning: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
		info: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
	};

	const colorMap = {
		success: 'bg-accent-500',
		error: 'bg-red-500',
		warning: 'bg-yellow-500',
		info: 'bg-blue-500'
	};
</script>

<div 
	class="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none"
	aria-live="polite"
	aria-label="Notifications"
>
	{#each toast.toasts as t (t.id)}
		<div
			class={cn(
				'flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-lg border border-surface-200',
				'pointer-events-auto max-w-sm animate-slide-in-right'
			)}
			role="alert"
		>
			<!-- Icon -->
			<div class={cn('flex-shrink-0 p-1.5 rounded-full text-white', colorMap[t.type])}>
				{@html iconMap[t.type]}
			</div>
			
			<!-- Message -->
			<p class="flex-1 text-sm text-surface-700">
				{t.message}
			</p>
			
			<!-- Close button -->
			<button
				type="button"
				class="flex-shrink-0 p-1 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
				onclick={() => toast.dismiss(t.id)}
				aria-label="Dismiss notification"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	{/each}
</div>
