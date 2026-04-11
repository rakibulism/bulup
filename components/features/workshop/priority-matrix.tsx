"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock } from "lucide-react"

interface Feature {
  name: string
  x: number // 0-100 (Complexity)
  y: number // 0-100 (Value)
  status: "grounded" | "assumed"
}

interface PriorityMatrixProps {
  features: Feature[]
  isLocked: boolean
  onToggleLock: () => void
}

export function PriorityMatrix({ features, isLocked, onToggleLock }: PriorityMatrixProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
           <h4 className="text-label-sm font-bold text-text-primary uppercase tracking-widest">Decision Matrix</h4>
           <p className="text-[11px] text-text-tertiary italic">Drag features to refine initial AI positioning.</p>
        </div>
        <button 
          onClick={onToggleLock}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
            isLocked 
              ? "bg-feedback-successSubtle text-feedback-success border border-feedback-success/30" 
              : "bg-bg-surface2 text-text-tertiary border border-border-subtle hover:text-text-primary"
          )}
        >
          {isLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
          {isLocked ? "Scope Locked" : "Lock MVP Scope"}
        </button>
      </div>

      <div className="relative aspect-square w-full bg-bg-surface1 border border-border-strong rounded-3xl overflow-hidden shadow-inner">
        {/* Grid Axes */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
           <div className="w-[1px] h-full bg-border-strong" />
           <div className="h-[1px] w-full bg-border-strong" />
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase text-text-tertiary tracking-widest">High Value</div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase text-text-tertiary tracking-widest">Lower Value</div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold uppercase text-text-tertiary tracking-widest">Quick Build</div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[9px] font-bold uppercase text-text-tertiary tracking-widest">Complex</div>

        {/* Quadrant Names */}
        <div className="absolute top-8 left-8 text-[10px] font-bold text-brand-text/40 pointer-events-none">MVP SWEET SPOT</div>
        <div className="absolute bottom-8 right-8 text-[10px] font-bold text-text-tertiary/20 pointer-events-none">BACKLOG / LATER</div>

        {/* MVP Boundary Line (Diagonal) */}
        <div className={cn(
          "absolute inset-0 border-[3px] border-dashed border-brand-subtle/30 pointer-events-none transition-all duration-700",
          isLocked ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )} style={{ clipPath: 'polygon(0 100%, 0 0, 100% 0)' }}>
           <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-brand-default text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter">
              <Lock className="h-2.5 w-2.5" /> MVP Zone
           </div>
        </div>

        {/* Feature Chips */}
        {features.map((feature, i) => (
          <motion.div
            key={i}
            drag={!isLocked}
            dragMomentum={false}
            initial={{ left: `${feature.x}%`, bottom: `${feature.y}%` }}
            className={cn(
               "absolute -translate-x-1/2 translate-y-1/2 z-10 p-2 rounded-xl border-2 transition-shadow active:cursor-grabbing",
               isLocked ? "cursor-default" : "cursor-grab hover:shadow-xl",
               feature.status === 'grounded' 
                 ? "bg-bg-surface1 border-border-default shadow-sm" 
                 : "bg-bg-surface2 border-amber-500/30 shadow-subtle"
            )}
          >
            <div className="flex items-center gap-2">
               <div className={cn(
                 "w-1.5 h-1.5 rounded-full shrink-0",
                 feature.status === 'grounded' ? "bg-brand-default" : "bg-amber-500 animate-pulse"
               )} />
               <span className="text-[11px] font-bold text-text-primary whitespace-nowrap">{feature.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
