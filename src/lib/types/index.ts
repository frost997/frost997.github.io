// User types
export type UserRole = 'USER' | 'ADMIN';

export interface User {
	// id: string;
	email: string;
	userName: string;
	roles: UserRole;
	avatar?: string;
	// isActive: boolean;
	// createdAt: string;
	// updatedAt: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

// Product types
export type ProductCategory = 'beverages' | 'snacks' | 'daily_necessities';

export interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	category: ProductCategory;
	imageURL?: string;
	on_hand: number;
	isAvailable: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ProductFormData {
	name: string;
	description: string;
	price: number;
	category: ProductCategory;
	imageUrl?: string;
	stock: number;
	isAvailable: boolean;
}

// Cart types
export interface CartItem {
	id: string;
	productId: string;
	product: Product;
	quantity: number;
	addedAt: string;
}

export interface Cart {
	id: string;
	userId: string;
	user?: User;
	items: CartItem[];
	totalAmount: number;
	updatedAt: string;
}

// Transaction types
export type TransactionStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

export interface TransactionItem {
	id: string;
	productId: string;
	productName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

export interface Transaction {
	id: string;
	userId: string;
	user?: User;
	items: TransactionItem[];
	totalAmount: number;
	status: TransactionStatus;
	createdAt: string;
	completedAt?: string;
}

// API types
export interface ApiResponse<T> {
	data: T;
	message?: string;
	success: boolean;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface ApiError {
	message: string;
	code?: string;
	status: number;
}

// UI types
export interface Toast {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	duration?: number;
}
