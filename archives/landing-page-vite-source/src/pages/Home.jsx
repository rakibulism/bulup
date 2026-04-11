import { Button } from '@/components/ui/Button'
import { useEffect } from 'react'

export default function Home() {
  // Simple intersection observer for reveal animations if needed, 
  // though we rely mainly on CSS animations for initial load.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-8">
          <iconify-icon icon="solar:stars-linear" width="14"></iconify-icon>
          The product intelligence layer your team is missing
        </div>
        
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-foreground max-w-4xl mb-8 leading-[1.1]">
          Think before you build.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          bulup turns your raw idea into a structured product system — 
          architecture, UX flows, design system, and dev docs — 
          <strong className="font-medium text-foreground"> before your team opens a single tool.</strong>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base">
            Start for free
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base group">
            See how it works
            <iconify-icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform"></iconify-icon>
          </Button>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-border bg-secondary/50 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by founders building their next product.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-2xl font-medium tracking-tight text-foreground">2,400+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Products Structured</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border"></div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-2xl font-medium tracking-tight text-foreground">18,000+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Flows Generated</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border"></div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-2xl font-medium tracking-tight text-foreground">9,200+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Systems Exported</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6 block">
          The Real Problem
        </span>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-10 leading-tight">
          Everyone has a coding tool.<br/>
          Nobody has a thinking tool.
        </h2>
        <div className="text-base md:text-lg text-muted-foreground space-y-6 max-w-2xl mx-auto text-left md:text-center">
          <p>
            Lovable, Cursor, Bolt — they all answer the same question:<br/>
            <span className="italic text-foreground font-medium">"How do I build it?"</span>
          </p>
          <p>Nobody answers the question before that.</p>
          <div className="p-6 bg-secondary border border-border rounded-xl inline-block text-left my-4 shadow-sm">
            <ul className="space-y-3 font-medium text-foreground">
              <li className="flex items-center gap-3">
                <iconify-icon icon="solar:question-circle-linear" class="text-muted-foreground"></iconify-icon>
                What should I build?
              </li>
              <li className="flex items-center gap-3">
                <iconify-icon icon="solar:routing-2-linear" class="text-muted-foreground"></iconify-icon>
                How should it work?
              </li>
              <li className="flex items-center gap-3">
                <iconify-icon icon="solar:layers-linear" class="text-muted-foreground"></iconify-icon>
                What do I build first?
              </li>
            </ul>
          </div>
          <p className="font-medium text-foreground">
            That's where most products fail.<br/>
            Not in the code. In the thinking.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium bg-secondary px-2.5 py-1 rounded-md border border-border">
              <iconify-icon icon="solar:lightbulb-linear"></iconify-icon>
              Idea Workshop
            </span>
            <h3 className="text-3xl font-medium tracking-tight">From idea to product architecture in minutes.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Describe your product in plain English. bulup returns a structured product architecture — user roles, feature tiers, data model, primary flows, and a clear MVP scope. No brief template. No consultant needed. Just your idea, and a system that knows what to ask.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground pt-4">
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span><strong className="text-foreground font-medium">Brief Builder</strong> for founders who don't know where to start</span>
              </li>
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span><strong className="text-foreground font-medium">Confidence indicators</strong> — see what bulup assumed vs. understood</span>
              </li>
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span><strong className="text-foreground font-medium">Feature priority matrix</strong> — visual, draggable, scope-ready</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button variant="link" className="px-0 group">
                Try the Workshop <iconify-icon icon="solar:arrow-right-linear" className="ml-1 group-hover:translate-x-1 transition-transform"></iconify-icon>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 bg-subtle-gradient rounded-2xl aspect-square md:aspect-[4/3] border border-border p-8 flex items-center justify-center relative overflow-hidden group">
            {/* Abstract UI representation */}
            <div className="w-full max-w-sm bg-background border border-border rounded-xl shadow-sm p-6 transform transition-transform group-hover:scale-105 duration-500">
              <div className="h-4 w-1/3 bg-secondary rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-10 w-full border border-border rounded flex items-center px-4 gap-3">
                  <div className="w-4 h-4 rounded-full border border-border"></div>
                  <div className="h-2 w-1/2 bg-secondary rounded"></div>
                </div>
                <div className="h-10 w-full border border-border rounded flex items-center px-4 gap-3 bg-secondary/30">
                  <div className="w-4 h-4 rounded-full border border-primary bg-primary"></div>
                  <div className="h-2 w-2/3 bg-foreground rounded"></div>
                </div>
                <div className="h-10 w-full border border-border rounded flex items-center px-4 gap-3">
                  <div className="w-4 h-4 rounded-full border border-border"></div>
                  <div className="h-2 w-1/3 bg-secondary rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-subtle-gradient rounded-2xl aspect-square md:aspect-[4/3] border border-border p-8 flex items-center justify-center relative overflow-hidden group">
             {/* Abstract Flow representation */}
             <div className="relative w-full h-full flex items-center justify-center transform transition-transform group-hover:scale-105 duration-500">
                <div className="absolute top-1/4 left-1/4 w-24 h-32 bg-background border border-border rounded-lg shadow-sm"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 bg-background border-2 border-primary rounded-lg shadow-md z-10 p-3">
                  <div className="h-2 w-1/2 bg-secondary rounded mb-2"></div>
                  <div className="h-16 w-full bg-secondary rounded mb-2"></div>
                  <div className="h-6 w-full bg-primary/10 rounded"></div>
                </div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-32 bg-background border border-border rounded-lg shadow-sm opacity-50"></div>
                
                {/* Connecting lines SVG */}
                <svg className="absolute inset-0 w-full h-full text-border z-0" style={{ strokeDasharray: "4 4" }}>
                  <path d="M 30% 40% L 40% 50% L 50% 50%" stroke="currentColor" fill="none" strokeWidth="2" />
                  <path d="M 60% 50% L 70% 60%" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
             </div>
          </div>
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium bg-secondary px-2.5 py-1 rounded-md border border-border">
              <iconify-icon icon="solar:diagram-up-linear"></iconify-icon>
              UX Flow Builder
            </span>
            <h3 className="text-3xl font-medium tracking-tight">Every screen. Every state.<br/>Before Figma opens.</h3>
            <p className="text-muted-foreground leading-relaxed">
              bulup maps your entire product as a connected flow diagram — screen by screen, state by state. Onboarding. Core actions. Error handling. Edge cases. All of it. Generated from your product architecture.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground pt-4">
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span>Infinite canvas — pan, zoom, click to expand any screen</span>
              </li>
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span>Community templates — real product patterns, ready to use</span>
              </li>
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span>Export as Figma-ready spec sheet</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button variant="link" className="px-0 group">
                See the Flow Builder <iconify-icon icon="solar:arrow-right-linear" className="ml-1 group-hover:translate-x-1 transition-transform"></iconify-icon>
              </Button>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium bg-secondary px-2.5 py-1 rounded-md border border-border">
              <iconify-icon icon="solar:palette-linear"></iconify-icon>
              Design System Studio
            </span>
            <h3 className="text-3xl font-medium tracking-tight">A real design system.<br/>Not a color palette.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Most AI tools give you five hex codes and call it a design system. bulup generates complete token architecture — primitive, semantic, and component tiers. Built-in accessibility audit. Export as CSS, Tailwind, JSON, or TypeScript. Paste and build.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground pt-4">
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span>WCAG contrast audit built in — AA pass/fail per color pair</span>
              </li>
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span>Dark + light mode generated together</span>
              </li>
              <li className="flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" class="mt-0.5 text-primary"></iconify-icon>
                <span>One-click export: CSS / Tailwind / Tokens JSON / TypeScript</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button variant="link" className="px-0 group">
                See a sample system <iconify-icon icon="solar:arrow-right-linear" className="ml-1 group-hover:translate-x-1 transition-transform"></iconify-icon>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 bg-subtle-gradient rounded-2xl aspect-square md:aspect-[4/3] border border-border p-8 flex flex-col justify-center gap-4 relative overflow-hidden group">
            <div className="flex gap-4 w-full max-w-sm mx-auto transform transition-transform group-hover:scale-105 duration-500">
              <div className="flex-1 space-y-4">
                <div className="h-12 w-full bg-foreground rounded-lg shadow-sm flex items-center justify-center text-background text-xs font-medium">Primary</div>
                <div className="h-12 w-full bg-secondary border border-border rounded-lg shadow-sm flex items-center justify-center text-foreground text-xs font-medium">Secondary</div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="h-28 w-full bg-background border border-border rounded-lg shadow-sm p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">Radius</span>
                    <span className="text-[10px] font-mono">0.5rem</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">Shadow</span>
                    <span className="text-[10px] font-mono">sm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground">Font</span>
                    <span className="text-[10px] font-mono">Inter</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full max-w-sm mx-auto bg-background border border-border rounded-lg shadow-sm p-3 text-xs font-mono overflow-hidden text-muted-foreground transform transition-transform group-hover:scale-105 duration-500 delay-75">
              <span className="text-primary">@theme</span> {'{\n'}
              {'  '}--color-primary: oklch(14.5% 0.025 264);{'\n'}
              {'  '}--radius-md: 0.5rem;{'\n'}
              {'}'}
            </div>
          </div>
        </div>

        {/* Feature 4 & 5 Grid (Smaller Bento style) */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-secondary/30 border border-border rounded-2xl p-10 hover:shadow-sm transition-shadow">
            <iconify-icon icon="solar:brain-linear" width="32" class="text-primary mb-6"></iconify-icon>
            <h3 className="text-2xl font-medium tracking-tight mb-4">Product Brain</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Every decision your team makes — architecture choices, feature changes, "why we didn't build X" — stored, searchable, and permanent.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-8">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-border rounded-full"></div>
                Auto-logs every bulup generation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-border rounded-full"></div>
                "Ask your product" semantic search
              </li>
            </ul>
            <Button variant="link" className="px-0 group text-sm">
              Learn about Product Brain <iconify-icon icon="solar:arrow-right-linear" className="ml-1 group-hover:translate-x-1 transition-transform"></iconify-icon>
            </Button>
          </div>

          <div className="bg-secondary/30 border border-border rounded-2xl p-10 hover:shadow-sm transition-shadow">
            <iconify-icon icon="solar:box-minimalistic-linear" width="32" class="text-primary mb-6"></iconify-icon>
            <h3 className="text-2xl font-medium tracking-tight mb-4">Handoff Center</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Everything your team needs. Without the meeting. PRD. UX specs. Design tokens. Dev documentation. Exported in formats your team can use immediately.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-8">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-border rounded-full"></div>
                No bulup account needed to view
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-border rounded-full"></div>
                Generate shareable links instantly
              </li>
            </ul>
            <Button variant="link" className="px-0 group text-sm">
              See export formats <iconify-icon icon="solar:arrow-right-linear" className="ml-1 group-hover:translate-x-1 transition-transform"></iconify-icon>
            </Button>
          </div>
        </div>

      </section>

      {/* POSITIONING SECTION */}
      <section className="py-24 px-6 border-y border-border bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-medium tracking-tight mb-6">Not a code tool.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            bulup doesn't compete with Cursor, Lovable, or Claude Code. It feeds them. You use bulup to think clearly. Then hand the output to your tools and your team.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-medium">
            <div className="flex items-center justify-center w-32 h-16 bg-primary text-primary-foreground rounded-xl shadow-sm text-lg tracking-tight">
              bulup
            </div>
            <iconify-icon icon="solar:arrow-right-linear" class="text-muted-foreground rotate-90 md:rotate-0" width="24"></iconify-icon>
            <div className="flex items-center justify-center gap-2 w-32 h-16 bg-background border border-border text-foreground rounded-xl shadow-sm">
              <iconify-icon icon="simple-icons:figma" width="18"></iconify-icon>
              Figma
            </div>
            <iconify-icon icon="solar:arrow-right-linear" class="text-muted-foreground rotate-90 md:rotate-0" width="24"></iconify-icon>
            <div className="flex items-center justify-center gap-2 w-32 h-16 bg-background border border-border text-foreground rounded-xl shadow-sm">
              <iconify-icon icon="simple-icons:cursor" width="18"></iconify-icon>
              Cursor
            </div>
            <iconify-icon icon="solar:arrow-right-linear" class="text-muted-foreground rotate-90 md:rotate-0" width="24"></iconify-icon>
            <div className="flex items-center justify-center w-32 h-16 bg-secondary border border-border text-foreground rounded-xl shadow-sm">
              Ship
            </div>
          </div>
          
          <p className="mt-12 text-sm text-muted-foreground uppercase tracking-widest font-medium">
            That's the stack. bulup is what happens before the stack.
          </p>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-4">Simple Pricing</span>
          <h2 className="text-4xl font-medium tracking-tight">Start free. Scale when you're ready.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="border border-border rounded-2xl p-8 flex flex-col bg-background">
            <h3 className="text-xl font-medium mb-2">Free</h3>
            <div className="text-3xl font-medium tracking-tight mb-6">$0<span className="text-base text-muted-foreground font-normal tracking-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-3 text-foreground"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> 1 product</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> 3 UX flows</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> 1 design system</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> 50 Brain entries</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Markdown export</li>
            </ul>
            <Button variant="secondary" className="w-full">Start free</Button>
          </div>

          {/* Pro Tier */}
          <div className="border-2 border-primary rounded-2xl p-8 flex flex-col bg-background relative shadow-md transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-medium mb-2">Pro</h3>
            <div className="text-3xl font-medium tracking-tight mb-6">$29<span className="text-base text-muted-foreground font-normal tracking-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-3 text-foreground font-medium"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Unlimited products</li>
              <li className="flex items-center gap-3 text-foreground font-medium"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Unlimited flows</li>
              <li className="flex items-center gap-3 text-foreground font-medium"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Unlimited systems</li>
              <li className="flex items-center gap-3 text-foreground font-medium"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Unlimited Brain</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> All export formats</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> No watermarks</li>
            </ul>
            <Button className="w-full shadow-sm">Start Pro</Button>
          </div>

          {/* Team Tier */}
          <div className="border border-border rounded-2xl p-8 flex flex-col bg-background">
            <h3 className="text-xl font-medium mb-2">Team</h3>
            <div className="text-3xl font-medium tracking-tight mb-6">$79<span className="text-base text-muted-foreground font-normal tracking-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-3 text-foreground"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Everything in Pro</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Up to 5 seats</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Shared workspace</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Role-based access</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Export history</li>
              <li className="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-primary"></iconify-icon> Priority support</li>
            </ul>
            <Button variant="secondary" className="w-full">Start Team trial</Button>
          </div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          No credit card required on Free. Cancel Pro or Team anytime.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center border-t border-border bg-secondary/30 relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Your next product starts here.</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Not in Figma. Not in Cursor. Not in a Google Doc.<br/>
            Here. With a clear architecture, a real design system, and a team that knows exactly what to build.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Button size="lg" className="rounded-full px-8 w-full sm:w-auto h-12">Start for free</Button>
            <Button variant="secondary" size="lg" className="rounded-full px-8 w-full sm:w-auto h-12 group">
              Book a walkthrough <iconify-icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform"></iconify-icon>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Free plan includes 1 product. No credit card needed.
          </p>
        </div>
      </section>

    </div>
  )
}