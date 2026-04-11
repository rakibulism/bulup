import * as React from "react"
import Link from "next/link"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/composed/search-bar"
import { ProductGrid } from "@/components/features/dashboard/product-grid"
import { Plus, LayoutGrid, Clock, Users } from "lucide-react"

// Mock data for initial view
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Nebula CRM",
    brief: "AI-driven CRM for independent creators to manage sponsorships and outreach automatically.",
    updatedAt: "2 hours ago",
    hasArchitecture: true,
    hasFlows: true,
    hasDesignSystem: false,
  },
  {
    id: "2",
    name: "GhostWriter",
    brief: "A minimalist blog platform that uses a distraction-free markdown editor with AI-assisted drafting.",
    updatedAt: "Yesterday",
    hasArchitecture: true,
    hasFlows: false,
    hasDesignSystem: true,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <AppHeader 
        title="Dashboard" 
        actions={
          <Link href="/workshop">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Product
            </Button>
          </Link>
        }
      />

      {/* Stats Summary Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border-default bg-bg-surface1 p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-brand-subtle flex items-center justify-center text-brand-text">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <div>
            <p className="text-caption text-text-tertiary uppercase tracking-wider">Active Products</p>
            <p className="text-heading-lg font-bold text-text-primary">2</p>
          </div>
        </div>
        <div className="rounded-xl border border-border-default bg-bg-surface1 p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-brand-subtle flex items-center justify-center text-brand-text">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-caption text-text-tertiary uppercase tracking-wider">Time Saved</p>
            <p className="text-heading-lg font-bold text-text-primary">12.4h</p>
          </div>
        </div>
        <div className="rounded-xl border border-border-default bg-bg-surface1 p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-brand-subtle flex items-center justify-center text-brand-text">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-caption text-text-tertiary uppercase tracking-wider">Plan</p>
            <p className="text-heading-lg font-bold text-text-primary">Free</p>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-heading-md font-semibold text-text-primary self-start sm:self-center">Your Products</h2>
        <div className="w-full sm:w-auto flex items-center gap-3">
          <SearchBar placeholder="Search products..." className="w-full sm:w-64" />
        </div>
      </section>

      {/* Product Grid */}
      <ProductGrid products={MOCK_PRODUCTS} />
    </div>
  )
}
