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
import { PriorityMatrix } from "./priority-matrix"
import { ChevronRight, Target, LayoutGrid, Users, Map, Info, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"

function ConfidenceBadge({ status }: { status?: "grounded" | "assumed" }) {
  if (!status) return null
  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
      status === "grounded" 
        ? "bg-brand-default/10 text-brand-default" 
        : "bg-amber-500/10 text-amber-600 animate-pulse"
    )}>
      {status === "grounded" ? "Grounded" : "Assumed"}
      <div className={cn("w-1 h-1 rounded-full", status === "grounded" ? "bg-brand-default" : "bg-amber-500")} />
    </div>
  )
}

function SectionHeader({ title, status }: { title: string, status?: "grounded" | "assumed" }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-[10px] font-black uppercase text-text-tertiary tracking-[0.2em]">{title}</h4>
      <ConfidenceBadge status={status} />
    </div>
  )
}

export function ArchitectureViewer({ 
  result, 
  isLocked, 
  onToggleLock 
}: { 
  result: any,
  isLocked: boolean,
  onToggleLock: () => void
}) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-display-md font-bold text-text-primary tracking-tight">
            {result.productName}
          </h2>
          <div className="flex items-center gap-3">
             <div className="text-body-md text-text-secondary leading-relaxed max-w-2xl">
               {typeof result.concept === 'string' ? result.concept : result.concept?.text}
             </div>
             <ConfidenceBadge status={result.concept?.status} />
          </div>
        </div>
      </div>

      <SegmentedControl defaultValue="strategy" className="w-full">
        <SegmentedControlList className="w-full bg-bg-surface2 p-1.5 rounded-2xl border border-border-subtle">
          <SegmentedControlTrigger value="strategy" className="flex-1 gap-2 rounded-xl py-2.5">
            <Target className="h-4 w-4" /> Strategy
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="matrix" className="flex-1 gap-2 rounded-xl py-2.5">
            <LayoutGrid className="h-4 w-4" /> Priority Matrix
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="audience" className="flex-1 gap-2 rounded-xl py-2.5">
            <Users className="h-4 w-4" /> User Roles
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="roadmap" className="flex-1 gap-2 rounded-xl py-2.5">
            <Map className="h-4 w-4" /> Roadmap
          </SegmentedControlTrigger>
        </SegmentedControlList>

        <SegmentedControlContent value="strategy" className="pt-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
               <SectionHeader title="Problem Statement" status={result.problemStatement?.status} />
               <p className="text-body-md text-text-primary leading-relaxed bg-bg-surface1 p-5 rounded-2xl border border-border-default shadow-sm italic">
                 "{typeof result.problemStatement === 'string' ? result.problemStatement : result.problemStatement?.text}"
               </p>
               {result.problemStatement?.status === 'assumed' && (
                 <button className="flex items-center gap-2 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-all pl-2">
                    <Info className="h-3 w-3" /> Was this right? Tap to refine.
                 </button>
               )}
            </div>
            
            <div className="space-y-4">
               <SectionHeader title="MVP Scope" status={result.mvpScope?.status} />
               <div className="relative p-5 rounded-2xl bg-brand-subtle/10 border border-brand-subtle/30 overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                     <Sparkles className="h-4 w-4 text-brand-text opacity-20" />
                  </div>
                  <p className="text-body-md text-text-primary leading-relaxed relative z-10">
                    {typeof result.mvpScope === 'string' ? result.mvpScope : result.mvpScope?.text}
                  </p>
               </div>
            </div>
          </div>
        </SegmentedControlContent>

        <SegmentedControlContent value="matrix" className="pt-8">
           <PriorityMatrix 
             features={result.coreFeatures} 
             isLocked={isLocked}
             onToggleLock={onToggleLock}
           />
           
           <div className="mt-12 grid gap-6">
              <h4 className="text-label-sm font-bold text-text-tertiary uppercase tracking-widest pl-1">Feature Breakdown</h4>
              <div className="grid gap-3">
                 {result.coreFeatures.map((feature: any, i: number) => (
                   <div key={i} className={cn(
                     "flex flex-col gap-1 p-5 rounded-2xl border transition-all",
                     isLocked && feature.y > 50 && feature.x < 50 
                        ? "bg-bg-base border-brand-default/50 shadow-md ring-1 ring-brand-default/20" 
                        : "bg-bg-surface2 border-border-default opacity-80"
                   )}>
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <span className="font-bold text-text-primary">{feature.name}</span>
                         <ConfidenceBadge status={feature.status} />
                       </div>
                       {isLocked && feature.y > 50 && feature.x < 50 && (
                         <Badge variant="brand" className="gap-1.5 h-6">
                            <Check className="h-3 w-3" /> MVP Scope
                         </Badge>
                       )}
                     </div>
                     <p className="text-body-sm text-text-secondary">{feature.description}</p>
                   </div>
                 ))}
              </div>
           </div>
        </SegmentedControlContent>

        <SegmentedControlContent value="audience" className="pt-8 space-y-10">
           {result.userRoles.map((role: any, i: number) => (
             <div key={i} className="space-y-5 bg-bg-surface1 p-6 rounded-3xl border border-border-default shadow-sm border-l-4 border-l-brand-default">
               <div className="flex items-center justify-between">
                 <h4 className="text-heading-sm font-bold text-text-primary flex items-center gap-3">
                   <Users className="h-5 w-5 text-brand-text" />
                   {role.role}
                 </h4>
                 <ConfidenceBadge status={role.status} />
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                 {role.capabilities.map((cap: string, j: number) => (
                   <div key={j} className="flex items-center gap-3 text-body-sm text-text-secondary">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-subtle" />
                     {cap}
                   </div>
                 ))}
               </div>
             </div>
           ))}
        </SegmentedControlContent>

        <SegmentedControlContent value="roadmap" className="pt-8">
           <div className="flex flex-col divide-y divide-border-subtle bg-bg-surface1 rounded-3xl border border-border-strong overflow-hidden">
             {result.futureRoadmap.map((item: string, i: number) => (
               <div key={i} className="p-6 flex items-center gap-6 group hover:bg-bg-surface2 transition-all">
                 <span className="text-display-sm font-black text-text-tertiary/20 group-hover:text-brand-text/40 transition-all font-mono">
                   {String(i+1).padStart(2, '0')}
                 </span>
                 <p className="text-body-md text-text-secondary font-medium">{item}</p>
               </div>
             ))}
           </div>
        </SegmentedControlContent>
      </SegmentedControl>
    </div>
  )
}
