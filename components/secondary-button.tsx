'use client'

import { forwardRef } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

interface SecondaryButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  icon?: React.ReactNode
}

const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ children, isLoading, icon, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="lg"
        className={cn('hover-lift font-semibold', className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
        {icon && !isLoading && <span className="mr-2">{icon}</span>}
        {children}
      </Button>
    )
  }
)
SecondaryButton.displayName = 'SecondaryButton'

export { SecondaryButton }
