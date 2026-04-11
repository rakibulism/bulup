"use client"

import * as React from "react"
import { Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface RefinementInputProps {
  onRefine: (text: string) => void
  disabled?: boolean
  placeholder?: string
}

export function RefinementInput({ onRefine, disabled, placeholder = "Refine with AI..." }: RefinementInputProps) {
  const [value, setValue] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onRefine(value)
    setValue("")
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-center w-full group"
    >
      <div className="absolute left-4 text-brand-text">
        <Sparkles className="h-4 w-4" />
      </div>
      <input
        type="text"
        className={cn(
          "w-full h-12 pl-11 pr-12 rounded-xl border border-border-default bg-bg-surface2 text-body-sm text-text-primary",
          "placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-default",
          "transition-all duration-200 shadow-sm group-hover:border-border-strong",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className={cn(
          "absolute right-2 h-8 w-8 rounded-lg flex items-center justify-center transition-all",
          value.trim() ? "bg-brand-default text-text-primary shadow-md" : "text-text-tertiary",
          "disabled:opacity-50 disabled:shadow-none"
        )}
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}
