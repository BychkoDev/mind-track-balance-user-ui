"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 -z-10 transition-colors" />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 py-32 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-purple-500/5 p-8 md:p-12 border border-white/50 w-full prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {t("content")}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
