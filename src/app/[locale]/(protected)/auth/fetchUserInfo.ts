"use server";

import { getJwtAccessToken } from "@/app/[locale]/(protected)/auth/token";
import { env } from "@/env";
import { UserProfile } from "@/store/useStore";
import { deleteJwtAccessToken, deleteJwtRefreshToken } from "./setTokens";

const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4091"

export async function fetchUserInfo(): Promise<Result<UserProfile, string>> {

  const token = await getJwtAccessToken();
  
  try {
    const res = await fetch(`${BACK_SERVER_URL}/api/v1/user/me`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if(res.status === 401) {
      console.log("LOGOUT: 401");
      deleteJwtAccessToken();
      deleteJwtRefreshToken();
      return { ok: null, err: "failed to fetch manager" };
    }

    if (res.status === 200) {
      const json = (await res.json()) as UserProfile;
      return { ok: json, err: null };
    }

    console.error(res.status, await res.json());
    return { ok: null, err: "failed to fetch manager" };
  } catch (e) {
    console.error(e);
    return { ok: null, err: "failed to fetch manager" };
  }
}
