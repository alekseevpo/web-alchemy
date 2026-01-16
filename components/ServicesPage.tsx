'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Footer } from '@/components/Footer';

export function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-12 xl:px-16">
          <header className="mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-6 leading-[1.1]">
              {t('services.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              {t('services.subtitle') || 'Мы предлагаем полный спектр услуг по разработке веб-приложений'}
            </p>
          </header>

          {/* Services Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {/* WebApp Card */}
              <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 dark:from-blue-900/0 dark:via-blue-900/0 dark:to-blue-900/0 group-hover:from-blue-50/30 group-hover:via-blue-50/20 group-hover:to-blue-50/10 dark:group-hover:from-blue-900/20 dark:group-hover:via-blue-900/10 dark:group-hover:to-blue-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
                
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/50">
                    <span className="text-3xl">🚀</span>
                  </div>
                </div>
                
                <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {t('services.webapp.title')}
                </h3>
                <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-4">
                  {t('services.webapp.desc')}
                </p>
                <div className="relative mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('services.webapp.price') || 'От 500€'}
                  </p>
                </div>
              </div>

              {/* Business Card Website */}
              <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:-translate-y-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/0 to-purple-50/0 dark:from-purple-900/0 dark:via-purple-900/0 dark:to-purple-900/0 group-hover:from-purple-50/30 group-hover:via-purple-50/20 group-hover:to-purple-50/10 dark:group-hover:from-purple-900/20 dark:group-hover:via-purple-900/10 dark:group-hover:to-purple-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
                
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/50">
                    <span className="text-3xl">💼</span>
                  </div>
                </div>
                
                <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {t('services.businesscard.title')}
                </h3>
                <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-4">
                  {t('services.businesscard.desc')}
                </p>
                <div className="relative mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('services.businesscard.price') || 'От 300€'}
                  </p>
                </div>
              </div>

              {/* Landing Pages Card */}
              <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:-translate-y-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-50/0 dark:from-emerald-900/0 dark:via-emerald-900/0 dark:to-emerald-900/0 group-hover:from-emerald-50/30 group-hover:via-emerald-50/20 group-hover:to-emerald-50/10 dark:group-hover:from-emerald-900/20 dark:group-hover:via-emerald-900/10 dark:group-hover:to-emerald-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
                
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-emerald-500/50">
                    <span className="text-3xl">📄</span>
                  </div>
                </div>
                
                <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {t('services.landing.title')}
                </h3>
                <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-4">
                  {t('services.landing.desc')}
                </p>
                <div className="relative mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('services.landing.price') || 'От 400€'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/30 rounded-3xl p-8 sm:p-12 lg:p-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {t('services.cta.title') || 'Готовы начать проект?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('services.cta.desc') || 'Свяжитесь с нами для обсуждения вашего проекта и получения персонального предложения'}
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 min-w-[180px] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('services.cta.button') || 'Обсудить проект'}
            </a>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
