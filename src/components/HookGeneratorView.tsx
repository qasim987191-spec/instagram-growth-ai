import React, { useState } from 'react';
import { HookItem } from '../types';
import { generateHooksAI } from '../services/geminiService';
import {
  Flame,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
  Volume2,
} from 'lucide-react';

interface HookGeneratorViewProps {
  initialNiche?: string;
}

export const HookGeneratorView: React.FC<HookGeneratorViewProps> = ({ initialNiche = 'Tech & AI Tools' }) => {
  const [niche, setNiche] = useState(initialNiche);
  const [topic, setTopic] = useState('3 unknown AI tools that save 10 hours a week');
  const [style, setStyle] = useState<'Curiosity' | 'Emotional' | 'Funny' | 'Bold' | 'Storytelling' | 'Suspense'>('Curiosity');
  const [targetAudience, setTargetAudience] = useState('Content creators & freelancers');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hooks, setHooks] = useState<HookItem[]>([]);

  // Load initial hooks
  React.useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const results = await generateHooksAI(niche, topic, style, targetAudience);
      setHooks(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyHook = (hook: HookItem) => {
    navigator.clipboard.writeText(hook.text);
    setCopiedId(hook.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stylesList: Array<'Curiosity' | 'Emotional' | 'Funny' | 'Bold' | 'Storytelling' | 'Suspense'> = [
    'Curiosity',
    'Emotional',
    'Funny',
    'Bold',
    'Storytelling',
    'Suspense',
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
            <Flame className="w-4 h-4" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">AI Hook Generator</h2>
        </div>
        <p className="text-xs text-gray-400">
          Generate 10 high-retention hooks engineered for the critical first 2–3 seconds of an Instagram Reel.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              Creator Niche
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Tech, Fitness, Finance, Fashion"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171A29] border border-[#2A2F47] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Beginners, Busy professionals, Gen Z creators"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171A29] border border-[#2A2F47] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">
            Reel Topic or Core Message
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 5 hidden iPhone features you didn't know existed"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#171A29] border border-[#2A2F47] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
          />
        </div>

        {/* Mood/Style selector */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">
            Hook Style & Psychological Angle
          </label>
          <div className="flex flex-wrap gap-2">
            {stylesList.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  style === s
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md shadow-pink-500/20'
                    : 'bg-[#181B2B] text-gray-400 hover:text-white border border-[#272B42]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-xs text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Crafting 10 High-Retention Hooks...' : 'Generate 10 Viral Hooks'}</span>
        </button>
      </div>

      {/* Generated Hooks Output */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Generated Hooks ({hooks.length})
          </span>
          <span className="text-[11px] text-pink-400 font-mono">
            Optimized for 0–2.5 second retention
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {hooks.map((hook, idx) => (
            <div
              key={hook.id || idx}
              className="p-4 rounded-xl bg-[#131522] border border-[#23273D] hover:border-pink-500/40 transition flex flex-col justify-between group"
            >
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                    Hook #{idx + 1} • {hook.style}
                  </span>
                  <button
                    onClick={() => copyHook(hook)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1E2235] transition cursor-pointer"
                    title="Copy hook to clipboard"
                  >
                    {copiedId === hook.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <p className="text-sm font-semibold text-white leading-relaxed">
                  "{hook.text}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#1E2235] text-[11px] text-gray-400 flex items-start gap-1.5">
                <span className="text-pink-400 font-semibold flex-shrink-0">Why:</span>
                <span className="leading-tight">{hook.whyItWorks}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
