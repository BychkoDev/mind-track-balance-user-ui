import { setJwtAccessToken } from "@/app/[locale]/(protected)/auth/setTokens";
import {
  regenerateAccessToken,
} from "@/app/[locale]/(protected)/auth/token";
import { JWT_REFRESH_TOKEN } from "@/utils/cookiesName";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get(JWT_REFRESH_TOKEN);
  if (!refreshToken) {
    redirect("/login");
  }
  const newAccessToken = await regenerateAccessToken(refreshToken.value);
  setJwtAccessToken(newAccessToken);

  return new Response();
}
