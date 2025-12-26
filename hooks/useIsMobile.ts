'use client'

import { useState, useEffect } from 'react'

/**
 * 检测是否为移动设备
 * 使用媒体查询和 User Agent 双重检测
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 媒体查询检测（屏幕宽度 < 768px）
    const checkMobile = () => {
      const mediaQuery = window.matchMedia('(max-width: 768px)')
      const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      setIsMobile(mediaQuery.matches || userAgent)
    }

    // 初始检测
    checkMobile()

    // 监听窗口大小变化
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleChange = () => checkMobile()
    
    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleChange)
    }
  }, [])

  return isMobile
}

