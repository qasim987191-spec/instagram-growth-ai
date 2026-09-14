export type NavTab = 
  | 'landing'
  | 'dashboard'
  | 'profile-analysis'
  | 'reels'
  | 'reach'
  | 'recommendations'
  | 'ideas'
  | 'hooks'
  | 'captions'
  | 'shayari'
  | 'collaborations'
  | 'auto-dm'
  | 'posting-time'
  | 'growth-plan'
  | 'reports'
  | 'settings';

export interface InstagramProfile {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  externalUrl?: string;
  followersCount: number;
  followingCount: number;
  mediaCount: number;
  niche: string;
  category: string;
  isVerified: boolean;
  isDemo: boolean;
}

export interface ReelMetrics {
  id: string;
  caption: string;
  thumbnailUrl: string;
  videoUrl?: string;
  postedAt: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  impressions: number;
  engagementRate: number; // percentage
  performanceVsAvgPercent: number; // positive or negative
  category: string;
  durationSeconds: number;
  hookText: string;
}

export interface GrowthScores {
  overallScore: number; // 0 - 100
  profileScore: number;
  contentScore: number;
  engagementScore: number;
  reachScore: number;
  consistencyScore: number;
}

export interface ProfileAudit {
  nicheClarity: string;
  bioQualityScore: number;
  bioQualityReason: string;
  profilePositioning: string;
  contentConsistency: string;
  ctaQuality: string;
  firstImpression: string;
  whatIsWorking: string[];
  whatNeedsImprovement: string[];
  actionPlan: [string, string, string]; // Exactly 3 specific actions
}

export interface ReachMetricsData {
  accountsReached: number;
  reachGrowthPercent: number;
  impressions: number;
  impressionsGrowthPercent: number;
  followerReachPercent: number;
  nonFollowerReachPercent: number;
  reelViewsTotal: number;
  engagementTotal: number;
  sharesTotal: number;
  savesTotal: number;
  improvingReasons: string[];
  limitingReasons: string[];
}

export interface ActionRecommendation {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Hooks' | 'Content Topic' | 'Call to Action' | 'Audience Retention' | 'Posting Timing';
  title: string;
  description: string;
  dataEvidence: string;
  expectedOutcome: string;
  completed: boolean;
}

export interface HookItem {
  id: string;
  style: 'Curiosity' | 'Emotional' | 'Funny' | 'Bold' | 'Storytelling' | 'Suspense';
  text: string;
  whyItWorks: string;
}

export interface CaptionOutput {
  caption: string;
  callToAction: string;
  hashtags: string[];
  hashtagsDisclaimer: string;
}

export interface ShayariItem {
  id: string;
  line1: string;
  line2: string;
  style: 'Sad' | 'Attitude' | 'Emotional' | 'Love' | 'Breakup' | 'Motivational';
  language: 'Hindi' | 'Hinglish';
}

export interface ReelIdeaItem {
  id: string;
  title: string;
  format: string;
  hook: string;
  shortConcept: string;
  suggestedCaption: string;
  suggestedCTA: string;
  predictedViralityReason: string;
}

export interface PostingTimeSlot {
  day: string;
  bestTime: string;
  secondBestTime: string;
  audienceActivityLevel: number; // 1-100
  explanation: string;
}

export interface HeatmapSlot {
  day: string;
  hour: number;
  score: number;
  label: string;
}

export interface BestPostingTimeData {
  bestDays: string[];
  bestHours: string[];
  heatmap: HeatmapSlot[];
  explanation: string;
}

export interface DayPlan {
  day: number;
  dayName: string;
  contentType: string;
  reelTopic: string;
  hookIdea: string;
  storyPrompt: string;
  engagementTask: string;
  completed: boolean;
}

export interface DayGrowthTask {
  dayNumber: number;
  dayTitle: string;
  theme: string;
  primaryAction: string;
  tasks: { id: string; text: string; done: boolean }[];
  keyMetricToTrack: string;
  proTip: string;
}

export interface WeeklyReportData {
  reportPeriod: string;
  netFollowersGained: number;
  totalImpressions: number;
  totalReelViews: number;
  overallGrowthScore: number;
  bestReelId: string;
  weakestReelId: string;
  whatWorked: string[];
  whatDidNotWork: string[];
  focusNextWeek: string;
}

export interface MetaConnectionConfig {
  isConnected: boolean;
  appId: string;
  accessToken: string;
  tokenExpiresAt?: string;
  permissionsGranted: string[];
  isDemoMode: boolean;
}

export interface BrandCollaborationDeal {
  id: string;
  brandName: string;
  brandCategory: string;
  deliverable: string; // e.g. "1 Reel + 2 Stories"
  offeredPrice: number; // in INR / USD
  currency: string;
  status: 'Inquiry' | 'Pitch Sent' | 'Negotiating' | 'Confirmed' | 'Delivered' | 'Paid';
  contactPerson: string;
  dueDate: string;
  notes?: string;
}

export interface RateCardEstimation {
  reelRateMin: number;
  reelRateMax: number;
  storyRateMin: number;
  storyRateMax: number;
  carouselRateMin: number;
  carouselRateMax: number;
  comboRateMin: number;
  comboRateMax: number;
  engagementFactor: number;
  marketAverageCPM: number;
}

export interface AutoDmRule {
  id: string;
  name: string;
  triggerKeyword: string; // e.g. "LINK", "GUIDE", "TOOL", "PRESET"
  actionType: 'reply_dm' | 'comment_reply_and_dm';
  dmMessage: string;
  publicCommentReplies: string[];
  attachedLink?: string;
  targetReelId?: string; // specific reel or all reels
  isActive: boolean;
  triggerCount: number;
}

export interface AutoDmLog {
  id: string;
  username: string;
  triggeredKeyword: string;
  reelCaptionSnippet: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'opened';
  messagePreview: string;
}

