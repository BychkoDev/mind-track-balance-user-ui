import { env } from "@/env";

const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4090";

/**
 * Resolves the avatar URL.
 * If it's a full URL (Google or absolute), returns as is.
 * If it's a relative path (internal server), prepends the base URL.
 * If empty, returns null to trigger fallback.
 */
export function getAvatarUrl(url?: string | null): string | null {
  if (!url) return null;

  // Check if it's already an absolute URL (starts with http or https)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative path, prepend server URL
  // Ensure we don't double slash
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  return `${BACK_SERVER_URL}/${cleanUrl}`;
}

/**
 * Generates fallback initials from a name or email.
 */
export function getInitials(name?: string | null, email?: string | null): string {
  const source = name || email || "User";
  const parts = source.split(/[\s.@]/).filter(p => p.length > 0);
  
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  
  return parts[0].slice(0, 2).toUpperCase();
}
