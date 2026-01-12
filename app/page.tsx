import CommentSection from '@/components/CommentSection';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/Footer';
import { TableOfContents } from '@/components/TableOfContents';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ContactButtons } from '@/components/ContactButtons';
import { getGiscusConfig } from '@/lib/env';

export default function Home() {
  const giscusConfig = getGiscusConfig();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <TableOfContents />
      <ScrollToTop />
      {/* Переключатель темы - фиксирован вверху справа */}
      <div className="fixed top-4 right-4 z-50 lg:right-6">
        <ThemeToggle />
      </div>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:px-8 lg:px-12 lg:pt-24 lg:ml-64">
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            Техническое задание
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Платформа для покупки/продажи недвижимости в Испании
          </p>
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
            Версия: MVP • Дата: {new Date().toLocaleDateString('ru-RU')}
          </div>
        </header>

        {/* Общее описание */}
        <section id="overview" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            1. Общее описание проекта
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Проект представляет собой комплексное решение для рынка недвижимости в Испании 
              состоящее из двух взаимосвязанных веб-приложений.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>B2B-платформа</strong> — закрытая система для агентств недвижимости 
                с функционалом управления объектами, компаниями и данными
              </li>
              <li>
                <strong>B2C-сайт-каталог</strong> — публичный сайт для конечных клиентов 
                с возможностью просмотра и поиска недвижимости
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              B2C-сайт получает данные из B2B-платформы через REST API. 
              Оба приложения должны иметь адаптивную верстку (desktop / tablet / mobile).
            </p>
          </div>
        </section>

        {/* Технический стек */}
        <section id="tech-stack" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            2. Технический стек
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
              2.1 Backend
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Рекомендация: FastAPI (Python)</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Быстрая разработка и высокая производительность</li>
                <li>Автоматическая генерация документации API (Swagger/OpenAPI)</li>
                <li>Отличная поддержка асинхронности</li>
                <li>Простота интеграции с PostgreSQL</li>
                <li>Хорошая экосистема для работы с изображениями и файлами</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                Альтернатива: Node.js (Express/Fastify) — допустима если команда предпочитает JavaScript/TypeScript
              </p>
            </div>

            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
              2.2 Frontend
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Рекомендация: React + Next.js</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Большая экосистема и сообщество</li>
                <li>Next.js обеспечивает SSR и оптимизацию для SEO (важно для B2C-сайта)</li>
                <li>Отличная поддержка адаптивной верстки</li>
                <li>Широкий выбор библиотек UI-компонентов</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                Альтернатива: Vue.js + Nuxt.js — также отличный выбор, особенно если команда имеет опыт с Vue.
              </p>
            </div>

            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
              2.3 База данных
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Рекомендация: PostgreSQL</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Надежность и соответствие ACID</li>
                <li>Отличная поддержка полнотекстового поиска</li>
                <li>Мощные возможности для геопространственных данных (PostGIS, если понадобиться)</li>
                <li>Хорошая масштабируемость</li>
                <li>Бесплатная и open-source</li>
              </ul>
            </div>

            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
              2.4 Дополнительные технологии
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>REST API:</strong> JSON формат, стандартные HTTP методы</li>
              <li><strong>Адаптивная верстка:</strong> CSS (Tailwind CSS / CSS Modules), mobile-first подход</li>
              <li><strong>Система контроля версий:</strong> Git (GitHub / GitLab)</li>
              <li><strong>Безопасность:</strong> HTTPS, JWT для аутентификации, RBAC для ролей</li>
              <li><strong>Хранилище файлов:</strong> AWS S3 / Cloudinary / локальное хранилище (для MVP)</li>
            </ul>
          </div>
        </section>

        {/* B2B Платформа */}
        <section id="b2b-platform" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            3. B2B-платформа для агентств недвижимости
          </h2>
          
          <div className="space-y-8">
            {/* Пользователи и роли */}
            <div id="b2b-users" className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                3.1 Пользователи и их роли
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Регистрация компаний (агентств):</strong> Компании регистрируются через форму 
                  указывая базовую информацию (название, регион, контакты)
                </li>
                <li>
                  <strong>Роли пользователей:</strong>
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li><strong>Владелец компании</strong> — полный доступ к управлению компанией и объектами</li>
                    <li><strong>Агент</strong> — возможность добавления/редактирования объектов, ограниченный доступ к настройкам компании</li>
                    <li><strong>Администратор платформы</strong> — управление компаниями, модерация, блокировка</li>
                  </ul>
                </li>
                <li>
                  <strong>Аутентификация:</strong>
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>Email / пароль (обязательно)</li>
                    <li>Быстрая регистрация и аутентификация через Google (OAuth 2.0)</li>
                  </ul>
                </li>
                <li>
                  <strong>Статусы компании:</strong>
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li><strong>Активна</strong> — компания может полноценно работать</li>
                    <li><strong>На модерации</strong> — ожидает проверки администратором</li>
                    <li><strong>Заблокирована</strong> — доступ ограничен, объекты не публикуются</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Профиль компании */}
            <div id="b2b-company-profile" className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                3.2 Профиль компании (внутренний)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Внутренний профиль компании, доступный только авторизованным пользователям платформы:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Название компании</strong></li>
                <li><strong>Логотип компании</strong> (загрузка изображения)</li>
                <li><strong>Регион работы</strong> с указанием регистрации в Испании</li>
                <li><strong>Статус верификации компании</strong> (верифицирована / не верифицирована)</li>
                <li><strong>Агрегированный рейтинг</strong> (возможна интеграция с Trust Pilot или внутренний расчет)</li>
                <li><strong>Список объектов компании</strong> с описаниями и подробными деталями</li>
                <li>Контактная информация (email, телефон, адрес офиса)</li>
                <li>История активности (дата регистрации, последнее обновление)</li>
              </ul>
            </div>

            {/* Объекты недвижимости */}
            <div id="b2b-properties" className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                3.3 Объекты недвижимости
              </h3>
              
              <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-6 mb-3">
                Функционал
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Добавление нового объекта недвижимости</li>
                <li>Редактирование существующего объекта</li>
                <li>Удаление объекта (soft delete — объект помечается как удаленный, но остается в БД)</li>
                <li>Загрузка фотографий объекта (минимум 1, рекомендуется 3–10)</li>
                <li>Короткое описание объекта (для карточек и превью, до 200 символов)</li>
                <li>Развернутое подробное описание объекта (неограниченное количество символов поддержка форматирования)</li>
                <li>Статусы объекта: <strong>активен</strong> / <strong>зарезервирован</strong> / <strong>продан</strong></li>
              </ul>

              <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-6 mb-3">
                Поля объекта (обязательные и опциональные)
              </h4>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li><strong>Тип недвижимости</strong> (обязательно): новостройка / вторичка / в процессе строительства</li>
                  <li><strong>Цена</strong> (обязательно): числовое значение в евро</li>
                  <li><strong>Регион / город</strong> (обязательно): выбор из списка регионов/городов Испании</li>
                  <li><strong>Площадь</strong> (обязательно): в квадратных метрах</li>
                  <li><strong>Количество спальных комнат</strong> (обязательно): числовое значение</li>
                  <li><strong>Количество санузлов</strong> (обязательно): числовое значение</li>
                  <li><strong>Описание</strong> (обязательно): короткое и развернутое</li>
                  <li><strong>Компания-владелец</strong> (автоматически): привязка к компании пользователя</li>
                  <li><strong>Год постройки / сдачи</strong> (опционально): для новостроек — год сдачи, для вторички — год постройки</li>
                  <li><strong>Дата публикации</strong> (автоматически): дата создания объекта</li>
                  <li><strong>Дата последнего обновления</strong> (автоматически): обновляется при каждом изменении</li>
                  <li><strong>Фотографии</strong> (обязательно минимум 1): загрузка изображений</li>
                </ul>
              </div>
            </div>

            {/* Поиск и фильтры */}
            <div id="b2b-search" className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                3.4 Поиск и фильтры (B2B)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Поиск и фильтрация объектов недвижимости на платформе:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Регион / город</strong> — выбор из списка (в рамках Испании)</li>
                <li><strong>Тип недвижимости</strong> — новостройка / вторичка / в процессе строительства</li>
                <li><strong>Цена</strong> — диапазон min / max (в евро)</li>
                <li><strong>Площадь</strong> — диапазон min / max (в м²)</li>
                <li><strong>Спальни</strong> — количество спальных комнат (точное значение или диапазон)</li>
                <li><strong>Статус объекта</strong> — активен / зарезервирован / продан</li>
                <li><strong>Компания</strong> — фильтр по компании-владельцу</li>
                <li><strong>Текстовый поиск</strong> — поиск по описанию, адресу</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                Результаты должны отображаться в виде списка с пагинацией (например, 20 объектов на страницу).
              </p>
            </div>

            {/* Загрузка данных */}
            <div id="b2b-upload" className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                3.5 Загрузка данных
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Способы добавления объектов недвижимости в систему:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Ручное добавление объектов</strong> — через веб-интерфейс (форма создания объекта)
                </li>
                <li>
                  <strong>Импорт через CSV / Excel</strong> — массовая загрузка объектов:
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>Загрузка файла через интерфейс</li>
                    <li>Валидация данных</li>
                    <li>Предпросмотр перед импортом</li>
                    <li>Обработка ошибок и отчет о результатах импорта</li>
                  </ul>
                </li>
                <li>
                  <strong>API-интеграция для загрузки объектов из внешних CRM</strong> (1–2 источника):
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>Настройка подключения к внешнему API</li>
                    <li>Периодическая синхронизация (по расписанию или по запросу)</li>
                    <li>Маппинг полей из внешнего формата в формат платформы</li>
                    <li>Обработка конфликтов (обновление существующих объектов)</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Рейтинг компаний */}
            <div id="b2b-rating" className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                3.6 Рейтинг компаний (B2B)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Автоматически рассчитываемый рейтинг компаний на основе метрик:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Актуальность объектов</strong> — процент объектов, обновленных за последние 30/60/90 дней
                </li>
                <li>
                  <strong>Частота обновлений</strong> — средняя частота обновления объектов компании
                </li>
                <li>
                  <strong>Количество активных объектов</strong> — общее число объектов со статусом "активен"
                </li>
                <li>
                  <strong>Жалобы / флаги</strong> (минимально) — учитываются жалобы на объекты компании 
                  снижают рейтинг
                </li>
              </ul>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mt-4 shadow-sm border border-gray-200/50 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Важно:</strong> Рейтинг рассчитывается автоматически, без текстовых отзывов. 
                  Формула расчета должна быть прозрачной и настраиваемой администратором
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* B2C Сайт */}
        <section id="b2c-site" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            4. B2C-сайт-каталог недвижимости
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Публичный сайт для конечных клиентов получающий данные из B2B-платформы через REST API.
            </p>
            
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
              4.1 Основной функционал
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Каталог объектов</strong> — отображение всех активных объектов недвижимости
              </li>
              <li>
                <strong>Карточка объекта</strong> — детальная страница с фотографиями, описанием, характеристиками
              </li>
              <li>
                <strong>Поиск и фильтры</strong> — аналогично B2B-платформе (регион, тип, цена, площадь, спальни)
              </li>
              <li>
                <strong>Информация о компании</strong> — отображение данных компании-владельца объекта 
                (название, логотип, рейтинг, контакты)
              </li>
              <li>
                <strong>Связь с компанией</strong> — форма обратной связи или кнопка для связи с агентством
              </li>
            </ul>

            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
              4.2 Требования к отображению
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Адаптивная верстка (desktop / tablet / mobile)</li>
              <li>Оптимизация изображений (lazy loading, ресайзинг)</li>
              <li>Быстрая загрузка страниц (оптимизация производительности)</li>
              <li>SEO-оптимизация (мета-теги структурированные данные для поисковых систем)</li>
            </ul>

            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
              4.3 API интеграция
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              B2C-сайт получает данные через REST API от B2B-платформы:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Список объектов (с фильтрацией и пагинацией)</li>
              <li>Детальная информация об объекте</li>
              <li>Информация о компаниях</li>
              <li>Поисковые запросы</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              API должен быть публичным (без аутентификации для чтения) или использовать публичный API-ключ
            </p>
          </div>
        </section>

        {/* Безопасность */}
        <section id="security" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            5. Безопасность
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>HTTPS</strong> — обязательное использование SSL/TLS сертификатов</li>
              <li>
                <strong>Аутентификация</strong> — JWT токены для аутентификации пользователей B2B-платформы
              </li>
              <li>
                <strong>Роли и права доступа (RBAC)</strong> — разграничение доступа по ролям 
                (владелец компании, агент, администратор)
              </li>
              <li>
                <strong>Валидация данных</strong> — проверка всех входящих данных на сервере
              </li>
              <li>
                <strong>Защита от SQL-инъекций</strong> — использование ORM и параметризованных запросов
              </li>
              <li>
                <strong>Защита от XSS</strong> — санитизация пользовательского контента
              </li>
              <li>
                <strong>Rate limiting</strong> — ограничение количества запросов к API (базовая защита от DDoS)
              </li>
              <li>
                <strong>Хранение паролей</strong> — хеширование паролей (bcrypt / argon2)
              </li>
            </ul>
          </div>
        </section>

        {/* Этапы разработки */}
        <section id="development-stages" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            6. Этапы разработки (MVP)
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Этап 1: Базовая инфраструктура
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Настройка проекта и инфраструктуры</li>
                  <li>Настройка базы данных</li>
                  <li>Базовая структура API</li>
                  <li>Система аутентификации</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Этап 2: B2B-платформа (основной функционал)
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Регистрация и управление компаниями</li>
                  <li>Система ролей и прав доступа</li>
                  <li>CRUD операции для объектов недвижимости</li>
                  <li>Загрузка изображений</li>
                  <li>Базовый поиск и фильтры</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Этап 3: B2C-сайт
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Интеграция с API B2B-платформы</li>
                  <li>Каталог объектов</li>
                  <li>Детальные страницы объектов</li>
                  <li>Поиск и фильтры</li>
                  <li>Адаптивная верстка</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Этап 4: Дополнительный функционал
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Импорт через CSV/Excel</li>
                  <li>API-интеграция с внешними CRM (1 источник)</li>
                  <li>Система рейтингов компаний</li>
                  <li>Оптимизация и тестирование</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Дополнительные требования */}
        <section id="additional" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            7. Дополнительные требования и примечания
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <strong>MVP подход</strong> — фокус на основной функциональности, без лишней сложности 
                Дополнительные функции могут быть добавлены в следующих итерациях.
              </li>
              <li>
                <strong>Документация</strong> — должна быть предоставлена техническая документация API 
                и инструкции по развертыванию
              </li>
              <li>
                <strong>Тестирование</strong> — базовое тестирование критических функций (аутентификация 
                создание объектов, поиск).
              </li>
              <li>
                <strong>Многоязычность</strong> — на этапе MVP поддерживается русский, испанский и английский языки 
                (интерфейс B2B-платформы). B2C-сайт по умолчанию на испанском
              </li>
              <li>
                <strong>Мобильная версия</strong> — обязательна адаптивная верстка для всех экранов 
                (минимальная ширина: 320px)
              </li>
            </ul>
          </div>
        </section>

        {/* Оценка разработки */}
        <section id="estimation" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            8. Оценка разработки
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                Временные рамки
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Этап 1: Анализ и проектирование</strong> — 1-2 недели
                </li>
                <li>
                  <strong>Этап 2: Backend разработка (B2B-платформа)</strong> — 6-8 недель
                </li>
                <li>
                  <strong>Этап 3: Frontend разработка (B2B-платформа)</strong> — 4-6 недель
                </li>
                <li>
                  <strong>Этап 4: B2C-сайт разработка</strong> — 3-4 недели
                </li>
                <li>
                  <strong>Этап 5: Интеграция и тестирование</strong> — 2-3 недели
                </li>
                <li>
                  <strong>Этап 6: Деплой и финальная настройка</strong> — 1 неделя
                </li>
              </ul>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                <strong>Общее время разработки:</strong> 17-24 недели (4-6 месяцев)
                <br />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  * При параллельной разработке Frontend и Backend время может быть сокращено
                </span>
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                Стоимость разработки
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Разбивка по этапам:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Анализ и проектирование: <strong>€1,200 - €2,000</strong></li>
                    <li>Backend разработка (B2B): <strong>€7,000 - €10,000</strong></li>
                    <li>Frontend разработка (B2B): <strong>€5,000 - €7,500</strong></li>
                    <li>B2C-сайт разработка: <strong>€4,000 - €6,000</strong></li>
                    <li>Интеграция и тестирование: <strong>€2,500 - €3,500</strong></li>
                    <li>Деплой и финальная настройка: <strong>€800 - €1,200</strong></li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xl">
                    <strong className="text-gray-900 dark:text-gray-100">Общая стоимость разработки:</strong>{' '}
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">€20,500 - €30,200</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    * Окончательная стоимость зависит от выбранного стека технологий, команды разработчиков 
                    и конкретных требований проекта.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Примечания по оценке:
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>Оценка включает разработку базовой функциональности</li>
                <li>Стоимость включает базовое тестирование и документацию</li>
                <li>Дополнительные функции и интеграции оцениваются отдельно</li>
                <li>Стоимость хостинга и инфраструктуры не включена в оценку</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Глобальная секция комментариев в конце документа */}
      {giscusConfig && (
        <div id="comments" className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 scroll-mt-24">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              Комментарии и обратная связь
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Оставьте комментарии или вопросы по любому разделу технического задания. 
              Вы можете ссылаться на конкретные разделы, используя их названия или номера.
            </p>
            <ContactButtons />
          </div>
          <CommentSection 
            repo={giscusConfig.repo}
            repoId={giscusConfig.repoId}
            mapping="specific"
            discussionNumber={1}
            category="Announcements"
            categoryId={giscusConfig.categoryId}
          />
        </div>
      )}

      {/* Footer с авторскими правами */}
      <Footer />
    </div>
  );
}
