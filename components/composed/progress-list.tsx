"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type ProgressStepStatus = "pending" | "loading" | "completed" | "error"

export interface ProgressStep {
  id: string
  label: string
  status: ProgressStepStatus
}

export interface ProgressListProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: ProgressStep[]
}

function ProgressList({ steps, className, ...props }: ProgressListProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <AnimatePresence mode="popLayout" initial={false}>
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            layout
            className="flex items-center gap-3 py-1"
          >
            <div className="flex shrink-0 items-center justify-center">
              {step.status === "completed" && (
                <CheckCircle2 className="h-5 w-5 text-feedback-success" />
              )}
              {step.status === "loading" && (
                <Loader2 className="h-5 w-5 animate-spin text-brand-default" />
              )}
              {step.status === "pending" && (
                <Circle className="h-5 w-5 text-text-tertiary" />
              )}
              {step.status === "error" && (
                <Circle className="h-5 w-5 text-feedback-error fill-feedback-error/20" />
              )}
            </div>
            <span
              className={cn(
                "text-label-md transition-colors duration-300",
                step.status === "completed" ? "text-text-primary" : 
                step.status === "loading" ? "text-brand-text font-medium" : 
                "text-text-secondary"
              )}
            >
              {step.label}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export { ProgressList }
