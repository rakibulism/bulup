"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

import { SignedIn, SignedOut } from "@clerk/nextjs"

export function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-l-background/80 backdrop-blur-md border-l-border' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-medium text-lg tracking-tight flex items-center gap-2 text-l-foreground">
            <div className="w-5 h-5 bg-l-primary rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-l-background rounded-full" />
            </div>
            bulup
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-l-muted-foreground font-medium">
            <Link href="/dashboard" className="hover:text-l-foreground transition-colors">Dashboard</Link>
            <a href="#features" className="hover:text-l-foreground transition-colors">Workshop</a>
            <Link href="/flows" className="hover:text-l-foreground transition-colors">UX Flows</Link>
            <Link href="/brain" className="hover:text-l-foreground transition-colors">Brain</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button size="sm" className="rounded-full px-5 bg-l-primary text-l-background hover:bg-l-primary/90 font-medium">
              Launch App
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
