import React from 'react';
import { NavTab } from '../types';
import {
  LayoutDashboard,
  UserCheck,
  Film,
  TrendingUp,
  Zap,
  Flame,
  FileText,
  Sparkles,
  Lightbulb,
  Clock,
  Calendar,
  BarChart3,
  Settings,
  Briefcase,
  Bot,
  Download,
} from 'lucide-react';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  closeMobileMenu?: () => void;
  onOpenInstallModal?: () => void;
}

interface NavItemConfig {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile-analysis', label: 'Profile Analysis', icon: UserCheck },
  { id: 'reels', label: 'Reel Analyzer', icon: Film, badge: 'Insights' },
  { id: 'reach', label: 'Reach Analysis', icon: TrendingUp },
  { id: 'recommendations', label: 'Next Best Actions', icon: Zap, badge: 'AI' },
  { id: 'collaborations', label: 'Paid Collaborations', icon: Briefcase, badge: 'Earn' },
  { id: 'auto-dm', label: 'Auto DM & Replies', icon: Bot, badge: 'Auto' },
  { id: 'ideas', label: 'AI Reel Ideas', icon: Lightbulb, badge: '10 Ideas' },
  { id: 'hooks', label: 'Hook Generator', icon: Flame },
  { id: 'captions', label: 'Caption Generator', icon: FileText },
  { id: 'shayari', label: 'AI Shayari', icon: Sparkles, badge: 'New' },
  { id: 'posting-time', label: 'Best Posting Time', icon: Clock },
  { id: 'growth-plan', label: '7-Day Growth Plan', icon: Calendar },
  { id: 'reports', label: 'Weekly Report', icon: BarChart3 },
  { id: 'settings', label: 'Settings & Meta API', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, closeMobileMenu, onOpenInstallModal }) => {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between p-3 bg-[#0F111A] border-r border-[#222538] min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Core Analytics & AI
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (closeMobileMenu) closeMobileMenu();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white font-semibold border border-pink-500/40 shadow-sm shadow-pink-500/10'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-[#191C2B]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-pink-400' : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-pink-500 text-white'
                      : 'bg-[#22253A] text-pink-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* App Install Button & Footer disclaimer */}
      <div className="space-y-2.5 mt-4">
        {onOpenInstallModal && (
          <button
            onClick={onOpenInstallModal}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500/15 to-purple-500/15 hover:from-pink-500/25 hover:to-purple-500/25 border border-pink-500/30 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-pink-400" />
            <span>Install / Download App</span>
          </button>
        )}

        {/* Developer & Owner Badge */}
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-[#141624] border border-pink-500/20 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg ig-gradient-bg flex items-center justify-center font-bold text-white text-[11px] shadow-sm flex-shrink-0">
              MK
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-[11px] truncate flex items-center gap-1">
                Mohd Kasim
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" title="Verified Owner" />
              </p>
              <p className="text-[10px] text-pink-400 font-medium truncate">Owner & Lead Developer</p>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#141624] border border-[#23273D] text-[10px] text-gray-400 leading-relaxed">
          <p className="font-semibold text-gray-300 flex items-center gap-1 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Meta API Compliance
          </p>
          Official Meta OAuth 2.0. Zero password collection.
        </div>
      </div>
    </aside>
  );
};
