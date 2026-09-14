import React, { useState } from 'react';
import { CaptionOutput } from '../types';
import { generateCaptionAI } from '../services/geminiService';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Languages,
  Hash,
  Share2,
  Info,
} from 'lucide-react';

export const CaptionGeneratorView: React.FC = () => {
  const [topic, setTopic] = useState('Why discipline beats motivation every single time');
  const [language, setLanguage] = useState<'Hindi' | 'English' | 'Hinglish'>('English');
  const [style, setStyle] = useState<'Sad' | 'Attitude' | 'Emotional' | 'Funny' | 'Motivational' | 'Romantic'>('Motivational');
  const [length, setLength] = useState<'Short' | 'Long'>('Short');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<CaptionOutput | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  React.useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateCaptionAI(topic, language, style, length);
      setOutput(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const copyAll = () => {
    if (!output) return;
    const fullText = `${output.caption}\n\n${output.callToAction}\n\n${output.hashtags.join(' ')}`;
    copyToClipboard(fullText, 'all');
  };

  const styles: Array<'Sad' | 'Attitude' | 'Emotional' | 'Funny' | 'Motivational' | 'Romantic'> = [
    'Motivational',
    'Attitude',
    'Emotional',
    'Funny',
    'Sad',
    'Romantic',
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
            <FileText className="w-4 h-4" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">AI Caption Generator</h2>
        </div>
        <p className="text-xs text-gray-400">
          Generate high-retention captions with tailored line breaks, high-converting CTAs, and relevant hashtags.
        </p>
      </div>

      {/* Input Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">
            Reel Topic or Concept
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Stop making excuses and start building your future"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#171A29] border border-[#2A2F47] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
          />
        </div>

        {/* Language & Length */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-pink-400" />
              Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['English', 'Hindi', 'Hinglish'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    language === lang
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-[#181B2B] text-gray-400 hover:text-white border border-[#272B42]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              Caption Length
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Short', 'Long'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLength(l)}
                  className={`py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    length === l
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-[#181B2B] text-gray-400 hover:text-white border border-[#272B42]'
                  }`}
                >
                  {l === 'Short' ? 'Short (Punchy)' : 'Long (Story / Steps)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style selection */}
        <div>
          <label className="text-xs font-semibold text-gray-300 block mb-1.5">
            Caption Tone & Mood
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

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-xs text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Crafting Caption & Strategy...' : 'Generate AI Caption'}</span>
        </button>
      </div>

      {/* Output Display */}
      {output && (
        <div className="p-6 rounded-2xl bg-[#131522] border border-pink-500/30 space-y-5">
          <div className="flex items-center justify-between border-b border-[#22273D] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Generated Strategy & Copy
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono">
                {language} • {style}
              </span>
            </div>

            <button
              onClick={copyAll}
              className="px-3 py-1.5 rounded-lg bg-[#1D2033] hover:bg-[#282D47] border border-[#2D3352] text-xs font-semibold text-pink-400 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedType === 'all' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Everything</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Entire Package</span>
                </>
              )}
            </button>
          </div>

          {/* Caption Body */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
              <span>Caption Body:</span>
              <button
                onClick={() => copyToClipboard(output.caption, 'caption')}
                className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copiedType === 'caption' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'caption' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#181B2B] border border-[#262B42] text-xs text-gray-200 whitespace-pre-line leading-relaxed font-sans">
              {output.caption}
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
              <span>Call to Action (CTA):</span>
              <button
                onClick={() => copyToClipboard(output.callToAction, 'cta')}
                className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copiedType === 'cta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'cta' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs text-pink-300 font-medium">
              👉 {output.callToAction}
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
              <span className="flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-pink-400" />
                Targeted Hashtags ({output.hashtags.length}):
              </span>
              <button
                onClick={() => copyToClipboard(output.hashtags.join(' '), 'hashtags')}
                className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copiedType === 'hashtags' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'hashtags' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-[#181B2B] border border-[#262B42] flex flex-wrap gap-2 text-xs font-mono text-cyan-400">
              {output.hashtags.map((tag, idx) => (
                <span key={idx} className="hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            {/* Disclaimer required by user prompt */}
            <div className="p-2.5 rounded-lg bg-[#141624] text-[11px] text-gray-400 flex items-center gap-2 border border-[#22273D]">
              <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{output.hashtagsDisclaimer}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
