# Unistory — Tech Stack Documentation

This document describes the core technology stack used to build and scale **Unistory**.
The architecture focuses on performance, scalability, real-time interactions, and a server-first approach.

---

# Overview

Unistory uses a modern full-stack architecture combining:

* **Next.js** for frontend and server rendering
* **Cloudflare Workers** for edge compute
* **Supabase** for database and storage
* **Stack Auth** for authentication and identity
* **TypeScript** across the entire codebase

The system is designed to be:

* SEO friendly
* Edge-optimized
* Real-time capable
* Scalable to large campus networks

---

# Architecture Summary

```
Client (Next.js App Router)
        ↓
Cloudflare Edge (Workers + Cache)
        ↓
Next.js Server Actions / APIs
        ↓
Supabase (Postgres + Storage + Realtime)
        ↓
Stack Auth (Identity Layer)
```

---

# 1. Next.js

## Role

Primary frontend framework and server layer.

## Key Responsibilities

* Server Components rendering
* SEO optimized routing
* UI layer
* API routes and server actions
* Data fetching and caching

## Why Next.js

* App Router enables server-first architecture
* Built-in metadata API for SEO
* Streaming and ISR improve performance

## Conventions

* Default to Server Components.
* Avoid `"use client"` unless interaction requires it.
* Use route groups:

```
/app/(auth)
/app/(main)
/app/(dashboard)
```

## Performance Practices

* Use `fetch(..., { next: { revalidate } })`
* Prefer ISR over dynamic rendering
* Use `next/image` for assets

---

# 2. Cloudflare Workers

## Role

Edge runtime for fast global responses and API handling.

## Use Cases in Unistory

* Edge caching
* Activity feed pre-processing
* Rate limiting
* Webhook processing
* Lightweight API endpoints

## Why Workers

* Low latency globally
* Runs close to users
* Reduces server load

## Rules

* Workers must remain stateless.
* Avoid heavy business logic inside Workers.
* Use Workers mainly for:

```
Authentication validation
Edge caching
Request filtering
```

## Recommended Structure

```
/workers
   auth-worker.ts
   cache-worker.ts
   api-proxy.ts
```

---

# 3. Supabase

## Role

Backend data platform.

## Services Used

* PostgreSQL database
* Storage (avatars, media)
* Realtime subscriptions
* Row Level Security (RLS)

## Why Supabase

* Strong Postgres foundation
* Built-in realtime
* Scales well with social graphs

## Data Responsibilities

* Users
* Activities
* Events
* Connections
* Messages

## Best Practices

* Enable RLS on all tables.
* Never expose service keys to the client.
* Use server actions for sensitive queries.

Example:

```
/lib/db/supabase-server.ts
/lib/db/supabase-client.ts
```

---

# 4. Stack Auth

## Role

Authentication and identity management.

## Responsibilities

* College email login
* Session handling
* User identity verification
* Token validation

## Why Stack Auth

* Developer-friendly auth flows
* Works well with edge environments
* Scalable identity system

## Rules

* Auth logic must remain server-side.
* Use middleware for session validation.
* Never store sensitive auth logic in client components.

Example integration points:

```
/middleware.ts
/lib/auth/session.ts
```

---

# 5. Frontend Styling & UI

## Styling System

* Tailwind CSS
* Design tokens in `/config/theme.ts`

Rules:

* No inline styles.
* No hardcoded hex colors.
* Use design tokens only.

Example tokens:

```
bg-primary
text-muted
rounded-2xl
```

---

# 6. State Management

Preferred hierarchy:

1. Server state (primary)
2. URL params
3. React local state
4. Global store (only if required)

Avoid large client-side stores early.

---

# 7. Realtime Architecture

Supabase Realtime is used for:

* Chat updates
* Activity joins
* Presence indicators

Cloudflare Workers can assist with:

* throttling events
* edge event validation

---

# 8. SEO Strategy

Handled mainly through Next.js:

* Metadata API per page
* Server-rendered profiles
* Slug-based routing

Example routes:

```
/u/[username]
/activity/[id]
/event/[slug]
```

---

# 9. Environment Variables

```
NEXT_PUBLIC_APP_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
STACK_AUTH_SECRET=
CF_ACCOUNT_ID=
CF_API_TOKEN=
```

Rules:

* Public keys only in client env.
* Secrets must remain server-side.

---

# 10. Deployment Flow

## Frontend

* Deploy via Cloudflare Pages or Vercel.

## Workers

* Deploy using Wrangler.

```
npm run deploy:worker
```

## Database

* Managed via Supabase dashboard.

---

# 11. AI IDE Guidelines (Project Rules)

```
1. Default to Server Components.
2. Never fetch core data in useEffect.
3. Workers must stay stateless.
4. Supabase queries go through server actions.
5. Stack Auth validation runs in middleware.
6. Avoid global client state.
7. Use Tailwind tokens only.
8. All pages must export metadata.
9. Use edge caching where possible.
10. Components must remain modular.
```

---

# 12. Scalability Goals

The stack is designed to support:

* Large campus networks
* Real-time messaging
* Activity graphs
* AI-driven recommendations

Future extensions may include:

* Edge AI inference
* Background queues
* Analytics pipelines

---

# Summary

Unistory’s stack combines:

* **Next.js** for UI and server rendering
* **Cloudflare Workers** for edge compute
* **Supabase** for database and realtime
* **Stack Auth** for identity

This architecture enables a fast, SEO-friendly, and scalable campus platform designed for long-term growth.

---
