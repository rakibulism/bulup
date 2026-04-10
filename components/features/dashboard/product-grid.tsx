import * as React from "react"
import { ProductCard, ProductCardProps } from "./product-card"
import { EmptyState } from "@/components/organisms/empty-state"
import { Boxes } from "lucide-react"

interface ProductGridProps {
  products: ProductCardProps[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (products.length === 0 && !isLoading) {
    return (
      <EmptyState
        icon={<Boxes className="h-12 w-12" />}
        headline="No products found"
        description="Every great success starts with a single idea. Build yours now."
        actionLabel="Create my first product"
        onAction={() => window.location.href = '/workshop'}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
