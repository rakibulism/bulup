# Bulup — Developer Documentation
**Version:** 1.0
**For:** Development Team
**Last Updated:** April 2026

---

## Overview

This document covers the full technical specification for Bulup v1 — architecture, stack, data models, API structure, authentication, and setup instructions.

Read the Project Brief and PRD before this document. This doc covers the *how to build it* — not the *what and why*.

---

## Tech Stack

### Frontend
| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 14.x (App Router) |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Component Library | Radix UI (headless) + custom components | latest |
| State Management | Zustand | 4.x |
| Data Fetching | TanStack Query (React Query) | 5.x |
| Forms | React Hook Form + Zod | latest |
| Animations | Framer Motion | 11.x (minimal use) |
| Icons | Lucide React | latest |
| Charts | Recharts | 2.x (if needed) |
| Markdown Rendering | React Markdown | latest |

### Backend
| Layer | Technology | Version |
|---|---|---|
| API | Next.js API Routes (App Router) | 14.x |
| Runtime | Node.js | 20.x LTS |
| Validation | Zod | 3.x |
| ORM | Prisma | 5.x |
| Database | PostgreSQL | 15.x |
| Cache | Redis (Upstash) | latest |
| Queue | BullMQ (via Upstash Redis) | latest |
| File Storage | Cloudflare R2 | — |

### AI Layer
| Layer | Technology |
|---|---|
| Primary Model | Anthropic Claude (claude-sonnet-4-6) |
| SDK | Anthropic Node SDK |
| Streaming | Server-Sent Events (SSE) via Next.js streaming |
| Prompt management | Prompt templates in /lib/prompts/ |

### Infrastructure
| Layer | Technology |
|---|---|
| Hosting | Vercel (frontend + API routes) |
| Database host | Neon (serverless PostgreSQL) |
| Cache / Queue | Upstash Redis |
| Storage | Cloudflare R2 |
| Auth | Clerk |
| Email | Resend |
| Monitoring | Sentry (errors) + Vercel Analytics |
| Environment | Vercel env management |

---

## Project Structure

```
bulup/
├── app/                         # Next.js App Router
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (app)/
│   │   ├── layout.tsx            # AppShell layout (sidebar + content)
│   │   ├── dashboard/
│   │   ├── workshop/             # Idea Workshop
│   │   ├── flows/                # UX Flow Builder
│   │   ├── design-system/        # Design System Studio
│   │   ├── brain/                # Product Brain
│   │   ├── handoff/              # Handoff Center
│   │   └── settings/
│   ├── (marketing)/
│   │   ├── page.tsx              # Landing page
│   │   └── pricing/
│   ├── api/
│   │   ├── generate/
│   │   │   ├── architecture/     # POST /api/generate/architecture
│   │   │   ├── flows/            # POST /api/generate/flows
│   │   │   ├── design-system/    # POST /api/generate/design-system
│   │   │   └── ask/              # POST /api/generate/ask (Product Brain AI)
│   │   ├── products/             # CRUD for products
│   │   ├── decisions/            # CRUD for Product Brain decisions
│   │   └── exports/              # Export generation + shareable links
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── ui/                       # Atoms: Button, Input, Badge, etc.
│   ├── composed/                 # Molecules: InputField, Dropdown, etc.
│   ├── layout/                   # Sidebar, Header, AppShell
│   ├── features/
│   │   ├── workshop/
│   │   ├── flows/
│   │   ├── design-system/
│   │   ├── brain/
│   │   └── handoff/
│   └── marketing/
│
├── lib/
│   ├── ai/
│   │   ├── client.ts             # Anthropic client setup
│   │   ├── prompts/
│   │   │   ├── architecture.ts
│   │   │   ├── flows.ts
│   │   │   ├── design-system.ts
│   │   │   └── ask.ts
│   │   └── stream.ts             # Streaming utility
│   ├── db/
│   │   ├── prisma.ts             # Prisma client singleton
│   │   └── queries/              # Named DB query functions
│   ├── auth/
│   │   └── clerk.ts              # Clerk helpers
│   ├── exports/
│   │   ├── prd.ts
│   │   ├── flows.ts
│   │   ├── design-system.ts
│   │   └── decisions.ts
│   ├── validations/
│   │   └── schemas.ts            # Zod schemas
│   └── utils.ts
│
├── hooks/
│   ├── use-generate.ts
│   ├── use-product.ts
│   └── use-export.ts
│
├── stores/
│   ├── product-store.ts          # Zustand: current product state
│   └── ui-store.ts               # Zustand: sidebar, modals, etc.
│
├── prisma/
│   └── schema.prisma
│
├── public/
├── .env.local                    # Local environment variables
└── package.json
```

---

## Data Models

### User
```prisma
model User {
  id          String    @id @default(cuid())
  clerkId     String    @unique
  email       String    @unique
  name        String?
  plan        Plan      @default(FREE)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  products    Product[]
  decisions   Decision[]
  exports     Export[]
}

enum Plan {
  FREE
  PRO
  TEAM
}
```

