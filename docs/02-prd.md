# Forge — Product Requirements Document (PRD)
**Version:** 1.0
**Status:** Active — Pre-production
**Last Updated:** April 2026
**Owner:** Product Team

---

## 1. Overview

Forge is an AI-powered product intelligence platform. It helps founders, product designers, and CTOs transform raw ideas into structured, design-ready, dev-ready product systems — with persistent product memory.

This PRD covers the full v1 scope: features, user stories, acceptance criteria, and out-of-scope items.

---

## 2. Goals

### Business Goals
- Establish Forge as the category leader in "product intelligence" tooling
- Achieve 10,000 MAU within 12 months of launch
- 60%+ weekly retention by month 3
- Freemium model driving paid conversion at >8%

### User Goals
- Reduce time from idea to structured product from weeks → hours
- Give non-technical founders a way to think systematically before spending on dev
- Give designers a way to generate complete design systems from a brief
- Give teams a single source of product truth that doesn't rot

### Non-Goals (v1)
- Real-time multiplayer / collaboration
- Direct Figma plugin
- Code generation (intentional — we feed coding tools, not compete with them)
- Native mobile app
- White-label / agency tier

---

## 3. User Personas

### Persona 1 — Alex, The Product-Led Founder
- Age 28–38, non-technical or lightly technical
- Building a SaaS product, 0–2 employees
- Has a great idea, bad at structuring it
- Wastes money on dev hours because the brief was vague
- **Forge solves:** structured product thinking before dev starts

### Persona 2 — Sam, The Product Designer
- Age 24–34, works at a startup or freelances
- Needs to go from brief → UX system fast
- Spends too much time on design system setup
- **Forge solves:** generates UX flows + design system from a brief

### Persona 3 — Jordan, The Technical Co-founder
- Age 28–40, strong technical skills, time-poor
- Wants their dev team to have something real to build from
- Feeds Forge output into Cursor, Claude Code
- **Forge solves:** produces the product system so the team doesn't start from zero

---

## 4. Feature List

### Core Feature Modules (v1)

---

#### 4.1 IDEA WORKSHOP
*Turn a raw idea into a structured product*

**Description:** The entry point. User inputs a plain-English product idea. Forge generates a complete product architecture — features, user roles, key flows, data model overview, and a prioritized feature roadmap.

**Features:**
- Natural language product brief input
- AI-generated product architecture output
  - Product category + positioning
  - User roles (who uses the product and how)
  - Core feature list (categorized as Core / Nice-to-have / Future)
  - Primary user flows (described, not coded)
  - Data model overview (entities and relationships, plain English)
  - MVP scope recommendation
- Edit and refine output with follow-up prompts
- Save as a "Product" in Forge
- Export as PRD markdown

**Acceptance Criteria:**
- [ ] User can input a product idea (min 10 words, max 2000 words)
- [ ] Forge returns a structured product architecture within 30 seconds
- [ ] Output includes: positioning, user roles, features, flows, data model, MVP recommendation
- [ ] User can edit any section via follow-up prompt
- [ ] User can save the result as a named Product
- [ ] User can export as `.md` PRD document

---

#### 4.2 UX FLOW BUILDER
*Generate complete user flows from your product brief*

**Description:** After the product architecture is defined, Forge generates complete user flows — screen by screen — for every primary journey. Each flow includes all states: empty, loading, error, success.

**Features:**
- Auto-generate flows from product architecture
- Flow types: Onboarding, Core Action, Settings, Error Handling, Edge Cases
- Screen-by-screen breakdown for each flow
  - Screen name
  - Purpose (one sentence)
  - Primary action
  - Components present
  - States: default, loading, empty, error, success
  - Transition to next screen
- Visual flow diagram (node-based) — read-only in v1
- Export as Figma-ready spec sheet (markdown)
- Add custom flows via prompt

