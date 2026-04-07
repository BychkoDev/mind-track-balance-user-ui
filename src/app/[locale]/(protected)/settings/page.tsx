"use client";

import { useState } from "react";
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

export default function SettingsPage() {
  const [mindfulPause, setMindfulPause] = useState(true);
  const [attentionTracking, setAttentionTracking] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl text-foreground mb-3 font-bold">Your Settings</h1>
          <p className="text-muted-foreground text-lg">
            Personalize your focus, wellbeing, and privacy preferences.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Account & Profile */}
          <SettingsCard 
            icon={<User className="w-6 h-6 text-purple-600" />}
            title="Account & Profile"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  defaultValue="Jordan" 
                  className="mt-2 bg-white/60 dark:bg-slate-800/60 border-purple-100 focus:border-purple-300 rounded-xl"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue="jordan@mindtrack.app" 
                  className="mt-2 bg-white/60 dark:bg-slate-800/60 border-purple-100 focus:border-purple-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language" className="mt-2 bg-white/60 dark:bg-slate-800/60 border-purple-100 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger id="timezone" className="mt-2 bg-white/60 dark:bg-slate-800/60 border-purple-100 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl">
                      <SelectItem value="pst">PST (UTC-8)</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                      <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                      <SelectItem value="cet">CET (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-purple-100/50" />

              <div className="space-y-2">
                <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50 rounded-xl">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl">
                  Delete Account
                </Button>
              </div>
            </div>
          </SettingsCard>

          {/* Mind & Attention Preferences */}
          <SettingsCard 
            icon={<Brain className="w-6 h-6 text-blue-600" />}
            title="Mind & Attention Preferences"
          >
            <SettingRow 
              label="Mindful Pause" 
              description="Gentle reminders to breathe and reset"
            >
              <Switch 
                checked={mindfulPause} 
                onCheckedChange={setMindfulPause}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500"
              />
            </SettingRow>

            <SettingRow 
              label="Attention Tracking" 
              description="Monitor your focus patterns throughout the day"
            >
              <Switch 
                checked={attentionTracking} 
                onCheckedChange={setAttentionTracking}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500"
              />
            </SettingRow>

            <SettingRow 
              label="Focus Mode" 
              description="Block distractions during deep work"
            >
              <Switch 
                checked={focusMode} 
                onCheckedChange={setFocusMode}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500"
              />
            </SettingRow>

            <Separator className="bg-blue-100/50" />

            <div>
              <Label htmlFor="reminder">Reminder Frequency</Label>
              <Select defaultValue="moderate">
                <SelectTrigger id="reminder" className="mt-2 bg-white/60 dark:bg-slate-800/60 border-blue-100 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl">
                  <SelectItem value="gentle">Gentle (Every 2 hours)</SelectItem>
                  <SelectItem value="moderate">Moderate (Every hour)</SelectItem>
                  <SelectItem value="frequent">Frequent (Every 30 min)</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SettingsCard>

          {/* Notifications & Reports */}
          <SettingsCard 
            icon={<Bell className="w-6 h-6 text-cyan-600" />}
            title="Notifications & Reports"
          >
            <SettingRow 
              label="Email Notifications" 
              description="Receive updates via email"
            >
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
              />
            </SettingRow>

            <SettingRow 
              label="Push Notifications" 
              description="Browser push notifications for reminders"
            >
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
              />
            </SettingRow>

            <SettingRow 
              label="Weekly Report" 
              description="Summary of your mindfulness journey"
            >
              <Switch 
                checked={weeklyReport} 
                onCheckedChange={setWeeklyReport}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
              />
            </SettingRow>

            <Separator className="bg-cyan-100/50" />

            <Button variant="outline" className="w-full border-cyan-200 hover:bg-cyan-50 rounded-xl">
              <Send className="w-4 h-4 mr-2" />
              Send Test Email
            </Button>
          </SettingsCard>

          {/* Privacy & Data */}
          <SettingsCard 
            icon={<Shield className="w-6 h-6 text-purple-600" />}
            title="Privacy & Data"
          >
            <SettingRow 
              label="Analytics Opt-in" 
              description="Help us improve MindTrack Balance"
            >
              <Switch 
                checked={analyticsOptIn} 
                onCheckedChange={setAnalyticsOptIn}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
              />
            </SettingRow>

            <Separator className="bg-purple-100/50" />

            <div className="space-y-2">
              <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50 rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Export My Data
              </Button>
              <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl">
                Delete All Data
              </Button>
            </div>

            <div className="mt-4 p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
              <p className="text-sm text-muted-foreground">
                Your data is encrypted and stored securely. We never share your personal information with third parties.
              </p>
            </div>
          </SettingsCard>

          {/* Theme & Personalization */}
          <SettingsCard 
            icon={<Palette className="w-6 h-6 text-pink-600" />}
            title="Theme & Personalization"
          >
            <div>
              <Label htmlFor="theme">App Theme</Label>
              <Select defaultValue="mindful">
                <SelectTrigger id="theme" className="mt-2 bg-white/60 dark:bg-slate-800/60 border-pink-100 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="mindful">Mindful (Recommended)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="accent">Color Accent</Label>
              <Select defaultValue="purple">
                <SelectTrigger id="accent" className="mt-2 bg-white/60 dark:bg-slate-800/60 border-pink-100 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl">
                  <SelectItem value="purple">Purple Calm</SelectItem>
                  <SelectItem value="blue">Ocean Blue</SelectItem>
                  <SelectItem value="green">Forest Green</SelectItem>
                  <SelectItem value="coral">Sunset Coral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="animations">Animation Level</Label>
              <Select defaultValue="smooth">
                <SelectTrigger id="animations" className="mt-2 bg-white/60 dark:bg-slate-800/60 border-pink-100 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl">
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="smooth">Smooth</SelectItem>
                  <SelectItem value="playful">Playful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl border border-pink-100 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-pink-600" />
                <span className="text-sm text-foreground font-medium">Preview</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your theme creates a calm, balanced atmosphere for mindful work
              </p>
            </div>
          </SettingsCard>

          {/* Integrations */}
          <SettingsCard 
            icon={<Link2 className="w-6 h-6 text-blue-600" />}
            title="Integrations"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">G</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Google Fit</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 rounded-xl">
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-white text-sm">🍎</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Apple Health</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 rounded-xl">
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm">✈️</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Telegram Bot</p>
                    <p className="text-sm text-muted-foreground">Coming soon</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200 rounded-xl" disabled>
                  Soon
                </Button>
              </div>
            </div>
          </SettingsCard>

        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <Button 
            size="lg" 
            className="px-12 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white shadow-xl shadow-purple-200 hover:shadow-2xl hover:shadow-purple-300 transition-all duration-300 rounded-2xl font-semibold"
          >
            Save Changes
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 border-2 border-purple-200 hover:bg-purple-50 rounded-2xl font-medium"
          >
            Reset to Defaults
          </Button>
        </div>
      </main>
    </div>
  );
}
