"use client"

import * as React from "react"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { User, CreditCard, Share2, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("account")

  return (
    <div className="flex flex-col gap-8">
      <AppHeader title="Settings" />

      <div className="flex flex-col md:flex-row gap-12">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-48 flex flex-col gap-1">
          <button
            onClick={() => setActiveTab("account")}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-label-md transition-colors",
              activeTab === "account" ? "bg-bg-surface2 text-text-primary font-semibold" : "text-text-secondary hover:bg-bg-surface1 hover:text-text-primary"
            )}
          >
            <User className="h-4 w-4" />
            Account
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-label-md transition-colors",
              activeTab === "billing" ? "bg-bg-surface2 text-text-primary font-semibold" : "text-text-secondary hover:bg-bg-surface1 hover:text-text-primary"
            )}
          >
            <CreditCard className="h-4 w-4" />
            Billing
          </button>
          <button
            onClick={() => setActiveTab("exports")}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-label-md transition-colors",
              activeTab === "exports" ? "bg-bg-surface2 text-text-primary font-semibold" : "text-text-secondary hover:bg-bg-surface1 hover:text-text-primary"
            )}
          >
            <Share2 className="h-4 w-4" />
            Exports
          </button>
        </aside>

        {/* Content Area */}
        <div className="flex-1 max-w-2xl">
          {activeTab === "account" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
              <section className="space-y-4">
                <div>
                  <h3 className="text-heading-md font-semibold text-text-primary">Profile</h3>
                  <p className="text-body-sm text-text-secondary">Manage your public information.</p>
                </div>
                <div className="grid gap-4">
                   <div className="space-y-2">
                      <label className="text-label-sm text-text-primary">Display Name</label>
                      <Input defaultValue="Rakibul Islam" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-label-sm text-text-primary">Email Address</label>
                      <Input defaultValue="rakibulislam@example.com" disabled />
                   </div>
                </div>
                <Button size="sm">Save Changes</Button>
              </section>

              <Separator />

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-feedback-error">
                  <ShieldAlert className="h-5 w-5" />
                  <h3 className="text-heading-md font-semibold">Danger Zone</h3>
                </div>
                <p className="text-body-sm text-text-secondary">Permanently delete your account and all product data. This cannot be undone.</p>
                <Button variant="destructive" size="sm">Delete Account</Button>
              </section>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
               <section className="space-y-4">
                <div>
                  <h3 className="text-heading-md font-semibold text-text-primary">Current Plan</h3>
                  <p className="text-body-sm text-text-secondary">You are currently on the free version of Forge.</p>
                </div>
                <div className="rounded-xl border border-border-default bg-bg-surface1 p-6 flex flex-col gap-4">
                   <div className="flex justify-between items-start">
                      <div>
                        <p className="text-heading-lg font-bold text-text-primary">Free</p>
                        <p className="text-body-sm text-text-secondary">Limited to 3 products and basic exports.</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-bg-surface3 text-caption text-text-primary font-bold">CURRENT</span>
                   </div>
                   <Button variant="secondary" className="w-full">Upgrade to Pro</Button>
                </div>
              </section>
            </div>
          )}

          {activeTab === "exports" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
               <section className="space-y-4">
                <div>
                  <h3 className="text-heading-md font-semibold text-text-primary">Export Defaults</h3>
                  <p className="text-body-sm text-text-secondary">Configure how your products are exported for developers.</p>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-label-md text-text-primary">Automatic JSON generation</p>
                        <p className="text-caption text-text-tertiary">Includes raw product tokens in every export.</p>
                      </div>
                      {/* Placeholder for Switch component */}
                      <div className="h-6 w-11 rounded-full bg-brand-default" />
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-label-md text-text-primary">Public sharing links</p>
                        <p className="text-caption text-text-tertiary">Allow outsiders to view your product architecture via URL.</p>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-bg-surface3" />
                   </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
