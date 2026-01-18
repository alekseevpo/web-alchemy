'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type TeamRole = {
  key: 'design' | 'frontend' | 'backend' | 'qa' | 'devops';
  title: { ru: string; en: string; es: string };
  description: { ru: string; en: string; es: string };
};

type Person = {
  key: string;
  name: { ru: string; en: string; es: string };
  role: { ru: string; en: string; es: string };
  bio: { ru: string; en: string; es: string };
  initials: string;
  photoSrc?: string;
  photoPosition?: string;
  linkedinUrl?: string;
};

type TeamMember = {
  key: string;
  initials: string;
  name: { ru: string; en: string; es: string };
  title: { ru: string; en: string; es: string };
  meta?: { ru: string; en: string; es: string };
  education?: { ru: string; en: string; es: string };
  bullets: { ru: string[]; en: string[]; es: string[] };
  photoSrc?: string;
  avatarSize?: 'sm' | 'lg';
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
    key: 'devops',
    title: { ru: 'DevOps/Инфраструктура', en: 'DevOps/Infrastructure', es: 'DevOps/Infraestructura' },
    description: {
      ru: 'CI/CD, мониторинг, окружения, безопасность и стабильность.',
      en: 'CI/CD, monitoring, environments, security & stability.',
      es: 'CI/CD, monitoreo, entornos, seguridad y estabilidad.',
    },
  },
];

