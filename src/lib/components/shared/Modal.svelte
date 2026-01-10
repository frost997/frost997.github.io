<script lang="ts">
	import { cn } from '$utils';

	interface Props {
		open?: boolean;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
		showClose?: boolean;
		class?: string;
		children: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
		onclose?: () => void;
	}

	let {
		open = $bindable(false),
		title = '',
		size = 'md',
		showClose = true,
		class: className,
		children,
		footer,
		onclose
	}: Props = $props();

	const sizeClasses = {
		sm: 'max-w-sm',
		md: 'max-w-lg',
		lg: 'max-w-2xl'
	};

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
			onclose?.();
		}
	}

	function handleBackdropClick() {
		open = false;
		onclose?.();
	}

	function handleClose() {
		open = false;
		onclose?.();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
	>
		<!-- Backdrop -->
		<div 
			class="absolute inset-0 bg-surface-900/60 backdrop-blur-sm animate-fade-in"
			onclick={handleBackdropClick}
			onkeydown={(e) => e.key === 'Enter' && handleBackdropClick()}
			role="button"
			tabindex="-1"
			aria-label="Close modal"
		></div>
		
		<!-- Modal -->
		<div 
			class={cn(
				'relative w-full bg-white rounded-2xl shadow-xl animate-slide-up',
				sizeClasses[size],
				className
			)}
		>
			<!-- Header -->
			{#if title || showClose}
				<div class="flex items-center justify-between p-6 border-b border-surface-100">
					{#if title}
						<h2 id="modal-title" class="text-lg font-display font-semibold text-surface-900">
							{title}
						</h2>
					{/if}
					
					{#if showClose}
						<button
							type="button"
							class="p-2 -m-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
							onclick={handleClose}
							aria-label="Close modal"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</div>
			{/if}
			
			<!-- Content -->
			<div class="p-6">
				{@render children()}
			</div>
			
			<!-- Footer -->
			{#if footer}
				<div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-100 bg-surface-50 rounded-b-2xl">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
