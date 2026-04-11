"use client"

import { useState } from "react"

export type GenerationStatus = "idle" | "loading" | "success" | "error"

export interface ProgressStep {
  message: string
  timestamp: string
}

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
    setProgress("Connecting to Bulup AI...")
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
      if (!reader) throw new Error("Could not initialize response reader")
      const decoder = new TextDecoder()

      if (!reader) throw new Error("No response body")

      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Process SSE events: look for double newlines which indicate end of event
        let boundary = buffer.indexOf("\n\n")
        while (boundary !== -1) {
          const chunk = buffer.substring(0, boundary).trim()
          buffer = buffer.substring(boundary + 2)
          
          if (chunk.includes("event: progress")) {
             try {
               const dataStr = chunk.split("data: ")[1];
               const data = JSON.parse(dataStr);
               setProgress(data.message);
             } catch (e) {
               console.warn("Failed to parse progress event:", chunk);
             }
          } else if (chunk.includes("event: result")) {
             try {
               const dataStr = chunk.split("data: ")[1];
               const data = JSON.parse(dataStr);
               setResult(data);
               setStatus("success");
             } catch (e) {
               console.error("Failed to parse result event:", chunk);
               setError("AI returned malformed data. Please try again.");
               setStatus("error");
             }
          } else if (chunk.includes("event: error")) {
             try {
               const dataStr = chunk.split("data: ")[1];
               const data = JSON.parse(dataStr);
               setError(data.message);
               setStatus("error");
             } catch (e) {
               setError("An unknown error occurred during generation.");
               setStatus("error");
             }
          }
          boundary = buffer.indexOf("\n\n")
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
