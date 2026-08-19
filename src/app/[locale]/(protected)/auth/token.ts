"use server";

import { env } from "@/env";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "@/utils/cookiesName";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4090"

export async function getJwtAccessToken(): Promise<string> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(JWT_ACCESS_TOKEN);
  if (accessToken && accessToken.value) {
    return accessToken.value;
  }

  const refreshToken = cookieStore.get(JWT_REFRESH_TOKEN);
  if (!refreshToken) {
    redirect("/login");
  }

  return await regenerateAccessToken(refreshToken.value);
}

import { setJwtAccessToken, setJwtRefreshToken } from "./setTokens";

export async function getJwtAccessTokenNoRedirect(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(JWT_ACCESS_TOKEN);
  if (accessToken && accessToken.value) {
    return accessToken.value;
  }

  const refreshToken = cookieStore.get(JWT_REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    return null;
  }

  const res = await fetch(
    `${BACK_SERVER_URL}/api/v1/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    },
  );

  if (res.status === 200 || res.status === 201) {
    const json = (await res.json()) as {
      accessToken: string;
      refreshToken: string;
    };
    await setJwtAccessToken(json.accessToken);
    await setJwtRefreshToken(json.refreshToken);
    return json.accessToken;
  }

  return null;
}

let refreshTokenPromise: Promise<string> | null = null;

export async function regenerateAccessToken(refreshToken: string): Promise<string> {
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  refreshTokenPromise = (async () => {
    try {
      const res = await fetch(
        `${BACK_SERVER_URL}/api/v1/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
          cache: "no-store",
        },
      );

      if (res.status === 200 || res.status === 201) {
        const json = (await res.json()) as {
          accessToken: string;
          refreshToken: string;
        };
        await setJwtAccessToken(json.accessToken);
        await setJwtRefreshToken(json.refreshToken);
        return json.accessToken;
      }

      redirect("/login");
    } finally {
      refreshTokenPromise = null;
    }
  })();

  return refreshTokenPromise;
}
