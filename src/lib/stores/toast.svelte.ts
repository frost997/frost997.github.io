import type { Toast } from '$types';

class ToastStore {
	toasts = $state<Toast[]>([]);

	private generateId(): string {
		return Math.random().toString(36).substring(2, 9);
	}

	private addToast(type: Toast['type'], message: string, duration: number = 4000) {
		const id = this.generateId();
		const toast: Toast = { id, type, message, duration };

		this.toasts = [...this.toasts, toast];

		if (duration > 0) {
			setTimeout(() => {
				this.dismiss(id);
			}, duration);
		}

		return id;
	}

	success(message: string, duration?: number) {
		return this.addToast('success', message, duration);
	}

	error(message: string, duration?: number) {
		return this.addToast('error', message, duration ?? 6000);
	}

	warning(message: string, duration?: number) {
		return this.addToast('warning', message, duration);
	}

	info(message: string, duration?: number) {
		return this.addToast('info', message, duration);
	}

	dismiss(id: string) {
		this.toasts = this.toasts.filter((t) => t.id !== id);
	}

	clear() {
		this.toasts = [];
	}
}

export const toast = new ToastStore();
