import { DEVICE_ID } from "./cookiesName";

/**
 * Get the current device ID from cookies
 */
export function getDeviceId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  
  const cookies = document.cookie.split("; ");
  const deviceCookie = cookies.find((row) => row.startsWith(`${DEVICE_ID}=`));
  return deviceCookie ? deviceCookie.split("=")[1] : undefined;
}

/**
 * Initialize device ID if not already present.
 * Sets a cookie that lasts for 10 years.
 */
export function initDeviceId(): string {
  if (typeof document === "undefined") return "";

  let currentId = getDeviceId();
  
  if (!currentId) {
    currentId = crypto.randomUUID();
    const tenYearsInSeconds = 10 * 365 * 24 * 60 * 60;
    document.cookie = `${DEVICE_ID}=${currentId}; path=/; max-age=${tenYearsInSeconds}; SameSite=Lax`;
    console.log("Device ID initialized:", currentId);
  }
  
  return currentId;
}
