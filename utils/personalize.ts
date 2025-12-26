// Utility function to personalize text based on user data
import { UserData } from '@/store/onboarding-store'

/**
 * Replace placeholders in text with user data
 * Supported placeholders:
 * - {name} - User's name
 * - {goal} - User's goal
 * - {weight} - Target weight
 * - {weightToLose} - Weight to lose
 */
export function personalizeText(text: string | undefined, userData: UserData | undefined, results?: { weightToLose?: number }): string {
  if (!text) return ''
  if (!userData) return text
  let personalizedText = text

  // Replace {name} with user's name or a default
  if (userData.name) {
    personalizedText = personalizedText.replace(/{name}/g, userData.name)
  }

  // Replace {goal} with formatted goal
  if (userData.goal) {
    const goalText = userData.goal.replace(/_/g, ' ')
    personalizedText = personalizedText.replace(/{goal}/g, goalText)
  }

  // Replace {weight} with target weight
  if (userData.targetWeight) {
    personalizedText = personalizedText.replace(/{weight}/g, String(userData.targetWeight))
  }

  // Replace {weightToLose} with calculated weight to lose
  if (results?.weightToLose) {
    personalizedText = personalizedText.replace(/{weightToLose}/g, String(Math.round(results.weightToLose)))
  } else if (userData.currentWeight && userData.targetWeight) {
    const weightToLose = userData.currentWeight - userData.targetWeight
    personalizedText = personalizedText.replace(/{weightToLose}/g, String(Math.round(weightToLose)))
  }

  return personalizedText
}

