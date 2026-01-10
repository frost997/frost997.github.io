<script lang="ts">
	import { onMount } from "svelte";
	import type { Product, ProductCategory } from "$types";
	import { api } from "$services";
	import { toast } from "$stores";
	import { debounce, categoryLabels } from "$utils";
	import Input from "$components/shared/Input.svelte";
	import Spinner from "$components/shared/Spinner.svelte";
	import EmptyState from "$components/shared/EmptyState.svelte";
	import Pagination from "$components/shared/Pagination.svelte";
	import ProductCard from "$components/user/ProductCard.svelte";
	import CategoryFilter from "$components/user/CategoryFilter.svelte";

	// Reactive state using Svelte 5 runes
	let products = $state<Product[]>([]);
	let isLoading = $state(true);
	let currentPage = $state(1);
	let totalPages = $state(1);
	let selectedCategory = $state<ProductCategory | null>(null);
	let searchQuery = $state("");

	// Debug with $inspect - this will log changes in dev mode
	// $inspect(products);
	// $inspect({ isLoading, currentPage, selectedCategory });

	async function loadProducts() {
		isLoading = true;
		try {
			const response = await api.getProducts({
				category: selectedCategory ?? undefined,
				search: searchQuery || undefined,
				page: currentPage,
				pageSize: 12,
			});
			products = response.data.data;
			totalPages = response.data.totalPages;
		} catch (error) {
			toast.error("Failed to load products");
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		loadProducts();
	});

	const debouncedSearch = debounce(() => {
		currentPage = 1;
		loadProducts();
	}, 300);

	function handleCategoryChange(value: ProductCategory | null) {
		selectedCategory = value;
		currentPage = 1;
		loadProducts();
	}

	function handlePageChange(page: number) {
		currentPage = page;
		loadProducts();
	}

	function handleSearchInput() {
		debouncedSearch();
	}
</script>

<svelte:head>
	<title>Campus Store - Shop</title>
</svelte:head>

<div class="page-container">
	<!-- Hero section -->
	<div class="mb-8 md:mb-12">
		<div class="text-center max-w-2xl mx-auto mb-8">
			<h1
				class="text-3xl md:text-4xl font-display font-bold text-surface-900 mb-3"
			>
				Welcome to <span class="gradient-text">Campus Store</span>
			</h1>
			<p class="text-surface-600 text-lg">
				Your community convenience store. Share and discover everyday
				essentials with fellow students.
			</p>
		</div>

		<!-- Search bar -->
		<div class="max-w-xl mx-auto">
			<Input
				type="search"
				placeholder="Search for products..."
				bind:value={searchQuery}
				oninput={handleSearchInput}
				class="shadow-soft"
			>
				{#snippet prefix()}
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				{/snippet}
			</Input>
		</div>
	</div>

	<!-- Category filters -->
	<div class="mb-8">
		<CategoryFilter
			selected={selectedCategory}
			onchange={handleCategoryChange}
		/>
	</div>

	<!-- Products -->
	{#if isLoading}
		<div class="py-20">
			<Spinner size="lg" />
		</div>
	{:else if products.length === 0}
		<EmptyState
			icon="search"
			title="No products found"
			description={selectedCategory
				? `No ${categoryLabels[selectedCategory].toLowerCase()} are available at the moment.`
				: "We couldn't find any products matching your criteria."}
		/>
	{:else}
		{$inspect(products)}
		<div
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
		>
			{#each products as product (product._id)}
				<ProductCard {product} />
			{/each}
		</div>

		{#if totalPages > 1}
			<div class="pt-8 border-t border-surface-200 mt-8">
				<Pagination
					{currentPage}
					{totalPages}
					onchange={handlePageChange}
				/>
			</div>
		{/if}
	{/if}
</div>
