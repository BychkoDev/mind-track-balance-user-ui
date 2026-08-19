"use client";

import { useTranslations } from "next-intl";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { AttentionTimelineStat } from "@/app/[locale]/(protected)/attention/attentionService";
import { useMemo } from "react";

// Generate distinct colors for domains
const COLORS = [
  "#8b5cf6", // purple
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

export function AttentionTimelineChart({ data }: { data: AttentionTimelineStat[] }) {
  const t = useTranslations("AttentionDashboard");

  // Format data for stacked bar chart: [{ date: "Aug 12", "youtube.com": 2.5, "mail.google.com": 1.2 }, ...]
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const groupedByDate: Record<string, any> = {};
    const domainsSet = new Set<string>();

    data.forEach(stat => {
      // Format date
      const dateObj = new Date(stat.date);
      const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      
      if (!groupedByDate[dateStr]) {
        groupedByDate[dateStr] = { date: dateStr };
      }
      
      const hours = stat.durationSec / 3600;
      groupedByDate[dateStr][stat.domain] = Number(hours.toFixed(2));
      domainsSet.add(stat.domain);
    });

    // Fill missing domain values with 0 so recharts tooltips look good
    const domains = Array.from(domainsSet);
    const result = Object.values(groupedByDate).map(item => {
      domains.forEach(d => {
        if (item[d] === undefined) item[d] = 0;
      });
      return item;
    });

    return { result, domains };
  }, [data]);

  if (chartData.length === 0 || !chartData.result.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">{t("noData")}</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData.result} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}h`} />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: 'none', color: '#fff' }}
          itemStyle={{ color: '#fff' }}
          formatter={(value: number, name: string) => [`${value}h`, name]}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
        {chartData.domains.map((domain, index) => (
          <Bar key={domain} dataKey={domain} stackId="a" fill={COLORS[index % COLORS.length]} radius={
            // Round top corners of the top-most bar for visual Polish, but this is stacked, so it's complicated.
            // Better to keep it simple.
            [0, 0, 0, 0]
          } />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
