"use server";

import { cookies } from "next/headers";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, ROLE } from "@/utils/cookiesName";
import { redirect } from "next/navigation";
import { env } from "@/env";
import { getJwtAccessToken } from "./auth/token";

const BACK_SERVER_URL = env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4090"

export async function logout() {
  fetch(BACK_SERVER_URL + "/api/v1/auth/logout", {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + (await getJwtAccessToken()),
    },
  });
  const cookieStore = await cookies();
  cookieStore.delete(JWT_ACCESS_TOKEN);
  cookieStore.delete(JWT_REFRESH_TOKEN);
  cookieStore.delete(ROLE);
  redirect("/login");
}
