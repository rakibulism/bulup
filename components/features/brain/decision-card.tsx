"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { StatusChip } from "@/components/composed/status-chip"
import { Calendar, Quote, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface Decision {
  id: string
  type: "ARCHITECTURE" | "DESIGN" | "FEATURE" | "STRATEGY" | "RESEARCH"
  statement: string
  rationale?: string
  source: "AUTO" | "MANUAL"
  createdAt: string
}

export function DecisionCard({ decision }: { decision: Decision }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="group relative pl-8 pb-10 border-l border-border-subtle last:pb-0">
      {/* Timeline Dot */}
      <div className="absolute left-[-5px] top-1 h-[9px] w-[9px] rounded-full bg-brand-default ring-4 ring-bg-base" />

      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-3 p-5 rounded-2xl bg-bg-surface1 border border-border-default transition-all hover:bg-bg-surface2 hover:shadow-lg cursor-pointer active:scale-[0.99]"
      >
        <div className="flex items-center justify-between gap-4">
           <div className="flex items-center gap-2">
              <StatusChip label={decision.type} variant="default" size="sm" />
              {decision.source === 'AUTO' && (
                <Badge variant="secondary" className="text-[10px] py-0 px-1.5 opacity-60">System Log</Badge>
              )}
           </div>
           <div className="flex items-center gap-2 text-caption text-text-tertiary">
              <Calendar className="h-3 w-3" />
              {new Date(decision.createdAt).toLocaleDateString()}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
           </div>
        </div>

        <h4 className="text-body-md font-semibold text-text-primary leading-snug">
          {decision.statement}
        </h4>

        <AnimatePresence initial={false}>
          {isOpen && decision.rationale && (
            <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: "auto", opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.3, ease: "easeInOut" }}
               className="overflow-hidden"
            >
              <div className="flex gap-2 p-3 rounded-lg bg-bg-surface3 border-l-2 border-brand-subtle mt-2">
                 <Quote className="h-4 w-4 text-text-tertiary shrink-0 mt-0.5" />
                 <p className="text-body-sm text-text-secondary italic leading-relaxed">
                   {decision.rationale}
                 </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
