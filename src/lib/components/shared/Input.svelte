<script lang="ts">
	import { cn } from '$utils';

	interface Props {
		type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
		value?: string | number;
		placeholder?: string;
		label?: string;
		id?: string;
		name?: string;
		error?: string;
		disabled?: boolean;
		required?: boolean;
		autocomplete?: string;
		class?: string;
		prefix?: import('svelte').Snippet;
		suffix?: import('svelte').Snippet;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
		onfocus?: (e: FocusEvent) => void;
		onblur?: (e: FocusEvent) => void;
		onkeydown?: (e: KeyboardEvent) => void;
	}

	let {
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		label = '',
		id,
		name = '',
		error = '',
		disabled = false,
		required = false,
		autocomplete = '',
		class: className,
		prefix,
		suffix,
		oninput,
		onchange,
		onfocus,
		onblur,
		onkeydown
	}: Props = $props();

	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

	let inputClasses = $derived(cn(
		'w-full px-4 py-2.5 rounded-xl border bg-white text-surface-900 placeholder-surface-400',
		'transition-all duration-200',
		'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
		'disabled:bg-surface-50 disabled:text-surface-500 disabled:cursor-not-allowed',
		error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-surface-200',
		prefix && 'pl-10',
		suffix && 'pr-10'
	));
</script>

<div class={cn('w-full', className)}>
	{#if label}
		<label 
			for={inputId} 
			class="block text-sm font-medium text-surface-700 mb-1.5"
		>
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}
	
	<div class="relative">
		{#if prefix}
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400">
				{@render prefix()}
			</div>
		{/if}
		
		{#if type === 'text'}
			<input
				type="text"
				{name}
				{disabled}
				{required}
				{placeholder}
				{autocomplete}
				id={inputId}
				bind:value
				class={inputClasses}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
				{oninput}
				{onchange}
				{onfocus}
				{onblur}
				{onkeydown}
			/>
		{:else if type === 'email'}
			<input
				type="email"
				{name}
				{disabled}
				{required}
				{placeholder}
				{autocomplete}
				id={inputId}
				bind:value
				class={inputClasses}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
				{oninput}
				{onchange}
				{onfocus}
				{onblur}
				{onkeydown}
			/>
		{:else if type === 'password'}
			<input
				type="password"
				{name}
				{disabled}
				{required}
				{placeholder}
				{autocomplete}
				id={inputId}
				bind:value
				class={inputClasses}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
				{oninput}
				{onchange}
				{onfocus}
				{onblur}
				{onkeydown}
			/>
		{:else if type === 'number'}
			<input
				type="number"
				{name}
				{disabled}
				{required}
				{placeholder}
				{autocomplete}
				id={inputId}
				bind:value
				class={inputClasses}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
				{oninput}
				{onchange}
				{onfocus}
				{onblur}
				{onkeydown}
			/>
		{:else if type === 'search'}
			<input
				type="search"
				{name}
				{disabled}
				{required}
				{placeholder}
				{autocomplete}
				id={inputId}
				bind:value
				class={inputClasses}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
				{oninput}
				{onchange}
				{onfocus}
				{onblur}
				{onkeydown}
			/>
		{:else if type === 'tel'}
			<input
				type="tel"
				{name}
				{disabled}
				{required}
				{placeholder}
				{autocomplete}
				id={inputId}
				bind:value
				class={inputClasses}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
				{oninput}
				{onchange}
				{onfocus}
				{onblur}
				{onkeydown}
			/>
		{:else if type === 'url'}
			<input
				type="url"
				{name}
				{disabled}
				{required}
				{placeholder}
				{autocomplete}
				id={inputId}
				bind:value
				class={inputClasses}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
				{oninput}
				{onchange}
				{onfocus}
				{onblur}
				{onkeydown}
			/>
		{/if}
		
		{#if suffix}
			<div class="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400">
				{@render suffix()}
			</div>
		{/if}
	</div>
	
	{#if error}
		<p id="{inputId}-error" class="mt-1.5 text-sm text-red-500">
			{error}
		</p>
	{/if}
</div>
