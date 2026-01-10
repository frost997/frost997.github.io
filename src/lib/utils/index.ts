import type { ProductCategory, TransactionStatus } from '$types';

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency
	}).format(amount);
}

// Format date
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		...options
	}).format(d);
}

// Format datetime
export function formatDateTime(date: string | Date): string {
	return formatDate(date, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffSec = Math.floor(diffMs / 1000);
	const diffMin = Math.floor(diffSec / 60);
	const diffHour = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHour / 24);

	if (diffSec < 60) return 'Just now';
	if (diffMin < 60) return `${diffMin}m ago`;
	if (diffHour < 24) return `${diffHour}h ago`;
	if (diffDay < 7) return `${diffDay}d ago`;

	return formatDate(d);
}

// Category display names
export const categoryLabels: Record<ProductCategory, string> = {
	beverages: 'Beverages',
	daily_necessities: 'Daily Necessities',
	snacks: 'Snacks'
};

// Category icons
export const categoryIcons: Record<ProductCategory, string> = {
	beverages: '🥤',
	daily_necessities: '🧴',
	snacks: '🍿'
};

// Transaction status display
export const statusLabels: Record<TransactionStatus, string> = {
	pending: 'Pending',
	completed: 'Completed',
	cancelled: 'Cancelled',
	refunded: 'Refunded'
};

export const statusColors: Record<TransactionStatus, string> = {
	pending: 'bg-yellow-100 text-yellow-800',
	completed: 'bg-green-100 text-green-800',
	cancelled: 'bg-red-100 text-red-800',
	refunded: 'bg-gray-100 text-gray-800'
};

// Generate initials from name
export function getInitials(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}

// Class names utility
export function cn(...classes: (string | boolean | undefined | null)[]): string {
	return classes.filter(Boolean).join(' ');
}

// Pluralize
export function pluralize(count: number, singular: string, plural?: string): string {
	return count === 1 ? singular : (plural ?? `${singular}s`);
}

// Generate a unique ID
export function generateId(): string {
	return Math.random().toString(36).substring(2, 9);
}

// Validate email
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
