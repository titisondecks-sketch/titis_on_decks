import { useLang } from '../i18n/LanguageContext.jsx'
import { LANGS } from '../i18n/translations.jsx'

export default function LangSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div className="lang" role="group" aria-label="Language">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={code === lang ? 'is-active' : undefined}
          aria-pressed={code === lang}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
