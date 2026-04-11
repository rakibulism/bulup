"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle2, Wand2, Plus, Monitor, LayoutTemplate } from "lucide-react"
import { cn } from "@/lib/utils"
import { NodeSparklePrompt } from "../canvas/node-sparkle-prompt"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MindmapNode {
  id: string
  title: string
  description?: string
  x: number
  y: number
  sourceNodeId?: string // to draw the line from
  badge?: "MODIFIED" | "NEW"
  highlight?: boolean
}

// ─── Initial seed nodes ──────────────────────────────────────────────────────

const INITIAL_NODES: MindmapNode[] = [
  {
    id: "1",
    title: "Landing Page",
    description: "Main entry point, hero section, CTA",
    x: 100,
    y: 200,
  },
  {
    id: "2",
    title: "Onboarding Flow",
    description: "Collect user preferences and initial setup",
    x: 400,
    y: 200,
    sourceNodeId: "1",
  },
  {
    id: "3",
    title: "User Dashboard",
    description: "Main hub showing activity and metrics",
    x: 700,
    y: 100,
    sourceNodeId: "2",
  },
  {
    id: "4",
    title: "Profile Settings",
    description: "Manage account details and preferences",
    x: 700,
    y: 300,
    sourceNodeId: "2",
  },
]

// ─── Toast component ─────────────────────────────────────────────────────────

interface ToastMsg {
  id: string
  message: string
  type: "success" | "info"
}

