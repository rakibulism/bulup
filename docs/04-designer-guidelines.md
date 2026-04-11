# Bulup — Designer Guidelines
**Version:** 1.0
**For:** Design Team
**Last Updated:** April 2026

---

## Your Job as a Designer on Bulup

Bulup is a professional product intelligence tool used by founders and designers who value precision over decoration. The design must earn trust. Every screen should feel like it was built by someone who has shipped a lot of products and made every mistake already.

The core design principle:

> **Good design is what you remove, not what you add.**

If you can remove an element without losing meaning — remove it.
If you can shorten a label — shorten it.
If you can eliminate a step — eliminate it.

---

## Aesthetic Direction

**Reference products (study these):**
- Linear — information density done right
- Raycast — minimal chrome, maximum function
- Vercel Dashboard — dark, precise, confident
- Notion — whitespace as structure

**Not these:**
- Gradient-heavy dashboards
- Colorful SaaS tools that try to feel "friendly"
- Complex sidebar navigation with 20 items
- Anything with a hero gradient blob

**The Bulup aesthetic:**
- Near-black background (`#0C0C0C`)
- Crisp text hierarchy (Inter)
- One accent color (indigo-violet `#6E63F5`) — used sparingly
- Borders over shadows
- Generous whitespace
- No illustrations (unless functional)
- No gradient backgrounds, ever

---

## Layout Principles

### 1. One Primary Action Per Screen
Every screen has one thing the user should do. Design for that thing. Everything else is secondary. If a screen has two primary CTAs, that's an architecture problem — raise it before designing around it.

### 2. Sidebar + Content Structure
All app screens use the standard sidebar + content layout:
- Sidebar: 240px (expanded), 64px (collapsed icon-only)
- Content area: fluid, padded `32–64px` from edges
- No nested sidebars. No drawer-inside-drawer.

### 3. Content Max Width
Reading-heavy content (PRD, decision logs, docs) max-widths at **720px** centered.
Dashboard, workspace, and data-heavy content uses **full fluid width** up to **1280px**.

### 4. Visual Hierarchy Order
On any screen, establish hierarchy in this order:
1. **Position** — most important thing is top-left or top-center
2. **Size** — larger = more important
3. **Weight** — heavier font weight = higher priority
4. **Color** — brand accent only on the single most important action

Never use color as the primary hierarchy signal.

---

## Component Usage Rules

### Buttons
- **Primary button:** one per page section maximum. If two primary buttons exist, there's a hierarchy problem.
- **Secondary button:** for non-destructive alternatives (Cancel, Skip, View)
- **Ghost button:** for low-importance actions in dense areas
- **Destructive:** red border variant, always with a confirmation step
- Button height: `36px` default / `40px` comfortable / `44px` touch-friendly

### Forms + Inputs
- Always use a visible label above the field — never rely on placeholder as a label
- Placeholder text = hint only (e.g., "Enter your product idea...")
- Error state: red border + specific error message below — never just "Invalid"
- Input height: `40px` standard

### Cards
- Clickable cards: must have hover state (border change + subtle shadow)
- Non-clickable cards: no hover effect — don't create false affordance
- Card padding: `24px` default
- Never put too much in a single card — if it scrolls inside the card, it needs its own page

### Navigation (Sidebar)
- Active state: brand-subtle background + brand-colored text + icon
- Hover state: neutral surface background
- Item height: `36–40px`
- Icon size: `18–20px`
- Label: `14px / 500 weight`
- Group headers (if needed): `11px / 500 / UPPERCASE / muted color` — use sparingly

### Modals
- Use modals for: confirmations, quick-entry forms, previews
- Do NOT use modals for: long forms (use a page), multi-step flows (use a wizard), information that needs to be scanned
- Modal max-width: `480px` (small) / `640px` (standard) / `800px` (large)
- Always include: title, clear close action, primary CTA
- Overlay: `rgba(0,0,0,0.7)`

