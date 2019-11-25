import {
  readOptionsFromLocalStorage,
  writeOptionsToLocalStore,
} from './optionsUtils';

describe('options utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should read options from local storage', () => {
    expect(readOptionsFromLocalStorage()).toEqual({});

    const options = JSON.stringify({
      showTimestamps: true,
      splitChat: false,
    });

    localStorage.setItem('options', options);

    const result = readOptionsFromLocalStorage();

    expect(result.showTimestamps).toBe(true);
    expect(result.splitChat).toBe(false);
  });

  it('should write options to local storage', () => {
    writeOptionsToLocalStore({ fixedWidth: true });
    writeOptionsToLocalStore({ splitChat: false });

    const result = JSON.parse(localStorage.options);

    expect(result.fixedWidth).toBe(true);
    expect(result.splitChat).toBe(false);
  });
});