function CanvasToast({ toasts }: { toasts: ToastMsg[] }) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-2xl border text-body-sm font-medium bg-bg-surface1 text-text-primary",
              t.type === "success" ? "border-brand-default/40" : "border-border-strong"
            )}
          >
            {t.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-brand-text flex-shrink-0" />
            ) : (
              <Wand2 className="h-4 w-4 text-brand-text flex-shrink-0 animate-pulse" />
            )}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function FlowMindmapCanvas() {
  const constraintsRef = React.useRef(null)
  const [nodes, setNodes] = React.useState<MindmapNode[]>(INITIAL_NODES)
  const [toasts, setToasts] = React.useState<ToastMsg[]>([])

  const addToast = React.useCallback((message: string, type: ToastMsg["type"] = "success") => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  // Quick fallback mock response for sparkle if no backend
  const handleAIResult = React.useCallback(
    (
      result: {
        action: "new_node" | "modify_node"
        title: string
        type: string
        description: string
        suggestion: string
      },
      sourceNodeId: string
    ) => {
      const sourceNode = nodes.find((n) => n.id === sourceNodeId)

      if (result.action === "new_node") {
        // Calculate new position based on how many children already exist
        const siblings = nodes.filter(n => n.sourceNodeId === sourceNodeId)
        const siblingOffset = (siblings.length * 150) - (siblings.length > 0 ? 75 : 0)

        const newNode: MindmapNode = {
          id: crypto.randomUUID(),
          title: result.title,
          description: result.description || result.suggestion,
          x: (sourceNode?.x ?? 0) + 300,
          y: (sourceNode?.y ?? 0) + siblingOffset,
          sourceNodeId,
          badge: "NEW",
          highlight: true,
        }
        setNodes((prev) => [...prev, newNode])

        setTimeout(() => {
          setNodes((prev) => prev.map((n) => (n.id === newNode.id ? { ...n, highlight: false } : n)))
        }, 2000)

        addToast(`✨ Created: ${result.title}`, "success")
      } else {
        setNodes((prev) =>
          prev.map((n) =>
            n.id === sourceNodeId
              ? { ...n, title: result.title, description: result.description, badge: "MODIFIED", highlight: true }
              : n
          )
        )
        setTimeout(() => {
          setNodes((prev) => prev.map((n) => (n.id === sourceNodeId ? { ...n, highlight: false } : n)))
        }, 2000)

        addToast(`✏️ Modified to: ${result.title}`, "success")
      }
    },
    [nodes, addToast]
  )

  return (
    <>
      <div ref={constraintsRef} className="absolute inset-0 overflow-hidden cursor-crosshair bg-bg-base">
        <motion.div
          drag
          dragConstraints={{ left: -3000, right: 3000, top: -3000, bottom: 3000 }}
          dragElastic={0.1}
          className="w-[10000px] h-[10000px] absolute -top-[4500px] -left-[4500px] pointer-events-auto"
          initial={{ x: 0, y: 0 }}
        >
          {/* Infinite Grid Dots */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: "radial-gradient(circle, #3d3d3d 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* SVG Connecting Lines using Bezier Curves */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--brand-default))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--brand-default))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {nodes.map((node) => {
              if (!node.sourceNodeId) return null
              const source = nodes.find((n) => n.id === node.sourceNodeId)
              if (!source) return null

              const nodeWidth = 240
              const nodeHeight = 100
              
              // Base coords at exact 50%
              const originX = 5000 
              const originY = 5000

              // Calculate centers for curves
              const x1 = originX + source.x + nodeWidth // right edge of source
              const y1 = originY + source.y + nodeHeight / 2 // vertical center of source
              
              const x2 = originX + node.x // left edge of target
              const y2 = originY + node.y + nodeHeight / 2 // vertical center of target

              // Cubic bezier curve path
              const d = `M ${x1} ${y1} C ${x1 + 100} ${y1}, ${x2 - 100} ${y2}, ${x2} ${y2}`

              return (
                <path
                  key={`edge-${node.id}`}
                  d={d}
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="3"
                  className="transition-all duration-500 animate-in fade-in"
                  strokeLinecap="round"
                />
              )
            })}
          </svg>

          {/* Canvas Nodes */}
          <AnimatePresence>
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.88, x: -20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  boxShadow: node.highlight
                    ? "0 0 0 2px hsl(var(--brand-default)), 0 10px 40px rgba(0,0,0,0.5)"
                    : "0 4px 20px rgba(0,0,0,0.2)",
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                  "absolute rounded-2xl bg-bg-surface1 border min-h-[100px] overflow-visible group select-none flex flex-col z-10 w-[240px]",
                  node.highlight ? "border-brand-default" : "border-border-strong hover:border-brand-default/50"
                )}
                style={{
                  left: `calc(50% + ${node.x}px)`,
                  top: `calc(50% + ${node.y}px)`,
                }}
              >
                {/* Visual Connection Dots */}
                {node.sourceNodeId && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-default border-4 border-bg-surface1 shrink-0" />
                )}
                {nodes.some(n => n.sourceNodeId === node.id) && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-default border-4 border-bg-surface1 shrink-0" />
                )}

                {/* ── Sparkle AI Prompt — floats outside top-right ── */}
                <NodeSparklePrompt
                  nodeId={node.id}
                  nodeTitle={node.title}
                  nodeType="web"
                  onResult={handleAIResult}
                />

                <div className="p-4 flex flex-col gap-2 h-full justify-center text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={cn("p-1.5 rounded-md bg-bg-surface2 text-text-tertiary", node.highlight && "bg-brand-default/10 text-brand-default")}>
                        <LayoutTemplate className="h-4 w-4" />
                      </div>
                      <span className="text-label-md font-bold text-text-primary">
                        {node.title}
                      </span>
                    </div>
                  </div>
                  
                  {node.description && (
                    <p className="text-caption text-text-secondary leading-snug line-clamp-3">
                      {node.description}
                    </p>
                  )}

                  {node.badge && (
                    <Badge
                      variant="brand"
                      className={cn(
                        "w-fit scale-90 origin-left mt-1",
                        node.badge === "MODIFIED" && "bg-amber-500/20 text-amber-400 border-amber-500/30",
                        node.badge === "NEW" && "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      )}
                    >
                      {node.badge}
                    </Badge>
                  )}
                </div>

                {/* Hover tint */}
                <div className="absolute inset-0 bg-brand-default/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CanvasToast toasts={toasts} />
    </>
  )
}
