import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { SetAccessToken } from "./auth/SetAccessToken";
import { getJwtAccessToken } from "@/app/[locale]/(protected)/auth/token";

export default async function Template(props: { children: ReactNode }) {
  const accessTokenCookie = await getJwtAccessToken();

  if (!accessTokenCookie) {
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
