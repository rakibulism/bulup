"use client"

import * as React from "react"
import { AppHeader } from "@/components/layout/app-header"
import { ExportCard, CodePreview } from "@/components/features/handoff/export-card"
import { generatePRD, generateUXSpecs, generateDecisionLog } from "@/lib/exporters/markdown"
import { generateCSS, generateTailwind } from "@/lib/exporters/design-tokens"
import { Download, FileText, Code2, ScrollText, Layers } from "lucide-react"

// Mock product data for handoff demo
const MOCK_PRODUCT = {
  name: "Nebula CRM",
  architecture: {
    concept: "Unified relationship manager for deep space shipping agencies.",
    problemStatement: "Fragmented communication across star systems leads to shipping delays.",
    targetAudience: ["System Admirals", "Fleet Controllers"],
    mvpScope: "Real-time fleet tracking and automated sub-space reporting.",
    coreFeatures: [
      { name: "Warp Tracker", description: "Real-time location of all active vessels.", priority: "High" },
      { name: "Sub-space Comms", description: "Direct messaging with fleet commanders.", priority: "High" }
    ],
    futureRoadmap: ["AI Auto-pilot integration", "Trading post module"]
  },
  flows: [
    {
      name: "Fleet Onboarding",
      type: "ONBOARDING",
      screens: [
        { 
          name: "Welcome Screen", 
          purpose: "Introduction to the Nebula interface.", 
          primaryAction: "Connect Fleet", 
          components: ["Button", "IntroVideo"],
          states: { default: "Show orbital view", loading: "Syncing satellites...", empty: "No ships connected", error: "Signal interference", success: "Fleet synced!" },
          transition: "Fleet Connection Dashboard"
        }
      ]
    }
  ],
  designTokens: {
    palette: {
      brand: ["#0a0817", "#14102e", "#1e1845", "#28205c", "#322873", "#3c308a", "#4a3caf", "#6455c2", "#7f71d5", "#9a8ee8"],
      neutral: ["#0c0c0c", "#111111", "#1a1a1a", "#222222", "#2a2a2a", "#383838", "#525252", "#737373", "#a3a3a3", "#e5e5e5"]
    },
    semanticTokens: {
      brandDefault: "#4a3caf",
      brandSubtle: "#14102e",
      bgBase: "#0c0c0c",
      textPrimary: "#f0f0f0"
    },
    spacing: { base: 4, scale: [4, 8, 12, 16, 24, 32, 48, 64] },
    radius: { sm: "4px", md: "8px", lg: "12px", xl: "16px" }
  }
}

export default function HandoffPage() {
  const [previewCode, setPreviewCode] = React.useState<{ title: string, code: string } | null>(null)

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const categories = [
    {
      title: "Product Strategy",
      items: [
        { 
          title: "PRD Documentation", 
          description: "Full product requirements, concept, and core features.", 
          format: "MD", 
          content: generatePRD(MOCK_PRODUCT) 
        },
        { 
          title: "Decision Log", 
          description: "Historical record of every strategic and architectural choice.", 
          format: "MD", 
          content: generateDecisionLog([]) 
        }
      ]
    },
    {
      title: "Experience Design",
      items: [
        { 
          title: "UX Flow Specs", 
          description: "Screen-by-screen breakdown of all user journeys and states.", 
          format: "MD", 
          content: generateUXSpecs(MOCK_PRODUCT) 
        }
      ]
    },
    {
      title: "Dev Assets",
      items: [
        { 
          title: "CSS Variables", 
          description: "Full :root palette and semantic design tokens.", 
          format: "CSS", 
          content: generateCSS(MOCK_PRODUCT.designTokens) 
        },
        { 
          title: "Tailwind Config", 
          description: "Theme extension snippet for tailwind.config.ts.", 
          format: "JS", 
          content: generateTailwind(MOCK_PRODUCT.designTokens) 
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto w-full">
      <AppHeader title="Handoff Center" />

      {categories.map((cat, i) => (
        <section key={i} className="space-y-6">
           <div className="flex items-center gap-2 px-2">
             <h3 className="text-label-sm font-bold text-text-tertiary uppercase tracking-widest">{cat.title}</h3>
             <div className="h-px flex-1 bg-border-subtle ml-2" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.items.map((item, j) => (
                <ExportCard 
                  key={j}
                  title={item.title}
                  description={item.description}
                  format={item.format}
                  onPreview={() => setPreviewCode({ title: item.title, code: item.content })}
                  onCopy={() => handleCopy(item.content)}
                  onDownload={() => handleDownload(item.content, `${item.title.toLowerCase().replace(/\s+/g, '-')}.${item.format.toLowerCase()}`)}
                />
              ))}
           </div>
        </section>
      ))}

      {previewCode && (
        <CodePreview 
          title={previewCode.title} 
          code={previewCode.code} 
          onClose={() => setPreviewCode(null)} 
        />
      )}
    </div>
  )
}
