import React from 'react'
import { Sparkles, Sun, Moon, Activity, ShieldCheck } from 'lucide-react'

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void
  apiHealthy: boolean | null
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, apiHealthy }) => {
  return (
    <header className="w-full max-w-7xl mx-auto mb-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-6 rounded-2xl glass-panel-light shadow-glass transition-all">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0E4B3C] via-[#1A7C64] to-[#2DD4BF] flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
            <Sparkles className="w-6 h-6 animate-pulse text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#0E4B3C] to-[#2A9D8F] dark:from-emerald-300 dark:to-teal-200 bg-clip-text text-transparent">
                Mental Wellbeing Signal
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3 h-3" /> ML Powered
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Interactive lifestyle analytics & academic wellbeing assessment
            </p>
          </div>
        </div>

        {/* Controls & API Status */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* API Server Live Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                apiHealthy === false ? 'bg-red-400' : 'bg-emerald-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                apiHealthy === false ? 'bg-red-500' : 'bg-emerald-500'
              }`} />
            </span>
            <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              {apiHealthy === false ? 'API Offline (:2200)' : 'API Live (:2200)'}
            </span>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            type="button"
            aria-label="Toggle theme mode"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 transition-transform duration-300 -rotate-12 hover:rotate-0" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
