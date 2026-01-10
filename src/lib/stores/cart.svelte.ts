import type { Cart, CartItem, Transaction } from '$types';
import { api } from '$services';

class CartStore {
	cart = $state<Cart | null>(null);
	isLoading = $state(false);
	error = $state<string | null>(null);

	// Derived state
	get items(): CartItem[] {
		return this.cart?.items ?? [];
	}

	get totalAmount(): number {
		return this.cart?.totalAmount ?? 0;
	}

	get itemCount(): number {
		return this.items.reduce((sum, item) => sum + item.quantity, 0);
	}

	get isEmpty(): boolean {
		return this.items.length === 0;
	}

	async load() {
		this.isLoading = true;
		this.error = null;
		try {
			const response = await api.getCart();
			this.cart = response.data;
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to load cart';
		} finally {
			this.isLoading = false;
		}
	}

	async addItem(productId: string, quantity: number = 1) {
		this.isLoading = true;
		this.error = null;
		try {
			const response = await api.addToCart(productId, quantity);
			this.cart = response.data;
			return { success: true };
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to add item';
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	async updateQuantity(itemId: string, quantity: number) {
		this.isLoading = true;
		this.error = null;
		try {
			const response = await api.updateCartItem(itemId, quantity);
			this.cart = response.data;
			return { success: true };
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to update quantity';
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	async removeItem(itemId: string) {
		this.isLoading = true;
		this.error = null;
		try {
			const response = await api.removeFromCart(itemId);
			this.cart = response.data;
			return { success: true };
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to remove item';
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	async clear() {
		this.isLoading = true;
		this.error = null;
		try {
			await api.clearCart();
			if (this.cart) {
				this.cart.items = [];
				this.cart.totalAmount = 0;
			}
			return { success: true };
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Failed to clear cart';
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	async checkout(): Promise<{ success: boolean; transaction: Transaction }> {
		this.isLoading = true;
		this.error = null;
		try {
			const response = await api.checkout();
			if (this.cart) {
				this.cart.items = [];
				this.cart.totalAmount = 0;
			}
			return { success: true, transaction: response.data };
		} catch (error) {
			this.error = error instanceof Error ? error.message : 'Checkout failed';
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	reset() {
		this.cart = null;
		this.isLoading = false;
		this.error = null;
	}
}

export const cart = new CartStore();
