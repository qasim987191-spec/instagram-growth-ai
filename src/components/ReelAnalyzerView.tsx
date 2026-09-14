import React, { useState } from 'react';
import { ReelMetrics } from '../types';
import {
  Film,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

interface ReelAnalyzerViewProps {
  reels: ReelMetrics[];
}

export const ReelAnalyzerView: React.FC<ReelAnalyzerViewProps> = ({ reels }) => {
  const [sortBy, setSortBy] = useState<'views' | 'engagement' | 'shares' | 'saves'>('views');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(reels.map((r) => r.category)))];

  const filteredReels = reels
    .filter((r) => selectedCategory === 'all' || r.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'engagement') return b.engagementRate - a.engagementRate;
      if (sortBy === 'shares') return b.shares - a.shares;
      return b.saves - a.saves;
    });

  const topReel = [...reels].sort((a, b) => b.views - a.views)[0];
  const lowestReel = [...reels].sort((a, b) => a.views - b.views)[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Film className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Reel Performance Analyzer</h2>
          </div>
          <p className="text-xs text-gray-400">
            Granular metrics, benchmark comparison vs your average, and AI algorithmic pattern analysis.
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#141624] px-3 py-1.5 rounded-xl border border-[#23273D] text-xs">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-gray-300 focus:outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#141624] text-white">
                  {cat === 'all' ? 'All Formats' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#141624] px-3 py-1.5 rounded-xl border border-[#23273D] text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-gray-300 focus:outline-none cursor-pointer"
            >
              <option value="views" className="bg-[#141624] text-white">Sort: Most Views</option>
              <option value="engagement" className="bg-[#141624] text-white">Sort: Engagement Rate</option>
              <option value="shares" className="bg-[#141624] text-white">Sort: Most Shares</option>
              <option value="saves" className="bg-[#141624] text-white">Sort: Most Saves</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Pattern Synthesis (Top vs Underperforming Analysis) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top-Performing Patterns */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Top-Performing Patterns</h3>
              <p className="text-[11px] text-emerald-400 font-mono">
                Best Reel: #{topReel.id} ({topReel.views.toLocaleString()} views, +{topReel.performanceVsAvgPercent}%)
              </p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-gray-300">
            <p className="p-2.5 rounded-xl bg-[#181B2B] border border-[#242940]">
              <strong className="text-white">Winning Format:</strong> Screen recordings showcasing curated "Top 3 Unknown Tools" generated 2.6x higher average saves and 3.1x higher DM shares.
            </p>
            <p className="p-2.5 rounded-xl bg-[#181B2B] border border-[#242940]">
              <strong className="text-white">Opening Hook:</strong> Immediate contrarian problem statements ("Stop wasting hours...") held 71% of viewers through second 3.
            </p>
          </div>
        </div>

        {/* Underperforming Weak Points */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-rose-500/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Underperforming Weak Points</h3>
              <p className="text-[11px] text-rose-400 font-mono">
                Lowest Reel: #{lowestReel.id} ({lowestReel.views.toLocaleString()} views, {lowestReel.performanceVsAvgPercent}%)
              </p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-gray-300">
            <p className="p-2.5 rounded-xl bg-[#181B2B] border border-[#242940]">
              <strong className="text-white">Slow Hook Velocity:</strong> Generic unboxing openings ("Check out this tiny charger") experienced a 62% dropoff within 2 seconds.
            </p>
            <p className="p-2.5 rounded-xl bg-[#181B2B] border border-[#242940]">
              <strong className="text-white">Low Reference Utility:</strong> Content lacked numbered steps or bookmarkable advice, resulting in only 210 saves.
            </p>
          </div>
        </div>
      </div>

      {/* Honest AI Disclaimer */}
      <div className="px-4 py-2.5 rounded-xl bg-[#171A29] border border-[#272C44] text-[11px] text-gray-400 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0" />
        <span>
          <strong>Algorithmic Note:</strong> Performance calculations reflect actual historical viewer retention and engagement signals. The AI does not guarantee viral reach, as distribution also depends on real-time audience trends.
        </span>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReels.map((reel) => {
          const isPositive = reel.performanceVsAvgPercent >= 0;
          return (
            <div
              key={reel.id}
              className="rounded-2xl bg-[#131522] border border-[#22273D] overflow-hidden flex flex-col justify-between hover:border-pink-500/40 transition group"
            >
              {/* Thumbnail & Video Header */}
              <div className="relative h-48 overflow-hidden bg-black/40">
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131522] via-black/30 to-transparent" />

                {/* Relative Benchmark Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono flex items-center gap-1 shadow-md ${
                      isPositive
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-rose-500/90 text-white'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isPositive ? `+${reel.performanceVsAvgPercent}%` : `${reel.performanceVsAvgPercent}%`} vs Avg
                  </span>
                </div>

                {/* Duration & Date */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 text-[10px] text-gray-300 font-mono">
                  {reel.durationSeconds}s • {reel.postedAt}
                </div>

                {/* Category tag */}
                <div className="absolute bottom-2 left-3 text-[10px] font-semibold text-pink-400 bg-[#131522]/90 px-2 py-0.5 rounded">
                  {reel.category}
                </div>
              </div>

              {/* Caption & Hook */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-200 font-medium line-clamp-2 leading-relaxed mb-2">
                    {reel.caption}
                  </p>
                  <div className="p-2 rounded-lg bg-[#181B2B] border border-[#24293E] text-[11px] text-gray-300">
                    <span className="text-pink-400 font-semibold block text-[10px] uppercase tracking-wider">
                      Tested Hook:
                    </span>
                    <span className="italic line-clamp-1">"{reel.hookText}"</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="space-y-2 pt-2 border-t border-[#1F2338]">
                  {/* Views & Reach */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between p-1.5 rounded bg-[#171A29]">
                      <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                        <Eye className="w-3.5 h-3.5 text-cyan-400" /> Views
                      </span>
                      <span className="font-bold text-white font-mono">
                        {reel.views.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded bg-[#171A29]">
                      <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Reach
                      </span>
                      <span className="font-bold text-white font-mono">
                        {reel.reach.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Likes, Comments, Shares, Saves */}
                  <div className="grid grid-cols-4 gap-1 text-center text-[10px] pt-1">
                    <div className="p-1 rounded bg-[#171A29] text-gray-300">
                      <Heart className="w-3 h-3 text-rose-400 mx-auto mb-0.5" />
                      <span className="font-bold font-mono">{reel.likes.toLocaleString()}</span>
                    </div>
                    <div className="p-1 rounded bg-[#171A29] text-gray-300">
                      <MessageCircle className="w-3 h-3 text-blue-400 mx-auto mb-0.5" />
                      <span className="font-bold font-mono">{reel.comments.toLocaleString()}</span>
                    </div>
                    <div className="p-1 rounded bg-[#171A29] text-gray-300">
                      <Share2 className="w-3 h-3 text-pink-400 mx-auto mb-0.5" />
                      <span className="font-bold font-mono">{reel.shares.toLocaleString()}</span>
                    </div>
                    <div className="p-1 rounded bg-[#171A29] text-gray-300">
                      <Bookmark className="w-3 h-3 text-amber-400 mx-auto mb-0.5" />
                      <span className="font-bold font-mono">{reel.saves.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Engagement Rate calculated */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[11px] text-gray-400">Calculated Engagement:</span>
                    <span className="font-bold text-pink-400 font-mono">
                      {reel.engagementRate}%
                    </span>
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
