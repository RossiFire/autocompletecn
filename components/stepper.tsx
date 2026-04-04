"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Step {
  label?: string
  description?: string
  content?: React.ReactNode
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
  allContentVisible?: boolean
}

export function Stepper({ steps, currentStep, className, allContentVisible = false }: StepperProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isActive = isCompleted || isCurrent
        const isLast = index === steps.length - 1

        return (
          <div key={step.label} className="flex">
            {/* Step indicator column */}
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-muted text-muted-foreground"
                )}
              >
                {stepNumber}
              </div>
              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-16",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>

            {/* Step content column */}
            <div className="ml-4 pb-8">
              {step.label && (
                <p
                  className={cn(
                    "text-sm font-medium leading-10 mt-1.5",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
              )}
              {step.description && (
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
              {(isCurrent || allContentVisible) && step.content && (
                <div className="mt-4">{step.content}</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}