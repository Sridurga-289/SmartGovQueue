'use client'

import React from 'react'

interface GradientBackgroundProps {
  children: React.ReactNode
  className?: string
  isDark?: boolean
  animated?: boolean
}

export function GradientBackground({
  children,
  className = '',
  isDark = false,
  animated = true,
}: GradientBackgroundProps) {
  return (
    <div
      className={`
        relative w-full overflow-hidden
        ${isDark ? 'dark-gradient-bg' : 'light-shining-bg'}
        ${animated ? '' : 'animate-none'}
        ${className}
      `}
    >
      {/* Overlay for additional depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
