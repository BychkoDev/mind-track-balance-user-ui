"use server";

import { env } from "@/env";
import { getJwtAccessToken } from "../auth/token";

const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4090";

export type ProfileUpdateData = {
  fullName?: string;
  about?: string;
  gender?: string;
};

export type SettingsUpdateData = {
  timezone?: string;
  locale?: 'en' | 'uk';
};

/**
 * Updates user profile information (fullName, etc.)
 */
export async function updateProfile(data: ProfileUpdateData) {
  const token = await getJwtAccessToken();
  
  const res = await fetch(`${BACK_SERVER_URL}/api/v1/user/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to update profile");
  }

  return await res.json();
}

/**
 * Updates user settings (locale, timezone)
 */
export async function updateSettings(data: SettingsUpdateData) {
  const token = await getJwtAccessToken();
  
  const res = await fetch(`${BACK_SERVER_URL}/api/v1/user/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to update settings");
  }

  return await res.json();
}

/**
 * Fetches the current user profile from the server
 */
export async function getProfile() {
  const token = await getJwtAccessToken();
  
  const res = await fetch(`${BACK_SERVER_URL}/api/v1/user/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch profile");
  }

  return await res.json();
}
