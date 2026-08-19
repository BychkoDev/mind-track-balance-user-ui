"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

interface DashboardChartsProps {
  entries: Record<string, unknown>[];
}

export function DashboardCharts({ entries }: DashboardChartsProps) {
  const chartData = useMemo(() => {
    if (!entries || entries.length === 0) return [];
    
    // Reverse to show chronological order (assuming entries are sorted DESC)
    const reversed = [...entries].reverse();
    
    return reversed.map(entry => {
      const date = new Date(entry.createdAt as string);
      return {
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        mood: entry.mood as number,
        energy: (entry.energy as number) || 0,
        stress: (entry.stressLevel as number) || 0,
      };
    });
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/40 shadow-xl mb-8 flex flex-col items-center justify-center h-64">
        <Activity className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">No data available for charts yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/40 shadow-xl mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Metrics Overview</h2>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Last 7 Days</p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
            />
            <Area type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
            <Area type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
