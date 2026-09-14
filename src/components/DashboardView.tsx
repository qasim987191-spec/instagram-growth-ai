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
    <div className="space-y-6 pb-12">
      {/* Profile Overview Card */}
      <div className="p-6 rounded-2xl bg-[#131522] border border-[#23273D] relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          {/* Avatar & Info */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.username}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-pink-500/60 shadow-lg"
              />
              {profile.isVerified && (
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{profile.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1F2236] text-pink-400 font-mono">
                  @{profile.username}
                </span>
              </div>
              <p className="text-xs text-gray-400 max-w-md whitespace-pre-line leading-relaxed font-sans">
                {profile.bio}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-gray-400">
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
                      Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Followers / Following / Posts stats */}
          <div className="flex items-center gap-4 sm:gap-6 bg-[#181B2B] px-5 py-3.5 rounded-xl border border-[#272C44]">
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {profile.followersCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Followers
              </div>
            </div>
            <div className="w-px h-8 bg-[#2A2F4A]" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {profile.followingCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Following
              </div>
            </div>
            <div className="w-px h-8 bg-[#2A2F4A]" />
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {profile.mediaCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Posts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Growth Score Banner & Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Overall Growth Score Card */}
        <div className="p-6 rounded-2xl bg-[#141624] border border-[#272B44] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Overall AI Growth Score
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              High Potential
            </span>
          </div>

          {/* Radial score gauge */}
          <div className="flex items-center justify-center my-3">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG circular progress */}
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
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {scores.overallScore}
                </span>
                <span className="text-[11px] text-gray-400 font-semibold uppercase">out of 100</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center pt-2">
            AI assessment based on engagement velocity, hook retention, and share ratios.
          </div>
        </div>

        {/* 5 Score Categories Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {scoreCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigate(cat.tab)}
              className="p-4 rounded-xl bg-[#131522] border border-[#23273D] hover:border-pink-500/40 hover:bg-[#181B2B] transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-300 font-medium group-hover:text-pink-300 transition-colors">
                    {cat.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-pink-400 transition-colors" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{cat.score} / 100</div>
              </div>

              <div>
                {/* Progress bar */}
                <div className="w-full bg-[#202438] h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
                <span className="text-[11px] text-gray-400 font-mono">{cat.benchmark}</span>
              </div>
            </div>
          ))}

          {/* Quick AI Action Card */}
          <div
            onClick={() => onNavigate('recommendations')}
            className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/30 hover:border-pink-500/60 transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1.5 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-3.5 h-3.5" />
                Next Best Actions
              </div>
              <p className="text-xs text-gray-300 font-medium mt-1">
                3 prioritized data-backed steps to increase your non-follower reach.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-pink-400 flex items-center gap-1 mt-3">
              View Strategy <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Account Performance Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D]">
          <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Top Reel Performance</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {topReel.views.toLocaleString()}
          </div>
          <p className="text-xs text-gray-400 line-clamp-1 mt-1 mb-2">"{topReel.caption}"</p>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-emerald-400 font-semibold font-mono">
              +{topReel.performanceVsAvgPercent}% vs Avg
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-pink-400 font-mono">{topReel.shares} shares</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D]">
          <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Average Reel Views</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{avgViews.toLocaleString()}</div>
          <p className="text-xs text-gray-400 mt-1 mb-2">Calculated across your last 8 Reels</p>
          <div className="text-xs text-cyan-400 font-semibold font-mono">
            {avgEngagement}% Avg Engagement Rate
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D]">
          <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
            <span className="font-semibold uppercase tracking-wider">Saved Content Ratio</span>
            <Bookmark className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">4.7% Save Rate</div>
          <p className="text-xs text-gray-400 mt-1 mb-2">2.1x higher than the industry creator median</p>
          <div className="text-xs text-purple-300 font-semibold font-mono">
            Tool breakdowns drive 68% of saves
          </div>
        </div>
      </div>

      {/* Creator Growth & Monetization Modules Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Paid Collaboration Card */}
        <div
          onClick={() => onNavigate('collaborations')}
          className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] hover:border-emerald-500/40 transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Briefcase className="w-4 h-4" />
                </span>
                <span className="font-bold text-white text-sm">Paid Collaboration & Sponsorships</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                Active Deals: 4
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Track brand partnerships, calculate your custom rate card (₹18k-32k/Reel), and write high-converting pitches using AI.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1F2335] flex items-center justify-between text-xs">
            <span className="font-mono text-emerald-400 font-bold">Pipeline Value: ₹1,06,500</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Sponsorships <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Auto DM Bot Card */}
        <div
          onClick={() => onNavigate('auto-dm')}
          className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] hover:border-pink-500/40 transition cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                  <Bot className="w-4 h-4" />
                </span>
                <span className="font-bold text-white text-sm">Auto DM & Comment Automation</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold uppercase">
                3 Triggers Live
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Auto-reply to viewer comments with direct DMs (Notion pack, AI tools list, collab decks) with 1.8s response speed.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1F2335] flex items-center justify-between text-xs">
            <span className="font-mono text-pink-400 font-bold">1,288 DMs Dispatched</span>
            <span className="text-pink-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Configure Triggers <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
