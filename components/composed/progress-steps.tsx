import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: string[]
  currentStep: number
}

function ProgressSteps({ steps, currentStep, className, ...props }: ProgressStepsProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex w-full items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-label-md font-semibold transition-colors duration-300",
                    isCompleted ? "bg-brand-default text-text-primary" : 
                    isCurrent ? "border-2 border-brand-default bg-brand-subtle text-brand-text" : 
                    "border border-border-default bg-bg-surface2 text-text-tertiary"
                  )}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "h-0.5 flex-1 mx-2 transition-colors duration-300",
                    isCompleted ? "bg-brand-default" : "bg-border-subtle"
                  )} 
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
      <div className="flex justify-between w-full mt-2">
        {steps.map((step, index) => (
          <span 
            key={`${step}-label`}
            className={cn(
              "text-label-sm text-center flex-1",
              index === currentStep ? "text-text-primary font-medium" : "text-text-secondary"
            )}
            style={{ marginLeft: index === 0 ? '-1rem' : '0', marginRight: index === steps.length - 1 ? '-1rem' : '0' }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}

export { ProgressSteps }
