"use client"

import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode
  label: string // Required for accessibility, used as tooltip content
  tooltipSide?: "top" | "right" | "bottom" | "left"
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, tooltipSide = "top", className, size = "default", ...props }, ref) => {
    // Override default sizes to make buttons square
    const sizeMap = {
      default: "h-9 w-9 px-0",
      sm: "h-8 w-8 px-0",
      lg: "h-10 w-10 px-0",
      icon: "h-9 w-9",
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              className={cn(sizeMap[size as keyof typeof sizeMap], className)}
              variant={props.variant}
              {...props}
              aria-label={label}
            >
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={tooltipSide}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
