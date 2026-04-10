"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
))
SegmentedControl.displayName = TabsPrimitive.Root.displayName

const SegmentedControlList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-md bg-bg-surface3 p-1 text-text-secondary",
      className
    )}
    {...props}
  />
))
SegmentedControlList.displayName = TabsPrimitive.List.displayName

const SegmentedControlTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-label-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-bg-surface2 data-[state=active]:text-text-primary data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
SegmentedControlTrigger.displayName = TabsPrimitive.Trigger.displayName

const SegmentedControlContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-default",
      className
    )}
    {...props}
  />
))
SegmentedControlContent.displayName = TabsPrimitive.Content.displayName

export { SegmentedControl, SegmentedControlList, SegmentedControlTrigger, SegmentedControlContent }
