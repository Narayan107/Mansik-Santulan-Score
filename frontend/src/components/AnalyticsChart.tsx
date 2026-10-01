import React, { useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'
import { StudentFormData } from '../types'
import { BarChart3, Compass } from 'lucide-react'

interface AnalyticsChartProps {
  formData: StudentFormData
  score: number | null
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ formData }) => {
  const [chartType, setChartType] = useState<'radar' | 'bar'>('radar')

  // Benchmark comparisons (normalized 0–100 scale for radar)
  const radarData = [
    {
      metric: 'Sleep Recovery',
      User: Math.min(Math.round((formData.sleep_hours_per_night / 8) * 100), 100),
      Benchmark: 90,
      fullMark: 100
    },
    {
      metric: 'Physical Health',
      User: Math.min(Math.round((formData.physical_activity_hours / 1.5) * 100), 100),
      Benchmark: 80,
      fullMark: 100
    },
    {
      metric: 'Screen Discipline',
      User: Math.max(Math.round(((12 - formData.avg_daily_usage_hours) / 12) * 100), 10),
      Benchmark: 75,
      fullMark: 100
    },
    {
      metric: 'Study Balance',
      User: Math.min(Math.round((formData.study_hours / 4) * 100), 100),
      Benchmark: 80,
      fullMark: 100
    },
    {
      metric: 'Digital Boundary',
      User: Math.max(Math.round(((120 - Math.min(formData.daily_unlocks, 120)) / 120) * 100), 15),
      Benchmark: 70,
      fullMark: 100
    }
  ]

  // Actual hours comparison for Bar chart
  const barData = [
    {
      name: 'Sleep',
      'You (hrs)': formData.sleep_hours_per_night,
      'Healthy Target (hrs)': 8.0
    },
    {
      name: 'Screen Time',
      'You (hrs)': formData.avg_daily_usage_hours,
      'Healthy Target (hrs)': 3.0
    },
    {
      name: 'Study',
      'You (hrs)': formData.study_hours,
      'Healthy Target (hrs)': 3.5
    },
    {
      name: 'Activity',
      'You (hrs)': formData.physical_activity_hours,
      'Healthy Target (hrs)': 1.2
    }
  ]

  return (
    <div className="w-full mt-6 pt-5 border-t border-emerald-800/50">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200">
          {chartType === 'radar' ? <Compass className="w-4 h-4 text-teal-300" /> : <BarChart3 className="w-4 h-4 text-teal-300" />}
          <span>Lifestyle Balance Analysis</span>
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-emerald-950/60 p-0.5 rounded-lg border border-emerald-700/50 text-[11px]">
          <button
            type="button"
            onClick={() => setChartType('radar')}
            className={`px-2 py-0.5 rounded transition-all ${
              chartType === 'radar'
                ? 'bg-teal-500 text-emerald-950 font-bold shadow-sm'
                : 'text-emerald-300/70 hover:text-emerald-100'
            }`}
          >
            Radar
          </button>
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`px-2 py-0.5 rounded transition-all ${
              chartType === 'bar'
                ? 'bg-teal-500 text-emerald-950 font-bold shadow-sm'
                : 'text-emerald-300/70 hover:text-emerald-100'
            }`}
          >
            Hours
          </button>
        </div>
      </div>

      <div className="w-full h-52 sm:h-56 bg-emerald-950/40 rounded-xl p-2 border border-emerald-800/40 flex items-center justify-center">
        {chartType === 'radar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
              <PolarGrid stroke="rgba(45, 212, 191, 0.2)" />
              <PolarAngleAxis
                dataKey="metric"
                stroke="#6EE7B7"
                tick={{ fill: '#A7F3D0', fontSize: 10 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                stroke="rgba(255,255,255,0.15)"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 8 }}
              />
              <Radar
                name="You"
                dataKey="User"
                stroke="#2DD4BF"
                fill="#2DD4BF"
                fillOpacity={0.45}
              />
              <Radar
                name="Benchmark"
                dataKey="Benchmark"
                stroke="#F5A623"
                fill="#F5A623"
                fillOpacity={0.2}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                iconType="circle"
                iconSize={8}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#A7F3D0" tick={{ fill: '#A7F3D0', fontSize: 10 }} />
              <YAxis stroke="#A7F3D0" tick={{ fill: '#A7F3D0', fontSize: 9 }} unit="h" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#072B22',
                  borderColor: '#1D786D',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} iconType="circle" iconSize={8} />
              <Bar dataKey="You (hrs)" fill="#2DD4BF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Healthy Target (hrs)" fill="#F5A623" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
