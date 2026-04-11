"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles, Send, MessageSquare, History, User, Bot, ArrowDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AskPanel({ productId }: { productId: string }) {
  const [query, setQuery] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleAsk = async () => {
    if (!query.trim()) return
    const userQuery = query.trim()
    setQuery("")
    setMessages(prev => [...prev, { role: "user", content: userQuery }])
    setIsLoading(true)

    let currentAnswer = ""
    try {
      const response = await fetch("/api/generate/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, question: userQuery }),
      })

      if (!response.ok) throw new Error("Brain unreachable")

      const reader = response.body?.getReader()
      if (!reader) throw new Error("Could not initialize response reader")
      const decoder = new TextDecoder()

      // Add placeholder for AI response
      setMessages(prev => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value)
        currentAnswer += text
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1].content = currentAnswer
          return updated
        })
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error while accessing the product memory." }])
    } finally {
      setIsLoading(false)
    }
  }

  const hasStarted = messages.length > 0

  return (
    <div className={cn(
      "flex flex-col gap-6 transition-all duration-500",
      hasStarted ? "h-[600px]" : "h-auto"
    )}>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 p-5 rounded-2xl border transition-all",
                msg.role === "user" 
                  ? "bg-bg-surface1 border-border-default ml-12" 
                  : "bg-bg-surface2 border-brand-subtle mr-12 shadow-sm"
              )}
            >
              <div className="shrink-0 pt-0.5">
                {msg.role === "user" ? (
                  <div className="h-8 w-8 rounded-full bg-bg-surface3 flex items-center justify-center text-text-secondary border border-border-default">
                    <User className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-brand-default flex items-center justify-center text-white shadow-lg">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                   {msg.role === "user" ? "You" : "Product Brain"}
                 </p>
                 <p className="text-body-md text-text-primary leading-relaxed whitespace-pre-wrap">
                   {msg.content}
                   {isLoading && i === messages.length - 1 && msg.role === "assistant" && !msg.content && (
                     <span className="inline-block h-3 w-1 bg-brand-default ml-1 animate-pulse" />
                   )}
                 </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!hasStarted && (
           <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
              <div className="h-16 w-16 rounded-3xl bg-brand-default/10 flex items-center justify-center text-brand-default">
                 <Sparkles className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-heading-sm font-bold text-text-primary">Consult Your Product DNA</h4>
                 <p className="text-body-sm text-text-secondary max-w-sm">
                   Ask about user roles, flows, or technical architecture defined in your brain.
                 </p>
              </div>
           </div>
        )}
      </div>

      <div className={cn(
        "relative transition-all duration-500",
        hasStarted ? "sticky bottom-0 pt-4 bg-gradient-to-t from-bg-surface1 via-bg-surface1 to-transparent" : ""
      )}>
        <div className="relative group">
          <textarea
            className="w-full min-h-[60px] rounded-2xl border border-border-default bg-bg-base p-4 pr-14 text-body-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-default resize-none placeholder:text-text-tertiary transition-all shadow-sm"
            placeholder="Ask anything about your product..."
            value={query}
            rows={1}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAsk()
              }
            }}
          />
          <div className="absolute right-3 bottom-3">
             <Button 
               size="icon" 
               className="h-8 w-8 bg-brand-default text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform"
               onClick={handleAsk}
               disabled={isLoading || !query.trim()}
             >
               {isLoading ? <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
             </Button>
          </div>
        </div>

        {!hasStarted && (
           <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {[
                "What are the core user roles?",
                "Summarize the MVP scope.",
                "Primary user flow technicality?",
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(q)}
                  className="text-[10px] font-medium px-3 py-1.5 rounded-full bg-bg-surface2 border border-border-subtle text-text-tertiary hover:text-text-primary hover:border-text-secondary transition-all"
                >
                  {q}
                </button>
              ))}
           </div>
        )}
      </div>
    </div>
  )
}
