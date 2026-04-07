"use server";

import crypto from "crypto";
import { env } from "@/env";
import {
  setJwtAccessToken,
  setJwtRefreshToken,
} from "../(protected)/auth/setTokens";

type DataSend = {
  email: string;
  password: string;
};

export type FetchLoginError = {
  email?: string;
  password?: string;
  error?: string;
};

const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4090"

export async function signin(
  data: DataSend,
): Promise<Result<string, FetchLoginError>> {

  const res = await fetch(`${BACK_SERVER_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        deviceId: _generateDeviceId(),
        clientKind: "web-app",
      }),
    },
  );

  if (res.status === 200) {
    const json = (await res.json()) as {
      accessToken: string;
      refreshToken: string;
    };
    await setJwtAccessToken(json.accessToken);
    await setJwtRefreshToken(json.refreshToken);

    return { ok: null, err: null };
  }

  if (res.status === 401 || res.status === 400 || res.status === 403) {
    const json = (await res.json()) as FetchLoginError;
    return { ok: null, err: json };
  }

  const text = await res.text();
  console.error(text, res.status);

  return { ok: null, err: { error: text } };
}

export async function googleLoginService(
  googleToken: string,
): Promise<Result<null, FetchLoginError>> {
  const res = await fetch(`${BACK_SERVER_URL}/api/v1/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      googleToken,
      deviceId: _generateDeviceId(),
      clientKind: "web-app",
    }),
  });

  if (res.status === 200) {
    const json = (await res.json()) as {
      accessJwtToken: string;
      refreshJwtToken: string;
    };
    await setJwtAccessToken(json.accessJwtToken);
    await setJwtRefreshToken(json.refreshJwtToken);
    return { ok: null, err: null };
  }

  const json = (await res.json()) as FetchLoginError;
  return { ok: null, err: json };
}

const _generateDeviceId = (): string => {
  return crypto.randomBytes(16).toString("hex");
};
