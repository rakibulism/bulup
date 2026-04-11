import * as React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dark min-h-screen bg-bg-base text-text-primary flex items-center justify-center">
      {children}
    </div>
  )
}
