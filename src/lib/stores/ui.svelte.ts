class UIStore {
	sidebarOpen = $state(true);
	mobileMenuOpen = $state(false);

	toggleSidebar() {
		this.sidebarOpen = !this.sidebarOpen;
	}

	setSidebar(open: boolean) {
		this.sidebarOpen = open;
	}

	toggleMobileMenu() {
		this.mobileMenuOpen = !this.mobileMenuOpen;
	}

	closeMobileMenu() {
		this.mobileMenuOpen = false;
	}

	reset() {
		this.sidebarOpen = true;
		this.mobileMenuOpen = false;
	}
}

export const ui = new UIStore();
