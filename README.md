# Unistory — Campus Activity & Social Network

Unistory is a verified college activity network designed to help students connect through real-world interactions — events, study sessions, clubs, and shared campus life.
Instead of traditional social media or swipe-based dating, Unistory builds a **trusted campus graph** where relationships emerge naturally from activities.

---

[PITCH.md](PITCH.md)
---

# Overview

Unistory aims to become the **operating layer for college life**, combining:

- Campus activity coordination
- Soft social discovery
- Event participation
- Messaging around real interactions
- Verified student identity

The product focuses on real-world engagement first. Social and dating features emerge from shared context rather than anonymous feeds.

---

# Core Principles

1. Server-first architecture using Next.js App Router.
2. Verified identity over anonymity.
3. Activity-driven interactions.
4. Minimal client-side state.
5. Scalable domain-based structure.
6. Performance and SEO as first-class priorities.

---

# Tech Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Server Components by default

## Backend

- Next.js Route Handlers / Server Actions
- PostgreSQL
- Redis (presence & caching)

## Infrastructure (Planned)

- Edge runtime where possible
- ISR and caching for feeds
- Real-time messaging layer

---

# Project Structure

```
/app
/components
/components/ui
/components/features
/lib
/hooks
/types
/config
/styles
```

### Directory Purpose

- `/app` → routes, layouts, pages
- `/components/ui` → design system primitives
- `/components/features` → domain logic
- `/lib` → API clients, utilities, DB helpers
- `/hooks` → reusable logic
- `/types` → shared TypeScript definitions
- `/config` → theme and constants

---

# Routing Structure

```
(app)/(auth)
/app/(main)/home
/app/(main)/activity
/app/(main)/events
/app/(main)/connect
/app/(main)/chat
/app/(main)/profile
/app/search
/app/settings
```

Route groups keep layouts clean and scalable.

---

# Design System

## Typography

- Display: 32px
- Heading: 22px
- Body: 16px
- Caption: 12px

## Spacing Scale

```
4 / 8 / 12 / 16 / 24 / 32 / 48
```

## Component Layers

```
UI Primitives → Feature Components → Page Layouts
```

---

# Frontend Pages

## Onboarding

- College email verification
- Profile setup
- Interests & clubs
- First activity prompt

## Home Feed

- Active users
- Activity cards
- Suggested connections

## Activity

- Create activity
- Join actions
- Context-driven engagement

## Events

- Today / Week / Clubs / Popular tabs
- Grid or list layout

## Connect

- Suggested people based on shared context
- No swipe-based UI

## Chat

- Conversations unlocked via shared activity
- Context banner at top

## Profile

- Campus identity
- Activities
- Mutual connections
- Secret Crush (Dating)

## Dating (Secret Crush)

- Add up to 5 secret crushes
- Mutual crushes trigger a "It's a Match!" notification
- Context-driven, not swipe-based

## Search

- People
- Activities
- Clubs

## Notifications

- Grouped updates
- Timeline layout

## Settings

- Privacy
- Notifications
- Visibility

---

# Coding Rules (Mandatory)

## Server Components First

All new pages must default to server components.

```
Rule:
Do NOT add "use client" unless interaction requires it.
```

---

## Data Fetching

Always prefer server-side fetch:

```
fetch(url, { next: { revalidate: 60 } })
```

Avoid client-side data fetching for SEO content.

---

## SEO Guidelines

- Every page exports metadata.
- Use semantic HTML.
- Use slugs instead of query params.

Example:

```
/u/[username]
/activity/[id]
```

---

## Styling Rules

- Tailwind only.
- No inline styles.
- No hardcoded colors.
- Use design tokens.

---

## Component Guidelines

- Components < 200 lines.
- Hooks < 120 lines.
- UI primitives inside `/components/ui`.
- Feature logic inside `/components/features`.

---

## Naming Conventions

- PascalCase → Components
- camelCase → functions
- kebab-case → routes

Examples:

```
ActivityCard.tsx
useActivity.ts
activity-feed/
```

---

# Performance Standards

- Use `next/image` for images.
- Use dynamic imports for heavy components.
- Avoid global client state.
- Add skeleton loaders.
- Prevent empty feed states.

---

# Security Rules

- API keys must remain server-side.
- Validate all inputs in server actions.
- No direct DB access from client components.

---

# AI IDE Project Rules

```
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
12. Always include identity context in feeds.
```

---

# Development Workflow

## Install

```
bun install
```

## Run Development

```
bun run dev
```

## Build

```
bun run build
```

---

# Environment Variables

```
DATABASE_URL=
REDIS_URL=
NEXT_PUBLIC_APP_URL=
```

Never expose secrets to client components.

---

# Product Philosophy

Unistory is not a traditional social platform.

It is a **campus interaction layer** where:

- activities drive connections
- identity builds trust
- real-world interaction is prioritized

The design avoids:

- anonymous posting
- swipe addiction
- influencer metrics

---

# Future Roadmap

- AI activity recommendations
- Smart connection graph
- Club management tools
- Inter-college network
- Campus assistant features

---

# Contribution Guidelines

1. Follow project rules strictly.
2. Maintain server-first architecture.
3. Avoid introducing new global dependencies without discussion.
4. Keep UI consistent with design tokens.

---

# License

Proprietary — Unistory Project.
