<script lang="ts">
	import { cn } from '$utils';

	type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
	type Size = 'sm' | 'md';

	interface Props {
		variant?: Variant;
		size?: Size;
		class?: string;
		children: import('svelte').Snippet;
	}

	let {
		variant = 'default',
		size = 'md',
		class: className,
		children
	}: Props = $props();

	const variantClasses: Record<Variant, string> = {
		default: 'bg-surface-100 text-surface-700',
		success: 'bg-accent-100 text-accent-700',
		warning: 'bg-yellow-100 text-yellow-700',
		danger: 'bg-red-100 text-red-700',
		info: 'bg-blue-100 text-blue-700',
		primary: 'bg-primary-100 text-primary-700'
	};

	const sizeClasses: Record<Size, string> = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-1 text-sm'
	};
</script>

<span 
	class={cn(
		'inline-flex items-center font-medium rounded-full',
		variantClasses[variant],
		sizeClasses[size],
		className
	)}
>
	{@render children()}
</span>
