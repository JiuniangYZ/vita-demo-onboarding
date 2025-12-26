import { create } from 'zustand'

// 用户数据类型
export interface UserData {
  goal?: string
  gender?: string
  age?: number
  height?: number
  currentWeight?: number
  targetWeight?: number
  activityLevel?: string
  dietType?: string
  challenges?: string[]
  name?: string
  email?: string
  referralCode?: string
}

// 结果数据类型
export interface Results {
  dailyCalories: number
  bmi: number
  estimatedTime?: string
  weightToLose?: number
  targetDate?: string
  tdee?: number
  weeklyLoss?: number
}

// Store State 类型
interface OnboardingState {
  currentStep: number
  totalSteps: number
  userData: UserData
  results: Results | null
  isManualNavigation: boolean
  direction: 'forward' | 'backward'
  
  // Game states
  scanGameCompleted: boolean
  spinAttempts: number
  discountWon: number | null
  
  // Actions
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  setTotalSteps: (total: number) => void
  updateUserData: (data: Partial<UserData>) => void
  setUserData: (key: keyof UserData, value: any) => void
  setResults: (results: Results) => void
  resetDemo: () => void
  clearManualNavigation: () => void
  
  // Game actions
  completeScanGame: () => void
  spinWheel: (discount: number) => void
  completePayment: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 1,
  totalSteps: 37,
  userData: {},
  results: null,
  isManualNavigation: false,
  direction: 'forward',
  
  // Game states
  scanGameCompleted: false,
  spinAttempts: 0,
  discountWon: null,
  
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    isManualNavigation: false,
    direction: 'forward'
  })),
  
  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 1),
    isManualNavigation: false,
    direction: 'backward'
  })),
  
  goToStep: (step: number) => set((state) => ({
    currentStep: Math.max(1, Math.min(step, state.totalSteps)),
    isManualNavigation: true,
    direction: step > state.currentStep ? 'forward' : 'backward'
  })),
  
  setTotalSteps: (total: number) => set({ totalSteps: total }),
  
  updateUserData: (data: Partial<UserData>) => set((state) => ({
    userData: { ...state.userData, ...data }
  })),
  
  setUserData: (key: keyof UserData, value: any) => set((state) => ({
    userData: { ...state.userData, [key]: value }
  })),
  
  setResults: (results: Results) => set({ results }),
  
  resetDemo: () => set({
    currentStep: 1,
    userData: {},
    results: null,
    isManualNavigation: false,
    direction: 'forward',
    scanGameCompleted: false,
    spinAttempts: 0,
    discountWon: null
  }),
  
  clearManualNavigation: () => set({ isManualNavigation: false }),
  
  // Game actions
  completeScanGame: () => set({ scanGameCompleted: true }),
  
  spinWheel: (discount: number) => set((state) => ({
    spinAttempts: state.spinAttempts + 1,
    discountWon: discount
  })),
  
  completePayment: () => set((state) => ({ currentStep: state.currentStep + 1 }))
}))

// Calculate personalized results based on user data
export function calculateResults(userData: UserData): Results {
  const { currentWeight, targetWeight, height, age, gender, activityLevel } = userData

  // Default values
  let dailyCalories = 1800
  let bmi = 22
  let estimatedTime = '8-12 weeks'
  let weightToLose = 0

  // Calculate BMI if height and current weight are available
  if (height && currentWeight) {
    const heightInMeters = height / 100
    bmi = parseFloat((currentWeight / (heightInMeters * heightInMeters)).toFixed(1))
  }

  // Calculate weight to lose
  if (currentWeight && targetWeight) {
    weightToLose = currentWeight - targetWeight
  }

  // Calculate daily calories based on multiple factors
  if (currentWeight && height && age) {
    // Using Mifflin-St Jeor Equation
    let bmr: number
    if (gender === 'male') {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161
    }

    // Activity level multiplier
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }

    const multiplier = activityMultipliers[activityLevel || 'moderate'] || 1.55
    const maintenanceCalories = bmr * multiplier

    // For weight loss, subtract 500 calories (roughly 0.5kg per week)
    dailyCalories = Math.round(maintenanceCalories - 500)

    // Ensure minimum calories
    dailyCalories = Math.max(dailyCalories, gender === 'male' ? 1500 : 1200)
  }

  // Estimate time (assuming 0.5kg per week is healthy)
  if (weightToLose > 0) {
    const weeksNeeded = Math.ceil((weightToLose / 0.5))
    if (weeksNeeded < 4) {
      estimatedTime = `${weeksNeeded} weeks`
    } else {
      const monthsNeeded = Math.ceil(weeksNeeded / 4)
      estimatedTime = `${monthsNeeded} ${monthsNeeded === 1 ? 'month' : 'months'}`
    }
  }

  // Calculate target date
  let targetDate = ''
  if (weightToLose > 0) {
    const weeksNeeded = Math.ceil((weightToLose / 0.5))
    const targetDateObj = new Date()
    targetDateObj.setDate(targetDateObj.getDate() + (weeksNeeded * 7))
    targetDate = targetDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Calculate TDEE (Total Daily Energy Expenditure) - same as maintenance calories
  let tdee = 0
  if (currentWeight && height && age) {
    let bmr: number
    if (gender === 'male') {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161
    }
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    const multiplier = activityMultipliers[activityLevel || 'moderate'] || 1.55
    tdee = Math.round(bmr * multiplier)
  }

  return {
    dailyCalories,
    bmi,
    estimatedTime,
    weightToLose,
    targetDate,
    tdee,
    weeklyLoss: 0.5 // Healthy weight loss rate in kg per week
  }
}
