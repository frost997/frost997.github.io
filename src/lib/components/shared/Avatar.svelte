<script lang="ts">
	import { cn, getInitials } from '$utils';

	interface Props {
		src?: string;
		name?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	}

	let {
		src,
		name = '',
		size = 'md',
		class: className
	}: Props = $props();

	const sizeClasses = {
		sm: 'w-8 h-8 text-xs',
		md: 'w-10 h-10 text-sm',
		lg: 'w-12 h-12 text-base',
		xl: 'w-16 h-16 text-lg'
	};

	let initials = $derived(getInitials(name));

	function handleImageError(event: Event) {
		const target = event.target as HTMLImageElement;
		target.style.display = 'none';
	}
</script>

<div 
	class={cn(
		'relative rounded-full flex items-center justify-center font-semibold overflow-hidden',
		'bg-gradient-to-br from-primary-400 to-primary-600 text-white',
		sizeClasses[size],
		className
	)}
>
	{#if src}
		<img 
			{src} 
			alt={name} 
			class="w-full h-full object-cover"
			onerror={handleImageError}
		/>
	{/if}
	<span class="absolute inset-0 flex items-center justify-center">
		{initials}
	</span>
</div>
