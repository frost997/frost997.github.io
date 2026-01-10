# Campus Store - Svelte 5 Edition

A modern, mobile-first web application using **SvelteKit 2** with **Svelte 5** runes.

## 🚀 Svelte 5 Features Used

### Runes

| Rune | Purpose | Example |
|------|---------|---------|
| `$state` | Reactive state | `let count = $state(0)` |
| `$derived` | Computed values | `let double = $derived(count * 2)` |
| `$effect` | Side effects | `$effect(() => console.log(count))` |
| `$props` | Component props | `let { name } = $props()` |
| `$bindable` | Two-way binding | `let value = $bindable('')` |
| `$inspect` | Debug logging | `$inspect(myState)` |

### Snippets (replaces slots)

```svelte
<!-- Parent component -->
<Button>
  {#snippet prefix()}
    <Icon />
  {/snippet}
  Click me
</Button>

<!-- Button.svelte -->
<script>
  let { children, prefix } = $props();
</script>

<button>
  {#if prefix}{@render prefix()}{/if}
  {@render children()}
</button>
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── shared/     # Button, Input, Card, Modal, etc.
│   │   ├── layout/     # Header, Footer, AdminSidebar
│   │   └── user/       # ProductCard, CategoryFilter
│   ├── stores/         # Svelte 5 class-based stores
│   │   ├── auth.svelte.ts
│   │   ├── cart.svelte.ts
│   │   ├── toast.svelte.ts
│   │   └── ui.svelte.ts
│   ├── services/       # API service layer
│   ├── types/          # TypeScript definitions
│   └── utils/          # Helper functions
└── routes/
    ├── (user)/         # User pages (shop, cart, history)
    ├── admin/          # Admin dashboard
    ├── login/
    ├── register/
    └── logout/
```

## 🔧 Stores with Svelte 5

Stores are now class-based with `$state`:

```typescript
// src/lib/stores/auth.svelte.ts
class AuthStore {
  user = $state<User | null>(null);
  isAuthenticated = $state(false);
  isLoading = $state(true);

  get isAdmin() {
    return this.user?.role === 'admin';
  }

  async login(email: string, password: string) {
    // ...
  }
}

export const auth = new AuthStore();
```

Usage in components:
```svelte
<script>
  import { auth } from '$stores';
</script>

{#if auth.isAuthenticated}
  Welcome, {auth.user.name}!
{/if}
```

## 🐛 Debugging with $inspect

```svelte
<script>
  let products = $state([]);
  let filters = $state({ category: null, search: '' });

  // Logs to console whenever these values change
  $inspect(products);
  $inspect(filters);
</script>
```

## 🍪 Cookie-Based Authentication

The API service uses `credentials: 'include'` for automatic cookie handling:

```typescript
const response = await fetch(url, {
  credentials: 'include', // Sends cookies automatically
  headers: { 'Content-Type': 'application/json' }
});
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📝 Key Differences from Svelte 4

| Svelte 4 | Svelte 5 |
|----------|----------|
| `let count = 0` | `let count = $state(0)` |
| `$: double = count * 2` | `let double = $derived(count * 2)` |
| `$: console.log(x)` | `$effect(() => console.log(x))` |
| `export let name` | `let { name } = $props()` |
| `<slot />` | `{@render children()}` |
| `<slot name="x" />` | `{@render x?.()}` |
| Svelte stores | Class with `$state` |

## 📄 License

MIT - Built for college communities with ❤️
