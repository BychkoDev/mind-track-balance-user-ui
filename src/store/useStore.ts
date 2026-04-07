import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  uuid: string;
  login: string;
  email: string;
  firstname?: string;
  surname?: string;
  avatarUrl?: string;
  active: boolean;
  vip: boolean;
  ipExpirationDate: string;
  userIp: string;
  aboutMe: string;
  role: "USER";
  locale: "EN" | "UK";
  gender: "MALE" | "FEMALE" | "OTHER";
}

interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  theme: "light" | "dark" | "mindful";
  attentionTrackingEnabled: boolean;

  // Actions
  setUser: (user: UserProfile | null) => void;
  setTheme: (theme: "light" | "dark" | "mindful") => void;
  toggleAttentionTracking: () => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      theme: "mindful",
      attentionTrackingEnabled: true,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTheme: (theme) => set({ theme }),
      toggleAttentionTracking: () =>
        set((state) => ({
          attentionTrackingEnabled: !state.attentionTrackingEnabled,
        })),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "mindtrack-storage",
    },
  ),
);
