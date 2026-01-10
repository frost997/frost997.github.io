
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(user)" | "/" | "/admin" | "/admin/carts" | "/admin/products" | "/admin/transactions" | "/admin/users" | "/(user)/cart" | "/(user)/checkout" | "/(user)/history" | "/login" | "/logout" | "/register";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(user)": Record<string, never>;
			"/": Record<string, never>;
			"/admin": Record<string, never>;
			"/admin/carts": Record<string, never>;
			"/admin/products": Record<string, never>;
			"/admin/transactions": Record<string, never>;
			"/admin/users": Record<string, never>;
			"/(user)/cart": Record<string, never>;
			"/(user)/checkout": Record<string, never>;
			"/(user)/history": Record<string, never>;
			"/login": Record<string, never>;
			"/logout": Record<string, never>;
			"/register": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/" | "/admin/carts" | "/admin/carts/" | "/admin/products" | "/admin/products/" | "/admin/transactions" | "/admin/transactions/" | "/admin/users" | "/admin/users/" | "/cart" | "/cart/" | "/checkout" | "/checkout/" | "/history" | "/history/" | "/login" | "/login/" | "/logout" | "/logout/" | "/register" | "/register/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}