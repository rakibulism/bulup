import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    
    // Classes based on design system
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-label-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default disabled:pointer-events-none disabled:opacity-50"
    
    const variantClasses = {
      primary: "bg-brand-default text-text-primary hover:bg-brand-hover shadow-sm",
      secondary: "bg-transparent border border-border-strong text-text-primary hover:bg-bg-surface3",
      outline: "bg-transparent border border-border-default text-text-primary hover:bg-bg-surface2",
      ghost: "bg-transparent text-text-secondary hover:bg-bg-surface2 hover:text-text-primary",
      destructive: "bg-transparent border border-feedback-error text-feedback-error hover:bg-feedback-errorSubtle",
    }
    
    const sizeClasses = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-label-sm",
      lg: "h-10 rounded-lg px-8",
      icon: "h-9 w-9",
    }

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
