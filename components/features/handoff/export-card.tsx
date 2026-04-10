"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Eye, Check } from "lucide-react"

export interface ExportCardProps {
  title: string
  description: string
  format: string
  onDownload: () => void
  onCopy: () => void
  onPreview: () => void
}

export function ExportCard({ 
  title, 
  description, 
  format, 
  onDownload, 
  onCopy, 
  onPreview 
}: ExportCardProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    onCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border-default bg-bg-surface1 hover:bg-bg-surface2 transition-all group overflow-hidden relative">
      <div className="flex items-start justify-between">
         <div className="space-y-1">
            <h3 className="text-body-md font-bold text-text-primary">{title}</h3>
            <p className="text-body-sm text-text-secondary leading-snug">{description}</p>
         </div>
         <Badge variant="secondary" className="uppercase text-[10px]">{format}</Badge>
      </div>

      <div className="flex items-center gap-2 pt-2">
         <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2 text-text-secondary hover:text-text-primary"
            onClick={onPreview}
         >
            <Eye className="h-3.5 w-3.5" /> Preview
         </Button>
         <div className="flex-1" />
         <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleCopy}
         >
            {copied ? <Check className="h-3.5 w-3.5 text-feedback-success" /> : <Copy className="h-3.5 w-3.5" />}
         </Button>
         <Button 
            variant="secondary" 
            size="sm" 
            className="h-8 gap-2"
            onClick={onDownload}
         >
            <Download className="h-3.5 w-3.5" /> Export
         </Button>
      </div>

      {/* Decorative Brand Accent */}
      <div className="absolute right-0 top-0 h-1 w-0 bg-brand-default transition-all group-hover:w-full" />
    </div>
  )
}

// Simple Code Previewer
export function CodePreview({ code, title, onClose }: { code: string, title: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-bg-overlay backdrop-blur-sm flex items-center justify-center p-6 sm:p-12">
       <div className="w-full max-w-4xl max-h-[80vh] bg-bg-surface1 border border-border-default rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between p-4 border-b border-border-subtle">
             <h3 className="text-label-md font-bold text-text-primary">{title}</h3>
             <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
          </div>
          <div className="flex-1 overflow-auto p-6 font-mono text-code-sm text-text-secondary bg-bg-base/50">
             <pre className="whitespace-pre-wrap">{code}</pre>
          </div>
       </div>
    </div>
  )
}
