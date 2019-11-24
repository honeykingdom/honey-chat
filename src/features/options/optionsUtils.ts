export const readOptionsFromLocalStorage = (): object => {
  try {
    return JSON.parse(localStorage.options);
  } catch {
    return {};
  }
};

export const writeOptionsToLocalStore = (options: object): void => {
  localStorage.setItem(
    'options',
    JSON.stringify({
      ...readOptionsFromLocalStorage(),
      ...options,
    }),
  );
};
