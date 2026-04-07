"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Progress } from "@/components/ui/progress";
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
  MessageSquare
} from "lucide-react";

export default function ProfilePage() {
  // Mock data
  const userProfile = {
    name: "Jordan Balance",
    username: "@jordan.balance",
    motto: "Taking small pauses to stay balanced.",
    memberSince: "January 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  };

  const emotionalSummary = {
    moodAverage: { value: 72, label: "Mostly calm" },
    focusScore: 84,
    balanceIndex: 78,
  };

  const achievements = [
    { icon: Flame, label: "7 days of mindfulness streak", color: "from-orange-400 to-pink-400" },
    { icon: Waves, label: "Completed 10 reflection sessions", color: "from-cyan-400 to-blue-400" },
    { icon: Sun, label: "Improved balance by 15% this month", color: "from-amber-400 to-yellow-300" },
    { icon: Leaf, label: "Focus master - 50 hours logged", color: "from-green-400 to-emerald-400" },
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
    { action: "Started focus mode", time: "2 hours ago", icon: Brain },
    { action: "Logged emotion: Calm", time: "5 hours ago", icon: Heart },
    { action: "Completed reflection", time: "1 day ago", icon: MessageSquare },
    { action: "Shared weekly report", time: "2 days ago", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-8 py-6 space-y-8">
        {/* Profile Identity Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200/40 via-blue-200/40 to-cyan-200/40 rounded-3xl blur-2xl" />
          <Card className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/40 dark:border-white/10 shadow-xl rounded-3xl p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full blur-lg opacity-60 animate-pulse" />
                <Avatar className="relative w-28 h-28 ring-4 ring-white shadow-lg">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white">
                    JB
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold text-3xl">
                  {userProfile.name}
                </h1>
                <p className="text-purple-400 font-medium">{userProfile.username}</p>
                <p className="text-gray-600 dark:text-gray-300 max-w-md italic">&quot;{userProfile.motto}&quot;</p>
                <p className="text-sm text-gray-400">Member since {userProfile.memberSince}</p>
              </div>

              <Button className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg rounded-2xl">
                <Pencil className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </Card>
        </div>

        {/* Emotional & Focus Summary */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-700 dark:text-gray-200 font-semibold">Mood Average</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-3xl">
                    {emotionalSummary.moodAverage.value}%
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm mb-1 font-medium">
                    {emotionalSummary.moodAverage.label}
                  </span>
                </div>
                <Progress 
                  value={emotionalSummary.moodAverage.value} 
                  className="h-2 bg-purple-100"
                />
              </div>
            </Card>

            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-700 dark:text-gray-200 font-semibold">Focus Score</h3>
              </div>
              <div className="space-y-2">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-bold text-3xl">
                  {emotionalSummary.focusScore}%
                </span>
                <Progress 
                  value={emotionalSummary.focusScore} 
                  className="h-2 bg-blue-100"
                />
              </div>
            </Card>

            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-700 dark:text-gray-200 font-semibold">Balance Index</h3>
              </div>
              <div className="space-y-2">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold text-3xl">
                  {emotionalSummary.balanceIndex}%
                </span>
                <Progress 
                  value={emotionalSummary.balanceIndex} 
                  className="h-2 bg-emerald-100"
                />
              </div>
            </Card>
          </div>

          <Card className="backdrop-blur-xl bg-gradient-to-r from-purple-50/80 to-blue-50/80 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              ✨ Your balance improved this month. Keep steady.
            </p>
          </Card>
        </div>

        {/* Achievements & Milestones */}
        <div className="space-y-4">
          <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-xl">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={index}
                  className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6 space-y-4 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-center text-sm font-medium">
                    {achievement.label}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Reflections & Activity Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Reflections */}
          <div className="space-y-4">
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-xl">Recent Reflections</h2>
            <div className="space-y-3">
              {recentReflections.map((reflection, index) => (
                <Card
                  key={index}
                  className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{reflection.mood}</span>
                    <div className="flex-1 space-y-2">
                      <p className="text-gray-700 dark:text-gray-200 italic">&quot;{reflection.quote}&quot;</p>
                      <p className="text-sm text-gray-400">{reflection.date}</p>
                    </div>
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                className="w-full rounded-2xl border-purple-200 text-purple-600 hover:bg-purple-50 font-medium"
              >
                View all reflections
              </Button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-4">
            <h2 className="text-gray-700 dark:text-gray-200 font-semibold text-xl">Activity Timeline</h2>
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-6">
              <div className="space-y-4">
                {activityTimeline.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 relative">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center flex-shrink-0 z-10 relative">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 dark:text-gray-200 font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                      {index < activityTimeline.length - 1 && (
                        <div className="absolute left-[20px] top-[40px] w-px h-10 bg-gradient-to-b from-purple-200 to-transparent" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* AI Insights */}
        <Card className="backdrop-blur-xl bg-gradient-to-r from-purple-100/60 to-blue-100/60 border-white/40 dark:border-white/10 shadow-lg rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-gray-700 dark:text-gray-200 font-semibold text-lg">AI Insight</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You tend to lose focus on Fridays — consider a short reflection before work. Your calm periods are most stable after morning sessions.
              </p>
              <Button
                variant="outline"
                className="rounded-2xl border-purple-300 text-purple-600 hover:bg-purple-50 font-medium"
              >
                Generate new insight
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pb-8">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg rounded-2xl px-8 font-medium">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl border-purple-300 text-purple-600 hover:bg-purple-50 px-8 font-medium"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share My Progress
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl border-gray-300 text-gray-600 dark:text-gray-300 hover:bg-gray-50 px-8 font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Summary (PDF)
          </Button>
        </div>
      </main>
    </div>
  );
}
