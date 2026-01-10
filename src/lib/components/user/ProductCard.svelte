<script lang="ts">
	import type { Product } from "$types";
	import { formatCurrency, categoryLabels, cn } from "$utils";
	import { cart, toast } from "$stores";
	import Button from "$components/shared/Button.svelte";
	import Badge from "$components/shared/Badge.svelte";

	interface Props {
		product: Product;
	}

	let { product }: Props = $props();

	let isAdding = $state(false);

	$inspect(product);

	async function handleAddToCart() {
		if (isAdding) return;

		isAdding = true;
		try {
			await cart.addItem(product._id, 1);
			toast.success(`${product.name} added to cart!`);
		} catch (error) {
			toast.error("Failed to add item to cart");
		} finally {
			isAdding = false;
		}
	}

	let isOutOfStock = $derived(product.on_hand === 0);
</script>

<article
	class="group bg-white rounded-2xl border border-surface-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-surface-300 hover:-translate-y-1"
>
	<div
		class="relative aspect-square bg-gradient-to-br from-surface-50 to-surface-100 overflow-hidden"
	>
		{#if product.imageURL}
			<img
				src={product.imageURL}
				alt={product.name}
				class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
			/>
		{:else}
			<div class="w-full h-full flex items-center justify-center">
				<span class="text-6xl opacity-50">
					{#if product.category === "beverages"}🥤{:else if product.category === "snacks"}🍿{:else}🧴{/if}
				</span>
			</div>
		{/if}

		<div class="absolute top-3 left-3">
			<Badge variant="default" size="sm"
				>{categoryLabels[product.category]}</Badge
			>
		</div>

		{#if isOutOfStock}
			<div
				class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
			>
				<Badge variant="danger">Out of Stock</Badge>
			</div>
		{:else if product.stock <= 5}
			<div class="absolute top-3 right-3">
				<Badge variant="warning" size="sm"
					>Only {product.stock} left</Badge
				>
			</div>
		{/if}
	</div>

	<div class="p-4">
		<h3
			class="font-semibold text-surface-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors"
		>
			{product.name}
		</h3>

		<p class="text-sm text-surface-500 mb-3 line-clamp-2 min-h-[2.5rem]">
			{product.description}
		</p>

		<div class="flex items-center justify-between gap-3">
			<span class="text-lg font-display font-bold text-primary-600">
				{formatCurrency(product.price)}
			</span>

			<Button
				size="sm"
				disabled={isOutOfStock}
				loading={isAdding}
				onclick={handleAddToCart}
			>
				{#if isOutOfStock}Unavailable{:else}Add to Cart{/if}
			</Button>
		</div>
	</div>
</article>
