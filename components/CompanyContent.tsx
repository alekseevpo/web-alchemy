'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function CompanyContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <header className="mb-12 sm:mb-16 lg:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
          {t('hero.title')} <span className="block text-gray-500 dark:text-gray-400">{t('hero.titleHighlight')}</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6">
          {t('hero.subtitle')}
        </p>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-500 mb-8">
          {t('header.tagline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#contact" 
            className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
          >
            {t('hero.cta.primary')}
          </a>
          <a 
            href="#services" 
            className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-full hover:border-gray-400 dark:hover:border-gray-600 transition-colors text-center"
          >
            {t('hero.cta.secondary')}
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-8 sm:mb-12">
          {t('services.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200/50 dark:border-gray-800">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
              {t('services.frontend.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('services.frontend.desc')}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200/50 dark:border-gray-800">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
              {t('services.backend.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('services.backend.desc')}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200/50 dark:border-gray-800">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
              {t('services.fullcycle.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('services.fullcycle.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-8 sm:mb-12">
          {t('about.title')}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-center text-xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('about.desc')}
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                {t('about.tech.title')}
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {t('about.tech.list').split(', ').map((tech, index) => (
                  <li key={index}>• {tech}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                {t('about.approach.title')}
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• {t('about.approach.clean')}</li>
                <li>• {t('about.approach.fast')}</li>
                <li>• {t('about.approach.modern')}</li>
                <li>• {t('about.approach.detail')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 sm:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6 sm:mb-8">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12">
            {t('contact.subtitle')}
          </p>
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-2xl shadow-sm">
            <form className="space-y-6">
              <div>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  placeholder={t('contact.form.name')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder={t('contact.form.email')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <textarea 
                  id="message"
                  name="message"
                  placeholder={t('contact.form.message')}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 transition-colors resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {t('contact.form.submit')}
              </button>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              {t('contact.form.or')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
