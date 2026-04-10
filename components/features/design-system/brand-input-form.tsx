"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Palette } from "lucide-react"

export interface BrandInputs {
  name: string
  personality: string
  audience: string
  aesthetic: string
}

export function BrandInputForm({ 
  onSubmit, 
  isLoading 
}: { 
  onSubmit: (data: BrandInputs) => void,
  isLoading: boolean 
}) {
  const [data, setData] = React.useState<BrandInputs>({
    name: "",
    personality: "",
    audience: "",
    aesthetic: "minimalist"
  })

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto py-12">
      <div className="text-center space-y-2">
        <h2 className="text-display-lg font-bold text-text-primary">Define your Brand DNA</h2>
        <p className="text-body-lg text-text-secondary">Forge turns your vision into a precise design system.</p>
      </div>

      <div className="space-y-6 bg-bg-surface1 p-8 rounded-2xl border border-border-default">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-label-sm font-semibold text-text-primary">Product Name</label>
            <Input 
              value={data.name} 
              onChange={(e) => setData({ ...data, name: e.target.value })} 
              placeholder="e.g. Nebula CRM"
            />
          </div>

          <div className="space-y-2">
            <label className="text-label-sm font-semibold text-text-primary">Personality (max 5 words)</label>
            <Input 
              value={data.personality} 
              onChange={(e) => setData({ ...data, personality: e.target.value })} 
              placeholder="e.g. precise, serious, focused, fast"
            />
          </div>

          <div className="space-y-2">
            <label className="text-label-sm font-semibold text-text-primary">Target Audience</label>
            <Input 
              value={data.audience} 
              onChange={(e) => setData({ ...data, audience: e.target.value })} 
              placeholder="e.g. creative agencies"
            />
          </div>

          <div className="space-y-2">
            <label className="text-label-sm font-semibold text-text-primary">Aesthetic Reference</label>
            <select 
              className="w-full bg-bg-surface3 border border-border-default rounded-md px-3 py-2 text-body-md text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-default"
              value={data.aesthetic}
              onChange={(e) => setData({ ...data, aesthetic: e.target.value })}
            >
              <option value="minimalist">Minimalist</option>
              <option value="brutalist">Brutalist</option>
              <option value="playful">Playful</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full gap-2 shadow-xl" 
          onClick={() => onSubmit(data)}
          disabled={isLoading || !data.name || !data.personality}
        >
          {isLoading ? "Generating Design System..." : "Forge Design System"}
          {!isLoading && <Sparkles className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}
