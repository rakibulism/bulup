"use client"

import * as React from "react"
import { ArrowRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FlowDiagramProps {
  screens: { name: string }[]
  activeScreenIndex?: number
  onScreenClick?: (index: number) => void
}

export function FlowDiagram({ screens, activeScreenIndex, onScreenClick }: FlowDiagramProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl bg-bg-surface2 border border-border-default overflow-x-auto">
      {screens.map((screen, i) => (
        <React.Fragment key={i}>
          <button
            onClick={() => onScreenClick?.(i)}
            className={cn(
              "flex flex-col items-center gap-2 group transition-all",
              activeScreenIndex === i ? "scale-105" : "hover:scale-102"
            )}
          >
            <div className={cn(
              "h-12 w-12 rounded-lg flex items-center justify-center border-2 transition-colors duration-300",
              activeScreenIndex === i 
                ? "bg-brand-subtle border-brand-default text-brand-text shadow-lg" 
                : "bg-bg-surface1 border-border-default text-text-tertiary group-hover:border-text-secondary"
            )}>
              <span className="text-label-md font-bold">{i + 1}</span>
            </div>
            <span className={cn(
              "text-label-sm font-medium transition-colors max-w-[100px] text-center line-clamp-2",
              activeScreenIndex === i ? "text-text-primary" : "text-text-tertiary group-hover:text-text-secondary"
            )}>
              {screen.name}
            </span>
          </button>
          {i < screens.length - 1 && (
            <ArrowRight className="h-4 w-4 text-text-tertiary shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
