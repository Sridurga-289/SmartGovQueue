"use client"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  isPending?: boolean
  withGlow?: boolean
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, isPending = false, withGlow = true, disabled, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        setIsLoading(true)
        try {
          const result = props.onClick(e)
          if (result instanceof Promise) {
            await result
          }
        } finally {
          setIsLoading(false)
        }
      }
    }

    const isDisabled = disabled || isPending || isLoading

    return (
      <Button
        ref={ref}
        className={cn(
          "group relative overflow-hidden",
          "transition-all duration-200 ease-out will-change-transform",
          "hover:scale-[1.02] active:scale-[0.98]",
          withGlow && "btn-glow",
          isDisabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {/* Enhanced shine effect */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-300 ease-out group-hover:translate-x-full will-change-transform" />

        {/* Glow effect for dark mode */}
        {withGlow && (
          <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
        )}

        {/* Loading state */}
        {(isPending || isLoading) && (
          <span className="absolute inset-0 animate-loading-pulse" />
        )}

        <span className="relative z-10 flex items-center justify-center gap-2">
          {(isPending || isLoading) && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          {children}
        </span>
      </Button>
    )
  }
)
AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }
