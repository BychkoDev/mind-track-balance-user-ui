import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("Testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const testimonials = [
    {
      name: "Emma Rodriguez",
      role: t('t1_role'),
      image: "https://images.unsplash.com/photo-1738177111446-5ea95e2c4a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMHBvcnRyYWl0JTIwbmF0dXJhbHxlbnwxfHx8fDE3NjEyNDIxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: t('t1_quote'),
      gradient: "from-purple-400 to-pink-400"
    },
    {
      name: "Michael Chen",
      role: t('t2_role'),
      image: "https://images.unsplash.com/photo-1702017798162-7ba829b0a20f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBlcnNvbiUyMHBlYWNlZnVsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYxMjQyMTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: t('t2_quote'),
      gradient: "from-blue-400 to-teal-400"
    },
    {
      name: "Sarah Johnson",
      role: t('t3_role'),
      image: "https://images.unsplash.com/photo-1758599543111-36ce5c34fceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEyMTczNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: t('t3_quote'),
      gradient: "from-teal-400 to-purple-400"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 h-full flex flex-col">
                {/* Quote icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Quote text */}
                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md flex-shrink-0">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-20`}></div>
                  </div>
                  <div>
                    <h4 className="text-gray-800 dark:text-gray-200">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full blur-3xl -z-10"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-12 text-gray-400"
        >
          <div className="text-center">
            <div className="flex gap-1 mb-2 justify-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-sm">4.9/5 {t('reviewText')}</p>
          </div>
          <div className="h-12 w-px bg-gray-200"></div>
          <p className="text-sm">{t('featured')}</p>
        </motion.div>
      </div>
    </section>
  );
}
