"use client";

import { Brain, User, Settings, LogOut, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { logout } from "@/app/[locale]/(protected)/logout";
import { useStore } from "@/store/useStore";

export function DashboardHeader() {
  const clearUser = useStore((state) => state.logout);
  const user = useStore((state) => state.user);

  const handleLogout = async () => {
    clearUser();
    await logout();
  };
  return (
    <header className="relative z-10 border-b border-white/20 dark:border-white/10 backdrop-blur-sm bg-white/40 dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-800 dark:text-white font-semibold">
              MindTrack Balance
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a
              href="/dashboard"
              className="text-purple-600 dark:text-purple-400"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Insights
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Community
            </a>
            <a
              href="/settings"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Settings
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-cyan-400 text-white font-bold uppercase">
                      {(user?.fullName || user?.login || "ME").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-white/20 dark:border-white/10 dark:text-white"
              >
                <DropdownMenuItem className="focus:bg-slate-100 dark:focus:bg-slate-800">
                  <User className="w-4 h-4 mr-2" />
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-slate-100 dark:focus:bg-slate-800">
                  <Settings className="w-4 h-4 mr-2" />
                  <a href="/settings">Settings</a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 dark:text-red-400 focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Бургер меню для мобільних */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] flex flex-col pt-0 px-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-l border-gray-200 dark:border-slate-800"
              >
                {/* Верхній блок меню */}
                <div className="relative flex items-center justify-between h-16 border-b border-gray-100 dark:border-slate-800 mt-2">
                  <SheetHeader className="absolute left-6 top-1/2 -translate-y-1/2 space-y-0 text-left">
                    <SheetTitle className="text-xl font-semibold bg-gradient-to-br from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                      Navigation
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Dashboard menu
                    </SheetDescription>
                  </SheetHeader>
                </div>

                {/* Навігація з відступом зліва (px-8) та нижнім бордером */}
                <nav className="flex flex-col gap-6 text-lg mt-8 px-8 pb-8 border-b border-gray-100 dark:border-slate-800">
                  <a
                    href="/dashboard"
                    className="text-purple-600 dark:text-purple-400 font-medium transition-colors"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#insights"
                    className="text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 transition-colors"
                  >
                    Insights
                  </a>
                  <a
                    href="#community"
                    className="text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 transition-colors"
                  >
                    Community
                  </a>
                  <a
                    href="/settings"
                    className="text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 transition-colors"
                  >
                    Settings
                  </a>
                </nav>

                {/* Нижня частина з Appearance */}
                <div className="mt-8 flex flex-col gap-6 px-8">
                  <div className="w-full flex items-center justify-between border border-gray-100 dark:border-slate-800 p-3 px-4 rounded-xl bg-gray-50 dark:bg-slate-900/50 shadow-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      Appearance
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
