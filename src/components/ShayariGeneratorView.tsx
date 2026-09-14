import React, { useState } from 'react';
import { ShayariItem } from '../types';
import { generateShayariAI } from '../services/geminiService';
import {
  Sparkles,
  Copy,
  Check,
  Languages,
  RefreshCw,
  Heart,
  Share2,
} from 'lucide-react';

export const ShayariGeneratorView: React.FC = () => {
  const [style, setStyle] = useState<'Sad' | 'Attitude' | 'Emotional' | 'Love' | 'Breakup' | 'Motivational'>('Attitude');
  const [language, setLanguage] = useState<'Hindi' | 'Hinglish'>('Hindi');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ShayariItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const results = await generateShayariAI(style, language);
      setItems(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyShayari = (shayari: ShayariItem) => {
    const text = `${shayari.line1}\n${shayari.line2}`;
    navigator.clipboard.writeText(text);
    setCopiedId(shayari.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const styles: Array<'Sad' | 'Attitude' | 'Emotional' | 'Love' | 'Breakup' | 'Motivational'> = [
    'Attitude',
    'Motivational',
    'Love',
    'Emotional',
    'Sad',
    'Breakup',
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">AI 2-Line Shayari Generator</h2>
        </div>
        <p className="text-xs text-gray-400">
          Generate modern, aesthetic 2-line couplets in Hindi and Hinglish tailored for Reel text overlays and carousels.
        </p>
      </div>

      {/* Selector Controls */}
      <div className="p-5 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Language selector */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-pink-400" />
              Script & Language
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLanguage('Hindi')}
                className={`py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  language === 'Hindi'
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-[#181B2B] text-gray-400 hover:text-white border border-[#272B42]'
                }`}
              >
                Hindi (हिंदी)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('Hinglish')}
                className={`py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  language === 'Hinglish'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-[#181B2B] text-gray-400 hover:text-white border border-[#272B42]'
                }`}
              >
                Hinglish (Latin)
              </button>
            </div>
          </div>

          {/* Quick Style Tabs */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              Shayari Vibe / Mood
            </label>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    style === s
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                      : 'bg-[#181B2B] text-gray-400 hover:text-white border border-[#272B42]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-2.5 rounded-xl font-bold text-xs text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Composing 2-Line Poetry...' : 'Generate 2-Line Shayari'}</span>
        </button>
      </div>

      {/* Generated Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((sh, idx) => (
          <div
            key={sh.id || idx}
            className="p-6 rounded-2xl bg-[#131522] border border-[#262B44] hover:border-pink-500/50 transition relative overflow-hidden flex flex-col justify-between group shadow-lg"
          >
            {/* Ambient aesthetic backdrop */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent blur-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 font-semibold">
                {sh.style} • {sh.language}
              </span>

              <button
                onClick={() => copyShayari(sh)}
                className="p-1.5 rounded-lg bg-[#191C2D] hover:bg-[#252A42] text-gray-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              >
                {copiedId === sh.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Shayari Poetry Lines */}
            <div className="my-3 space-y-2 text-center py-4 bg-[#171A29]/60 rounded-xl border border-[#23273D]">
              <p className="text-base sm:text-lg font-semibold text-gray-100 tracking-wide font-sans">
                {sh.line1}
              </p>
              <p className="text-base sm:text-lg font-semibold ig-gradient-text tracking-wide font-sans">
                {sh.line2}
              </p>
            </div>

            <div className="text-[11px] text-gray-400 text-center pt-2">
              Tip: Overlay this text on 1080x1920 slow-motion B-roll with trending audio.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
