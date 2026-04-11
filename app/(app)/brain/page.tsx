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
import { History, MessageSquareShare, Plus, X, Send } from "lucide-react"
import { addDecision } from "@/lib/actions/decisions"
import { motion, AnimatePresence } from "framer-motion"

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

import { Suspense } from "react"

function BrainContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId") || "mock-product"
  
  const [showAddForm, setShowAddForm] = React.useState(false)
  const [decisions, setDecisions] = React.useState(MOCK_DECISIONS)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState({
    statement: "",
    rationale: "",
    type: "STRATEGY" as any
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.statement) return
    setIsSubmitting(true)

    try {
      const res = await addDecision(productId, formData)
      if (res.success) {
        // Optimistically add to list for demo
        const newEntry = {
          id: Math.random().toString(),
          ...formData,
          source: "MANUAL" as const,
          createdAt: new Date().toISOString()
        }
        setDecisions([newEntry, ...decisions])
        setFormData({ statement: "", rationale: "", type: "STRATEGY" })
        setShowAddForm(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <AppHeader 
        title="Product Brain" 
        actions={
          <Button 
            size="sm" 
            onClick={() => setShowAddForm(!showAddForm)}
            className="gap-2 bg-text-primary text-text-inverse hover:bg-text-secondary"
          >
            {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddForm ? "Cancel" : "Add Decision"}
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
                
                <AnimatePresence>
                  {showAddForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-10 p-6 rounded-2xl bg-bg-surface2 border-2 border-brand-subtle shadow-xl"
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-text-tertiary">Statement</label>
                             <input 
                               autoFocus
                               required
                               placeholder="e.g. Switched to Bun for runtime"
                               className="w-full bg-bg-base border border-border-default rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-default"
                               value={formData.statement}
                               onChange={e => setFormData({ ...formData, statement: e.target.value })}
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase text-text-tertiary">Type</label>
                             <select 
                               className="w-full bg-bg-base border border-border-default rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-default"
                               value={formData.type}
                               onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                             >
                                <option value="ARCHITECTURE">Architecture</option>
                                <option value="DESIGN">Design</option>
                                <option value="STRATEGY">Strategy</option>
                                <option value="FEATURE">Feature</option>
                             </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase text-text-tertiary">Rationale (Optional)</label>
                           <textarea 
                             placeholder="The 'why' behind this decision..."
                             className="w-full bg-bg-base border border-border-default rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-default min-h-[80px] resize-none"
                             value={formData.rationale}
                             onChange={e => setFormData({ ...formData, rationale: e.target.value })}
                           />
                        </div>
                        <div className="flex justify-end gap-3">
                           <Button 
                             type="submit" 
                             disabled={isSubmitting || !formData.statement}
                             className="gap-2 bg-brand-default text-white"
                           >
                              {isSubmitting ? "Saving..." : <><Send className="h-4 w-4" /> Save Decision</>}
                           </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col">
                  {decisions.map((decision) => (
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

export default function BrainPage() {
  return (
    <Suspense fallback={
       <div className="flex items-center justify-center p-24">
         <div className="animate-spin h-8 w-8 border-4 border-brand-default border-t-transparent rounded-full" />
       </div>
    }>
      <BrainContent />
    </Suspense>
  )
}
