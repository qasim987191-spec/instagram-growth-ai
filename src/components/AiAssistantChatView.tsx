import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Lightbulb,
  TrendingUp,
  Flame,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { InstagramProfile, GrowthScores, ReelMetrics } from '../types';
import { getGeminiApiKey } from '../services/geminiService';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiAssistantChatViewProps {
  profile: InstagramProfile;
  scores: GrowthScores;
  reels: ReelMetrics[];
}

export const AiAssistantChatView: React.FC<AiAssistantChatViewProps> = ({
  profile,
  scores,
  reels,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Namaste @${profile.username}! 👋 Main aapka personal **Instagram AI Growth Assistant** hoon.\n\nMeri nazar mein aapke profile ke metrics hain:\n- **Followers:** ${profile.followersCount.toLocaleString()}\n- **Following:** ${profile.followingCount.toLocaleString()}\n- **Niche:** ${profile.niche}\n- **Growth Score:** ${scores.overallScore}/100\n\nAap mujhse kuch bhi poochh sakte hain, jaise:\n1. *"Meri agli reel viral kaise karein?"*\n2. *"Mera account kyu grow nahi ho raha?"*\n3. *"Mere niche ke liye 3 viral reel ideas aur hooks do"* \n4. *"Meri bio ko audit karke better version likho"*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const QUICK_PROMPTS = [
    'Meri profile audit karo aur growth tips do',
    '3 high retention reel hooks do mere niche ke liye',
    'Followers engagement kaise double karein?',
    'Mera best posting time kya hona chahiye?',
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const apiKey = getGeminiApiKey();

      // System context with full profile knowledge
      const systemPrompt = `You are an elite Instagram Growth Coach and Viral Strategist dedicated to helping the creator @${profile.username} scale their account.
Creator Info:
- Username: @${profile.username}
- Niche: ${profile.niche}
- Followers: ${profile.followersCount}
- Following: ${profile.followingCount}
- Bio: "${profile.bio}"
- Overall Growth Score: ${scores.overallScore}/100 (Hook Quality: ${scores.engagementScore}/100, Consistency: ${scores.consistencyScore}/100)

Guidelines:
- Speak in a friendly, motivational and practical Hinglish / Hindi-English mix (e.g. "Bhai, aapke account mein sabse badi opportunity yeh hai...").
- Give direct, actionable advice, real hooks, script breakdown, or hashtag strategy based on their specific niche (${profile.niche}).
- Structure with clear bullet points, bold key insights, and actionable steps.`;

      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        // Direct Gemini call
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `${systemPrompt}\n\nUser Question: ${textToSend.trim()}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                topP: 0.95,
              },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const replyText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Maaf kijiye, response format issue. Please dobara try karein.';

          setMessages((prev) => [
            ...prev,
            {
              id: `ai_${Date.now()}`,
              sender: 'assistant',
              text: replyText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          setLoading(false);
          return;
        }
      }

      // Intelligent Offline / Fallback response if API key not set
      setTimeout(() => {
        let reply = '';
        const lower = textToSend.toLowerCase();

        if (lower.includes('audit') || lower.includes('profile')) {
          reply = `📊 **Profile Audit Report for @${profile.username}**:\n\n` +
            `1. **Bio Check:** Aapka bio abhi "${profile.bio || 'General'}" hai. Isme ek clear target audience aur CTA (Call to Action) add karein jaise *"DM for colabs"* ya free resource link.\n` +
            `2. **Follower Ratio:** Aap ${profile.followersCount} followers aur ${profile.followingCount} following par hain. Ratio healthy hai.\n` +
            `3. **Reels Frequency:** Niche (${profile.niche}) mein algorithm 5-6 reels per week ko push karta hai. Har reel ke pehle 3 second mein strong visual change rakhein.`;
        } else if (lower.includes('hook') || lower.includes('viral')) {
          reply = `🔥 **3 High-Retention Viral Hooks for ${profile.niche}**:\n\n` +
            `1. *"Agar aap 2026 mein bhi yeh galti kar rahe hain, toh ruk jaiye..."*\n` +
            `2. *"99% creators yeh secret tool nahi jaante jo maine 2 din pehle discover kiya..."*\n` +
            `3. *"Sirf 30 seconds mein dekho kaise yeh formula mere content ko 10x karta hai!"*\n\n` +
            `💡 **Pro Tip:** Hook bolte waqt screen par text pop-up karein aur hand gesture zaroor dein!`;
        } else if (lower.includes('time') || lower.includes('post')) {
          reply = `⏰ **Optimal Posting Windows for @${profile.username}**:\n\n` +
            `Aapke niche (${profile.niche}) ke mutabiq best response time yeh rehta hai:\n` +
            `- **Evening Prime:** 6:30 PM - 8:45 PM (Sabse zyada engagement)\n` +
            `- **Morning Commute:** 8:15 AM - 9:30 AM\n` +
            `- **Bonus:** Sunday ko 12:00 PM afternoon slot mein reels upload karein retention badhega.`;
        } else {
          reply = `🚀 **Growth Strategy for @${profile.username} (${profile.niche})**:\n\n` +
            `Aapke sawal: *"${textToSend}"* ke liye 3 direct steps:\n\n` +
            `1. **Content Hook:** Pehle 2 second mein question ya bold statement se viewer ko rok lijiye.\n` +
            `2. **Save & Share Trigger:** Aisa informative ya funny content banayein jisse log bookmark karein (Instagram algorithm save & share ko sabse zyada viral points deta hai).\n` +
            `3. **Consistency:** Kam se kam 21 din tak rojana 1 high quality reel daliye!\n\n` +
            `*(Tip: Agar aapne Gemini API key daali hai toh aur bhi personalized real-time advice milti hai).*`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            sender: 'assistant',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setLoading(false);
      }, 700);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          text: `⚠️ Error connect karne mein: ${e?.message || 'Try again later'}. Settings mein Gemini API key check karein.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-4xl mx-auto rounded-2xl bg-[#11131E] border border-[#23273C] overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 bg-[#161826] border-b border-[#24283F] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl ig-gradient-bg flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-sm sm:text-base">Instagram AI Coach</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Assistant
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Analyzing @{profile.username} ({profile.followersCount.toLocaleString()} followers • {profile.niche})
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `welcome-${Date.now()}`,
                sender: 'assistant',
                text: `Chat reset ho gaya! @${profile.username}, ab aap naya sawal poochh sakte hain.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
          }}
          title="Clear Chat"
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#202438] transition cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isAi = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAi ? 'items-start' : 'items-end justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl ig-gradient-bg flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                  isAi
                    ? 'bg-[#181B2B] border border-[#272C46] text-gray-200'
                    : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-500/15'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans space-y-1.5">
                  {msg.text}
                </div>

                <div className="mt-2 pt-1 flex items-center justify-between text-[10px] text-gray-400">
                  <span>{msg.timestamp}</span>
                  {isAi && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-gray-400 hover:text-white opacity-60 group-hover:opacity-100 transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white flex-shrink-0 mb-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl ig-gradient-bg flex items-center justify-center text-white flex-shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#181B2B] border border-[#272C46] text-xs text-pink-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-pink-400" />
              <span>AI Coach aapka profile analyze karke soch raha hai...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-3 py-2 bg-[#141624] border-t border-[#222538] flex gap-2 overflow-x-auto no-scrollbar">
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-xl bg-[#1D2032] hover:bg-[#282D46] border border-[#2E3350] text-gray-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-[#161826] border-t border-[#23273D]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Apne Instagram account ya viral ideas ke bare me poochhein..."
            className="flex-1 px-4 py-3 rounded-xl bg-[#10121C] border border-[#2B304B] text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 rounded-xl ig-gradient-bg text-white hover:opacity-95 transition disabled:opacity-40 cursor-pointer shadow-lg shadow-pink-500/25 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
