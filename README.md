# Forge — AI Product Orchestration Platform

Forge is a high-agency product engineering tool designed to transform raw ideas into production-ready specifications, architectures, and design systems using Anthropic Claude.

## 🚀 Key Features

- **Idea Workshop**: Interactive AI architecture generation with real-time streaming progress.
- **UX Flow Builder**: Screen-by-screen journey mapping with full state documentation (loading, empty, error, etc.).
- **Design System Studio**: Automated generation of primitive and semantic design tokens based on brand personality.
- **Product Brain**: A persistent memory layer that logs strategic decisions and allows natural language querying.
- **Handoff Center**: Multi-format exports including Markdown PRDs, CSS Variables, and Tailwind configurations.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **AI**: Anthropic Claude 3.5 Sonnet
- **Database**: Prisma + PostgreSQL (Supabase/Neon)
- **Styling**: Tailwind CSS + Vanilla CSS Variables
- **Animations**: Framer Motion
- **Components**: Radix UI + Custom composed atoms/molecules

## ⚙️ Setup

1. **Clone and Install**:
   ```bash
   git clone https://github.com/rakibulism/bulup.git
   cd bulup
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file:
   ```env
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # Anthropic
   ANTHROPIC_API_KEY=sk-ant-api03-...

   # Database
   DATABASE_URL="postgresql://user:pass@host:port/dbname"
   ```

3. **Database Migration**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📐 Design Philosophy

Forge follows a **Reductionist Dark Mode** aesthetic.
- **Primary Accent**: Indigo Violet (#6E63F5)
- **Background**: Near Black (#0C0C0C)
- **Typography**: Inter (UI) and JetBrains Mono (Data/Tokens)
- **Hierarchy**: Built through typography and weight before color.

---

Built by 💜 [Rakibul Islam](https://x.com/rakibulism).