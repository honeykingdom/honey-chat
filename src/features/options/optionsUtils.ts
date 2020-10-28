import { LS_OPTIONS } from 'utils/constants';

export const readOptionsFromLocalStorage = (): Record<string, unknown> => {
  try {
    const options = localStorage.getItem(LS_OPTIONS);
    return JSON.parse(options as string) || {};
  } catch {
    return {};
  }
};

export const writeOptionsToLocalStore = (options: Record<string, unknown>) => {
  localStorage.setItem(
    LS_OPTIONS,
    JSON.stringify({
      ...readOptionsFromLocalStorage(),
      ...options,
    }),
  );
};
