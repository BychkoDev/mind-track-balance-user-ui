"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode, useEffect } from "react";
import { initDeviceId } from "@/utils/deviceId";

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    initDeviceId();
  }, []);

  if (!clientId) {
    console.warn("Google Client ID is missing. Google Login will not work.");
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
