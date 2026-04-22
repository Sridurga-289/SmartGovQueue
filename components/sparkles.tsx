'use client'

import React, { useEffect, useRef } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  delay: number
  tx: number
  ty: number
}

export function Sparkles({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sparkleIdRef = useRef(0)
  const [sparkles, setSparkles] = React.useState<Sparkle[]>([])

  const generateSparkle = (x: number, y: number): Sparkle => {
    const sparkleId = sparkleIdRef.current++
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 50 + 25
    return {
      id: sparkleId,
      x,
      y,
      delay: Math.random() * 0.2,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      // Create sparkles on mouse move but throttle it
      if (Math.random() > 0.9) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const sparkle = generateSparkle(x, y)
        setSparkles((prev) => [...prev, sparkle])

        // Remove sparkle after animation completes
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
        }, 600)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`sparkle-container ${className}`}>
      {children}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={
            {
              left: sparkle.x,
              top: sparkle.y,
              '--tx': `${sparkle.tx}px`,
              '--ty': `${sparkle.ty}px`,
              animationDelay: `${sparkle.delay}s`,
              width: '4px',
              height: '4px',
              backgroundColor: 'currentColor',
              borderRadius: '50%',
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
