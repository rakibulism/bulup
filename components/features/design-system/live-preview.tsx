"use client"

import * as React from "react"
import { getContrastRatio, getWcagGrade } from "@/lib/wcag-utils"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type LivePreviewProps = {
  previewData: any;
  isLoading: boolean;
}

export function LivePreview({ previewData, isLoading }: LivePreviewProps) {
  if (!previewData) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-8 bg-black/5 rounded-xl border border-dashed border-border-default ml-8">
        <p className="text-text-tertiary text-sm">Start typing on the left to see your live preview.</p>
      </div>
    )
  }

  const { colors, typography, components } = previewData

  // Calculate contrast ratio between primary color and textMain (for buttons)
  const ratio = getContrastRatio(colors.primary[500], colors.textMain === "#F0F0F0" ? "#FFFFFF" : "#000000")
  const wcag = getWcagGrade(ratio)

  return (
    <div 
      className={cn(
        "flex-1 h-full flex flex-col p-8 rounded-xl border transition-all duration-500 overflow-y-auto ml-8 relative",
        isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
      )}
      style={{ backgroundColor: colors.bg, borderColor: colors.surface }}
    >
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="uppercase tracking-wider font-mono text-[10px]" style={{ color: colors.textMuted, borderColor: colors.textMuted }}>
            Live Preview
          </Badge>
          {isLoading && <span className="text-xs text-text-tertiary animate-pulse">Syncing...</span>}
        </div>
        
        {/* Contrast Ratio Badge */}
        <div className="flex items-center gap-2">
           <span className="text-xs" style={{ color: colors.textMuted }}>Button Contrast:</span>
           <Badge className={cn("font-mono text-xs font-bold", wcag.pass ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500")}>
             {wcag.label} ✓ ({ratio.toFixed(1)}:1)
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: UI Component Micro Preview */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest" style={{ color: colors.textMuted }}>Components</h4>
            
            <div className="p-6 rounded-lg border flex flex-col gap-4" style={{ backgroundColor: colors.surface, borderColor: `${colors.textMuted}33` }}>
               
               {/* Micro Input */}
               <div className="space-y-1.5">
                 <label style={{ color: colors.textMain, fontSize: typography.scale.label, fontFamily: typography.fontFamily }}>Email address</label>
                 <input 
                   disabled
                   placeholder="you@company.com" 
                   className="w-full border px-3 placeholder:opacity-50 outline-none"
                   style={{ 
                     height: components.inputHeight, 
                     borderRadius: components.buttonRadius, 
                     backgroundColor: colors.bg, 
                     borderColor: `${colors.textMuted}44`,
                     color: colors.textMain,
                     fontFamily: typography.fontFamily,
                     fontSize: typography.scale.body
                   }}
                 />
               </div>

               {/* Micro Button */}
               <button 
                  className="w-full flex items-center justify-center font-medium transition-transform active:scale-95"
                  style={{ 
                    height: components.inputHeight, 
                    borderRadius: components.buttonRadius, 
                    backgroundColor: colors.primary[500],
                    color: colors.textMain === "#F0F0F0" ? "#FFFFFF" : "#000000",
                    fontFamily: typography.fontFamily,
                    fontSize: typography.scale.body
                  }}
               >
                 Get Started
               </button>

               {/* Micro Badge */}
               <div className="flex items-center justify-center pt-2">
                 <span 
                   className="px-2.5 py-1 text-xs font-medium"
                   style={{ 
                     borderRadius: components.buttonRadius, 
                     backgroundColor: components.badgeBg, 
                     color: colors.primary[500],
                     fontFamily: typography.fontFamily
                   }}
                 >
                   New Feature
                 </span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Colors & Typography */}
        <div className="space-y-10">
          
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest" style={{ color: colors.textMuted }}>Primary Tints</h4>
            <div className="flex bg-black/5 rounded-lg overflow-hidden h-12">
               {["100", "300", "500", "700", "900"].map((tint) => (
                 <div key={tint} className="flex-1 relative group" style={{ backgroundColor: colors.primary[tint] }}>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                     <span className="text-[10px] text-white font-mono font-bold">{tint}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest" style={{ color: colors.textMuted }}>Typography Scale</h4>
            <div className="space-y-4" style={{ fontFamily: typography.fontFamily, color: colors.textMain }}>
              <div>
                <span className="text-[10px] uppercase font-mono block mb-1" style={{ color: colors.textMuted }}>Display ({typography.scale.display})</span>
                <div style={{ fontSize: typography.scale.display, lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.03em" }}>Ag</div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono block mb-1" style={{ color: colors.textMuted }}>Heading ({typography.scale.heading})</span>
                <div style={{ fontSize: typography.scale.heading, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.02em" }}>The quick brown fox</div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono block mb-1" style={{ color: colors.textMuted }}>Body ({typography.scale.body})</span>
                <div style={{ fontSize: typography.scale.body, lineHeight: 1.6, fontWeight: 400 }}>Jumps over the lazy dog perfectly matching the brand's tone.</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
