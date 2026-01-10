<script lang="ts">
	import type { ProductCategory } from "$types";
	import { categoryLabels, categoryIcons, cn } from "$utils";

	interface Props {
		selected?: ProductCategory | null;
		onchange?: (value: ProductCategory | null) => void;
	}

	let { selected = null, onchange }: Props = $props();

	const categories: {
		value: ProductCategory | null;
		label: string;
		icon: string;
	}[] = [
		{ value: null, label: "All Items", icon: "🛒" },
		{
			value: "beverages",
			label: categoryLabels.beverages,
			icon: categoryIcons.beverages,
		},
		{
			value: "snacks",
			label: categoryLabels.snacks,
			icon: categoryIcons.snacks,
		},
		{
			value: "daily_necessities",
			label: categoryLabels.daily_necessities,
			icon: categoryIcons.daily_necessities,
		},
	];

	function handleSelect(value: ProductCategory | null) {
		onchange?.(value);
	}
</script>

<div
	class="flex flex-wrap gap-2"
	role="tablist"
	aria-label="Product categories"
>
	{#each categories as category}
		<button
			type="button"
			role="tab"
			aria-selected={selected === category.value}
			class={cn(
				"inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
				selected === category.value
					? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
					: "bg-white text-surface-600 border border-surface-200 hover:border-surface-300 hover:bg-surface-50",
			)}
			onclick={() => handleSelect(category.value)}
		>
			<span class="text-base">{category.icon}</span>
			<span>{category.label}</span>
		</button>
	{/each}
</div>
