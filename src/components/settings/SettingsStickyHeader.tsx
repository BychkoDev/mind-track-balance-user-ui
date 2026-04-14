"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Save, RotateCcw, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface SettingsStickyHeaderProps {
  isVisible: boolean;
  isSaving: boolean;
  onSave: () => void;
  onReset: () => void;
}

export function SettingsStickyHeader({ 
  isVisible, 
  isSaving, 
  onSave, 
  onReset 
}: SettingsStickyHeaderProps) {
  const t = useTranslations("Settings");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-4 sm:gap-8 px-6 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] max-w-2xl w-full justify-between overflow-hidden relative group"
          >
            {/* Subtle gradient background for the bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center animate-pulse">
                <AlertCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 hidden sm:block">
                {t("stickyHeader.unsavedChanges") || "You have unsaved changes"}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 relative z-10">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-10 px-4 rounded-xl text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 font-bold transition-all"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t("actions.reset") || "Reset"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-extrabold text-gray-900 dark:text-white">
                      {t("resetDialog.title") || "Are you absolutely sure?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500 dark:text-gray-400 text-lg">
                      {t("resetDialog.description") || "This will revert all changes you've made since loading this page. This action cannot be undone."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel className="rounded-2xl h-12 px-6 border-gray-200 dark:border-white/10 font-bold">
                      {t("actions.cancel") || "Cancel"}
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={onReset}
                      className="rounded-2xl h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold"
                    >
                      {t("actions.confirmReset") || "Yes, reset changes"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button 
                size="sm"
                onClick={onSave}
                disabled={isSaving}
                className="h-10 px-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all active:scale-95"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t("actions.save") || "Save"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
