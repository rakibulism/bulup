# Bulup — Pages & Interactive Flows
**Version:** 1.0
**For:** Design Team
**Last Updated:** April 2026

---

## Page Index

| # | Page | Type | Auth Required |
|---|---|---|---|
| 01 | Landing | Marketing | No |
| 02 | Sign In | Auth | No |
| 03 | Sign Up | Auth | No |
| 04 | Onboarding | Wizard | Yes |
| 05 | Dashboard | App | Yes |
| 06 | Idea Workshop | App | Yes |
| 07 | UX Flow Builder | App | Yes |
| 08 | Design System Studio | App | Yes |
| 09 | Product Brain | App | Yes |
| 10 | Handoff Center | App | Yes |
| 11 | Settings | App | Yes |

---

## Layout System

All authenticated app pages use the AppShell layout:

```
┌─────────────────────────────────────────────────────────┐
│  Sidebar (240px)    │   Content Area (fluid)             │
│  ─────────────────  │   ─────────────────────────────    │
│  [Logo]             │   [Page Header]                    │
│                     │                                    │
│  > Dashboard        │   [Page Content]                   │
│  > Idea Workshop    │                                    │
│  > UX Flows         │                                    │
│  > Design System    │                                    │
│  > Product Brain    │                                    │
│  > Handoff          │                                    │
│  ─────────────────  │                                    │
│  [Settings]         │                                    │
│  [Account]          │                                    │
└─────────────────────────────────────────────────────────┘
```

Sidebar collapses to 64px icon-only mode. Preference saved per user.

---

## 01 — Landing Page

**Purpose:** Communicate Bulup's value proposition and convert visitors to sign-ups.
**Layout:** Full-width, single-column, scroll narrative.

### Sections

**A. Header / Nav**
- Logo (left)
- Navigation: Features / Pricing / Blog (center)
- Sign In / Start free (right)
- Sticky on scroll

**B. Hero**
- Eyebrow label: "Product Intelligence Platform"
- Headline: "Think before you build."
- Sub: Bulup turns raw ideas into structured product systems. Architecture, UX flows, design systems, and dev docs — ready before your team opens a single tool.
- CTAs: [Start for free] [See how it works →]
- Visual: UI screenshot or abstract diagram of Bulup output (not a person, not a stock photo)

**C. Feature Sections (4 blocks)**
Each block alternates: text left / visual right, then text right / visual left.
1. Idea Workshop
2. Design System Studio
3. Product Brain
4. Handoff Center

**D. Positioning Statement**
Simple 2-column layout: "What Bulup is not" vs "What Bulup is"

**E. Pricing**
3-column card layout: Free / Pro / Team

**F. Footer**
- Product links
- Company links
- Social links
- Copyright

### States
- Default (desktop)
- Mobile (stacked, collapsed nav → hamburger)
- Nav scroll state (shadow on nav bar after 100px scroll)

---

## 02 — Sign In

**Purpose:** Authenticate existing users.
**Layout:** Centered card on near-black background.

### Components
- Bulup logo (top center)
- Page title: "Welcome back"
- Email input
- Password input
- "Forgot password?" link (right-aligned under password)
- [Sign in] primary button
- Divider: "or"
- [Continue with Google] secondary button
- Footer: "Don't have an account? [Start free →]"

### States
- Default
- Email filled
- Password filled
- Loading (button shows spinner)
- Error: "Email or password is incorrect. Try again."
- Success: redirect to Dashboard

---

## 03 — Sign Up

**Purpose:** Create a new Bulup account.
**Layout:** Centered card on near-black background.

### Components
- Bulup logo
- Page title: "Create your account"
- Email input
- Password input (with strength indicator — minimal, just a 4-bar indicator)
- [Create account] primary button
- Divider: "or"
- [Continue with Google]
- Footer: "Already have an account? [Sign in →]"
- Terms: "By continuing, you agree to our [Terms] and [Privacy Policy]"

### States
- Default
- Email validation (check for @ format on blur)
- Password strength (4 levels: very weak / weak / good / strong)
- Loading
- Error: "An account with this email already exists. [Sign in →]"
- Success: redirect to Onboarding

---

## 04 — Onboarding

**Purpose:** Guide new users from sign-up to their first saved product.
**Layout:** Full-screen wizard (no app sidebar). Progress indicator at top.
**Steps:** 3 steps + completion screen.

### Step 1 — Welcome
- Progress: Step 1 of 3
- Headline: "Your workspace is ready."
- Body: "Let's set up your first product. It takes about 3 minutes."
- [Set up my first product]
- [Skip → take me to the dashboard] (ghost link, smaller)

