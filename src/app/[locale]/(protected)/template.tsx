import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { SetAccessToken } from "./auth/SetAccessToken";
import { cookies } from "next/headers";
import { JWT_REFRESH_TOKEN } from "@/utils/cookiesName";

export default async function Template(props: { children: ReactNode }) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(JWT_REFRESH_TOKEN);

  if (!refreshToken) {
    redirect("/login");
  }

  return (
    <>
      <SetAccessToken />
      <div className="flex">
        <div className="w-full overflow-y-auto">{props.children}</div>
      </div>
    </>
  );
}
