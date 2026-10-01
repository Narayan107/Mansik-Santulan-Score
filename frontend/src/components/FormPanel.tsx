import React from 'react'
import {
  StudentFormData,
  Gender,
  AcademicLevel,
  Platform,
  Purpose,
  StressLevel
} from '../types'
import {
  User,
  GraduationCap,
  Globe,
  Sliders,
  Smartphone,
  BookOpen,
  Dumbbell,
  Moon,
  Flame,
  ArrowRight,
  Loader2,
  CheckCircle2
} from 'lucide-react'

interface FormPanelProps {
  formData: StudentFormData
  setFormData: React.Dispatch<React.SetStateAction<StudentFormData>>
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  isValid: boolean
}

const COUNTRIES = [
  'India',
  'USA',
  'Canada',
  'Australia',
  'UK',
  'Germany',
  'Mexico',
  'Turkey',
  'France',
  'Other'
]

const PLATFORMS: { name: Platform; icon: string; color: string }[] = [
  { name: 'YouTube', icon: '▶', color: 'hover:text-red-500 hover:border-red-300' },
  { name: 'Instagram', icon: '📷', color: 'hover:text-pink-500 hover:border-pink-300' },
  { name: 'TikTok', icon: '♪', color: 'hover:text-slate-800 dark:hover:text-slate-200' },
  { name: 'WhatsApp', icon: '💬', color: 'hover:text-emerald-500 hover:border-emerald-300' },
  { name: 'Snapchat', icon: '👻', color: 'hover:text-yellow-500 hover:border-yellow-300' },
  { name: 'Twitter', icon: '𝕏', color: 'hover:text-slate-700 hover:border-slate-400' },
  { name: 'LinkedIn', icon: 'in', color: 'hover:text-blue-600 hover:border-blue-300' },
  { name: 'Facebook', icon: 'f', color: 'hover:text-blue-500 hover:border-blue-300' },
  { name: 'WeChat', icon: '微', color: 'hover:text-green-600 hover:border-green-300' },
  { name: 'LINE', icon: 'L', color: 'hover:text-emerald-600 hover:border-emerald-300' },
  { name: 'KakaoTalk', icon: 'K', color: 'hover:text-yellow-600 hover:border-yellow-300' },
  { name: 'VKontakte', icon: 'VK', color: 'hover:text-blue-700 hover:border-blue-300' }
]

const PURPOSES: Purpose[] = ['Entertainment', 'Education', 'Networking', 'News']
const ACADEMIC_LEVELS: AcademicLevel[] = ['High School', 'Undergraduate', 'Graduate']
const STRESS_LEVELS: { level: StressLevel; color: string; activeClass: string }[] = [
  { level: 'Low', color: 'border-emerald-300', activeClass: 'bg-emerald-600 text-white shadow-emerald-500/30' },
  { level: 'Medium', color: 'border-amber-300', activeClass: 'bg-amber-500 text-white shadow-amber-500/30' },
  { level: 'High', color: 'border-orange-400', activeClass: 'bg-orange-500 text-white shadow-orange-500/30' },
  { level: 'Very High', color: 'border-rose-400', activeClass: 'bg-rose-600 text-white shadow-rose-500/30' }
]

