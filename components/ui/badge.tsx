import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "brand" | "secondary" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-label-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-default focus:ring-offset-2"

  const variantClasses = {
    default: "border-border-default bg-bg-surface2 text-text-primary",
    success: "border-transparent bg-feedback-successSubtle text-feedback-success",
    warning: "border-transparent bg-feedback-warningSubtle text-feedback-warning",
    error: "border-transparent bg-feedback-errorSubtle text-feedback-error",
    brand: "border-transparent bg-brand-subtle text-brand-text",
    secondary: "border-border-subtle bg-bg-surface1 text-text-secondary",
    outline: "border-border-default bg-transparent text-text-secondary",
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} {...props} />
  )
}

export { Badge }
