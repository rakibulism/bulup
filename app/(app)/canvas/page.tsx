"use client"

import * as React from "react"
import { CanvasPreview } from "@/components/features/canvas/canvas-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ZoomIn, ZoomOut, Maximize, MousePointer2, Hand } from "lucide-react"
import Link from "next/link"

export default function CanvasPage() {
  const [mode, setMode] = React.useState<"select" | "hand">("select")

  return (
    <div className="fixed inset-0 bg-bg-base flex flex-col overflow-hidden z-[100]">
      {/* Canvas Header */}
      <header className="h-14 border-b border-border-default flex items-center justify-between px-6 bg-bg-surface1/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="h-4 w-px bg-border-subtle" />
          <h1 className="text-label-md font-semibold text-text-primary">Untitled Design — Infinite Canvas</h1>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex border border-border-default rounded-lg bg-bg-surface2 p-0.5">
              <button 
                onClick={() => setMode("select")}
                className={`p-1.5 rounded-md ${mode === "select" ? "bg-bg-surface3 text-text-primary" : "text-text-tertiary hover:text-text-secondary"}`}
              >
                <MousePointer2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setMode("hand")}
                className={`p-1.5 rounded-md ${mode === "hand" ? "bg-bg-surface3 text-text-primary" : "text-text-tertiary hover:text-text-secondary"}`}
              >
                <Hand className="h-4 w-4" />
              </button>
           </div>
           
           <div className="flex items-center gap-1 bg-bg-surface2 rounded-lg px-2 py-1 text-caption text-text-secondary border border-border-default ml-2">
              <button className="hover:text-text-primary transition-colors"><ZoomOut className="h-3.5 w-3.5" /></button>
              <span className="w-10 text-center">100%</span>
              <button className="hover:text-text-primary transition-colors"><ZoomIn className="h-3.5 w-3.5" /></button>
           </div>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 relative bg-dot-pattern">
        <CanvasPreview />
      </main>

      {/* Zoom / Navigation Minimap Placeholder */}
      <div className="absolute right-6 bottom-6 flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
         <div className="p-4 bg-bg-surface1/80 backdrop-blur-md border border-border-default rounded-xl shadow-2xl">
            <div className="w-32 h-20 bg-bg-surface3 rounded-lg border border-border-subtle overflow-hidden opacity-50 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-brand-default rounded-sm" />
            </div>
         </div>
         <Button size="icon" variant="outline" className="rounded-full h-12 w-12 bg-bg-surface1 shadow-xl border-border-strong">
            <Maximize className="h-5 w-5" />
         </Button>
      </div>
    </div>
  )
}
