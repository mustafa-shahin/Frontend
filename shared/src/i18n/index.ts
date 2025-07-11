import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../i18n';
import deCommon from '../i18n';
import enAuth from '../i18n';
import deAuth from '../i18n';
import enPages from '../i18n';
import dePages from '../i18n';
import enForm from '../i18n';
import deForm from '../i18n';
import enNavigation from '../i18n';
import deNavigation from '../i18n';

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