**Acceptance Criteria:**
- [ ] User can generate flows from an existing product in Forge
- [ ] Each flow has screen-level breakdown with all states
- [ ] User can view a visual node diagram of the flow
- [ ] User can add new flows via prompt
- [ ] User can export flows as a spec sheet markdown document
- [ ] Minimum 5 flows auto-generated for any product

---

#### 4.3 DESIGN SYSTEM STUDIO
*Generate a production-ready design system from your brand inputs*

**Description:** The core design capability of Forge. User provides brand direction (name, personality, target audience, visual references). Forge generates a complete design system — tokens, typography, spacing, components — documented and export-ready.

**Features:**
- Brand input form: name, personality words (max 5), audience, aesthetic reference (dropdown options)
- AI-generated design system output:
  - Color tokens (primitive + semantic + component tiers)
  - Typography scale (display, heading, body, label, caption)
  - Spacing system (4px base grid)
  - Border radius scale
  - Shadow/elevation scale
  - Motion tokens (duration + easing)
  - Iconography direction
- Component list with specs:
  - Buttons (all variants + states)
  - Form inputs
  - Cards
  - Navigation
  - Badges + chips
  - Modals
  - Tables
  - Empty states
  - Loading states
- Export formats:
  - CSS custom properties (variables.css)
  - Tailwind config (tailwind.config.js)
  - Design tokens JSON (tokens.json — Tokens Studio compatible)
  - Figma variable structure guide (markdown)

**Acceptance Criteria:**
- [ ] User can input brand direction and generate a full design system
- [ ] Output includes all token tiers (primitive, semantic, component)
- [ ] Output includes typography, spacing, radius, shadow, motion
- [ ] Component specs cover all listed components with all states
- [ ] Export works for CSS, Tailwind, JSON, and Figma guide
- [ ] User can edit/refine any token via prompt
- [ ] System reflects brand inputs (personality, audience) in aesthetic choices

---

#### 4.4 PRODUCT BRAIN (Memory Layer)
*Persistent product intelligence that remembers everything*

**Description:** The most differentiated feature in Forge. Product Brain is a living, searchable log of every decision made about your product — architectural decisions, design choices, feature changes, "why we didn't build X," version history.

**Features:**
- Auto-logs all Forge-generated outputs as decisions
- Manual entry: user can add decisions, notes, context
- Decision types: Architecture, Design, Feature, Strategy, Research
- Timeline view: chronological history of product evolution
- Search: semantic search across all decisions
- Decision detail: what, why, when, by whom, what changed
- "Ask your product" mode: user can ask "why did we choose X?" and Forge answers from memory
- Export: full decision log as markdown

**Acceptance Criteria:**
- [ ] All Forge outputs are auto-logged in Product Brain
- [ ] User can add manual decisions and notes
- [ ] Timeline view shows all decisions in chronological order
- [ ] Semantic search returns relevant results within 2 seconds
- [ ] "Ask your product" returns accurate answers grounded in stored decisions
- [ ] Export produces a full decision log in markdown

---

#### 4.5 HANDOFF CENTER
*Export everything your team needs to build*

**Description:** A single place to export all Forge outputs in formats that designers and developers can actually use — without needing a Forge account to read them.

**Features:**
- Export PRD (markdown)
- Export UX Flow specs (markdown, PDF)
- Export Design System (CSS, Tailwind, JSON, Figma guide)
- Export Component specs (markdown)
- Export Developer documentation (markdown)
- Export Decision log (markdown)
- Shareable link: generate a read-only public link to any export
- Export history: track what was exported and when

**Acceptance Criteria:**
- [ ] All exports available from a single page
- [ ] Exports are properly formatted and immediately usable
- [ ] Shareable links work without requiring Forge login
- [ ] Export history shows date, format, and user
- [ ] PRD export includes all Forge-generated product content

---

#### 4.6 DASHBOARD / HOME
*Your product workspace at a glance*

**Features:**
- List of all products (with last modified date)
- Quick stats: flows generated, design systems, exports
- Recent activity feed
- Quick-start: "New Product" CTA prominent
- Onboarding progress (first-time users)

