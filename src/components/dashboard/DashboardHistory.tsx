"use client";

import { motion } from "motion/react";
import { History, Calendar, Smile, Zap, Activity } from "lucide-react";

import { useState, useEffect, useCallback } from "react";
import { FetchEntries } from "@/app/[locale]/(protected)/dashboard/dashboardService";

export function DashboardHistory() {
  const [entries, setEntries] = useState<Record<string, unknown>[]>([]);
  const [limit, setLimit] = useState(10);
  const [range, setRange] = useState<"all" | "week" | "month">("all");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadHistory = useCallback(async (isLoadMore = false) => {
    setIsLoading(true);
    let startDate: Date | undefined;
    if (range === "week") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === "month") {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    }

    const fetched = await FetchEntries({ limit, skip: isLoadMore ? offset : 0, startDate });
    
    if (fetched.length < limit) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

    if (isLoadMore) {
      setEntries(prev => [...prev, ...fetched]);
    } else {
      setEntries(fetched);
    }
    setIsLoading(false);
  }, [limit, offset, range]);

  useEffect(() => {
    // Reset offset when limit or range changes
    setOffset(0);
    setHasMore(true);
  }, [limit, range]);

  useEffect(() => {
    loadHistory(offset > 0);
  }, [loadHistory, offset]);

  const handleLoadMore = () => {
    setOffset(prev => prev + limit);
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case "POSITIVE": return "🌟";
      case "NEGATIVE": return "🌧️";
      case "NEUTRAL":
      default: return "☁️";
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/40 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <History className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Recent Logs</h2>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">History</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex bg-white/50 rounded-xl p-1 backdrop-blur-sm">
          {(["all", "week", "month"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all ${
                range === r ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {r === "all" ? "Всі" : r === "week" ? "Тиждень" : "Місяць"}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Показувати:</span>
          <select 
            value={limit} 
            onChange={(e) => setLimit(Number(e.target.value))}
            className="bg-white/70 border-none rounded-lg text-sm font-bold text-gray-700 py-1.5 px-3 outline-none"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
        {entries.length === 0 && !isLoading && (
          <p className="text-gray-500 text-center py-4 italic">Немає записів за цей період.</p>
        )}
        {entries.map((entry, idx) => {
          const date = new Date(entry.createdAt as string);
          const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const dateString = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={entry.uuid as string} 
              className="bg-white/60 rounded-2xl p-4 border border-white/40 hover:bg-white/80 transition-all shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  {dateString} • {timeString}
                </div>
                {!!entry.aiSentiment && (
                  <div className="text-lg" title={`AI Sentiment: ${String(entry.aiSentiment)}`}>
                    {getSentimentEmoji(String(entry.aiSentiment))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mb-3 text-sm font-semibold text-gray-600">
                <div className="flex items-center gap-1">
                  <Smile className="w-4 h-4 text-purple-500" />
                  {Number(entry.mood)}/5
                </div>
                {!!entry.energy && (
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-amber-500" />
                    {Number(entry.energy)}/5
                  </div>
                )}
                {!!entry.stressLevel && (
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4 text-red-500" />
                    {Number(entry.stressLevel)}/5
                  </div>
                )}
              </div>

              {!!entry.description && (
                <p className="text-gray-700 text-sm mb-3 italic">
                  &quot;{String(entry.description)}&quot;
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {(entry.contexts as string[])?.map((ctx: string) => (
                  <span key={ctx} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-600 uppercase">
                    {ctx}
                  </span>
                ))}
                {(entry.tags as Record<string, unknown>[])?.map((tag: Record<string, unknown>) => (
                  <span key={(tag.uuid || tag.name) as string} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-600 uppercase">
                    #{tag.name as string}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
        
        {hasMore && entries.length > 0 && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-6 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-full font-bold text-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? "Завантаження..." : "Завантажити ще"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