export const FormPanel: React.FC<FormPanelProps> = ({
  formData,
  setFormData,
  onSubmit,
  loading,
  isValid
}) => {
  const updateField = <K extends keyof StudentFormData>(key: K, value: StudentFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }
  const sliderStyle = (value: number, min: number, max: number) => {
  const percentage = ((value - min) / (max - min)) * 100

  return {
    background: `linear-gradient(to right, #0E4B3C ${percentage}%, #c8e6dc ${percentage}%)`
  }
}

  // Dynamic helper tips
  const getScreenTimeHelper = (hrs: number) => {
    if (hrs <= 2) return '🌱 Minimal screen friction — optimal for rest'
    if (hrs <= 4.5) return '⚡ Moderate digital usage — remember micro-breaks'
    if (hrs <= 7) return '⚠️ Higher screen time — may impact ocular and mental stamina'
    return '🚨 Heavy digital exposure — prioritize digital sunset periods'
  }

  const getUnlocksHelper = (count: number) => {
    if (count <= 35) return '✨ Low notification fragmentation'
    if (count <= 80) return '📱 Standard checking frequency'
    return '🔔 Frequent checking — consider silent focus modes'
  }

  const getSleepHelper = (hrs: number) => {
    if (hrs < 6) return '⚠️ Sub-optimal sleep window — recovery may be limited'
    if (hrs <= 8.5) return '🌙 Balanced, restorative sleep range'
    return '💤 Extended sleep window — ensure regular circadian rhythm'
  }

  return (
    <div className="w-full rounded-3xl glass-panel-light p-6 sm:p-8 shadow-glass transition-all border border-slate-200/80 dark:border-slate-800">
      {/* Title & Introduction */}
      <div className="mb-8 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          Mental Wellbeing Signal
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Share your daily study, screen, and lifestyle rhythms to analyze your personalized signal.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* SECTION 1: PROFILE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <User className="w-4 h-4" />
            <span>1. Profile Demographics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Age Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Age (years)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={formData.age || ''}
                  onChange={e => updateField('age', parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all shadow-sm"
                  placeholder="e.g. 21"
                  required
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">10-100</span>
              </div>
            </div>

            {/* Gender Segmented */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
                {(['Male', 'Female'] as Gender[]).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateField('gender', g)}
                    className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                      formData.gender === g
                        ? 'bg-[#0E4B3C] text-white shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Country Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                Country
              </label>
              <select
                value={formData.country}
                onChange={e => updateField('country', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all shadow-sm"
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: ACADEMIC & DIGITAL HABITS */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Smartphone className="w-4 h-4" />
            <span>2. Academic &amp; Digital Habits</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Academic Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                Academic Level
              </label>
              <select
                value={formData.academic_level}
                onChange={e => updateField('academic_level', e.target.value as AcademicLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all shadow-sm"
              >
                {ACADEMIC_LEVELS.map(lvl => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Purpose of Use */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Primary Purpose of Device Use
              </label>
              <select
                value={formData.purpose_of_use}
                onChange={e => updateField('purpose_of_use', e.target.value as Purpose)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all shadow-sm"
              >
                {PURPOSES.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Most Used Platform Pills/Grid */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Most-Used Platform
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {PLATFORMS.map(p => {
                const isSelected = formData.most_used_platform === p.name
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => updateField('most_used_platform', p.name)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#0E4B3C] dark:bg-teal-900 text-white border-teal-500 shadow-md font-semibold ring-1 ring-teal-400'
                        : 'bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-400/50 hover:bg-teal-50/30'
                    }`}
                  >
                    <span className="text-xs">{p.icon}</span>
                    <span className="truncate">{p.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Screen Time Slider + Number */}
          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                Avg Daily Screen Time
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={formData.avg_daily_usage_hours}
                  onChange={e => updateField('avg_daily_usage_hours', Math.min(24, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-16 px-2 py-1 text-center font-bold text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300"
                />
                <span className="text-xs text-slate-500 font-medium">hrs/day</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={formData.avg_daily_usage_hours}
              onChange={e => updateField('avg_daily_usage_hours', parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
              {getScreenTimeHelper(formData.avg_daily_usage_hours)}
            </p>
          </div>

          {/* Phone Unlocks Slider + Number */}
          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                Daily Phone Unlocks
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={formData.daily_unlocks}
                  onChange={e => updateField('daily_unlocks', Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 px-2 py-1 text-center font-bold text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300"
                />
                <span className="text-xs text-slate-500 font-medium">unlocks</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              step="1"
              value={formData.daily_unlocks}
              onChange={e => updateField('daily_unlocks', parseInt(e.target.value))}
              className="w-full"
              style={sliderStyle(formData.daily_unlocks, 0, 180)}
            />
            <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
              {getUnlocksHelper(formData.daily_unlocks)}
            </p>
          </div>
        </div>

        {/* SECTION 3: LIFESTYLE & STRESS */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Flame className="w-4 h-4" />
            <span>3. Lifestyle &amp; Wellbeing Metrics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Study Hours */}
            <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Study
                </span>
                <span className="text-teal-700 dark:text-teal-300 font-bold">{formData.study_hours} h</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                step="0.5"
                value={formData.study_hours}
                onChange={e => updateField('study_hours', parseFloat(e.target.value))}
                className="w-full"

                style={sliderStyle(formData.study_hours, 0, 20)}
              />
              <span className="text-[10px] text-slate-500 block text-right">0–14 hrs/day</span>
            </div>

            {/* Physical Activity */}
            <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-500" /> Physical
                </span>
                <span className="text-teal-700 dark:text-teal-300 font-bold">{formData.physical_activity_hours} h</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={formData.physical_activity_hours}
                onChange={e => updateField('physical_activity_hours', parseFloat(e.target.value))}
                className="w-full"
                style={sliderStyle(formData.physical_activity_hours, 0, 6)}
              />
              <span className="text-[10px] text-slate-500 block text-right">0–6 hrs/day</span>
            </div>

            {/* Sleep Hours */}
            <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" /> Sleep
                </span>
                <span className="text-teal-700 dark:text-teal-300 font-bold">{formData.sleep_hours_per_night} h</span>
              </div>
              <input
                type="range"
                min="2"
                max="14"
                step="0.5"
                value={formData.sleep_hours_per_night}
                onChange={e => updateField('sleep_hours_per_night', parseFloat(e.target.value))}
                className="w-full"
                style={sliderStyle(formData.sleep_hours_per_night, 2, 14)}
              />
              <span className="text-[10px] text-teal-600 dark:text-teal-400 block text-right">
                {getSleepHelper(formData.sleep_hours_per_night)}
              </span>
            </div>
          </div>

          {/* Stress Level Segmented Pill Selector */}
          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Perceived Stress Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {STRESS_LEVELS.map(s => {
                const isSelected = formData.stress_level === s.level
                return (
                  <button
                    key={s.level}
                    type="button"
                    onClick={() => updateField('stress_level', s.level)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? `${s.activeClass} shadow-md scale-[1.02]`
                        : 'bg-white dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{s.level}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* SUBMISSION CTA */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg ${
              !isValid || loading
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-[#0E4B3C] via-[#166551] to-[#2A9D8F] hover:from-[#135D4B] hover:to-[#228477] text-white shadow-emerald-950/20 hover:shadow-emerald-900/30 hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Reading the signal&hellip;</span>
              </>
            ) : (
              <>
                <span>Read my signal</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          {!isValid && (
            <p className="text-center text-xs text-rose-500 mt-2 font-medium">
              Please enter an age between 10 and 100.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
