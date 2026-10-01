export type Gender = 'Male' | 'Female'
export type AcademicLevel = 'Undergraduate' | 'Graduate' | 'High School'
export type Platform =
  | 'YouTube'
  | 'Instagram'
  | 'TikTok'
  | 'Facebook'
  | 'Twitter'
  | 'LinkedIn'
  | 'Snapchat'
  | 'WhatsApp'
  | 'WeChat'
  | 'LINE'
  | 'KakaoTalk'
  | 'VKontakte'

export type Purpose = 'Entertainment' | 'Education' | 'Networking' | 'News'
export type StressLevel = 'Low' | 'Medium' | 'High' | 'Very High'

export interface StudentFormData {
  age: number
  gender: Gender
  country: string
  academic_level: AcademicLevel
  most_used_platform: Platform
  purpose_of_use: Purpose
  avg_daily_usage_hours: number
  daily_unlocks: number
  study_hours: number
  physical_activity_hours: number
  sleep_hours_per_night: number
  stress_level: StressLevel
}

export interface PredictionResponse {
  predicted_mental_health_score: number
}

export type PanelState = 'idle' | 'loading' | 'result' | 'error'

export interface ScoreTier {
  range: [number, number]
  label: string
  color: string
  accentColor: string
  bgColor: string
  message: string
}
