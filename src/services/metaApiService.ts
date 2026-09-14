import { InstagramProfile, ReelMetrics, MetaConnectionConfig } from '../types';
import { DEMO_PROFILE, DEMO_REELS } from '../data/mockData';

const STORAGE_KEY = 'ig_meta_config';

export function getMetaConfig(): MetaConnectionConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading Meta config', e);
  }
  return {
    isConnected: false,
    appId: '',
    accessToken: '',
    permissionsGranted: [],
    isDemoMode: true,
  };
}

export function saveMetaConfig(config: MetaConnectionConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function disconnectInstagram(): MetaConnectionConfig {
  const resetConfig: MetaConnectionConfig = {
    isConnected: false,
    appId: '',
    accessToken: '',
    permissionsGranted: [],
    isDemoMode: true,
  };
  saveMetaConfig(resetConfig);
  return resetConfig;
}

export const REQUIRED_META_PERMISSIONS = [
  {
    name: 'instagram_basic',
    description: 'Read basic profile info, media list, username, and account ID',
    required: true,
  },
  {
    name: 'instagram_manage_insights',
    description: 'Read metrics, impressions, reach, reel views, and save/share counts',
    required: true,
  },
  {
    name: 'pages_show_list',
    description: 'Discover connected Facebook pages linked to Instagram Creator accounts',
    required: false,
  },
  {
    name: 'pages_read_engagement',
    description: 'Calculate engagement rate and audience interactions safely',
    required: false,
  },
];

/**
 * Builds the official Meta Graph OAuth authorization URL
 */
export function buildMetaOAuthUrl(appId: string, redirectUri: string): string {
  const scope = 'instagram_basic,instagram_manage_insights,pages_show_list,pages_read_engagement';
  const state = Math.random().toString(36).substring(7);
  return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${encodeURIComponent(appId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=token&state=${state}`;
}

/**
 * Validates a Meta User Access Token against the Graph API
 */
export async function verifyMetaToken(token: string): Promise<{ valid: boolean; profile?: InstagramProfile; error?: string }> {
  if (!token || token.trim().length === 0) {
    return { valid: false, error: 'Token cannot be empty' };
  }

  try {
    // Official Graph API endpoint for user profile & connected IG accounts
    const res = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name,accounts{instagram_business_account{id,username,name,profile_picture_url,followers_count,follows_count,media_count,biography,website}}&access_token=${token}`);
    
    if (!res.ok) {
      const err = await res.json();
      return { valid: false, error: err?.error?.message || 'Meta API rejected token' };
    }

    const data = await res.json();
    const igAccount = data?.accounts?.data?.[0]?.instagram_business_account;

    if (!igAccount) {
      return {
        valid: true,
        error: 'Token valid, but no connected Instagram Creator/Business account found. Ensure your IG account is linked to a Facebook Page.'
      };
    }

    const liveProfile: InstagramProfile = {
      id: igAccount.id,
      username: igAccount.username || 'creator',
      name: igAccount.name || data.name,
      avatarUrl: igAccount.profile_picture_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      bio: igAccount.biography || 'Connected via Meta Graph API',
      externalUrl: igAccount.website,
      followersCount: igAccount.followers_count || 0,
      followingCount: igAccount.follows_count || 0,
      mediaCount: igAccount.media_count || 0,
      niche: 'Creator Account',
      category: 'Digital Creator',
      isVerified: false,
      isDemo: false,
    };

    return { valid: true, profile: liveProfile };
  } catch (e: any) {
    return { valid: false, error: e?.message || 'Network error verifying token' };
  }
}
