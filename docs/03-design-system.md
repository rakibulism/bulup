# Bulup — Design System
**Version:** 1.0
**Status:** Production
**Last Updated:** April 2026

---

## Design Philosophy

**Good design is what you remove, not what you add.**

Bulup's design system is built on four convictions:

1. **Reduction first** — every token, every component, every pattern exists to serve a function. No decoration. No gradients. No noise.
2. **Dark by default** — Bulup is a professional tool. The dark aesthetic communicates seriousness, focus, and precision.
3. **Type does the work** — hierarchy is built through typography before color. If the layout breaks without color, the type isn't working.
4. **States are not optional** — every component is designed for default, hover, focus, active, loading, error, empty, and disabled.

---

## Color System

### Token Architecture
Three tiers: Primitive → Semantic → Component

Never use primitive tokens directly in components.
Always reference semantic tokens in components.

---

### Primitive Tokens

```
/* Neutrals */
--primitive-neutral-0:    #FFFFFF
--primitive-neutral-50:   #F5F5F5
--primitive-neutral-100:  #E5E5E5
--primitive-neutral-200:  #CCCCCC
--primitive-neutral-300:  #A3A3A3
--primitive-neutral-400:  #737373
--primitive-neutral-500:  #525252
--primitive-neutral-600:  #404040
--primitive-neutral-700:  #2A2A2A
--primitive-neutral-750:  #222222
--primitive-neutral-800:  #1A1A1A
--primitive-neutral-850:  #141414
--primitive-neutral-900:  #111111
--primitive-neutral-950:  #0C0C0C

/* Brand — Indigo Violet */
--primitive-brand-100:    #EEECFF
--primitive-brand-200:    #C9C3FF
--primitive-brand-300:    #A49BFF
--primitive-brand-400:    #8B81FA
--primitive-brand-500:    #6E63F5   ← primary
--primitive-brand-600:    #5A50D4
--primitive-brand-700:    #453EB0
--primitive-brand-800:    #2E2875
--primitive-brand-900:    #1A163F

/* Feedback */
--primitive-success-500:  #22C55E
--primitive-success-900:  #052E16
--primitive-warning-500:  #F59E0B
--primitive-warning-900:  #451A03
--primitive-error-500:    #EF4444
--primitive-error-900:    #450A0A
```

---

### Semantic Tokens (Dark Mode — Primary)

```
/* Backgrounds */
--color-bg-base:          #0C0C0C   /* page background */
--color-bg-surface-1:     #111111   /* sidebar, panels */
--color-bg-surface-2:     #1A1A1A   /* cards, modals */
--color-bg-surface-3:     #222222   /* inputs, nested content */
--color-bg-overlay:       rgba(0,0,0,0.7)

/* Borders */
--color-border-subtle:    #1E1E1E   /* very faint separation */
--color-border-default:   #2A2A2A   /* standard borders */
--color-border-strong:    #383838   /* emphasized borders */

/* Text */
--color-text-primary:     #F0F0F0
--color-text-secondary:   #9A9A9A
--color-text-tertiary:    #555555
--color-text-disabled:    #3A3A3A
--color-text-inverse:     #0C0C0C

/* Brand */
--color-brand-default:    #6E63F5
--color-brand-hover:      #5A50D4
--color-brand-subtle:     #1A163F   /* subtle bg for brand elements */
--color-brand-text:       #A49BFF   /* brand text on dark bg */

/* Feedback */
--color-success:          #22C55E
--color-success-subtle:   #052E16
--color-warning:          #F59E0B
--color-warning-subtle:   #451A03
--color-error:            #EF4444
--color-error-subtle:     #450A0A
```

---

### Light Mode Semantic Tokens (Optional — Handoff Center only)

```
--color-bg-base:          #FAFAFA
--color-bg-surface-1:     #FFFFFF
--color-bg-surface-2:     #F5F5F5
--color-bg-surface-3:     #EFEFEF
--color-border-default:   #E5E5E5
--color-text-primary:     #111111
--color-text-secondary:   #555555
--color-text-tertiary:    #9A9A9A
```

