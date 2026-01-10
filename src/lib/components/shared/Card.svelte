<script lang="ts">
	import { cn } from '$utils';

	interface Props {
		padding?: 'none' | 'sm' | 'md' | 'lg';
		hover?: boolean;
		class?: string;
		children: import('svelte').Snippet;
	}

	let {
		padding = 'md',
		hover = false,
		class: className,
		children
	}: Props = $props();

	const paddingClasses = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};
</script>

<div 
	class={cn(
		'bg-white rounded-2xl border border-surface-200 shadow-card',
		paddingClasses[padding],
		hover && 'transition-all duration-200 hover:shadow-lg hover:border-surface-300 hover:-translate-y-0.5',
		className
	)}
>
	{@render children()}
</div>
