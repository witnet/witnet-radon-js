import rosetta, { Rosetta } from 'rosetta'
import en from './locales/en.json'
import es from './locales/es.json'

export type Locale = 'en' | 'es'

const DEFAULT_LOCALE: Locale = 'en'

export class I18n {
  private i18n: Rosetta<{}>

  constructor(defaultLocale: Locale = DEFAULT_LOCALE) {
    const i18n = rosetta({
      en,
      es,
    })

    i18n.locale(defaultLocale)

    this.i18n = i18n
  }

  public setLocale(locale: Locale) {
    this.i18n.locale(locale)
  }

  public t(key: string, value?: Record<string, string | number>): string {
    return this.i18n.t(key, value)
  }
}
