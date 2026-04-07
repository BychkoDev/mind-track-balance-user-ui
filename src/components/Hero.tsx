import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Sparkles, Brain, Clock, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Landing");
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-900 pt-20">
      {/* Animated background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl max-w-4xl mx-auto mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-gray-100 dark:via-white dark:to-gray-100 bg-clip-text text-transparent leading-tight">
            {t('title1')} <br className="hidden md:block" /> {t('title2')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <Button className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:opacity-90 rounded-full px-8 py-6 shadow-2xl shadow-purple-300/50 transition-all hover:shadow-3xl hover:shadow-purple-300/60">
            {t('beginJourney')}
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-6 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all">
            {t('watchDemo')}
          </Button>
        </motion.div>

        {/* Hero visual - dashboard mockup */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-white/10 p-8 relative overflow-hidden">
            {/* Floating icons */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Brain className="w-8 h-8 text-purple-600" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-4 left-4 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Heart className="w-8 h-8 text-blue-600" />
            </motion.div>
            <motion.div
              animate={{ y: [-8, 12, -8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 left-8 w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Clock className="w-7 h-7 text-teal-600" />
            </motion.div>

            {/* Dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-100/80 to-blue-100/80 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="text-gray-700 dark:text-gray-200">Mood Timeline</h3>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full w-4/5"></div>
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full w-3/5"></div>
                  <div className="h-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full w-full"></div>
                  <div className="h-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full w-2/3"></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-100/80 to-blue-100/80 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <h3 className="text-gray-700 dark:text-gray-200">Focus Balance</h3>
                </div>
                <div className="flex items-end justify-around h-32">
                  <div className="w-12 bg-gradient-to-t from-teal-400 to-teal-300 rounded-t-lg h-20"></div>
                  <div className="w-12 bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg h-28"></div>
                  <div className="w-12 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-lg h-16"></div>
                  <div className="w-12 bg-gradient-to-t from-pink-400 to-pink-300 rounded-t-lg h-24"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
