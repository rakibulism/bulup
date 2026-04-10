import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border-default h-16 sticky top-0 bg-bg-base/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 font-bold text-text-primary">
          <div className="h-8 w-8 rounded-lg bg-brand-default flex items-center justify-center text-text-primary">
            F
          </div>
          <span>FORGE</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-label-md text-text-secondary">
          <Link href="#features" className="hover:text-text-primary transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-text-primary transition-colors">Pricing</Link>
          <Link href="/blog" className="hover:text-text-primary transition-colors">Blog</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <Link href="/workshop">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center rounded-full border border-brand-default/20 bg-brand-subtle/30 px-3 py-1 text-sm font-medium text-brand-text mb-6">
          Product Intelligence Platform
        </div>
        <h1 className="text-display-2xl font-bold text-text-primary mb-6">
          Think before you build.
        </h1>
        <p className="text-body-lg text-text-secondary mb-10 max-w-2xl">
          Forge turns raw ideas into structured product systems. Architecture, UX flows, design systems, and dev docs — ready before your team opens a single tool.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/workshop">
            <Button size="lg">Get Started</Button>
          </Link>
          <Button variant="secondary" size="lg">See how it works →</Button>
        </div>
      </section>

      {/* Brief comparison section */}
      <section className="py-24 border-t border-border-subtle bg-bg-surface1/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-display-lg font-bold text-text-primary mb-6">Not a code tool.</h2>
           <p className="text-body-lg text-text-secondary">
            Lovable, Cursor, Claude Code — they all answer "how do I build it?" <br/>
            Forge answers <span className="text-text-primary font-semibold">"what should I build, and how should it work?"</span> <br/>
            That's a different question.
           </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-border-default px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 font-bold text-text-primary">
                <div className="h-6 w-6 rounded-md bg-brand-default flex items-center justify-center text-text-primary text-xs">
                  F
                </div>
                <span>FORGE</span>
              </div>
              <p className="text-caption text-text-tertiary">© 2026 Forge. All rights reserved.</p>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3">
                 <p className="text-label-sm font-bold text-text-primary">Product</p>
                 <Link href="#" className="text-caption text-text-secondary hover:text-text-primary transition-colors">Workshop</Link>
                 <Link href="#" className="text-caption text-text-secondary hover:text-text-primary transition-colors">Design Studio</Link>
              </div>
              <div className="flex flex-col gap-3">
                 <p className="text-label-sm font-bold text-text-primary">Company</p>
                 <Link href="#" className="text-caption text-text-secondary hover:text-text-primary transition-colors">About</Link>
                 <Link href="#" className="text-caption text-text-secondary hover:text-text-primary transition-colors">Twitter</Link>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
