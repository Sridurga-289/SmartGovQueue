'use client'

import { useEffect, useRef, useCallback } from 'react'

interface GestureEvent {
  type: 'swipe-left' | 'swipe-right' | 'swipe-up' | 'swipe-down' | 'long-press'
  direction?: string
}

interface GestureConfig {
  swipeThreshold?: number
  longPressDelay?: number
  onGesture?: (event: GestureEvent) => void
}

export function useGesture(config: GestureConfig = {}) {
  const {
    swipeThreshold = 50,
    longPressDelay = 500,
    onGesture,
  } = config

  const touchStartRef = useRef({ x: 0, y: 0, time: 0 })
  const longPressTimerRef = useRef<NodeJS.Timeout>()

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    }

    longPressTimerRef.current = setTimeout(() => {
      onGesture?.({ type: 'long-press' })
    }, longPressDelay)
  }, [longPressDelay, onGesture])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now(),
    }

    const diffX = touchEnd.x - touchStartRef.current.x
    const diffY = touchEnd.y - touchStartRef.current.y
    const timeDiff = touchEnd.time - touchStartRef.current.time

    // Quick swipe detection
    if (timeDiff < 300) {
      if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
        onGesture?.({
          type: diffX > 0 ? 'swipe-right' : 'swipe-left',
          direction: diffX > 0 ? 'right' : 'left',
        })
      } else if (Math.abs(diffY) > swipeThreshold && Math.abs(diffY) > Math.abs(diffX)) {
        onGesture?.({
          type: diffY > 0 ? 'swipe-down' : 'swipe-up',
          direction: diffY > 0 ? 'down' : 'up',
        })
      }
    }
  }, [swipeThreshold, onGesture])

  const handleTouchMove = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
    }
  }, [])

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
  }
}

export function useLongPress(callback: () => void, delay: number = 500) {
  const timerRef = useRef<NodeJS.Timeout>()

  const handleMouseDown = useCallback(() => {
    timerRef.current = setTimeout(callback, delay)
  }, [callback, delay])

  const handleMouseUp = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  const handleTouchStart = useCallback(() => {
    timerRef.current = setTimeout(callback, delay)
  }, [callback, delay])

  const handleTouchEnd = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  }
}
