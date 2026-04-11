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
  const [intakeMode, setIntakeMode] = React.useState<"freestyle" | "guided">("freestyle")
  const [brief, setBrief] = React.useState("")
  const [guidedBrief, setGuidedBrief] = React.useState({
    do: "",
    who: "",
    problem: "",
    different: ""
  })
  const [productName, setProductName] = React.useState("")
  const [isNamingProduct, setIsNamingProduct] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  
  // High-fidelity Versioning & Variations
  const [versionHistory, setVersionHistory] = React.useState<any[]>([])
  const [currentVersionIndex, setCurrentVersionIndex] = React.useState(-1)
  const [isComparing, setIsComparing] = React.useState(false)
  const [isLocked, setIsLocked] = React.useState(false)
  
  const { generate, status, progress, result, reset } = useArchitectureStream()

  const currentResult = versionHistory[currentVersionIndex] || result

  // Track history when generation succeeds
  React.useEffect(() => {
    if (status === "success" && result) {
      setVersionHistory(prev => [...prev, result])
      setCurrentVersionIndex(prev => prev + 1)
    }
  }, [status, result])

  // Sync product name with result when it first arrives
  React.useEffect(() => {
    if (result?.productName && !productName) {
      setProductName(result.productName)
    }
  }, [result, productName])

  const handleBulup = () => {
    let finalBrief = brief
    if (intakeMode === "guided") {
      finalBrief = `
        Product Action: ${guidedBrief.do}
        Target Audience: ${guidedBrief.who}
        Core Problem: ${guidedBrief.problem}
        Unique Differentiator: ${guidedBrief.different}
      `.trim()
    }
    if (finalBrief.trim().length < 10) return
    generate(finalBrief)
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
               {/* ... (naming input stays same) */}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <h3 className="text-heading-md font-semibold text-text-primary">What are you building?</h3>
                   <div className="flex bg-bg-surface2 p-1 rounded-lg border border-border-subtle">
                      <button 
                        onClick={() => setIntakeMode("freestyle")}
                        className={cn(
                          "px-3 py-1.5 text-[11px] font-bold rounded-md transition-all",
                          intakeMode === "freestyle" ? "bg-bg-surface1 shadow-sm text-brand-text" : "text-text-tertiary"
                        )}
                      >
                        Write freely
                      </button>
                      <button 
                        onClick={() => setIntakeMode("guided")}
                        className={cn(
                          "px-3 py-1.5 text-[11px] font-bold rounded-md transition-all",
                          intakeMode === "guided" ? "bg-bg-surface1 shadow-sm text-brand-text" : "text-text-tertiary"
                        )}
                      >
                        Guide me
                      </button>
                   </div>
                </div>
                <p className="text-body-sm text-text-secondary">
                  {intakeMode === "freestyle" 
                    ? "The more detail you provide, the better the architecture. Describe target users, core actions, and the problems you solve."
                    : "Answer these 4 micro-questions to help Bulup AI build a grounded architecture."}
                </p>
              </div>

              {intakeMode === "freestyle" ? (
                <div className="relative">
                  <textarea
                    className="flex min-h-[400px] w-full rounded-xl border border-border-default bg-bg-surface1 px-6 py-4 text-body-md text-text-primary ring-offset-bg-base placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default resize-none transition-all"
                    placeholder="Ex: A collaborative platform for gardeners to share soil data..."
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    disabled={status === "loading"}
                    maxLength={2000}
                  />
                  <div className="absolute bottom-4 right-4 text-caption text-text-tertiary">
                    {brief.length} / 2000
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 bg-bg-surface1 p-6 rounded-2xl border border-border-default shadow-sm animate-in slide-in-from-bottom-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-text-tertiary tracking-widest">1. What does your product do?</label>
                      <input 
                        className="w-full bg-bg-surface2 border border-border-subtle rounded-lg px-4 py-3 text-body-sm outline-none focus:ring-2 focus:ring-brand-default"
                        placeholder="One sentence action..."
                        value={guidedBrief.do}
                        onChange={e => setGuidedBrief({ ...guidedBrief, do: e.target.value })}
                        maxLength={200}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-text-tertiary tracking-widest">2. Who is it for?</label>
                      <input 
                        className="w-full bg-bg-surface2 border border-border-subtle rounded-lg px-4 py-3 text-body-sm outline-none focus:ring-2 focus:ring-brand-default"
                        placeholder="Be specific about the persona..."
                        value={guidedBrief.who}
                        onChange={e => setGuidedBrief({ ...guidedBrief, who: e.target.value })}
                        maxLength={200}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-text-tertiary tracking-widest">3. Main problem it solves?</label>
                      <input 
                        className="w-full bg-bg-surface2 border border-border-subtle rounded-lg px-4 py-3 text-body-sm outline-none focus:ring-2 focus:ring-brand-default"
                        placeholder="What's the core pain point?"
                        value={guidedBrief.problem}
                        onChange={e => setGuidedBrief({ ...guidedBrief, problem: e.target.value })}
                        maxLength={200}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-text-tertiary tracking-widest">4. One thing that makes it different?</label>
                      <input 
                        className="w-full bg-bg-surface2 border border-border-subtle rounded-lg px-4 py-3 text-body-sm outline-none focus:ring-2 focus:ring-brand-default"
                        placeholder="Your unique differentiator..."
                        value={guidedBrief.different}
                        onChange={e => setGuidedBrief({ ...guidedBrief, different: e.target.value })}
                        maxLength={200}
                      />
                   </div>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full gap-3 shadow-xl h-12 bg-text-primary text-text-inverse hover:bg-text-secondary transition-all active:scale-[0.98]" 
                onClick={handleBulup}
                disabled={status === "loading" || (intakeMode === "freestyle" ? brief.length < 20 : !guidedBrief.do)}
              >
                {status === "loading" ? <Spinner size="sm" /> : <Sparkles className="h-5 w-5" />}
                {status === "loading" ? "Thinking deep..." : "Architect Product"}
              </Button>

              {versionHistory.length > 1 && (
                <div className="pt-4 space-y-3">
                   <p className="text-[10px] font-bold uppercase text-text-tertiary text-center">Version History</p>
                   <div className="flex flex-wrap gap-2 justify-center">
                      {versionHistory.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentVersionIndex(i)}
                          className={cn(
                            "w-8 h-8 rounded-full border transition-all text-[11px] font-bold flex items-center justify-center",
                            currentVersionIndex === i 
                              ? "bg-brand-default border-brand-default text-white shadow-lg" 
                              : "bg-bg-surface2 border-border-subtle text-text-tertiary hover:border-text-secondary"
                          )}
                        >
                          v{i + 1}
                        </button>
                      ))}
                   </div>
                </div>
              )}
            </div>
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

          {status === "success" && (result || currentResult) && (
            <div className="flex flex-col gap-8 h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-brand-default/10 rounded-lg text-brand-default">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-label-sm font-bold text-text-primary">Current Strategy</h3>
                    <p className="text-[11px] text-text-tertiary">Version {currentVersionIndex + 1} finalized</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsComparing(!isComparing)}
                    className={cn("gap-2 text-[11px] font-bold uppercase tracking-wider", isComparing && "bg-brand-subtle/20 text-brand-text")}
                   >
                     Compare Variation
                   </Button>
                </div>
              </div>

              <div className={cn(
                "grid gap-8 transition-all duration-700",
                isComparing ? "grid-cols-2" : "grid-cols-1"
              )}>
                <div className="flex flex-col gap-8">
                  {isComparing && <p className="text-[10px] font-bold uppercase text-text-tertiary text-center tracking-widest">Original v1</p>}
                  <ArchitectureViewer 
                    result={versionHistory[0] || currentResult} 
                    isLocked={isLocked}
                    onToggleLock={() => setIsLocked(!isLocked)}
                  />
                </div>

                {isComparing && (
                  <div className="flex flex-col gap-8 animate-in slide-in-from-right-8 duration-700">
                    <p className="text-[10px] font-bold uppercase text-brand-text text-center tracking-widest">Variation v{currentVersionIndex + 1}</p>
                    <ArchitectureViewer 
                      result={currentResult} 
                      isLocked={isLocked}
                      onToggleLock={() => setIsLocked(!isLocked)}
                    />
                  </div>
                )}
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
