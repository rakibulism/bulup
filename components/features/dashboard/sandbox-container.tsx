"use client"

import * as React from "react"
import { 
  Plus, 
  Smartphone, 
  Globe, 
  Palette, 
  Bot, 
  Mic, 
  ArrowUpRight, 
  Figma 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { 
  SegmentedControl, 
  SegmentedControlList, 
  SegmentedControlTrigger 
} from "@/components/composed/segmented-control"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function SandboxContainer() {
  const [platform, setPlatform] = React.useState("web")
  const [prompt, setPrompt] = React.useState("")

  return (
    <div className="w-full bg-bg-surface1 border border-border-default rounded-2xl p-4 shadow-xl shadow-black/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between mb-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <IconButton icon={<Plus className="h-4 w-4" />} variant="ghost" size="sm" />
          <div className="h-4 w-px bg-border-subtle mx-1" />
          <SegmentedControl value={platform} onValueChange={setPlatform}>
            <SegmentedControlList className="p-1 h-9 bg-bg-surface2">
              <SegmentedControlTrigger value="mobile" className="gap-2 px-3">
                <Smartphone className="h-3.5 w-3.5" /> Mobile
              </SegmentedControlTrigger>
              <SegmentedControlTrigger value="web" className="gap-2 px-3">
                <Globe className="h-3.5 w-3.5" /> Web
              </SegmentedControlTrigger>
            </SegmentedControlList>
          </SegmentedControl>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2 text-text-secondary hover:text-text-primary">
            <Palette className="h-4 w-4" />
            <span>Modern Dark</span>
          </Button>
          <div className="h-4 w-px bg-border-subtle mx-1" />
          <IconButton icon={<Figma className="h-4 w-4" />} variant="ghost" size="sm" />
        </div>
      </div>

      {/* Main Input Area */}
      <div className="relative mb-4">
        <textarea
          placeholder="Describe your design objective or paste a reference..."
          className="w-full min-h-[120px] bg-transparent text-body-lg text-text-primary placeholder:text-text-tertiary focus:outline-none resize-none pt-2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Bottom Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 rounded-full border-border-strong bg-bg-surface2 text-text-secondary">
             <Bot className="h-4 w-4" />
             <span>Claude 3.5 Sonnet</span>
          </Button>
          <IconButton 
            icon={<Mic className="h-4 w-4" />} 
            variant="ghost" 
            size="sm" 
            className="text-text-tertiary hover:text-brand-text active:scale-90 transition-all"
          />
        </div>

        <Link href="/canvas">
          <button 
            disabled={!prompt.trim()}
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg",
              prompt.trim() 
                ? "bg-brand-default text-text-primary hover:scale-105 hover:rotate-12 shadow-brand-default/20" 
                : "bg-bg-surface2 text-text-tertiary opacity-50 shadow-none"
            )}
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  )
}
