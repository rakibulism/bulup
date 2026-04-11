"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/organisms/confirm-modal"
import { Button } from "@/components/ui/button"
import { FlowMindmapCanvas, MindmapNode } from "./flow-mindmap"
import { cn } from "@/lib/utils"
import { Info, LayoutTemplate } from "lucide-react"

interface TemplatePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  template: {
    title: string
    desc: string
    nodes: MindmapNode[]
  } | null
}

export function TemplatePreviewModal({
  isOpen,
  onClose,
  onConfirm,
  template
}: TemplatePreviewModalProps) {
  if (!template) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0 overflow-hidden bg-bg-base border-border-default shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 border-b border-border-subtle bg-bg-surface1 shrink-0">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-brand-default/10 flex items-center justify-center text-brand-text">
                <LayoutTemplate className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-bold tracking-tight">{template.title}</DialogTitle>
                <p className="text-body-sm text-text-secondary">{template.desc}</p>
              </div>
            </div>
          </DialogHeader>

          {/* Canvas Viewport */}
          <div className="flex-1 relative bg-bg-base group cursor-grab active:cursor-grabbing">
            <div className="absolute inset-0 z-0">
              <FlowMindmapCanvas 
                initialNodes={template.nodes} 
                readOnly={true} 
              />
            </div>
            
            {/* Overlay hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 bg-bg-surface1/80 backdrop-blur-md rounded-full border border-border-subtle shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
               <Info className="h-4 w-4 text-brand-text" />
               <span className="text-[11px] font-bold uppercase tracking-wider text-text-primary">Drag to explore the structure</span>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="p-6 border-t border-border-subtle bg-bg-surface1 shrink-0">
            <div className="flex items-center justify-between w-full">
               <p className="text-caption text-text-tertiary">
                 Structure will be imported as a live editable flow.
               </p>
               <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={onClose} className="rounded-xl px-6">
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={onConfirm}
                  className="rounded-xl px-8 bg-brand-default text-text-primary shadow-lg shadow-brand-default/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Use this template
                </Button>
               </div>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
