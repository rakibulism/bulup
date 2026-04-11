"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckSquare } from "lucide-react"

export function ExportPanel() {
  const [copied, setCopied] = React.useState<string | null>(null)

  const handleCopy = (type: string) => {
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
    // Normally navigator.clipboard.writeText(...)
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="space-y-4">
         <h2 className="text-heading-md font-bold text-text-primary">Export Your Design System</h2>
         <p className="text-body-sm text-text-secondary">Specific exports tailored to developers and designers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Left Side: Checkboxes */}
         <div className="border border-border-default rounded-xl bg-bg-base overflow-hidden">
            <div className="p-4 border-b border-border-default bg-bg-surface1">
               <h3 className="text-label-sm font-bold">Files to Export</h3>
            </div>
            
            <div className="p-6 space-y-8">
               <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h4 className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold">Design Handoff (Figma)</h4>
                    <Badge variant="outline" className="text-[9px] uppercase font-mono opacity-50">v1.2</Badge>
                 </div>
                 <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="text-brand-text"><CheckSquare className="h-5 w-5" /></div>
                      <div>
                         <span className="text-body-sm text-text-primary group-hover:text-brand-text transition-colors">Figma Variable Structure (.md)</span>
                         <p className="text-[10px] text-text-tertiary">Optimized for Figma Tokens Studio</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="text-brand-text"><CheckSquare className="h-5 w-5" /></div>
                      <div>
                         <span className="text-body-sm text-text-primary group-hover:text-brand-text transition-colors">Component Architecture Spec (.md)</span>
                         <p className="text-[10px] text-text-tertiary">Full property & state documentation</p>
                      </div>
                    </label>
                 </div>
               </div>

               <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h4 className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold">DevOps & Engineering</h4>
                    <Badge variant="outline" className="text-[9px] uppercase font-mono opacity-50">Sync Enabled</Badge>
                 </div>
                 <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="text-brand-text"><CheckSquare className="h-5 w-5" /></div>
                      <div>
                         <span className="text-body-sm text-text-primary group-hover:text-brand-text transition-colors">Tailwind CSS Variable Config (.js)</span>
                         <p className="text-[10px] text-text-tertiary">Deep integration with tailwind-merge</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="text-brand-text"><CheckSquare className="h-5 w-5" /></div>
                      <div>
                         <span className="text-body-sm text-text-primary group-hover:text-brand-text transition-colors">Design Tokens Protocol (.json)</span>
                         <p className="text-[10px] text-text-tertiary">W3C format compatible</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="text-brand-text"><CheckSquare className="h-5 w-5" /></div>
                      <div>
                         <span className="text-body-sm text-text-primary group-hover:text-brand-text transition-colors">TypeScript Type Constants (.ts)</span>
                         <p className="text-[10px] text-text-tertiary">Strictly typed theme keys</p>
                      </div>
                    </label>
                 </div>
               </div>

               <div className="space-y-3">
                 <h4 className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold">Accessibility Report</h4>
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="text-brand-text"><CheckSquare className="h-5 w-5" /></div>
                   <span className="text-body-sm text-text-primary group-hover:text-brand-text transition-colors">Contrast audit + fixes (.md)</span>
                 </label>
               </div>
            </div>

            <div className="p-4 border-t border-border-default bg-bg-surface1 flex gap-3">
                <Button className="flex-1">Export Selected (.zip)</Button>
                <Button variant="secondary" className="flex-1">Export All</Button>
            </div>
         </div>

         {/* Right Side: Quick Copy */}
         <div className="space-y-6">
            <h3 className="text-label-sm font-bold flex items-center gap-4">
              <span className="flex-1 h-px bg-border-default" /> 
              <span className="text-text-tertiary uppercase text-[10px] tracking-widest">or Quick Copy</span>
              <span className="flex-1 h-px bg-border-default" /> 
            </h3>

            <div className="p-6 border border-border-default rounded-xl bg-bg-surface1 flex flex-col gap-4 text-center items-center justify-center min-h-[200px]">
               <p className="text-body-sm text-text-secondary w-3/4">For developers who want to skip the download process and get straight to building.</p>
               
               <div className="flex flex-col w-full gap-3 mt-2">
                 <Button 
                   variant="outline" 
                   className="w-full justify-between"
                   onClick={() => handleCopy("css")}
                 >
                   Copy CSS Variables
                   <span className="text-xs opacity-50">{copied === "css" ? "Copied!" : "→"}</span>
                 </Button>
                 
                 <Button 
                   variant="outline" 
                   className="w-full justify-between"
                   onClick={() => handleCopy("tailwind")}
                 >
                   Copy Tailwind Config
                   <span className="text-xs opacity-50">{copied === "tailwind" ? "Copied!" : "→"}</span>
                 </Button>

                 <Button 
                   variant="outline" 
                   className="w-full justify-between"
                   onClick={() => handleCopy("ts")}
                 >
                   Copy TypeScript Tokens
                   <span className="text-xs opacity-50">{copied === "ts" ? "Copied!" : "→"}</span>
                 </Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
