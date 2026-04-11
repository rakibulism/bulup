"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Send, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface NodeRefineResult {
  action: "new_node" | "modify_node"
  title: string
  type: "web" | "mobile"
  description: string
  suggestion: string
}

interface NodeSparklePromptProps {
  nodeId: string
  nodeTitle: string
  nodeType: string
  onResult: (result: NodeRefineResult, sourceNodeId: string) => void
}

export function NodeSparklePrompt({
  nodeId,
  nodeTitle,
  nodeType,
  onResult,
}: NodeSparklePromptProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [prompt, setPrompt] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Auto-focus input when opened
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setError(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isOpen])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/generate/node-refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodeTitle,
          nodeType,
          userPrompt: prompt.trim(),
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to process your request")
      }

      const data: NodeRefineResult = await res.json()
      onResult(data, nodeId)
      setPrompt("")
      setIsOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
    if (e.key === "Escape") {
      setIsOpen(false)
      setError(null)
    }
  }

  return (
    <div ref={containerRef} className="absolute -right-3 -top-3 z-50">
      {/* Sparkle Trigger Button */}
      <motion.button
        id={`sparkle-trigger-${nodeId}`}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((v) => !v)
          setError(null)
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
        animate={
          isOpen
            ? { rotate: 15, scale: 1.1 }
            : { rotate: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center shadow-lg border transition-all duration-200 cursor-pointer",
          isOpen
            ? "bg-brand-default border-brand-default text-white"
            : "bg-bg-surface1 border-border-strong text-brand-text hover:bg-brand-subtle hover:border-brand-default"
        )}
        title="Ask AI to modify or create from this node"
      >
        <Sparkles className="h-3.5 w-3.5" />
      </motion.button>

      {/* Floating Prompt Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: -4, x: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -4, x: 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="absolute top-9 right-0 w-72 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl border border-border-strong bg-bg-surface1 shadow-2xl overflow-hidden backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-border-default bg-bg-surface2">
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-text">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <span className="text-caption font-semibold text-text-primary">
                    AI Canvas Prompt
                  </span>
                </div>
                <button
                  onClick={() => { setIsOpen(false); setError(null) }}
                  className="text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Context hint */}
              <div className="px-3 pt-2 pb-1">
                <p className="text-caption text-text-tertiary leading-relaxed">
                  Describe what you want to{" "}
                  <span className="text-text-secondary font-medium">add or change</span>{" "}
                  for&nbsp;
                  <span className="text-brand-text font-semibold truncate">
                    {nodeTitle}
                  </span>
                </p>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-3 pt-1.5 space-y-2">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Add a dark mode version, or create a mobile version of this..."
                    rows={3}
                    disabled={isLoading}
                    className={cn(
                      "w-full resize-none rounded-lg border border-border-default bg-bg-base text-body-sm text-text-primary",
                      "placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-default",
                      "px-3 py-2 transition-all duration-150 leading-relaxed",
                      "disabled:opacity-60"
                    )}
                  />
                </div>

                {error && (
                  <p className="text-caption text-red-400 leading-snug">{error}</p>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-caption text-text-tertiary">
                    ↵ Enter to send
                  </p>
                  <button
                    type="submit"
                    disabled={!prompt.trim() || isLoading}
                    className={cn(
                      "flex items-center gap-1.5 h-7 px-3 rounded-lg text-caption font-semibold transition-all",
                      prompt.trim() && !isLoading
                        ? "bg-brand-default text-white shadow-md hover:opacity-90"
                        : "bg-bg-surface2 text-text-tertiary cursor-not-allowed"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Send className="h-3 w-3" />
                    )}
                    {isLoading ? "Thinking…" : "Send"}
                  </button>
                </div>
              </form>
            </div>

            {/* Connecting arrow to sparkle button — decorative */}
            <div className="absolute -top-1.5 right-4 w-3 h-3 rotate-45 border-t border-l border-border-strong bg-bg-surface2 rounded-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
