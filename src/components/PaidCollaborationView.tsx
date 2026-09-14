import React, { useState } from 'react';
import {
  BrandCollaborationDeal,
  RateCardEstimation,
  InstagramProfile,
} from '../types';
import { generateCustomGeminiText } from '../services/geminiService';
import {
  Briefcase,
  DollarSign,
  Calculator,
  Mail,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  FileText,
  Send,
  Building,
} from 'lucide-react';

interface PaidCollaborationViewProps {
  profile: InstagramProfile;
  initialDeals: BrandCollaborationDeal[];
  rateCard: RateCardEstimation;
}

export const PaidCollaborationView: React.FC<PaidCollaborationViewProps> = ({
  profile,
  initialDeals,
  rateCard,
}) => {
  const [deals, setDeals] = useState<BrandCollaborationDeal[]>(initialDeals);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'calculator' | 'pitch_generator'>('pipeline');

  // Calculator dynamic state
  const [customViews, setCustomViews] = useState<number>(35000);
  const [customEngagement, setCustomEngagement] = useState<number>(6.5);
  const [commercialUsage, setCommercialUsage] = useState<boolean>(false);

  // Pitch generator state
  const [targetBrand, setTargetBrand] = useState<string>('');
  const [brandNiche, setBrandNiche] = useState<string>('Tech & Productivity App');
  const [pitchAngle, setPitchAngle] = useState<'high_engagement' | 'audience_trust' | 'problem_solution'>('high_engagement');
  const [generatedPitch, setGeneratedPitch] = useState<string>('');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState<boolean>(false);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  // New Deal Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('1 Dedicated Reel + 2 Stories');
  const [newPrice, setNewPrice] = useState('25000');
  const [newContact, setNewContact] = useState('');

  // Total Pipeline Value
  const totalPipelineValue = deals.reduce((acc, d) => acc + d.offeredPrice, 0);
  const confirmedValue = deals
    .filter((d) => d.status === 'Confirmed' || d.status === 'Delivered' || d.status === 'Paid')
    .reduce((acc, d) => acc + d.offeredPrice, 0);

  // Calculated Rate Estimate
  const calculatedReelRate = Math.round(
    (customViews / 1000) * rateCard.marketAverageCPM * (1 + (customEngagement - 3) * 0.1) * (commercialUsage ? 1.4 : 1.0)
  );

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.trim()) return;

    const deal: BrandCollaborationDeal = {
      id: `collab_${Date.now()}`,
      brandName: newBrand,
      brandCategory: newCategory || 'Technology',
      deliverable: newDeliverable,
      offeredPrice: Number(newPrice) || 20000,
      currency: 'INR',
      status: 'Inquiry',
      contactPerson: newContact || 'Brand Manager',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: 'New partnership inquiry logged.',
    };

    setDeals([deal, ...deals]);
    setNewBrand('');
    setNewCategory('');
    setNewContact('');
    setIsAddModalOpen(false);
  };

  const handleUpdateStatus = (dealId: string, newStatus: BrandCollaborationDeal['status']) => {
    setDeals(
      deals.map((d) => (d.id === dealId ? { ...d, status: newStatus } : d))
    );
  };

  const handleGeneratePitch = async () => {
    if (!targetBrand.trim()) return;
    setIsGeneratingPitch(true);
    setCopiedPitch(false);

    const prompt = `You are a top creator agent representing @${profile.username} (Niche: ${profile.niche}, ${profile.followersCount.toLocaleString()} followers, average 35k-90k reel views, 72% non-follower reach, 6.8% engagement rate).
Write a professional, high-converting brand collaboration sponsorship pitch email and DM to the marketing team at "${targetBrand}" (Category: ${brandNiche}).
Angle: ${pitchAngle === 'high_engagement' ? 'Highlighting viral reach and high bookmark/share velocity' : pitchAngle === 'audience_trust' ? 'Emphasizing high purchase intent & creator authority' : 'Proposing a creative problem-solution reel demo'}.

Format:
1. Catchy Subject Line
2. 3-sentence hook showing familiarity with the brand
3. Specific Reel Deliverable idea
4. Quick Metric snapshot (Followers, Avg Views, Audience demography)
5. Polite Call to action (Asking for 10-min intro or media kit review)
Tone: Professional, direct, confident, respectful. Avoid fluff.`;

    try {
      const response = await generateCustomGeminiText(prompt);
      setGeneratedPitch(response);
    } catch {
      // Offline fallback pitch
      setGeneratedPitch(`SUBJECT: Collaboration Proposal: @${profile.username} x ${targetBrand} 🚀

Hi ${targetBrand} Marketing Team,

I have been following ${targetBrand}'s recent product updates and love how you empower users. I'm ${profile.name}, creator behind @${profile.username} (${profile.followersCount.toLocaleString()} engaged followers in ${profile.niche}).

Our reels consistently hit 35,000–89,000+ targeted views with an exceptional 72% non-follower discovery rate and a 6.8% organic engagement rate (well above the 2.5% industry standard).

I would love to pitch a dedicated high-retention 45-second Reel integrating ${targetBrand} seamlessly into our weekly productivity breakdown, complete with an exclusive discount CTA and story links.

Audience Snapshot:
• Core Age: 18–34 Tech Enthusiasts & Professionals
• Top Location: Tier 1 Metros & Digital Hubs
• Avg Saves per Video: 2,400+

Are you open to reviewing our complete 2026 Media Kit and rate card this week?

Warm regards,
${profile.name}
@${profile.username} | ${profile.externalUrl || 'Instagram: @' + profile.username}`);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">Paid Collaboration & Sponsorships</h2>
          </div>
          <p className="text-xs text-gray-400">
            Manage brand partnerships, calculate your market rate card, and generate high-converting sponsorship pitches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Brand Deal</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Active Deals
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            {deals.length}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Pipeline deals active</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Total Pipeline Value
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            ₹{totalPipelineValue.toLocaleString()}
          </div>
          <span className="text-[11px] text-gray-400 font-medium">Potential earnings</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Confirmed / Paid
          </span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            ₹{confirmedValue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Secured brand revenue</span>
        </div>

        <div className="p-4 rounded-xl bg-[#131522] border border-[#22273D]">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
            Suggested Reel Rate
          </span>
          <div className="text-2xl font-extrabold text-pink-400 font-mono">
            ₹{rateCard.reelRateMin.toLocaleString()} - ₹{rateCard.reelRateMax.toLocaleString()}
          </div>
          <span className="text-[11px] text-pink-400 font-medium">Based on 6.8% engagement</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#23273D] gap-2">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition cursor-pointer ${
            activeTab === 'pipeline'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Brand Deal Pipeline ({deals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition cursor-pointer ${
            activeTab === 'calculator'
              ? 'border-pink-500 text-pink-400'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Sponsorship Rate Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('pitch_generator')}
          className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition cursor-pointer ${
            activeTab === 'pitch_generator'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Brand Pitch Writer</span>
        </button>
      </div>

      {/* View 1: Deal Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {deals.map((deal) => {
              const statusColors: Record<string, string> = {
                Inquiry: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
                'Pitch Sent': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                Negotiating: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                Confirmed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                Delivered: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                Paid: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
              };

              return (
                <div
                  key={deal.id}
                  className="p-4 rounded-xl bg-[#131522] border border-[#22273D] hover:border-[#2C324E] transition space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1A1D2D] border border-[#282C44] flex items-center justify-center font-bold text-white text-sm">
                        {deal.brandName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{deal.brandName}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#1B1E30] text-gray-300 border border-[#272B44]">
                            {deal.brandCategory}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Contact: {deal.contactPerson} • Due: {deal.dueDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <div className="text-right">
                        <div className="font-mono font-bold text-emerald-400 text-sm">
                          ₹{deal.offeredPrice.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-gray-400">{deal.deliverable}</div>
                      </div>

                      <select
                        value={deal.status}
                        onChange={(e) => handleUpdateStatus(deal.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none bg-[#171A29] cursor-pointer ${
                          statusColors[deal.status] || ''
                        }`}
                      >
                        <option value="Inquiry">Inquiry</option>
                        <option value="Pitch Sent">Pitch Sent</option>
                        <option value="Negotiating">Negotiating</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  {deal.notes && (
                    <div className="p-2.5 rounded-lg bg-[#181B2B] text-[11px] text-gray-300 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span>{deal.notes}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Rate Card Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#131522] border border-[#23273D] space-y-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-pink-400" />
                Custom Rate Card Calculator
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Calculate equitable pricing based on your real views, engagement benchmark, and usage rights.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Average 30-Day Reel Views</span>
                  <span className="text-pink-400 font-mono font-bold">{customViews.toLocaleString()} views</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={customViews}
                  onChange={(e) => setCustomViews(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Organic Engagement Rate</span>
                  <span className="text-emerald-400 font-mono font-bold">{customEngagement}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={customEngagement}
                  onChange={(e) => setCustomEngagement(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#171A29] border border-[#262A42]">
                <div>
                  <span className="text-xs font-bold text-white block">Commercial Ad Whitelisting / 30-day Ads Usage</span>
                  <span className="text-[11px] text-gray-400">Allows brand to run your Reel as Meta Spark Ads (+40% fee)</span>
                </div>
                <input
                  type="checkbox"
                  checked={commercialUsage}
                  onChange={(e) => setCommercialUsage(e.target.checked)}
                  className="w-4 h-4 accent-pink-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Breakdown */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Recommended Price</span>
                  <h4 className="text-2xl font-extrabold text-white font-mono mt-0.5">
                    ₹{calculatedReelRate.toLocaleString()} <span className="text-xs text-gray-400 font-normal">/ Dedicated Reel</span>
                  </h4>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold self-start">
                  High Creator Authority Tier
                </span>
              </div>
            </div>
          </div>

          {/* Standard Deliverables Grid */}
          <div className="p-6 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Standard Rate Card
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#171A29] flex justify-between items-center">
                <span className="text-gray-300">1 Dedicated Reel (60s)</span>
                <span className="font-mono font-bold text-white">₹{rateCard.reelRateMin.toLocaleString()} - ₹{rateCard.reelRateMax.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#171A29] flex justify-between items-center">
                <span className="text-gray-300">1 Story Frame (Link sticker)</span>
                <span className="font-mono font-bold text-white">₹{rateCard.storyRateMin.toLocaleString()} - ₹{rateCard.storyRateMax.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#171A29] flex justify-between items-center">
                <span className="text-gray-300">1 Educational Carousel</span>
                <span className="font-mono font-bold text-white">₹{rateCard.carouselRateMin.toLocaleString()} - ₹{rateCard.carouselRateMax.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#171A29] flex justify-between items-center border border-pink-500/30">
                <div>
                  <span className="text-pink-300 font-semibold block">Power Combo Package</span>
                  <span className="text-[10px] text-gray-400">1 Reel + 2 Stories + Bio Link</span>
                </div>
                <span className="font-mono font-bold text-pink-400">₹{rateCard.comboRateMin.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 3: AI Brand Pitch Generator */}
      {activeTab === 'pitch_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                AI Brand Pitch & Outreach Writer
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Instantly generate tailored, data-backed pitch emails and DMs using Gemini AI.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Target Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Notion, Figma, Logitech, Boat, Spotify"
                  value={targetBrand}
                  onChange={(e) => setTargetBrand(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Brand Product / Industry</label>
                <input
                  type="text"
                  placeholder="e.g. AI Coding Tool, Wireless Earbuds, Finance App"
                  value={brandNiche}
                  onChange={(e) => setBrandNiche(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Pitch Strategic Angle</label>
                <select
                  value={pitchAngle}
                  onChange={(e) => setPitchAngle(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-xs text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="high_engagement">Viral Reach & 72% Non-Follower Discovery</option>
                  <option value="audience_trust">High-Trust Niche Authority & Bookmarks</option>
                  <option value="problem_solution">Creative Problem vs Solution Reel Workflow</option>
                </select>
              </div>

              <button
                onClick={handleGeneratePitch}
                disabled={isGeneratingPitch || !targetBrand.trim()}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPitch ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Crafting High-Converting Pitch...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Sponsorship Pitch</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Pitch Preview */}
          <div className="p-6 rounded-2xl bg-[#131522] border border-[#23273D] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-pink-400" />
                  Ready-to-Send Pitch
                </h4>
                {generatedPitch && (
                  <button
                    onClick={() => copyToClipboard(generatedPitch)}
                    className="px-3 py-1.5 rounded-lg bg-[#181B2B] hover:bg-[#23273D] border border-[#2B304C] text-xs font-semibold text-gray-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedPitch ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email & DM</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {generatedPitch ? (
                <div className="p-4 rounded-xl bg-[#171A29] border border-[#252A42] text-xs text-gray-200 whitespace-pre-wrap leading-relaxed font-sans max-h-96 overflow-y-auto">
                  {generatedPitch}
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-[#171A29]/50 border border-dashed border-[#282D46] text-center text-xs text-gray-400 space-y-2">
                  <Sparkles className="w-6 h-6 text-purple-400/60 mx-auto" />
                  <p>Enter a brand name on the left and click generate to craft your customized pitch.</p>
                </div>
              )}
            </div>

            <div className="text-[11px] text-gray-400 bg-[#161826] p-3 rounded-xl border border-[#23273C]">
              💡 <strong>Pro Tip:</strong> Brands love when you suggest the specific Reel Hook in the first 2 sentences. It shows you understand their product rather than sending a generic copy-paste template.
            </div>
          </div>
        </div>
      )}

      {/* Add Deal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121420] rounded-2xl border border-[#262B44] max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add New Sponsorship Deal</h3>
            <form onSubmit={handleCreateDeal} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adobe, Notion, Sony"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Industry / Category</label>
                <input
                  type="text"
                  placeholder="e.g. Productivity Software, Creator Gear"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Deliverables</label>
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Offered Price (₹ INR)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold block mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Agency Manager"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171A29] border border-[#262B42] text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-400 hover:text-white bg-[#181B2B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 cursor-pointer"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
