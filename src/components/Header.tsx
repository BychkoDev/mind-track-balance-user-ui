import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Brain, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("Header");

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-gray-800 dark:text-white font-semibold text-lg">
            MindTrack Balance
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            {t('about')}
          </a>
          <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            {t('features')}
          </a>
          <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            {t('pricing')}
          </a>
          <a href="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            {t('signIn')}
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Button className="hidden sm:flex bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:opacity-90 rounded-full px-6 shadow-lg shadow-purple-200/50 transition-all hover:shadow-xl hover:shadow-purple-200/60">
            {t('startFree')}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] flex flex-col pt-0 px-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-l border-gray-200 dark:border-slate-800">
              
              {/* Верхній блок меню: Menu (Зліва), Close (Справа - автоматично) */}
              <div className="relative flex items-center justify-between h-16 border-b border-gray-100 dark:border-slate-800 mt-2">
                <SheetHeader className="absolute left-6 top-1/2 -translate-y-1/2 space-y-0 text-left">
                  <SheetTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                    Menu
                  </SheetTitle>
                  <SheetDescription className="sr-only">Navigation menu</SheetDescription>
                </SheetHeader>
              </div>

              {/* Навігація з відступом зліва (px-8) та нижнім бордером */}
              <nav className="flex flex-col gap-6 text-lg mt-8 px-8 pb-8 border-b border-gray-100 dark:border-slate-800">
                <a href="#about" className="text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 transition-colors">
                  {t('about')}
                </a>
                <a href="#features" className="text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 transition-colors">
                  {t('features')}
                </a>
                <a href="#pricing" className="text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 transition-colors">
                  {t('pricing')}
                </a>
                <a href="/login" className="text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 transition-colors">
                  {t('signIn')}
                </a>
              </nav>
              
              {/* Нижня частина з Appearance, Language та кнопкою Start Free */}
              <div className="mt-8 flex flex-col gap-6 px-8">
                {/* Блок з налаштуванням мови */}
                <div className="w-full flex items-center justify-between border border-gray-100 dark:border-slate-800 p-3 px-4 rounded-xl bg-gray-50 dark:bg-slate-900/50 shadow-sm">
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{t('language')}</span>
                  <LanguageSwitcher />
                </div>

                {/* Блок з налаштуванням теми */}
                <div className="w-full flex items-center justify-between border border-gray-100 dark:border-slate-800 p-3 px-4 rounded-xl bg-gray-50 dark:bg-slate-900/50 shadow-sm">
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{t('appearance')}</span>
                  <ThemeToggle />
                </div>
                
                {/* Центрована кнопка (по центру ширини меню, не на всю ширину) */}
                <div className="flex justify-center mt-2">
                  <Button className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:opacity-90 rounded-full px-8 py-6 text-lg shadow-lg shadow-purple-200/50 transition-all font-medium">
                    {t('startFree')}
                  </Button>
                </div>
              </div>
              
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
