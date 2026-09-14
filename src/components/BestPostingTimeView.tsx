import React, { useState } from 'react';
import { BestPostingTimeData, HeatmapSlot } from '../types';
import {
  Clock,
  Calendar,
  Sparkles,
  TrendingUp,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface BestPostingTimeViewProps {
  data: BestPostingTimeData;
}

export const BestPostingTimeView: React.FC<BestPostingTimeViewProps> = ({ data }) => {
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [
    { label: '6 AM', hour: 6 },
    { label: '9 AM', hour: 9 },
    { label: '12 PM', hour: 12 },
    { label: '3 PM', hour: 15 },
    { label: '6 PM', hour: 18 },
    { label: '7 PM', hour: 19 },
    { label: '8 PM', hour: 20 },
    { label: '9 PM', hour: 21 },
    { label: '11 PM', hour: 23 },
  ];

  // Helper to color heatmap cells based on score (0-100)
  const getCellColor = (score: number) => {
    if (score >= 90) return 'bg-pink-500 text-white font-bold ring-1 ring-pink-300';
    if (score >= 75) return 'bg-purple-600/80 text-white';
    if (score >= 50) return 'bg-purple-900/50 text-purple-200';
    if (score >= 25) return 'bg-[#1E2235] text-gray-400';
    return 'bg-[#141624] text-gray-600';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
            <Clock className="w-4 h-4" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">Best Posting Times & Heatmap</h2>
        </div>
        <p className="text-xs text-gray-400">
          Reverse-engineered from peak follower activity windows and initial velocity response times.
        </p>
      </div>

      {/* Top Recommendations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Best Days */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-pink-400" />
              Peak Days to Post
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono">
              Highest Velocity
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {data.bestDays.map((day: string) => (
              <div
                key={day}
                className="px-4 py-2.5 rounded-xl ig-gradient-bg text-white font-bold text-sm shadow-md shadow-pink-500/20"
              >
                {day}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-[#1F2338]">
            Mid-week evenings consistently generate 2.3x faster comment velocity in the first 30 minutes after publishing.
          </p>
        </div>

        {/* Best Hours */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Peak Hours (Audience Local Time)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
              Active Users
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {data.bestHours.map((hour: string) => (
              <div
                key={hour}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-sm"
              >
                {hour}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-[#1F2338]">
            Aligns with end-of-work commute and evening unwind periods when viewers have sound enabled.
          </p>
        </div>
      </div>

      {/* Interactive Engagement Heatmap */}
      <div className="p-6 rounded-2xl bg-[#131522] border border-[#22273D] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              Weekly Engagement Heatmap
            </h3>
            <p className="text-xs text-gray-400">
              Darker gradient indicates higher relative initial audience activity score (0–100).
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
            <span>Low</span>
            <div className="w-3 h-3 rounded bg-[#1E2235]" />
            <div className="w-3 h-3 rounded bg-purple-900/60" />
            <div className="w-3 h-3 rounded bg-purple-600" />
            <div className="w-3 h-3 rounded bg-pink-500" />
            <span>High</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="w-full">
            {/* Hour headers */}
            <div className="grid grid-cols-10 gap-1.5 mb-1.5 text-center text-[10px] font-mono text-gray-400">
              <div className="text-left pl-2">Day</div>
              {hours.map((h: { label: string; hour: number }) => (
                <div key={h.hour}>{h.label}</div>
              ))}
            </div>

            {/* Day rows */}
            {days.map((day: string) => {
              const rowSlots = data.heatmap.filter((h: HeatmapSlot) => h.day === day);
              return (
                <div key={day} className="grid grid-cols-10 gap-1.5 mb-1.5 items-center">
                  <div className="text-xs font-semibold text-gray-300 pl-2">{day}</div>
                  {hours.map((h: { label: string; hour: number }) => {
                    const slot = rowSlots.find((s: HeatmapSlot) => s.hour === h.hour) || {
                      day,
                      hour: h.hour,
                      score: 20,
                      label: `${day} ${h.label}`,
                    };
                    const colorClass = getCellColor(slot.score);
                    return (
                      <button
                        key={h.hour}
                        onClick={() => setSelectedSlot(slot)}
                        className={`h-9 rounded-lg flex items-center justify-center text-[10px] transition cursor-pointer hover:scale-105 ${colorClass}`}
                        title={`${day} at ${h.label}: Activity Score ${slot.score}`}
                      >
                        {slot.score}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {selectedSlot && (
          <div className="p-3 rounded-xl bg-[#191C2D] border border-pink-500/30 text-xs text-gray-200 flex items-center justify-between">
            <span>
              Selected Slot: <strong className="text-white">{selectedSlot.day} {selectedSlot.hour}:00</strong> — Relative Activity Score:{' '}
              <strong className="text-pink-400">{selectedSlot.score}/100</strong>
            </span>
            <span className="text-[11px] text-gray-400">
              {selectedSlot.score >= 80 ? '🔥 Prime posting window' : 'Standard engagement window'}
            </span>
          </div>
        )}
      </div>

      {/* Algorithmic Reason Explanation (Mandatory) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#151726] to-[#121420] border border-[#262B44] space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          Why These Specific Windows Produce Superior Reach
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed">{data.explanation}</p>
        <div className="pt-2 text-[11px] text-pink-400 font-mono">
          ✓ Pro Tip: Upload 15 minutes before peak window (e.g. 6:45 PM for 7:00 PM) to allow Instagram encoding and initial graph indexing.
        </div>
      </div>
    </div>
  );
};
