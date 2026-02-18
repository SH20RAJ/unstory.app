# 1) Frontend Architecture (Next.js App Router Structure)

Recommended routing structure:

```
/(app)
   /onboarding
   /home
   /activity
   /events
   /connect
   /chat
   /profile
   /search
   /notifications
   /settings
   /admin (optional)
```

Use:

* Server Components for feed and profile data
* Client Components only for interactive UI (chat, reactions)

---

# 2) Core Pages (V1 Scope)

## 1. Onboarding Flow

Purpose: build trust graph early.

Pages:

* College email verification
* Profile setup (branch, year, interests)
* Club selection
* First activity prompt

UI principles:

* stepper progress bar
* minimal fields per screen
* large touch targets

---

## 2. Home Feed (Primary Screen)

This is not a generic social feed.

Sections:

* Active Now (presence indicators)
* Activity Cards
* Suggested Connections

Card Layout:

```
Avatar
Name + Branch
Activity title
Time + Location
Join button
```

Design:

* rounded 2xl cards
* subtle elevation
* action-first layout

---

## 3. Activity Creation Page

Modal or full page.

Fields:

* Activity type
* Title
* Time
* Location
* Visibility

Design system rule:
Primary CTA fixed at bottom.

---

## 4. Events Page

Structured browsing.

Tabs:

* Today
* This Week
* Clubs
* Popular

Include:

* grid/list toggle
* filters

---

## 5. Connect (Soft Matching Page)

Not swipe UI.

Sections:

* “You may know”
* “Same class”
* “Attending same events”

Interaction:

* Connect button
* Quick intro prompt

---

## 6. Chat Page

Split layout:

* left sidebar conversations
* right active chat

Key UX:

* show shared activity at top
* reply suggestions (AI later)

---

## 7. Profile Page

Sections:

* Header (avatar, college, badges)
* Activities attended
* Clubs
* Mutual connections

Avoid:
Follower counts initially.

---

## 8. Search Page

Universal search:

* people
* activities
* clubs
* events

Include:

* live filtering
* tag chips

---

## 9. Notifications Page

Grouped notifications:

* Activity updates
* Connections
* Messages

Design:
Timeline layout.

---

## 10. Settings

* privacy controls
* college visibility
* notification preferences

---

# 3) Layout System (Global Structure)

## Navigation

Recommended mobile layout:

Bottom Nav (5 items):

* Home
* Events
* Create (+)
* Connect
* Profile

Desktop:

* left sidebar navigation
* content center
* optional right rail

---

## Spacing System

Use 8px scale:

```
4 / 8 / 12 / 16 / 24 / 32 / 48
```

Consistency improves perceived quality.

---

# 4) Design System (Core Tokens)

## Typography

Hierarchy:

* Display: 28–32px (hero headings)
* H1: 22px
* H2: 18px
* Body: 14–16px
* Caption: 12px

Font style:

* Clean sans-serif
* Slightly rounded feel for youth identity

---

## Color Strategy

Avoid “dating app pink” or “social media neon.”

Suggested palette logic:

* Neutral base (dark grey / white)
* One primary accent
* One success color
* One warning color

Example structure:

```
Primary: Indigo/Blue
Surface: Soft Grey
Background: White
Accent: Purple or Teal
```

---

## Component Library (Must Create First)

### Buttons

Variants:

* primary
* secondary
* ghost
* danger

Sizes:

* sm
* md
* lg

---

### Cards

Reusable for:

* activities
* people
* events

Structure:

```
CardContainer
CardHeader
CardBody
CardActions
```

---

### Avatars

States:

* online
* busy
* attending event

---

### Tags/Chips

Use for:

* branch
* interests
* clubs

---

### Input Fields

Consistent styling:

* rounded
* soft focus ring
* inline validation

---

# 5) Interaction Patterns (Important for Retention)

## Microinteractions

* subtle scale on tap
* join animation
* connection confirmation

Avoid heavy motion.

---

## Loading States

Use:

* skeleton cards
* shimmer loaders

Never blank screens.

---

## Empty States

Critical for early growth:

* illustration
* suggestion CTA

Example:
“No activities yet — start one.”

---

# 6) Visual Identity Direction (Strategic)

Unistory should feel:

* calm
* trustworthy
* campus-focused
* slightly premium

Avoid:

* loud gradients
* swipe-based visuals
* influencer-style UI

Think:
“Not Instagram. Not Tinder. A campus tool.”

---

# 7) File Structure (Recommended)

```
/components
   /ui
   /cards
   /navigation
   /forms
   /chat
   /profile

/lib
/styles
/hooks
/types
```

Create a central design tokens file:

```
tokens.ts
```

---

# 8) High-Level UI Principles (Critical)

1. Action-first screens (join, connect, attend).
2. Context always visible (shared class/event).
3. Minimal text input; structured interactions.
4. Trust indicators everywhere (verified badge, mutuals).

---

If required, the next step can be a **senior-level UI blueprint**:

* exact component hierarchy for each page
* Tailwind class structure
* layout grids for mobile + desktop
* dark mode strategy
* animation system for Gen-Z retention