### Product
```prisma
model Product {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  name          String
  brief         String    @db.Text
  architecture  Json?     // Generated product architecture
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  flows         Flow[]
  designSystem  DesignSystem?
  decisions     Decision[]
  exports       Export[]

  @@index([userId])
}
```

### Flow
```prisma
model Flow {
  id          String    @id @default(cuid())
  productId   String
  product     Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  name        String
  type        FlowType
  screens     Json      // Array of screen objects
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([productId])
}

enum FlowType {
  ONBOARDING
  CORE_ACTION
  SETTINGS
  ERROR
  EDGE_CASE
  CUSTOM
}
```

### DesignSystem
```prisma
model DesignSystem {
  id            String    @id @default(cuid())
  productId     String    @unique
  product       Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  brandInputs   Json      // Brand form inputs
  colorTokens   Json      // Full token output
  typography    Json
  spacing       Json
  components    Json      // Component specs
  cssExport     String?   @db.Text
  tailwindExport String?  @db.Text
  tokensJson    Json?
  figmaGuide    String?   @db.Text
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Decision (Product Brain)
```prisma
model Decision {
  id          String          @id @default(cuid())
  productId   String
  product     Product         @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId      String
  user        User            @relation(fields: [userId], references: [id])
  type        DecisionType
  statement   String          @db.Text
  rationale   String?         @db.Text
  source      DecisionSource  @default(MANUAL)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  @@index([productId])
}

enum DecisionType {
  ARCHITECTURE
  DESIGN
  FEATURE
  STRATEGY
  RESEARCH
}

enum DecisionSource {
  AUTO   // Logged by Bulup automatically
  MANUAL // Added by user
}
```

### Export
```prisma
model Export {
  id          String      @id @default(cuid())
  productId   String
  product     Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  type        ExportType
  format      String      // "md", "css", "json", "tailwind", "pdf"
  fileUrl     String?     // Cloudflare R2 URL
  shareToken  String?     @unique
  shareExpiry DateTime?
  createdAt   DateTime    @default(now())

  @@index([productId])
}

enum ExportType {
  PRD
  FLOWS
  DESIGN_SYSTEM
  DEV_DOCS
  DECISIONS
}
```

---

## API Routes

### Generate Architecture
**POST** `/api/generate/architecture`

Request:
```json
{
  "brief": "string (min 10 chars, max 2000 chars)",
  "productId": "string (optional — if refining existing)"
}
```

Response (streamed):
```
data: {"type": "progress", "step": "Understanding your idea..."}
data: {"type": "progress", "step": "Defining user roles..."}
data: {"type": "output", "content": {...architecture object...}}
data: {"type": "done"}
```

Architecture object:
```json
{
  "positioning": "string",
  "userRoles": [{"name": "string", "description": "string"}],
  "features": {
    "core": ["string"],
    "niceToHave": ["string"],
    "future": ["string"]
  },
  "flows": [{"name": "string", "description": "string"}],
  "dataModel": [{"entity": "string", "fields": ["string"]}],
  "mvpScope": "string"
}
```

---

### Generate Flows
**POST** `/api/generate/flows`

Request:
```json
{
  "productId": "string",
  "customPrompt": "string (optional)"
}
```

Response (streamed — flows generated one at a time):
```json
{
  "flows": [
    {
      "name": "Onboarding Flow",
      "type": "ONBOARDING",
      "screens": [
        {
          "name": "Welcome",
          "purpose": "string",
          "primaryAction": "string",
          "components": ["string"],
          "states": {
            "default": "string",
            "loading": "string",
            "empty": "string",
            "error": "string",
            "success": "string"
          },
          "nextScreen": "string"
        }
      ]
    }
  ]
}
```

---

### Generate Design System
**POST** `/api/generate/design-system`

Request:
```json
{
  "productId": "string",
  "brandInputs": {
    "brandName": "string",
    "personality": ["string"],
    "audience": "string",
    "visualReference": "string"
  }
}
```

Response: Full design system JSON + generated CSS / Tailwind / tokens as strings.

---

### Ask Product Brain
**POST** `/api/generate/ask`

Request:
```json
{
  "productId": "string",
  "question": "string"
}
```

Response:
```json
{
  "answer": "string",
  "sourcedFrom": ["decisionId"]
}
```

---

### Products CRUD
```
GET    /api/products                 — list all products for user
POST   /api/products                 — create product
GET    /api/products/:id             — get single product
PATCH  /api/products/:id             — update product name / brief
DELETE /api/products/:id             — delete product
```

### Decisions CRUD
```
GET    /api/decisions?productId=:id  — list decisions for product
POST   /api/decisions                — create decision
PATCH  /api/decisions/:id            — edit decision
DELETE /api/decisions/:id            — delete decision
```

### Exports
```
POST   /api/exports                  — generate export file
GET    /api/exports?productId=:id    — export history
GET    /api/exports/share/:token     — public shareable view (no auth)
POST   /api/exports/:id/share        — generate shareable link
```

---

## Authentication

Using **Clerk** for auth.

- Sign in via email + password, or Google OAuth
- Clerk handles session management, JWT, and user object
- All API routes protected via `auth()` from `@clerk/nextjs`
- User record created in our DB on first sign-in via Clerk webhook

```typescript
// Protect API route
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })
  // ...
}
```

---

## AI Implementation

### Client Setup
```typescript
// lib/ai/client.ts
import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})
```

### Streaming Pattern
```typescript
// lib/ai/stream.ts
export async function streamGeneration(
  prompt: string,
  onChunk: (text: string) => void
) {
  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }]
  })

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      onChunk(chunk.delta.text)
    }
  }

  return stream.finalMessage()
}
```

### Prompt Files
All prompts live in `/lib/ai/prompts/`. Each prompt:
- Is a TypeScript function that takes inputs and returns a string
- Is version-controlled (never hard-coded in API routes)
- Is tested against sample inputs before shipping

---

## Environment Variables

```bash
# .env.local

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
CLERK_WEBHOOK_SECRET=whsec_...

