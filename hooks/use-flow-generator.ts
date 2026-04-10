"use client"

import { useState } from "react"

export function useFlowGenerator() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [progress, setProgress] = useState("")
  const [result, setResult] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generate = async (architecture: any) => {
    setStatus("loading")
    setProgress("Initializing...")
    setResult(null)
    setError(null)

    try {
      const response = await fetch("/api/generate/flows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ architecture }),
      })

      if (!response.ok) throw new Error("Flow generation failed")

      const reader = response.body?.getReader()
      if (!reader) throw new Error("Could not initialize response reader")
      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
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
      setError(err.message)
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
