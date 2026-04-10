import * as React from "react"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface StatusChipProps extends BadgeProps {
  icon?: React.ReactNode
  label: string
}

function StatusChip({ icon, label, className, ...props }: StatusChipProps) {
  return (
    <Badge className={cn("gap-1.5 py-1 px-3 rounded-full", className)} {...props}>
      {icon && <span className="flex shrink-0">&shy;{icon}</span>}
      <span>{label}</span>
    </Badge>
  )
}

export { StatusChip }
