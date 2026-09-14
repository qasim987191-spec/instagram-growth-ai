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

  const bestReel = [...reels].sort((a, b) => b.views - a.views)[0];
  const weakestReel = [...reels].sort((a, b) => a.views - b.views)[0];

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
    <div className="min-h-screen bg-[#0A0B10] text-gray-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200">
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

      {/* Main Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar (Only in app tabs, not landing) */}
        {currentTab !== 'landing' && (
          <div className="hidden md:block">
            <Sidebar
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
            />
          </div>
        )}

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 md:hidden pt-20 px-4 pb-6 overflow-y-auto">
            <div className="bg-[#10121A] rounded-2xl border border-[#23273D] p-3">
              <Sidebar
                currentTab={currentTab}
                onTabChange={setCurrentTab}
                closeMobileMenu={() => setMobileMenuOpen(false)}
                onOpenInstallModal={() => {
                  setMobileMenuOpen(false);
                  setIsInstallModalOpen(true);
                }}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
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
            <HookGeneratorView initialNiche={profile.niche} />
          )}

          {currentTab === 'captions' && (
            <CaptionGeneratorView />
          )}

          {currentTab === 'shayari' && (
            <ShayariGeneratorView />
          )}

          {currentTab === 'ideas' && (
            <ReelIdeasView
              niche={profile.niche}
              topReels={reels}
            />
          )}

          {currentTab === 'posting-time' && (
            <BestPostingTimeView data={postingTime} />
          )}

          {currentTab === 'growth-plan' && (
            <GrowthPlanView initialPlan={growthPlan} />
          )}

          {currentTab === 'reports' && (
            <WeeklyReportView
              report={weeklyReport}
              bestReel={bestReel}
              weakestReel={weakestReel}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              profile={profile}
              isDemoMode={isDemoMode}
              onProfileUpdated={setProfile}
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
              onSwitchToDemo={handleUseDemo}
            />
          )}
        </main>
      </div>

      {/* Official Connect Instagram Modal */}
      <ConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnected={handleConnected}
        onUseDemo={handleUseDemo}
      />

      {/* Install App Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
};

export default App;
