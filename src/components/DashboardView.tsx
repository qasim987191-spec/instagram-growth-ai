import React from 'react';
import {
  InstagramProfile,
  GrowthScores,
  ReelMetrics,
  NavTab,
} from '../types';
import {
  Sparkles,
  TrendingUp,
  Flame,
  CheckCircle2,
  Users,
  Eye,
  Share2,
  Bookmark,
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Briefcase,
  Bot,
} from 'lucide-react';

interface DashboardViewProps {
  profile: InstagramProfile;
  scores: GrowthScores;
  reels: ReelMetrics[];
  onNavigate: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  scores,
  reels,
  onNavigate,
}) => {
  const topReel = [...reels].sort((a, b) => b.views - a.views)[0];
  const avgViews = Math.round(reels.reduce((acc, r) => acc + r.views, 0) / reels.length);
  const avgEngagement = (
    reels.reduce((acc, r) => acc + r.engagementRate, 0) / reels.length
  ).toFixed(1);

  // Score categories breakdown
  const scoreCategories = [
    {
      name: 'Profile Score',
      score: scores.profileScore,
      benchmark: 'Strong Niche Clarity',
      color: 'from-blue-500 to-cyan-400',
      tab: 'profile-analysis' as NavTab,
    },
    {
      name: 'Content Score',
      score: scores.contentScore,
      benchmark: 'High Tool Utility',
      color: 'from-pink-500 to-rose-400',
      tab: 'reels' as NavTab,
    },
    {
      name: 'Engagement Score',
      score: scores.engagementScore,
      benchmark: '14.2% Avg Ratio',
      color: 'from-purple-500 to-indigo-400',
      tab: 'reels' as NavTab,
    },
    {
      name: 'Reach Score',
      score: scores.reachScore,
      benchmark: '72% Non-Followers',
      color: 'from-amber-500 to-orange-400',
      tab: 'reach' as NavTab,
    },
    {
      name: 'Consistency Score',
      score: scores.consistencyScore,
      benchmark: '3.4 Reels / Week',
      color: 'from-emerald-500 to-teal-400',
      tab: 'growth-plan' as NavTab,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-6 w-full max-w-full overflow-hidden">
      {/* Profile Overview Card - Mobile Friendly */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#131522] border border-[#23273D] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

        <div className="flex flex-col gap-4 relative z-10">
          {/* Avatar & Info Row */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.username}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-pink-500/60 shadow-lg"
              />
              {profile.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">{profile.name}</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#1F2236] text-pink-400 font-mono">
                  @{profile.username}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 sm:line-clamp-none leading-relaxed font-sans">
                {profile.bio}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-gray-400">
                <span className="text-pink-400 font-medium">{profile.niche}</span>
                <span>•</span>
                <span>{profile.category}</span>
                {profile.externalUrl && (
                  <>
                    <span>•</span>
                    <a
                      href={profile.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Link <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Followers / Following / Posts stats (Full width strip) */}
          <div className="grid grid-cols-3 gap-2 bg-[#181B2B] px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-xl border border-[#272C44]">
            <div className="text-center">
              <div className="text-base sm:text-lg font-bold text-white">
                {profile.followersCount.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Followers
              </div>
            </div>
            <div className="text-center border-x border-[#2A2F4A]">
              <div className="text-base sm:text-lg font-bold text-white">
                {profile.followingCount.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Following
              </div>
            </div>
            <div className="text-center">
              <div className="text-base sm:text-lg font-bold text-white">
                {profile.mediaCount.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Posts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Growth Score Banner & Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Overall Growth Score Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#141624] border border-[#272B44] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Overall AI Growth Score
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              High Potential
            </span>
          </div>

          {/* Radial score gauge */}
          <div className="flex items-center justify-center my-2">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#22263D]"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#igGradient)"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * scores.overallScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#833AB4" />
                    <stop offset="50%" stopColor="#E1306C" />
                    <stop offset="100%" stopColor="#F77737" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {scores.overallScore}
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold uppercase">out of 100</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center pt-1">
            AI assessment based on engagement velocity, hook retention, and share ratios.
          </div>
        </div>

        {/* 5 Score Categories Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
          {scoreCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigate(cat.tab)}
              className="p-3 sm:p-4 rounded-xl bg-[#131522] border border-[#23273D] hover:border-pink-500/40 hover:bg-[#181B2B] transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] sm:text-xs text-gray-300 font-medium group-hover:text-pink-300 transition-colors line-clamp-1">
                    {cat.name}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-pink-400 transition-colors flex-shrink-0" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mb-1.5">{cat.score} <span className="text-xs text-gray-500 font-normal">/100</span></div>
              </div>

              <div>
                <div className="w-full bg-[#202438] h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-mono line-clamp-1">{cat.benchmark}</span>
              </div>
            </div>
          ))}

          {/* Quick AI Action Card */}
          <div
            onClick={() => onNavigate('recommendations')}
            className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/30 hover:border-pink-500/60 transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1.5 text-pink-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-3 h-3" />
                Next Best Actions
              </div>
              <p className="text-[11px] text-gray-300 line-clamp-2">
                3 prioritized data-backed steps to increase your non-follower reach.
              </p>
            </div>
            <div className="pt-2">
              <span className="text-[11px] text-pink-400 font-semibold flex items-center gap-1 hover:underline">
                View Strategy &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights: Top Reel & Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Top Reel Performance */}
        <div
          onClick={() => onNavigate('reels')}
          className="p-4 sm:p-5 rounded-2xl bg-[#131522] border border-[#22273D] hover:border-pink-500/30 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Top Reel Performance
            </span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>

          <div className="space-y-1 my-1">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {topReel.views.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 line-clamp-1 font-sans">
              "{topReel.caption}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1F2438] text-[11px]">
            <span className="text-emerald-400 font-medium">
              +{topReel.reachMultiplier} vs Avg
            </span>
            <span className="text-gray-400">{topReel.shares.toLocaleString()} shares</span>
          </div>
        </div>

        {/* Average Reel Views */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#131522] border border-[#22273D] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Average Reel Views
            </span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="space-y-1 my-1">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {avgViews.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400">Calculated across your last 8 Reels</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1F2438] text-[11px]">
            <span className="text-pink-400 font-medium">{avgEngagement}% Avg Engagement Rate</span>
          </div>
        </div>

        {/* Saved Ratio */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#131522] border border-[#22273D] flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Saved Content Ratio
            </span>
            <Bookmark className="w-4 h-4 text-purple-400" />
          </div>

          <div className="space-y-1 my-1">
            <div className="text-xl sm:text-2xl font-bold text-white">4.7% Save Rate</div>
            <p className="text-xs text-gray-400">2.1x higher than the industry creator median</p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1F2438] text-[11px]">
            <span className="text-purple-400 font-medium">Tool breakdowns drive 68% of saves</span>
          </div>
        </div>
      </div>
    </div>
  );
};
