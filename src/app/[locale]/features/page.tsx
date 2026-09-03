"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { HeartPulse, Timer, ShieldBan, BrainCircuit, BarChart3, Users } from "lucide-react";

export default function FeaturesPage() {
  const t = useTranslations("Features");

  const features = [
    {
      icon: <HeartPulse className="w-8 h-8 text-pink-500" />,
      title: t("f1_title"),
      desc: t("f1_desc"),
      bg: "bg-pink-500/10 dark:bg-pink-500/20",
    },
    {
      icon: <Timer className="w-8 h-8 text-blue-500" />,
      title: t("f2_title"),
      desc: t("f2_desc"),
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
    },
    {
      icon: <ShieldBan className="w-8 h-8 text-red-500" />,
      title: t("f3_title"),
      desc: t("f3_desc"),
      bg: "bg-red-500/10 dark:bg-red-500/20",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
      title: t("f4_title"),
      desc: t("f4_desc"),
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
      title: t("f5_title"),
      desc: t("f5_desc"),
      bg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    },
    {
      icon: <Users className="w-8 h-8 text-teal-500" />,
      title: t("f6_title"),
      desc: t("f6_desc"),
      bg: "bg-teal-500/10 dark:bg-teal-500/20",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 -z-10 transition-colors" />
      <Header />
      
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 py-32 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("heroSubtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-20">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-purple-500/5 p-8 border border-white/50 hover:shadow-purple-500/10 transition-shadow duration-300 flex flex-col items-start"
            >
              <div className={`p-4 rounded-2xl mb-6 ${feature.bg}`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-[3rem] p-12 text-center w-full max-w-4xl shadow-2xl shadow-purple-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            {t("ctaTitle")}
          </h2>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/login">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 rounded-full px-8 py-6 text-lg font-bold shadow-xl transition-all">
                {t("ctaButtonPrimary")}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
