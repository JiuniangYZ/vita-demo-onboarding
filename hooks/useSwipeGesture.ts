'use client'

import { useEffect, useRef, useState } from 'react'

interface SwipeGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number // 最小滑动距离（像素）
}

/**
 * 触摸滑动手势Hook
 * 用于移动设备上的左右滑动导航
 */
export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50
}: SwipeGestureOptions) {
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const [isSwiping, setIsSwiping] = useState(false)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
      setIsSwiping(false)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return

      const deltaX = e.touches[0].clientX - touchStartX.current
      const deltaY = e.touches[0].clientY - touchStartY.current

      // 判断是否为水平滑动（横向距离大于纵向距离）
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
        setIsSwiping(true)
        // 阻止垂直滚动
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX.current || !isSwiping) return

      const touchEndX = e.changedTouches[0].clientX
      const deltaX = touchEndX - touchStartX.current

      // 向左滑动（下一页）
      if (deltaX < -threshold && onSwipeLeft) {
        onSwipeLeft()
      }
      // 向右滑动（上一页）
      else if (deltaX > threshold && onSwipeRight) {
        onSwipeRight()
      }

      touchStartX.current = 0
      touchStartY.current = 0
      setIsSwiping(false)
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, threshold, isSwiping])

  return { isSwiping }
}

