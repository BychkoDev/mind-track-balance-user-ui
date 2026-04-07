import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function PauseBeforeScroll() {
  const t = useTranslations("PauseBeforeScroll");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isInView && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, countdown]);

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
            {t('title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          {/* Phone mockup with pause screen */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl">
            <div className="bg-gradient-to-br from-purple-100/90 via-blue-100/90 to-pink-100/90 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
              <div className="relative h-[600px] flex flex-col items-center justify-center p-8">
                {/* Blurred background hint */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-200/20 to-blue-200/20 backdrop-blur-sm"></div>
                
                {/* Pause content */}
                <div className="relative z-10 text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-32 h-32 mx-auto mb-8 bg-white rounded-full shadow-xl flex items-center justify-center"
                  >
                    {/* SVG Progress / Spinning Circle */}
                    <motion.svg 
                      className="absolute inset-0 w-full h-full" 
                      viewBox="0 0 128 128"
                      // Rotate continuously only when countdown is 0
                      animate={countdown === 0 ? { rotate: [0, 360] } : { rotate: -90 }}
                      transition={countdown === 0 ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0 }}
                    >
                      {/* Definitions for gradient */}
                      <defs>
                        <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#C084FC" />
                        </linearGradient>
                      </defs>
                      
                      {/* Progress track */}
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="url(#timer-gradient)"
                        strokeWidth="4"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: 2 * Math.PI * 60, strokeDashoffset: 0 }}
                        animate={{ 
                          // Drain during countdown, switch to a 35% arc when done
                          strokeDashoffset: countdown === 0 
                            ? (2 * Math.PI * 60) * 0.65 
                            : (2 * Math.PI * 60) * (1 - countdown / 5) 
                        }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    </motion.svg>
                    
                    {/* Inner content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        key={countdown}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center"
                      >
                        {countdown > 0 ? (
                          <span className="text-5xl text-gray-900 font-light tabular-nums">{countdown}</span>
                        ) : (
                          <svg className="w-12 h-12 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="space-y-4">
                    <h3 className="text-2xl text-gray-800">{t('takeBreath')}</h3>
                    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                      {t('quote')}
                    </p>
                  </div>

                  {/* Breathing indicator */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mt-12 flex items-center justify-center gap-2"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* App icons hint */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-red-400 shadow-lg"></div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg"></div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
