<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$stores';
	import Toast from '$components/shared/Toast.svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		auth.initialize();
	});
</script>

{@render children()}
<Toast />
