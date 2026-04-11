"use client"

import * as React from "react"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ProgressList } from "@/components/composed/progress-list"
import { ArchitectureViewer } from "@/components/features/workshop/architecture-viewer"
import { useArchitectureStream, ProgressStep } from "@/hooks/use-architecture-stream"
import { saveProduct } from "@/lib/actions/products"
import { Sparkles, Save, RotateCcw } from "lucide-react"

export default function WorkshopPage() {
  const [brief, setBrief] = React.useState("")
  const { generate, status, progress, result, reset } = useArchitectureStream()
  const [isSaving, setIsSaving] = React.useState(false)

  const handleBulup = () => {
    if (brief.trim().length < 20) return
    generate(brief)
  }

  const handleSave = async () => {
    if (!result) return
    setIsSaving(true)
    try {
      const res = await saveProduct({
        name: result.productName,
        brief: brief,
        architecture: result
      })
      if (res.success) {
        window.location.href = "/dashboard"
      } else {
        alert("Failed to save product: " + res.error)
      }
    } finally {
      setIsSaving(false)
    }
  }

  // Create steps for ProgressList from the streaming string
  const currentProgressSteps = [
    { id: "1", label: "Understanding your idea", status: "completed" as const },
    { id: "2", label: "Defining user roles", status: "completed" as const },
    { id: "3", label: "Mapping core features", status: "completed" as const },
    { id: "4", label: "Building your architecture", status: "loading" as const },
  ].filter((_, i) => i < 4) // This is just a visual mock for the demo, in real it should come from the hook

  return (
    <div className="flex flex-col gap-8">
      <AppHeader 
        title="Idea Workshop" 
        actions={
          status === "success" && (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving} className="gap-2 bg-brand-default">
                {isSaving ? <Spinner size="sm" /> : <Save className="h-4 w-4" />}
                Save Product
              </Button>
            </div>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Input */}
        <div className={cn(
          "lg:col-span-5 space-y-6 transition-all duration-500",
          status === "success" ? "opacity-40 pointer-events-none" : "opacity-100"
        )}>
          <div className="space-y-2">
            <h3 className="text-heading-md font-semibold text-text-primary">What are you building?</h3>
            <p className="text-body-sm text-text-secondary">
              The more detail you provide, the better the architecture. Describe target users, core actions, and the problems you solve.
            </p>
          </div>

          <div className="relative">
            <textarea
              className="flex min-h-[400px] w-full rounded-xl border border-border-default bg-bg-surface1 px-6 py-4 text-body-md text-text-primary ring-offset-bg-base placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default resize-none"
              placeholder="Ex: A collaborative platform for gardeners to share soil data and plant growth timelines..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              disabled={status === "loading"}
              maxLength={2000}
            />
            <div className="absolute bottom-4 right-4 text-caption text-text-tertiary">
              {brief.length} / 2000
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full gap-3 shadow-xl h-12" 
            onClick={handleBulup}
            disabled={brief.trim().length < 20 || status === "loading"}
          >
            {status === "loading" ? <Spinner size="sm" /> : <Sparkles className="h-5 w-5" />}
            {status === "loading" ? "Generating Product Architecture..." : "Bulup Product Architecture"}
          </Button>
        </div>

        {/* Right Side: Output */}
        <div className="lg:col-span-7 flex flex-col">
          {status === "idle" && (
            <div className="flex flex-col items-center justify-center text-center p-12 rounded-xl border border-dashed border-border-subtle bg-bg-surface1/30 min-h-[500px]">
              <div className="h-16 w-16 rounded-full bg-bg-surface2 flex items-center justify-center text-text-tertiary mb-6">
                 <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-heading-md font-semibold text-text-primary mb-2">Ready to Bulup</h3>
              <p className="text-body-sm text-text-secondary max-w-xs">
                Enter your product brief on the left. Bulup AI will generate a complete structural blueprint for you.
              </p>
            </div>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center justify-center p-12 min-h-[500px] animate-in fade-in duration-500">
               <div className="space-y-8 w-full max-w-sm">
                  <div className="flex flex-col items-center gap-4 mb-8">
                     <Spinner size="lg" className="text-brand-text" />
                     <p className="text-heading-sm font-semibold text-text-primary">{progress}</p>
                  </div>
                  <ProgressList steps={[
                     { id: "1", label: "Analyzing brief", status: "completed" },
                     { id: "2", label: "Mapping user roles", status: "loading" },
                     { id: "3", label: "Defining MVP scope", status: "pending" },
                     { id: "4", label: "Assembling architecture", status: "pending" },
                  ]} />
               </div>
            </div>
          )}

          {status === "success" && result && (
            <ArchitectureViewer result={result} />
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center p-12 text-center min-h-[500px]">
               <div className="h-12 w-12 rounded-full bg-feedback-errorSubtle flex items-center justify-center text-feedback-error mb-4">
                  !
               </div>
               <h3 className="text-heading-md font-semibold text-text-primary mb-2">Generation Failed</h3>
               <p className="text-body-sm text-text-secondary mb-6 max-w-sm">
                  We encountered an error while trying to architect your product. Please try again.
               </p>
               <Button variant="secondary" onClick={reset}>Try Again</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Utility for cn if not available in this file scope (though it should be from lib/utils)
import { cn } from "@/lib/utils"
