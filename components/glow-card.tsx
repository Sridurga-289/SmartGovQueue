'use client'

import React from 'react'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  withGlass?: boolean
  withGlow?: boolean
  animated?: boolean
}

export function GlowCard({
  children,
  className = '',
  withGlass = true,
  withGlow = true,
  animated = true,
}: GlowCardProps) {
  return (
    <div
      className={`
        rounded-lg p-6 transition-all duration-300
        ${withGlass ? 'glass-effect' : 'bg-card'}
        ${withGlow ? 'glow-card' : ''}
        ${animated ? 'hover-lift' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
