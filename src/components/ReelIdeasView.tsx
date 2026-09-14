import React, { useState } from 'react';
import { ReelIdeaItem, ReelMetrics } from '../types';
import { generateReelIdeasAI } from '../services/geminiService';
import {
  Lightbulb,
  Sparkles,
  Copy,
  Check,
  Flame,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Share2,
} from 'lucide-react';

interface ReelIdeasViewProps {
  niche: string;
  topReels: ReelMetrics[];
}

export const ReelIdeasView: React.FC<ReelIdeasViewProps> = ({ niche, topReels }) => {
  const [currentNiche, setCurrentNiche] = useState(niche);
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ReelIdeaItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const results = await generateReelIdeasAI(currentNiche, topReels);
      setIdeas(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyIdea = (idea: ReelIdeaItem) => {
    const text = `Title: ${idea.title}\nHook: ${idea.hook}\nConcept: ${idea.shortConcept}\nCaption: ${idea.suggestedCaption}\nCTA: ${idea.suggestedCTA}`;
    navigator.clipboard.writeText(text);
    setCopiedId(idea.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Lightbulb className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">AI Reel Ideas Architect</h2>
          </div>
          <p className="text-xs text-gray-400">
            10 data-driven Reel blueprints reverse-engineered from your highest-share historical content.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start"
        >
          <Sparkles className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Synthesizing 10 Ideas...' : 'Regenerate 10 Ideas'}</span>
        </button>
      </div>

      {/* Grounded Context Banner */}
      <div className="p-4 rounded-xl bg-[#141624] border border-[#242940] flex items-center justify-between gap-4 text-xs text-gray-300">
        <div>
          <span className="text-pink-400 font-semibold block text-[11px] uppercase tracking-wider">
            Trained on Historical Outliers:
          </span>
          <span>
            Targeting the mechanics of your top reel (
            <strong className="text-white">{topReels[0]?.views.toLocaleString()} views</strong>,{' '}
            <strong className="text-pink-400">{topReels[0]?.shares} shares</strong>).
          </span>
        </div>
        <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono">
          Niche: {currentNiche}
        </span>
      </div>

      {/* 10 Ideas List */}
      <div className="space-y-4">
        {ideas.map((idea, idx) => (
          <div
            key={idea.id || idx}
            className="p-5 sm:p-6 rounded-2xl bg-[#131522] border border-[#23273D] hover:border-pink-500/40 transition space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F2338] pb-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl ig-gradient-bg text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-bold text-sm text-white">{idea.title}</h3>
                  <span className="text-[11px] text-pink-400 font-mono">{idea.format}</span>
                </div>
              </div>

              <button
                onClick={() => copyIdea(idea)}
                className="px-3 py-1.5 rounded-lg bg-[#181B2B] hover:bg-[#252A42] text-gray-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer self-start sm:self-center"
              >
                {copiedId === idea.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Blueprint</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Blueprint</span>
                  </>
                )}
              </button>
            </div>

            {/* Hook */}
            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs">
              <span className="font-bold uppercase tracking-wider text-[10px] text-pink-400 block mb-1">
                Spoken / Visual Hook (0–2s):
              </span>
              <p className="text-white font-semibold italic">"{idea.hook}"</p>
            </div>

            {/* Concept */}
            <div className="text-xs text-gray-300 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                Visual Concept & Execution:
              </span>
              <p className="leading-relaxed">{idea.shortConcept}</p>
            </div>

            {/* Caption & CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#171A29] border border-[#23273D]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Suggested Caption Hook:
                </span>
                <p className="text-gray-300 italic">"{idea.suggestedCaption}"</p>
              </div>

              <div className="p-3 rounded-xl bg-[#171A29] border border-[#23273D]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  High-Converting CTA:
                </span>
                <p className="text-cyan-300 font-medium">👉 {idea.suggestedCTA}</p>
              </div>
            </div>

            {/* Predicted Virality Alignment */}
            <div className="pt-2 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Algorithmic Alignment: {idea.predictedViralityReason}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
