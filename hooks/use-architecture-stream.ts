"use client"

import { useState } from "react"

export type GenerationStatus = "idle" | "loading" | "success" | "error"

export interface ArchitectureResult {
  productName: string
  concept: string
  targetAudience: string[]
  problemStatement: string
  mvpScope: string
  coreFeatures: Array<{ name: string; description: string; priority: string }>
  userRoles: Array<{ role: string; capabilities: string[] }>
  futureRoadmap: string[]
}

export function useArchitectureStream() {
  const [status, setStatus] = useState<GenerationStatus>("idle")
  const [progress, setProgress] = useState<string>("")
  const [result, setResult] = useState<ArchitectureResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generate = async (brief: string) => {
    setStatus("loading")
    setProgress("Connecting to Forge AI...")
    setResult(null)
    setError(null)

    try {
      const response = await fetch("/api/generate/architecture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      })

      if (!response.ok) throw new Error("Failed to start generation")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error("No response body")

      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Process SSE events
        const lines = buffer.split("\n\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (line.startsWith("event: progress")) {
             const data = JSON.parse(line.replace("event: progress\ndata: ", ""))
             setProgress(data.message)
          } else if (line.startsWith("event: result")) {
             const data = JSON.parse(line.replace("event: result\ndata: ", ""))
             setResult(data)
             setStatus("success")
          } else if (line.startsWith("event: error")) {
             const data = JSON.parse(line.replace("event: error\ndata: ", ""))
             setError(data.message)
             setStatus("error")
          }
        }
      }
    } catch (err: any) {
      console.error("Stream Error:", err)
      setError(err.message || "Something went wrong during generation")
      setStatus("error")
    }
  }

  const reset = () => {
    setStatus("idle")
    setProgress("")
    setResult(null)
    setError(null)
  }

  return { generate, status, progress, result, error, reset }
}
