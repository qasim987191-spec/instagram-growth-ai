import React, { useState } from 'react';
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
import { getMetaConfig } from './services/metaApiService';
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
  const [profile, setProfile] = useState<InstagramProfile>(DEMO_PROFILE);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(metaConfig.isDemoMode ?? true);
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
    setCurrentTab('dashboard');
  };

  const handleUseDemo = () => {
    setProfile(DEMO_PROFILE);
    setIsDemoMode(true);
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0B10] text-gray-100 flex flex-col font-sans overflow-x-hidden selection:bg-pink-500/30 selection:text-pink-200">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        profile={profile}
        isDemoMode={isDemoMode}
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
        onToggleDemoMode={handleUseDemo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Layout: 100% full-width responsive without horizontal scroll */}
      <div className="flex-1 flex w-full mx-auto max-w-7xl">
        {/* Desktop Sidebar (Only visible on wide screens md+) */}
        {currentTab !== 'landing' && (
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
            />
          </div>
        )}

        {/* Mobile Fullscreen Slide-out Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 md:hidden pt-16 px-3 pb-24 overflow-y-auto animate-in fade-in">
            <div className="bg-[#12141F] rounded-2xl border border-[#23273D] p-3 shadow-2xl">
              <Sidebar
                currentTab={currentTab}
                onTabChange={(tab) => {
                  setCurrentTab(tab);
                  setMobileMenuOpen(false);
                }}
                closeMobileMenu={() => setMobileMenuOpen(false)}
                onOpenInstallModal={() => {
                  setMobileMenuOpen(false);
                  setIsInstallModalOpen(true);
                }}
              />
            </div>
          </div>
        )}

        {/* Main Content Area - Full width on mobile, comfortable padding */}
        <main className="flex-1 w-full min-w-0 p-3 sm:p-5 lg:p-8 pb-24 md:pb-8 overflow-x-hidden">
          {currentTab === 'landing' && (
            <LandingPage
              onConnectClick={() => setIsConnectModalOpen(true)}
              onTryDemoClick={handleUseDemo}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              scores={scores}
              reels={reels}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'profile-analysis' && (
            <ProfileAnalysisView
              profile={profile}
              audit={profileAudit}
            />
          )}

          {currentTab === 'reels' && (
            <ReelAnalyzerView reels={reels} />
          )}

          {currentTab === 'reach' && (
            <ReachAnalysisView reachData={reachData} />
          )}

          {currentTab === 'recommendations' && (
            <GrowthRecommendationsView initialRecommendations={recommendations} />
          )}

          {currentTab === 'collaborations' && (
            <PaidCollaborationView
              profile={profile}
              initialDeals={collaborations}
              rateCard={rateCard}
            />
          )}

          {currentTab === 'auto-dm' && (
            <AutoDmView
              initialRules={autoDmRules}
              initialLogs={autoDmLogs}
            />
          )}

          {currentTab === 'hooks' && (
            <HookGeneratorView />
          )}

          {currentTab === 'captions' && (
            <CaptionGeneratorView />
          )}

          {currentTab === 'shayari' && (
            <ShayariGeneratorView />
          )}

          {currentTab === 'ideas' && (
            <ReelIdeasView />
          )}

          {currentTab === 'best-time' && (
            <BestPostingTimeView postingTime={postingTime} />
          )}

          {currentTab === 'growth-plan' && (
            <GrowthPlanView plan={growthPlan} />
          )}

          {currentTab === 'reports' && (
            <WeeklyReportView
              profile={profile}
              scores={scores}
              reels={reels}
              report={weeklyReport}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              profile={profile}
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
              onDisconnect={handleUseDemo}
            />
          )}
        </main>
      </div>

      {/* Mobile Native App Bottom Navigation Bar */}
      {currentTab !== 'landing' && (
        <BottomNav
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onOpenConnect={() => setIsConnectModalOpen(true)}
        />
      )}

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
