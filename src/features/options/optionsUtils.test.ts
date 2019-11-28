import { LS_OPTIONS } from 'utils/constants';
import {
  readOptionsFromLocalStorage,
  writeOptionsToLocalStore,
} from 'features/options/optionsUtils';

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

    localStorage.setItem(LS_OPTIONS, options);

    const result = readOptionsFromLocalStorage() as any;

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
