"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ExportPanel } from "./export-panel"

export type ReviewWorkspaceProps = {
  resultData: any; 
  onReset: () => void;
}

export function ReviewWorkspace({ resultData, onReset }: ReviewWorkspaceProps) {
  // A mock representation of the generated token data
  return (
    <div className="flex flex-col h-full bg-bg-surface1 rounded-xl border border-border-default overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      
      <Tabs defaultValue="colors" className="flex flex-col h-full">
        <div className="border-b border-border-default bg-bg-surface2 px-4 py-2 flex items-center justify-between shrink-0">
           <TabsList className="bg-transparent h-10 p-0 gap-6">
             <TabsTrigger value="colors" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full">Colors</TabsTrigger>
             <TabsTrigger value="typography" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full">Typography</TabsTrigger>
             <TabsTrigger value="spacing" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full">Spacing</TabsTrigger>
             <TabsTrigger value="components" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full">Components</TabsTrigger>
             <TabsTrigger value="export" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full text-brand-text">Export</TabsTrigger>
           </TabsList>
           <button onClick={onReset} className="text-label-sm text-text-tertiary hover:text-text-primary px-3 transition-colors">Start Over</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 relative">
           <TabsContent value="colors" className="m-0 space-y-12 h-full">
              {/* Tab: Colors */}
              <div className="space-y-4">
                 <h2 className="text-heading-md font-bold text-text-primary">Color System</h2>
                 <p className="text-body-sm text-text-secondary">Primitive palette, semantic tokens, and automated WCAG auditing.</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="p-6 border border-border-default rounded-xl bg-bg-base space-y-6">
                    <h3 className="text-label-sm uppercase text-text-tertiary font-bold tracking-widest">Primary Palette</h3>
                    <div className="flex bg-black/20 h-16 rounded-lg overflow-hidden">
                       {["100", "200", "300", "400", "500", "600", "700", "800", "900"].map((shade, i) => (
                         <div key={shade} className="flex-1 transition-colors" style={{ backgroundColor: `hsl(255, 60%, ${90 - i * 8}%)` }} />
                       ))}
                    </div>
                 </div>

                 <div className="p-6 border border-border-default rounded-xl bg-bg-base space-y-6">
                    <h3 className="text-label-sm uppercase text-text-tertiary font-bold tracking-widest flex items-center justify-between">
                       Accessibility Audit
                       <Badge variant="brand" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">3 Passed, 1 Flagged</Badge>
                    </h3>
                    <ul className="space-y-3">
                       <li className="flex items-center justify-between text-body-sm">
                         <span className="text-text-secondary">Primary text on BG</span>
                         <span className="text-emerald-500 font-mono">✓ AA (7.2:1)</span>
                       </li>
                       <li className="flex items-center justify-between text-body-sm">
                         <span className="text-text-secondary">Secondary text on BG</span>
                         <span className="text-emerald-500 font-mono">✓ AA (4.6:1)</span>
                       </li>
                       <li className="flex items-center justify-between text-body-sm bg-red-500/5 p-2 rounded -mx-2 border border-red-500/10">
                         <div>
                            <span className="text-text-primary block">Muted text on surface</span>
                            <button className="text-brand-text text-[10px] uppercase font-bold mt-1">Forge suggests: darken by 15%</button>
                         </div>
                         <span className="text-red-400 font-mono">✗ Fail (2.8:1)</span>
                       </li>
                    </ul>
                 </div>
              </div>
           </TabsContent>

           <TabsContent value="typography" className="m-0 h-full flex items-center justify-center text-text-tertiary">
              {/* Other tabs are mocked for the preview structure */}
              <p>Typography Scale rendering area. (Sample Text Editable)</p>
           </TabsContent>

           <TabsContent value="spacing" className="m-0 h-full flex items-center justify-center text-text-tertiary">
              <p>Spacing Rhythm Ruler</p>
           </TabsContent>

           <TabsContent value="components" className="m-0 h-full flex items-center justify-center text-text-tertiary">
              <p>Live Component Preview (8 states matrix)</p>
           </TabsContent>

           <TabsContent value="export" className="m-0 h-full">
              <ExportPanel />
           </TabsContent>
        </div>
      </Tabs>

    </div>
  )
}
