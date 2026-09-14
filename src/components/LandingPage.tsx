import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
  TrendingUp,
  FileText,
  Lock,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

interface LandingPageProps {
  onConnectClick: () => void;
  onTryDemoClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onConnectClick, onTryDemoClick }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Ambient background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-orange-500/10 blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181B2B] border border-[#2B304C] text-xs font-semibold text-pink-400 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Next-Gen Instagram Growth Intelligence • Created by Mohd Kasim</span>
        </div>

        {/* Logo & Name */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl ig-gradient-bg flex items-center justify-center shadow-xl shadow-pink-500/30">
            <InstagramIcon className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Instagram Growth <span className="ig-gradient-text">AI Analyzer</span>
          </h1>
        </div>

        {/* Exact Tagline from Prompt */}
        <p className="text-lg sm:text-2xl font-medium text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          “Understand your Instagram. Improve your content. Grow smarter.”
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <button
            onClick={onConnectClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white text-sm ig-gradient-bg hover:opacity-95 shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Connect Instagram</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onTryDemoClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-gray-200 text-sm bg-[#161928] hover:bg-[#20243B] border border-[#2D3352] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Try Demo</span>
          </button>
        </div>

        {/* Official API Security Guarantee Banner */}
        <div className="p-4 rounded-2xl bg-[#131522] border border-[#262B44] text-xs text-gray-400 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-200">100% Official Meta Graph API Flow</p>
              <p className="text-[11px] text-gray-400">
                Zero password collection. No scraping. We only access metrics authorized via official permissions.
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 font-mono font-medium whitespace-nowrap border border-emerald-500/20">
            Secure OAuth 2.0
          </span>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16 w-full">
        <h2 className="text-xl font-bold text-gray-200 text-center mb-8">
          Complete Content Strategy & Diagnostic Suite
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] hover:border-pink-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-100 mb-1.5 text-sm">Growth Scores (0-100)</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Granular evaluation across Profile, Content, Engagement, Reach, and Consistency with actionable breakdowns.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] hover:border-purple-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-100 mb-1.5 text-sm">Reel & Reach Analyzer</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Spot your top vs underperforming reels, calculate exact engagement ratios, and analyze follower vs non-follower reach.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#131522] border border-[#22273D] hover:border-amber-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-100 mb-1.5 text-sm">AI Hook & Caption Generators</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Generate 10 punchy 2-second reel hooks, captions in Hindi/English/Hinglish, and 2-line modern Shayari for video text overlays.
            </p>
          </div>
        </div>
      </section>

      {/* Owner & Developer Signature Footer */}
      <footer className="border-t border-[#1C1F30] py-8 px-4 text-center bg-[#0B0C12]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg ig-gradient-bg flex items-center justify-center font-bold text-white text-[10px]">
              MK
            </div>
            <span className="text-gray-300 font-medium">
              Owned & Developed by <strong className="text-white font-semibold">Mohd Kasim</strong>
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            Instagram Growth AI Analyzer © {new Date().getFullYear()} • Official Meta OAuth 2.0 Compliance
          </p>
        </div>
      </footer>
    </div>
  );
};