### Step 2 — Product Brief
- Progress: Step 2 of 3
- Label: "What are you building?"
- Textarea input (min 1 row, max expands to 8 rows)
- Character count: [n] / 2000
- Helper text: "Plain English is fine. Include what it does, who it's for, and what problem it solves."
- [Continue →]
- [← Back]

### Step 3 — Generating
- Progress: Step 3 of 3
- Animated progress list (each step completes before next begins):
  - Understanding your idea ✓
  - Defining user roles ✓
  - Mapping core features ✓
  - Scoping your MVP ✓
  - Building your architecture...
- No user action — auto-advances when complete

### Completion
- Headline: "Here's your product."
- Renders the architecture output (same as Idea Workshop output view)
- [Save this product] primary
- Product name input (pre-filled from Bulup's interpretation, editable)
- [Edit with AI →] secondary

---

## 05 — Dashboard

**Purpose:** Overview of all products. Entry point to any module.
**Layout:** AppShell. Content area has two zones: header and product grid.

### Components
- Page header: "Dashboard" + [New product] button (right)
- Stats row: Products / Flows generated / Design systems / Exports (7 days)
- Product grid: card grid (3 columns desktop, 2 tablet, 1 mobile)
- Recent activity sidebar (right, optional — can be collapsed)

### Product Card
- Product name (heading)
- Last modified date (caption)
- Status chips: Architecture ✓ / Flows / Design System / Handoff
- [Open →] button (ghost, appears on hover)

### States
- Default (products exist)
- Empty (no products) — centered empty state + CTA
- Loading (skeleton cards)

---

## 06 — Idea Workshop

**Purpose:** Generate and refine a product architecture from a plain-English brief.
**Layout:** AppShell + 2-column split (input left, output right) on desktop. Stacked on mobile.

### Left Panel — Input
- Textarea: "Product brief"
- Character count
- [Generate architecture] primary button
- After generation: "Refine with AI" follow-up input
  - Placeholder: "Add a team feature" / "Remove the admin role"
  - [Update] button

### Right Panel — Output
Structured output rendered as readable, editable sections:
- Product positioning
- User roles (collapsible cards)
- Core features
  - Core (must-have) — list with checkboxes (visual only, not interactive in v1)
  - Nice-to-have — list
  - Future — list
- Primary user flows — numbered list of flows with brief descriptions
- Data model overview — entity cards
- MVP recommendation — highlighted block

Each section has an [Edit] icon on hover → opens inline edit with AI follow-up.

### Actions (top right)
- [Save as product]
- [Export PRD]

### States
- Default (empty input, empty output)
- Brief entered (ready to generate)
- Generating (animated loading in right panel)
- Output ready
- Editing section (inline AI input active)
- Saved confirmation

---

## 07 — UX Flow Builder

**Purpose:** Generate and view complete UX flows for a product.
**Layout:** AppShell + Flows list (left, 280px) + Flow detail (right, fluid).

### Left Panel — Flows List
- "Generate flows" button (top)
- Flow list items:
  - Flow name
  - Flow type chip (Onboarding / Core Action / etc.)
  - Screen count
- Active flow highlighted
- "Add custom flow" at bottom (+ icon + label)

### Right Panel — Flow Detail
- Flow name + type chip (header)
- Node diagram (read-only flowchart of screens connected by arrows)
- Screen list below diagram:
  - Each screen item (expandable):
    - Screen name
    - Purpose
    - Primary action
    - Components
    - States tabs: Default / Loading / Empty / Error / Success

### Generate Modal
- Triggered by "Generate flows" button
- Headline: "Generate UX flows"
- Body: Generates flows based on your saved product architecture.
- [Generate] / [Cancel]

### Add Custom Flow
- Inline form below flow list
- Input: flow description
- [Generate] / [Cancel]

### States
- Empty (no flows)
- Loading (generating)
- Flow list populated
- Screen detail expanded
- Export panel open

---

## 08 — Design System Studio

**Purpose:** Generate and manage a complete design system.
**Layout:** AppShell + 3-zone layout: Brand input (left panel) / Token viewer (center) / Export panel (right panel, collapsible).

### Left Panel — Brand Input
- Brand name input
- Personality selector (multi-chip, max 5)
- Audience input
- Visual reference dropdown
- [Generate design system] CTA
- After generation: [Regenerate] + [Refine with AI] input

### Center — Token Viewer
Tabs: Colors / Typography / Spacing / Components

**Colors tab:**
- Primitive grid: color swatches with token names + hex values
- Semantic list: semantic token name → maps to primitive → hex value
- Component tokens: scoped tokens per component type

**Typography tab:**
- Type scale preview: each level rendered with sample text
- Token name + values for each level

**Spacing tab:**
- Visual spacing scale
- Token name + value for each step

**Components tab:**
- Component list (atoms → molecules → organisms)
- Each component card:
  - Component name
  - All states shown (default, hover, focus, disabled, etc.)
  - Specs: height, padding, radius, typography, color tokens used

### Right Panel — Export
- Format checkboxes: CSS / Tailwind / JSON / Figma guide
- [Export selected] / [Export all]
- Download history (last 5 exports)

### States
- Default (no design system generated)
- Brand form filled (ready to generate)
- Generating (animated progress)
- Output ready (all panels populated)
- Export downloading

---

## 09 — Product Brain

**Purpose:** View and search the full history of product decisions.
**Layout:** AppShell + Timeline (main) + Search + Filter (top) + Add Decision (floating action).

### Header
- Page title: "Product Brain"
- Search input: "Ask your product or search decisions..."
- Filter chips: All / Architecture / Design / Feature / Strategy / Research

### Timeline
- Chronological list of decision cards
- Newest at top
- Date grouping (Today / This week / This month / Older)

### Decision Card
- Decision type chip
- Decision statement (main text)
- Rationale (collapsible)
- Date + time
- Auto-logged OR Manual tag
- [Edit] on hover

### Ask Your Product
- When search input is used as a question (contains "?"):
  - Bulup shifts to AI answer mode
  - Answer card appears above results: "Based on your product decisions, here's what Bulup found:"
  - Source cards linked below the answer

### Add Decision
- Floating button [+] bottom right (or persistent "Add decision" in header)
- Slide-over panel:
  - Type selector
  - Decision input
  - Rationale input
  - [Save decision] / [Cancel]

### States
- Empty (no decisions)
- Default (decisions list)
- Search active
- AI answer mode
- Add decision panel open
- Decision detail expanded

---

## 10 — Handoff Center

**Purpose:** Export all Bulup outputs for team consumption.
**Layout:** AppShell + Clean export list (single column, centered, max 720px).

### Components
- Page header: "Handoff Center"
- Sub: "Export everything your team needs to build."
- Export cards (5 cards, one per export type):
  - Label: export name
  - Format badges
  - Description (1 line)
  - [Export] button

### Shareable Link Section
- Headline: "Share with your team"
- Body: one-liner explanation
- [Generate link] button
- Generated link appears in input (copyable)
- Expiry date shown

### Export History
- Collapsible section at bottom
- Table: filename / format / date / user
- [Download again] on each row

### States
- Default (exports ready)
- Generating export (button shows loading)
- Export complete (brief success confirmation inline)
- Link generated (link input appears)
- No products (empty state with link to Idea Workshop)

---

## 11 — Settings

**Purpose:** Account and workspace management.
**Layout:** AppShell + Settings layout (sidebar nav left, content right).

### Settings Nav
- Account
- Plan & Billing
- Export Defaults
- Integrations (v2 — shown as "Coming soon")
- Danger Zone

### Account
- Email address (read-only + change button)
- Name
- Password change
- [Save changes]

### Plan & Billing
- Current plan badge
- Usage summary: products used / exports this month
- Upgrade / Manage billing CTA
- Plan comparison table (inline, minimal)

### Export Defaults
- Default format selector per export type
- Link expiry duration (7 days / 14 days / 30 days)
- Toggle: "Show watermark on shared links" (Free tier locked to On)

### Danger Zone
- "Delete all products" — destructive action
- Confirmation required: type "DELETE"
- "Delete account" — same pattern

---

## User Flows

### Flow A — First-Time User (Full Onboarding)
```
Sign Up → Onboarding Step 1 → Onboarding Step 2 (brief input)
→ Onboarding Step 3 (generating) → Completion → Dashboard
```

### Flow B — Returning User (Core Loop)
```
Sign In → Dashboard → Open Product → Idea Workshop (refine)
→ Generate UX Flows → Generate Design System → Handoff Center → Export
```

### Flow C — New Product Creation
```
Dashboard → [New Product] → Idea Workshop (blank) → Enter brief
→ Generate → Review + Edit → Save → Dashboard (product appears)
```

### Flow D — Design System Generation
```
Open Product → Design System Studio → Fill brand inputs
→ Generate → Review tokens → Review components → Export (CSS/Tailwind/JSON/Figma guide)
```

### Flow E — Team Handoff (No Bulup Account)
```
Bulup user → Handoff Center → [Generate link] → Copy link
→ Share with team → Team opens read-only view (no login required)
```

### Flow F — Product Brain Query
```
Dashboard → Open Product → Product Brain → Search "why did we..."
→ Bulup returns AI answer grounded in stored decisions → View source decisions
```

---

*Pages & Flows v1.0 — Bulup. Every screen has a purpose. Every state is designed.*