---

## Typography

### Font Families

```
--font-sans:  'Inter', -apple-system, BlinkMacSystemFont, sans-serif
--font-mono:  'JetBrains Mono', 'Fira Code', monospace
```

Inter is the primary font. JetBrains Mono for all code blocks, token values, and export previews.

---

### Type Scale

```
/* Display — page titles, hero moments */
--text-display-2xl:  font-size: 48px / line-height: 1.1 / font-weight: 700 / letter-spacing: -0.03em
--text-display-xl:   font-size: 40px / line-height: 1.1 / font-weight: 700 / letter-spacing: -0.03em
--text-display-lg:   font-size: 32px / line-height: 1.15 / font-weight: 700 / letter-spacing: -0.02em

/* Heading — section titles */
--text-heading-xl:   font-size: 28px / line-height: 1.2 / font-weight: 600 / letter-spacing: -0.02em
--text-heading-lg:   font-size: 24px / line-height: 1.25 / font-weight: 600 / letter-spacing: -0.01em
--text-heading-md:   font-size: 20px / line-height: 1.3 / font-weight: 600 / letter-spacing: -0.01em
--text-heading-sm:   font-size: 16px / line-height: 1.4 / font-weight: 600 / letter-spacing: 0

/* Body — content text */
--text-body-lg:      font-size: 16px / line-height: 1.6 / font-weight: 400
--text-body-md:      font-size: 15px / line-height: 1.6 / font-weight: 400
--text-body-sm:      font-size: 13px / line-height: 1.5 / font-weight: 400

/* Label — UI labels, navigation, buttons */
--text-label-lg:     font-size: 14px / line-height: 1.4 / font-weight: 500
--text-label-md:     font-size: 13px / line-height: 1.4 / font-weight: 500
--text-label-sm:     font-size: 12px / line-height: 1.4 / font-weight: 500 / letter-spacing: 0.01em

/* Caption — metadata, timestamps, helper text */
--text-caption:      font-size: 11px / line-height: 1.4 / font-weight: 400

/* Code */
--text-code-md:      font-size: 13px / line-height: 1.6 / font-weight: 400 / font-family: mono
--text-code-sm:      font-size: 12px / line-height: 1.5 / font-weight: 400 / font-family: mono
```

---

## Spacing

4px base grid. All spacing values are multiples of 4.

```
--space-1:    4px
--space-2:    8px
--space-3:    12px
--space-4:    16px
--space-5:    20px
--space-6:    24px
--space-8:    32px
--space-10:   40px
--space-12:   48px
--space-16:   64px
--space-20:   80px
--space-24:   96px
--space-32:   128px
```

**Usage rules:**
- Inside components: `--space-3` to `--space-4` (12–16px)
- Between components: `--space-6` (24px)
- Between sections: `--space-8` to `--space-12` (32–48px)
- Page-level padding: `--space-8` to `--space-16` (32–64px)

---

## Border Radius

```
--radius-xs:   2px   /* tags, small chips */
--radius-sm:   4px   /* tight UI, table cells */
--radius-md:   6px   /* inputs, small buttons */
--radius-lg:   8px   /* standard buttons, badges */
--radius-xl:   12px  /* cards, panels */
--radius-2xl:  16px  /* modals, large cards */
--radius-full: 9999px /* pills, avatars */
```

---

## Shadow & Elevation

No decorative shadows. Shadows signal elevation only.

```
--shadow-sm:    0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)
--shadow-md:    0 4px 12px rgba(0,0,0,0.4)
--shadow-lg:    0 8px 24px rgba(0,0,0,0.5)
--shadow-xl:    0 16px 48px rgba(0,0,0,0.6)
```

**Usage:**
- `shadow-sm` → hover state on interactive cards
- `shadow-md` → dropdowns, tooltips
- `shadow-lg` → modals, panels that float
- `shadow-xl` → command palette, full overlays

