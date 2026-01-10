<script lang="ts">
	import { cn } from '$utils';

	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		value?: string;
		options?: Option[];
		placeholder?: string;
		label?: string;
		id?: string;
		name?: string;
		error?: string;
		disabled?: boolean;
		required?: boolean;
		class?: string;
		onchange?: (e: Event) => void;
	}

	let {
		value = $bindable(''),
		options = [],
		placeholder = 'Select an option',
		label = '',
		id,
		name = '',
		error = '',
		disabled = false,
		required = false,
		class: className,
		onchange
	}: Props = $props();

	const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class={cn('w-full', className)}>
	{#if label}
		<label 
			for={selectId} 
			class="block text-sm font-medium text-surface-700 mb-1.5"
		>
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}
	
	<div class="relative">
		<select
			id={selectId}
			{name}
			{disabled}
			{required}
			bind:value
			class={cn(
				'w-full px-4 py-2.5 rounded-xl border bg-white text-surface-900 appearance-none cursor-pointer',
				'transition-all duration-200',
				'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
				'disabled:bg-surface-50 disabled:text-surface-500 disabled:cursor-not-allowed',
				error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-surface-200',
				'pr-10'
			)}
			aria-invalid={!!error}
			aria-describedby={error ? `${selectId}-error` : undefined}
			{onchange}
		>
			{#if placeholder}
				<option value="" disabled>{placeholder}</option>
			{/if}
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		
		<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-surface-400">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</div>
	</div>
	
	{#if error}
		<p id="{selectId}-error" class="mt-1.5 text-sm text-red-500">
			{error}
		</p>
	{/if}
</div>
