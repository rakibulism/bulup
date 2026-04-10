"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Sparkles, ArrowRight, MessageSquare, History } from "lucide-react"

export function AskPanel({ productId }: { productId: string }) {
  const [query, setQuery] = React.useState("")
  const [answer, setAnswer] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleAsk = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    setAnswer("")

    try {
      const response = await fetch("/api/generate/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, question: query }),
      })

      if (!response.ok) throw new Error("Brain unreachable")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setAnswer(prev => prev + decoder.decode(value))
      }
    } catch (err) {
      setAnswer("Sorry, I encountered an error while accessing the product memory.")
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedQuestions = [
    "What are the core user roles?",
    "How does the primary user flow work?",
    "What is the brand personality?",
    "Summarize the MVP scope."
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <div className="relative">
          <textarea
            className="w-full min-h-[120px] rounded-2xl border border-border-default bg-bg-surface1 p-5 text-body-md text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-default resize-none placeholder:text-text-tertiary transition-all"
            placeholder="Ask anything about your product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAsk()
              }
            }}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
             <Button 
               size="sm" 
               className="gap-2 bg-brand-default text-white shadow-lg"
               onClick={handleAsk}
               disabled={isLoading || !query.trim()}
             >
               {isLoading ? <Spinner size="sm" /> : <Sparkles className="h-4 w-4" />}
               Ask Product
             </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
           {suggestedQuestions.map((q, i) => (
             <button
               key={i}
               onClick={() => setQuery(q)}
               className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-bg-surface3 border border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all"
             >
               {q}
             </button>
           ))}
        </div>
      </div>

      {(answer || isLoading) && (
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-bg-surface2 border border-brand-subtle animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 text-brand-text">
             <MessageSquare className="h-4 w-4" />
             <span className="text-label-sm font-bold uppercase tracking-widest">Brain Response</span>
          </div>
          <p className="text-body-md text-text-primary leading-relaxed whitespace-pre-wrap">
            {answer}
            {isLoading && !answer && <span className="inline-block h-3 w-1 bg-brand-default ml-1 animate-pulse" />}
          </p>
        </div>
      )}
    </div>
  )
}
