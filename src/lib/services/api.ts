import type {
	User,
	Product,
	ProductFormData,
	Cart,
	Transaction,
	ApiResponse,
	PaginatedResponse
} from '$types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class ApiService {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<ApiResponse<T>> {
		const url = `${this.baseUrl}${endpoint}`;

		try {
			const response = await fetch(url, {
				...options,
				credentials: 'include', // Send cookies automatically
				headers: {
					'Content-Type': 'application/json',
					...options.headers
				}
			});

			const data = await response.json();

			if (!response.ok) {
				throw {
					message: data.message || 'An error occurred',
					status: response.status,
					code: data.code
				};
			}

			return {
				data,
				success: true,
				message: data.message
			};
		} catch (error) {
			if (error && typeof error === 'object' && 'status' in error) {
				throw error;
			}
			throw {
				message: 'Network error. Please check your connection.',
				status: 0,
				code: 'NETWORK_ERROR'
			};
		}
	}

	// Authentication endpoints
	async login(email: string, password: string): Promise<ApiResponse<{ user: User }>> {
		return this.request('/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});
	}

	async register(name: string, email: string, password: string): Promise<ApiResponse<{ user: User }>> {
		return this.request('/auth/register', {
			method: 'POST',
			body: JSON.stringify({ name, email, password })
		});
	}

	async logout(): Promise<ApiResponse<void>> {
		return this.request('/auth/logout', { method: 'POST' });
	}

	async getCurrentUser(): Promise<ApiResponse<User>> {
		return this.request('/auth/profile');
	}

	// Product endpoints
	async getProducts(params?: {
		category?: string;
		search?: string;
		page?: number;
		pageSize?: number;
	}): Promise<ApiResponse<PaginatedResponse<Product>>> {
		const searchParams = new URLSearchParams();
		if (params?.category) searchParams.set('category', params.category);
		if (params?.search) searchParams.set('search', params.search);
		if (params?.page) searchParams.set('page', params.page.toString());
		if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());

		const query = searchParams.toString();
		return this.request(`/products${query ? `?${query}` : ''}`);
	}

	async getProduct(id: string): Promise<ApiResponse<Product>> {
		return this.request(`/products/${id}`);
	}

	async createProduct(product: ProductFormData): Promise<ApiResponse<Product>> {
		return this.request('/products', {
			method: 'POST',
			body: JSON.stringify(product)
		});
	}

	async updateProduct(id: string, product: Partial<ProductFormData>): Promise<ApiResponse<Product>> {
		return this.request(`/products/${id}`, {
			method: 'PUT',
			body: JSON.stringify(product)
		});
	}

	async deleteProduct(id: string): Promise<ApiResponse<void>> {
		return this.request(`/products/${id}`, { method: 'DELETE' });
	}

	// Cart endpoints
	async getCart(): Promise<ApiResponse<Cart>> {
		return this.request('/cart');
	}

	async addToCart(productId: string, quantity: number): Promise<ApiResponse<Cart>> {
		return this.request('/cart/items', {
			method: 'POST',
			body: JSON.stringify({ productId, quantity })
		});
	}

	async updateCartItem(itemId: string, quantity: number): Promise<ApiResponse<Cart>> {
		return this.request(`/cart/items/${itemId}`, {
			method: 'PUT',
			body: JSON.stringify({ quantity })
		});
	}

	async removeFromCart(itemId: string): Promise<ApiResponse<Cart>> {
		return this.request(`/cart/items/${itemId}`, { method: 'DELETE' });
	}

	async clearCart(): Promise<ApiResponse<void>> {
		return this.request('/cart', { method: 'DELETE' });
	}

	async checkout(): Promise<ApiResponse<Transaction>> {
		return this.request('/cart/checkout', { method: 'POST' });
	}

	// Transaction endpoints
	async getTransactions(params?: {
		page?: number;
		pageSize?: number;
		status?: string;
	}): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
		const searchParams = new URLSearchParams();
		if (params?.page) searchParams.set('page', params.page.toString());
		if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
		if (params?.status) searchParams.set('status', params.status);

		const query = searchParams.toString();
		return this.request(`/transactions${query ? `?${query}` : ''}`);
	}

	async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
		return this.request(`/transactions/${id}`);
	}

	// Admin endpoints
	async getAllUsers(params?: {
		page?: number;
		pageSize?: number;
		role?: string;
	}): Promise<ApiResponse<PaginatedResponse<User>>> {
		const searchParams = new URLSearchParams();
		if (params?.page) searchParams.set('page', params.page.toString());
		if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
		if (params?.role) searchParams.set('role', params.role);

		const query = searchParams.toString();
		return this.request(`/admin/users${query ? `?${query}` : ''}`);
	}

	async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<ApiResponse<User>> {
		return this.request(`/admin/users/${userId}/role`, {
			method: 'PUT',
			body: JSON.stringify({ role })
		});
	}

	async toggleUserStatus(userId: string, isActive: boolean): Promise<ApiResponse<User>> {
		return this.request(`/admin/users/${userId}/status`, {
			method: 'PUT',
			body: JSON.stringify({ isActive })
		});
	}

	async getAllCarts(params?: {
		page?: number;
		pageSize?: number;
	}): Promise<ApiResponse<PaginatedResponse<Cart>>> {
		const searchParams = new URLSearchParams();
		if (params?.page) searchParams.set('page', params.page.toString());
		if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());

		const query = searchParams.toString();
		return this.request(`/admin/carts${query ? `?${query}` : ''}`);
	}

	async clearUserCart(userId: string): Promise<ApiResponse<void>> {
		return this.request(`/admin/carts/${userId}`, { method: 'DELETE' });
	}

	async getAllTransactions(params?: {
		page?: number;
		pageSize?: number;
		status?: string;
		userId?: string;
		sortBy?: string;
		sortOrder?: 'asc' | 'desc';
	}): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
		const searchParams = new URLSearchParams();
		if (params?.page) searchParams.set('page', params.page.toString());
		if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
		if (params?.status) searchParams.set('status', params.status);
		if (params?.userId) searchParams.set('userId', params.userId);
		if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
		if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

		const query = searchParams.toString();
		return this.request(`/admin/transactions${query ? `?${query}` : ''}`);
	}
}

export const api = new ApiService(API_BASE_URL);
export default api;
