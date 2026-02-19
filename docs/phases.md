Below is a **practical execution order** to start Unstory using your stack (Next.js + CF Workers + Supabase + StackAuth).
Follow the sequence exactly — it avoids architecture mistakes and lets you reach a working MVP fast.

---

# 1. Define the V1 Scope (Before Coding)

Do **not** start with full “social + dating + everything”.

Lock V1 to:

- Verified login
- Activity feed
- Create/join activity
- Basic profile
- Messaging after joining activity

Write this inside `/docs/product-scope.md`.

Rule:

```
If a feature does not help students meet or coordinate → not V1.
```

---

# 2. Create the Base Repositories

## Step 1 — Next.js App

```bash
npx create-next-app@latest Unstory
```

Choose:

- App Router
- TypeScript
- Tailwind
- ESLint

Then structure folders:

```
/app
/components
/features
/lib
/config
/types
```

Commit immediately:

```
chore: initial project setup
```

---

# 3. Set Up Authentication (First Real Feature)

Why first:
Everything depends on identity.

## Install Stack Auth SDK

Create:

```
/lib/auth/
```

Add:

```
session.ts
middleware.ts
```

Goal:

- college email login
- session stored server-side

Test:

```
/login
/profile
```

Do NOT build UI polish yet.

---

# 4. Setup Supabase (Database Layer)

Create tables first — NOT UI.

Core tables:

```
users
activities
activity_participants
connections
messages
```

Rules:

- Enable RLS.
- Use UUID primary keys.
- Add created_at timestamps.

Then create:

```
/lib/db/supabase-server.ts
/lib/db/supabase-client.ts
```

Test with a simple server action.

---

# 5. Build the Activity System (Your Real Core)

Start here instead of feed UI.

Create:

```
/features/activity/actions/createActivity.ts
/features/activity/actions/joinActivity.ts
```

Then make a simple page:

```
/app/(main)/activity/page.tsx
```

Minimal UI:

- title
- time
- location
- join button

Goal:
Functional, not pretty.

---

# 6. Add Home Feed (Server Component)

Only after activity creation works.

Build:

```
/app/(main)/home/page.tsx
```

Fetch server-side:

```
fetch activities ordered by time
```

Add skeleton loader.

Important:
No client fetching.

---

# 7. Messaging (After Activity Join Only)

Create:

```
/features/chat/
```

Rules:

- user cannot message without shared activity
- store activity_id in messages table

Use Supabase realtime later — first make static messaging work.

---

# 8. Introduce Cloudflare Workers (After MVP Works)

Do NOT start with Workers.

Add Workers when:

- feed grows heavy
- need edge caching

First worker ideas:

```
/workers/feed-cache.ts
/workers/auth-verify.ts
```

Use Workers for:

- caching
- rate limiting
- webhook processing

Not business logic.

---

# 9. Build Design System (Parallel, Not First)

Create primitives:

```
/components/ui/Button.tsx
/components/ui/Card.tsx
/components/ui/Input.tsx
```

Then wrap activity UI.

Avoid redesigning early.

---

# 10. Add SEO + Metadata

Every page exports:

```
export const metadata = {}
```

Add slug routes:

```
/u/[username]
/activity/[id]
```

---

# 11. Deployment Order

Start simple:

1. Supabase project
2. Next.js deploy (Cloudflare Pages or Vercel)
3. Stack Auth production keys
4. Add Workers after stability

---

# 12. First 14-Day Execution Plan

## Day 1–2

- Repo setup
- Auth working

## Day 3–5

- Supabase schema
- Create activity

## Day 6–8

- Home feed
- Join flow

## Day 9–10

- Profile page

## Day 11–12

- Messaging

## Day 13–14

- Polish + deploy MVP

Goal:
One campus usable version — not perfection.

---

# 13. Golden Rules While Starting

1. Server Components first.
2. Do not overbuild UI.
3. Avoid global state.
4. Build data model before visuals.
5. Ship ugly but working.

---

If you want, next I can give you a **founder-level starting roadmap specifically optimized for you** (since you use Next.js App Router heavily):

- exact repo structure for Unstory scale
- what files to create on Day 1
- commands and folder tree you should literally paste

Say:

**“Give me the Day-1 starter blueprint.”**
