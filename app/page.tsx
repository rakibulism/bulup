"use client"

export const dynamic = "force-dynamic"

import * as React from "react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MarketingNavbar } from '@/components/layout/marketing-navbar'
import { MarketingFooter } from '@/components/layout/marketing-footer'
import { 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Route, 
  Layers, 
  Lightbulb, 
  CheckCircle2, 
  LayoutTemplate, 
  Palette, 
  Brain, 
  Package,
  Cpu,
  MousePointer2
} from 'lucide-react'
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function LandingPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col w-full overflow-hidden bg-l-background text-l-foreground font-sans min-h-screen">
      <MarketingNavbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-l-secondary border border-l-border text-xs font-medium text-l-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-l-primary" />
            Product intelligence layer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-l-foreground max-w-4xl mb-8 leading-[1.1]">
            Think before you build.
          </h1>
          
          <p className="text-lg md:text-xl text-l-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Bulup turns raw ideas into structured product systems. 
            Architecture, UX flows, design systems, and dev docs — 
            <strong className="font-medium text-l-foreground">ready before your team opens a single tool.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <SignedOut>
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base bg-l-primary text-l-background hover:bg-l-primary/90">
                  Start for free
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base bg-l-primary text-l-background hover:bg-l-primary/90 font-medium">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            
            <Link href="#features" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base group border-l-border hover:bg-l-secondary text-l-foreground">
                See how it works
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="border-y border-l-border bg-l-secondary/50 py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-sm font-medium text-l-muted-foreground">
              Trusted by founders building their next product.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-medium tracking-tight text-l-foreground">2,400+</span>
                <span className="text-xs text-l-muted-foreground uppercase tracking-widest mt-1">Products Structured</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-l-border"></div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-medium tracking-tight text-l-foreground">18,000+</span>
                <span className="text-xs text-l-muted-foreground uppercase tracking-widest mt-1">Flows Generated</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-l-border"></div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-medium tracking-tight text-l-foreground">9,200+</span>
                <span className="text-xs text-l-muted-foreground uppercase tracking-widest mt-1">Systems Exported</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="py-32 px-6 max-w-4xl mx-auto text-center">
          <span className="text-xs font-medium text-l-muted-foreground uppercase tracking-widest mb-6 block">
            The Real Problem
          </span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-l-foreground mb-10 leading-tight">
            Not a code tool.
          </h2>
          <div className="text-base md:text-lg text-l-muted-foreground space-y-6 max-w-2xl mx-auto text-left md:text-center">
            <p>
              Lovable, Cursor, Claude Code — they all answer the same question:<br/>
              <span className="italic text-l-foreground font-medium">"How do I build it?"</span>
            </p>
            <p>Bulup answers a different question:</p>
            <div className="p-6 bg-l-secondary border border-l-border rounded-xl inline-block text-left my-4 shadow-sm">
              <ul className="space-y-3 font-medium text-l-foreground">
                <li className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 text-l-muted-foreground" />
                  What should I build?
                </li>
                <li className="flex items-center gap-3">
                  <Route className="h-4 w-4 text-l-muted-foreground" />
                  How should it work?
                </li>
              </ul>
            </div>
            <p className="font-medium text-l-foreground text-xl">
              Think before you build.
            </p>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-32">
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-medium bg-l-secondary px-2.5 py-1 rounded-md border border-l-border text-l-foreground">
                <Lightbulb className="h-3.5 w-3.5" />
                Idea Workshop
              </span>
              <h3 className="text-3xl font-medium tracking-tight text-l-foreground">From idea to product architecture in minutes.</h3>
              <p className="text-l-muted-foreground leading-relaxed">
                Describe your product in plain English. Bulup returns a structured product architecture — features, user roles, flows, and a scoped MVP — ready to hand to your team.
              </p>
              <ul className="space-y-3 text-sm text-l-muted-foreground pt-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span><strong className="text-l-foreground font-medium">Brief Builder</strong> for founders who don't know where to start</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span><strong className="text-l-foreground font-medium">Confidence indicators</strong> — see what Bulup assumed vs. understood</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span><strong className="text-l-foreground font-medium">Feature priority matrix</strong> — visual, draggable, scope-ready</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/workshop" className="inline-flex items-center gap-1 text-sm font-medium text-l-primary hover:underline group">
                  Try the Workshop <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 bg-subtle-gradient rounded-2xl aspect-square md:aspect-[4/3] border border-l-border p-8 flex items-center justify-center relative overflow-hidden group">
              <div className="w-full max-w-sm bg-l-background border border-l-border rounded-xl shadow-sm p-6 transform transition-transform group-hover:scale-105 duration-500">
                <div className="h-4 w-1/3 bg-l-secondary rounded mb-6"></div>
                <div className="space-y-3">
                  <div className="h-10 w-full border border-l-border rounded flex items-center px-4 gap-3">
                    <div className="w-4 h-4 rounded-full border border-l-border"></div>
                    <div className="h-2 w-1/2 bg-l-secondary rounded"></div>
                  </div>
                  <div className="h-10 w-full border border-l-border rounded flex items-center px-4 gap-3 bg-l-secondary/30">
                    <div className="w-4 h-4 rounded-full border border-l-primary bg-l-primary"></div>
                    <div className="h-2 w-2/3 bg-l-foreground rounded"></div>
                  </div>
                  <div className="h-10 w-full border border-l-border rounded flex items-center px-4 gap-3">
                    <div className="w-4 h-4 rounded-full border border-l-border"></div>
                    <div className="h-2 w-1/3 bg-l-secondary rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-subtle-gradient rounded-2xl aspect-square md:aspect-[4/3] border border-l-border p-8 flex items-center justify-center relative overflow-hidden group">
               <div className="relative w-full h-full flex items-center justify-center transform transition-transform group-hover:scale-105 duration-500">
                  <div className="absolute top-1/4 left-1/4 w-24 h-32 bg-l-background border border-l-border rounded-lg shadow-sm"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 bg-l-background border-2 border-l-primary rounded-lg shadow-md z-10 p-3">
                    <div className="h-2 w-1/2 bg-l-secondary rounded mb-2"></div>
                    <div className="h-16 w-full bg-l-secondary rounded mb-2"></div>
                    <div className="h-6 w-full bg-l-primary/10 rounded"></div>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-32 bg-l-background border border-l-border rounded-lg shadow-sm opacity-50"></div>
                  
                  <svg className="absolute inset-0 w-full h-full text-l-border z-0" style={{ strokeDasharray: "4 4" }}>
                    <path d="M 150 150 L 200 200 L 250 200" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
               </div>
            </div>
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-medium bg-l-secondary px-2.5 py-1 rounded-md border border-l-border text-l-foreground">
                <LayoutTemplate className="h-3.5 w-3.5" />
                UX Flow Builder
              </span>
              <h3 className="text-3xl font-medium tracking-tight text-l-foreground">Every screen. Every state.<br/>Before Figma opens.</h3>
              <p className="text-l-muted-foreground leading-relaxed">
                Bulup maps your entire product as a connected flow diagram — screen by screen, state by state. Onboarding. Core actions. Error handling. Edge cases. All of it. Generated from your product architecture.
              </p>
              <ul className="space-y-3 text-sm text-l-muted-foreground pt-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span>Infinite canvas — pan, zoom, click to expand any screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span>Community templates — real product patterns, ready to use</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span>Export as Figma-ready spec sheet</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/flows" className="inline-flex items-center gap-1 text-sm font-medium text-l-primary hover:underline group">
                  See the Flow Builder <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-medium bg-l-secondary px-2.5 py-1 rounded-md border border-l-border text-l-foreground">
                <Palette className="h-3.5 w-3.5" />
                Design System Studio
              </span>
              <h3 className="text-3xl font-medium tracking-tight text-l-foreground">A real design system. Not a color palette.</h3>
              <p className="text-l-muted-foreground leading-relaxed">
                Bulup generates complete token architecture, typography scale, component specs, and export-ready CSS, Tailwind, and Figma variables. In one generation.
              </p>
              <ul className="space-y-3 text-sm text-l-muted-foreground pt-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span>WCAG contrast audit built in — AA pass/fail per color pair</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span>Dark + light mode generated together</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-l-primary" />
                  <span>One-click export: CSS / Tailwind / Tokens JSON / TypeScript</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/design-system" className="inline-flex items-center gap-1 text-sm font-medium text-l-primary hover:underline group">
                  See a sample output <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 bg-subtle-gradient rounded-2xl aspect-square md:aspect-[4/3] border border-l-border p-8 flex flex-col justify-center gap-4 relative overflow-hidden group">
              <div className="flex gap-4 w-full max-w-sm mx-auto transform transition-transform group-hover:scale-105 duration-500">
                <div className="flex-1 space-y-4">
                  <div className="h-12 w-full bg-l-foreground rounded-lg shadow-sm flex items-center justify-center text-l-background text-xs font-medium">Primary</div>
                  <div className="h-12 w-full bg-l-secondary border border-l-border rounded-lg shadow-sm flex items-center justify-center text-l-foreground text-xs font-medium">Secondary</div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-28 w-full bg-l-background border border-l-border rounded-lg shadow-sm p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-l-muted-foreground">Radius</span>
                      <span className="text-[10px] font-mono">0.5rem</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-l-muted-foreground">Shadow</span>
                      <span className="text-[10px] font-mono">sm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-l-muted-foreground">Font</span>
                      <span className="text-[10px] font-mono">Inter</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-sm mx-auto bg-l-background border border-l-border rounded-lg shadow-sm p-3 text-xs font-mono overflow-hidden text-l-muted-foreground transform transition-transform group-hover:scale-105 duration-500 delay-75">
                <span className="text-l-primary">@theme</span> {'{\n'}
                {'  '}--color-primary: #09090b;{'\n'}
                {'  '}--radius-md: 0.5rem;{'\n'}
                {'}'}
              </div>
            </div>
          </div>

          {/* Feature 4 & 5 Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-l-secondary/30 border border-l-border rounded-2xl p-10 hover:shadow-sm transition-shadow">
              <Brain className="h-8 w-8 text-l-primary mb-6" />
              <h3 className="text-2xl font-medium tracking-tight mb-4 text-l-foreground">Product Brain</h3>
              <p className="text-sm text-l-muted-foreground mb-6">
                Your product has a memory now. Every decision, revision, and "why we chose this" stored, searchable, and available whenever you need context.
              </p>
              <ul className="space-y-2 text-sm text-l-muted-foreground mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-l-border rounded-full"></div>
                  Auto-logs every Bulup generation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-l-border rounded-full"></div>
                  "Ask your product" semantic search
                </li>
              </ul>
              <Link href="/brain" className="inline-flex items-center gap-1 text-sm font-medium text-l-primary hover:underline group">
                Learn about memory <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-l-secondary/30 border border-l-border rounded-2xl p-10 hover:shadow-sm transition-shadow">
              <Package className="h-8 w-8 text-l-primary mb-6" />
              <h3 className="text-2xl font-medium tracking-tight mb-4 text-l-foreground">Handoff Center</h3>
              <p className="text-sm text-l-muted-foreground mb-6">
                Everything your team needs. Without the meeting. PRDs, UX specs, design tokens, dev docs — exported in formats your team can use immediately.
              </p>
              <ul className="space-y-2 text-sm text-l-muted-foreground mb-8">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-l-border rounded-full"></div>
                  No Bulup account needed to view
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-l-border rounded-full"></div>
                  Generate shareable links instantly
                </li>
              </ul>
              <Link href="/handoff" className="inline-flex items-center gap-1 text-sm font-medium text-l-primary hover:underline group">
                See export formats <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </section>

        {/* POSITIONING SECTION */}
        <section className="py-24 px-6 border-y border-l-border bg-l-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-medium tracking-tight mb-6 text-l-foreground">Not a code tool.</h2>
            <p className="text-lg text-l-muted-foreground max-w-2xl mx-auto mb-16">
              bulup doesn't compete with Cursor, Lovable, or Claude Code. It feeds them. You use bulup to think clearly. Then hand the output to your tools and your team.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-medium">
              <div className="flex items-center justify-center w-32 h-16 bg-l-primary text-l-background rounded-xl shadow-sm text-lg tracking-tight">
                bulup
              </div>
              <ArrowRight className="text-l-muted-foreground rotate-90 md:rotate-0 h-6 w-6" />
              <div className="flex items-center justify-center gap-2 w-32 h-16 bg-l-background border border-l-border text-l-foreground rounded-xl shadow-sm">
                <LayoutTemplate className="h-4.5 w-4.5" />
                Figma
              </div>
              <ArrowRight className="text-l-muted-foreground rotate-90 md:rotate-0 h-6 w-6" />
              <div className="flex items-center justify-center gap-2 w-32 h-16 bg-l-background border border-l-border text-l-foreground rounded-xl shadow-sm">
                <Cpu className="h-4.5 w-4.5" />
                Cursor
              </div>
              <ArrowRight className="text-l-muted-foreground rotate-90 md:rotate-0 h-6 w-6" />
              <div className="flex items-center justify-center w-32 h-16 bg-l-secondary border border-l-border text-l-foreground rounded-xl shadow-sm">
                Ship
              </div>
            </div>
            
            <p className="mt-12 text-sm text-l-muted-foreground uppercase tracking-widest font-medium">
              That's the stack. bulup is what happens before the stack.
            </p>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto bg-l-background">
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-l-muted-foreground uppercase tracking-widest block mb-4">Simple Pricing</span>
            <h2 className="text-4xl font-medium tracking-tight text-l-foreground">Start free. Scale when you're ready.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="border border-l-border rounded-2xl p-8 flex flex-col bg-l-background">
              <h3 className="text-xl font-medium mb-2 text-l-foreground">Free</h3>
              <div className="text-3xl font-medium tracking-tight mb-6 text-l-foreground">$0<span className="text-base text-l-muted-foreground font-normal tracking-normal">/mo</span></div>
              <p className="text-sm text-l-muted-foreground mb-6 italic">Think and structure your first product.</p>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-l-muted-foreground">
                <li className="flex items-center gap-3 text-l-foreground"><CheckCircle2 className="h-4 w-4 text-l-primary" /> 1 product</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> 3 UX flows</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> 1 design system</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> 50 Brain entries</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Markdown export</li>
              </ul>
              <Link href="/sign-up">
                <Button variant="outline" className="w-full border-l-border hover:bg-l-secondary text-l-foreground">Get started free</Button>
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="border-2 border-l-primary rounded-2xl p-8 flex flex-col bg-l-background relative shadow-md transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-l-primary text-l-background text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-medium mb-2 text-l-foreground">Pro</h3>
              <div className="text-3xl font-medium tracking-tight mb-6 text-l-foreground">$29<span className="text-base text-l-muted-foreground font-normal tracking-normal">/mo</span></div>
              <p className="text-sm text-l-muted-foreground mb-6 italic">For founders and designers building seriously.</p>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-l-muted-foreground">
                <li className="flex items-center gap-3 text-l-foreground font-medium"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Unlimited products</li>
                <li className="flex items-center gap-3 text-l-foreground font-medium"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Unlimited flows</li>
                <li className="flex items-center gap-3 text-l-foreground font-medium"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Unlimited systems</li>
                <li className="flex items-center gap-3 text-l-foreground font-medium"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Unlimited Brain</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> All export formats</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> No watermarks</li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full shadow-sm bg-l-primary text-l-background hover:bg-l-primary/90">Start Pro</Button>
              </Link>
            </div>

            {/* Team Tier */}
            <div className="border border-l-border rounded-2xl p-8 flex flex-col bg-l-background">
              <h3 className="text-xl font-medium mb-2 text-l-foreground">Team</h3>
              <div className="text-3xl font-medium tracking-tight mb-6 text-l-foreground">$79<span className="text-base text-l-muted-foreground font-normal tracking-normal">/mo</span></div>
              <p className="text-sm text-l-muted-foreground mb-6 italic">For small teams who need shared product intelligence.</p>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-l-muted-foreground">
                <li className="flex items-center gap-3 text-l-foreground"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Everything in Pro</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Up to 5 seats</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Shared workspace</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Role-based access</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Export history</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-l-primary" /> Priority support</li>
              </ul>
              <Link href="/sign-up">
                <Button variant="outline" className="w-full border-l-border hover:bg-l-secondary text-l-foreground">Start Team trial</Button>
              </Link>
            </div>
          </div>
          
          <p className="text-center text-xs text-l-muted-foreground mt-8">
            No credit card required on Free. Cancel Pro or Team anytime.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 px-6 text-center border-t border-l-border bg-l-secondary/30 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-l-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-l-foreground">Your next product starts here.</h2>
            <p className="text-lg text-l-muted-foreground mb-10 leading-relaxed">
              Not in Figma. Not in Cursor. Not in a Google Doc.<br/>
              Here. With a clear architecture, a real design system, and a team that knows exactly what to build.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <SignedOut>
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="rounded-full px-8 w-full sm:w-auto h-12 bg-l-primary text-l-background hover:bg-l-primary/90">Start for free</Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="rounded-full px-8 w-full sm:w-auto h-12 bg-l-primary text-l-background hover:bg-l-primary/90 font-medium">Go to Dashboard</Button>
                </Link>
              </SignedIn>
              
              <Link href="#features" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="rounded-full px-8 w-full sm:w-auto h-12 group border-l-border hover:bg-l-secondary text-l-foreground">
                  Book a walkthrough <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-l-muted-foreground">
              Free plan includes 1 product. No credit card needed.
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
