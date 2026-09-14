import React from 'react';
import { NavTab } from '../types';
import {
  LayoutDashboard,
  Sparkles,
  Video,
  BarChart3,
  Lightbulb,
  DollarSign,
  Layers,
  Settings,
} from 'lucide-react';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenConnect: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenConnect,
}) => {
  const primaryTabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'reels', label: 'Reels AI', icon: Video },
    { id: 'profile-analysis', label: 'Audit', icon: Sparkles },
    { id: 'reach', label: 'Reach', icon: BarChart3 },
    { id: 'collaborations', label: 'Earn', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1018]/95 backdrop-blur-lg border-t border-[#22273D] px-2 py-1.5 flex items-center justify-around safe-bottom">
      {primaryTabs.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition cursor-pointer min-w-[50px] ${
              isActive
                ? 'text-pink-400 font-bold'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition ${isActive ? 'bg-pink-500/15' : ''}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
