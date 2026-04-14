"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { SettingRow } from "@/components/settings/SettingRow";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Brain, 
  Bell, 
  Shield, 
  Palette, 
  Link2,
  Download,
  Send,
  Sparkles
} from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import { updateProfile, updateSettings, getProfile } from "./profileService";
import { toast } from "sonner";
import { SettingsStickyHeader } from "@/components/settings/SettingsStickyHeader";
import { NextIntlClientProvider } from "next-intl";
import { useStore } from "@/store/useStore";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";

// Import messages for client-side preview
import ukMessages from "../../../../../messages/uk.json";
import enMessages from "../../../../../messages/en.json";

const messagesMap = {
  uk: ukMessages,
  en: enMessages,
};

type SettingsState = {
  mindfulPause: boolean;
  attentionTracking: boolean;
  focusMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReport: boolean;
  analyticsOptIn: boolean;
  fullName: string;
  timezone: string;
  locale: string;
  reminderFrequency: string;
  theme: string;
  accent: string;
  animations: string;
};

export default function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("Settings");
  const router = useRouter();
  const pathname = usePathname();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  
  // Consolidated settings state
  const [settings, setSettings] = useState<SettingsState>({
    mindfulPause: true,
    attentionTracking: true,
    focusMode: false,
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    analyticsOptIn: false,
    fullName: user?.fullName || "Jordan",
    timezone: "pst",
    locale: "en", // Will be updated on mount
    reminderFrequency: "moderate",
    theme: "mindful",
    accent: "purple",
    animations: "smooth",
  });

  // Snapshot for comparison and reset
  const [initialSettings, setInitialSettings] = useState<SettingsState | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize snapshot and locale from params/store
  useEffect(() => {
    params.then(p => {
      const initialState: SettingsState = {
        ...settings,
        fullName: user?.fullName || settings.fullName,
        locale: p.locale,
      };
      setSettings(initialState);
      setInitialSettings(initialState);
    });
  }, [user]);

  const hasChanges = initialSettings 
    ? JSON.stringify(settings) !== JSON.stringify(initialSettings)
    : false;

  const handleLanguageChange = (nextLocale: string) => {
    setSettings(prev => ({ ...prev, locale: nextLocale }));
  };

  const handleReset = () => {
    if (initialSettings) {
      setSettings(initialSettings);
      toast.info(t("notifications.resetSuccess") || "Changes discarded");
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Update snapshot after successful save
      setInitialSettings(settings);
      
      // Permanently switch app locale
      router.push(pathname, { locale: settings.locale });

      // Synchronize global store with the updated data returned from server
      const [updatedProfile, _] = await Promise.all([
        updateProfile({ fullName: settings.fullName }),
        updateSettings({ 
          timezone: settings.timezone,
          locale: settings.locale as "en" | "uk"
        })
      ]);

      if (updatedProfile) {
        setUser(updatedProfile);
      }
      
      toast.success(t("notifications.saveSuccess") || "Settings saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const currentMessages = settings.locale === "uk" ? messagesMap.uk : messagesMap.en;

  return (
    <NextIntlClientProvider locale={settings.locale} messages={currentMessages}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
        <DashboardHeader />
        
        <SettingsStickyHeader 
          isVisible={hasChanges}
          isSaving={isSaving}
          onSave={handleSaveChanges}
          onReset={handleReset}
        />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* Page Title */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4 font-extrabold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl font-medium leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Account & Profile */}
          <SettingsCard 
            icon={<User className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
            title={t("account.title")}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-bold ml-1">{t("account.fullName")}</Label>
                <Input 
                  id="name" 
                  value={settings.fullName}
                  onChange={(e) => setSettings(prev => ({ ...prev, fullName: e.target.value }))}
                  className="bg-white/50 dark:bg-slate-950/40 border-purple-100 dark:border-white/5 focus:border-purple-400 dark:focus:border-purple-500 rounded-2xl h-12 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-bold ml-1">{t("account.email")}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={user?.email || "jordan@mindtrack.app"} 
                  disabled
                  className="bg-white/50 dark:bg-slate-950/40 border-purple-100 dark:border-white/5 focus:border-purple-400 dark:focus:border-purple-500 rounded-2xl h-12 transition-all opacity-60 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-700 dark:text-gray-300 font-bold ml-1">{t("account.language")}</Label>
                  <Select value={settings.locale} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language" className="bg-white/50 dark:bg-slate-950/40 border-purple-100 dark:border-white/5 rounded-2xl h-12">
                      <SelectValue placeholder={t("account.language")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border-white/20 dark:border-white/10">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="uk">Українська</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-gray-700 dark:text-gray-300 font-bold ml-1">{t("account.timezone")}</Label>
                  <Select value={settings.timezone} onValueChange={(v) => setSettings(prev => ({ ...prev, timezone: v }))}>
                    <SelectTrigger id="timezone" className="bg-white/50 dark:bg-slate-950/40 border-purple-100 dark:border-white/5 rounded-2xl h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border-white/20 dark:border-white/10">
                      <SelectItem value="pst">PST (UTC-8)</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                      <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                      <SelectItem value="cet">CET (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-purple-100/50 dark:bg-white/5" />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1 border-purple-100 dark:border-white/10 bg-white/50 dark:bg-transparent hover:bg-purple-50 dark:hover:bg-white/5 rounded-2xl h-11 text-gray-700 dark:text-gray-300 font-semibold transition-all">
                  {t("account.changePassword")}
                </Button>
                <Button variant="outline" className="flex-1 border-red-100 dark:border-red-900/30 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl h-11 font-semibold transition-all">
                  {t("account.deleteAccount")}
                </Button>
              </div>
            </div>
          </SettingsCard>

          {/* Mind & Attention Preferences */}
          <SettingsCard 
            icon={<Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title={t("mind.title")}
          >
            <SettingRow 
              label={t("mind.mindfulPause")} 
              description={t("mind.mindfulPauseDesc")}
            >
              <Switch 
                checked={settings.mindfulPause} 
                onCheckedChange={(v) => setSettings(prev => ({ ...prev, mindfulPause: v }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500 scale-110"
              />
            </SettingRow>

            <SettingRow 
              label={t("mind.attentionTracking")} 
              description={t("mind.attentionTrackingDesc")}
            >
              <Switch 
                checked={settings.attentionTracking} 
                onCheckedChange={(v) => setSettings(prev => ({ ...prev, attentionTracking: v }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500 scale-110"
              />
            </SettingRow>

            <SettingRow 
              label={t("mind.focusMode")} 
              description={t("mind.focusModeDesc")}
            >
              <Switch 
                checked={settings.focusMode} 
                onCheckedChange={(v) => setSettings(prev => ({ ...prev, focusMode: v }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500 scale-110"
              />
            </SettingRow>

            <Separator className="bg-blue-100/50 dark:bg-white/5" />

            <div className="space-y-2">
              <Label htmlFor="reminder" className="text-gray-700 dark:text-gray-300 font-bold ml-1">{t("mind.reminderFrequency")}</Label>
              <Select value={settings.reminderFrequency} onValueChange={(v) => setSettings(prev => ({ ...prev, reminderFrequency: v }))}>
                <SelectTrigger id="reminder" className="bg-white/50 dark:bg-slate-950/40 border-blue-100 dark:border-white/5 rounded-2xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border-white/20 dark:border-white/10">
                  <SelectItem value="gentle">{t("mind.freq.gentle")}</SelectItem>
                  <SelectItem value="moderate">{t("mind.freq.moderate")}</SelectItem>
                  <SelectItem value="frequent">{t("mind.freq.frequent")}</SelectItem>
                  <SelectItem value="off">{t("mind.freq.off")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SettingsCard>

          {/* Notifications & Reports */}
          <SettingsCard 
            icon={<Bell className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />}
            title={t("notifications.title")}
          >
            <SettingRow 
              label={t("notifications.email")} 
              description={t("notifications.emailDesc")}
            >
              <Switch 
                checked={settings.emailNotifications} 
                onCheckedChange={(v) => setSettings(prev => ({ ...prev, emailNotifications: v }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500 scale-110"
              />
            </SettingRow>

            <SettingRow 
              label={t("notifications.push")} 
              description={t("notifications.pushDesc")}
            >
              <Switch 
                checked={settings.pushNotifications} 
                onCheckedChange={(v) => setSettings(prev => ({ ...prev, pushNotifications: v }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500 scale-110"
              />
            </SettingRow>

            <SettingRow 
              label={t("notifications.weekly")} 
              description={t("notifications.weeklyDesc")}
            >
              <Switch 
                checked={settings.weeklyReport} 
                onCheckedChange={(v) => setSettings(prev => ({ ...prev, weeklyReport: v }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500 scale-110"
              />
            </SettingRow>

            <Separator className="bg-cyan-100/50 dark:bg-white/5" />

            <Button variant="outline" className="w-full border-cyan-100 dark:border-white/10 bg-white/50 dark:bg-transparent hover:bg-cyan-50 dark:hover:bg-white/5 rounded-2xl h-11 text-gray-700 dark:text-gray-300 font-semibold transition-all">
              <Send className="w-4 h-4 mr-2" />
              {t("notifications.sendTest")}
            </Button>
          </SettingsCard>

          {/* Privacy & Data */}
          <SettingsCard 
            icon={<Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
            title={t("privacy.title")}
          >
            <SettingRow 
              label={t("privacy.analytics")} 
              description={t("privacy.analyticsDesc")}
            >
              <Switch 
                checked={settings.analyticsOptIn} 
                onCheckedChange={(v) => setSettings(prev => ({ ...prev, analyticsOptIn: v }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 scale-110"
              />
            </SettingRow>

            <Separator className="bg-purple-100/50 dark:bg-white/5" />

            <div className="space-y-3">
              <Button variant="outline" className="w-full border-purple-100 dark:border-white/10 bg-white/50 dark:bg-transparent hover:bg-purple-50 dark:hover:bg-white/5 rounded-2xl h-11 text-gray-700 dark:text-gray-300 font-semibold transition-all">
                <Download className="w-4 h-4 mr-2" />
                {t("privacy.export")}
              </Button>
              <Button variant="outline" className="w-full border-red-100 dark:border-red-900/30 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl h-11 font-semibold transition-all">
                {t("privacy.deleteAll")}
              </Button>
            </div>

            <div className="mt-4 p-5 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-950/50 dark:to-slate-900/50 rounded-2xl border border-purple-100/50 dark:border-white/5">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed">
                {t("privacy.notice")}
              </p>
            </div>
          </SettingsCard>

          {/* Theme & Personalization */}
          <SettingsCard 
            icon={<Palette className="w-6 h-6 text-pink-600 dark:text-pink-400" />}
            title={t("appearance.title")}
          >
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-gray-700 dark:text-gray-300 font-bold ml-1">{t("appearance.theme")}</Label>
              <Select value={settings.theme} onValueChange={(v) => setSettings(prev => ({ ...prev, theme: v }))}>
                <SelectTrigger id="theme" className="bg-white/50 dark:bg-slate-950/40 border-pink-100 dark:border-white/5 rounded-2xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border-white/20 dark:border-white/10">
                  <SelectItem value="light">{t("appearance.themeOptions.light")}</SelectItem>
                  <SelectItem value="dark">{t("appearance.themeOptions.dark")}</SelectItem>
                  <SelectItem value="mindful">{t("appearance.themeOptions.mindful")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent" className="text-gray-700 dark:text-gray-300 font-bold ml-1">{t("appearance.accent")}</Label>
              <Select value={settings.accent} onValueChange={(v) => setSettings(prev => ({ ...prev, accent: v }))}>
                <SelectTrigger id="accent" className="bg-white/50 dark:bg-slate-950/40 border-pink-100 dark:border-white/5 rounded-2xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border-white/20 dark:border-white/10">
                  <SelectItem value="purple">{t("appearance.accentOptions.purple")}</SelectItem>
                  <SelectItem value="blue">{t("appearance.accentOptions.blue")}</SelectItem>
                  <SelectItem value="green">{t("appearance.accentOptions.green")}</SelectItem>
                  <SelectItem value="coral">{t("appearance.accentOptions.coral")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="animations" className="text-gray-700 dark:text-gray-300 font-bold ml-1">{t("appearance.animations")}</Label>
              <Select value={settings.animations} onValueChange={(v) => setSettings(prev => ({ ...prev, animations: v }))}>
                <SelectTrigger id="animations" className="bg-white/50 dark:bg-slate-950/40 border-pink-100 dark:border-white/5 rounded-2xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border-white/20 dark:border-white/10">
                  <SelectItem value="minimal">{t("appearance.animOptions.minimal")}</SelectItem>
                  <SelectItem value="smooth">{t("appearance.animOptions.smooth")}</SelectItem>
                  <SelectItem value="playful">{t("appearance.animOptions.playful")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-950/80 dark:via-purple-950/20 dark:to-slate-950/80 rounded-2xl border border-pink-100/50 dark:border-white/5 mt-4 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white/80 dark:bg-white/5 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400 group-hover:scale-125 transition-transform" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-200 font-bold">{t("appearance.preview")}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic">
                {t("appearance.previewDesc")}
              </p>
            </div>
          </SettingsCard>

          {/* Integrations */}
          <SettingsCard 
            icon={<Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title={t("integrations.title")}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-950/40 rounded-2xl border border-blue-50 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <span className="text-white text-lg font-bold">G</span>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-100 font-bold">{t("integrations.googleFit")}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("integrations.notConnected")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-blue-100 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl px-4 font-bold">
                  {t("integrations.connect")}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-950/40 rounded-2xl border border-blue-50 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <span className="text-white text-lg">🍎</span>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-100 font-bold">{t("integrations.appleHealth")}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("integrations.notConnected")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-blue-100 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl px-4 font-bold">
                  {t("integrations.connect")}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-950/40 rounded-2xl border border-blue-50 dark:border-white/5 opacity-70">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">✈️</span>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-100 font-bold">{t("integrations.telegram")}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("integrations.comingSoon")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-gray-100 dark:border-white/5 rounded-xl px-4 font-bold" disabled>
                  {t("integrations.comingSoon")}
                </Button>
              </div>
            </div>
          </SettingsCard>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-8 border-t border-gray-100 dark:border-white/5">
          <Button 
            size="lg" 
            disabled={isSaving}
            onClick={handleSaveChanges}
            className="w-full sm:w-auto px-16 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:opacity-90 text-white shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 rounded-2xl h-14 font-extrabold text-lg"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t("actions.saving") || "Saving..."}</span>
              </div>
            ) : t("actions.save")}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto px-10 border-2 border-purple-100 dark:border-white/10 hover:bg-purple-50 dark:hover:bg-white/5 rounded-2xl h-14 font-extrabold text-gray-600 dark:text-gray-400 transition-all"
              >
                {t("actions.reset")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {t("resetDialog.title")}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-500 dark:text-gray-400 text-lg">
                  {t("resetDialog.description")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel className="rounded-2xl h-12 px-6 border-gray-200 dark:border-white/10 font-bold">
                  {t("actions.cancel")}
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleReset}
                  className="rounded-2xl h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  {t("actions.confirmReset")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
    </NextIntlClientProvider>
  );
}
