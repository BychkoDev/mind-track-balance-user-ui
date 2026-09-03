"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function PricesPage() {
  const t = useTranslations("Prices");

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 -z-10 transition-colors" />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 py-32 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 text-center max-w-2xl">
          {t("subtitle")}
        </p>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-purple-500/5 p-8 border border-white/50 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t("freePlan")}</h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">$0<span className="text-lg text-gray-500 font-normal">/{t("month")}</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> {t("freeFeature1")}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> {t("freeFeature2")}
              </li>
            </ul>
            <Button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-0 rounded-2xl py-6 font-semibold transition-all">
              {t("currentPlan")}
            </Button>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:to-cyan-500/20 backdrop-blur-xl rounded-3xl shadow-xl shadow-purple-500/20 p-8 border border-purple-500/30 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {t("proBadge")}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{t("proPlan")}</h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">$4.99<span className="text-lg text-gray-500 font-normal">/{t("month")}</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-purple-500">✓</span> {t("proFeature1")}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-500">✓</span> {t("proFeature2")}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-500">✓</span> {t("proFeature3")}
              </li>
            </ul>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 rounded-2xl py-6 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all font-semibold">
              {t("upgradePro")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
