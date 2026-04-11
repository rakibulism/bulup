"use client"

export const dynamic = 'force-dynamic';

import * as React from "react"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { FlowMindmapCanvas, MindmapNode } from "@/components/features/flows/flow-mindmap"
import { Sparkles, Beaker, Wand2, LayoutTemplate, ArrowRight, BookOpen, Users, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import { TemplatePreviewModal } from "@/components/features/flows/template-preview-modal"

import { Suspense } from "react"

// Mock templates
// Mock flow data for templates
const TEMPLATE_FLOWS: Record<string, MindmapNode[]> = {
  ecomm: [
    { id: "e1", title: "Storefront", description: "Product grid and categories", x: -200, y: 0 },
    { id: "e2", title: "Product Detail", description: "Price, gallery, and 'Add to Cart'", x: 100, y: -50, sourceNodeId: "e1" },
    { id: "e3", title: "Shopping Cart", description: "Review items and modify quantities", x: 400, y: 0, sourceNodeId: "e2" },
    { id: "e4", title: "Secure Checkout", description: "Shipping and payment details", x: 700, y: 50, sourceNodeId: "e3" },
  ],
  saas: [
    { id: "s1", title: "Login/Signup", description: "Auth portal for users", x: -250, y: 0 },
    { id: "s2", title: "Dashboard", description: "Main metrics and KPIs", x: 50, y: 0, sourceNodeId: "s1" },
    { id: "s3", title: "Settings", description: "User and organization config", x: 350, y: -80, sourceNodeId: "s2" },
    { id: "s4", title: "Reports", description: "Exportable data views", x: 350, y: 80, sourceNodeId: "s2" },
  ],
  social: [
    { id: "so1", title: "Feed", description: "Infinite scroll of posts", x: -100, y: 0 },
    { id: "so2", title: "New Post Modal", description: "Editor and media uploader", x: 200, y: -100, sourceNodeId: "so1" },
    { id: "so3", title: "User Profile", description: "User info and post history", x: 200, y: 100, sourceNodeId: "so1" },
    { id: "so4", title: "Notifications", description: "Likes, comments, and mentions", x: 500, y: 0, sourceNodeId: "so1" },
  ],
  travel: [
    { id: "t1", title: "Search", description: "Filter by dates and location", x: -200, y: 0 },
    { id: "t2", title: "Result Map", description: "Visual map of stays", x: 100, y: 0, sourceNodeId: "t1" },
    { id: "t3", title: "Booking Flow", description: "Reservation details", x: 400, y: 0, sourceNodeId: "t2" },
  ]
}

// Mock templates
const COMMUNITY_TEMPLATES = [
  { id: "ecomm", title: "E-Commerce App", desc: "Complete store, cart, and checkout flow", icon: BookOpen, users: "1.2k", nodes: TEMPLATE_FLOWS.ecomm },
  { id: "saas", title: "SaaS Dashboard", desc: "Analytics, settings, and user management", icon: LayoutTemplate, users: "850", nodes: TEMPLATE_FLOWS.saas },
  { id: "social", title: "Social Feed", desc: "Posting, commenting, and user profiles", icon: Users, users: "2.4k", nodes: TEMPLATE_FLOWS.social },
  { id: "travel", title: "Travel Planner", desc: "Itinerary builder, maps, and bookings", icon: Compass, users: "420", nodes: TEMPLATE_FLOWS.travel },
]

function FlowContent() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle")
  const [prompt, setPrompt] = React.useState("")
  const [activeNodes, setActiveNodes] = React.useState<MindmapNode[] | undefined>(undefined)
  const [previewTemplate, setPreviewTemplate] = React.useState<(typeof COMMUNITY_TEMPLATES)[0] | null>(null)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setStatus("loading")
    setActiveNodes(undefined) // Reset for fresh generation
    
    // Mock network request / AI processing time
    setTimeout(() => {
      setStatus("success")
    }, 2000)
  }

  const handleTemplateClick = (template: (typeof COMMUNITY_TEMPLATES)[0]) => {
    setPreviewTemplate(template)
  }

  const handleConfirmTemplate = () => {
    if (previewTemplate) {
      setActiveNodes(previewTemplate.nodes)
      setStatus("success")
      setPreviewTemplate(null)
    }
  }

  const handleIdeaWorkshop = () => {
    setPrompt("Build a modern CRM dashboard that provides a quick overview of sales pipelines, recent activities, and allows managing customer contacts easily.")
  }

  return (
    <div className={cn("flex flex-col gap-8 h-full", status === "success" && "h-screen overflow-hidden pb-0")}>
      <AppHeader 
        title="UX Flow Builder" 
        actions={
          status === "success" && (
            <Button variant="ghost" size="sm" onClick={() => setStatus("idle")} className="gap-2">
              Start Over
            </Button>
          )
        }
      />

      {status === "idle" && (
        <div className="max-w-4xl mx-auto w-full pt-8 pb-16 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Main Input Section */}
          <section className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-heading-xl font-bold text-text-primary tracking-tight">Design your next idea.</h1>
              <p className="text-body-lg text-text-secondary">Describe your product, or import from the workshop to instantly generate a full UX journey.</p>
            </div>

            <div className="bg-bg-surface1 border border-border-default rounded-3xl p-3 shadow-xl shadow-black/5 relative transition-all focus-within:ring-2 focus-within:ring-brand-default focus-within:border-brand-default">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., A fitness app that tracks workouts and integrates with social media..."
                className="w-full h-32 bg-transparent text-body-md text-text-primary placeholder:text-text-tertiary resize-none focus:outline-none p-4 rounded-xl"
              />
              
              <div className="flex items-center justify-between pt-2 border-t border-border-subtle mt-2 px-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleIdeaWorkshop}
                  className="text-text-secondary hover:text-brand-text gap-2 rounded-xl"
                >
                  <Beaker className="h-4 w-4" />
                  Add from Idea Workshop
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim()}
                    className="gap-2 rounded-xl px-6 bg-brand-default text-text-primary hover:bg-brand-hover shadow-lg shadow-brand-default/20 transition-all disabled:opacity-50"
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate Flow
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Community Templates Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-heading-sm font-semibold text-text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-text" />
                Community Templates
              </h3>
              <Button variant="ghost" size="sm" className="text-text-tertiary hover:text-text-primary gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COMMUNITY_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleTemplateClick(tmpl)}
                  className="flex flex-col text-left p-5 rounded-2xl bg-bg-surface1 border border-border-subtle hover:border-brand-default/50 hover:bg-bg-surface2 transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-bg-surface2 group-hover:bg-brand-default/10 flex items-center justify-center mb-4 transition-colors">
                    <tmpl.icon className="h-5 w-5 text-text-secondary group-hover:text-brand-text transition-colors" />
                  </div>
                  <h4 className="text-label-md font-semibold text-text-primary mb-1">{tmpl.title}</h4>
                  <p className="text-caption text-text-secondary mb-4 line-clamp-2">{tmpl.desc}</p>
                  
                  <div className="mt-auto flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-text-tertiary">
                    <Users className="h-3 w-3" />
                    {tmpl.users} used
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {status === "loading" && (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
           <div className="flex flex-col items-center gap-6 text-center animate-in zoom-in-95 duration-500">
              <Spinner size="lg" className="text-brand-text" />
              <div className="space-y-2 max-w-sm">
                 <p className="text-heading-md font-semibold text-text-primary">Generating Idea Roadmap</p>
                 <p className="text-body-sm text-text-secondary">Using AI to map out every screen, step, and user flow from your idea...</p>
              </div>
           </div>
        </div>
      )}

      {status === "success" && (
        <div className="relative flex-1 rounded-2xl border border-border-default overflow-hidden animate-in fade-in zoom-in-95 duration-500 bg-bg-base fill-available">
          <FlowMindmapCanvas key={status === "success" ? (activeNodes?.[0]?.id || "ai") : "idle"} initialNodes={activeNodes} />
        </div>
      )}

      <TemplatePreviewModal 
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onConfirm={handleConfirmTemplate}
        template={previewTemplate}
      />
    </div>
  )
}

export default function FlowsPage() {
  return (
    <Suspense fallback={
       <div className="flex items-center justify-center p-24">
         <div className="animate-spin h-8 w-8 border-4 border-brand-default border-t-transparent rounded-full" />
       </div>
    }>
      <FlowContent />
    </Suspense>
  )
}


