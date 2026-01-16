'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function CompanyContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <header className="mb-16 sm:mb-20 lg:mb-24 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 leading-[1.1]">
          {t('hero.companyName')}
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-[1.1]">
          {t('hero.title')}{' '}
          <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent mt-2">
            {t('hero.titleHighlight')}
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-4 leading-relaxed max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-500 mb-10">
          {t('header.tagline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3.5 min-w-[180px] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('hero.cta.primary')}
          </a>
          <a 
            href="#services" 
            className="inline-flex items-center justify-center px-8 py-3.5 min-w-[180px] border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 font-medium hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('hero.cta.secondary')}
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-12 sm:mb-16">
          {t('services.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {/* WebApp Card */}
          <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-3 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 dark:from-blue-900/0 dark:via-blue-900/0 dark:to-blue-900/0 group-hover:from-blue-50/30 group-hover:via-blue-50/20 group-hover:to-blue-50/10 dark:group-hover:from-blue-900/20 dark:group-hover:via-blue-900/10 dark:group-hover:to-blue-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Icon container with background */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/50">
                <span className="text-3xl">🚀</span>
              </div>
            </div>
            
            <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {t('services.webapp.title')}
            </h3>
            <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              {t('services.webapp.desc')}
            </p>
          </div>

          {/* Business Card Website */}
          <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:-translate-y-3 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/0 to-purple-50/0 dark:from-purple-900/0 dark:via-purple-900/0 dark:to-purple-900/0 group-hover:from-purple-50/30 group-hover:via-purple-50/20 group-hover:to-purple-50/10 dark:group-hover:from-purple-900/20 dark:group-hover:via-purple-900/10 dark:group-hover:to-purple-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Icon container with background */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/50">
                <span className="text-3xl">💼</span>
              </div>
            </div>
            
            <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              {t('services.businesscard.title')}
            </h3>
            <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              {t('services.businesscard.desc')}
            </p>
          </div>

          {/* Landing Pages Card */}
          <div className="group relative bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:-translate-y-3 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-50/0 dark:from-emerald-900/0 dark:via-emerald-900/0 dark:to-emerald-900/0 group-hover:from-emerald-50/30 group-hover:via-emerald-50/20 group-hover:to-emerald-50/10 dark:group-hover:from-emerald-900/20 dark:group-hover:via-emerald-900/10 dark:group-hover:to-emerald-900/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Icon container with background */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-emerald-500/50">
                <span className="text-3xl">📄</span>
              </div>
            </div>
            
            <h3 className="relative text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
              {t('services.landing.title')}
            </h3>
            <p className="relative text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              {t('services.landing.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-12 sm:mb-16 text-center">
          {t('about.title')}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-center text-xl mb-16 text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {t('about.desc')}
          </p>
          
          {/* Our Stack Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 text-center">
              {t('about.tech.title')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('about.tech.desc')}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.typescript')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.vue')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.django')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.tailwind')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.vite')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.tech.nextjs')}
                </p>
              </div>
            </div>
          </div>

          {/* Our Approach Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 text-center">
              {t('about.approach.title')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('about.approach.desc')}
            </p>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.clean')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.cleanDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.fast')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.fastDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.modern')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.modernDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.detail')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.detailDesc')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('about.approach.market')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('about.approach.marketDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/30 rounded-3xl p-8 sm:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6 sm:mb-8">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-14 leading-relaxed">
            {t('contact.subtitle')}
          </p>
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-800">
            <form className="space-y-6">
              <div>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  placeholder={t('contact.form.name')}
                  className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder={t('contact.form.email')}
                  className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <textarea 
                  id="message"
                  name="message"
                  placeholder={t('contact.form.message')}
                  rows={5}
                  className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 transition-all duration-200 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('contact.form.submit')}
              </button>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
              {t('contact.form.or')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
