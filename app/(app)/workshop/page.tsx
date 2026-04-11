"use client"

import * as React from "react"
import Link from "next/link"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ProgressList } from "@/components/composed/progress-list"
import { ArchitectureViewer } from "@/components/features/workshop/architecture-viewer"
import { RefinementInput } from "@/components/features/workshop/refinement-input"
import { useArchitectureStream, ProgressStep } from "@/hooks/use-architecture-stream"
import { saveProduct } from "@/lib/actions/products"
import { Sparkles, Save, RotateCcw, ArrowLeft, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function WorkshopPage() {
  const [brief, setBrief] = React.useState("")
  const [productName, setProductName] = React.useState("")
  const [isNamingProduct, setIsNamingProduct] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  
  const { generate, status, progress, result, reset } = useArchitectureStream()

  // Sync product name with result when it first arrives
  React.useEffect(() => {
    if (result?.productName && !productName) {
      setProductName(result.productName)
    }
  }, [result, productName])

  const handleBulup = () => {
    if (brief.trim().length < 20) return
    generate(brief)
  }

  const handleRefine = (text: string) => {
    // Frontend-only mock for refinement interaction
    console.log("Refining with:", text)
    // In a real app, this would trigger a new generation with the history
  }

  const handleFinalSave = async () => {
    if (!result) return
    setIsSaving(true)
    try {
      const res = await saveProduct({
        name: productName || result.productName,
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

  // Exact steps requested by the user
  const requestedProgressSteps = [
    { id: "1", label: "Understanding your idea...", status: "completed" as const },
    { id: "2", label: "Defining user roles...", status: "completed" as const },
    { id: "3", label: "Mapping core features...", status: "completed" as const },
    { id: "4", label: "Scoping your MVP...", status: "loading" as const },
    { id: "5", label: "Building your architecture...", status: "pending" as const },
  ]

  return (
    <div className="flex flex-col gap-8 pb-24">
      <AppHeader 
        title={isNamingProduct ? "Save Product" : "Idea Workshop"} 
        actions={
          <div className="flex items-center gap-3">
            {isNamingProduct ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsNamingProduct(false)} disabled={isSaving}>
                  Back
                </Button>
                <Button size="sm" onClick={handleFinalSave} disabled={isSaving || !productName.trim()} className="gap-2 bg-brand-default">
                  {isSaving ? <Spinner size="sm" /> : <Check className="h-4 w-4" />}
                  Confirm & Save
                </Button>
              </>
            ) : (
              status === "success" && (
                <>
                  <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </Button>
                  <Button size="sm" onClick={() => setIsNamingProduct(true)} className="gap-2 bg-brand-default">
                    <Save className="h-4 w-4" />
                    Save as product
                  </Button>
                </>
              )
            )}
            
            {status === "idle" && (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Exit
                </Button>
              </Link>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Input or Naming Flow */}
        <div className={cn(
          "lg:col-span-5 space-y-6 transition-all duration-500",
          status === "success" && !isNamingProduct ? "opacity-40 pointer-events-none" : "opacity-100"
        )}>
          {isNamingProduct ? (
            <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
               <div className="space-y-2">
                 <h3 className="text-heading-md font-semibold text-text-primary">Name your creation</h3>
                 <p className="text-body-sm text-text-secondary">
                   This is how your product will appear on your dashboard.
                 </p>
               </div>
               <div className="space-y-4 bg-bg-surface1 p-6 rounded-xl border border-border-default">
                  <div className="space-y-2">
                    <label className="text-label-sm font-bold text-text-tertiary uppercase">Product Name</label>
                    <input 
                      type="text"
                      className="w-full h-12 bg-bg-surface2 border border-border-strong rounded-lg px-4 text-text-primary focus:ring-2 focus:ring-brand-default outline-none"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g. Nebula CRM"
                      autoFocus
                    />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-brand-subtle/20 rounded-lg text-brand-text border border-brand-subtle/30">
                     <Check className="h-4 w-4 shrink-0" />
                     <p className="text-caption">Architecture, UX flows, and Design System draft will be initialized.</p>
                  </div>
               </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Right Side: Output */}
        <div className="lg:col-span-7 flex flex-col min-h-[600px]">
          {status === "idle" && (
            <div className="flex flex-col items-center justify-center text-center p-12 rounded-xl border border-dashed border-border-subtle bg-bg-surface1/30 h-full">
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
            <div className="flex flex-col items-center justify-center p-12 h-full animate-in fade-in duration-500">
               <div className="space-y-8 w-full max-w-sm">
                  <div className="flex flex-col items-center gap-4 mb-8">
                     <Spinner size="lg" className="text-brand-text" />
                     <p className="text-heading-sm font-semibold text-text-primary">{progress}</p>
                  </div>
                  <ProgressList steps={requestedProgressSteps} />
               </div>
            </div>
          )}

          {status === "success" && result && (
            <div className="flex flex-col gap-8 h-full">
              <div className="flex-1">
                <ArchitectureViewer result={result} />
              </div>
              
              {!isNamingProduct && (
                <div className="pt-6 border-t border-border-subtle animate-in slide-in-from-bottom-2 duration-700">
                  <RefinementInput onRefine={handleRefine} />
                </div>
              )}
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
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
