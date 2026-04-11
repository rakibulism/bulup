"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Lightbulb, 
  GitBranch, 
  Palette, 
  Brain, 
  FileOutput, 
  Settings,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Idea Workshop", icon: Lightbulb, href: "/workshop" },
  { label: "UX Flows", icon: GitBranch, href: "/flows" },
  { label: "Design System", icon: Palette, href: "/design-system" },
  { label: "Product Brain", icon: Brain, href: "/brain" },
  { label: "Handoff", icon: FileOutput, href: "/handoff" },
]

import Image from "next/image"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col border-r border-border-default bg-bg-surface1 transition-all duration-300 ease-in-out h-screen sticky top-0",
          isCollapsed ? "w-16" : "w-60"
        )}
      >
        <div className="flex h-16 items-center border-b border-border-default px-4 justify-between">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-text-primary">
              <Image 
                src="/logo.png" 
                alt="Bulup Logo" 
                width={28} 
                height={28} 
                className="rounded-sm"
              />
              <span>BULUP</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="mx-auto">
              <Image 
                src="/logo.png" 
                alt="Bulup Logo" 
                width={28} 
                height={28} 
                className="rounded-sm"
              />
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            
            if (isCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md transition-colors mx-auto",
                        isActive 
                          ? "bg-brand-subtle text-brand-text" 
                          : "text-text-secondary hover:bg-bg-surface2 hover:text-text-primary"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-label-md",
                  isActive 
                    ? "bg-brand-subtle text-brand-text font-semibold" 
                    : "text-text-secondary hover:bg-bg-surface2 hover:text-text-primary"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-brand-text" : "text-text-secondary")} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border-default p-2 space-y-1">
           {isCollapsed ? (
             <Tooltip>
               <TooltipTrigger asChild>
                  <Link
                    href="/settings"
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-md transition-colors mx-auto",
                      pathname.startsWith("/settings") 
                        ? "bg-brand-subtle text-brand-text" 
                        : "text-text-secondary hover:bg-bg-surface2 hover:text-text-primary"
                    )}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
               </TooltipTrigger>
               <TooltipContent side="right">Settings</TooltipContent>
             </Tooltip>
           ) : (
             <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-label-md",
                  pathname.startsWith("/settings") 
                    ? "bg-brand-subtle text-brand-text font-semibold" 
                    : "text-text-secondary hover:bg-bg-surface2 hover:text-text-primary"
                )}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
           )}

          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-text-tertiary"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
