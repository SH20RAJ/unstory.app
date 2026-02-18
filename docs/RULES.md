# Unistory — Next.js Codebase Rules & Best Practices

---

# 1) Core Architecture Rules

## App Router Only

* Use `app/` directory.
* Avoid Pages Router.
* Prefer Server Components by default.
* Use Client Components only when interaction is required.

```
Rule:
All new pages MUST be Server Components unless UI state requires "use client".
```

---

## Folder Structure Standard

```
/app
/components
/components/ui
/components/features
/lib
/hooks
/types
/styles
/config
```

Rules:

* `ui/` → reusable primitives (Button, Card, Input).
* `features/` → domain logic (activity, chat, profile).
* `lib/` → helpers, API clients, DB logic.
* Never mix business logic inside UI components.

---

## Route Grouping

Use route groups to organize layouts:

```
(app)/(auth)/
(app)/(main)/
(app)/(dashboard)/
```

Reason:
Keeps layouts isolated and scalable.

---

# 2) SEO Rules (Non-Negotiable)

## Metadata API Only

Never manually add `<head>` tags.

```
export const metadata = {
  title: "Unistory",
  description: "Campus activity network"
}
```

Rules:

* Each page MUST define metadata.
* Use dynamic metadata for profiles and activities.

---

## Semantic HTML

* Use `<main>`, `<section>`, `<article>`.
* Avoid excessive div nesting.
* Add alt text for images.

---

## Server Rendering Priority

SEO pages must:

* fetch data on server
* avoid client-side loading for core content

Bad:

```
useEffect(fetchData)
```

Good:

```
await fetch() inside Server Component
```

---

## Structured URLs

```
/u/[username]
/activity/[id]
/event/[slug]
```

Rules:

* Use slugs not query params for indexable pages.
* Avoid deep nested routes.

---

# 3) Performance Rules (Speed First)

## Data Fetching

Always use:

```
fetch(url, { next: { revalidate: 60 } })
```

Rules:

* Static where possible.
* ISR for feeds/events.
* Dynamic only for chat/personalized content.

---

## Image Optimization

Use `next/image` only.

```
<Image
  src=""
  width={400}
  height={400}
  priority={false}
/>
```

Rules:

* Never use `<img>` unless external constraints exist.

---

## Avoid Overusing Client State

If logic does not require browser interaction:
→ keep it server-side.

Bad pattern:

```
"use client"
fetch + render
```

---

## Bundle Size Rules

* Do not import heavy libraries globally.
* Use dynamic imports:

```
const Chat = dynamic(() => import("./Chat"))
```

---

# 4) Component Design Rules

## Atomic Design Philosophy

Structure components like:

```
Button → ActivityCard → ActivityFeed
```

Rules:

* UI primitives must be reusable.
* Feature components must not import pages.

---

## Styling Rules

* Tailwind only.
* No inline styles.
* No hardcoded colors.

Use tokens:

```
bg-primary
text-muted
rounded-2xl
```

---

## State Management

Preferred order:

1. Server state
2. URL state
3. React state
4. Global store (last option)

Avoid Redux unless scale demands.

---

# 5) Scalability Rules (Future-Proofing)

## Domain-Based Components

```
/features/activity/
/features/chat/
/features/profile/
```

Each feature contains:

```
components
hooks
types
actions
```

---

## API Layer Separation

Never call external APIs directly from components.

Use:

```
/lib/api/
```

Example:

```
lib/api/activity.ts
```

---

## Database Access

Server Actions or Route Handlers only.

Rule:

```
Components MUST NOT access DB directly.
```

---

# 6) Code Quality Rules

## Naming Conventions

* PascalCase → Components
* camelCase → functions
* kebab-case → routes

Examples:

```
ActivityCard.tsx
useActivity.ts
activity-feed/
```

---

## File Size Limits

* Components < 200 lines.
* Hooks < 120 lines.

If larger:
→ split logic.

---

## Type Safety

* Strict TypeScript required.
* Avoid `any`.

Use:

```
type Activity = { ... }
```

---

## Error Boundaries

Every major route needs:

```
error.tsx
loading.tsx
```

---

# 7) Security Rules

* Never expose API keys in client components.
* Use environment variables server-side only.
* Validate inputs in server actions.

---

# 8) AI IDE Instructions (Copy-Paste Section)

Add this block inside your project docs so AI follows rules:

```
PROJECT RULES:

1. Default to Server Components.
2. Never fetch data inside useEffect unless real-time.
3. All pages must export metadata.
4. Components must stay under 200 lines.
5. UI primitives go inside /components/ui.
6. Business logic goes inside /features.
7. API calls live inside /lib/api.
8. Use Tailwind tokens, never raw hex colors.
9. Use next/image for all images.
10. Prefer static or ISR over dynamic rendering.
11. Do not introduce global state without justification.
12. Avoid anonymous feeds — always include identity context.
```

---

# 9) Performance Checklist (Pre-Deployment)

Before shipping any feature:

* No unnecessary `"use client"`
* No blocking large imports
* Metadata added
* Images optimized
* Skeleton loaders present
* Server fetch used where possible

---

# 10) Advanced (Senior-Level Structure — Recommended for Scale)

## Layout Strategy

```
app/layout.tsx → global providers
(app)/(main)/layout.tsx → navbar
(app)/(auth)/layout.tsx → minimal shell
```

---

## Theme Tokens File

Create:

```
/config/theme.ts
```

Example:

```
export const radius = "rounded-2xl"
export const spacing = "p-4"
```

This keeps UI consistent.

---

If required, the next step is a **senior-architect level structure** specifically optimized for a large social app like Unistory:

* folder layout that scales to 1M+ users
* server action patterns for feeds & chat
* caching layers for activity graph
* real-time architecture decisions
