"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Preserve the current path, just swap the locale prefix magically!
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 px-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 uppercase">{locale}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-gray-100 dark:border-slate-800 z-[100]">
        <DropdownMenuItem onClick={() => switchLocale('en')} className="flex justify-between font-medium cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
          English {locale === 'en' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('uk')} className="flex justify-between font-medium cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
          Українська {locale === 'uk' && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
