# Forge — UX Microcopy
**Version:** 1.0
**For:** Design + Content Team
**Last Updated:** April 2026

---

## Voice & Tone

**Forge speaks like:** a senior product advisor who has shipped many products. Clear. Direct. Minimal. Confident without arrogance. No filler phrases. No hype.

**Forge never says:**
- "Unlock the power of..."
- "Supercharge your workflow"
- "Seamlessly integrate..."
- "We're thrilled to announce..."
- "Oops! Something went wrong" (vague error language)
- "Are you sure?" (for reversible actions)

**Forge always says:**
- What the action does, not how exciting it is
- Specific error context, not generic failure messages
- One clear instruction, not a paragraph of explanation
- The user's goal, not the system's behavior

---

## Landing Page

### Hero
```
Headline:       Think before you build.
Sub-headline:   Forge turns raw ideas into structured product systems.
                Architecture, UX flows, design systems, and dev docs —
                ready before your team opens a single tool.
CTA primary:    Start for free
CTA secondary:  See how it works
```

### Feature Sections

**Section 1 — Idea Workshop**
```
Label:          Idea Workshop
Headline:       From idea to product architecture in minutes.
Body:           Describe your product in plain English. Forge returns a
                structured architecture — features, user roles, flows, and a
                scoped MVP — ready to hand to your team.
CTA:            Try the Workshop
```

**Section 2 — Design System Studio**
```
Label:          Design System Studio
Headline:       A real design system. Not a color palette.
Body:           Forge generates complete token architecture, typography
                scale, component specs, and export-ready CSS, Tailwind, and
                Figma variables. In one generation.
CTA:            See a sample output
```

**Section 3 — Product Brain**
```
Label:          Product Brain
Headline:       Your product has a memory now.
Body:           Every decision, every revision, every "why we chose this"
                — stored, searchable, and available when you need context
                six months from now.
CTA:            Learn about memory
```

**Section 4 — Handoff Center**
```
Label:          Handoff Center
Headline:       Everything your team needs. Without the meeting.
Body:           PRDs, UX specs, design tokens, dev docs — exported in
                formats your team can use immediately. No context required.
CTA:            See export formats
```

### Comparison Section
```
Headline:       Not a code tool.
Body:           Lovable, Cursor, Claude Code — they all answer "how do I build it?"
                Forge answers "what should I build, and how should it work?"
                That's a different question.
```

### Pricing Section
```
Free:
  Label:        Free
  Description:  Think and structure your first product.
  CTA:          Get started free

Pro:
  Label:        Pro
  Price:        $29 / month
  Description:  For founders and designers building seriously.
  CTA:          Start Pro

Team:
  Label:        Team
  Price:        $79 / month
  Description:  For small teams who need shared product intelligence.
  CTA:          Start Team trial
```

---

## Onboarding

### Step 1 — Account Created
```
Headline:       Your workspace is ready.
Body:           Let's set up your first product. It takes about 3 minutes.
CTA:            Set up my first product
Secondary CTA:  Skip for now → take me to the dashboard
```

### Step 2 — First Product Setup
```
Label:          What are you building?
Headline:       Describe your product.
Placeholder:    "A SaaS tool that helps freelancers track client projects and
                invoice automatically..."
Helper text:    Plain English is fine. The more specific you are, the better
                Forge understands your product.
CTA:            Continue
Character count: [n] / 2000
```

### Step 3 — Generating Architecture
```
Status:         Thinking about your product...
Progress steps:
  - Understanding your idea
  - Defining user roles
  - Mapping core features
  - Scoping your MVP
  - Building your architecture
```

### Step 4 — Architecture Ready
```
Headline:       Here's your product.
Body:           Forge has structured your idea into a product architecture.
                Review it, edit anything that's off, and save it when ready.
CTA primary:    Save this product
CTA secondary:  Edit with AI
```

### Onboarding Complete
```
Headline:       [Product name] is live in Forge.
Body:           Now let's go deeper. Generate UX flows, build your design
                system, or start your product memory.
CTA:            Explore your product
```