# Database (Neon)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://... (for migrations)

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=bulup-exports
R2_PUBLIC_URL=https://...

# Email (Resend)
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Rate Limits

| Operation | Free | Pro | Team |
|---|---|---|---|
| Architecture generations | 3/day | 20/day | 50/day |
| Flow generations | 5/day | Unlimited | Unlimited |
| Design system generations | 1/day | 10/day | Unlimited |
| Product Brain AI queries | 5/day | 50/day | Unlimited |
| Exports | 3/day | Unlimited | Unlimited |

Rate limits enforced via Redis counters (key: `ratelimit:{userId}:{operation}:{date}`).

---

## Plan Limits

| Limit | Free | Pro | Team |
|---|---|---|---|
| Max products | 1 | Unlimited | Unlimited |
| UX flows | 3 | Unlimited | Unlimited |
| Design systems | 1 | Unlimited | Unlimited |
| Product Brain entries | 50 | Unlimited | Unlimited |
| Export formats | Markdown only | All formats | All formats |
| Shareable link watermark | Yes | No | No |
| Seats | 1 | 1 | 5 |

---

## Component Inventory (Frontend)

### Atoms (base UI, no dependencies)
- `Button` — primary, secondary, ghost, destructive; sizes: sm, md, lg
- `Input` — text, email, password, textarea
- `Badge` — default, success, warning, error, brand
- `Chip` — selectable, dismissible
- `Spinner` — sm, md, lg
- `Avatar` — image, initials fallback
- `Divider` — horizontal, with/without label
- `Tooltip` — wraps any trigger, content as string
- `IconButton` — icon-only with required tooltip

### Molecules (composed of atoms)
- `InputField` — Label + Input + HelperText + ErrorMessage
- `SearchBar` — Input with search icon + clear button
- `Dropdown` — trigger + panel with items
- `SegmentedControl` — tab-style toggle
- `ProgressSteps` — numbered step indicator with labels
- `StatusChip` — with icon + label + color coding
- `ProgressList` — animated list of generation steps

### Organisms (feature-level components)
- `Sidebar` — nav items, collapse, active state, account at bottom
- `AppHeader` — breadcrumb + page title + right actions
- `ProductCard` — name, date, status chips, hover reveal action
- `ArchitectureOutput` — structured output renderer with section collapse
- `FlowDiagram` — node-based flow visualization (read-only v1)
- `ScreenDetail` — screen spec with state tabs
- `TokenCard` — color swatch / type sample / spacing value
- `ComponentSpec` — component name + all state variants
- `DecisionCard` — decision statement + type + rationale + date
- `ExportCard` — export type + format badges + CTA
- `EmptyState` — icon + headline + body + optional CTA
- `SkeletonCard` — loading placeholder for ProductCard
- `ConfirmModal` — destructive action confirmation dialog
- `SlideOver` — right-side panel for add/edit forms

---

## Dev Setup

```bash
# Clone repo
git clone https://github.com/[org]/bulup.git
cd bulup

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Fill in all env vars

# Database setup
npx prisma generate
npx prisma db push

# Run dev server
npm run dev
```

### Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "db:push": "prisma db push",
  "db:migrate": "prisma migrate dev",
  "db:studio": "prisma studio",
  "type-check": "tsc --noEmit",
  "lint": "next lint"
}
```

---

## Deployment

Deployed on **Vercel**.

- **Production:** `main` branch → auto-deploy to production
- **Preview:** all PRs → auto-deploy to preview URL
- **Environment variables:** managed in Vercel dashboard (never committed)

**Database migrations:** Run manually before deploying a breaking migration:
```bash
npx prisma migrate deploy
```

---

## Error Handling Conventions

- All API routes return consistent error format:
```json
{
  "error": {
    "code": "GENERATION_FAILED",
    "message": "Human-readable message",
    "retryable": true
  }
}
```

- All AI generation failures are logged to Sentry
- User-facing errors mapped from error codes in `lib/errors.ts`
- Never expose raw Prisma or Anthropic errors to the frontend

---

*Dev Docs v1.0 — Bulup. Build clean. Ship real.*
