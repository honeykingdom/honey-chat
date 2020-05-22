import { LS_OPTIONS } from 'utils/constants';

export const readOptionsFromLocalStorage = (): object => {
  try {
    const options = localStorage.getItem(LS_OPTIONS);
    return JSON.parse(options as string) || {};
  } catch {
    return {};
  }
};

export const writeOptionsToLocalStore = (options: object) => {
  localStorage.setItem(
    LS_OPTIONS,
    JSON.stringify({
      ...readOptionsFromLocalStorage(),
      ...options,
    }),
  );
};