---

## Dashboard

### Header
```
Greeting:       Good morning. / Good afternoon. / Good evening.
                (time-based, no name needed)
Sub:            You have [n] products. [n] exports last 7 days.
```

### Empty State — No Products
```
Icon:           Package (or similar)
Headline:       No products yet.
Body:           Create your first product to get started.
CTA:            Create product
```

### Product Card
```
Label:          Last updated [date]
Status chips:   Architecture ✓  /  Flows ✓  /  Design System ✓
Action:         Open
```

---

## Idea Workshop

### Input State
```
Label:          Product brief
Placeholder:    Describe your product idea in plain English. What does it
                do, who is it for, and what problem does it solve?
Helper:         Try to include: what it does, who uses it, and the main problem it solves.
CTA:            Generate architecture
```

### Generating State
```
Progress:       Reading your brief...
                Identifying user roles...
                Mapping features...
                Scoping MVP...
                Finalizing architecture...
```

### Output State — Section Labels
```
Product positioning
User roles
Core features
  > Core (must-have)
  > Nice-to-have
  > Future
Primary user flows
Data model overview
MVP recommendation
```

### Edit Prompt
```
Label:          Refine with AI
Placeholder:    "Add a team collaboration feature" / "Remove the admin role" / "Make the MVP smaller"
CTA:            Update
```

### Save
```
CTA:            Save as product
Input label:    Product name
Placeholder:    My SaaS App
Success:        [Product name] saved. →
```

---

## UX Flow Builder

### Empty State
```
Headline:       No flows generated yet.
Body:           Generate UX flows based on your product architecture.
CTA:            Generate flows
```

### Generation State
```
Progress:       Mapping onboarding flow...
                Mapping core action flow...
                Mapping error states...
                Finalizing screens...
```

### Flow Card Labels
```
Flow type chips:  Onboarding  /  Core Action  /  Settings  /  Error  /  Edge Case
Screen count:     [n] screens
CTA:              View flow
```

### Screen Detail
```
Labels:
  Screen name
  Purpose
  Primary action
  Components
  States available: Default  Loading  Empty  Error  Success
  Next screen →
```

### Add Custom Flow
```
Label:          Add a flow
Placeholder:    "Password reset flow" / "Team invite flow" / "Billing upgrade flow"
CTA:            Generate
```

---

## Design System Studio

### Brand Input Form
```
Field: Brand name
  Label:       Brand name
  Placeholder: Forge

Field: Personality (multi-select, max 5)
  Options: Professional, Minimal, Bold, Playful, Technical, Warm, Luxurious, Sharp, Clean, Innovative

Field: Primary audience
  Label:       Who is this for?
  Placeholder: Startup founders and product designers

Field: Visual references
  Label:       Closest visual reference
  Options:     Linear, Notion, Vercel, Stripe, Figma, Raycast, Arc, GitHub, Other

CTA:           Generate design system
```

### Generation State
```
Progress:       Defining your color palette...
                Building typography scale...
                Setting spacing and radius...
                Specifying components...
                Preparing export files...
```

### Output Sections
```
Color system
Typography scale
Spacing system
Border radius
Shadow scale
Motion tokens
Component library
  > Atoms
  > Molecules
  > Organisms
```

### Export Panel
```
Headline:       Export your design system
Options:
  [ ] CSS variables (variables.css)
  [ ] Tailwind config (tailwind.config.js)
  [ ] Design tokens JSON (tokens.json)
  [ ] Figma variable guide (figma-guide.md)
CTA:            Export selected
Secondary:      Export all
```

---

## Product Brain

### Empty State
```
Headline:       No decisions logged yet.
Body:           Every product you build in Forge will be automatically
                logged here. You can also add decisions manually.
CTA:            Add a decision
```

