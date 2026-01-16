import { Language } from './LanguageContext';

export const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Header
    'header.title': 'Web Alchemy',
    'header.subtitle': 'Разработка веб-проектов любой сложности под ключ',
    'header.tagline': 'От идеи до запуска — быстро, качественно, профессионально',
    
    // Hero Section
    'hero.title': 'Разработка WebApp',
    'hero.titleHighlight': 'любой сложности',
    'hero.subtitle': 'Создаем современные веб-приложения под ключ с использованием TypeScript, Vue.js и Django.',
    'hero.cta.primary': 'Обсудить проект',
    'hero.cta.secondary': 'Мои услуги',
    
    // Services Section
    'services.title': 'Что мы делаем',
    'services.frontend.title': 'Frontend разработка',
    'services.frontend.desc': 'Современные интерфейсы на Vue.js и TypeScript. Адаптивный дизайн, быстрая загрузка, отличный UX.',
    'services.backend.title': 'Backend разработка',
    'services.backend.desc': 'Надежные серверные решения на Django. API, базы данных, интеграции — все под ключ.',
    'services.fullcycle.title': 'Полный цикл',
    'services.fullcycle.desc': 'От проектирования до деплоя. Весь процесс разработки от одной точки контакта.',
    
    // About Section
    'about.title': 'О компании',
    'about.desc': 'Web Alchemy — команда веб-разработчиков, специализирующаяся на создании современных веб-приложений. Работаем с TypeScript, Vue.js и Django — технологиями, которые позволяют создавать быстрые, масштабируемые и надежные решения.',
    'about.tech.title': 'Наш стек',
    'about.tech.list': 'TypeScript, Vue.js 3, Django / Django REST Framework, Tailwind CSS, Vite, Next.js',
    'about.approach.title': 'Наш подход',
    'about.approach.clean': 'Чистый, поддерживаемый код',
    'about.approach.fast': 'Быстрая разработка',
    'about.approach.modern': 'Современные практики',
    'about.approach.detail': 'Внимание к деталям',
    
    // Contact Section
    'contact.title': 'Давайте обсудим ваш проект',
    'contact.subtitle': 'Готовы создать для вас современное веб-приложение. Напишите нам, и мы обсудим детали.',
    'contact.form.name': 'Ваше имя',
    'contact.form.email': 'Email',
    'contact.form.message': 'Расскажите о вашем проекте',
    'contact.form.submit': 'Отправить',
    'contact.form.or': 'Или напишите напрямую на email',
    
    // Navigation
    'nav.showNavigation': 'Показать навигацию',
    'nav.closeNavigation': 'Закрыть навигацию',
    'nav.sectionNavigation': 'Навигация по разделам',
    
    // Table of Contents
    'toc.title': 'Навигация',
    'toc.services': 'Услуги',
    'toc.about': 'О компании',
    'toc.contact': 'Контакты',
    
    // Footer
    'footer.copyright': '© 2024 Web Alchemy. Разработка веб-приложений под ключ.',
  },
  en: {
    // Header
    'header.title': 'Web Alchemy',
    'header.subtitle': 'Full-stack web development of any complexity',
    'header.tagline': 'From idea to launch — fast, high-quality, professional',
    
    // Hero Section
    'hero.title': 'WebApp Development',
    'hero.titleHighlight': 'of any complexity',
    'hero.subtitle': 'We create modern web applications turnkey using TypeScript, Vue.js and Django.',
    'hero.cta.primary': 'Discuss project',
    'hero.cta.secondary': 'Our services',
    
    // Services Section
    'services.title': 'What we do',
    'services.frontend.title': 'Frontend Development',
    'services.frontend.desc': 'Modern interfaces on Vue.js and TypeScript. Responsive design, fast loading, excellent UX.',
    'services.backend.title': 'Backend Development',
    'services.backend.desc': 'Reliable server solutions on Django. API, databases, integrations — everything turnkey.',
    'services.fullcycle.title': 'Full Cycle',
    'services.fullcycle.desc': 'From design to deployment. The entire development process from a single point of contact.',
    
    // About Section
    'about.title': 'About us',
    'about.desc': 'Web Alchemy is a team of web developers specializing in creating modern web applications. We work with TypeScript, Vue.js and Django — technologies that allow us to create fast, scalable and reliable solutions.',
    'about.tech.title': 'Our stack',
    'about.tech.list': 'TypeScript, Vue.js 3, Django / Django REST Framework, Tailwind CSS, Vite, Next.js',
    'about.approach.title': 'Our approach',
    'about.approach.clean': 'Clean, maintainable code',
    'about.approach.fast': 'Fast development',
    'about.approach.modern': 'Modern practices',
    'about.approach.detail': 'Attention to details',
    
    // Contact Section
    'contact.title': 'Let\'s discuss your project',
    'contact.subtitle': 'Ready to create a modern web application for you. Write to us and we\'ll discuss the details.',
    'contact.form.name': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Tell us about your project',
    'contact.form.submit': 'Send',
    'contact.form.or': 'Or write directly to email',
    
    // Navigation
    'nav.showNavigation': 'Show navigation',
    'nav.closeNavigation': 'Close navigation',
    'nav.sectionNavigation': 'Section navigation',
    
    // Table of Contents
    'toc.title': 'Navigation',
    'toc.services': 'Services',
    'toc.about': 'About us',
    'toc.contact': 'Contact',
    
    // Footer
    'footer.copyright': '© 2024 Web Alchemy. Turnkey web application development.',
  },
  es: {
    // Header
    'header.title': 'Web Alchemy',
    'header.subtitle': 'Desarrollo web de cualquier complejidad llave en mano',
    'header.tagline': 'De la idea al lanzamiento — rápido, de calidad, profesional',
    
    // Hero Section
    'hero.title': 'Desarrollo de WebApp',
    'hero.titleHighlight': 'de cualquier complejidad',
    'hero.subtitle': 'Creamos aplicaciones web modernas llave en mano usando TypeScript, Vue.js y Django.',
    'hero.cta.primary': 'Discutir proyecto',
    'hero.cta.secondary': 'Nuestros servicios',
    
    // Services Section
    'services.title': 'Qué hacemos',
    'services.frontend.title': 'Desarrollo Frontend',
    'services.frontend.desc': 'Interfaces modernas en Vue.js y TypeScript. Diseño responsivo, carga rápida, excelente UX.',
    'services.backend.title': 'Desarrollo Backend',
    'services.backend.desc': 'Soluciones de servidor confiables en Django. API, bases de datos, integraciones — todo llave en mano.',
    'services.fullcycle.title': 'Ciclo completo',
    'services.fullcycle.desc': 'Desde el diseño hasta el despliegue. Todo el proceso de desarrollo desde un solo punto de contacto.',
    
    // About Section
    'about.title': 'Sobre nosotros',
    'about.desc': 'Web Alchemy es un equipo de desarrolladores web especializado en crear aplicaciones web modernas. Trabajamos con TypeScript, Vue.js y Django — tecnologías que nos permiten crear soluciones rápidas, escalables y confiables.',
    'about.tech.title': 'Nuestro stack',
    'about.tech.list': 'TypeScript, Vue.js 3, Django / Django REST Framework, Tailwind CSS, Vite, Next.js',
    'about.approach.title': 'Nuestro enfoque',
    'about.approach.clean': 'Código limpio y mantenible',
    'about.approach.fast': 'Desarrollo rápido',
    'about.approach.modern': 'Prácticas modernas',
    'about.approach.detail': 'Atención a los detalles',
    
    // Contact Section
    'contact.title': 'Discutamos su proyecto',
    'contact.subtitle': 'Listos para crear una aplicación web moderna para usted. Escríbanos y discutiremos los detalles.',
    'contact.form.name': 'Su nombre',
    'contact.form.email': 'Email',
    'contact.form.message': 'Cuéntenos sobre su proyecto',
    'contact.form.submit': 'Enviar',
    'contact.form.or': 'O escriba directamente al email',
    
    // Navigation
    'nav.showNavigation': 'Mostrar navegación',
    'nav.closeNavigation': 'Cerrar navegación',
    'nav.sectionNavigation': 'Navegación por secciones',
    
    // Table of Contents
    'toc.title': 'Navegación',
    'toc.services': 'Servicios',
    'toc.about': 'Sobre nosotros',
    'toc.contact': 'Contacto',
    
    // Footer
    'footer.copyright': '© 2024 Web Alchemy. Desarrollo de aplicaciones web llave en mano.',
  },
};
