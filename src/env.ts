const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// if (!NEXT_PUBLIC_SERVER_URL) {
//   throw new Error("Environment variables NEXT_PUBLIC_SERVER_URL must be provided.");
// }

if (!NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
  throw new Error("Environment variables NEXT_PUBLIC_GOOGLE_CLIENT_ID must be provided.");
}

export const env = {
  NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};
