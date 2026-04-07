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
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-blue-200/30 to-cyan-200/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
      
      <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-foreground font-semibold text-xl">{title}</h3>
        </div>

        {/* Card Content */}
        <div className="space-y-5">
          {children}
        </div>
      </div>
    </div>
  );
}
