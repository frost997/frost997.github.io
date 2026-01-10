<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, toast } from '$stores';
	import { isValidEmail } from '$utils';
	import Card from '$components/shared/Card.svelte';
	import Button from '$components/shared/Button.svelte';
	import Input from '$components/shared/Input.svelte';

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let errors = $state<Record<string, string>>({});

	function validate(): boolean {
		errors = {};
		if (!email) errors.email = 'Email is required';
		else if (!isValidEmail(email)) errors.email = 'Please enter a valid email';
		if (!password) errors.password = 'Password is required';
		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!validate()) return;

		isLoading = true;
		try {
			await auth.login(email, password);
			toast.success('Welcome back!');
			goto('/');
		} catch (error) {
			toast.error('Invalid email or password');
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign In - Campus Store</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-surface-100">
	<div class="w-full max-w-md animate-slide-up">
		<div class="text-center mb-8">
			<a href="/" class="inline-flex items-center gap-3">
				<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
					<span class="text-2xl">🏪</span>
				</div>
				<div>
					<span class="font-display font-bold text-2xl text-surface-900">Campus</span>
					<span class="font-display font-bold text-2xl text-primary-500">Store</span>
				</div>
			</a>
		</div>

		<Card>
			<h1 class="text-xl font-display font-semibold text-surface-900 text-center mb-6">Welcome back</h1>

			<form onsubmit={handleSubmit} class="space-y-4">
				<Input type="email" label="Email" placeholder="you@college.edu" bind:value={email} error={errors.email} autocomplete="email" />
				<Input type="password" label="Password" placeholder="Enter your password" bind:value={password} error={errors.password} autocomplete="current-password" />

				<div class="flex items-center justify-between text-sm">
					<label class="flex items-center gap-2">
						<input type="checkbox" class="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-500" />
						<span class="text-surface-600">Remember me</span>
					</label>
					<a href="/forgot-password" class="text-primary-600 hover:text-primary-700">Forgot password?</a>
				</div>

				<Button type="submit" fullWidth size="lg" loading={isLoading}>Sign In</Button>
			</form>

			<p class="text-center text-sm text-surface-500 mt-6">
				Don't have an account?
				<a href="/register" class="text-primary-600 hover:text-primary-700 font-medium">Create one</a>
			</p>
		</Card>
	</div>
</div>
