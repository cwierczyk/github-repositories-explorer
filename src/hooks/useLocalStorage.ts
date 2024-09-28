import type LOCAL_STORAGE_KEYS from '@/const/localStorage';

type ValidKeys = (typeof LOCAL_STORAGE_KEYS)[number];

export const useLocalStorage = <ValidValuesType = string>(
  key: ValidKeys,
  validValues?: readonly ValidValuesType[],
): ValidValuesType | null => {
  const value = localStorage.getItem(key) as ValidValuesType | null;

  if (!value) return null;

  if (validValues && !validValues.includes(value)) return null;

  return value;
};
