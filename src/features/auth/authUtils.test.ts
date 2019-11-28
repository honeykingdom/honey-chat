import { LS_USER } from 'utils/constants';
import {
  readUserFromLocatStorage,
  writeUserToLocatStorage,
} from 'features/auth/authUtils';

describe('auth utils', () => {
  beforeEach(() => localStorage.clear());

  it('should read user from local storage', () => {
    expect(readUserFromLocatStorage()).toBe(null);

    const user = JSON.stringify({
      id: '123456',
      login: 'twitch',
    });

    localStorage.setItem(LS_USER, user);

    const result = readUserFromLocatStorage() as any;

    expect(result.id).toBe('123456');
    expect(result.login).toBe('twitch');
  });

  it('should write user to local storage', () => {
    writeUserToLocatStorage({
      id: '123456',
      login: 'twitch',
    });

    const result = JSON.parse(localStorage.getItem(LS_USER) as string);

    expect(result.id).toBe('123456');
    expect(result.login).toBe('twitch');
  });
});
