import React, { useState } from 'react';
import { DayPlan } from '../types';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  Film,
  MessageSquare,
  Users,
  Copy,
  Check,
} from 'lucide-react';

interface GrowthPlanViewProps {
  initialPlan: DayPlan[];
}

export const GrowthPlanView: React.FC<GrowthPlanViewProps> = ({ initialPlan }) => {
  const [plan, setPlan] = useState<DayPlan[]>(initialPlan);
  const [copiedDay, setCopiedDay] = useState<number | null>(null);

  const toggleDayComplete = (dayNumber: number) => {
    setPlan((prev) =>
      prev.map((d) => (d.day === dayNumber ? { ...d, completed: !d.completed } : d))
    );
  };

  const completedCount = plan.filter((d) => d.completed).length;

  const copyDayPlan = (d: DayPlan) => {
    const text = `Day ${d.day} (${d.dayName}) Plan:\n- Reel Type: ${d.contentType}\n- Topic: ${d.reelTopic}\n- Hook: ${d.hookIdea}\n- Story: ${d.storyPrompt}\n- Daily Task: ${d.engagementTask}`;
    navigator.clipboard.writeText(text);
    setCopiedDay(d.day);
    setTimeout(() => setCopiedDay(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Calendar className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Personalized 7-Day Growth Plan</h2>
          </div>
          <p className="text-xs text-gray-400">
            A realistic cadence balancing high-retention Reels, interactive Stories, and outbound community engagement.
          </p>
        </div>

        {/* Completion tracker */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#141624] border border-[#23273D] text-xs font-semibold self-start">
          <span className="text-gray-400">Execution Progress:</span>
          <span className="text-emerald-400 font-mono">
            {completedCount} of 7 Days ({Math.round((completedCount / 7) * 100)}%)
          </span>
        </div>
      </div>

      {/* Days Stack */}
      <div className="space-y-4">
        {plan.map((d) => (
          <div
            key={d.day}
            className={`p-5 rounded-2xl border transition-all ${
              d.completed
                ? 'bg-[#12141F]/60 border-[#202336] opacity-75'
                : 'bg-[#131522] border-[#242940] hover:border-pink-500/40 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2338] pb-3 mb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleDayComplete(d.day)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition cursor-pointer flex-shrink-0 ${
                    d.completed
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-[#383E5E] hover:border-pink-400 bg-[#181B2B]'
                  }`}
                  title={d.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {d.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-pink-400 font-mono">
                      Day {d.day}
                    </span>
                    <h3 className={`text-sm font-bold ${d.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                      {d.dayName} • {d.contentType}
                    </h3>
                  </div>
                </div>
              </div>

              <button
                onClick={() => copyDayPlan(d)}
                className="text-gray-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer self-end sm:self-auto"
              >
                {copiedDay === d.day ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy Day Plan</span>
                  </>
                )}
              </button>
            </div>

            {/* Plan Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              {/* Reel Idea */}
              <div className="p-3.5 rounded-xl bg-[#171A29] border border-[#22273D] space-y-1.5">
                <div className="flex items-center gap-1.5 text-pink-400 font-semibold text-[11px]">
                  <Film className="w-3.5 h-3.5" />
                  <span>Reel Blueprint:</span>
                </div>
                <p className="text-gray-200 font-medium leading-tight">{d.reelTopic}</p>
                <p className="text-[11px] text-gray-400 italic">Hook: "{d.hookIdea}"</p>
              </div>

              {/* Story Prompt */}
              <div className="p-3.5 rounded-xl bg-[#171A29] border border-[#22273D] space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-400 font-semibold text-[11px]">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Interactive Story Prompt:</span>
                </div>
                <p className="text-gray-200 leading-relaxed">{d.storyPrompt}</p>
              </div>

              {/* Engagement Task */}
              <div className="p-3.5 rounded-xl bg-[#171A29] border border-[#22273D] space-y-1.5">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
                  <Users className="w-3.5 h-3.5" />
                  <span>Daily Community Task:</span>
                </div>
                <p className="text-gray-200 leading-relaxed">{d.engagementTask}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
