import {Callback, TFunction} from 'i18next';

import { type DEFAULT_NS } from '@/const';
import { type en } from '@/i18n/en';
import { type LanguageType, type NamespaceType } from '@/types';

import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: typeof en;
    ns: NamespaceType;
  }

  interface i18n {
    language: LanguageType;
    resolvedLanguage: LanguageType | null;
    changeLanguage(lng: LanguageType, callback?: Callback): Promise<TFunction>;
  }
}
