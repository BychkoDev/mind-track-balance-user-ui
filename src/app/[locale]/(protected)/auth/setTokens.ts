import "server-only";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, ROLE } from "@/utils/cookiesName";
import { cookies } from "next/headers";

export async function setJwtAccessToken(jwtAccessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: JWT_ACCESS_TOKEN,
    value: jwtAccessToken,
    maxAge: 60 * 15,
    httpOnly: true,
    path: "/",
    // secure: true,
    sameSite: "lax",
    priority: "high"
  });
}

export async function setJwtRefreshToken(jwtRefreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: JWT_REFRESH_TOKEN,
    value: jwtRefreshToken,
    maxAge: 60 * 60 * 24 * 150, // 150d
    httpOnly: true,
    path: "/",
    // secure: true,
    sameSite: "lax",
    priority: "high"
  });
}

export async function deleteJwtAccessToken() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: JWT_ACCESS_TOKEN,
    value: "",
    maxAge: 0,
    path: "/",
  });
}

export async function deleteJwtRefreshToken() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: JWT_REFRESH_TOKEN,
    value: "",
    maxAge: 0,
    path: "/",
  });
}

export async function setRole(role: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: ROLE,
    value: role,
    maxAge: 60 * 60 * 24 * 150, // 150d
    httpOnly: true,
    path: "/",
    // secure: true,
    sameSite: "lax",
    priority: "high"
  });
}
