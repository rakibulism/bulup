import * as React from "react"
import { OnboardingWizard } from "@/components/features/onboarding/onboarding-wizard"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* Header with simple logo */}
      <header className="h-20 flex items-center px-8 border-b border-border-default/50">
        <div className="flex items-center gap-2 font-bold text-text-primary">
          <div className="h-8 w-8 rounded-lg bg-brand-default flex items-center justify-center text-text-primary">
            F
          </div>
          <span className="tracking-tight">FORGE</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24">
        <OnboardingWizard />
      </main>

      {/* Basic footer for the wizard */}
      <footer className="h-16 flex items-center justify-center px-8 border-t border-border-subtle">
        <p className="text-caption text-text-tertiary">
          Forge Product Intelligence — v1.0.0
        </p>
      </footer>
    </div>
  )
}
