import * as React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { AppHeader } from "@/components/layout/app-header"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dark flex min-h-screen bg-bg-base text-text-primary">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto px-8 py-8 md:px-12 md:py-12">
          <div className="mx-auto w-full max-w-[1280px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
