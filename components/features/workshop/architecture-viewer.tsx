"use client"

import * as React from "react"
import { ArchitectureResult } from "@/hooks/use-architecture-stream"
import { 
  SegmentedControl, 
  SegmentedControlContent, 
  SegmentedControlList, 
  SegmentedControlTrigger 
} from "@/components/composed/segmented-control"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Target, LayoutGrid, Users, Map } from "lucide-react"

export function ArchitectureViewer({ result }: { result: ArchitectureResult }) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-display-lg font-bold text-text-primary">
          {result.productName}
        </h2>
        <p className="text-body-lg text-text-secondary leading-relaxed">
          {result.concept}
        </p>
      </div>

      <SegmentedControl defaultValue="concept" className="w-full">
        <SegmentedControlList className="w-full">
          <SegmentedControlTrigger value="concept" className="flex-1 gap-2">
            <Target className="h-4 w-4" /> Overview
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="features" className="flex-1 gap-2">
            <LayoutGrid className="h-4 w-4" /> Features
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="audience" className="flex-1 gap-2">
            <Users className="h-4 w-4" /> Roles
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="roadmap" className="flex-1 gap-2">
            <Map className="h-4 w-4" /> Roadmap
          </SegmentedControlTrigger>
        </SegmentedControlList>

        <SegmentedControlContent value="concept" className="pt-4 space-y-6">
          <div className="space-y-3">
             <h4 className="text-label-sm font-bold text-text-primary uppercase tracking-wider">Problem Statement</h4>
             <p className="text-body-md text-text-secondary">{result.problemStatement}</p>
          </div>
          <div className="space-y-3">
             <h4 className="text-label-sm font-bold text-text-primary uppercase tracking-wider">MVP Scope</h4>
             <p className="text-body-md text-text-secondary">{result.mvpScope}</p>
          </div>
        </SegmentedControlContent>

        <SegmentedControlContent value="features" className="pt-4">
           <div className="grid gap-3">
              {result.coreFeatures.map((feature, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 rounded-lg bg-bg-surface2 border border-border-default">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-text-primary">{feature.name}</span>
                    <Badge variant={feature.priority.toLowerCase() === 'high' ? 'brand' : 'default'}>
                      {feature.priority}
                    </Badge>
                  </div>
                  <p className="text-body-sm text-text-secondary">{feature.description}</p>
                </div>
              ))}
           </div>
        </SegmentedControlContent>

        <SegmentedControlContent value="audience" className="pt-4 space-y-6">
           {result.userRoles.map((role, i) => (
             <div key={i} className="space-y-3">
               <h4 className="text-heading-sm font-semibold text-text-primary flex items-center gap-2">
                 <ChevronRight className="h-4 w-4 text-brand-text" />
                 {role.role}
               </h4>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                 {role.capabilities.map((cap, j) => (
                   <li key={j} className="text-body-sm text-text-secondary border-l-2 border-brand-subtle pl-3">
                     {cap}
                   </li>
                 ))}
               </ul>
             </div>
           ))}
        </SegmentedControlContent>

        <SegmentedControlContent value="roadmap" className="pt-4">
           <div className="flex flex-col divide-y divide-border-subtle">
             {result.futureRoadmap.map((item, i) => (
               <div key={i} className="py-3 flex items-center gap-3">
                 <span className="text-text-tertiary font-mono">{String(i+1).padStart(2, '0')}</span>
                 <p className="text-body-md text-text-secondary">{item}</p>
               </div>
             ))}
           </div>
        </SegmentedControlContent>
      </SegmentedControl>
    </div>
  )
}
