import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { useTouchRipple } from '@/hooks'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive min-h-12 min-w-12 active:scale-95 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl',
        destructive:
          'bg-gradient-to-r from-destructive to-destructive/80 text-white hover:from-destructive/90 hover:to-destructive/70 shadow-lg hover:shadow-xl focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border-2 border-primary/30 bg-background/50 text-foreground hover:bg-primary/5 hover:border-primary/50 shadow-sm dark:bg-input/20 dark:border-primary/20 dark:hover:bg-primary/10',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg',
        ghost:
          'text-foreground hover:bg-accent/20 hover:text-accent-foreground dark:hover:bg-accent/30 active:bg-accent/40',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl',
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-4',
        sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
        lg: 'h-12 rounded-lg px-7 has-[>svg]:px-5 text-base',
        xl: 'h-14 rounded-lg px-8 has-[>svg]:px-6 text-lg font-semibold',
        icon: 'size-10',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  isSuccess?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, isSuccess = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const { rippleRef, addRipple } = useTouchRipple()

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({ variant: isSuccess ? 'success' : variant, size, className }),
          {
            'btn-glow': variant === 'default' || variant === 'destructive' || variant === 'success',
            'opacity-60 cursor-not-allowed': disabled || isLoading,
          }
        )}
        disabled={disabled || isLoading}
        onMouseDown={(e: React.MouseEvent) => {
          addRipple(e)
          props.onMouseDown?.(e)
        }}
        onTouchStart={(e: React.TouchEvent) => {
          addRipple(e)
          props.onTouchStart?.(e)
        }}
        {...props}
      >
        {isLoading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        )}
        {isSuccess && (
          <span className="inline-block mr-2">✓</span>
        )}
        <span className="relative z-10">{props.children}</span>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
