'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOnboardingStore } from '@/store/onboarding-store'
import { useABTestStore, VERSION_INFO, FlowVersion } from '@/store/ab-test-store'
import { X, RotateCcw, Check } from 'lucide-react'

/**
 * 移动端开发者工具
 * 通过三指长按屏幕顶部2秒激活
 */
export function MobileDevTools() {
  const [isOpen, setIsOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const { currentStep, totalSteps, goToStep, resetDemo } = useOnboardingStore()
  const { currentVersion, setVersion } = useABTestStore()

  const handleTouchStart = (e: React.TouchEvent) => {
    // 检测三指触摸在屏幕顶部
    if (e.touches.length === 3 && e.touches[0].clientY < 100) {
      setTouchStart(Date.now())
    }
  }

  const handleTouchEnd = () => {
    // 长按2秒激活
    if (touchStart && Date.now() - touchStart > 2000) {
      setIsOpen(true)
    }
    setTouchStart(0)
  }

  const handleVersionChange = (version: FlowVersion) => {
    if (version !== currentVersion) {
      setVersion(version)
      resetDemo()
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* 隐藏的触摸区域 */}
      <div
        className="fixed top-0 inset-x-0 h-20 z-50"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      />

      {/* 开发者工具面板 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* 工具面板 */}
            <motion.div
              className="fixed bottom-0 inset-x-0 bg-gray-900 rounded-t-3xl p-6 z-50"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* 头部 */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">开发者工具</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 版本切换 */}
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-3">选择版本</p>
                <div className="flex gap-2">
                  {(['v1', 'v2'] as FlowVersion[]).map((version) => (
                    <motion.button
                      key={version}
                      onClick={() => handleVersionChange(version)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                        currentVersion === version
                          ? version === 'v2'
                            ? 'bg-green-600 text-white'
                            : 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentVersion === version && <Check className="w-4 h-4" />}
                      {version.toUpperCase()}
                      <span className="text-xs opacity-70">
                        ({VERSION_INFO[version].pages}p)
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 进度控制 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-400 text-sm">当前进度</p>
                  <span className="text-white font-semibold">
                    {currentStep} / {totalSteps}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={totalSteps}
                  value={currentStep}
                  onChange={(e) => goToStep(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-purple-500"
                />
              </div>

              {/* 重置按钮 */}
              <motion.button
                onClick={() => {
                  resetDemo()
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl font-medium"
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
                重置Demo
              </motion.button>

              {/* 提示 */}
              <p className="text-gray-500 text-xs text-center mt-4">
                三指长按屏幕顶部2秒可再次打开此面板
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

