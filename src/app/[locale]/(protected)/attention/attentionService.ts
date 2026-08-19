"use server";

import { env } from "@/env";
import { getJwtAccessToken } from "@/app/[locale]/(protected)/auth/token";

const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4094";

export interface AttentionStat {
  domain: string;
  durationSec: number;
}

export interface AttentionConfig {
  domain: string;
  isBlocked: boolean;
  isTracked: boolean;
  dailyLimitSec?: number;
}

export async function getAttentionStats(startDate?: string, endDate?: string): Promise<Result<AttentionStat[], string>> {
  const token = await getJwtAccessToken();
  try {
    const url = new URL(`${BACK_SERVER_URL}/api/v1/attention/stats`);
    if (startDate) url.searchParams.append("startDate", startDate);
    if (endDate) url.searchParams.append("endDate", endDate);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { authorization: "Bearer " + token },
      cache: "no-store",
    });

    if (res.status === 200) {
      const data = await res.json();
      return { ok: data, err: null };
    }
    console.error("getAttentionStats non-200 status:", res.status, await res.text());
    return { ok: null, err: "Failed to fetch attention stats" };
  } catch (error) {
    console.error("getAttentionStats throw:", error);
    return { ok: null, err: "Failed to fetch attention stats" };
  }
}

export interface AttentionTimelineStat {
  date: string;
  domain: string;
  durationSec: number;
}

export async function getAttentionTimeline(days: number = 7): Promise<Result<AttentionTimelineStat[], string>> {
  const token = await getJwtAccessToken();
  try {
    const res = await fetch(`${BACK_SERVER_URL}/api/v1/attention/timeline?days=${days}`, {
      method: "GET",
      headers: { authorization: "Bearer " + token },
      cache: "no-store",
    });

    if (res.status === 200) {
      const data = await res.json();
      return { ok: data, err: null };
    }
    console.error("getAttentionTimeline non-200 status:", res.status, await res.text());
    return { ok: null, err: "Failed to fetch timeline" };
  } catch (error) {
    console.error("getAttentionTimeline throw:", error);
    return { ok: null, err: "Failed to fetch timeline" };
  }
}

export async function getAttentionConfig(): Promise<Result<AttentionConfig[], string>> {
  const token = await getJwtAccessToken();
  try {
    const res = await fetch(`${BACK_SERVER_URL}/api/v1/attention/config`, {
      method: "GET",
      headers: { authorization: "Bearer " + token },
      cache: "no-store",
    });

    if (res.status === 200) {
      const data = await res.json();
      return { ok: data, err: null };
    }
    return { ok: null, err: "Failed to fetch attention config" };
  } catch (error) {
    return { ok: null, err: "Failed to fetch attention config" };
  }
}

export async function upsertAttentionRule(domain: string, isTracked?: boolean, isBlocked?: boolean, dailyLimitSec?: number | null): Promise<Result<boolean, string>> {
  const token = await getJwtAccessToken();
  try {
    const body: any = { domain };
    if (isTracked !== undefined) body.isTracked = isTracked;
    if (isBlocked !== undefined) body.isBlocked = isBlocked;
    if (dailyLimitSec !== undefined) body.dailyLimitSec = dailyLimitSec;

    const res = await fetch(`${BACK_SERVER_URL}/api/v1/attention/config`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200 || res.status === 201) {
      return { ok: true, err: null };
    }
    return { ok: null, err: "Failed to update rule" };
  } catch (error) {
    return { ok: null, err: "Failed to update rule" };
  }
}
