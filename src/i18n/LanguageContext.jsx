import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations.jsx'

const LangContext = createContext(null)

/* English for everyone by default - no browser sniffing. The switcher is
   the only way to change language, and a manual choice is remembered. */
function initialLang() {
  try {
    const saved = localStorage.getItem('tod-lang')
    if (saved && translations[saved]) return saved
  } catch { /* private mode */ }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    try { localStorage.setItem('tod-lang', lang) } catch { /* private mode */ }
    document.documentElement.lang = lang
    document.title = translations[lang].meta.title
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
