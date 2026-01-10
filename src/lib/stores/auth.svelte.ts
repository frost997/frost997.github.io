import type { User } from '$types';
import { api } from '$services';

// Auth state using Svelte 5 runes - this creates a reactive class
class AuthStore {
	user = $state<User | null>(null);
	isAuthenticated = $state(false);
	isLoading = $state(true);

	// Derived state
	get isAdmin() {
		return this.user?.roles.includes('ADMIN');
	}

	async initialize() {
		this.isLoading = true;
		try {
			const response = await api.getCurrentUser();
			this.user = response.data;
			this.isAuthenticated = true;
		} catch {
			this.user = null;
			this.isAuthenticated = false;
		} finally {
			this.isLoading = false;
		}
	}

	async login(email: string, password: string) {
		this.isLoading = true;
		try {
			const response = await api.login(email, password);
			this.user = response.data.user;
			this.isAuthenticated = true;
			return { success: true };
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	async register(name: string, email: string, password: string) {
		this.isLoading = true;
		try {
			const response = await api.register(name, email, password);
			this.user = response.data.user;
			this.isAuthenticated = true;
			return { success: true };
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	async logout() {
		try {
			await api.logout();
		} catch {
			// Ignore logout errors
		}
		this.user = null;
		this.isAuthenticated = false;
	}

	reset() {
		this.user = null;
		this.isAuthenticated = false;
		this.isLoading = false;
	}
}

export const auth = new AuthStore();
