import React, { useState } from 'react';
import { AutoDmRule, AutoDmLog } from '../types';
import {
  MessageSquare,
  Bot,
  Zap,
  Send,
  CheckCircle2,
  Play,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  Copy,
  Check,
  Sliders,
} from 'lucide-react';

interface AutoDmViewProps {
  initialRules: AutoDmRule[];
  initialLogs: AutoDmLog[];
}

export const AutoDmView: React.FC<AutoDmViewProps> = ({
  initialRules,
  initialLogs,
}) => {
  const [rules, setRules] = useState<AutoDmRule[]>(initialRules);
  const [logs, setLogs] = useState<AutoDmLog[]>(initialLogs);

  // Live Simulator state
  const [testComment, setTestComment] = useState<string>('Please send NOTION link bro!');
  const [simulatedOutput, setSimulatedOutput] = useState<{
    matchedRule?: AutoDmRule;
    publicReply?: string;
    sentDm?: string;
    status: 'idle' | 'success' | 'no_match';
  }>({ status: 'idle' });
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // New Rule Modal
  const [isNewRuleModalOpen, setIsNewRuleModalOpen] = useState(false);
  const [ruleName, setRuleName] = useState('');
  const [ruleKeyword, setRuleKeyword] = useState('');
  const [ruleDmMessage, setRuleDmMessage] = useState('');
  const [rulePublicReply, setRulePublicReply] = useState('Sent to your DMs! Check your message requests 🚀');
  const [ruleLink, setRuleLink] = useState('');

  const toggleRuleActive = (ruleId: string) => {
    setRules(
      rules.map((r) => (r.id === ruleId ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleKeyword.trim() || !ruleDmMessage.trim()) return;

    const newRule: AutoDmRule = {
      id: `rule_${Date.now()}`,
      name: ruleName || `Keyword Trigger: ${ruleKeyword.toUpperCase()}`,
      triggerKeyword: ruleKeyword.trim().toUpperCase(),
      actionType: 'comment_reply_and_dm',
      dmMessage: ruleDmMessage,
      publicCommentReplies: [rulePublicReply],
      attachedLink: ruleLink || undefined,
      isActive: true,
      triggerCount: 0,
    };

    setRules([newRule, ...rules]);
    setRuleName('');
    setRuleKeyword('');
    setRuleDmMessage('');
    setRuleLink('');
    setIsNewRuleModalOpen(false);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const commentUpper = testComment.toUpperCase();
      const matched = rules.find(
        (r) => r.isActive && commentUpper.includes(r.triggerKeyword.toUpperCase())
      );

      if (matched) {
        const randomReply =
          matched.publicCommentReplies[
            Math.floor(Math.random() * matched.publicCommentReplies.length)
          ] || 'DM sent! Check your inbox ✨';

        setSimulatedOutput({
          matchedRule: matched,
          publicReply: randomReply,
          sentDm: matched.dmMessage,
          status: 'success',
        });

        // Add to logs
        const newLog: AutoDmLog = {
          id: `log_${Date.now()}`,
          username: 'simulator_user',
          triggeredKeyword: matched.triggerKeyword,
          reelCaptionSnippet: 'Simulator Test Reel...',
          sentAt: 'Just now',
          status: 'delivered',
          messagePreview: matched.dmMessage.slice(0, 60) + '...',
        };
        setLogs([newLog, ...logs]);
      } else {
        setSimulatedOutput({
          status: 'no_match',
        });
      }
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Bot className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Auto DM & Comment Automation</h2>
          </div>
          <p className="text-xs text-gray-400">
            Convert reel comments into high-conversion direct messages, deliver lead magnets, and 10x engagement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewRuleModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Auto-DM Trigger</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Active Rules
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            {rules.filter((r) => r.isActive).length} / {rules.length}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Listening for keywords</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Total DMs Dispatched
          </span>
          <div className="text-2xl font-extrabold text-pink-400 font-mono">
            {rules.reduce((acc, r) => acc + r.triggerCount, 0).toLocaleString()}
          </div>
          <span className="text-[11px] text-pink-400 font-medium">+42% link click rate</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Average Delivery Speed
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            1.8s
          </div>
          <span className="text-[11px] text-cyan-400 font-medium">Instant webhook dispatch</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Meta Compliance
          </span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            100%
          </div>
          <span className="text-[11px] text-gray-400 font-medium">Anti-spam randomized replies</span>
        </div>
      </div>

      {/* Main split: Rules list & Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Trigger Rules */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Configured Keyword Triggers
            </h3>
            <span className="text-[11px] text-gray-400">Trigger on any Reel comment</span>
          </div>

          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 rounded-xl bg-[#131522] border border-[#22273D] hover:border-[#2C324E] transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-pink-500/20 text-pink-400 font-mono font-bold text-xs border border-pink-500/30">
                        {rule.triggerKeyword}
                      </span>
                      <h4 className="font-bold text-white text-xs">{rule.name}</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Action: Public reply + Instant Direct Message • {rule.triggerCount} DMs sent
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRuleActive(rule.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                        rule.isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-gray-700/30 text-gray-400 border border-gray-700/40'
                      }`}
                    >
                      {rule.isActive ? 'Active' : 'Paused'}
                    </button>
                  </div>
                </div>

                {/* DM Message Box */}
                <div className="p-3 rounded-lg bg-[#171A29] border border-[#242940] space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-pink-400" />
                    Direct Message Payload
                  </div>
                  <p className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed font-mono text-[11px]">
                    {rule.dmMessage}
                  </p>
                </div>

                {/* Public Reply Variations */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-semibold block">
                    Randomized Public Comment Replies ({rule.publicCommentReplies.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rule.publicCommentReplies.map((reply, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#181B2C] text-gray-300 border border-[#272B44]"
                      >
                        "{reply}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Interactive Simulator & Live Logs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Live Simulator */}
          <div className="p-5 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                Live Trigger Simulator
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono">
                Interactive Test
              </span>
            </div>

            <p className="text-xs text-gray-400">
              Type a sample viewer comment to test keyword detection and see the simulated DM response:
            </p>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testComment}
                  onChange={(e) => setTestComment(e.target.value)}
                  placeholder="e.g. Send me the NOTION template"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#171A29] border border-[#282D46] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 font-sans"
                />
                <button
                  onClick={runSimulation}
                  disabled={isSimulating || !testComment.trim()}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSimulating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                  <span>Test</span>
                </button>
              </div>

              {/* Simulation Result Preview */}
              {simulatedOutput.status === 'success' && simulatedOutput.matchedRule && (
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#181B2B] to-[#121420] border border-emerald-500/40 space-y-3 mt-3 animate-fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Trigger Matched: {simulatedOutput.matchedRule.triggerKeyword}
                    </span>
                    <span className="text-[10px] text-gray-400">Response in 0.4s</span>
                  </div>

                  {/* Public reply simulated */}
                  <div className="p-2.5 rounded-lg bg-[#11131E] border border-[#21253B] space-y-1">
                    <span className="text-[10px] text-gray-400 block font-semibold">
                      Public Reply to @simulator_user:
                    </span>
                    <p className="text-xs text-pink-300">"{simulatedOutput.publicReply}"</p>
                  </div>

                  {/* Direct DM simulated */}
                  <div className="p-2.5 rounded-lg bg-[#11131E] border border-[#21253B] space-y-1">
                    <span className="text-[10px] text-gray-400 block font-semibold">
                      Direct Message Sent:
                    </span>
                    <p className="text-xs text-gray-200 whitespace-pre-wrap font-mono text-[11px]">
                      {simulatedOutput.sentDm}
                    </p>
                  </div>
                </div>
              )}

              {simulatedOutput.status === 'no_match' && (
                <div className="p-3 rounded-xl bg-[#181B2B] border border-rose-500/40 text-xs text-rose-300">
                  ⚠️ No active rule found matching keywords in this comment. Try using <strong>NOTION</strong>, <strong>TOOLS</strong>, or <strong>COLLAB</strong>.
                </div>
              )}
            </div>
          </div>

          {/* Real-Time Activity Log */}
          <div className="p-5 rounded-2xl bg-[#131522] border border-[#23273D] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
                Live Dispatch Activity
              </h3>
              <span className="text-[10px] text-gray-400 font-mono">Recent 4 DMs</span>
            </div>

            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-[#171A29] border border-[#242940] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">@{log.username}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-mono">
                        {log.triggeredKeyword}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 truncate max-w-[200px]">
                      {log.messagePreview}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-400 block capitalize">
                      ✓ {log.status}
                    </span>
                    <span className="text-[9px] text-gray-500">{log.sentAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Rule Modal */}
      {isNewRuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121420] rounded-2xl border border-[#262B44] max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create New Auto-DM Trigger</h3>
            <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Free Presets Link Trigger"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Trigger Keyword (All Caps)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PRESET, GUIDE, LINK, PROMPT"
                  value={ruleKeyword}
                  onChange={(e) => setRuleKeyword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white font-mono focus:outline-none focus:border-pink-500 uppercase"
                />
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  When a user comments this keyword, the automated DM will trigger instantly.
                </span>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Direct Message Content</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Hey! Here is your requested link: https://..."
                  value={ruleDmMessage}
                  onChange={(e) => setRuleDmMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Public Comment Reply</label>
                <input
                  type="text"
                  value={rulePublicReply}
                  onChange={(e) => setRulePublicReply(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Attached Destination Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... or your website"
                  value={ruleLink}
                  onChange={(e) => setRuleLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewRuleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white bg-[#181B2B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold text-white ig-gradient-bg cursor-pointer"
                >
                  Save Trigger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
