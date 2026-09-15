import React, { useState, useEffect } from 'react';
import { NavTab, InstagramProfile } from './types';
import {
  DEMO_PROFILE,
  DEMO_GROWTH_SCORES,
  DEMO_REELS,
  DEMO_REACH_DATA,
  DEMO_PROFILE_AUDIT,
  DEMO_RECOMMENDATIONS,
  DEMO_POSTING_TIME,
  DEMO_GROWTH_PLAN,
  DEMO_WEEKLY_REPORT,
  DEMO_COLLABORATIONS,
  DEMO_RATE_CARD,
  DEMO_AUTO_DM_RULES,
  DEMO_AUTO_DM_LOGS,
} from './data/mockData';
import { getMetaConfig, disconnectInstagram } from './services/metaApiService';
import { getSavedProfile, saveActiveProfile, clearActiveProfile } from './services/profileStorage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { ConnectModal } from './components/ConnectModal';
import { InstallAppModal } from './components/InstallAppModal';
import { DashboardView } from './components/DashboardView';
import { ProfileAnalysisView } from './components/ProfileAnalysisView';
import { ReelAnalyzerView } from './components/ReelAnalyzerView';
import { ReachAnalysisView } from './components/ReachAnalysisView';
import { GrowthRecommendationsView } from './components/GrowthRecommendationsView';
import { PaidCollaborationView } from './components/PaidCollaborationView';
import { AutoDmView } from './components/AutoDmView';
import { HookGeneratorView } from './components/HookGeneratorView';
import { CaptionGeneratorView } from './components/CaptionGeneratorView';
import { ShayariGeneratorView } from './components/ShayariGeneratorView';
import { ReelIdeasView } from './components/ReelIdeasView';
import { BestPostingTimeView } from './components/BestPostingTimeView';
import { GrowthPlanView } from './components/GrowthPlanView';
import { WeeklyReportView } from './components/WeeklyReportView';
import { SettingsView } from './components/SettingsView';

export const App: React.FC = () => {
  const metaConfig = getMetaConfig();
  
  // Persistent Profile initialization - Never resets on page refresh!
  const [profile, setProfile] = useState<InstagramProfile>(() => {
    const saved = getSavedProfile();
    return saved || DEMO_PROFILE;
  });
  
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    const saved = getSavedProfile();
    return saved.isDemo ?? (metaConfig.isDemoMode ?? true);
  });

  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Active dataset
  const [scores] = useState(DEMO_GROWTH_SCORES);
  const [reels] = useState(DEMO_REELS);
  const [reachData] = useState(DEMO_REACH_DATA);
  const [profileAudit] = useState(DEMO_PROFILE_AUDIT);
  const [recommendations] = useState(DEMO_RECOMMENDATIONS);
  const [collaborations] = useState(DEMO_COLLABORATIONS);
  const [rateCard] = useState(DEMO_RATE_CARD);
  const [autoDmRules] = useState(DEMO_AUTO_DM_RULES);
  const [autoDmLogs] = useState(DEMO_AUTO_DM_LOGS);
  const [postingTime] = useState(DEMO_POSTING_TIME);
  const [growthPlan] = useState(DEMO_GROWTH_PLAN);
  const [weeklyReport] = useState(DEMO_WEEKLY_REPORT);

  const handleConnected = (newProfile: InstagramProfile) => {
    setProfile(newProfile);
    setIsDemoMode(false);
    saveActiveProfile(newProfile);
  };

  const handleUseDemo = () => {
    clearActiveProfile();
    disconnectInstagram();
    setProfile(DEMO_PROFILE);
    setIsDemoMode(true);
    setIsConnectModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0B10] text-gray-100 flex flex-col font-sans overflow-x-hidden w-full max-w-full selection:bg-pink-500/30 selection:text-pink-200">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setMobileMenuOpen(false);
        }}
        profile={profile}
        isDemoMode={isDemoMode}
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
        onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto overflow-x-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block flex-shrink-0">
          <Sidebar
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            isDemoMode={isDemoMode}
            onOpenConnectModal={() => setIsConnectModalOpen(true)}
          />
        </div>

        {/* Mobile Flyout Drawer Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 md:hidden pt-16 px-3 pb-24 overflow-y-auto">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-[#1E2235] text-xs text-gray-300 font-semibold"
              >
                Close Menu ✕
              </button>
            </div>
            <Sidebar
              currentTab={currentTab}
              onTabChange={(tab) => {
                setCurrentTab(tab);
                setMobileMenuOpen(false);
              }}
              isDemoMode={isDemoMode}
              onOpenConnectModal={() => {
                setIsConnectModalOpen(true);
                setMobileMenuOpen(false);
              }}
            />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 w-full min-w-0 p-3 sm:p-5 lg:p-8 pb-24 md:pb-8 overflow-x-hidden">
          {currentTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              scores={scores}
              reels={reels}
              reachData={reachData}
              recommendations={recommendations}
              isDemoMode={isDemoMode}
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
              onNavigate={(tab) => setCurrentTab(tab as NavTab)}
            />
          )}

          {currentTab === 'landing' && (
            <LandingPage onGetStarted={() => setCurrentTab('dashboard')} />
          )}

          {currentTab === 'profile-analysis' && (
            <ProfileAnalysisView
              profile={profile}
              audit={profileAudit}
              isDemoMode={isDemoMode}
            />
          )}

          {currentTab === 'reel-analyzer' && (
            <ReelAnalyzerView
              reels={reels}
              isDemoMode={isDemoMode}
            />
          )}

          {currentTab === 'reach-analysis' && (
            <ReachAnalysisView
              reachData={reachData}
              profile={profile}
              isDemoMode={isDemoMode}
            />
          )}

          {currentTab === 'recommendations' && (
            <GrowthRecommendationsView
              recommendations={recommendations}
              niche={profile.niche}
            />
          )}

          {currentTab === 'hook-generator' && (
            <HookGeneratorView initialNiche={profile.niche} />
          )}

          {currentTab === 'caption-generator' && (
            <CaptionGeneratorView initialNiche={profile.niche} />
          )}

          {currentTab === 'shayari-generator' && (
            <ShayariGeneratorView />
          )}

          {currentTab === 'reel-ideas' && (
            <ReelIdeasView
              niche={profile.niche}
              profile={profile}
            />
          )}

          {currentTab === 'posting-time' && (
            <BestPostingTimeView postingData={postingTime} />
          )}

          {currentTab === 'growth-plan' && (
            <GrowthPlanView plan={growthPlan} />
          )}

          {currentTab === 'weekly-report' && (
            <WeeklyReportView
              report={weeklyReport}
              profile={profile}
            />
          )}

          {currentTab === 'collaborations' && (
            <PaidCollaborationView
              collaborations={collaborations}
              rateCard={rateCard}
              profile={profile}
            />
          )}

          {currentTab === 'auto-dm' && (
            <AutoDmView
              rules={autoDmRules}
              logs={autoDmLogs}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              profile={profile}
              isDemoMode={isDemoMode}
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
              onResetDemo={handleUseDemo}
            />
          )}
        </main>
      </div>

      {/* Modern Native Bottom Navigation Bar for Mobile */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMenu={() => setMobileMenuOpen(true)}
      />

      {/* Modals */}
      <ConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnected={handleConnected}
        onUseDemo={handleUseDemo}
      />

      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
};
