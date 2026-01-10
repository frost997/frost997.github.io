<script lang="ts">
	import { cn } from '$utils';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		variant?: Variant;
		size?: Size;
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'submit' | 'reset';
		fullWidth?: boolean;
		href?: string;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		type = 'button',
		fullWidth = false,
		href,
		class: className,
		onclick,
		children
	}: Props = $props();

	const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	const variantClasses: Record<Variant, string> = {
		primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md',
		secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-sm hover:shadow-md',
		ghost: 'text-surface-700 hover:bg-surface-100 focus:ring-surface-400',
		danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
		outline: 'border-2 border-surface-300 text-surface-700 hover:bg-surface-50 focus:ring-surface-400'
	};

	const sizeClasses: Record<Size, string> = {
		sm: 'px-3 py-1.5 text-sm gap-1.5',
		md: 'px-4 py-2.5 text-sm gap-2',
		lg: 'px-6 py-3 text-base gap-2.5'
	};

	let classes = $derived(cn(
		baseClasses,
		variantClasses[variant],
		sizeClasses[size],
		fullWidth && 'w-full',
		className
	));

	let isDisabled = $derived(disabled || loading);
</script>

{#if href && !disabled}
	<a {href} class={classes}>
		{#if loading}
			<svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		{/if}
		{@render children()}
	</a>
{:else}
	<button {type} disabled={isDisabled} class={classes} onclick={onclick}>
		{#if loading}
			<svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		{/if}
		{@render children()}
	</button>
{/if}
