"use client"

import * as React from "react"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { BrandInputForm } from "@/components/features/design-system/brand-input-form"
import { TokenViewer } from "@/components/features/design-system/token-viewer"
import { useDesignSystemGenerator } from "@/hooks/use-design-system-generator"
import { persistDesignSystem } from "@/lib/actions/design-system"
import { Save, RotateCcw } from "lucide-react"

export default function DesignSystemPage() {
  const { generate, status, progress, result, reset } = useDesignSystemGenerator()
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    if (!result) return
    setIsSaving(true)
    try {
      const res = await persistDesignSystem("mock-product-id", result) // Mock ID for demo
      if (res.success) {
        alert("Design System Saved Successfully!")
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <AppHeader 
        title="Design System Studio" 
        actions={
          status === "success" && (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving} className="gap-2 bg-brand-default text-white">
                {isSaving ? <Spinner size="sm" /> : <Save className="h-4 w-4" />}
                Save Design System
              </Button>
            </div>
          )
        }
      />

      {status === "idle" && (
        <BrandInputForm onSubmit={generate} isLoading={false} />
      )}

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center p-12 min-h-[500px]">
           <div className="flex flex-col items-center gap-6 text-center">
              <Spinner size="lg" className="text-brand-text" />
              <div className="space-y-1">
                 <p className="text-heading-md font-semibold text-text-primary">{progress}</p>
                 <p className="text-body-sm text-text-secondary">Claude is constructing your brand's visual DNA...</p>
              </div>
           </div>
        </div>
      )}

      {status === "success" && result && (
        <div className="space-y-8 max-w-4xl mx-auto w-full">
           <TokenViewer tokens={result} />
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center justify-center p-12 text-center min-h-[500px]">
           <h3 className="text-heading-md font-semibold text-text-primary mb-2">Generation Failed</h3>
           <Button variant="secondary" onClick={reset}>Try Again</Button>
        </div>
      )}
    </div>
  )
}
