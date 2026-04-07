import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Smile, TrendingUp, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmotionTracking() {
  const t = useTranslations("EmotionTracking");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Smile,
      title: t('feature1_title'),
      description: t('feature1_desc')
    },
    {
      icon: TrendingUp,
      title: t('feature2_title'),
      description: t('feature2_desc')
    },
    {
      icon: Shield,
      title: t('feature3_title'),
      description: t('feature3_desc')
    }
  ];

  return (
    <section ref={ref} className="py-32 bg-white dark:bg-slate-950 transition-colors" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Right side - visual */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 dark:from-slate-800 dark:to-slate-900 rounded-[3rem] p-4 shadow-2xl max-w-sm mx-auto border border-gray-700 dark:border-slate-700">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900/50 dark:to-slate-800/50 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-gray-800 dark:text-gray-200">{t('todayMood')}</h3>
                        <span className="text-2xl">😊</span>
                      </div>
                      
                      {/* Mood graph */}
                      <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-4 shadow-sm border dark:border-slate-700">
                        <div className="flex items-end justify-around h-40 gap-2">
                          <div className="flex flex-col items-center gap-1 flex-1">
                            <div className="w-full bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-lg h-24"></div>
                            <span className="text-xs text-gray-500">{t('days.0')}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 flex-1">
                            <div className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg h-32"></div>
                            <span className="text-xs text-gray-500">{t('days.1')}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 flex-1">
                            <div className="w-full bg-gradient-to-t from-teal-400 to-teal-300 rounded-t-lg h-20"></div>
                            <span className="text-xs text-gray-500">{t('days.2')}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 flex-1">
                            <div className="w-full bg-gradient-to-t from-purple-400 to-pink-300 rounded-t-lg h-28"></div>
                            <span className="text-xs text-gray-500">{t('days.3')}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 flex-1">
                            <div className="w-full bg-gradient-to-t from-blue-400 to-purple-300 rounded-t-lg h-36"></div>
                            <span className="text-xs text-gray-500">{t('days.4')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Emotion tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">{t('calm')}</span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">{t('focused')}</span>
                        <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm">{t('happy')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating element */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-purple-100 dark:border-slate-700"
              >
                <div className="text-center">
                  <div className="text-3xl mb-1">✨</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t('streak')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Left side - content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent leading-tight">
              {t('title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
              {t('description')}
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 30, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-800 dark:text-gray-200 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
