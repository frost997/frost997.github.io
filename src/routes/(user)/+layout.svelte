<script lang="ts">
	import Header from '$components/layout/Header.svelte';
	import Footer from '$components/layout/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-surface-50">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
