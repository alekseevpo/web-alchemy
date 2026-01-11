export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20 pt-8 pb-8">
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
        <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
          © {currentYear} Все права защищены. Данное техническое задание является интеллектуальной собственностью и охраняется законом об авторском праве.
        </p>
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          <p className="mb-2">Защита авторских прав обеспечивается следующими нормативными актами:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-1996-8930"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Закон об интеллектуальной собственности Испании (Real Decreto Legislativo 1/1996)
              </a>
            </li>
            <li>
              <a
                href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32001L0029"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Директива ЕС 2001/29/EC об авторском праве в информационном обществе
              </a>
            </li>
          </ul>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 leading-relaxed">
          Любое несанкционированное копирование, распространение или использование данного документа без письменного разрешения правообладателя запрещено и влечет за собой гражданскую и уголовную ответственность в соответствии с действующим законодательством.
        </p>
      </div>
    </footer>
  );
}
