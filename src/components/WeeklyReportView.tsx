import React, { useState } from 'react';
import { WeeklyReportData, ReelMetrics } from '../types';
import {
  BarChart3,
  Copy,
  Check,
  Download,
  Share2,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
} from 'lucide-react';

interface WeeklyReportViewProps {
  report: WeeklyReportData;
  bestReel: ReelMetrics;
  weakestReel: ReelMetrics;
}

export const WeeklyReportView: React.FC<WeeklyReportViewProps> = ({
  report,
  bestReel,
  weakestReel,
}) => {
  const [copied, setCopied] = useState(false);

  const formattedReportText = `=== INSTAGRAM GROWTH AI ANALYZER: WEEKLY REPORT ===
Period: ${report.reportPeriod}

METRICS SNAPSHOT:
- Net Followers Gained: +${report.netFollowersGained}
- Total Impressions: ${report.totalImpressions.toLocaleString()}
- Total Reel Views: ${report.totalReelViews.toLocaleString()}
- Overall Growth Score: ${report.overallGrowthScore}/100

BEST REEL OF THE WEEK:
- "${bestReel.caption}"
- Views: ${bestReel.views.toLocaleString()} | Shares: ${bestReel.shares} | Saves: ${bestReel.saves}
- Performance: +${bestReel.performanceVsAvgPercent}% vs account avg

WEAKEST REEL OF THE WEEK:
- "${weakestReel.caption}"
- Views: ${weakestReel.views.toLocaleString()} (${weakestReel.performanceVsAvgPercent}% vs avg)

WHAT WORKED:
${report.whatWorked.map((w, i) => `${i + 1}. ${w}`).join('\n')}

WHAT DID NOT WORK:
${report.whatDidNotWork.map((d, i) => `${i + 1}. ${d}`).join('\n')}

PRIMARY FOCUS FOR NEXT WEEK:
${report.focusNextWeek}
`;

  const copyReport = () => {
    navigator.clipboard.writeText(formattedReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = () => {
    const blob = new Blob([formattedReportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Instagram-Growth-Report-${report.reportPeriod.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Executive Weekly Report</h2>
          </div>
          <p className="text-xs text-gray-400">
            Performance audit, top vs bottom variance analysis, and strategic priorities for {report.reportPeriod}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={copyReport}
            className="px-3.5 py-2 rounded-xl bg-[#171A29] hover:bg-[#23273D] border border-[#2B304C] text-xs font-semibold text-gray-200 transition flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Report</span>
              </>
            )}
          </button>

          <button
            onClick={downloadReport}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export TXT</span>
          </button>
        </div>
      </div>

      {/* Snapshot Numbers Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Net Followers
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            +{report.netFollowersGained}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Strong positive inflow</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Total Impressions
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            {report.totalImpressions.toLocaleString()}
          </div>
          <span className="text-[11px] text-pink-400 font-medium">+18.4% vs last week</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Total Reel Views
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            {report.totalReelViews.toLocaleString()}
          </div>
          <span className="text-[11px] text-cyan-400 font-medium">8 reels analyzed</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Overall Growth Score
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            {report.overallGrowthScore} / 100
          </div>
          <span className="text-[11px] text-purple-400 font-medium">High performing tier</span>
        </div>
      </div>

      {/* Best vs Weakest Reel of the Week */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Best Reel */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Best Reel of the Week
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono font-bold">
              +{bestReel.performanceVsAvgPercent}% vs Avg
            </span>
          </div>

          <p className="text-xs text-white font-semibold leading-relaxed">
            "{bestReel.caption}"
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="p-2 rounded-lg bg-[#181B2B]">
              <span className="text-[10px] text-gray-400 block">Views</span>
              <span className="font-bold text-white font-mono">{bestReel.views.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#181B2B]">
              <span className="text-[10px] text-gray-400 block">Shares</span>
              <span className="font-bold text-pink-400 font-mono">{bestReel.shares}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#181B2B]">
              <span className="text-[10px] text-gray-400 block">Saves</span>
              <span className="font-bold text-amber-400 font-mono">{bestReel.saves}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed pt-1">
            Hook worked because it immediately created curiosity in the first 1.8 seconds with bold text overlay.
          </p>
        </div>

        {/* Weakest Reel */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-rose-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Weakest Reel of the Week
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-mono font-bold">
              {weakestReel.performanceVsAvgPercent}% vs Avg
            </span>
          </div>

          <p className="text-xs text-white font-semibold leading-relaxed">
            "{weakestReel.caption}"
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="p-2 rounded-lg bg-[#181B2B]">
              <span className="text-[10px] text-gray-400 block">Views</span>
              <span className="font-bold text-white font-mono">{weakestReel.views.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#181B2B]">
              <span className="text-[10px] text-gray-400 block">Shares</span>
              <span className="font-bold text-pink-400 font-mono">{weakestReel.shares}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#181B2B]">
              <span className="text-[10px] text-gray-400 block">Saves</span>
              <span className="font-bold text-amber-400 font-mono">{weakestReel.saves}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed pt-1">
            Drop-off occurred before second 3 due to slow opening establishing shot without a caption hook.
          </p>
        </div>
      </div>

      {/* What Worked vs What Didn't Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            What Worked This Week
          </h3>
          <div className="space-y-2">
            {report.whatWorked.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#171A29] text-xs text-gray-300 leading-relaxed">
                • {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            What Didn't Work This Week
          </h3>
          <div className="space-y-2">
            {report.whatDidNotWork.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#171A29] text-xs text-gray-300 leading-relaxed">
                • {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Focus for Next Week */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/40 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Primary Focus for Next Week
          </h3>
        </div>
        <p className="text-xs text-gray-200 leading-relaxed font-medium">
          {report.focusNextWeek}
        </p>
      </div>
    </div>
  );
};
