import * as React from "react"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface InputFieldProps extends InputProps {
  label: string
  error?: string
  helperText?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    
    return (
      <div className={cn("grid w-full items-center gap-1.5", className)}>
        <label htmlFor={inputId} className="text-label-md text-text-primary">
          {label}
        </label>
        <Input 
          id={inputId} 
          ref={ref} 
          className={error ? "border-feedback-error focus-visible:ring-feedback-error" : ""}
          {...props} 
        />
        {helperText && !error && (
          <p className="text-caption text-text-tertiary">{helperText}</p>
        )}
        {error && (
          <p className="text-caption text-feedback-error">{error}</p>
        )}
      </div>
    )
  }
)
InputField.displayName = "InputField"

export { InputField }
