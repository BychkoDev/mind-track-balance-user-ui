"use client";

import { Heart, Brain, TrendingUp, Pause, FileText, Play, Users, Settings, LogOut, User } from "lucide-react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { motion } from "motion/react";
import { useState } from "react";
import { EmotionLogModal } from "@/components/dashboard/EmotionLogModal";

const moodData = [
  { name: "Calm", value: 65, color: "#a78bfa" },
  { name: "Focused", value: 85, color: "#60a5fa" },
  { name: "Distracted", value: 30, color: "#f9a8d4" },
];

const attentionData = [
  { name: "Work", hours: 4, icon: "💼", color: "#60a5fa" },
  { name: "Study", hours: 1.5, icon: "📚", color: "#a78bfa" },
  { name: "Social", hours: 2, icon: "💬", color: "#f9a8d4" },
  { name: "Rest", hours: 1, icon: "🌿", color: "#6ee7b7" },
];

const weeklyTrendData = [
  { day: "Mon", balance: 60 },
  { day: "Tue", balance: 65 },
  { day: "Wed", balance: 58 },
  { day: "Thu", balance: 72 },
  { day: "Fri", balance: 78 },
  { day: "Sat", balance: 82 },
  { day: "Sun", balance: 75 },
];

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-200/30 via-transparent to-cyan-200/30 dark:from-purple-500/10 dark:to-cyan-500/10"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <DashboardHeader />

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-gray-800 dark:text-gray-100 mb-2 font-bold text-3xl">Welcome back, Jordan</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your mindful journey today</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Today's Mood Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/20 shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-gray-800 font-semibold text-xl">Today's Mood</h2>
            </div>

            <div className="space-y-4 mb-6">
              {moodData.map((mood, index) => (
                <div key={mood.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-gray-700">{mood.name}</span>
                    <span className="text-gray-600">{mood.value}%</span>
                  </div>
                  <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mood.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${mood.color}, ${mood.color}dd)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm font-medium">You've maintained focus for 2h 15m today</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30 font-medium"
              >
                Log emotion
              </motion.button>
            </div>
          </motion.div>

          {/* Mindful Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-gradient-to-br from-cyan-400/30 to-purple-400/30 backdrop-blur-lg border border-white/20 shadow-xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
                <Pause className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-800 font-semibold text-lg">Mindful Pause</h3>
            </div>

            <p className="text-gray-700 text-sm mb-6 flex-1">
              Take a 5-second pause before opening social apps. Breathe and set your intention.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-2xl bg-white/80 text-purple-700 font-semibold relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                  "0 0 40px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Pause Now
            </motion.button>
          </motion.div>

          {/* Attention Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 lg:col-span-2 rounded-3xl bg-white/40 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-gray-800 font-semibold text-xl">Attention Insights</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {attentionData.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30 p-4 text-center"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-2xl mb-1 font-bold" style={{ color: item.color }}>
                    {item.hours}h
                  </div>
                  <div className="text-xs text-gray-600 font-medium">{item.name}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attentionData}>
                  <Bar dataKey="hours" radius={[12, 12, 12, 12]}>
                    {attentionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weekly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl bg-white/40 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-gray-800 font-semibold text-xl">Weekly Trends</h2>
            </div>

            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendData}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fill="url(#balanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center p-4 rounded-2xl bg-gradient-to-r from-purple-100/50 to-cyan-100/50">
              <p className="text-sm text-gray-700 font-medium">Your balance improved by</p>
              <p className="text-2xl text-purple-600 font-bold mt-1">+12%</p>
              <p className="text-xs text-gray-600 mt-1">this week</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.4 }}
             className="md:col-span-2 lg:col-span-3 rounded-3xl bg-white/40 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl p-6"
          >
            <h2 className="text-gray-800 mb-6 font-semibold text-xl">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickActionCard
                icon={<FileText className="w-6 h-6" />}
                label="Reflect"
                gradient="from-purple-400 to-pink-400"
                delay={0.5}
              />
              <QuickActionCard
                icon={<Play className="w-6 h-6" />}
                label="Start Session"
                gradient="from-blue-400 to-cyan-400"
                delay={0.55}
              />
              <QuickActionCard
                icon={<TrendingUp className="w-6 h-6" />}
                label="View Report"
                gradient="from-cyan-400 to-green-400"
                delay={0.6}
              />
              <QuickActionCard
                icon={<Users className="w-6 h-6" />}
                label="Community"
                gradient="from-pink-400 to-purple-400"
                delay={0.65}
              />
            </div>
          </motion.div>
        </div>
      </main>
      <EmotionLogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function QuickActionCard({
  icon,
  label,
  gradient,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-3`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
}
