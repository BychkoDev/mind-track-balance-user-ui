'use server'

import { env } from "@/env";
import { getJwtAccessToken } from "@/app/[locale]/(protected)/auth/token";
import { Metrics } from "@/components/dashboard/EmotionLogModal";

export type FetchLoginError = {
  email?: string;
  password?: string;
  error?: string;
};


const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4092";


export async function SendMetrics(data: Metrics,): Promise<Result<null, FetchLoginError>> {

try {     
      
      const token = await getJwtAccessToken();

      const response = await fetch(`${BACK_SERVER_URL}/api/v1/mind-track/entries`, {
        method: "POST",        
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }});

        if(response.ok) {
            return { ok: null, err: null };
        }

      return { ok: null, err: await response.json() as FetchLoginError };


    } catch (error) {
      console.error("Save error:", error);
      return { ok: null, err: { error: "Save error" } };
    }
  };