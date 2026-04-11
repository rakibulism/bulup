"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProgressSteps } from "@/components/composed/progress-steps"
import { ProgressList, ProgressStep } from "@/components/composed/progress-list"

type Step = "welcome" | "brief" | "generating" | "completion"

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = React.useState<Step>("welcome")
  const [brief, setBrief] = React.useState("")
  const [productName, setProductName] = React.useState("My New Venture")

  const STEPS = ["Welcome", "Product Brief", "Generating"]
  const stepIndex = {
    welcome: 0,
    brief: 1,
    generating: 2,
    completion: 2, // Keep index at last step for completion
  }

  // Simulation steps for generation
  const [genSteps, setGenSteps] = React.useState<ProgressStep[]>([
    { id: "1", label: "Understanding your idea", status: "pending" },
    { id: "2", label: "Defining user roles", status: "pending" },
    { id: "3", label: "Mapping core features", status: "pending" },
    { id: "4", label: "Scoping your MVP", status: "pending" },
    { id: "5", label: "Building your architecture", status: "pending" },
  ])

  React.useEffect(() => {
    if (currentStep === "generating") {
      let currentIdx = 0
      const interval = setInterval(() => {
        setGenSteps(prev => prev.map((s, idx) => {
          if (idx < currentIdx) return { ...s, status: "completed" } as ProgressStep
          if (idx === currentIdx) return { ...s, status: "loading" } as ProgressStep
          return s
        }))

        if (currentIdx > genSteps.length) {
          clearInterval(interval)
          setTimeout(() => setCurrentStep("completion"), 800)
        }
        currentIdx++
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[500px] justify-between">
      <div className="mb-12">
        <ProgressSteps steps={STEPS} currentStep={stepIndex[currentStep]} />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-display-lg font-bold text-text-primary">
                Your workspace is ready.
              </h1>
              <p className="text-body-lg text-text-secondary">
                Bulup helps you architect solid products from raw ideas. <br/>
                Let's set up your first product. It takes about 3 minutes.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <Button size="lg" className="w-fit gap-2" onClick={() => setCurrentStep("brief")}>
                  Set up my first product
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="ghost" className="w-fit text-text-tertiary">
                  Skip → take me to the dashboard
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === "brief" && (
            <motion.div
              key="brief"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-2">
                <label className="text-heading-md font-semibold text-text-primary">
                  What are you building?
                </label>
                <textarea
                  className="flex min-h-[200px] w-full rounded-md border border-border-default bg-bg-surface3 px-4 py-3 text-body-md text-text-primary ring-offset-bg-base placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default resize-none"
                  placeholder="Plain English is fine. Include what it does, who it's for, and what problem it solves..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  maxLength={2000}
                />
                <div className="flex justify-between items-center text-caption text-text-tertiary">
                   <span>Minimum 50 characters recommended</span>
                   <span>{brief.length} / 2000</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="secondary" onClick={() => setCurrentStep("welcome")}>
                  Back
                </Button>
                <Button 
                  size="lg" 
                  disabled={brief.length < 20}
                  className="flex-1 gap-2" 
                  onClick={() => setCurrentStep("generating")}
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col gap-8 items-center py-12"
            >
              <div className="relative h-20 w-20 flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border-4 border-brand-subtle border-t-brand-default animate-spin" />
                 <Sparkles className="h-10 w-10 text-brand-text" />
              </div>
              
              <div className="w-full max-w-sm">
                <ProgressList steps={genSteps} />
              </div>
            </motion.div>
          )}

          {currentStep === "completion" && (
            <motion.div
              key="completion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-feedback-successSubtle/20 border border-feedback-success/30 rounded-xl p-4 flex items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-feedback-success flex items-center justify-center text-text-inverse">
                    <Check className="h-5 w-5" />
                 </div>
                 <p className="text-body-md text-feedback-success font-medium">Generation complete. Here is your product architecture.</p>
              </div>

              <div className="space-y-4">
                 <h2 className="text-display-lg font-bold text-text-primary">
                    Bulup has defined <span className="text-brand-text">{productName}</span>
                 </h2>
                 <div className="rounded-xl border border-border-default bg-bg-surface1 p-6 text-text-secondary">
                    {/* Simplified placeholder for architecture view */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-label-sm font-bold text-text-primary uppercase tracking-wider">Concept Summary</p>
                        <p className="text-body-md italic leading-relaxed">
                          "A streamlined platform that leverages AI to transform fragmented product concepts into structured, dev-ready documentation instantly."
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-label-sm font-bold text-text-primary uppercase tracking-wider">Target Users</p>
                          <p className="text-body-sm">Solo-Founders, PMs, Agencies</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-label-sm font-bold text-text-primary uppercase tracking-wider">MVP Core</p>
                          <p className="text-body-sm">Architect, Studio, Brain</p>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-label-md font-semibold text-text-primary">Give your product a name</label>
                <Input 
                  value={productName} 
                  onChange={(e) => setProductName(e.target.value)} 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="secondary" className="flex-1" onClick={() => setCurrentStep("brief")}>
                   Edit Brief
                </Button>
                <Button size="lg" className="flex-1 gap-2" onClick={() => window.location.href = '/dashboard'}>
                  Save & Go to Dashboard
                  <Check className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
