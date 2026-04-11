"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ExportPanel } from "./export-panel"

export type ReviewWorkspaceProps = {
  resultData: any; 
  onReset: () => void;
}

export function ReviewWorkspace({ resultData, onReset }: ReviewWorkspaceProps) {
  // A mock representation of the generated token data
  return (
    <div className="flex flex-col h-full bg-bg-surface1 rounded-xl border border-border-default overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      
      <Tabs defaultValue="colors" className="flex flex-col h-full">
        <div className="border-b border-border-default bg-bg-surface2 px-4 py-2 flex items-center justify-between shrink-0">
           <TabsList className="bg-transparent h-10 p-0 gap-6">
             <TabsTrigger value="colors" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full">Colors</TabsTrigger>
             <TabsTrigger value="typography" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full">Typography</TabsTrigger>
             <TabsTrigger value="spacing" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full">Spacing</TabsTrigger>
             <TabsTrigger value="components" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full">Components</TabsTrigger>
             <TabsTrigger value="export" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-brand-default rounded-none px-0 h-full text-brand-text">Export</TabsTrigger>
           </TabsList>
           <button onClick={onReset} className="text-label-sm text-text-tertiary hover:text-text-primary px-3 transition-colors">Start Over</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 relative">
           <TabsContent value="colors" className="m-0 space-y-12 h-full">
              {/* Tab: Colors */}
              <div className="space-y-4">
                 <h2 className="text-heading-md font-bold text-text-primary">Color System</h2>
                 <p className="text-body-sm text-text-secondary">Primitive palette, semantic tokens, and automated WCAG auditing.</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="p-6 border border-border-default rounded-xl bg-bg-base space-y-6">
                    <h3 className="text-label-sm uppercase text-text-tertiary font-bold tracking-widest">Primary Palette</h3>
                    <div className="flex bg-black/20 h-16 rounded-lg overflow-hidden">
                       {["100", "200", "300", "400", "500", "600", "700", "800", "900"].map((shade, i) => (
                         <div key={shade} className="flex-1 transition-colors" style={{ backgroundColor: `hsl(255, 60%, ${90 - i * 8}%)` }} />
                       ))}
                    </div>
                 </div>

                 <div className="p-6 border border-border-default rounded-xl bg-bg-base space-y-6">
                    <h3 className="text-label-sm uppercase text-text-tertiary font-bold tracking-widest flex items-center justify-between">
                       Accessibility Audit
                       <Badge variant="brand" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">3 Passed, 1 Flagged</Badge>
                    </h3>
                    <ul className="space-y-3">
                       <li className="flex items-center justify-between text-body-sm">
                         <span className="text-text-secondary">Primary text on BG</span>
                         <span className="text-emerald-500 font-mono">✓ AA (7.2:1)</span>
                       </li>
                       <li className="flex items-center justify-between text-body-sm">
                         <span className="text-text-secondary">Secondary text on BG</span>
                         <span className="text-emerald-500 font-mono">✓ AA (4.6:1)</span>
                       </li>
                       <li className="flex items-center justify-between text-body-sm bg-red-500/5 p-2 rounded -mx-2 border border-red-500/10">
                         <div>
                            <span className="text-text-primary block">Muted text on surface</span>
                            <button className="text-brand-text text-[10px] uppercase font-bold mt-1">Forge suggests: darken by 15%</button>
                         </div>
                         <span className="text-red-400 font-mono">✗ Fail (2.8:1)</span>
                       </li>
                    </ul>
                 </div>
              </div>
           </TabsContent>

           <TabsContent value="typography" className="m-0 space-y-12">
              <div className="space-y-4">
                 <h2 className="text-heading-md font-bold text-text-primary">Typography Scale</h2>
                 <p className="text-body-sm text-text-secondary">Full scale rendered with real sample text. Edit any value inline.</p>
              </div>

              <div className="space-y-10">
                 {resultData?.typography?.map((type: any) => (
                   <div key={type.token} className="group p-6 border border-border-default rounded-xl bg-bg-base hover:border-brand-default/30 transition-all">
                      <div className="flex flex-col lg:flex-row gap-8">
                         <div className="w-full lg:w-48 shrink-0 space-y-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-text bg-brand-default/10 px-2 py-1 rounded">{type.label}</span>
                            <div className="space-y-1">
                               <p className="text-xs font-mono text-text-tertiary">{type.token}</p>
                               <p className="text-xs text-text-secondary">{type.size} / {type.line} / {type.weight}</p>
                            </div>
                         </div>
                         
                         <div className="flex-1">
                            <div 
                               contentEditable 
                               suppressContentEditableWarning
                               className="outline-none focus:ring-1 focus:ring-brand-default/40 p-2 rounded transition-all line-clamp-2"
                               style={{ fontSize: type.size, fontWeight: type.weight, lineHeight: type.line }}
                            >
                               {type.label === "Display 2xl" ? "Think before you build." : "Design is not just what it looks like and feels like. Design is how it works."}
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </TabsContent>

           <TabsContent value="spacing" className="m-0 space-y-12">
              <div className="space-y-4">
                 <h2 className="text-heading-md font-bold text-text-primary">Spacing & Rhythm</h2>
                 <p className="text-body-sm text-text-secondary">Visual spacing scale. Every token shown as a colored bar to visualize the rhythm.</p>
              </div>

              <div className="space-y-4">
                 {resultData?.spacing?.map((space: any) => (
                   <div key={space.token} className="flex items-center gap-6 p-4 border border-border-default rounded-lg bg-bg-base overflow-hidden">
                      <div className="w-48 shrink-0">
                         <p className="text-xs font-mono text-text-tertiary">{space.token}</p>
                         <p className="text-body-sm font-bold text-text-primary">{space.value}</p>
                      </div>
                      <div className="flex-1 bg-bg-surface2 rounded h-8 items-center flex px-1">
                         <div 
                           className="h-6 bg-brand-default/40 rounded-sm border border-brand-default/20 flex items-center justify-center"
                           style={{ width: space.value }}
                         >
                            <span className="text-[10px] text-brand-text font-bold">{parseInt(space.value) >= 20 ? space.value : ""}</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </TabsContent>

           <TabsContent value="components" className="m-0 space-y-12 h-full flex flex-col">
              <div className="flex items-start justify-between shrink-0">
                 <div className="space-y-1">
                    <h2 className="text-heading-md font-bold text-text-primary">Component States</h2>
                    <p className="text-body-sm text-text-secondary">Live preview of every component in all 8 interaction states.</p>
                 </div>
                 
                 <div className="flex bg-bg-surface2 rounded-lg p-1 border border-border-default">
                    {["Light", "Dark"].map((m) => (
                      <button
                        key={m}
                        className="px-4 py-1.5 text-xs font-semibold rounded-md transition-all data-[active=true]:bg-bg-base data-[active=true]:text-text-primary data-[active=true]:shadow-sm text-text-tertiary"
                        data-active={m === "Dark"} // Mocking Dark as active for demo
                      >
                        {m}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex-1 overflow-visible">
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    {/* Buttons Matrix */}
                    <div className="space-y-6">
                       <h3 className="text-label-sm uppercase font-bold text-text-tertiary tracking-widest">Button Matrix</h3>
                       <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "Default", className: "bg-brand-default text-white" },
                            { label: "Hover", className: "bg-brand-hover text-white ring-4 ring-brand-default/10" },
                            { label: "Focus", className: "bg-brand-default text-white ring-2 ring-white ring-offset-2 ring-offset-bg-base" },
                            { label: "Active", className: "bg-brand-default/80 text-white scale-[0.98]" },
                            { label: "Loading", className: "bg-brand-default/70 text-white cursor-wait", icon: "spinner" },
                            { label: "Disabled", className: "bg-bg-surface3 text-text-disabled cursor-not-allowed" },
                            { label: "Error", className: "bg-red-500 text-white" },
                            { label: "Success", className: "bg-emerald-500 text-white" },
                          ].map((state) => (
                            <div key={state.label} className="p-4 border border-border-default rounded-xl bg-bg-base space-y-2 group">
                               <p className="text-[10px] text-text-tertiary font-mono">{state.label}</p>
                               <button 
                                 className={cn(
                                   "w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2",
                                   state.className
                                 )}
                               >
                                 {state.icon === "spinner" && <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                 {state.label}
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Inputs Matrix */}
                    <div className="space-y-6">
                       <h3 className="text-label-sm uppercase font-bold text-text-tertiary tracking-widest">Input Matrix</h3>
                       <div className="grid grid-cols-1 gap-4">
                          {[
                            { label: "Default", placeholder: "Enter name..." },
                            { label: "Focus", value: "John Doe", className: "border-brand-default ring-4 ring-brand-default/10" },
                            { label: "Error", value: "invalid-email", className: "border-red-500 bg-red-500/5", sub: "Please enter a valid email" },
                            { label: "Disabled", placeholder: "Locked field", className: "opacity-50 cursor-not-allowed bg-bg-surface3" },
                          ].map((state) => (
                            <div key={state.label} className="p-4 border border-border-default rounded-xl bg-bg-base space-y-2">
                               <div className="flex justify-between items-center">
                                  <p className="text-[10px] text-text-tertiary font-mono">{state.label}</p>
                                  {state.sub && <span className="text-[10px] text-red-400">{state.sub}</span>}
                               </div>
                               <input 
                                 readOnly
                                 value={state.value || ""}
                                 placeholder={state.placeholder}
                                 className={cn(
                                   "w-full h-11 px-4 rounded-lg border bg-bg-surface3 text-text-primary outline-none text-sm transition-all",
                                   state.className || "border-border-default hover:border-border-strong"
                                 )}
                               />
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </TabsContent>

           <TabsContent value="export" className="m-0 h-full">
              <ExportPanel />
           </TabsContent>
        </div>
      </Tabs>

    </div>
  )
}
