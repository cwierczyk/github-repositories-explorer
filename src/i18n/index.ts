import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import {
  AVAILABLE_LANGUAGES,
  DEFAULT_NS,
  FALLBACK_LANGUAGE,
  isProduction,
  NS,
} from '@/const';
import { type LanguageType } from '@/types';

import { de } from './de';
import { en } from './en';
import { pl } from './pl';

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      convertDetectedLanguage: (lng) =>
        AVAILABLE_LANGUAGES.includes(lng as LanguageType)
          ? lng
          : FALLBACK_LANGUAGE,
    },
    debug: !isProduction,
    fallbackLng: FALLBACK_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
      pl,
      de,
    },
    ns: NS,
    defaultNS: DEFAULT_NS,
  });
