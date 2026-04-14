import { ReactNode } from "react";

interface SettingsCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function SettingsCard({ icon, title, children }: SettingsCardProps) {
  return (
    <div className="relative group">
      {/* Glassmorphic card with gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-blue-200/30 to-cyan-200/30 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/60 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Card Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 flex items-center justify-center ring-1 ring-purple-500/20 dark:ring-purple-500/40">
            {icon}
          </div>
          <h3 className="text-gray-800 dark:text-gray-100 font-bold text-xl tracking-tight">{title}</h3>
        </div>

        {/* Card Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