### Add Decision (Manual)
```
Type selector:  Architecture  /  Design  /  Feature  /  Strategy  /  Research
Field: Decision
  Label:        What was decided?
  Placeholder:  "We chose Supabase over PlanetScale for the database."
Field: Rationale
  Label:        Why?
  Placeholder:  "Supabase has a more generous free tier and built-in auth."
CTA:            Save decision
```

### Ask Your Product
```
Label:          Ask your product
Placeholder:    "Why did we choose this color?" / "What's the MVP scope?" / "When did we remove the admin role?"
CTA:            Ask
Empty answer:   No decisions about this have been logged yet.
                [Add a decision]
```

### Timeline Labels
```
Decision types: Architecture  /  Design  /  Feature  /  Strategy  /  Research
Timestamp:      [Day, Date] at [Time]
Auto-log tag:   Auto-logged by Forge
Manual tag:     Added manually
```

---

## Handoff Center

### Page Header
```
Headline:       Handoff Center
Body:           Export everything your team needs to build.
                No context required.
```

### Export Categories
```
PRD Document
  Format: Markdown (.md)
  Description: Full product requirements document with all features and user stories.
  CTA: Export PRD

UX Flow Specs
  Format: Markdown (.md) or PDF
  Description: Screen-by-screen flow documentation with all states.
  CTA: Export flows

Design System
  Formats: CSS / Tailwind / JSON / Figma guide
  Description: Complete token architecture and component specs.
  CTA: Export design system

Developer Documentation
  Format: Markdown (.md)
  Description: Tech stack, API structure, data models, and component inventory.
  CTA: Export dev docs

Decision Log
  Format: Markdown (.md)
  Description: Full product brain export with timeline and rationale.
  CTA: Export decisions
```

### Shareable Link
```
Label:          Share with your team
Body:           Generate a read-only link. No Forge account needed to view.
CTA:            Generate link
Link expiry:    Expires in 30 days
Copy success:   Link copied →
```

---

## Error Messages

### Generic (fallback only)
```
❌ Don't: "Something went wrong."
✅ Do:    "Forge couldn't generate your architecture. Please try again."
          [Retry]
```

### Network / API
```
"Forge couldn't reach the server. Check your connection and try again."
[Try again]
```

### Generation Failed
```
"Generation timed out. This sometimes happens with complex products.
 Try breaking your brief into smaller sections."
[Retry]  [Simplify brief]
```

### Empty Brief
```
"Your product brief needs more detail.
 Try including what the product does, who it's for, and the main problem it solves."
```

### Name Too Short
```
"Product names must be at least 2 characters."
```

### Export Failed
```
"Export failed. Try again or use a different format."
[Retry export]  [Choose format]
```

---

## Success States

```
Product saved →           [Product name] is ready. Open it to explore.
Design system generated → Your design system is ready. Review and export.
Flow generated →          [n] flows generated. Review them now.
Export complete →         [FileName] downloaded.
Decision saved →          Decision logged to Product Brain.
Link copied →             Link copied. Valid for 30 days.
```

---

## Tooltips

```
Product Brain:    "A living log of every decision made about this product."
Design tokens:    "Semantic tokens reference primitive values. Use semantic tokens in components."
MVP scope:        "Forge's recommendation for what to build first."
Shareable link:   "Anyone with this link can view your exports. No Forge account required."
Auto-logged:      "This was automatically captured when Forge generated this content."
```

---

## Navigation Labels

```
Dashboard
Idea Workshop
UX Flows
Design System
Product Brain
Handoff
Settings
```

---

## Settings Page

```
Account
  Email address
  Change password
  Delete account

Plan
  Current plan: Free / Pro / Team
  Upgrade to Pro →
  Manage billing →

Exports
  Export format defaults
  Link expiry duration
  Watermark on shared links (Free tier only)

Integrations (v2)
  Coming soon: Figma, Linear, Notion

Danger Zone
  Delete all products
  Confirmation: "Type DELETE to confirm"
```

---

*Microcopy v1.0 — Forge. Every word earns its place.*
