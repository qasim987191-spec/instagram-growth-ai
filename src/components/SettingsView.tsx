import React, { useState } from 'react';
import { InstagramProfile, MetaConnectionConfig } from '../types';
import {
  getMetaConfig,
  saveMetaConfig,
  disconnectInstagram,
  REQUIRED_META_PERMISSIONS,
} from '../services/metaApiService';
import {
  getGeminiApiKey,
  setGeminiApiKey,
} from '../services/geminiService';
import {
  Settings,
  Key,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface SettingsViewProps {
  profile: InstagramProfile;
  isDemoMode: boolean;
  onProfileUpdated: (profile: InstagramProfile) => void;
  onOpenConnectModal: () => void;
  onSwitchToDemo: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  isDemoMode,
  onProfileUpdated,
  onOpenConnectModal,
  onSwitchToDemo,
}) => {
  const [metaConfig, setMetaConfig] = useState<MetaConnectionConfig>(getMetaConfig());
  const [geminiKeyInput, setGeminiKeyInput] = useState(getGeminiApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveGeminiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(geminiKeyInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect your Instagram connection? This will revert to Demo Mode.')) {
      disconnectInstagram();
      onSwitchToDemo();
      setMetaConfig(getMetaConfig());
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
            <Settings className="w-4 h-4" />
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">Settings & API Configuration</h2>
        </div>
        <p className="text-xs text-gray-400">
          Manage your Meta Graph API credentials, Gemini AI reasoning engine keys, and data privacy permissions.
        </p>
      </div>

      {/* Account Status Card */}
      <div className="p-6 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-pink-500/50"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">@{profile.username}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    isDemoMode
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {isDemoMode ? 'Demo Mode Active' : 'Live Connected Account'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{profile.name} • {profile.niche}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isDemoMode ? (
              <button
                onClick={onOpenConnectModal}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition cursor-pointer"
              >
                Connect Real Account
              </button>
            ) : (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            )}
          </div>
        </div>

        {isDemoMode && (
          <div className="p-3.5 rounded-xl bg-[#181B2B] border border-[#272B44] text-xs text-gray-300 leading-relaxed flex items-center justify-between">
            <span>
              Currently displaying demo metrics for testing all AI generators, analyzers, and growth planning modules.
            </span>
          </div>
        )}
      </div>

      {/* Gemini AI Key Override */}
      <div className="p-6 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Google Gemini API Key</h3>
            <p className="text-xs text-gray-400">
              Uses Google Gemini (<code>gemini-3.5-flash</code>) for real-time strategic reasoning, hooks, captions, and shayari.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveGeminiKey} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              API Key (Optional Override)
            </label>
            <input
              type="password"
              value={geminiKeyInput}
              onChange={(e) => setGeminiKeyInput(e.target.value)}
              placeholder="AIzaSy... (Leave empty to use project environment default)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171A29] border border-[#2A2F47] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400">
              {geminiKeyInput ? 'Custom key configured' : 'Using preconfigured project key or intelligent offline fallback algorithms.'}
            </span>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1F2338] hover:bg-[#2A2F4D] border border-[#33385B] transition cursor-pointer flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Saved</span>
                </>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5" />
                  <span>Update Key</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* App Ownership & Developer Profile */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171929] via-[#141624] to-[#171929] border border-pink-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            App Ownership & Developer License
          </h3>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono font-bold uppercase tracking-wider border border-pink-500/30">
            Official Owner
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F111B] border border-[#23273E]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl ig-gradient-bg flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-pink-500/25 flex-shrink-0">
              MK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-white text-base">Mohd Kasim</h4>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-pink-400 font-semibold">Owner & Lead Full-Stack Architect</p>
              <p className="text-[11px] text-gray-400 font-mono mt-0.5">qasim987191@gmail.com</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto text-[11px] text-gray-400 gap-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1F2338]">
            <span className="text-gray-400">Application Status</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Proprietary License Active
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          This system is exclusively registered to and engineered by <strong className="text-gray-200">Mohd Kasim</strong>. 
          All intellectual rights, Meta Graph API integration logic, growth algorithms, rate-card calculators, and automation agents are maintained under this profile.
        </p>
      </div>

      {/* Meta API Permissions Overview */}
      <div className="p-6 rounded-2xl bg-[#131522] border border-[#23273D] space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Official Meta API Permissions
        </h3>
        <p className="text-xs text-gray-400">
          The application strictly interfaces through official Meta Graph API endpoints. We never scrape or store passwords.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {REQUIRED_META_PERMISSIONS.map((perm) => (
            <div
              key={perm.name}
              className="p-3 rounded-xl bg-[#171A29] border border-[#242940] space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-pink-400 font-semibold">{perm.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                  {perm.required ? 'Required' : 'Optional'}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">{perm.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
