"use client"

import * as React from "react"
import { AppHeader } from "@/components/layout/app-header"
import { Spinner } from "@/components/ui/spinner"
import { StudioSidebar } from "@/components/features/design-system/studio-sidebar"
import { LivePreview } from "@/components/features/design-system/live-preview"
import { ReviewWorkspace } from "@/components/features/design-system/review-workspace"
import { persistDesignSystem } from "@/lib/actions/design-system"

type SystemState = "INPUT" | "GENERATING" | "REVIEW"

export default function DesignSystemPage() {
  const [stage, setStage] = React.useState<SystemState>("INPUT")
  
  const [brandData, setBrandData] = React.useState({
    name: "",
    type: "",
    tones: [] as string[],
    audienceWho: "",
    audienceValue: "",
    reference: "",
    colorPrefs: "",
    mode: "Both"
  })

  const [previewData, setPreviewData] = React.useState<any>(null)
  const [isPreviewLoading, setIsPreviewLoading] = React.useState(false)
  const [generationProgress, setGenerationProgress] = React.useState("")
  const [finalData, setFinalData] = React.useState<any>(null)

  // Debounced Live Preview
  React.useEffect(() => {
    if (!brandData.name && brandData.tones.length === 0 && !brandData.colorPrefs) {
      setPreviewData(null)
      return
    }

    setIsPreviewLoading(true)
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch("/api/generate/design-system-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(brandData)
        })
        const data = await res.json()
        setPreviewData(data)
      } catch (err) {
        console.error("Preview failed:", err)
      } finally {
        setIsPreviewLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [brandData])

  // Full Generation Handler
  const handleGenerate = async () => {
    setStage("GENERATING")
    setGenerationProgress("Extracting brand DNA...")
    try {
      const res = await fetch("/api/generate/design-system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandData)
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error("No readable stream")

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6)
            if (!dataStr) continue
            try {
              const data = JSON.parse(dataStr)
              if (data.message) setGenerationProgress(data.message)
              // If it has structure instead of just message, it's the final result
              if (data.colors || data.exports) {
                setFinalData(data)
              }
            } catch (e) {}
          }
        }
      }
      setStage("REVIEW")
    } catch (err) {
      console.error(err)
      setStage("INPUT")
    }
  }

  const handleReset = () => {
    setBrandData({
      name: "", type: "", tones: [], audienceWho: "", audienceValue: "", reference: "", colorPrefs: "", mode: "Both"
    })
    setPreviewData(null)
    setStage("INPUT")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-32px)]">
      <AppHeader title="Design System Studio" />

      <div className="flex flex-1 overflow-hidden pt-6">
        
        {stage === "INPUT" && (
          <>
            <StudioSidebar 
              value={brandData} 
              onChange={setBrandData} 
              onGenerate={handleGenerate} 
              isGenerating={false} 
            />
            <LivePreview 
              previewData={previewData} 
              isLoading={isPreviewLoading} 
            />
          </>
        )}

        {stage === "GENERATING" && (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-bg-surface1 rounded-xl border border-border-default">
             <div className="flex flex-col items-center gap-6 text-center animate-in zoom-in-95 duration-700">
                <Spinner size="lg" className="text-brand-text" />
                <div className="space-y-1">
                   <p className="text-heading-md font-semibold text-text-primary">{generationProgress}</p>
                   <p className="text-body-sm text-text-secondary">Claude is constructing your brand's visual DNA...</p>
                </div>
             </div>
          </div>
        )}

        {stage === "REVIEW" && (
          <div className="w-full h-full">
             <ReviewWorkspace resultData={finalData} onReset={handleReset} />
          </div>
        )}
        
      </div>
    </div>
  )
}
