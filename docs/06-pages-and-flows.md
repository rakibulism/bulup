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

**Purpose:** A 3-stage intelligent workflow to build, audit, and export unified design systems, solving the disconnect between design and code.
**Layout:** AppShell + 2-zone interactive workflow layout.

### Stage 1 — Brand Intelligence Input

Structured intake that builds the system live as the user types.

**Left panel — inputs:**
- **Section A: Identity**
  - Product Name [input]
  - Product Type [dropdown]: SaaS / Mobile App / Marketing Site / E-commerce / Dashboard / Developer Tool
- **Section B: Brand Personality**
  - Tone chips (multi-select, max 4): Professional / Technical / Trustworthy / Minimal / Warm / Fast / Bold / Sharp / Clean / Playful / Luxurious / Innovative
- **Section C: Audience**
  - Who uses this? [input]
  - What do they value? [input]
- **Section D: Visual Direction**
  - Closest reference [dropdown]: Linear / Vercel / Stripe / Notion / Raycast / Figma / Arc / GitHub / Other
  - Color preference [preset palettes]: Neutral / Cool / Warm / High contrast / Brand blue / Custom
  - Mode toggle: Light only / Dark only / Both (recommended)
- **[Generate Design System] CTA** (No emojis, professional styling)

**Right panel — LIVE PREVIEW** (Updates instantly during input)
- Typography scale with actual sample text.
- Primary color swatch + 5 tints.
- Micro component preview (one button, one input, one badge).
- Contrast ratio badge: **AA ✓** or **Fail ✗** in real-time.

### Stage 2 — Generate + Review

Opens a tabbed review workspace containing the generated design logic.

**Tabs (5 total):**
- **Colors**: Primitive palette (9 swatches with hex + token name), Semantic tokens mapped with purpose labels, and Dark mode tokens (side-by-side with light). Features built-in accessibility audit showing contrast ratios per color pair. Failures have a 1-click auto-fix ("Forge suggests: darken by 15%").
- **Typography**: Full scale rendered with real sample text. Values are editable inline.
- **Spacing**: Visual spacing ruler. Every token shown as a colored bar to visualize the rhythm. Editable inline.
- **Components**: Live preview of every component in all 8 states (Default, Hover, Focus, Active, Loading, Error, Empty, Disabled). Toggles between Light and Dark mode.
- **Export**: Transition to Stage 3.

### Stage 3 — Export Panel

Actionable and specific exports tailored to developers and designers.

**For Designers:**
- Figma variable structure guide (.md)
- Component spec sheet (.md)
- Design tokens visual map (.pdf)

**For Developers:**
- CSS custom properties (.css)
- Tailwind config (.js)
- Design tokens JSON (.json)
- TypeScript token constants (.ts)

**Accessibility Report:**
- Contrast audit + fixes (.md)

**Quick Actions:**
- [Copy CSS variables]
- [Copy Tailwind config]
- [Export selected] / [Export all]

### States
- Default (Stage 1 - form + live preview)
- Generating (animated transition)
- Review workspace (Stage 2 - tabs populated)
- Export modal/panel open (Stage 3)

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
