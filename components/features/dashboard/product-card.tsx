import * as React from "react"
import Link from "next/link"
import { MoreVertical, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StatusChip } from "@/components/composed/status-chip"
import { IconButton } from "@/components/ui/icon-button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/composed/dropdown"

export interface ProductCardProps {
  id: string
  name: string
  brief: string
  updatedAt: string
  hasArchitecture: boolean
  hasFlows: boolean
  hasDesignSystem: boolean
}

function ProductCard({
  id,
  name,
  brief,
  updatedAt,
  hasArchitecture,
  hasFlows,
  hasDesignSystem,
}: ProductCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-border-default bg-bg-surface2 p-6 transition-all hover:border-brand-default/40 hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-heading-md font-semibold text-text-primary group-hover:text-brand-text transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 text-caption text-text-tertiary">
            <Calendar className="h-3 w-3" />
            <span>Updated {updatedAt}</span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton 
              icon={<MoreVertical className="h-4 w-4" />} 
              label="Product options" 
              variant="ghost" 
              size="sm"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-feedback-error">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-body-sm text-text-secondary line-clamp-3 mb-6 flex-1 italic">
        "{brief}"
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {hasArchitecture && <StatusChip label="Architecture" variant="brand" size="sm" />}
        {hasFlows && <StatusChip label="UX Flows" variant="brand" size="sm" />}
        {hasDesignSystem && <StatusChip label="Design System" variant="brand" size="sm" />}
        {!hasArchitecture && !hasFlows && !hasDesignSystem && (
           <StatusChip label="Empty" variant="default" size="sm" />
        )}
      </div>

      <div className="pt-4 border-t border-border-subtle flex justify-end">
        <Link href={`/workshop?id=${id}`}>
          <Button variant="ghost" size="sm" className="gap-2 group/btn">
            Open Workshop
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export { ProductCard }
