import React from 'react';
import { NavTab, InstagramProfile } from '../types';
import { Key, Menu, X } from 'lucide-react';
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
  onOpenConnectModal,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#222538] bg-[#0E1017]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onTabChange('dashboard')}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl ig-gradient-bg flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
              <InstagramIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1">
                Instagram Growth <span className="ig-gradient-text font-extrabold">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] text-gray-400 font-medium tracking-wide">
                Account & Content Strategist • <span className="text-pink-400 font-semibold">Dev: Mohd Kasim</span>
              </span>
            </div>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Creator Pill */}
          <button
            onClick={onOpenConnectModal}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#181A26] hover:bg-[#202334] border border-[#2A2E44] text-xs transition cursor-pointer"
            title="Click to Connect Your Instagram Account"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-pink-500/50"
            />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-gray-200 text-[11px] sm:text-xs leading-none">
                @{profile.username}
              </span>
              <span className="text-[9px] sm:text-[10px] text-pink-400 font-medium leading-none mt-0.5">
                {profile.isDemo ? 'Tap to Connect' : 'Active Account'}
              </span>
            </div>
          </button>

          {/* Connect / Change Account Button */}
          <button
            onClick={onOpenConnectModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white ig-gradient-bg hover:opacity-90 shadow-md shadow-pink-500/25 transition cursor-pointer"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Connect IG</span>
          </button>

          {/* Settings shortcut */}
          <button
            onClick={() => onTabChange('settings')}
            className={`p-2 rounded-lg border transition cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
                : 'text-gray-400 hover:text-gray-200 bg-[#161824] border-[#262A3F]'
            }`}
            title="API & Settings"
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