---

## 5. User Stories

### Idea Workshop

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-01 | Founder | Input my product idea in plain English | I get a structured product architecture without writing a formal brief |
| US-02 | Designer | See a clear feature list with priorities | I know what to design for MVP vs later |
| US-03 | CTO | Export a PRD from Forge | My dev team has a document to build from |
| US-04 | Founder | Refine the architecture with follow-up prompts | I can iterate until it reflects my actual vision |

### UX Flow Builder

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-05 | Designer | Generate UX flows from my product brief | I don't start from a blank Figma file |
| US-06 | Founder | See all screens for every user journey | I can spot missing flows before dev starts |
| US-07 | Designer | Export flows as spec sheets | My Figma work has a written reference |
| US-08 | Designer | See all states for each screen | I don't miss empty, loading, or error states |

### Design System Studio

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-09 | Designer | Generate a full design system from brand inputs | I have tokens ready before I open Figma |
| US-10 | Developer | Export CSS variables from the design system | I can use the system in code immediately |
| US-11 | Designer | See all component specs with states | I have a clear building list for Figma |
| US-12 | CTO | Export a Tailwind config | My dev team has design tokens in the format they use |

### Product Brain

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-13 | Founder | See a timeline of all product decisions | I can understand how the product evolved |
| US-14 | Team member | Ask "why did we choose X?" | I get context without bothering the founder |
| US-15 | Designer | Add a manual design decision | Product Brain captures decisions made outside Forge |
| US-16 | Founder | Search across all decisions | I find past context instantly |

---

## 6. Technical Requirements

### Performance
- Idea Workshop: product architecture generated in < 30 seconds
- UX Flow Builder: flow set generated in < 45 seconds
- Design System Studio: full system generated in < 60 seconds
- Product Brain search: results returned in < 2 seconds
- Dashboard: initial load < 2 seconds

### Reliability
- 99.5% uptime SLA
- Graceful AI fallback: if generation fails, retry once automatically
- All user data backed up daily

### Security
- All product data encrypted at rest
- Auth via industry-standard OAuth2 / JWT
- Shareable links expire after 30 days by default
- No product data used for model training without explicit consent

### Accessibility
- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader support for all primary flows

---

## 7. Monetization

### Free Tier
- 1 product
- 3 UX flows
- 1 design system
- 50 Product Brain entries
- Exports (markdown only)
- Watermark on shareable links

### Pro — $29/month
- Unlimited products
- Unlimited flows
- Unlimited design systems
- Unlimited Product Brain
- All export formats (CSS, Tailwind, JSON, PDF)
- No watermark on links
- Priority AI generation

### Team — $79/month (up to 5 seats)
- Everything in Pro
- Team workspace (shared products)
- Role-based access
- Export history
- Priority support

---

## 8. Roadmap

### v1 (Launch — 0–3 months)
- Idea Workshop
- UX Flow Builder
- Design System Studio
- Product Brain (basic)
- Handoff Center (export)
- Dashboard

### v2 (Growth — 3–6 months)
- Real-time collaboration
- Figma plugin
- Shareable product workspaces
- Advanced Product Brain (semantic search, "ask your product")
- Mobile app (iOS)

### v3 (Scale — 6–12 months)
- API access
- Agency / white-label tier
- Custom AI fine-tuning per product
- Integration: Jira, Linear, Notion
- Design system versioning (changelog + diffing)

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI generation quality inconsistent | Medium | High | Prompt engineering + output validation layer |
| Users confused about positioning vs code tools | High | Medium | Clear onboarding, strong positioning copy |
| Slow AI response kills UX | Medium | High | Streaming output + skeleton loading states |
| Low retention past first product | Medium | High | Product Brain creates switching costs |
| Competitor copies product memory feature | Low | Medium | Ship fast, build moat through quality |

---

*PRD v1.0 — Forge pre-production. Next review after design prototype is complete.*
