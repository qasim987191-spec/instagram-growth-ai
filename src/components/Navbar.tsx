import React from 'react';
import { NavTab, InstagramProfile } from '../types';
import { Sparkles, ShieldAlert, Key, Menu, X, ArrowRight, Download } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  profile: InstagramProfile;
  isDemoMode: boolean;
  onOpenConnectModal: () => void;
  onToggleDemoMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenInstallModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  profile,
  isDemoMode,
  onOpenConnectModal,
  onToggleDemoMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenInstallModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#222538] bg-[#0E1017]/90 backdrop-blur-md">
      {/* Top Demo Banner if in demo mode */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border-b border-amber-500/30 px-4 py-1.5 text-center text-xs font-semibold text-amber-300 flex items-center justify-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
          <span>DEMO DATA — NOT YOUR REAL INSTAGRAM ACCOUNT</span>
          <span className="hidden md:inline text-amber-400/60">•</span>
          <button
            onClick={onOpenConnectModal}
            className="underline hover:text-white transition-colors cursor-pointer ml-1 inline-flex items-center gap-1"
          >
            Connect Real Account <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl ig-gradient-bg flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
              <InstagramIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                Instagram Growth <span className="ig-gradient-text font-extrabold">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] text-gray-400 font-medium tracking-wide">
                Account & Content Strategist • <span className="text-pink-400 font-semibold">Dev: Mohd Kasim</span>
              </span>
            </div>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Active Creator Pill */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#181A26] border border-[#2A2E44] text-xs">
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-pink-500/50"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-200 leading-none">@{profile.username}</span>
              <span className="text-[10px] text-gray-400 leading-none mt-0.5">
                {profile.isDemo ? 'Demo Mode' : 'Connected'}
              </span>
            </div>
          </div>

          {/* Connect / Mode Switch */}
          {isDemoMode ? (
            <button
              onClick={onOpenConnectModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white ig-gradient-bg hover:opacity-90 shadow-md shadow-pink-500/25 transition cursor-pointer"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              Connect Instagram
            </button>
          ) : (
            <button
              onClick={onToggleDemoMode}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-[#1A1C29] hover:bg-[#25283D] border border-[#2E334D] transition cursor-pointer"
            >
              Switch to Demo
            </button>
          )}

          {/* Download & Install App */}
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-pink-300 bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 transition cursor-pointer"
              title="Download & Install Application"
            >
              <Download className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden md:inline">Download App</span>
            </button>
          )}

          {/* Settings shortcut */}
          <button
            onClick={() => onTabChange('settings')}
            className={`p-2 rounded-lg border transition cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
                : 'text-gray-400 hover:text-gray-200 bg-[#161824] border-[#262A3F]'
            }`}
            title="API & Account Settings"
          >
            <Key className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white bg-[#161824] border border-[#262A3F]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
