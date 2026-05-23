import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import hu from '../locales/hu.json';
import ro from '../locales/ro.json';

const SUPPORTED = new Set(['en', 'ro', 'hu']);

export function resolveInitialLanguage(): string {
  const code = Localization.getLocales()[0]?.languageCode;
  if (code != null && SUPPORTED.has(code)) {
    return code;
  }
  return 'en';
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ro: { translation: ro },
    hu: { translation: hu },
  },
  lng: resolveInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
