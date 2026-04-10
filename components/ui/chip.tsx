import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean
  dismissible?: boolean
  onDismiss?: () => void
}

function Chip({ className, selected = false, dismissible = false, onDismiss, children, ...props }: ChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xs border px-2 py-1 text-label-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-default",
        selected
          ? "border-brand-default bg-brand-subtle text-brand-text"
          : "border-border-default bg-bg-surface2 text-text-secondary hover:bg-bg-surface3 hover:text-text-primary",
        className
      )}
      {...props}
    >
      {children}
      {dismissible && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDismiss?.()
          }}
          className="ml-1 rounded-full text-text-tertiary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-default"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  )
}

export { Chip }
