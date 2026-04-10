import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-bg-surface3", className)}
      {...props}
    />
  )
}

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {}

function SkeletonCard({ className, ...props }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-surface2 p-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="mt-auto pt-4 flex justify-end">
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

export { Skeleton, SkeletonCard }
