import React, { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { FormPanel } from './components/FormPanel'
import { ResultPanel } from './components/ResultPanel'
import { StudentFormData, PanelState } from './types'

const API_BASE = 'https://mansik-santulan-score-qjb7.onrender.com'

const INITIAL_FORM: StudentFormData = {
  age: 22,
  gender: 'Male',
  country: 'India',
  academic_level: 'Graduate',
  most_used_platform: 'YouTube',
  purpose_of_use: 'Entertainment',
  avg_daily_usage_hours: 2.0,
  daily_unlocks: 50,
  study_hours: 2.0,
  physical_activity_hours: 1.0,
  sleep_hours_per_night: 7.0,
  stress_level: 'Medium'
}

export function App() {
  const [formData, setFormData] = useState<StudentFormData>(INITIAL_FORM)
  const [panelState, setPanelState] = useState<PanelState>('idle')
  const [score, setScore] = useState<number | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [apiHealthy, setApiHealthy] = useState<boolean | null>(null)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Synchronize dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Periodic health check of FastAPI server
  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/`, { method: 'GET' })
      if (res.ok) {
        setApiHealthy(true)
      } else {
        setApiHealthy(false)
      }
    } catch {
      setApiHealthy(false)
    }
  }, [])

  useEffect(() => {
    checkHealth()
    const timer = setInterval(checkHealth, 15000)
    return () => clearInterval(timer)
  }, [checkHealth])

  // Validation
  const isValid =
    formData.age >= 10 &&
    formData.age <= 100 &&
    formData.avg_daily_usage_hours >= 0 &&
    formData.avg_daily_usage_hours <= 24 &&
    formData.daily_unlocks >= 0 &&
    formData.study_hours >= 0 &&
    formData.study_hours <= 24 &&
    formData.physical_activity_hours >= 0 &&
    formData.physical_activity_hours <= 24 &&
    formData.sleep_hours_per_night >= 0 &&
    formData.sleep_hours_per_night <= 24 &&
    Boolean(formData.country) &&
    Boolean(formData.gender) &&
    Boolean(formData.academic_level) &&
    Boolean(formData.most_used_platform) &&
    Boolean(formData.purpose_of_use) &&
    Boolean(formData.stress_level)

  // Handle Predict Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || panelState === 'loading') return

    setPanelState('loading')
    setErrorMsg(null)

    // Format payload with exact JSON keys required by FastAPI backend
    const payload = {
      age: formData.age,
      gender: formData.gender,
      country: formData.country,
      academic_level: formData.academic_level,
      most_used_platform: formData.most_used_platform,
      purpose_of_use: formData.purpose_of_use,
      avg_daily_usage_hours: Number(formData.avg_daily_usage_hours),
      daily_unlocks: Number(formData.daily_unlocks),
      study_hours: Number(formData.study_hours),
      physical_activity_hours: Number(formData.physical_activity_hours),
      sleep_hours_per_night: Number(formData.sleep_hours_per_night),
      stress_level: formData.stress_level
    }

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(
          errorData.detail ? JSON.stringify(errorData.detail) : `Backend returned status ${res.status}`
        )
      }

      const data = await res.json()
      if (typeof data.predicted_mental_health_score === 'number') {
        setScore(data.predicted_mental_health_score)
        setPanelState('result')
        setApiHealthy(true)
      } else {
        throw new Error('Invalid prediction format received from backend.')
      }
    } catch (err: unknown) {
      console.error('Prediction failed:', err)
      const message = err instanceof Error ? err.message : 'Unknown network error'
      setErrorMsg(message)
      setPanelState('error')
      setApiHealthy(false)
    }
  }

  const handleReset = () => {
    setPanelState('idle')
    setScore(null)
    setErrorMsg(null)
  }

  return (
    <div className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 flex flex-col justify-between selection:bg-teal-500/20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Navigation & Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          apiHealthy={apiHealthy}
        />

        {/* Main 60% / 40% Split Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Form Panel: ~60% (7 cols out of 12) */}
          <div className="lg:col-span-7">
            <FormPanel
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={panelState === 'loading'}
              isValid={isValid}
            />
          </div>

          {/* Right Status & Prediction Panel: ~40% (5 cols out of 12) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <ResultPanel
              state={panelState}
              score={score}
              error={errorMsg}
              formData={formData}
              onReset={handleReset}
              onRetry={checkHealth}
            />
          </div>
        </main>
      </div>

      {/* Modern minimal footer */}
      <footer className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500 max-w-7xl mx-auto w-full py-4 border-t border-slate-200/60 dark:border-slate-800">
        <p>
          Mental Wellbeing Signal &bull; Built with FastAPI, scikit-learn, React 18, Tailwind CSS &amp; Recharts
        </p>
      </footer>
    </div>
  )
}
export default App
