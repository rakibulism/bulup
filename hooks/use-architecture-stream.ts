"use client"

import { useState } from "react"

export type GenerationStatus = "idle" | "loading" | "success" | "error"

export interface ProgressStep {
  message: string
  timestamp: string
}

const MOCK_RESULT: ArchitectureResult = {
  productName: "Nebula CRM",
  concept: "A unified workspace for creators to manage their entire audience lifecycle, from first contact to loyal advocate, powered by intelligent automation.",
  targetAudience: ["Independent Creators", "Small Agency Owners", "Solopreneurs"],
  problemStatement: "Creators represent a massive economy but use fragmented tools, leading to lost data, missed opportunities, and technical overwhelm.",
  mvpScope: "A core contact management layer with automated outreach triggers and a unified dashboard for tracking sponsorship deals.",
  coreFeatures: [
    { name: "Audience CRM", description: "Centralized database of all subscribers and sponsors.", priority: "High" },
    { name: "Automation Flows", description: "Visual builder for automated email and social outreach.", priority: "High" },
    { name: "Deal Tracker", description: "Kanban board for managing sponsorship pipelines.", priority: "Medium" }
  ],
  userRoles: [
    { role: "Creator", capabilities: ["Manage audience", "Build automations", "View deals"] },
    { role: "Brand Manager", capabilities: ["Review proposals", "Track ROI", "Manage payments"] }
  ],
  futureRoadmap: ["AI Copywriting Assistant", "Community Forum Integration", "Custom Domain Support"]
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

    // FOR TEST: Simulate progress and return success regardless of API
    try {
      await new Promise(r => setTimeout(r, 800));
      setProgress("Understanding your idea...");
      await new Promise(r => setTimeout(r, 800));
      setProgress("Defining user roles...");
      await new Promise(r => setTimeout(r, 800));
      setProgress("Mapping core features...");
      await new Promise(r => setTimeout(r, 800));
      setProgress("Scoping your MVP...");
      await new Promise(r => setTimeout(r, 800));
      setProgress("Building your architecture...");
      await new Promise(r => setTimeout(r, 1000));

      // Attempt real API, but catch errors to allow mock success
      try {
        const response = await fetch("/api/generate/architecture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brief }),
        })
        
        if (response.ok) {
           const reader = response.body?.getReader()
           if (reader) {
              const decoder = new TextDecoder()
              let buffer = ""
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                buffer += decoder.decode(value, { stream: true })
                let boundary = buffer.indexOf("\n\n")
                while (boundary !== -1) {
                  const chunk = buffer.substring(0, boundary).trim()
                  buffer = buffer.substring(boundary + 2)
                  if (chunk.includes("event: result")) {
                    const data = JSON.parse(chunk.split("data: ")[1]);
                    setResult(data);
                    setStatus("success");
                    return; 
                  }
                  boundary = buffer.indexOf("\n\n")
                }
              }
           }
        }
      } catch (e) {
        console.warn("API failed, falling back to mock for test:", e);
      }

      // Fallback to mock for testing the UI flow
      setResult({
        ...MOCK_RESULT,
        productName: brief.split(" ").slice(0, 2).join(" ") || MOCK_RESULT.productName,
        concept: brief.length > 50 ? brief : MOCK_RESULT.concept
      });
      setStatus("success");

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
