"use client"

import * as React from "react"
import { motion, useDragControls } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, Layout } from "lucide-react"

// Mock screens to show on the canvas
const MOCK_SCREENS = [
  {
    id: "1",
    type: "web",
    title: "Landing Page — V1",
    x: 400,
    y: 100,
    width: 600,
    height: 400,
  },
  {
    id: "2",
    type: "mobile",
    title: "Onboarding — V1",
    x: 100,
    y: 200,
    width: 200,
    height: 350,
  },
  {
    id: "3",
    type: "web",
    title: "Dashboard Overview",
    x: 450,
    y: 600,
    width: 650,
    height: 450,
  }
]

export function CanvasPreview() {
  const constraintsRef = React.useRef(null)

  return (
    <div 
      ref={constraintsRef}
      className="absolute inset-0 overflow-hidden cursor-crosshair"
    >
      <motion.div
        drag
        dragConstraints={{ left: -3000, right: 3000, top: -3000, bottom: 3000 }}
        dragElastic={0.1}
        className="w-[10000px] h-[10000px] absolute -top-[4500px] -left-[4500px] pointer-events-auto"
        initial={{ x: 0, y: 0 }}
      >
        {/* Infinite Grid Dots */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "radial-gradient(circle, #2d2d2d 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }} 
        />

        {/* Mock Content Items */}
        {MOCK_SCREENS.map((screen) => (
          <motion.div
            key={screen.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + Number(screen.id) * 0.1 }}
            className="absolute rounded-xl bg-bg-surface1 border border-border-strong shadow-2xl overflow-hidden group select-none flex flex-col"
            style={{ 
              left: `calc(50% + ${screen.x}px)`, 
              top: `calc(50% + ${screen.y}px)`,
              width: screen.width,
              height: screen.height
            }}
          >
            <div className="h-10 border-b border-border-default bg-bg-surface2 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {screen.type === "web" ? <Monitor className="h-3.5 w-3.5 text-text-tertiary" /> : <Smartphone className="h-3.5 w-3.5 text-text-tertiary" />}
                <span className="text-caption font-semibold text-text-secondary">{screen.title}</span>
              </div>
              <Badge variant="brand" className="scale-75 origin-right">AI GENERATED</Badge>
            </div>
            <div className="flex-1 bg-bg-base m-2 rounded-lg border border-border-default flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
               <div className="text-center space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-brand-subtle flex items-center justify-center text-brand-text mx-auto scale-110">
                    <Layout className="h-6 w-6" />
                  </div>
                  <p className="text-label-sm text-text-tertiary font-mono">RENDER_BUFFER_ID_{screen.id}</p>
               </div>
            </div>
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-brand-default/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
