'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function TechnicalSpecification() {
  const { t, language } = useLanguage();

  const formatDate = () => {
    const date = new Date();
    if (language === 'ru') {
      return date.toLocaleDateString('ru-RU');
    } else if (language === 'es') {
      return date.toLocaleDateString('es-ES');
    }
    return date.toLocaleDateString('en-GB');
  };

  return (
    <>
      {/* Header */}
      <header className="mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
          {t('header.title')}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          {t('header.subtitle')}
        </p>
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
          {t('header.version')} • {t('header.date')}: {formatDate()}
        </div>
      </header>

      {/* Section 1 - Overview */}
      <section id="overview" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section1.title')}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6 mb-6 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-900 dark:text-blue-100 font-medium mb-2">
              {t('section1.projectType')}: <strong>{t('section1.saas')}</strong>
            </p>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {t('section1.saasDesc')}
            </p>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {t('section1.intro')}
          </p>
          
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>{t('section1.mls')}</strong> {t('section1.mlsDesc')} <span className="text-amber-600 dark:text-amber-400 font-medium">{t('section1.mlsNotCrm')}</span> {t('section1.mlsNotCrmDesc')}
              <ul className="list-circle pl-6 mt-2 space-y-1 text-sm">
                <li>{t('section1.mlsAccess')}</li>
                <li>{t('section1.mlsIntegrations')}</li>
                <li>{t('section1.mlsSync')}</li>
              </ul>
            </li>
            <li>
              <strong>{t('section1.espanaBest')}</strong> {t('section1.espanaBestDesc')}
              <ul className="list-circle pl-6 mt-2 space-y-1 text-sm">
                <li>{t('section1.seoCatalog')}</li>
                <li>{t('section1.leadGen')}</li>
                <li>{t('section1.agencyRating')}</li>
                <li><strong>{t('section1.phase2')}</strong>{t('section1.phase2Desc')}</li>
              </ul>
            </li>
          </ul>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{t('section1.keyPrinciples')}</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>{t('section1.multiTenant')}</strong> {t('section1.multiTenantDesc')}</li>
              <li><strong>{t('section1.mlsFirst')}</strong> {t('section1.mlsFirstDesc')}</li>
              <li><strong>{t('section1.softVerification')}</strong> {t('section1.softVerificationDesc')}</li>
              <li><strong>{t('section1.aiTranslations')}</strong> {t('section1.aiTranslationsDesc')}</li>
              <li><strong>{t('section1.seoMvp')}</strong> {t('section1.seoMvpDesc')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 - Tech Stack */}
      <section id="tech-stack" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section2.title')}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section2.backend')}
          </h3>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>{t('section2.backendRec')}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('section2.backendFast')}</li>
              <li>{t('section2.backendDocs')}</li>
              <li>{t('section2.backendAsync')}</li>
              <li>{t('section2.backendPg')}</li>
              <li>{t('section2.backendFiles')}</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              {t('section2.backendAlt')}
            </p>
          </div>

          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section2.frontend')}
          </h3>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>{t('section2.frontendRec')}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('section2.frontendEco')}</li>
              <li>{t('section2.frontendSsr')}</li>
              <li>{t('section2.frontendResponsive')}</li>
              <li>{t('section2.frontendUi')}</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              {t('section2.frontendAlt')}
            </p>
          </div>

          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section2.database')}
          </h3>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>{t('section2.databaseRec')}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('section2.databaseAcid')}</li>
              <li>{t('section2.databaseSearch')}</li>
              <li>{t('section2.databaseGeo')}</li>
              <li>{t('section2.databaseScale')}</li>
              <li>{t('section2.databaseFree')}</li>
            </ul>
          </div>

          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section2.additional')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section2.restApi')}</strong> {t('section2.restApiDesc')}</li>
            <li><strong>{t('section2.responsive')}</strong> {t('section2.responsiveDesc')}</li>
            <li><strong>{t('section2.vcs')}</strong> {t('section2.vcsDesc')}</li>
            <li><strong>{t('section2.security')}</strong> {t('section2.securityDesc')}</li>
            <li><strong>{t('section2.storage')}</strong> {t('section2.storageDesc')}</li>
          </ul>
        </div>
      </section>

      {/* Section 3 - B2B Platform */}
      <section id="b2b-platform" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section3.title')}
        </h2>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 sm:p-6 mb-6 border border-amber-200 dark:border-amber-800">
          <p className="text-amber-900 dark:text-amber-100 font-medium mb-2">
            {t('section3.mlsNotice')}
          </p>
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            {t('section3.mlsNoticeDesc')} <strong>{t('section3.onlyAgencies')}</strong>{t('section3.noClientAccess')}
          </p>
        </div>
        
        <div className="space-y-8">
          {/* 3.1 Users and Roles */}
          <div id="b2b-users" className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section3.users')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>{t('section3.registration')}</strong> {t('section3.registrationDesc')}
              </li>
              <li>
                <strong>{t('section3.roles')}</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li><strong>{t('section3.roleOwner')}</strong> {t('section3.roleOwnerDesc')}</li>
                  <li><strong>{t('section3.roleAgent')}</strong> {t('section3.roleAgentDesc')}</li>
                  <li><strong>{t('section3.roleAdmin')}</strong> {t('section3.roleAdminDesc')}</li>
                  <li><strong>{t('section3.roleSuperadmin')}</strong> {t('section3.roleSuperadminDesc')}</li>
                </ul>
              </li>
              <li>
                <strong>{t('section3.auth')}</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>{t('section3.authEmail')}</li>
                  <li>{t('section3.authGoogle')}</li>
                  <li>{t('section3.auth2fa')}</li>
                </ul>
              </li>
              <li>
                <strong>{t('section3.statuses')}</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li><strong>{t('section3.statusActive')}</strong> {t('section3.statusActiveDesc')}</li>
                  <li><strong>{t('section3.statusModeration')}</strong> {t('section3.statusModerationDesc')}</li>
                  <li><strong>{t('section3.statusBlocked')}</strong> {t('section3.statusBlockedDesc')}</li>
                  <li><strong>{t('section3.statusSuspended')}</strong> {t('section3.statusSuspendedDesc')}</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* 3.2 Company Profile */}
          <div id="b2b-company-profile" className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section3.2.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('section3.2.desc')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>{t('section3.2.name')}</strong></li>
              <li><strong>{t('section3.2.logo')}</strong> {t('section3.2.logoDesc')}</li>
              <li><strong>{t('section3.2.region')}</strong> {t('section3.2.regionDesc')}</li>
              <li><strong>{t('section3.2.verification')}</strong> {t('section3.2.verificationDesc')}</li>
              <li><strong>{t('section3.2.rating')}</strong> {t('section3.2.ratingDesc')}</li>
              <li><strong>{t('section3.2.objects')}</strong> {t('section3.2.objectsDesc')}</li>
              <li>{t('section3.2.contacts')}</li>
              <li>{t('section3.2.history')}</li>
            </ul>
          </div>

          {/* 3.3 Properties */}
          <div id="b2b-properties" className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section3.3.title')}
            </h3>
            
            <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-6 mb-3">
              {t('section3.3.functionality')}
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('section3.3.add')}</li>
              <li>{t('section3.3.edit')}</li>
              <li>{t('section3.3.delete')}</li>
              <li>{t('section3.3.photos')}</li>
              <li>{t('section3.3.shortDesc')}</li>
              <li>{t('section3.3.longDesc')}</li>
              <li>{t('section3.3.statuses')} <strong>{t('section3.3.statusActive')}</strong> / <strong>{t('section3.3.statusReserved')}</strong> / <strong>{t('section3.3.statusSold')}</strong></li>
            </ul>

            <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mt-6 mb-3">
              {t('section3.3.fields')}
            </h4>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li><strong>{t('section3.3.fieldType')}</strong> {t('section3.3.fieldTypeReq')}{t('section3.3.fieldTypeDesc')}</li>
                <li><strong>{t('section3.3.fieldPrice')}</strong> {t('section3.3.fieldTypeReq')}{t('section3.3.fieldPriceDesc')}</li>
                <li><strong>{t('section3.3.fieldRegion')}</strong> {t('section3.3.fieldTypeReq')}{t('section3.3.fieldRegionDesc')}</li>
                <li><strong>{t('section3.3.fieldArea')}</strong> {t('section3.3.fieldTypeReq')}{t('section3.3.fieldAreaDesc')}</li>
                <li><strong>{t('section3.3.fieldBedrooms')}</strong> {t('section3.3.fieldTypeReq')}{t('section3.3.fieldBedroomsDesc')}</li>
                <li><strong>{t('section3.3.fieldBathrooms')}</strong> {t('section3.3.fieldTypeReq')}{t('section3.3.fieldBathroomsDesc')}</li>
                <li><strong>{t('section3.3.fieldDescription')}</strong> {t('section3.3.fieldTypeReq')}{t('section3.3.fieldDescriptionDesc')}</li>
                <li><strong>{t('section3.3.fieldCompany')}</strong> {t('section3.3.fieldCompanyDesc')}</li>
                <li><strong>{t('section3.3.fieldYear')}</strong> {t('section3.3.fieldYearDesc')}</li>
                <li><strong>{t('section3.3.fieldPublished')}</strong> {t('section3.3.fieldPublishedDesc')}</li>
                <li><strong>{t('section3.3.fieldUpdated')}</strong> {t('section3.3.fieldUpdatedDesc')}</li>
                <li><strong>{t('section3.3.fieldPhotos')}</strong> {t('section3.3.fieldPhotosDesc')}</li>
              </ul>
            </div>
          </div>

          {/* 3.4 Search */}
          <div id="b2b-search" className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section3.4.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('section3.4.desc')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>{t('section3.4.region')}</strong> {t('section3.4.regionDesc')}</li>
              <li><strong>{t('section3.4.type')}</strong> {t('section3.4.typeDesc')}</li>
              <li><strong>{t('section3.4.price')}</strong> {t('section3.4.priceDesc')}</li>
              <li><strong>{t('section3.4.area')}</strong> {t('section3.4.areaDesc')}</li>
              <li><strong>{t('section3.4.bedrooms')}</strong> {t('section3.4.bedroomsDesc')}</li>
              <li><strong>{t('section3.4.status')}</strong> {t('section3.4.statusDesc')}</li>
              <li><strong>{t('section3.4.company')}</strong> {t('section3.4.companyDesc')}</li>
              <li><strong>{t('section3.4.textSearch')}</strong> {t('section3.4.textSearchDesc')}</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              {t('section3.4.pagination')}
            </p>
          </div>

          {/* 3.5 Integrations */}
          <div id="b2b-upload" className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section3.5.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('section3.5.desc')}
            </p>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 shadow-sm border border-gray-200/50 dark:border-gray-800">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                {t('section3.5.formats')}
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>{t('section3.5.restApi')}</strong> {t('section3.5.restApiDesc')}</li>
                <li><strong>{t('section3.5.xml')}</strong> {t('section3.5.xmlDesc')}</li>
                <li><strong>{t('section3.5.csv')}</strong> {t('section3.5.csvDesc')}</li>
                <li><strong>{t('section3.5.connectors')}</strong> {t('section3.5.connectorsDesc')}</li>
              </ul>
            </div>
            
            <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <strong>{t('section3.5.manual')}</strong> {t('section3.5.manualDesc')}
              </li>
              <li>
                <strong>{t('section3.5.csvImport')}</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>{t('section3.5.csvUpload')}</li>
                  <li>{t('section3.5.csvValidation')}</li>
                  <li>{t('section3.5.csvMapping')}</li>
                  <li>{t('section3.5.csvErrors')}</li>
                </ul>
              </li>
              <li>
                <strong>{t('section3.5.xmlImport')}</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>{t('section3.5.xmlFormats')}</li>
                  <li>{t('section3.5.xmlSync')}</li>
                  <li>{t('section3.5.xmlValidation')}</li>
                </ul>
              </li>
              <li>
                <strong>{t('section3.5.apiIntegration')}</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>{t('section3.5.apiDocs')}</li>
                  <li>{t('section3.5.apiWebhooks')}</li>
                  <li>{t('section3.5.apiPeriodic')}</li>
                  <li>{t('section3.5.apiMapping')}</li>
                  <li>{t('section3.5.apiConflicts')}</li>
                </ul>
              </li>
            </ul>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-900 dark:text-blue-100 text-sm">
                <strong>{t('section3.5.important')}</strong> {t('section3.5.importantDesc')}
              </p>
            </div>
          </div>

          {/* 3.6 Rating */}
          <div id="b2b-rating" className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section3.6.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('section3.6.desc')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">📊 {t('section3.6.actuality')}</h5>
                <p className="text-green-800 dark:text-green-200 text-sm">
                  {t('section3.6.actualityDesc')}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">🤝 {t('section3.6.deals')}</h5>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  {t('section3.6.dealsDesc')}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">⭐ {t('section3.6.trust')}</h5>
                <p className="text-purple-800 dark:text-purple-200 text-sm">
                  {t('section3.6.trustDesc')}
                </p>
              </div>
            </div>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>{t('section3.6.actualityFull')}</strong> {t('section3.6.actualityFullDesc')}</li>
              <li><strong>{t('section3.6.dealsFull')}</strong> {t('section3.6.dealsFullDesc')}</li>
              <li><strong>{t('section3.6.trustFull')}</strong> {t('section3.6.trustFullDesc')}</li>
              <li><strong>{t('section3.6.reviews')}</strong> {t('section3.6.reviewsDesc')}</li>
            </ul>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mt-4 shadow-sm border border-gray-200/50 dark:border-gray-800">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>{t('section3.6.important')}</strong> {t('section3.6.importantDesc')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('section3.6.influence')}
              </p>
            </div>
          </div>

          {/* 3.7 Verification */}
          <div id="b2b-verification" className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section3.7.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('section3.7.desc')} <strong>{t('section3.7.softModel')}</strong> {t('section3.7.softModelDesc')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>{t('section3.7.basic')}</strong> {t('section3.7.basicDesc')}</li>
              <li><strong>{t('section3.7.verified')}</strong> {t('section3.7.verifiedDesc')}</li>
              <li><strong>{t('section3.7.reputation')}</strong> {t('section3.7.reputationDesc')}</li>
              <li><strong>{t('section3.7.moderation')}</strong> {t('section3.7.moderationDesc')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4 - B2C Site */}
      <section id="b2c-site" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section4.title')}
        </h2>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 sm:p-6 mb-6 border border-green-200 dark:border-green-800">
          <p className="text-green-900 dark:text-green-100 font-medium mb-2">
            {t('section4.phase')}
          </p>
          <p className="text-green-800 dark:text-green-200 text-sm">
            {t('section4.phaseDesc')} <strong>{t('section4.phase2')}</strong>{t('section4.phaseDesc2')}
          </p>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t('section4.intro')}
          </p>
          
          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section4.functionality')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section4.seoCatalog')}</strong> {t('section4.seoCatalogDesc')}</li>
            <li><strong>{t('section4.propertyCard')}</strong> {t('section4.propertyCardDesc')}</li>
            <li><strong>{t('section4.smartSearch')}</strong> {t('section4.smartSearchDesc')}</li>
            <li><strong>{t('section4.agencyProfiles')}</strong> {t('section4.agencyProfilesDesc')}</li>
            <li><strong>{t('section4.leadGen')}</strong> {t('section4.leadGenDesc')}</li>
          </ul>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section4.seo')}
          </h3>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 shadow-sm border border-gray-200/50 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>{t('section4.seoDesc')}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('section4.seoSchema')}</li>
              <li>{t('section4.seoMeta')}</li>
              <li>{t('section4.seoSitemap')}</li>
              <li>{t('section4.seoUrl')}</li>
              <li>{t('section4.seoHreflang')}</li>
              <li>{t('section4.seoImages')}</li>
              <li>{t('section4.seoVitals')}</li>
            </ul>
          </div>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section4.leadGenTitle')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section4.leadForm')}</strong> {t('section4.leadFormDesc')}</li>
            <li><strong>{t('section4.viewingRequest')}</strong> {t('section4.viewingRequestDesc')}</li>
            <li><strong>{t('section4.callback')}</strong> {t('section4.callbackDesc')}</li>
            <li><strong>{t('section4.analytics')}</strong> {t('section4.analyticsDesc')}</li>
            <li><strong>{t('section4.crmIntegration')}</strong> {t('section4.crmIntegrationDesc')}</li>
          </ul>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section4.rating')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>{t('section4.ratingDisplay')}</li>
            <li>{t('section4.ratingPage')}</li>
            <li>{t('section4.ratingSorting')}</li>
            <li>{t('section4.ratingBadges')}</li>
          </ul>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section4.technical')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>{t('section4.technicalResponsive')}</li>
            <li>{t('section4.technicalSpeed')}</li>
            <li>{t('section4.technicalPwa')}</li>
            <li>{t('section4.technicalGa')}</li>
          </ul>
        </div>
      </section>

      {/* Section 5 - Multilanguage */}
      <section id="multilanguage" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section5.title')}
        </h2>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 sm:p-6 mb-6 border border-purple-200 dark:border-purple-800">
          <p className="text-purple-900 dark:text-purple-100 font-medium mb-2">
            {t('section5.masterLang')} <strong>{t('section5.english')}</strong>
          </p>
          <p className="text-purple-800 dark:text-purple-200 text-sm">
            {t('section5.masterDesc')}
          </p>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section5.mls')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section5.mlsInterface')}</strong> {t('section5.mlsInterfaceDesc')}</li>
            <li><strong>{t('section5.mlsAdmin')}</strong> {t('section5.mlsAdminDesc')}</li>
            <li><strong>{t('section5.mlsChoice')}</strong> {t('section5.mlsChoiceDesc')}</li>
            <li><strong>{t('section5.mlsContent')}</strong> {t('section5.mlsContentDesc')}</li>
          </ul>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section5.b2c')}
          </h3>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 mb-4 shadow-sm border border-gray-200/50 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>{t('section5.supported')}</strong>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-2">🇬🇧 EN</div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-2">🇪🇸 ES</div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-2">🇷🇺 RU</div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-2">🇩🇪 DE</div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-2">🇫🇷 FR</div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-2">🇨🇳 ZH</div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-2">🇸🇪 SV</div>
            </div>
          </div>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section5.detection')}</strong> {t('section5.detectionDesc')}</li>
            <li><strong>{t('section5.baseContent')}</strong> {t('section5.baseContentDesc')}</li>
            <li><strong>{t('section5.aiTranslations')}</strong> {t('section5.aiTranslationsDesc')}</li>
            <li><strong>{t('section5.architecture')}</strong> {t('section5.architectureDesc')}</li>
          </ul>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section5.aiTitle')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section5.aiAuto')}</strong> {t('section5.aiAutoDesc')}</li>
            <li><strong>{t('section5.aiCache')}</strong> {t('section5.aiCacheDesc')}</li>
            <li><strong>{t('section5.aiLabel')}</strong> {t('section5.aiLabelDesc')}</li>
            <li><strong>{t('section5.aiManual')}</strong> {t('section5.aiManualDesc')}</li>
          </ul>
          
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mt-4 border border-red-200 dark:border-red-800">
            <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">{t('section5.limitations')}</h4>
            <p className="text-red-800 dark:text-red-200 text-sm mb-2">
              <strong>{t('section5.limitationsTitle')}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 text-red-800 dark:text-red-200 text-sm">
              <li>{t('section5.limitationsLegal')}</li>
              <li>{t('section5.limitationsFinancial')}</li>
              <li>{t('section5.limitationsOfficial')}</li>
            </ul>
          </div>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section5.ux')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section5.uxProfile')}</strong> {t('section5.uxProfileDesc')}</li>
            <li><strong>{t('section5.uxSite')}</strong> {t('section5.uxSiteDesc')}</li>
            <li><strong>{t('section5.uxSeparation')}</strong> {t('section5.uxSeparationDesc')}</li>
            <li><strong>{t('section5.uxScaling')}</strong> {t('section5.uxScalingDesc')}</li>
          </ul>
        </div>
      </section>

      {/* Section 6 - Security */}
      <section id="security" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section6.title')}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section6.https')}</strong> {t('section6.httpsDesc')}</li>
            <li><strong>{t('section6.auth')}</strong> {t('section6.authDesc')}</li>
            <li><strong>{t('section6.rbac')}</strong> {t('section6.rbacDesc')}</li>
            <li><strong>{t('section6.multiTenant')}</strong> {t('section6.multiTenantDesc')}</li>
            <li><strong>{t('section6.validation')}</strong> {t('section6.validationDesc')}</li>
            <li><strong>{t('section6.sql')}</strong> {t('section6.sqlDesc')}</li>
            <li><strong>{t('section6.xss')}</strong> {t('section6.xssDesc')}</li>
            <li><strong>{t('section6.rateLimit')}</strong> {t('section6.rateLimitDesc')}</li>
            <li><strong>{t('section6.gdpr')}</strong> {t('section6.gdprDesc')}</li>
            <li><strong>{t('section6.passwords')}</strong> {t('section6.passwordsDesc')}</li>
          </ul>
        </div>
      </section>

      {/* Section 7 - Monetization */}
      <section id="monetization" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section7.title')}
        </h2>
        
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 sm:p-6 mb-6 border border-emerald-200 dark:border-emerald-800">
          <p className="text-emerald-900 dark:text-emerald-100 font-medium mb-2">
            {t('section7.model')}
          </p>
          <p className="text-emerald-800 dark:text-emerald-200 text-sm">
            {t('section7.modelDesc')} <strong>{t('section7.zero')}</strong>{t('section7.modelDesc2')}
          </p>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section7.subscription')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">🆓 {t('section7.basic')}</h5>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('section7.free')}</p>
              <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li>• {t('section7.basicObjects')}</li>
                <li>• {t('section7.basicProfile')}</li>
                <li>• {t('section7.basicPublication')}</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">⭐ {t('section7.professional')}</h5>
              <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">{t('section7.professionalPrice')}</p>
              <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                <li>• {t('section7.professionalObjects')}</li>
                <li>• {t('section7.professionalProfile')}</li>
                <li>• {t('section7.professionalPriority')}</li>
                <li>• {t('section7.professionalAnalytics')}</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">🏆 {t('section7.enterprise')}</h5>
              <p className="text-purple-600 dark:text-purple-400 text-sm mb-2">{t('section7.enterprisePrice')}</p>
              <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
                <li>• {t('section7.enterpriseObjects')}</li>
                <li>• {t('section7.enterprisePremium')}</li>
                <li>• {t('section7.enterpriseApi')}</li>
                <li>• {t('section7.enterpriseManager')}</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section7.leadGen')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section7.freeLeads')}</strong> {t('section7.freeLeadsDesc')}</li>
            <li><strong>{t('section7.paidLeads')}</strong> {t('section7.paidLeadsDesc')}</li>
            <li><strong>{t('section7.premiumLeads')}</strong> {t('section7.premiumLeadsDesc')}</li>
            <li><strong>{t('section7.auctionLeads')}</strong> {t('section7.auctionLeadsDesc')}</li>
          </ul>

          <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-4">
            {t('section7.franchise')}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section7.regionalFranchise')}</strong> {t('section7.regionalFranchiseDesc')}</li>
            <li><strong>{t('section7.whiteLabel')}</strong> {t('section7.whiteLabelDesc')}</li>
            <li><strong>{t('section7.revenueSharing')}</strong> {t('section7.revenueSharingDesc')}</li>
          </ul>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>{t('section7.important')}</strong> {t('section7.importantDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 8 - Development Stages */}
      <section id="development-stages" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section8.title')}
        </h2>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 sm:p-6 mb-6 border border-amber-200 dark:border-amber-800">
          <p className="text-amber-900 dark:text-amber-100 font-medium mb-2">
            {t('section8.grantLogic')}
          </p>
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            {t('section8.grantLogicDesc')}
          </p>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium text-blue-900 dark:text-blue-100">
                  {t('section8.phase1')}
                </h3>
                <span className="text-sm bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                  {t('section8.phase1Time')}
                </span>
              </div>
              <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
                <strong>{t('section8.phase1Goal')}</strong> {t('section8.phase1GoalDesc')}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-blue-800 dark:text-blue-200">
                <li>{t('section8.phase1MultiTenant')}</li>
                <li>{t('section8.phase1Registration')}</li>
                <li>{t('section8.phase1Crud')}</li>
                <li>{t('section8.phase1Integrations')}</li>
                <li>{t('section8.phase1Auth')}</li>
                <li>{t('section8.phase1Search')}</li>
                <li>{t('section8.phase1Lang')}</li>
              </ul>
              <p className="text-blue-600 dark:text-blue-400 text-sm mt-3">
                <strong>{t('section8.phase1Milestone')}</strong> {t('section8.phase1MilestoneDesc')}
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 sm:p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium text-green-900 dark:text-green-100">
                  {t('section8.phase2')}
                </h3>
                <span className="text-sm bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                  {t('section8.phase2Time')}
                </span>
              </div>
              <p className="text-green-800 dark:text-green-200 text-sm mb-3">
                <strong>{t('section8.phase2Goal')}</strong> {t('section8.phase2GoalDesc')}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-green-800 dark:text-green-200">
                <li>{t('section8.phase2Catalog')}</li>
                <li>{t('section8.phase2Pages')}</li>
                <li>{t('section8.phase2Search')}</li>
                <li>{t('section8.phase2LeadForms')}</li>
                <li>{t('section8.phase2AiLang')}</li>
                <li>{t('section8.phase2Responsive')}</li>
              </ul>
              <p className="text-green-600 dark:text-green-400 text-sm mt-3">
                <strong>{t('section8.phase2Milestone')}</strong> {t('section8.phase2MilestoneDesc')}
              </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 sm:p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium text-purple-900 dark:text-purple-100">
                  {t('section8.phase3')}
                </h3>
                <span className="text-sm bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full">
                  {t('section8.phase3Time')}
                </span>
              </div>
              <p className="text-purple-800 dark:text-purple-200 text-sm mb-3">
                <strong>{t('section8.phase3Goal')}</strong> {t('section8.phase3GoalDesc')}
              </p>
              <ul className="list-disc pl-6 space-y-1 text-purple-800 dark:text-purple-200">
                <li>{t('section8.phase3Plans')}</li>
                <li>{t('section8.phase3Integrations')}</li>
                <li>{t('section8.phase3Rating')}</li>
                <li>{t('section8.phase3Analytics')}</li>
                <li>{t('section8.phase3Optimization')}</li>
                <li>{t('section8.phase3Franchise')}</li>
              </ul>
              <p className="text-purple-600 dark:text-purple-400 text-sm mt-3">
                <strong>{t('section8.phase3Milestone')}</strong> {t('section8.phase3MilestoneDesc')}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{t('section8.team')}</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>{t('section8.teamBackend')}</strong> {t('section8.teamBackendDesc')}</li>
              <li><strong>{t('section8.teamFrontend')}</strong> {t('section8.teamFrontendDesc')}</li>
              <li><strong>{t('section8.teamDevops')}</strong> {t('section8.teamDevopsDesc')}</li>
              <li><strong>{t('section8.teamQa')}</strong> {t('section8.teamQaDesc')}</li>
              <li><strong>{t('section8.teamPm')}</strong> {t('section8.teamPmDesc')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 9 - Additional */}
      <section id="additional" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section9.title')}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>{t('section9.saas')}</strong> {t('section9.saasDesc')}</li>
            <li><strong>{t('section9.mlsFirst')}</strong> {t('section9.mlsFirstDesc')}</li>
            <li><strong>{t('section9.aiTranslations')}</strong> {t('section9.aiTranslationsDesc')}</li>
            <li><strong>{t('section9.langScaling')}</strong> {t('section9.langScalingDesc')}</li>
            <li><strong>{t('section9.docs')}</strong> {t('section9.docsDesc')}</li>
            <li><strong>{t('section9.testing')}</strong> {t('section9.testingDesc')}</li>
            <li><strong>{t('section9.gdpr')}</strong> {t('section9.gdprDesc')}</li>
            <li><strong>{t('section9.mobile')}</strong> {t('section9.mobileDesc')}</li>
          </ul>
        </div>
      </section>

      {/* Section 10 - Estimation */}
      <section id="estimation" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          {t('section10.title')}
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm border border-gray-200/50 dark:border-gray-800">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section10.timeframes')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>{t('section10.stage1')}</strong> {t('section10.stage1Time')}</li>
              <li><strong>{t('section10.stage2')}</strong> {t('section10.stage2Time')}</li>
              <li><strong>{t('section10.stage3')}</strong> {t('section10.stage3Time')}</li>
              <li><strong>{t('section10.stage4')}</strong> {t('section10.stage4Time')}</li>
              <li><strong>{t('section10.stage5')}</strong> {t('section10.stage5Time')}</li>
              <li><strong>{t('section10.stage6')}</strong> {t('section10.stage6Time')}</li>
            </ul>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              <strong>{t('section10.total')}</strong> {t('section10.totalTime')}
              <br />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('section10.parallel')}
              </span>
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              {t('section10.cost')}
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t('section10.breakdown')}
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('section10.costStage1')} <strong>{t('section10.costStage1Price')}</strong></li>
                  <li>{t('section10.costStage2')} <strong>{t('section10.costStage2Price')}</strong></li>
                  <li>{t('section10.costStage3')} <strong>{t('section10.costStage3Price')}</strong></li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xl">
                  <strong className="text-gray-900 dark:text-gray-100">{t('section10.totalCost')}</strong>{' '}
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{t('section10.totalCostPrice')}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('section10.costNote')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              {t('section10.notes')}
            </h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>{t('section10.note1')}</li>
              <li>{t('section10.note2')}</li>
              <li>{t('section10.note3')}</li>
              <li>{t('section10.note4')}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
