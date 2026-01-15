'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

type TeamRole = {
  key: 'design' | 'frontend' | 'backend' | 'qa' | 'pm' | 'devops';
  title: { ru: string; en: string; es: string };
  description: { ru: string; en: string; es: string };
};

const roles: TeamRole[] = [
  {
    key: 'design',
    title: { ru: 'Дизайнеры', en: 'Designers', es: 'Diseñadores' },
    description: {
      ru: 'UX/UI, дизайн-система, прототипирование, адаптивные макеты.',
      en: 'UX/UI, design system, prototyping, responsive layouts.',
      es: 'UX/UI, sistema de diseño, prototipado, diseños responsivos.',
    },
  },
  {
    key: 'frontend',
    title: { ru: 'Frontend разработчики', en: 'Frontend developers', es: 'Desarrolladores frontend' },
    description: {
      ru: 'Next.js/React, доступность, производительность, интеграции.',
      en: 'Next.js/React, accessibility, performance, integrations.',
      es: 'Next.js/React, accesibilidad, rendimiento, integraciones.',
    },
  },
  {
    key: 'backend',
    title: { ru: 'Backend разработчики', en: 'Backend developers', es: 'Desarrolladores backend' },
    description: {
      ru: 'API, БД, безопасность, интеграции CRM/импорты.',
      en: 'API, DB, security, CRM integrations/imports.',
      es: 'API, BD, seguridad, integraciones CRM/importaciones.',
    },
  },
  {
    key: 'qa',
    title: { ru: 'Тестировщики', en: 'QA engineers', es: 'Ingenieros QA' },
    description: {
      ru: 'План тестирования, регресс, автоматизация, тест-репорты.',
      en: 'Test plan, regression, automation, test reports.',
      es: 'Plan de pruebas, regresión, automatización, reportes.',
    },
  },
  {
    key: 'pm',
    title: { ru: 'Продакт/PM', en: 'Product/PM', es: 'Producto/PM' },
    description: {
      ru: 'Планирование, коммуникация, roadmap, контроль сроков.',
      en: 'Planning, communication, roadmap, timeline control.',
      es: 'Planificación, comunicación, roadmap, control de plazos.',
    },
  },
  {
    key: 'devops',
    title: { ru: 'DevOps/Инфраструктура', en: 'DevOps/Infrastructure', es: 'DevOps/Infraestructura' },
    description: {
      ru: 'CI/CD, мониторинг, окружения, безопасность и стабильность.',
      en: 'CI/CD, monitoring, environments, security & stability.',
      es: 'CI/CD, monitoreo, entornos, seguridad y estabilidad.',
    },
  },
];

export function DevelopersPage() {
  const { language } = useLanguage();

  const title =
    language === 'ru'
      ? 'Разработчики проекта'
      : language === 'es'
        ? 'Desarrolladores del proyecto'
        : 'Project developers';

  const subtitle =
    language === 'ru'
      ? 'Команда, которая проектирует, разрабатывает и поддерживает продукт.'
      : language === 'es'
        ? 'El equipo que diseña, desarrolla y mantiene el producto.'
        : 'The team that designs, builds, and maintains the product.';

  const note =
    language === 'ru'
      ? 'Профили и состав команды можно заполнить позже — структура страницы уже готова.'
      : language === 'es'
        ? 'Los perfiles y el equipo se pueden completar más tarde: la estructura de la página ya está lista.'
        : 'You can fill in profiles later — the page structure is already ready.';

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-black transition-colors duration-300">
      <div className="lg:pl-72">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:px-8 lg:pt-24 lg:pr-8">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{subtitle}</p>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{note}</p>
          </header>

          <section className="grid gap-4 sm:gap-5">
            {roles.map((role) => (
              <div
                key={role.key}
                className="ui-glass-menu rounded-xl p-4 sm:p-5"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {role.title[language]}
                </h2>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {role.description[language]}
                </p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

