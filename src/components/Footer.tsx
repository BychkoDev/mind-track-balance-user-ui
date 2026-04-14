import { Brain, MessageCircle, Camera, Briefcase, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">MindTrack Balance</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              {t('tagline')}
            </p>
            
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="mb-4">{t('product')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('features')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('pricing')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('download')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('community')}</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="mb-4">{t('company')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('blog')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('careers')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t('contact')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('cookie')}</a>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-400">{t('copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
