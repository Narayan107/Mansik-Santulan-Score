import React from 'react'
import { PanelState, StudentFormData } from '../types'
import { ScoreGauge } from './ScoreGauge'
import { AnalyticsChart } from './AnalyticsChart'
import {
  Sparkles,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  Heart
} from 'lucide-react'

interface ResultPanelProps {
  state: PanelState
  score: number | null
  error: string | null
  formData: StudentFormData
  onReset: () => void
  onRetry: () => void
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  state,
  score,
  error,
  formData,
  onReset,
  onRetry
}) => {
  return (
    <div className="w-full rounded-3xl glass-forest-card p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between border border-emerald-500/20 transition-all">
      {/* Ambient background glow accents */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between mb-4 pb-4 border-b border-emerald-800/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-800/80 border border-emerald-600/30 text-teal-300">
            <Heart className="w-4 h-4 fill-teal-300/30" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200/90">
            Prediction &amp; Status
          </span>
        </div>

        {state === 'result' && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-xs font-semibold text-emerald-200 border border-emerald-700/50 hover:border-teal-400/50 transition-all shadow-sm active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Run another read</span>
          </button>
        )}
      </div>

      {/* Error state */}
      {state === 'error' && (
        <div className="relative z-10 my-auto py-6 px-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <h4 className="font-semibold text-sm">Prediction Service Alert</h4>
          <p className="text-xs text-rose-300/90 max-w-sm mx-auto">
            {error || 'Unable to connect to FastAPI backend at http://127.0.0.1:2200.'}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold transition-all shadow-md"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Main Gauge Area */}
      {state !== 'error' && (
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
          <ScoreGauge score={score} state={state} />

          {/* Quick Metrics highlight pills when in Result mode */}
          {state === 'result' && (
            <div className="grid grid-cols-2 gap-2.5 w-full mt-4">
              <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-300/70 block truncate">Screen vs Rest</span>
                  <span className="text-xs font-bold text-emerald-100">
                    {formData.avg_daily_usage_hours}h / {formData.sleep_hours_per_night}h
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-300/70 block truncate">Unlocks Frequency</span>
                  <span className="text-xs font-bold text-emerald-100">
                    {formData.daily_unlocks} / day
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Recharts Analytics: Interactive Habits Breakdown */}
          <AnalyticsChart formData={formData} score={score} />
        </div>
      )}

      {/* Footer Disclaimer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-emerald-800/50 flex items-start gap-2 text-[11px] text-emerald-200/60">
        <HelpCircle className="w-4 h-4 text-emerald-400/80 shrink-0 mt-0.5" />
        <p className="leading-tight">
          <span className="font-semibold text-emerald-200">Disclaimer:</span> This is an educational machine learning model output, not medical advice. If you are experiencing distress, reach out to healthcare professionals.
        </p>
      </div>
    </div>
  )
}
