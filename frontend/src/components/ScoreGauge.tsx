import React, { useEffect, useState } from 'react'
import { PanelState } from '../types'

interface ScoreGaugeProps {
  score: number | null
  state: PanelState
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, state }) => {
  const [animatedScore, setAnimatedScore] = useState<number>(0)

  useEffect(() => {
    if (state === 'result' && score !== null) {
      let start = 0
      const duration = 1200 // ms
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3)
        const currentVal = start + (score - start) * ease
        setAnimatedScore(currentVal)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setAnimatedScore(score)
        }
      }

      requestAnimationFrame(animate)
    } else {
      setAnimatedScore(0)
    }
  }, [score, state])

  // SVG parameters
  const radius = 105
  const strokeWidth = 14
  const circumference = Math.PI * radius // Half-circle perimeter ~ 329.87

  // Helper colors and labels
  const getColor = (val: number) => {
    if (val < 4.0) return '#F4694B' // Coral
    if (val < 6.5) return '#F5A623' // Amber
    if (val <= 8.0) return '#4CAF7D' // Green
    return '#2DD4BF' // Teal
  }

  const getTierDetails = (val: number) => {
    if (val < 4.0) {
      return {
        label: 'Signal needs attention',
        badge: 'bg-red-500/20 text-rose-300 border-red-500/40',
        message: 'Your indicators suggest elevated stress and screen friction. Dedicated breaks and mindful routines will help restore balance.'
      }
    }
    if (val < 6.5) {
      return {
        label: 'Signal is mixed',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        message: 'Your routine has positive elements, but sleep variability or high unlocks may introduce cognitive fatigue.'
      }
    }
    if (val <= 8.0) {
      return {
        label: 'Signal is strong',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        message: 'Great digital-lifestyle equilibrium. Your physical activity and sleep schedule provide a resilient foundation.'
      }
    }
    return {
      label: 'Signal is thriving',
      badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      message: 'Optimal balance achieved. Excellent sleep discipline, active movement, and mindful device usage patterns.'
    }
  }

  // Calculate arc offset
  const displayScore = state === 'result' ? animatedScore : 0
  const progressRatio = Math.min(Math.max(displayScore / 10, 0), 1)
  const strokeDashoffset = circumference * (1 - progressRatio)

  const activeColor = state === 'result' ? getColor(animatedScore) : '#4A5568'
  const tier = state === 'result' && score !== null ? getTierDetails(score) : null

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Gauge SVG Container */}
      <div className="relative w-64 h-36 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 250 145"
          className="w-full h-full drop-shadow-lg"
        >
          <defs>
            {/* Gradient definition for active progress */}
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F4694B" />
              <stop offset="40%" stopColor="#F5A623" />
              <stop offset="70%" stopColor="#4CAF7D" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={activeColor} floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background Track (Subtle Outline) */}
          <path
            d="M 20 135 A 105 105 0 0 1 230 135"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Segment ticks under the track */}
          <path
            d="M 20 135 A 105 105 0 0 1 230 135"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth + 6}
            strokeDasharray="2 12"
            strokeLinecap="round"
          />

          {/* Loading Animation Wave */}
          {state === 'loading' && (
            <path
              d="M 20 135 A 105 105 0 0 1 230 135"
              fill="none"
              stroke="#2DD4BF"
              strokeWidth={strokeWidth}
              strokeDasharray="40 100"
              strokeLinecap="round"
              className="animate-pulse"
              filter="url(#gaugeGlow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="280; 0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
          )}

          {/* Active Score Arc */}
          {state === 'result' && (
            <path
              d="M 20 135 A 105 105 0 0 1 230 135"
              fill="none"
              stroke={activeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              filter="url(#gaugeGlow)"
              className="transition-all duration-300"
            />
          )}

          {/* Tick Scale Indicators */}
          <text x="22" y="144" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="600" textAnchor="middle">0</text>
          <text x="125" y="24" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="600" textAnchor="middle">5</text>
          <text x="228" y="144" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="600" textAnchor="middle">10</text>
        </svg>

        {/* Center Readout inside the Semi-circle */}
        <div className="absolute bottom-1 left-0 right-0 flex flex-col items-center justify-center text-center">
          {state === 'idle' && (
            <span className="text-xs uppercase tracking-widest text-emerald-200/60 font-medium">
              Ready
            </span>
          )}

          {state === 'loading' && (
            <span className="text-xs uppercase tracking-widest text-teal-300 font-semibold animate-pulse">
              Analyzing
            </span>
          )}

          {state === 'result' && (
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ color: activeColor }}>
                {animatedScore.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-emerald-200/70">/ 10</span>
            </div>
          )}
        </div>
      </div>

      {/* Status & Non-Diagnostic Feedback */}
      <div className="w-full text-center mt-3 px-2">
        {state === 'idle' && (
          <div className="space-y-1">
            <p className="text-sm text-emerald-100 font-medium">
              Your score will appear here
            </p>
            <p className="text-xs text-emerald-200/60">
              Adjust your daily habits and click &ldquo;Read my signal&rdquo;
            </p>
          </div>
        )}

        {state === 'loading' && (
          <div className="space-y-1">
            <p className="text-sm text-teal-200 font-medium animate-pulse">
              Reading the signal&hellip;
            </p>
            <p className="text-xs text-emerald-200/60">
              Running scikit-learn neural feature pipeline
            </p>
          </div>
        )}

        {state === 'result' && tier && (
          <div className="space-y-2 animate-fadeIn">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${tier.badge}`}>
              {tier.label}
            </span>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              {tier.message}
            </p>
          </div>
        )}

        {state === 'error' && (
          <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-xs">
            Failed to fetch prediction. Please ensure the backend is running.
          </div>
        )}
      </div>

      {/* Score color bands legend */}
      <div className="grid grid-cols-4 gap-1.5 w-full mt-5 pt-4 border-t border-emerald-800/60">
        <div className="flex flex-col items-center text-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F4694B] mb-1" />
          <span className="text-[10px] text-emerald-200/70 font-medium">0 - 3.9</span>
          <span className="text-[9px] text-emerald-300/40">Attention</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623] mb-1" />
          <span className="text-[10px] text-emerald-200/70 font-medium">4.0 - 6.4</span>
          <span className="text-[9px] text-emerald-300/40">Mixed</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF7D] mb-1" />
          <span className="text-[10px] text-emerald-200/70 font-medium">6.5 - 8.0</span>
          <span className="text-[9px] text-emerald-300/40">Strong</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF] mb-1" />
          <span className="text-[10px] text-emerald-200/70 font-medium">8.1 - 10</span>
          <span className="text-[9px] text-emerald-300/40">Thriving</span>
        </div>
      </div>
    </div>
  )
}
