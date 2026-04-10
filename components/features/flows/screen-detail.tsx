"use client"

import * as React from "react"
import { 
  SegmentedControl, 
  SegmentedControlContent, 
  SegmentedControlList, 
  SegmentedControlTrigger 
} from "@/components/composed/segmented-control"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, Layout, MousePointer2 } from "lucide-react"

export interface ScreenSpec {
  name: string
  purpose: string
  primaryAction: string
  components: string[]
  states: {
    default: string
    loading: string
    empty: string
    error: string
    success: string
  }
}

export function ScreenDetail({ screen }: { screen: ScreenSpec }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border-default bg-bg-surface1 p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-heading-md font-bold text-text-primary">{screen.name}</h3>
          <p className="text-body-sm text-text-secondary">{screen.purpose}</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="brand">{screen.primaryAction}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
           <h4 className="text-label-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
             <Layout className="h-4 w-4" /> Components
           </h4>
           <div className="flex flex-wrap gap-2">
             {screen.components.map((comp, i) => (
               <Badge key={i} variant="secondary" className="bg-bg-surface3 border-border-subtle">
                 {comp}
               </Badge>
             ))}
           </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border-subtle">
        <h4 className="text-label-sm font-bold text-text-primary uppercase tracking-wider">Screen States</h4>
        <SegmentedControl defaultValue="default">
          <SegmentedControlList className="w-full">
            <SegmentedControlTrigger value="default" className="flex-1">Default</SegmentedControlTrigger>
            <SegmentedControlTrigger value="loading" className="flex-1">Loading</SegmentedControlTrigger>
            <SegmentedControlTrigger value="empty" className="flex-1">Empty</SegmentedControlTrigger>
            <SegmentedControlTrigger value="error" className="flex-1">Error</SegmentedControlTrigger>
            <SegmentedControlTrigger value="success" className="flex-1">Success</SegmentedControlTrigger>
          </SegmentedControlList>

          <div className="mt-4 p-4 rounded-lg bg-bg-surface2 border border-border-default min-h-[100px] flex flex-col justify-center">
             <SegmentedControlContent value="default" className="mt-0">
               <p className="text-body-md text-text-primary">{screen.states.default}</p>
             </SegmentedControlContent>
             <SegmentedControlContent value="loading" className="mt-0">
               <p className="text-body-md text-text-primary">{screen.states.loading}</p>
             </SegmentedControlContent>
             <SegmentedControlContent value="empty" className="mt-0">
               <p className="text-body-md text-text-primary">{screen.states.empty}</p>
             </SegmentedControlContent>
             <SegmentedControlContent value="error" className="mt-0">
               <p className="text-body-md text-feedback-error">{screen.states.error}</p>
             </SegmentedControlContent>
             <SegmentedControlContent value="success" className="mt-0">
               <p className="text-body-md text-feedback-success">{screen.states.success}</p>
             </SegmentedControlContent>
          </div>
        </SegmentedControl>
      </div>
    </div>
  )
}
