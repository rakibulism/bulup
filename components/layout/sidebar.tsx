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
  User,
  Folder,
  FolderOpen,
  FileText,
  Plus,
  MoreHorizontal
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

const projectsData = [
  {
    id: "project-1",
    name: "Nebula CRM",
    folders: [
      {
        id: "folder-1-1",
        name: "Research",
        items: [
          { id: "doc-1", name: "Competitor Analysis", href: "/projects/nebula/research/competitors" },
          { id: "doc-2", name: "User Interviews", href: "/projects/nebula/research/interviews" }
        ]
      },
      {
        id: "folder-1-2",
        name: "Designs",
        items: [
          { id: "doc-3", name: "Wireframes", href: "/projects/nebula/designs/wireframes" }
        ]
      }
    ]
  },
  {
    id: "project-2",
    name: "Aether E-commerce",
    folders: []
  }
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const pathname = usePathname()

  const [expandedFolders, setExpandedFolders] = React.useState<Record<string, boolean>>({
    "project-1": true,
    "folder-1-1": true
  })

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({ ...prev, [folderId]: !prev[folderId] }))
  }

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

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
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
          </div>

          {/* Projects Section */}
          {!isCollapsed && (
             <div className="px-3 py-2 mt-6 mb-1 text-xs font-semibold text-text-tertiary uppercase tracking-wider group flex items-center justify-between cursor-pointer hover:text-text-secondary transition-colors">
               <span>Projects</span>
               <Plus className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          )}

          {isCollapsed ? (
             <div className="pt-4 mt-4 border-t border-border-default space-y-1">
               <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/projects"
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md transition-colors mx-auto",
                        pathname.startsWith("/projects") 
                          ? "bg-brand-subtle text-brand-text" 
                          : "text-text-secondary hover:bg-bg-surface2 hover:text-text-primary"
                      )}
                    >
                      <Folder className="h-5 w-5" />
                      <span className="sr-only">Projects</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Projects</TooltipContent>
                </Tooltip>
             </div>
          ) : (
            <div className="space-y-1">
              {projectsData.map(project => (
                <div key={project.id} className="space-y-0.5">
                  <div 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-bg-surface2 text-text-secondary hover:text-text-primary cursor-pointer group transition-colors"
                    onClick={() => toggleFolder(project.id)}
                  >
                    <ChevronRight className={cn("h-3.5 w-3.5 transition-transform text-text-tertiary", expandedFolders[project.id] && "rotate-90")} />
                    <Folder className="h-4 w-4 text-brand-text/80" />
                    <span className="text-sm font-medium flex-1 truncate">{project.name}</span>
                    <MoreHorizontal className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {expandedFolders[project.id] && (
                    <div className="pl-6 space-y-0.5">
                      {project.folders.map(folder => (
                        <div key={folder.id} className="space-y-0.5">
                          <div 
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-bg-surface2 text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
                            onClick={() => toggleFolder(folder.id)}
                          >
                            <ChevronRight className={cn("h-3.5 w-3.5 transition-transform text-text-tertiary", expandedFolders[folder.id] && "rotate-90")} />
                            {expandedFolders[folder.id] ? <FolderOpen className="h-4 w-4 text-text-tertiary" /> : <Folder className="h-4 w-4 text-text-tertiary" />}
                            <span className="text-sm flex-1 truncate">{folder.name}</span>
                          </div>

                          {expandedFolders[folder.id] && (
                            <div className="pl-6 space-y-0.5">
                              {folder.items.map(item => {
                                const isActive = pathname === item.href
                                return (
                                  <Link
                                    key={item.id}
                                    href={item.href}
                                    className={cn(
                                      "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors",
                                      isActive 
                                        ? "bg-brand-subtle/50 text-brand-text font-medium" 
                                        : "text-text-tertiary hover:bg-bg-surface2 hover:text-text-secondary"
                                    )}
                                  >
                                    <FileText className="h-3.5 w-3.5" />
                                    <span className="text-sm truncate">{item.name}</span>
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                      {project.folders.length === 0 && (
                        <div className="px-9 py-1.5 text-xs text-text-tertiary italic">Empty project</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
