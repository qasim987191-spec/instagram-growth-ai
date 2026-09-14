import React, { useState } from 'react';
import { ActionRecommendation } from '../types';
import {
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BarChart,
} from 'lucide-react';

interface GrowthRecommendationsViewProps {
  initialRecommendations: ActionRecommendation[];
}

export const GrowthRecommendationsView: React.FC<GrowthRecommendationsViewProps> = ({
  initialRecommendations,
}) => {
  const [recommendations, setRecommendations] = useState<ActionRecommendation[]>(initialRecommendations);

  const toggleComplete = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, completed: !rec.completed } : rec))
    );
  };

  const completedCount = recommendations.filter((r) => r.completed).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Zap className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Your Next Best Actions</h2>
          </div>
          <p className="text-xs text-gray-400">
            Strictly prioritized actions derived from your actual hook retention and share velocity.
          </p>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161826] border border-[#272B42] text-xs font-semibold self-start">
          <span className="text-gray-400">Completed:</span>
          <span className="font-mono text-emerald-400">
            {completedCount} of {recommendations.length}
          </span>
        </div>
      </div>

      {/* Priority Action Cards */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          return (
            <div
              key={rec.id}
              className={`p-5 rounded-2xl border transition-all ${
                rec.completed
                  ? 'bg-[#12141F]/60 border-[#222536] opacity-75'
                  : 'bg-[#141624] border-[#252A42] hover:border-pink-500/50 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox button */}
                <button
                  onClick={() => toggleComplete(rec.id)}
                  className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition cursor-pointer flex-shrink-0 ${
                    rec.completed
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-[#383E5E] hover:border-pink-400 bg-[#191C2C]'
                  }`}
                  title={rec.completed ? 'Mark as incomplete' : 'Mark as completed'}
                >
                  {rec.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-pink-400 font-mono">
                        #{index + 1}
                      </span>
                      <h3
                        className={`text-sm font-bold ${
                          rec.completed ? 'line-through text-gray-400' : 'text-white'
                        }`}
                      >
                        {rec.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                          rec.priority === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {rec.priority} Impact
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#1F2236] text-gray-300 font-medium">
                        {rec.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{rec.description}</p>

                  {/* Grounded Evidence Banner */}
                  <div className="p-3 rounded-xl bg-[#191C2D] border border-[#262B44] text-xs text-gray-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-pink-400 font-semibold text-[11px]">
                      <BarChart className="w-3.5 h-3.5" />
                      <span>Data Evidence from Your Account:</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                      {rec.dataEvidence}
                    </p>
                  </div>

                  {/* Expected Outcome */}
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Expected Outcome: {rec.expectedOutcome}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