const teamByRole: Record<TeamRole['key'], TeamMember[]> = {
  design: [
    {
      key: 'designer-1',
      initials: 'JG',
      name: { ru: 'Joel Grevo', en: 'Joel Grevo', es: 'Joel Grevo' },
      title: { ru: 'UX/UI дизайн', en: 'UX/UI Design', es: 'Diseño UX/UI' },
      meta: {
        ru: '35 лет • Нижний Новгород — Мадрид',
        en: '35 years • Nizhny Novgorod — Madrid',
        es: '35 años • Nizhny Novgorod — Madrid',
      },
      education: {
        ru: 'Московский технический институт',
        en: 'Moscow Technical Institute',
        es: 'Instituto Técnico de Moscú',
      },
      // Put Joel photo here: public/team/joel-grevo.jpeg
      photoSrc: '/team/joel-grevo.jpeg',
      avatarSize: 'lg',
      bullets: {
        ru: ['Прототипы и user flows', 'Макеты под мобайл/десктоп', 'Компоненты дизайн‑системы'],
        en: ['Prototypes and user flows', 'Mobile/desktop layouts', 'Design system components'],
        es: ['Prototipos y flujos', 'Diseños móvil/escritorio', 'Componentes de sistema de diseño'],
      },
    },
    {
      key: 'designer-2',
      initials: 'DP',
      name: { ru: 'Daryna Postolaki', en: 'Daryna Postolaki', es: 'Daryna Postolaki' },
      title: { ru: 'UI и визуал', en: 'UI & Visual', es: 'UI y Visual' },
      meta: {
        ru: '27 лет • Ужгород — Мадрид',
        en: '27 years • Uzhhorod — Madrid',
        es: '27 años • Uzhhorod — Madrid',
      },
      education: {
        ru: 'Ужгородский Национальный Университет',
        en: 'Uzhhorod National University',
        es: 'Universidad Nacional de Uzhhorod',
      },
      bullets: {
        ru: ['Типографика и сетки', 'Иконки/иллюстрации', 'Состояния и анимации'],
        en: ['Typography and grids', 'Icons/illustrations', 'States and micro-animations'],
        es: ['Tipografía y rejillas', 'Iconos/ilustraciones', 'Estados y micro‑animaciones'],
      },
    },
  ],
  frontend: [
    {
      key: 'fe-1',
      initials: 'FE',
      name: { ru: 'Frontend #1', en: 'Frontend #1', es: 'Frontend #1' },
      title: { ru: 'Next.js / React', en: 'Next.js / React', es: 'Next.js / React' },
      bullets: {
        ru: ['Компоненты и UI', 'i18n и темы', 'Оптимизация загрузки'],
        en: ['Components and UI', 'i18n and themes', 'Loading optimization'],
        es: ['Componentes y UI', 'i18n y temas', 'Optimización de carga'],
      },
    },
    {
      key: 'fe-2',
      initials: 'A11',
      name: { ru: 'Frontend #2', en: 'Frontend #2', es: 'Frontend #2' },
      title: { ru: 'Доступность и качество', en: 'Accessibility & Quality', es: 'Accesibilidad y Calidad' },
      bullets: {
        ru: ['A11y и семантика', 'Тесты UI', 'Code review и стандарты'],
        en: ['A11y and semantics', 'UI tests', 'Code review & standards'],
        es: ['A11y y semántica', 'Tests UI', 'Revisión de código y estándares'],
      },
    },
  ],
  backend: [
    {
      key: 'be-1',
      initials: 'BE',
      name: { ru: 'Backend #1', en: 'Backend #1', es: 'Backend #1' },
      title: { ru: 'API и доменная логика', en: 'API & Domain logic', es: 'API y lógica de dominio' },
      bullets: {
        ru: ['FastAPI/REST', 'PostgreSQL схемы', 'RBAC и безопасность'],
        en: ['FastAPI/REST', 'PostgreSQL schemas', 'RBAC & security'],
        es: ['FastAPI/REST', 'Esquemas PostgreSQL', 'RBAC y seguridad'],
      },
    },
    {
      key: 'be-2',
      initials: 'INT',
      name: { ru: 'Backend #2', en: 'Backend #2', es: 'Backend #2' },
      title: { ru: 'Интеграции', en: 'Integrations', es: 'Integraciones' },
      bullets: {
        ru: ['CRM/CSV/XML', 'Очереди/таски', 'Логи и мониторинг'],
        en: ['CRM/CSV/XML', 'Queues/background jobs', 'Logs & monitoring'],
        es: ['CRM/CSV/XML', 'Colas/tareas', 'Logs y monitoreo'],
      },
    },
  ],
  qa: [
    {
      key: 'qa-1',
      initials: 'QA',
      name: { ru: 'Otto Harahonych', en: 'Otto Harahonych', es: 'Otto Harahonych' },
      title: { ru: 'Ручное тестирование', en: 'Manual QA', es: 'QA manual' },
      meta: {
        ru: '37 лет • Ужгород',
        en: '37 years • Uzhhorod',
        es: '37 años • Uzhhorod',
      },
      education: {
        ru: 'Ужгородский Торгово‑Экономический Институт',
        en: 'Uzhhorod Trade and Economic Institute',
        es: 'Instituto de Comercio y Economía de Uzhhorod',
      },
      // Put Otto photo here: public/team/otto-harahonych.jpeg
      // photoSrc: '/team/otto-harahonych.jpeg', // File doesn't exist yet
      bullets: {
        ru: ['Тест‑планы и чек‑листы', 'Регресс', 'Приёмка фич'],
        en: ['Test plans and checklists', 'Regression', 'Feature acceptance'],
        es: ['Planes y checklists', 'Regresión', 'Aceptación de features'],
      },
    },
  ],
  devops: [
    {
      key: 'devops-1',
      initials: 'DO',
      name: { ru: 'DevOps #1', en: 'DevOps #1', es: 'DevOps #1' },
      title: { ru: 'CI/CD и окружения', en: 'CI/CD & Environments', es: 'CI/CD y entornos' },
      bullets: {
        ru: ['Deploy/rollback', 'Секреты и доступы', 'Наблюдаемость'],
        en: ['Deploy/rollback', 'Secrets & access', 'Observability'],
        es: ['Deploy/rollback', 'Secretos y accesos', 'Observabilidad'],
      },
    },
  ],
};

const pmLead: Person = {
  key: 'pm-lead',
  name: {
    ru: 'Павел Алексеев',
    en: 'Pavel Alekseev',
    es: 'Pavel Alekseev',
  },
  role: {
    ru: 'PM & DevOps',
    en: 'PM & DevOps',
    es: 'PM & DevOps',
  },
  bio: {
    ru: 'Отвечаю за roadmap, планирование, коммуникацию и синхронизацию команды. Контролирую сроки, риски, стабильность инфраструктуры и качество результата.',
    en: 'I own the roadmap, planning, and team coordination. I manage timelines, risks, infrastructure stability, and delivery quality.',
    es: 'Me encargo del roadmap, la planificación y la coordinación del equipo. Gestiono plazos, riesgos, estabilidad de la infraestructura y calidad.',
  },
  initials: 'PM',
  // Put your real photo here: public/team/founder.jpg
  photoSrc: '/team/founder.jpeg',
  // focus a bit higher to keep face centered for portrait-style photos
  photoPosition: '50% 18%',
};

