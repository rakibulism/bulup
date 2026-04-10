"use client"

import * as React from "react"
import { 
  SegmentedControl, 
  SegmentedControlContent, 
  SegmentedControlList, 
  SegmentedControlTrigger 
} from "@/components/composed/segmented-control"
import { Copy } from "lucide-react"

export function TokenViewer({ tokens }: { tokens: any }) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <SegmentedControl defaultValue="colors">
        <SegmentedControlList className="w-full">
          <SegmentedControlTrigger value="colors" className="flex-1">Colors</SegmentedControlTrigger>
          <SegmentedControlTrigger value="typography" className="flex-1">Typography</SegmentedControlTrigger>
          <SegmentedControlTrigger value="spacing" className="flex-1">Spacing</SegmentedControlTrigger>
          <SegmentedControlTrigger value="components" className="flex-1">Components</SegmentedControlTrigger>
        </SegmentedControlList>

        <SegmentedControlContent value="colors" className="pt-6 space-y-8">
           <section className="space-y-4">
              <h4 className="text-label-sm font-bold text-text-tertiary uppercase tracking-widest">Brand Palette</h4>
              <div className="flex flex-wrap gap-2">
                 {tokens.palette.brand.map((color: string, i: number) => (
                   <div key={i} className="flex flex-col gap-1 items-center">
                      <div className="h-12 w-12 rounded-lg border border-border-default" style={{ backgroundColor: color }} />
                      <span className="text-caption text-text-tertiary font-mono">{i === 0 ? "50" : i === 9 ? "950" : (i * 100)}</span>
                   </div>
                 ))}
              </div>
           </section>

           <section className="space-y-4">
              <h4 className="text-label-sm font-bold text-text-tertiary uppercase tracking-widest">Semantic Application</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {Object.entries(tokens.semanticTokens).map(([key, val]: [string, any]) => (
                   <div key={key} className="p-3 rounded-lg border border-border-subtle bg-bg-surface1 flex items-center gap-3">
                      <div className="h-8 w-8 rounded border border-border-default" style={{ backgroundColor: val }} />
                      <div className="flex flex-col">
                        <span className="text-caption font-bold text-text-primary">{key}</span>
                        <span className="text-[10px] text-text-tertiary font-mono uppercase">{val}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </SegmentedControlContent>

        <SegmentedControlContent value="typography" className="pt-6 space-y-8">
           <div className="space-y-6">
              {Object.entries(tokens.typography.scale).map(([key, val]: [string, any]) => (
                <div key={key} className="space-y-1">
                   <div className="flex items-center justify-between">
                      <span className="text-label-sm font-bold text-text-tertiary uppercase">{key}</span>
                      <span className="text-caption text-text-tertiary font-mono">{val.size} / {val.weight}</span>
                   </div>
                   <p className="text-text-primary truncate" style={{ fontSize: val.size, fontWeight: val.weight }}>
                     The quick brown fox jumps over the lazy dog
                   </p>
                </div>
              ))}
           </div>
        </SegmentedControlContent>

        <SegmentedControlContent value="spacing" className="pt-6">
           <div className="grid grid-cols-2 gap-4">
              {tokens.spacing.scale.map((val: number, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border-subtle bg-bg-surface1">
                   <div className="bg-brand-default h-4 rounded" style={{ width: val }} />
                   <span className="text-label-md text-text-primary">{val}px</span>
                </div>
              ))}
           </div>
        </SegmentedControlContent>

        <SegmentedControlContent value="components" className="pt-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-4">
                 <h4 className="text-label-sm font-bold text-text-tertiary uppercase">Buttons</h4>
                 <div className="flex flex-wrap gap-4 items-center">
                    <button className="bg-brand-default text-white px-4 py-2 rounded-lg font-medium">Primary</button>
                    <button className="border border-border-default text-text-primary px-4 py-2 rounded-lg font-medium">Secondary</button>
                    <button className="text-text-secondary px-4 py-2 rounded-lg font-medium">Ghost</button>
                 </div>
              </section>
              <section className="space-y-4">
                 <h4 className="text-label-sm font-bold text-text-tertiary uppercase">Inputs</h4>
                 <div className="space-y-2">
                    <div className="h-10 w-full rounded border border-border-default bg-bg-surface3 px-3 flex items-center text-text-tertiary text-body-sm">
                      Placeholder...
                    </div>
                 </div>
              </section>
           </div>
        </SegmentedControlContent>
      </SegmentedControl>
    </div>
  )
}