### Empty States
Every empty state requires:
1. A contextual icon (not generic)
2. A short headline (what's missing)
3. A one-sentence explanation (why it's empty / what to do)
4. A primary CTA if an action is possible

Never show a blank screen or a generic "No data found."

### Loading States
- Skeleton screens preferred over spinners for content-heavy areas
- Spinner allowed for button-triggered actions (replace button label with spinner)
- Never show a loading spinner for more than 5 seconds without feedback

---

## Typography Usage

| Token | Use case |
|---|---|
| `text-display-2xl` | Landing page hero only |
| `text-display-xl` | Major page titles (modal header never uses this) |
| `text-heading-lg` | Section headings inside pages |
| `text-heading-md` | Card titles, panel headers |
| `text-heading-sm` | Sub-section titles, list group headers |
| `text-body-md` | Primary content, explanations |
| `text-body-sm` | Secondary content, descriptions |
| `text-label-md` | Navigation, button text, form labels |
| `text-label-sm` | Badges, table headers, meta tags |
| `text-caption` | Timestamps, footnotes, helper text |
| `text-code-md` | Token values, export previews, code blocks |

**Rule: Maximum 3 font sizes on any single screen.** More than that = hierarchy problem.

---

## Color Usage Rules

1. **`--color-bg-base`** — page background only. Nothing else.
2. **`--color-bg-surface-1`** — sidebar, persistent panels
3. **`--color-bg-surface-2`** — cards, modals, floating elements
4. **`--color-bg-surface-3`** — inputs, nested items, table row hover
5. **`--color-brand-default`** — primary button BG, active nav item. Nothing else.
6. **`--color-brand-text`** — brand-colored text on dark surface (links, status labels)
7. **`--color-text-primary`** — all primary content text
8. **`--color-text-secondary`** — supporting text, icons, metadata
9. **`--color-text-tertiary`** — disabled labels, placeholder text
10. Feedback colors (success, warning, error) — for status indicators only, never decorative

**The one-accent rule:** Brand color appears in one place per screen. If it appears in 3 places, it stops being an accent and becomes noise.

---

## States — Design All of Them

For every interactive component, design these states:

| State | Required |
|---|---|
| Default | ✅ Always |
| Hover | ✅ Always |
| Focus (keyboard) | ✅ Always |
| Active / Pressed | ✅ Always |
| Disabled | ✅ If applicable |
| Loading | ✅ If async action |
| Error | ✅ If validation |
| Success | ✅ If confirmation |
| Empty | ✅ For all lists/content areas |

**If you ship a screen without all applicable states, it's not finished.**

---

## Figma File Structure

```
Bulup Design File
│
├── 🔵 [Cover] — project cover frame
├── 📐 [Design System]
│   ├── Colors
│   ├── Typography
│   ├── Spacing + Radius + Shadow
│   └── Motion
│
├── 🧩 [Components]
│   ├── Atoms (Button, Input, Badge, Avatar, Icon)
│   ├── Molecules (InputField, Dropdown, SearchBar, Tag)
│   ├── Organisms (Sidebar, Header, Modal, Table, Card)
│   └── Templates (AppShell, AuthLayout, LandingLayout)
│
├── 📄 [Pages — App]
│   ├── Landing
│   ├── Auth (Sign In / Sign Up)
│   ├── Onboarding
│   ├── Dashboard
│   ├── Idea Workshop
│   ├── UX Flow Builder
│   ├── Design System Studio
│   ├── Product Brain
│   ├── Handoff Center
│   └── Settings
│
├── 🔄 [Flows]
│   ├── Onboarding Flow
│   ├── Idea → Product Flow
│   ├── Design System Generation Flow
│   └── Handoff Export Flow
│
└── 🗃️ [Archive]
    └── Deprecated / Old Versions
```

**Naming convention:** `[PageName] / [ScreenState] / [Variant]`
Example: `Dashboard / Default / Expanded Sidebar`

---

## Accessibility Rules

- All text on dark backgrounds must meet **WCAG AA** contrast (4.5:1 for body, 3:1 for large text)
- All interactive elements must have a visible **focus ring** — use `--color-brand-default` at 2px
- No action should rely on color alone — always pair with text or icon
- All icon-only buttons must have a `title` attribute and tooltip
- Form errors must be visible and associated with the field (ARIA)

**Contrast checks required for:**
- `--color-text-secondary` on `--color-bg-surface-2` (check before shipping)
- `--color-text-tertiary` used for anything interactive (usually fails — avoid)
- Any text on `--color-brand-default` background

---

## Anti-Patterns — What Not to Build

| Anti-pattern | Why it's wrong |
|---|---|
| Gradient backgrounds | Creates contrast issues and visual fatigue in professional tools |
| Colorful section dividers | Whitespace + type hierarchy does this better |
| Animated decorations | Animation exists for feedback, not aesthetics |
| Tooltip-explained buttons | The button label should explain itself |
| Modals explaining modals | Restructure the information architecture |
| 4+ sidebar sections | Flatten the navigation |
| "Are you sure?" for reversible actions | Remove the friction — just do it with undo |
| Generic empty states ("No items found") | Every empty state is an opportunity for a CTA |
| Placeholder as label | The label disappears when user types — always use a real label |

---

## Reduction Checklist (Run Before Every Design Review)

- [ ] Can any label be shortened?
- [ ] Is there a visual element that carries no meaning?
- [ ] Are there two actions that could be one?
- [ ] Is the primary action immediately obvious without scanning?
- [ ] Does whitespace feel generous or cramped?
- [ ] Are there more than 3 font sizes on this screen?
- [ ] Are there more than 1 use of brand color on this screen?
- [ ] Does every icon have a visible label (or tooltip minimum)?
- [ ] Is there an empty state designed?
- [ ] Is there a loading state designed?
- [ ] Is there an error state designed?
- [ ] Are all error messages specific and helpful?

---

*Designer Guidelines v1.0 — Bulup. Keep it clean. Keep it real. Ship it.*
