import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Heart, Sun, Moon } from "lucide-react";
import { useTranslations } from "next-intl";

export function WeeklyInsights() {
  const t = useTranslations("WeeklyInsights");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const insights = [
    {
      icon: Heart,
      title: t('insight1_title'),
      metric: "+23%",
      description: t('insight1_desc'),
      gradient: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10"
    },
    {
      icon: Sun,
      title: t('insight2_title'),
      metric: "87%",
      description: t('insight2_desc'),
      gradient: "from-orange-400 to-yellow-400",
      bgGradient: "from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10"
    },
    {
      icon: TrendingUp,
      title: t('insight3_title'),
      metric: "5 days",
      description: t('insight3_desc'),
      gradient: "from-blue-400 to-teal-400",
      bgGradient: "from-blue-50 to-teal-50 dark:from-blue-900/10 dark:to-teal-900/10"
    },
    {
      icon: Moon,
      title: t('insight4_title'),
      metric: "32 min",
      description: t('insight4_desc'),
      gradient: "from-indigo-400 to-purple-400",
      bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10"
    }
  ];

  return (
    <section ref={ref} className="py-32 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent leading-tight">
            {t('title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${insight.bgGradient} rounded-3xl p-6 shadow-lg border border-white/60 dark:border-white/10 backdrop-blur-sm h-full`}>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${insight.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <insight.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-gray-800 dark:text-gray-200 mb-2">{insight.title}</h3>
                <div className={`text-4xl mb-2 bg-gradient-to-r ${insight.gradient} bg-clip-text text-transparent`}>
                  {insight.metric}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{insight.description}</p>

                {/* Progress indicator */}
                <div className="mt-4 h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "75%" } : {}}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${insight.gradient} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional visualization */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-8 shadow-xl border border-white/60 dark:border-white/10"
        >
          <h3 className="text-gray-800 dark:text-gray-200 mb-6 text-center">{t('journeyTitle')}</h3>
          <div className="flex items-end justify-around h-48 gap-4">
            {[65, 78, 55, 82, 70, 88, 75].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${height}%` } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="flex-1 bg-gradient-to-t from-purple-400 via-blue-400 to-teal-400 rounded-t-2xl shadow-lg hover:shadow-xl transition-shadow"
              />
            ))}
          </div>
          <div className="flex justify-around mt-4 text-sm text-gray-500">
            <span>{t('days.0')}</span>
            <span>{t('days.1')}</span>
            <span>{t('days.2')}</span>
            <span>{t('days.3')}</span>
            <span>{t('days.4')}</span>
            <span>{t('days.5')}</span>
            <span>{t('days.6')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
