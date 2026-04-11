"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, Layout, Sparkles, CheckCircle2, Wand2 } from "lucide-react"
import { NodeSparklePrompt } from "@/components/features/canvas/node-sparkle-prompt"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

type ScreenType = "web" | "mobile"

interface CanvasNode {
  id: string
  type: ScreenType
  title: string
  description?: string
  x: number
  y: number
  width: number
  height: number
  isAIGenerated?: boolean
  sourceNodeId?: string // which node spawned this one
  badge?: "AI GENERATED" | "MODIFIED" | "NEW"
  highlight?: boolean // brief glow after spawn
}

// ─── Initial seed nodes ──────────────────────────────────────────────────────

const INITIAL_NODES: CanvasNode[] = [
  {
    id: "1",
    type: "web",
    title: "Landing Page — V1",
    x: 400,
    y: 100,
    width: 600,
    height: 400,
    badge: "AI GENERATED",
  },
  {
    id: "2",
    type: "mobile",
    title: "Onboarding — V1",
    x: 100,
    y: 200,
    width: 200,
    height: 350,
    badge: "AI GENERATED",
  },
  {
    id: "3",
    type: "web",
    title: "Dashboard Overview",
    x: 450,
    y: 600,
    width: 650,
    height: 450,
    badge: "AI GENERATED",
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
              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-2xl border text-body-sm font-medium",
              t.type === "success"
                ? "bg-bg-surface1 border-brand-default/40 text-text-primary"
                : "bg-bg-surface1 border-border-strong text-text-primary"
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

// ─── Main ─────────────────────────────────────────────────────────────────────

export function CanvasPreview() {
  const constraintsRef = React.useRef(null)
  const [nodes, setNodes] = React.useState<CanvasNode[]>(INITIAL_NODES)
  const [toasts, setToasts] = React.useState<ToastMsg[]>([])

  // ── Add a toast and auto-dismiss after 3 s ──
  const addToast = React.useCallback((message: string, type: ToastMsg["type"] = "success") => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  // ── Handle AI result from any sparkle prompt ──
  const handleAIResult = React.useCallback(
    (
      result: {
        action: "new_node" | "modify_node"
        title: string
        type: ScreenType
        description: string
        suggestion: string
      },
      sourceNodeId: string
    ) => {
      const sourceNode = nodes.find((n) => n.id === sourceNodeId)

      if (result.action === "new_node") {
        // Place the new node to the right and slightly below the source
        const newNode: CanvasNode = {
          id: crypto.randomUUID(),
          type: result.type,
          title: result.title,
          description: result.description,
          x: (sourceNode?.x ?? 400) + (sourceNode?.width ?? 600) + 60,
          y: (sourceNode?.y ?? 100) + 40,
          width: result.type === "mobile" ? 220 : 600,
          height: result.type === "mobile" ? 380 : 400,
          isAIGenerated: true,
          sourceNodeId,
          badge: "NEW",
          highlight: true,
        }
        setNodes((prev) => [...prev, newNode])

        // Remove highlight after animation settles
        setTimeout(() => {
          setNodes((prev) =>
            prev.map((n) => (n.id === newNode.id ? { ...n, highlight: false } : n))
          )
        }, 2000)

        addToast(`✨ ${result.suggestion}`, "success")
      } else {
        // modify_node — update the existing node's title & badge
        setNodes((prev) =>
          prev.map((n) =>
            n.id === sourceNodeId
              ? { ...n, title: result.title, badge: "MODIFIED", description: result.description, highlight: true }
              : n
          )
        )
        setTimeout(() => {
          setNodes((prev) =>
            prev.map((n) => (n.id === sourceNodeId ? { ...n, highlight: false } : n))
          )
        }, 2000)

        addToast(`✏️ ${result.suggestion}`, "success")
      }
    },
    [nodes, addToast]
  )

  return (
    <>
      <div
        ref={constraintsRef}
        className="absolute inset-0 overflow-hidden cursor-crosshair"
      >
        <motion.div
          drag
          dragConstraints={{ left: -3000, right: 3000, top: -3000, bottom: 3000 }}
          dragElastic={0.1}
          className="w-[10000px] h-[10000px] absolute -top-[4500px] -left-[4500px] pointer-events-auto"
          initial={{ x: 0, y: 0 }}
        >
          {/* Infinite Grid Dots */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #2d2d2d 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Canvas Nodes */}
          <AnimatePresence>
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  boxShadow: node.highlight
                    ? "0 0 0 2px hsl(var(--brand-default)), 0 20px 60px rgba(0,0,0,0.5)"
                    : "0 8px 40px rgba(0,0,0,0.4)",
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                className={cn(
                  "absolute rounded-xl bg-bg-surface1 border overflow-visible group select-none flex flex-col",
                  node.highlight ? "border-brand-default" : "border-border-strong"
                )}
                style={{
                  left: `calc(50% + ${node.x}px)`,
                  top: `calc(50% + ${node.y}px)`,
                  width: node.width,
                  height: node.height,
                }}
              >
                {/* ── Sparkle AI Prompt — floats outside top-right ── */}
                <NodeSparklePrompt
                  nodeId={node.id}
                  nodeTitle={node.title}
                  nodeType={node.type}
                  onResult={handleAIResult}
                />

                {/* ── Connection line from source node (decorative dot) ── */}
                {node.sourceNodeId && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-default border-2 border-bg-base shadow-lg shadow-brand-default/30 z-10" />
                )}

                {/* ── Node Header ── */}
                <div className="h-10 border-b border-border-default bg-bg-surface2 px-4 flex items-center justify-between rounded-t-xl flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {node.type === "web" ? (
                      <Monitor className="h-3.5 w-3.5 text-text-tertiary" />
                    ) : (
                      <Smartphone className="h-3.5 w-3.5 text-text-tertiary" />
                    )}
                    <span className="text-caption font-semibold text-text-secondary truncate max-w-[200px]">
                      {node.title}
                    </span>
                  </div>
                  <Badge
                    variant="brand"
                    className={cn(
                      "scale-75 origin-right flex-shrink-0",
                      node.badge === "MODIFIED" && "bg-amber-500/20 text-amber-400 border-amber-500/30",
                      node.badge === "NEW" && "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    )}
                  >
                    {node.badge ?? "AI GENERATED"}
                  </Badge>
                </div>

                {/* ── Node Body ── */}
                <div className="flex-1 bg-bg-base m-2 rounded-lg border border-border-default flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                  {node.highlight && (
                    <motion.div
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                      className="absolute inset-0 bg-brand-default/10 pointer-events-none"
                    />
                  )}

                  <div className="text-center space-y-3 px-4">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center mx-auto scale-110",
                        node.isAIGenerated
                          ? "bg-brand-subtle text-brand-text"
                          : "bg-bg-surface2 text-text-tertiary"
                      )}
                    >
                      {node.isAIGenerated ? (
                        <Sparkles className="h-6 w-6" />
                      ) : (
                        <Layout className="h-6 w-6" />
                      )}
                    </div>
                    {node.description ? (
                      <p className="text-caption text-text-secondary leading-relaxed max-w-[240px]">
                        {node.description}
                      </p>
                    ) : (
                      <p className="text-label-sm text-text-tertiary font-mono">
                        RENDER_BUFFER_ID_{node.id.slice(0, 4).toUpperCase()}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Hover tint ── */}
                <div className="absolute inset-0 bg-brand-default/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Canvas-level toast notifications ── */}
      <CanvasToast toasts={toasts} />
    </>
  )
}
