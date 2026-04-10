"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
      
      <div className="flex items-center gap-4">
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
        <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />
        <Avatar className="h-8 w-8 border border-border-strong">
          <AvatarImage src="" />
          <AvatarFallback className="bg-bg-surface1 text-text-secondary text-xs">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