function Avatar({
  alt,
  initials,
  size,
  photoSrc,
  photoPosition,
}: {
  alt: string;
  initials: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  photoSrc?: string;
  photoPosition?: string;
}) {
  const boxClass =
    size === 'md'
      ? 'h-36 w-36 sm:h-40 sm:w-40 rounded-md'
      : size === 'xl'
        ? 'h-48 w-48 rounded-sm'
        : size === 'lg'
          ? 'h-24 w-24 rounded-sm'
          : 'h-12 w-12 rounded-sm';

  const textClass = size === 'md' ? 'text-lg sm:text-xl' : 'text-sm';
  const [imgSrc, setImgSrc] = useState<string>(photoSrc || '/team-placeholder.svg');
  const isPlaceholder = imgSrc === '/team-placeholder.svg';

  return (
    <div className={`relative ${boxClass} overflow-hidden`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={size === 'xl' ? '192px' : size === 'lg' ? '96px' : size === 'md' ? '160px' : '48px'}
        className="object-cover"
        style={photoPosition ? { objectPosition: photoPosition } : undefined}
        onError={() => setImgSrc('/team-placeholder.svg')}
        unoptimized={imgSrc.endsWith('.svg')}
      />
      {isPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-semibold text-white ${textClass}`}>{initials}</span>
        </div>
      )}
    </div>
  );
}

function RoleIcon({ role }: { role: TeamRole['key'] }) {
  const common = 'w-6 h-6';
  const stroke = 'currentColor';

  switch (role) {
    case 'design':
      // Pencil / design
      return (
        <svg className={common} fill="none" stroke={stroke} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16.862 3.487a2.25 2.25 0 013.182 3.182L8.25 18.463 4 19.5l1.037-4.25L16.862 3.487z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5l4 4" />
        </svg>
      );
    case 'frontend':
      // Code brackets
      return (
        <svg className={common} fill="none" stroke={stroke} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l-6-6 6-6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 6l6 6-6 6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4l-4 16" />
        </svg>
      );
    case 'backend':
      // Server
      return (
        <svg className={common} fill="none" stroke={stroke} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 14a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8h.01M8 16h.01" />
        </svg>
      );
    case 'qa':
      // Check / shield
      return (
        <svg className={common} fill="none" stroke={stroke} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V7l8-4z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'devops':
      // Cloud (infrastructure / deploy)
      return (
        <svg className={common} fill="none" stroke={stroke} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 18a4 4 0 010-8 5 5 0 019.7-1.7A4 4 0 1117 18H7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 16v-5m0 0l-2 2m2-2l2 2"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function DevelopersPage() {
  const { language, t } = useLanguage();

  const founderTitle =
    language === 'ru'
      ? 'Основатель / Руководитель проекта'
      : language === 'es'
        ? 'Fundador / Líder de proyecto'
        : 'Founder / Project lead';

  const founder = useMemo(() => {
    const dob = new Date(1985, 7, 29); // 29.08.1985 (month is 0-based)
    const now = new Date();
    let years = now.getFullYear() - dob.getFullYear();
    const hasHadBirthdayThisYear =
      now.getMonth() > dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
    if (!hasHadBirthdayThisYear) years -= 1;

    const ageLine =
      language === 'ru'
        ? `Возраст: ${years}`
        : language === 'es'
          ? `Edad: ${years}`
          : `Age: ${years}`;

    const cityLine =
      language === 'ru'
        ? 'Город: Санкт‑Петербург'
        : language === 'es'
          ? 'Ciudad: San Petersburgo'
          : 'City: Saint Petersburg';

    const expLine =
      language === 'ru'
        ? 'Опыт в разработке: 20+ лет'
        : language === 'es'
          ? 'Experiencia en desarrollo: 20+ años'
          : 'Development experience: 20+ years';

    const educationTitle =
      language === 'ru'
        ? 'Образование'
        : language === 'es'
          ? 'Educación'
          : 'Education';

    const edu1 =
      language === 'ru'
        ? 'Санкт‑Петербургский государственный университет экономики и финансов'
        : language === 'es'
          ? 'Universidad Estatal de Economía y Finanzas de San Petersburgo'
          : 'Saint Petersburg State University of Economics and Finance';

    const edu2 =
      language === 'ru'
        ? 'Санкт‑Петербургский техникум отраслевых технологий, финансов и права'
        : language === 'es'
          ? 'Instituto Técnico de Tecnologías Industriales, Finanzas y Derecho de San Petersburgo'
          : 'Saint Petersburg College of Industrial Technologies, Finance and Law';

    return {
      years,
      ageLine,
      cityLine,
      expLine,
      educationTitle,
      edu1,
      edu2,
    };
  }, [language]);

  const teamIntro = useMemo(() => {
    if (language === 'ru') {
      return {
        title: 'Наша команда',
        subtitle: 'МЫ команда, которая проектирует, разрабатывает и поддерживает продукты. Мы открытые и нам доверяют. Мы говорим на языке клиента и нас понимают.',
        note: 'Роли, подход и команда — в одном месте.',
        howWeWorkTitle: 'Как мы работаем',
        howWeWorkText:
          'Планируем спринтами, фиксируем требования, ведём прозрачную отчётность и регулярно показываем результат.',
      };
    }
    if (language === 'es') {
      return {
        title: 'Nuestro equipo',
        subtitle: 'SOMOS un equipo que diseña, desarrolla y mantiene productos. Somos abiertos y confían en nosotros. Hablamos el idioma del cliente y nos entienden.',
        note: 'Roles, enfoque y equipo — en un solo lugar.',
        howWeWorkTitle: 'Cómo trabajamos',
        howWeWorkText:
          'Planificamos por sprints, fijamos requisitos, reportamos de forma transparente y mostramos avances de forma regular.',
      };
    }
    return {
      title: 'Our team',
      subtitle: 'WE are a team that designs, develops, and maintains products. We are open and trusted. We speak the client\'s language and are understood.',
      note: 'Roles, approach, and team — in one place.',
      howWeWorkTitle: 'How we work',
      howWeWorkText:
        'We plan in sprints, lock requirements, report transparently, and demo progress regularly.',
    };
  }, [language]);

  const title =
    language === 'ru'
      ? teamIntro.title
      : language === 'es'
        ? teamIntro.title
        : teamIntro.title;

  const subtitle =
    language === 'ru'
      ? teamIntro.subtitle
      : language === 'es'
        ? teamIntro.subtitle
        : teamIntro.subtitle;

  const note = teamIntro.note;

  return (
    <div className="min-h-screen bg-[#fefbf6] dark:bg-transparent transition-colors duration-300 overflow-x-hidden">
      <div className="overflow-x-hidden">
        <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:px-8 lg:pt-28 lg:px-8" style={{ animation: 'none' }}>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{subtitle}</p>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{note}</p>
          </header>

          {/* PM Lead (single, top) */}
          <section className="ui-glass-menu rounded-2xl p-5 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              <Avatar
                alt={pmLead.name[language]}
                initials={pmLead.initials}
                size="xl"
                photoSrc={pmLead.photoSrc}
                photoPosition={pmLead.photoPosition}
              />
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {pmLead.name[language]}
                </h2>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {founderTitle}
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {pmLead.role[language]}
                </p>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {pmLead.bio[language]}
                </p>
              </div>
            </div>

            {/* Details below */}
            <div className="mt-5 sm:mt-6 border-t border-gray-200/20 dark:border-gray-700/30 pt-4 sm:pt-5">
              <div className="grid gap-1 text-sm text-gray-700 dark:text-gray-300">
                <div>{founder.ageLine}</div>
                <div>{founder.cityLine}</div>
                <div>{founder.expLine}</div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {founder.educationTitle}
                </div>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>{founder.edu1}</li>
                  <li>{founder.edu2}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Roles */}
          <section className="grid gap-4 sm:gap-5">
            {roles.map((role) => (
              <div key={role.key} className="ui-glass-menu rounded-xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-sm bg-white/10 dark:bg-white/5 border border-gray-200/10 dark:border-gray-700/20 flex items-center justify-center text-gray-700 dark:text-gray-200">
                    <RoleIcon role={role.key} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {role.title[language]}
                    </h3>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {role.description[language]}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  {teamByRole[role.key].map((m) => (
                    <div
                      key={m.key}
                      className="rounded-lg border border-gray-200/10 dark:border-gray-700/20 p-3"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar
                          alt={m.name[language]}
                          initials={m.initials}
                          size={m.avatarSize ?? 'sm'}
                          photoSrc={m.photoSrc}
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {m.name[language]}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                            {m.title[language]}
                          </div>
                          {m.meta?.[language] && (
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                              {m.meta[language]}
                            </div>
                          )}
                          {m.education?.[language] && (
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                              {m.education[language]}
                            </div>
                          )}
                        </div>
                      </div>
                      <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                        {m.bullets[language].map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* How we work */}
          <section id="process" className="mt-6 ui-glass-menu rounded-2xl p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {teamIntro.howWeWorkTitle}
            </h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {teamIntro.howWeWorkText}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