Prefer borders over shadows in flat UI regions. Use shadows only when an element truly floats above the surface.

---

## Motion

**Rule:** Animation exists for feedback and orientation, not decoration. If removing an animation doesn't make the UI harder to use, remove it.

```
/* Duration */
--duration-fast:    100ms   /* hover states, color transitions */
--duration-base:    200ms   /* element transitions, dropdowns */
--duration-slow:    350ms   /* modals, panels sliding in */
--duration-xslow:   500ms   /* page transitions */

/* Easing */
--ease-out:     cubic-bezier(0, 0, 0.2, 1)    /* elements entering */
--ease-in:      cubic-bezier(0.4, 0, 1, 1)    /* elements leaving */
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1)  /* position changes */
```

---

## Iconography

**Library:** Lucide Icons (consistent stroke weight, open source)
**Default size:** 16px (small), 20px (standard), 24px (prominent)
**Stroke weight:** 1.5px (Lucide default)
**Color:** Always use `--color-text-secondary` unless interactive

**Rules:**
- Every icon used in navigation must have a visible label in expanded state
- Icons in buttons must have a text label
- Never use icons as the only affordance for a critical action
- Icon-only buttons allowed only for universally understood actions (close, search, settings) — always include a tooltip

---

## Grid System

**Layout:** 12-column grid
**Sidebar layout:** Fixed sidebar (240px) + fluid content area
**Max content width:** 1280px
**Breakpoints:**
```
sm:   640px
md:   768px
lg:   1024px
xl:   1280px
2xl:  1536px
```

**Content zones:**
- Sidebar: 240px fixed (64px collapsed)
- Content area: fluid, max 960px for reading-heavy pages
- Full-bleed: for canvas/workspace views

---

## Component Tokens

### Button
```
/* Primary */
--btn-primary-bg:        var(--color-brand-default)
--btn-primary-bg-hover:  var(--color-brand-hover)
--btn-primary-text:      #FFFFFF
--btn-primary-radius:    var(--radius-lg)
--btn-primary-h-default: 36px
--btn-primary-h-lg:      40px
--btn-primary-px:        16px

/* Secondary */
--btn-secondary-bg:        transparent
--btn-secondary-border:    var(--color-border-strong)
--btn-secondary-text:      var(--color-text-primary)
--btn-secondary-bg-hover:  var(--color-bg-surface-3)

/* Ghost */
--btn-ghost-bg:        transparent
--btn-ghost-text:      var(--color-text-secondary)
--btn-ghost-bg-hover:  var(--color-bg-surface-2)
```

### Input
```
--input-bg:           var(--color-bg-surface-3)
--input-border:       var(--color-border-default)
--input-border-focus: var(--color-brand-default)
--input-text:         var(--color-text-primary)
--input-placeholder:  var(--color-text-tertiary)
--input-radius:       var(--radius-md)
--input-height:       40px
--input-px:           12px
```

### Card
```
--card-bg:            var(--color-bg-surface-2)
--card-border:        var(--color-border-subtle)
--card-border-hover:  var(--color-border-default)
--card-radius:        var(--radius-xl)
--card-padding:       var(--space-6)
```

---

## Do / Don't

| ❌ Don't | ✅ Do |
|---|---|
| Use gradients on backgrounds | Use flat, token-defined colors |
| Use pure black (#000) as background | Use `#0C0C0C` for depth + layering |
| Use shadows on everything | Use borders + shadow only for floating elements |
| Use more than 2 brand color accents per screen | Reserve brand color for primary action only |
| Use random spacing values | Always use spacing scale tokens |
| Use font sizes not in the type scale | Stick to the defined scale |
| Use 4+ colors decoratively | Color is functional, not decorative |
| Skip designing empty/loading/error states | Design all states for every component |

---

*Design System v1.0 — Bulup. All tokens map directly to Figma variables.*
