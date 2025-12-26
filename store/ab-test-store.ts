import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FlowVersion = 'v1' | 'v2'

interface VersionInfo {
  name: string
  pages: number
  highlights: string[]
}

export const VERSION_INFO: Record<FlowVersion, VersionInfo> = {
  v1: {
    name: 'Version 1 (Baseline)',
    pages: 37,
    highlights: [
      'Original onboarding flow',
      'Standard question progression',
      'Classic value proposition'
    ]
  },
  v2: {
    name: 'Version 2 (Optimized)',
    pages: 40,
    highlights: [
      'Enhanced engagement mechanics',
      'Improved conversion funnel',
      'Personalized result presentation',
      'Additional soft commitment points'
    ]
  }
}

interface ABTestState {
  currentVersion: FlowVersion
  setVersion: (version: FlowVersion) => void
}

export const useABTestStore = create<ABTestState>()(
  persist(
    (set) => ({
      currentVersion: 'v1',
      setVersion: (version: FlowVersion) => set({ currentVersion: version })
    }),
    {
      name: 'ab-test-storage'
    }
  )
)

