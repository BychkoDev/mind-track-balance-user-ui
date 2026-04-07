"use client";

import { useEffect } from "react";

export function SetAccessToken() {
  useEffect(() => {
    fetch("/api/regenerateAccessToken");
  }, []);

  return <></>;
}
