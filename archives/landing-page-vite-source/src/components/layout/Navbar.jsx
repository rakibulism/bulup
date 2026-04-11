import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

export default function Navbar() {
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
          ? 'bg-background/80 backdrop-blur-md border-border' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-medium text-lg tracking-tight flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-background rounded-full"></div>
            </div>
            bulup
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-medium">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <Link to="#" className="hover:text-foreground transition-colors">Blog</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block transition-colors">
            Sign in
          </Link>
          <Button size="sm" className="rounded-full px-5">
            Start for free
          </Button>
        </div>
      </div>
    </header>
  )
}