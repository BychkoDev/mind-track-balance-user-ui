"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Progress } from "@/components/ui/progress";
import { UserAvatar } from "@/components/common/UserAvatar";
import { useTranslations, useLocale } from "next-intl";
import { useStore } from "@/store/useStore";
import { cn } from "@/components/ui/utils";
import {
  Pencil,
  Share2,
  Download,
  Heart,
  Brain,
  Flame,
  Leaf,
  Sun,
  Waves,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Crown
} from "lucide-react";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const locale = useLocale();
  const user = useStore((state) => state.user);

  // Stats (mocked for now, but localized labels)
  const emotionalSummary = {
    moodAverage: { value: 72, label: t("stats.mostlyCalm") },
    focusScore: 84,
    balanceIndex: 78,
  };

  const achievements = [
    { icon: Flame, label: t("achievements.streak"), color: "from-orange-400 to-pink-400" },
    { icon: Waves, label: t("achievements.reflections"), color: "from-cyan-400 to-blue-400" },
    { icon: Sun, label: t("achievements.improvement"), color: "from-amber-400 to-yellow-300" },
    { icon: Leaf, label: t("achievements.focusMaster"), color: "from-green-400 to-emerald-400" },
  ];

  const recentReflections = [
    {
      quote: "Morning meditation helped me center myself before the day began.",
      mood: "🧘",
      date: "Oct 23, 2025",
    },
    {
      quote: "Grateful for small moments of stillness in a busy afternoon.",
      mood: "✨",
      date: "Oct 22, 2025",
    },
    {
      quote: "Deep breathing exercises brought clarity to my thoughts.",
      mood: "🌊",
      date: "Oct 21, 2025",
    },
  ];

  const activityTimeline = [
    { action: t("timeline.focusMode"), time: t("timeline.timeAgo", { time: "2h" }), icon: Brain },
    { action: t("timeline.loggedEmotion"), time: t("timeline.timeAgo", { time: "5h" }), icon: Heart },
    { action: t("timeline.completedReflection"), time: t("timeline.timeAgo", { time: "1d" }), icon: MessageSquare },
    { action: t("timeline.sharedReport"), time: t("timeline.timeAgo", { time: "2d" }), icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-8 py-6 space-y-8">
        {/* Profile Identity Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-cyan-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
          <Card className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-900/80 border-white/40 dark:border-white/10 shadow-2xl rounded-3xl p-8 overflow-hidden">
            {/* Decorative background flare */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-lg opacity-40 animate-pulse" />
                <UserAvatar 
                  size="xl" 
                  avatarUrl={user?.avatarUrl} 
                  name={user?.fullName} 
                  email={user?.email}
                  className="ring-4 ring-white dark:ring-slate-800 shadow-2xl"
                />
                
                {user?.vip && (
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg border-2 border-white dark:border-slate-900">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-3 z-10">
                <div className="flex items-center justify-center gap-3">
                  <h1 className="bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent font-extrabold text-4xl tracking-tight">
                    {user?.fullName || "User"}
                  </h1>
                  {user?.vip && (
                    <span className="px-3 py-1 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider rounded-full border border-yellow-400/20">
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-purple-500 dark:text-purple-400 font-semibold text-lg">
                  {user?.login ? `@${user.login}` : user?.email}
                </p>
                <p className="text-gray-600 dark:text-gray-300 max-w-md italic text-lg opacity-90">
                  &quot;{user?.aboutMe || t("identity.motto")}&quot;
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  {t("identity.memberSince", { 
                    date: user?.createdAt ? new Date(user.createdAt).toLocaleDateString(locale, { 
                      month: 'long', 
                      year: 'numeric' 
                    }) : "January 2024" 
                  })}
                </p>
              </div>

              <Button className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg rounded-2xl transition-all hover:scale-105 active:scale-95 border-none">
                <Pencil className="w-4 h-4 mr-2" />
                {t("identity.editProfile")}
              </Button>
            </div>
          </Card>
        </div>

        {/* Emotional & Focus Summary */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mood Card */}
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-700 dark:text-gray-200 font-bold">{t("stats.mood")}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent font-extrabold text-3xl">
                    {emotionalSummary.moodAverage.value}%
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm mb-1 font-semibold">
                    {emotionalSummary.moodAverage.label}
                  </span>
                </div>
                <Progress 
                  value={emotionalSummary.moodAverage.value} 
                  className="h-2.5 bg-purple-100/50 dark:bg-purple-900/20"
                />
              </div>
            </Card>

            {/* Focus Card */}
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-md">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-700 dark:text-gray-200 font-bold">{t("stats.focus")}</h3>
              </div>
              <div className="space-y-3">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent font-extrabold text-3xl">
                  {emotionalSummary.focusScore}%
                </span>
                <Progress 
                  value={emotionalSummary.focusScore} 
                  className="h-2.5 bg-blue-100/50 dark:bg-blue-900/20"
                />
              </div>
            </Card>

            {/* Balance Card */}
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-700 dark:text-gray-200 font-bold">{t("stats.balance")}</h3>
              </div>
              <div className="space-y-3">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent font-extrabold text-3xl">
                  {emotionalSummary.balanceIndex}%
                </span>
                <Progress 
                  value={emotionalSummary.balanceIndex} 
                  className="h-2.5 bg-emerald-100/50 dark:bg-emerald-900/20"
                />
              </div>
            </Card>
          </div>

          <Card className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-white/40 dark:border-white/10 shadow-md rounded-2xl p-4 text-center">
            <p className="text-gray-700 dark:text-gray-200 font-semibold italic">
              {t("stats.improvement")}
            </p>
          </Card>
        </div>

        {/* Achievements & Milestones */}
        <div className="space-y-5">
          <h2 className="text-gray-900 dark:text-white font-extrabold text-2xl tracking-tight ml-1">{t("achievements.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={index}
                  className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 space-y-4 hover:-translate-y-2 transition-all cursor-pointer group"
                >
                  <div className="flex justify-center">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform",
                      achievement.color
                    )}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 text-center text-sm font-bold leading-tight">
                    {achievement.label}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Reflections & Activity Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reflections */}
          <div className="space-y-5">
            <h2 className="text-gray-900 dark:text-white font-extrabold text-2xl tracking-tight ml-1">{t("reflections.title")}</h2>
            <div className="space-y-4">
              {recentReflections.map((reflection, index) => (
                <Card
                  key={index}
                  className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 border-l-4 border-l-purple-400"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-inner">
                      {reflection.mood}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-gray-800 dark:text-gray-200 italic font-medium leading-relaxed">&quot;{reflection.quote}&quot;</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{reflection.date}</p>
                    </div>
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                className="w-full rounded-2xl border-2 border-purple-100 dark:border-white/10 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-white/5 font-bold h-12 transition-all"
              >
                {t("reflections.viewAll")}
              </Button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-5">
            <h2 className="text-gray-900 dark:text-white font-extrabold text-2xl tracking-tight ml-1">{t("timeline.title")}</h2>
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-8 h-full">
              <div className="space-y-8 relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-400 via-blue-400 to-transparent opacity-20" />
                {activityTimeline.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-6 relative">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 z-10 shadow-lg ring-4 ring-white dark:ring-slate-900">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 dark:text-gray-200 font-bold text-lg">{activity.action}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* AI Insights */}
        <Card className="backdrop-blur-2xl bg-gradient-to-br from-purple-600/90 to-blue-600/90 border-none shadow-2xl rounded-[2rem] p-10 text-white relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] group-hover:bg-cyan-400/30 transition-all duration-700" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-400/20 rounded-full blur-[100px]" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="w-20 h-20 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-2xl border border-white/30">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h3 className="text-white font-extrabold text-3xl tracking-tight">{t("ai.title")}</h3>
              <p className="text-white/90 text-xl leading-relaxed font-medium">
                {t("ai.insight")}
              </p>
              <Button
                className="rounded-2xl bg-white text-purple-600 hover:bg-gray-100 font-bold h-14 px-8 shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {t("ai.generate")}
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-5 justify-center pb-12">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl rounded-2xl px-10 h-14 font-extrabold text-lg transition-all hover:-translate-y-1">
            <Pencil className="w-5 h-5 mr-2" />
            {t("identity.editProfile")}
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl border-2 border-purple-200 dark:border-white/10 text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-white/5 px-10 h-14 font-extrabold text-lg shadow-lg transition-all hover:-translate-y-1"
          >
            <Share2 className="w-5 h-5 mr-2" />
            {t("identity.shareProgress")}
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl border-2 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/5 px-10 h-14 font-extrabold text-lg shadow-lg transition-all hover:-translate-y-1"
          >
            <Download className="w-5 h-5 mr-2" />
            {t("identity.downloadSummary")}
          </Button>
        </div>
      </main>
    </div>
  );
}
