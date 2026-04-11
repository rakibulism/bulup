import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <Link to="/" className="font-medium text-lg tracking-tight flex items-center gap-2 mb-4">
               <div className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center opacity-80">
                <div className="w-2 h-2 bg-background rounded-full"></div>
              </div>
              bulup
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Built for founders who think before they build.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Idea Workshop</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">UX Flow Builder</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Design System Studio</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Product Brain</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Handoff Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Changelog</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Roadmap</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} bulup. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              <iconify-icon icon="simple-icons:x" width="16"></iconify-icon>
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              <iconify-icon icon="simple-icons:github" width="16"></iconify-icon>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}