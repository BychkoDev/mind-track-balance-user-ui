"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Sparkles, Brain, Clock } from "lucide-react";
import { FetchLatestAdvice, GenerateAdvice } from "@/app/[locale]/(protected)/dashboard/dashboardService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
export function WeeklyInsightsCard() {
  const t = useTranslations("Profile");
  const [advice, setAdvice] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [daysUntilNext, setDaysUntilNext] = useState<number | null>(null);

  const calculateTimer = useCallback((createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const daysSince = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSince < 7) {
      setDaysUntilNext(7 - daysSince);
    } else {
      setDaysUntilNext(null);
    }
  }, []);

  useEffect(() => {
    FetchLatestAdvice().then(data => {
      if (data) {
        setAdvice(data);
        calculateTimer(data.createdAt as string);
      }
    }).catch(console.error);
  }, [calculateTimer]);

  const handleGenerate = async () => {
    setIsLoading(true);
    const data = await GenerateAdvice();
    if (data) {
      if (data.error) {
        // Assume backend returns { error: "You can generate a new advice in X days." }
        alert(data.error);
      } else {
        setAdvice(data);
        calculateTimer(data.createdAt as string);
      }
    }
    setIsLoading(false);
  };

  return (
    <Card className="backdrop-blur-2xl bg-gradient-to-br from-purple-600/90 to-blue-600/90 border-none shadow-2xl rounded-[2rem] p-10 text-white relative overflow-hidden group">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] group-hover:bg-cyan-400/30 transition-all duration-700" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-400/20 rounded-full blur-[100px]" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
        <div className="w-20 h-20 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-2xl border border-white/30">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h3 className="text-white font-extrabold text-3xl tracking-tight">{t("ai.title")}</h3>
          
          <div className="space-y-4">
            <p className="text-white/90 text-xl leading-relaxed font-medium">
              {advice ? String(advice.content) : t("ai.insight")}
            </p>
            {advice && !!(advice.relatedTopics && Array.isArray(advice.relatedTopics) && advice.relatedTopics.length > 0) && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-4 border-t border-white/20">
                {(advice.relatedTopics as string[]).map((topic: string) => (
                  <span key={topic} className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white shadow-sm uppercase tracking-wider border border-white/30">
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            {daysUntilNext !== null ? (
              <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-100 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <Clock className="w-4 h-4" />
                Next insight available in {daysUntilNext} {daysUntilNext === 1 ? 'day' : 'days'}
              </div>
            ) : (
              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="rounded-2xl bg-white text-purple-600 hover:bg-gray-100 font-bold h-14 px-8 shadow-xl transition-all hover:scale-105 active:scale-95 border-none"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isLoading ? "Generating..." : t("ai.generate")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
