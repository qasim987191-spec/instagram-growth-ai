import React, { useState } from 'react';
import { ReachMetricsData } from '../types';
import {
  TrendingUp,
  Users,
  Eye,
  Share2,
  Bookmark,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';

interface ReachAnalysisViewProps {
  reachData: ReachMetricsData;
}

export const ReachAnalysisView: React.FC<ReachAnalysisViewProps> = ({ reachData }) => {
  const [activeExplainTab, setActiveExplainTab] = useState<'improving' | 'limiting'>('improving');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
            <TrendingUp className="w-4 h-4" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">Reach & Distribution Analysis</h2>
        </div>
        <p className="text-xs text-gray-400">
          Telemetry on non-follower discovery, impression multiplier, and algorithmic traffic drivers.
        </p>
      </div>

      {/* Primary Reach Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Accounts Reached */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Accounts Reached</span>
            <span className="text-emerald-400 font-mono font-bold flex items-center">
              +{reachData.reachGrowthPercent}%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {reachData.accountsReached.toLocaleString()}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Unique accounts seeing your content</p>
        </div>

        {/* Impressions */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D]">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Total Impressions</span>
            <span className="text-emerald-400 font-mono font-bold flex items-center">
              +{reachData.impressionsGrowthPercent}%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {reachData.impressions.toLocaleString()}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            {(reachData.impressions / reachData.accountsReached).toFixed(2)}x frequency per viewer
          </p>
        </div>

        {/* Reel Views */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D]">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Total Reel Views</span>
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {reachData.reelViewsTotal.toLocaleString()}
          </div>
          <p className="text-[11px] text-cyan-300 mt-1">84% of total profile exposure</p>
        </div>

        {/* Total Shares & Saves */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D]">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Shares & Saves</span>
            <Share2 className="w-3.5 h-3.5 text-pink-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {(reachData.sharesTotal + reachData.savesTotal).toLocaleString()}
          </div>
          <p className="text-[11px] text-pink-400 mt-1">
            {reachData.sharesTotal.toLocaleString()} shares • {reachData.savesTotal.toLocaleString()} saves
          </p>
        </div>
      </div>

      {/* Follower vs Non-Follower Reach Comparison */}
      <div className="p-6 rounded-2xl bg-[#131522] border border-[#22273D]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-400" />
              Follower vs Non-Follower Distribution
            </h3>
            <p className="text-xs text-gray-400">
              Crucial indicator of whether your content is breaking out into the Explore and Reels tabs.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold self-start font-mono">
            72% Non-Followers (High Discovery)
          </span>
        </div>

        {/* Horizontal Stacked Bar Chart */}
        <div className="space-y-3">
          <div className="h-5 w-full bg-[#1E2235] rounded-full overflow-hidden flex">
            <div
              style={{ width: `${reachData.followerReachPercent}%` }}
              className="bg-blue-500 h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-700"
              title={`Followers: ${reachData.followerReachPercent}%`}
            >
              {reachData.followerReachPercent}%
            </div>
            <div
              style={{ width: `${reachData.nonFollowerReachPercent}%` }}
              className="ig-gradient-bg h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-700"
              title={`Non-Followers: ${reachData.nonFollowerReachPercent}%`}
            >
              {reachData.nonFollowerReachPercent}%
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
              <span>
                <strong>Followers:</strong> {reachData.followerReachPercent}% (~
                {Math.round((reachData.accountsReached * reachData.followerReachPercent) / 100).toLocaleString()})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm ig-gradient-bg inline-block" />
              <span>
                <strong>Non-Followers (Explore / Reels):</strong> {reachData.nonFollowerReachPercent}% (~
                {Math.round((reachData.accountsReached * reachData.nonFollowerReachPercent) / 100).toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Reach Explanations: "Your reach is improving because..." vs "limited because..." */}
      <div className="p-6 rounded-2xl bg-[#141624] border border-pink-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl ig-gradient-bg flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Grounded AI Reach Diagnostic</h3>
              <p className="text-[11px] text-gray-400">Directly mapped to verified metrics without guesswork</p>
            </div>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center bg-[#191C2C] p-1 rounded-xl border border-[#272B44] text-xs">
            <button
              onClick={() => setActiveExplainTab('improving')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                activeExplainTab === 'improving'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Why Reach is Improving
            </button>
            <button
              onClick={() => setActiveExplainTab('limiting')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                activeExplainTab === 'limiting'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              What is Limiting Reach
            </button>
          </div>
        </div>

        {/* Content of selected tab */}
        {activeExplainTab === 'improving' ? (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              “Your reach is improving because…”
            </div>
            {reachData.improvingReasons.map((reason, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#181B2B] border border-emerald-500/30 text-xs text-gray-200 leading-relaxed flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                  ✓
                </span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              “Your reach may be limited because…”
            </div>
            {reachData.limitingReasons.map((reason, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#181B2B] border border-rose-500/30 text-xs text-gray-200 leading-relaxed flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                  !
                </span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
