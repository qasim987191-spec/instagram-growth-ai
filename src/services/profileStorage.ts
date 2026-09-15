import { InstagramProfile } from '../types';
import { DEMO_PROFILE } from '../data/mockData';

const PROFILE_STORAGE_KEY = 'ig_active_profile_v2';

export function getSavedProfile(): InstagramProfile {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.username) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load saved profile', e);
  }
  return DEMO_PROFILE;
}

export function saveActiveProfile(profile: InstagramProfile): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function clearActiveProfile(): void {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear profile', e);
  }
}
