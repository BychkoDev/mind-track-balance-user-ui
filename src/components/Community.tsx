import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Users, MessageCircle, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslations } from "next-intl";

export function Community() {
  const t = useTranslations("Community");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - visual */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Illustration placeholder */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1673515336549-c52dd4aeafc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsJTIwc3VwcG9ydCUyMGZyaWVuZHMlMjB0b2dldGhlcnxlbnwxfHx8fDE3NjEyNDIxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Mindful community support"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-purple-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"></div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{t('sharedName')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('sharedAction')}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-teal-100 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <p className="text-sm text-gray-800 dark:text-gray-200">143 {t('online')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent leading-tight">
              {t('title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
              {t('description')}
            </p>

            <div className="space-y-6">
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-gray-800 dark:text-gray-200 mb-1">{t('feature1_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-500">{t('feature1_desc')}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-gray-800 dark:text-gray-200 mb-1">{t('feature2_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-500">{t('feature2_desc')}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-gray-800 dark:text-gray-200 mb-1">{t('feature3_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-500">{t('feature3_desc')}</p>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              <div className="text-center">
                <div className="text-3xl mb-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">2.5K+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('members')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">150+</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('posts')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-1 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">98%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('supported')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
