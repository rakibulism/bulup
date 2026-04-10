"use client"

export const dynamic = 'force-dynamic';

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { StatusChip } from "@/components/composed/status-chip"
import { EmptyState } from "@/components/organisms/empty-state"
import { FlowDiagram } from "@/components/features/flows/flow-diagram"
import { ScreenDetail } from "@/components/features/flows/screen-detail"
import { useFlowGenerator } from "@/hooks/use-flow-generator"
import { GitBranch, Sparkles, LayoutGrid, ChevronRight } from "lucide-react"

// Mock architecture mapping for demo if search param is missing
const MOCK_ARCHITECTURE = {
  productName: "Nebula CRM",
  coreFeatures: [{ name: "Email Outreach", priority: "High" }]
}

export default function FlowsPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")
  
  const { generate, status, progress, result, reset } = useFlowGenerator()
  const [activeFlowIndex, setActiveFlowIndex] = React.useState(0)
  const [activeScreenIndex, setActiveScreenIndex] = React.useState(0)

  const handleGenerate = () => {
    generate(MOCK_ARCHITECTURE)
  }

  React.useEffect(() => {
    setActiveScreenIndex(0)
  }, [activeFlowIndex])

  return (
    <div className="flex flex-col gap-8">
      <AppHeader 
        title="UX Flow Builder" 
        actions={
          status === "success" && (
            <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
              Regenerate
            </Button>
          )
        }
      />

      {status === "idle" && (
        <EmptyState
          icon={<GitBranch className="h-12 w-12" />}
          headline="No flows generated yet"
          description="Transform your product architecture into screen-by-screen user journeys."
          actionLabel="Generate UX Flows"
          onAction={handleGenerate}
        />
      )}

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center p-12 min-h-[500px]">
           <div className="flex flex-col items-center gap-6 text-center">
              <Spinner size="lg" className="text-brand-text" />
              <div className="space-y-1">
                 <p className="text-heading-md font-semibold text-text-primary">{progress}</p>
                 <p className="text-body-sm text-text-secondary">Claude is mapping out every state and interaction...</p>
              </div>
           </div>
        </div>
      )}

      {status === "success" && result && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
          {/* Sidebar: Flow Navigation */}
          <aside className="lg:col-span-3 flex flex-col gap-2">
            <h4 className="text-label-sm font-bold text-text-tertiary uppercase tracking-widest mb-2 px-3">Flows</h4>
            {result.map((flow, i) => (
              <button
                key={i}
                onClick={() => setActiveFlowIndex(i)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left group",
                  activeFlowIndex === i 
                    ? "bg-bg-surface2 border-brand-default/50 text-text-primary shadow-sm" 
                    : "bg-transparent border-border-subtle text-text-secondary hover:bg-bg-surface1"
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-label-md font-semibold">{flow.name}</span>
                  <StatusChip label={flow.type} variant="default" size="sm" className="w-fit scale-90 -ml-1 text-[10px]" />
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  activeFlowIndex === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                )} />
              </button>
            ))}
          </aside>

          {/* Main Content: Flow Visualization */}
          <div className="lg:col-span-9 space-y-8">
             <section className="space-y-4">
                <div className="flex items-center justify-between">
                   <h2 className="text-heading-lg font-bold text-text-primary">{result[activeFlowIndex].name}</h2>
                   <div className="flex gap-2">
                      <StatusChip label={`${result[activeFlowIndex].screens.length} Screens`} variant="brand" />
                   </div>
                </div>
                <FlowDiagram 
                  screens={result[activeFlowIndex].screens} 
                  activeScreenIndex={activeScreenIndex} 
                  onScreenClick={setActiveScreenIndex}
                />
             </section>

             <section className="space-y-4">
                <div className="flex items-center gap-2 text-text-tertiary">
                  <LayoutGrid className="h-4 w-4" />
                  <h4 className="text-label-sm font-bold uppercase tracking-widest">Screen Specification</h4>
                </div>
                <ScreenDetail screen={result[activeFlowIndex].screens[activeScreenIndex]} />
             </section>
          </div>
        </div>
      )}
    </div>
  )
}

import { cn } from "@/lib/utils"
