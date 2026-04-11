"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type StudioSidebarProps = {
  onGenerate: () => void;
  isGenerating: boolean;
  value: any;
  onChange: (value: any) => void;
}

const TONES = [
  "Professional", "Technical", "Trustworthy", "Minimal", 
  "Warm", "Fast", "Bold", "Sharp", 
  "Clean", "Playful", "Luxurious", "Innovative"
]

export function StudioSidebar({ onGenerate, isGenerating, value, onChange }: StudioSidebarProps) {
  const toggleTone = (tone: string) => {
    const current = value.tones || []
    if (current.includes(tone)) {
      onChange({ ...value, tones: current.filter((t: string) => t !== tone) })
    } else if (current.length < 4) {
      onChange({ ...value, tones: [...current, tone] })
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-[320px] shrink-0 border-r border-border-default pr-8 pb-8 h-full overflow-y-auto">
      {/* Section A: Identity */}
      <div className="space-y-4">
        <h3 className="text-label-sm text-text-secondary uppercase tracking-wider font-semibold">Identity</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
             <Label>Product Name</Label>
             <Input 
               value={value.name || ""} 
               onChange={(e) => onChange({ ...value, name: e.target.value })} 
               placeholder="e.g. Acme Corp" 
             />
          </div>
          <div className="space-y-1.5">
             <Label>Product Type</Label>
             <Select value={value.type} onValueChange={(t) => onChange({ ...value, type: t })}>
               <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
               <SelectContent>
                 {["SaaS", "Mobile App", "Marketing Site", "E-commerce", "Dashboard", "Developer Tool"].map((v) => (
                   <SelectItem key={v} value={v}>{v}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
          </div>
        </div>
      </div>

      {/* Section B: Brand Personality */}
      <div className="space-y-4">
        <h3 className="text-label-sm text-text-secondary uppercase tracking-wider font-semibold">Personality (Max 4)</h3>
        <div className="flex flex-wrap gap-2">
          {TONES.map(tone => {
            const isSelected = (value.tones || []).includes(tone)
            return (
              <button
                key={tone}
                onClick={() => toggleTone(tone)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-caption transition-colors border",
                  isSelected 
                    ? "bg-brand-default text-white border-brand-default" 
                    : "bg-bg-surface2 text-text-secondary border-border-default hover:border-brand-default/40"
                )}
              >
                {tone}
              </button>
            )
          })}
        </div>
      </div>

      {/* Section C: Audience */}
      <div className="space-y-4">
        <h3 className="text-label-sm text-text-secondary uppercase tracking-wider font-semibold">Audience</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
             <Label>Who uses this?</Label>
             <Input 
               value={value.audienceWho || ""} 
               onChange={(e) => onChange({ ...value, audienceWho: e.target.value })} 
               placeholder="e.g. Enterprise developers" 
             />
          </div>
          <div className="space-y-1.5">
             <Label>What do they value?</Label>
             <Input 
               value={value.audienceValue || ""} 
               onChange={(e) => onChange({ ...value, audienceValue: e.target.value })} 
               placeholder="e.g. Speed and reliability" 
             />
          </div>
        </div>
      </div>

      {/* Section D: Visual Direction */}
      <div className="space-y-4">
        <h3 className="text-label-sm text-text-secondary uppercase tracking-wider font-semibold">Visual Direction</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
             <Label>Closest Reference</Label>
             <Select value={value.reference} onValueChange={(r) => onChange({ ...value, reference: r })}>
               <SelectTrigger><SelectValue placeholder="Select reference..." /></SelectTrigger>
               <SelectContent>
                 {["Linear", "Vercel", "Stripe", "Notion", "Raycast", "Figma", "Arc", "GitHub", "Other"].map((v) => (
                   <SelectItem key={v} value={v}>{v}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
          </div>
          
          <div className="space-y-1.5">
             <Label>Color Preference</Label>
             <Select value={value.colorPrefs} onValueChange={(c) => onChange({ ...value, colorPrefs: c })}>
               <SelectTrigger><SelectValue placeholder="Select color preference..." /></SelectTrigger>
               <SelectContent>
                 {["Neutral", "Cool", "Warm", "High contrast", "Brand blue", "Custom"].map((v) => (
                   <SelectItem key={v} value={v}>{v}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
          </div>

          <div className="space-y-1.5 flex flex-col gap-2 pt-2">
            <Label>Mode</Label>
            <div className="flex bg-bg-surface2 rounded-lg p-1">
              {["Light only", "Dark only", "Both"].map((m) => (
                <button
                  key={m}
                  onClick={() => onChange({ ...value, mode: m })}
                  className={cn(
                    "flex-1 py-1.5 text-caption rounded-md font-medium transition-colors",
                    value.mode === m ? "bg-bg-surface1 text-text-primary shadow-sm" : "text-text-tertiary hover:text-text-secondary"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-text-tertiary text-center">Both is recommended</span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <Button 
          onClick={onGenerate} 
          disabled={isGenerating || !value.name} 
          className="w-full bg-text-primary text-bg-base hover:bg-text-secondary"
        >
          {isGenerating ? "Generating..." : "Generate Design System"}
        </Button>
      </div>
    </div>
  )
}
