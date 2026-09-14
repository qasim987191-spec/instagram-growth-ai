import React, { useState } from 'react';
import { InstagramProfile, ProfileAudit } from '../types';
import {
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Target,
  ExternalLink,
} from 'lucide-react';

interface ProfileAnalysisViewProps {
  profile: InstagramProfile;
  audit: ProfileAudit;
}

export const ProfileAnalysisView: React.FC<ProfileAnalysisViewProps> = ({ profile, audit }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentAudit, setCurrentAudit] = useState<ProfileAudit>(audit);

  const handleRerunAudit = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <UserCheck className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">AI Profile Analysis</h2>
          </div>
          <p className="text-xs text-gray-400">
            Evaluating profile positioning, bio structure, CTA clarity, and conversion potential.
          </p>
        </div>

        <button
          onClick={handleRerunAudit}
          disabled={isRefreshing}
          className="px-4 py-2 rounded-xl bg-[#181B2B] hover:bg-[#22273D] border border-[#2B314E] text-xs font-semibold text-gray-200 transition flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-pink-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Analyzing Profile...' : 'Re-Run AI Audit'}</span>
        </button>
      </div>

      {/* Snapshot Evaluation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Niche Clarity */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Niche Clarity
              </span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-semibold text-white mb-2">{currentAudit.nicheClarity}</div>
          </div>
          <div className="text-[11px] text-gray-400 pt-2 border-t border-[#1F2338]">
            Verified: User instantly knows account content domain.
          </div>
        </div>

        {/* Bio Quality Score */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Bio Quality Score
              </span>
              <span className="text-xs font-mono font-bold text-pink-400 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                {currentAudit.bioQualityScore} / 100
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">{currentAudit.bioQualityReason}</p>
          </div>
          <div className="text-[11px] text-gray-400 pt-2 border-t border-[#1F2338]">
            3-tier structure: Identity → Value → Lead magnet.
          </div>
        </div>

        {/* First Impression */}
        <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                First Impression
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">{currentAudit.firstImpression}</p>
          </div>
          <div className="text-[11px] text-gray-400 pt-2 border-t border-[#1F2338]">
            High aesthetic cohesion between bio and thumbnails.
          </div>
        </div>
      </div>

      {/* Deep Dives: What is Working vs What Needs Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What is Working */}
        <div className="p-6 rounded-2xl bg-[#131522] border border-[#22273D]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">What is Working</h3>
          </div>

          <div className="space-y-3">
            {currentAudit.whatIsWorking.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#181B2B] border border-[#242940] flex items-start gap-3 text-xs text-gray-300"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                  ✓
                </div>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Needs Improvement */}
        <div className="p-6 rounded-2xl bg-[#131522] border border-[#22273D]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">What Needs Improvement</h3>
          </div>

          <div className="space-y-3">
            {currentAudit.whatNeedsImprovement.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#181B2B] border border-[#242940] flex items-start gap-3 text-xs text-gray-300"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                  !
                </div>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Specific Actions to Take (Mandatory) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#161826] to-[#121420] border border-pink-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg ig-gradient-bg text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">3 Specific Actions to Take</h3>
              <p className="text-[11px] text-gray-400">Prioritized implementation steps for immediate profile uplift</p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 font-semibold uppercase tracking-wider">
            High Priority
          </span>
        </div>

        <div className="space-y-3">
          {currentAudit.actionPlan.map((action, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#141624] border border-[#25293E] hover:border-pink-500/40 transition flex items-start gap-4"
            >
              <div className="w-7 h-7 rounded-xl ig-gradient-bg text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-md">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-200 font-medium leading-relaxed">{action}</p>
                <span className="text-[10px] text-pink-400 font-semibold uppercase tracking-wider">
                  Target: Complete within 48 hours
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
