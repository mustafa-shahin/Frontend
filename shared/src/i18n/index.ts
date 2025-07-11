import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import deCommon from './locales/de/common.json';
import enAuth from './locales/en/auth.json';
import deAuth from './locales/de/auth.json';
import enPages from './locales/en/pages.json';
import dePages from './locales/de/pages.json';
import enForm from './locales/en/form.json';
import deForm from './locales/de/form.json';
import enNavigation from './locales/en/navigation.json';
import deNavigation from './locales/de/navigation.json';

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    pages: enPages,
    form: enForm,
    navigation: enNavigation,
  },
  de: {
    common: deCommon,
    auth: deAuth,
    pages: dePages,
    form: deForm,
    navigation: deNavigation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
