<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, toast } from '$stores';
	import { isValidEmail } from '$utils';
	import Card from '$components/shared/Card.svelte';
	import Button from '$components/shared/Button.svelte';
	import Input from '$components/shared/Input.svelte';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let isLoading = $state(false);
	let errors = $state<Record<string, string>>({});

	function validate(): boolean {
		errors = {};
		if (!name.trim()) errors.name = 'Name is required';
		if (!email) errors.email = 'Email is required';
		else if (!isValidEmail(email)) errors.email = 'Please enter a valid email';
		if (!password) errors.password = 'Password is required';
		else if (password.length < 8) errors.password = 'Password must be at least 8 characters';
		if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!validate()) return;

		isLoading = true;
		try {
			await auth.register(name, email, password);
			toast.success('Account created successfully!');
			goto('/');
		} catch (error) {
			toast.error('Failed to create account. Please try again.');
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Create Account - Campus Store</title>
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
			<h1 class="text-xl font-display font-semibold text-surface-900 text-center mb-2">Create your account</h1>
			<p class="text-sm text-surface-500 text-center mb-6">Join the campus community store</p>

			<form onsubmit={handleSubmit} class="space-y-4">
				<Input label="Full Name" placeholder="John Doe" bind:value={name} error={errors.name} autocomplete="name" />
				<Input type="email" label="Email" placeholder="you@college.edu" bind:value={email} error={errors.email} autocomplete="email" />
				<Input type="password" label="Password" placeholder="At least 8 characters" bind:value={password} error={errors.password} autocomplete="new-password" />
				<Input type="password" label="Confirm Password" placeholder="Repeat your password" bind:value={confirmPassword} error={errors.confirmPassword} autocomplete="new-password" />
				<Button type="submit" fullWidth size="lg" loading={isLoading}>Create Account</Button>
			</form>

			<p class="text-center text-sm text-surface-500 mt-6">
				Already have an account?
				<a href="/login" class="text-primary-600 hover:text-primary-700 font-medium">Sign in</a>
			</p>
		</Card>
	</div>
</div>
