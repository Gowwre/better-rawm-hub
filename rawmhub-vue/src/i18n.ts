import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

const messages = {
  zh_CN: zhCN,
  en_US: enUS,
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh_CN',
  fallbackLocale: 'en_US',
  messages,
})

export default i18n
