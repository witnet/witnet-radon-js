import { I18n } from '../../src/i18n.js'

describe('i18n', () => {
  it('should use en as default locale', () => {
    const i18n = new I18n()

    const result = i18n.t('operator_info_description.array.count')

    expect(result).toBe('Count the number of elements in the input Array')
  })

  it('setLocale should change the locale', () => {
    const i18n = new I18n()

    i18n.setLocale('es')
    const result = i18n.t('operator_info_description.array.count')

    expect(result).toBe('Cuenta el número de elementos en el Array de entrada')
  })

  it('should use locale given on initialization', () => {
    const i18n = new I18n('es')

    const result = i18n.t('operator_info_description.array.count')

    expect(result).toBe('Cuenta el número de elementos en el Array de entrada')
  })
})
