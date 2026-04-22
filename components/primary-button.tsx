'use client'

import { forwardRef } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

interface PrimaryButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, isLoading, icon, iconPosition = 'right', className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="default"
        size="lg"
        className={cn('btn-glow font-semibold', className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {iconPosition === 'left' && icon && !isLoading && <span className="mr-2">{icon}</span>}
        {isLoading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
        {children}
        {iconPosition === 'right' && icon && !isLoading && <span className="ml-2">{icon}</span>}
      </Button>
    )
  }
)
PrimaryButton.displayName = 'PrimaryButton'

export { PrimaryButton }
