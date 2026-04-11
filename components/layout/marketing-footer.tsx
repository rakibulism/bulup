"use client"

import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

export function MarketingFooter() {
  return (
    <footer className="border-t border-l-border bg-l-background pt-16 pb-8 text-l-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <Link href="/" className="font-medium text-lg tracking-tight flex items-center gap-2 mb-4">
               <div className="w-5 h-5 bg-l-primary rounded-sm flex items-center justify-center opacity-80">
                <div className="w-2 h-2 bg-l-background rounded-full" />
              </div>
              bulup
            </Link>
            <p className="text-sm text-l-muted-foreground mt-2 max-w-xs">
              Built for founders who think before they build.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-l-muted-foreground">
              <li><a href="#features" className="hover:text-l-foreground transition-colors">Idea Workshop</a></li>
              <li><Link href="/flows" className="hover:text-l-foreground transition-colors">UX Flow Builder</Link></li>
              <li><Link href="/design-system" className="hover:text-l-foreground transition-colors">Design System Studio</Link></li>
              <li><Link href="/brain" className="hover:text-l-foreground transition-colors">Product Brain</Link></li>
              <li><Link href="/handoff" className="hover:text-l-foreground transition-colors">Handoff Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-l-muted-foreground">
              <li><Link href="/about" className="hover:text-l-foreground transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-l-foreground transition-colors">Blog</Link></li>
              <li><Link href="/changelog" className="hover:text-l-foreground transition-colors">Changelog</Link></li>
              <li><Link href="/roadmap" className="hover:text-l-foreground transition-colors">Roadmap</Link></li>
              <li><Link href="/contact" className="hover:text-l-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-l-muted-foreground">
              <li><Link href="/privacy" className="hover:text-l-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-l-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-l-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-l-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-l-muted-foreground">
            © {new Date().getFullYear()} bulup. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-l-muted-foreground">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-l-foreground transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-l-foreground transition-colors">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
