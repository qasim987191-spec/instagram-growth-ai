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
  const [appId, setAppId] = useState(currentConfig.appId || '');
  const [accessToken, setAccessToken] = useState(currentConfig.accessToken || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [showAdvancedToken, setShowAdvancedToken] = useState(false);

  if (!isOpen) return null;

  const handleVerifyAndConnect = async () => {
    if (!accessToken.trim()) {
      setVerificationError('Please provide a Meta User Access Token, or use Demo Mode.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#12141F] border border-[#272C42] shadow-2xl p-6 text-gray-200">
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
            <p className="text-xs text-gray-400">Official Meta Graph API Authorization</p>
          </div>
        </div>

        {/* Security Pledge */}
        <div className="p-3.5 mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-emerald-200">Privacy & Security Guarantee</p>
            <p className="text-[11px] text-emerald-300/80 leading-relaxed">
              We never ask for your Instagram password or scrape your account. Data is accessed strictly via authorized Meta permissions.
            </p>
          </div>
        </div>

        {/* Required Meta Permissions */}
        <div className="mb-5 space-y-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
            Required Official Permissions
          </label>
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
        </div>

        {/* Token input or fallback */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-300">
              Meta Graph User Access Token
            </label>
            <button
              type="button"
              onClick={() => setShowAdvancedToken(!showAdvancedToken)}
              className="text-[11px] text-pink-400 hover:underline cursor-pointer"
            >
              {showAdvancedToken ? 'Hide Details' : 'What is this?'}
            </button>
          </div>

          {showAdvancedToken && (
            <div className="p-3 rounded-lg bg-[#181B2B] text-[11px] text-gray-300 leading-relaxed border border-[#2A2F49]">
              To connect a live account, Meta requires an App registered at developers.facebook.com with Instagram Graph API permissions. You can generate a User Access Token in the Meta Graph API Explorer.
            </div>
          )}

          <div className="relative">
            <input
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="EAAB... (Paste Meta User Access Token)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#161826] border border-[#2C314C] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 font-mono"
            />
          </div>

          {verificationError && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{verificationError}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleVerifyAndConnect}
            disabled={isVerifying}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white ig-gradient-bg hover:opacity-95 shadow-md shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isVerifying ? (
              <span>Verifying with Meta...</span>
            ) : (
              <>
                <InstagramIcon className="w-4 h-4" />
                <span>Authorize & Connect Account</span>
              </>
            )}
          </button>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-[#25293E] w-full" />
            <span className="bg-[#12141F] px-3 text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
              Or Instant Testing
            </span>
          </div>

          <button
            onClick={() => {
              onUseDemo();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Launch Realistic Demo Mode (Pre-loaded Creator Data)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
