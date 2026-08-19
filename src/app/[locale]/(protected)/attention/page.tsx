"use client";



import { useEffect, useState } from "react";
import { Brain, Clock, Settings, AlertTriangle, Play, Pause } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { motion } from "motion/react";
import { getAttentionStats, getAttentionConfig, upsertAttentionRule, getAttentionTimeline, AttentionStat, AttentionConfig, AttentionTimelineStat } from "./attentionService";
import { useTranslations } from "next-intl";
import { AttentionTimelineChart } from "@/components/attention/AttentionTimelineChart";

export default function AttentionDashboardPage() {
  const t = useTranslations("AttentionDashboard");
  
  const [stats, setStats] = useState<AttentionStat[]>([]);
  const [config, setConfig] = useState<AttentionConfig[]>([]);
  const [timeline, setTimeline] = useState<AttentionTimelineStat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [statsRes, configRes, timelineRes] = await Promise.all([
      getAttentionStats(),
      getAttentionConfig(),
      getAttentionTimeline()
    ]);
    
    if (statsRes.ok) setStats(statsRes.ok);
    if (configRes.ok) setConfig(configRes.ok);
    if (timelineRes.ok) setTimeline(timelineRes.ok);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleTrack = async (domain: string, isTracked?: boolean, isBlocked?: boolean, dailyLimitSec?: number | null) => {
    const res = await upsertAttentionRule(domain, isTracked, isBlocked, dailyLimitSec);
    if (res.ok) {
      await fetchData();
    } else {
      alert("Failed to update rule");
    }
  };

  const totalSeconds = stats.reduce((acc, curr) => acc + curr.durationSec, 0);
  const totalHours = (totalSeconds / 3600).toFixed(1);

  // Merge config and stats to ensure all tracked domains appear in the rules table
  const mergedRulesMap = new Map<string, AttentionConfig>();
  config.forEach(rule => mergedRulesMap.set(rule.domain, rule));
  stats.forEach(stat => {
    if (!mergedRulesMap.has(stat.domain)) {
      mergedRulesMap.set(stat.domain, {
        domain: stat.domain,
        isBlocked: false,
        isTracked: true, // It was tracked by default
        dailyLimitSec: null,
      });
    }
  });
  const mergedRules = Array.from(mergedRulesMap.values());

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900 -z-10" />
      <DashboardHeader />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-gray-800 dark:text-gray-100 mb-2 font-bold text-3xl">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 rounded-3xl bg-white/40 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-gray-800 font-semibold text-xl">{t("overview")}</h2>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-100/50 to-cyan-100/50 dark:from-blue-900/30 dark:to-cyan-900/30 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{t("trackedTime")}</p>
              <p className="text-4xl text-blue-600 dark:text-blue-400 font-bold mt-2">{totalHours}h</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t("topDomains")}</h3>
              {loading ? (
                <p className="text-sm text-gray-500">{t("loading")}</p>
              ) : stats.length === 0 ? (
                <p className="text-sm text-gray-500">{t("noData")}</p>
              ) : (
                stats.slice(0, 5).map((stat, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/50 dark:bg-slate-800/50 p-3 rounded-xl">
                    <span className="font-medium text-gray-700 dark:text-gray-300 truncate w-32">{stat.domain}</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {Math.floor(stat.durationSec / 60)}m
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Config Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-3xl bg-white/40 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-gray-800 font-semibold text-xl">{t("rulesAndLimits")}</h2>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-4 overflow-x-auto">
              {loading ? (
                <p className="text-sm text-gray-500 p-4">{t("loadingRules")}</p>
              ) : mergedRules.length === 0 ? (
                <p className="text-sm text-gray-500 p-4">{t("noRules")}</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-3 px-4 font-medium">{t("domain")}</th>
                      <th className="pb-3 px-4 font-medium text-center">{t("tracking")}</th>
                      <th className="pb-3 px-4 font-medium text-center">Денний Ліміт</th>
                      <th className="pb-3 px-4 font-medium text-center">{t("softPause")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mergedRules.map((rule, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">{rule.domain}</td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleToggleTrack(rule.domain, !rule.isTracked, rule.isBlocked)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                              rule.isTracked 
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                                : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {rule.isTracked ? t("active") : t("ignored")}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <select
                            value={rule.dailyLimitSec || 0}
                            onChange={(e) => {
                              const limit = parseInt(e.target.value);
                              handleToggleTrack(rule.domain, rule.isTracked, rule.isBlocked, limit === 0 ? null : limit);
                            }}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1 text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
                          >
                            <option value={0}>No limit</option>
                            <option value={60}>1m</option>
                            <option value={900}>15m</option>
                            <option value={1800}>30m</option>
                            <option value={3600}>1h</option>
                            <option value={7200}>2h</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => handleToggleTrack(rule.domain, rule.isTracked, !rule.isBlocked)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold flex justify-center items-center gap-1 mx-auto transition-colors ${
                              rule.isBlocked 
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" 
                                : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {rule.isBlocked ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            {rule.isBlocked ? t("on") : t("off")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </div>

        {/* Timeline Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-white/40 dark:bg-slate-900/60 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-gray-800 font-semibold text-xl">{t("timelineTitle") || "Weekly Timeline"}</h2>
          </div>
          
          <div className="h-80 w-full">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">{t("loading")}</p>
              </div>
            ) : (
              <AttentionTimelineChart data={timeline} />
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
