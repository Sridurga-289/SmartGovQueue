'use client'

import { useRef, useCallback } from 'react'

interface RippleCoordinates {
  x: number
  y: number
  size: number
}

export function useTouchRipple() {
  const rippleRef = useRef<HTMLElement>(null)

  const addRipple = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!rippleRef.current) return

    const rect = rippleRef.current.getBoundingClientRect()
    let x = 0
    let y = 0

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    const maxDim = Math.max(rect.width, rect.height)
    const radius = maxDim / 2
    const diameter = radius * 2

    const ripple = document.createElement('span')
    ripple.className = 'absolute pointer-events-none rounded-full bg-white/20 transform -translate-x-1/2 -translate-y-1/2'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = `${diameter}px`
    ripple.style.height = `${diameter}px`
    ripple.style.animation = 'ripple 0.6s ease-out'

    rippleRef.current.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  }, [])

  return { rippleRef, addRipple }
}
