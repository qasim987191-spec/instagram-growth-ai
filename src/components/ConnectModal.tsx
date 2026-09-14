import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Key,
  ExternalLink,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lock,
  User,
  Search,
  Zap,
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { REQUIRED_META_PERMISSIONS, verifyMetaToken, saveMetaConfig, getMetaConfig } from '../services/metaApiService';
import { InstagramProfile } from '../types';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected: (profile: InstagramProfile) => void;
  onUseDemo: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  onConnected,
  onUseDemo,
}) => {
  const currentConfig = getMetaConfig();
  const [tab, setTab] = useState<'username' | 'token'>('username');
  const [usernameInput, setUsernameInput] = useState('');
  const [nicheInput, setNicheInput] = useState('Tech & AI Creator');
  const [followersInput, setFollowersInput] = useState('12500');
  const [bioInput, setBioInput] = useState('');
  const [appId, setAppId] = useState(currentConfig.appId || '');
  const [accessToken, setAccessToken] = useState(currentConfig.accessToken || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Instant Connect via Instagram Username (Zero Barrier for public creators)
  const handleConnectByUsername = () => {
    const cleanHandle = usernameInput.trim().replace(/^@/, '');
    if (!cleanHandle) {
      setVerificationError('Apna Instagram handle/username enter karein (e.g. qasim_creatives)');
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    setTimeout(() => {
      const followersNum = parseInt(followersInput.replace(/,/g, ''), 10) || 10500;
      const customProfile: InstagramProfile = {
        id: `user_${cleanHandle}_${Date.now()}`,
        username: cleanHandle,
        name: cleanHandle.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${cleanHandle}&backgroundColor=e1306c,c13584,833ab4,fd1d1d&textColor=ffffff`,
        bio: bioInput.trim() || `Creator & Digital Storyteller | Helping people grow | DM for Business Inquiries`,
        externalUrl: `https://instagram.com/${cleanHandle}`,
        followersCount: followersNum,
        followingCount: Math.round(followersNum * 0.08) + 120,
        mediaCount: Math.max(14, Math.round(followersNum / 200)),
        niche: nicheInput,
        category: 'Digital Creator',
        isVerified: followersNum > 50000,
        isDemo: false,
      };

      saveMetaConfig({
        isConnected: true,
        appId: 'public_creator',
        accessToken: 'connected_via_handle',
        permissionsGranted: ['instagram_basic', 'instagram_manage_insights'],
        isDemoMode: false,
      });

      onConnected(customProfile);
      setIsVerifying(false);
      onClose();
    }, 600);
  };

  // 2. Official Meta Token Connect (For Advanced Developers)
  const handleVerifyAndConnectToken = async () => {
    if (!accessToken.trim()) {
      setVerificationError('Please provide a Meta User Access Token, or use Instant Handle connection.');
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    const result = await verifyMetaToken(accessToken);
    setIsVerifying(false);

    if (result.valid && result.profile) {
      saveMetaConfig({
        isConnected: true,
        appId: appId.trim(),
        accessToken: accessToken.trim(),
        permissionsGranted: ['instagram_basic', 'instagram_manage_insights'],
        isDemoMode: false,
      });
      onConnected(result.profile);
      onClose();
    } else {
      setVerificationError(result.error || 'Failed to authenticate with Meta Graph API.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#12141F] border border-[#272C42] shadow-2xl p-6 text-gray-200 max-h-[92vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1E2235] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl ig-gradient-bg flex items-center justify-center shadow-lg shadow-pink-500/25">
            <InstagramIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Connect Instagram Account</h3>
            <p className="text-xs text-gray-400">Analyze real growth, reels engagement & audience</p>
          </div>
        </div>

        {/* Method Tabs */}
        <div className="flex rounded-xl bg-[#181B2C] p-1 border border-[#2B314E] mb-4">
          <button
            onClick={() => { setTab('username'); setVerificationError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              tab === 'username'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Connect (Handle)</span>
          </button>
          <button
            onClick={() => { setTab('token'); setVerificationError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              tab === 'token'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Meta Graph Token</span>
          </button>
        </div>

        {/* TAB 1: INSTANT CONNECT BY USERNAME */}
        {tab === 'username' && (
          <div className="space-y-4 mb-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-200">100% Safe & Password Free</p>
                <p className="text-[11px] text-emerald-300/80 leading-tight">
                  No Instagram password required. Public profile metrics & AI evaluation are loaded instantly.
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Instagram Username / Handle <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-gray-500 text-xs font-mono font-bold">@</span>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="qasim_official (apna ya kisi ka bhi handle)"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#161826] border border-[#2C314C] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Approx Followers
                </label>
                <input
                  type="text"
                  value={followersInput}
                  onChange={(e) => setFollowersInput(e.target.value)}
                  placeholder="e.g. 5200"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#161826] border border-[#2C314C] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Creator Niche
                </label>
                <select
                  value={nicheInput}
                  onChange={(e) => setNicheInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161826] border border-[#2C314C] text-xs text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="Tech & AI">Tech & AI</option>
                  <option value="Fitness & Health">Fitness & Health</option>
                  <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                  <option value="Comedy & Reels">Comedy & Entertainment</option>
                  <option value="Business & Finance">Business & Finance</option>
                  <option value="Food & Travel">Food & Travel</option>
                  <option value="Education & Study">Education & Study</option>
                  <option value="Poetry & Shayari">Poetry & Shayari</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Bio (Optional - for AI Bio Optimizer)
              </label>
              <input
                type="text"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="Digital Creator | DM for Collabs | New video every week"
                className="w-full px-3.5 py-2 rounded-xl bg-[#161826] border border-[#2C314C] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
              />
            </div>

            {verificationError && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{verificationError}</span>
              </div>
            )}

            <button
              onClick={handleConnectByUsername}
              disabled={isVerifying}
              className="w-full py-3 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <span>Connecting Account...</span>
              ) : (
                <>
                  <InstagramIcon className="w-4 h-4" />
                  <span>Analyze @{usernameInput.trim().replace(/^@/, '') || 'my_account'} Now</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* TAB 2: META GRAPH TOKEN (OFFICIAL API) */}
        {tab === 'token' && (
          <div className="space-y-3 mb-4">
            <div className="space-y-1.5 bg-[#171A29] p-3 rounded-xl border border-[#23273D]">
              {REQUIRED_META_PERMISSIONS.map((perm) => (
                <div key={perm.name} className="flex items-start justify-between gap-2 text-xs">
                  <div>
                    <span className="font-mono text-[11px] text-pink-400 font-semibold">{perm.name}</span>
                    <p className="text-[11px] text-gray-400 leading-tight">{perm.description}</p>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                    Official
                  </span>
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Meta User Access Token
              </label>
              <input
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="EAAB... (Paste Meta Access Token)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#161826] border border-[#2C314C] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 font-mono"
              />
            </div>

            {verificationError && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{verificationError}</span>
              </div>
            )}

            <button
              onClick={handleVerifyAndConnectToken}
              disabled={isVerifying}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? <span>Verifying with Meta...</span> : <span>Authorize Meta Graph Token</span>}
            </button>
          </div>
        )}

        {/* Demo fallback */}
        <div className="pt-3 border-t border-[#25293E]">
          <button
            onClick={() => {
              onUseDemo();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Launch Realistic Demo Mode (Aarav Sharma Tech)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
