"use client"

export const dynamic = 'force-dynamic';

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { 
  SegmentedControl, 
  SegmentedControlContent, 
  SegmentedControlList, 
  SegmentedControlTrigger 
} from "@/components/composed/segmented-control"
import { DecisionCard } from "@/components/features/brain/decision-card"
import { AskPanel } from "@/components/features/brain/ask-panel"
import { History, MessageSquareShare, Plus } from "lucide-react"

// Mock decisions for demo if no database data is available
const MOCK_DECISIONS = [
  {
    id: "1",
    type: "ARCHITECTURE" as const,
    statement: "Adopted a Serverless Edge architecture for generation logic",
    rationale: "Requires low latency streaming and dynamic scaling for AI inference chunks.",
    source: "AUTO" as const,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    type: "STRATEGY" as const,
    statement: "Targeting Solo Founders and Creative Agencies as primary persona",
    rationale: "These groups have the highest pain point with 'zero-to-one' product design friction.",
    source: "MANUAL" as const,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]

export default function BrainPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId") || "mock-product"

  return (
    <div className="flex flex-col gap-8">
      <AppHeader 
        title="Product Brain" 
        actions={
          <Button size="sm" className="gap-2 bg-text-primary text-text-inverse hover:bg-text-secondary">
            <Plus className="h-4 w-4" /> Add Decision
          </Button>
        }
      />

      <div className="max-w-4xl mx-auto w-full">
        <SegmentedControl defaultValue="timeline">
          <div className="flex items-center justify-between mb-8">
             <SegmentedControlList className="w-[300px]">
               <SegmentedControlTrigger value="timeline" className="gap-2">
                 <History className="h-4 w-4" /> Timeline
               </SegmentedControlTrigger>
               <SegmentedControlTrigger value="ask" className="gap-2">
                 <MessageSquareShare className="h-4 w-4" /> Ask Product
               </SegmentedControlTrigger>
             </SegmentedControlList>
          </div>

          <SegmentedControlContent value="timeline" className="animate-in fade-in duration-500">
             <div className="flex flex-col">
                <h3 className="text-label-sm font-bold text-text-tertiary uppercase tracking-widest mb-8">History & Evolution</h3>
                <div className="flex flex-col">
                  {MOCK_DECISIONS.map((decision) => (
                    <DecisionCard key={decision.id} decision={decision} />
                  ))}
                </div>
             </div>
          </SegmentedControlContent>

          <SegmentedControlContent value="ask" className="animate-in fade-in duration-500">
             <div className="flex flex-col gap-6">
                <div className="space-y-1">
                   <h3 className="text-heading-md font-bold text-text-primary">What's on your mind?</h3>
                   <p className="text-body-sm text-text-secondary">Query the product logic, architecture, or design system tokens directly.</p>
                </div>
                <AskPanel productId={productId} />
             </div>
          </SegmentedControlContent>
        </SegmentedControl>
      </div>
    </div>
  )
}
