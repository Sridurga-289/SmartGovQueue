"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "group relative overflow-hidden",
          "transition-transform duration-150 ease-out will-change-transform",
          "hover:scale-[1.02] active:scale-[0.98]",
          className
        )}
        {...props}
      >
        {/* Simple shine on hover */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-300 ease-out group-hover:translate-x-full will-change-transform" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Button>
    )
  }
)
AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }
