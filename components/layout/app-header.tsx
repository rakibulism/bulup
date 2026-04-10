"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface AppHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  actions?: React.ReactNode
}

export function AppHeader({ title, actions, className, ...props }: AppHeaderProps) {
  const pathname = usePathname()
  
  // Resolve title from pathname if not provided
  const displayTitle = title || pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Dashboard"

  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between border-b border-border-default bg-bg-base px-6 sticky top-0 z-10",
        className
      )}
      {...props}
    >
      <div className="flex flex-col">
        <h1 className="text-heading-lg font-bold text-text-primary leading-tight">
          {displayTitle}
        </h1>
      </div>
      
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </header>
  )
}
