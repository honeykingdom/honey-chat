import { readUserFromLocatStorage, writeUserToLocatStorage } from './authUtils';

describe('auth utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should read user from local storage', () => {
    expect(readUserFromLocatStorage()).toBe(null);

    const user = JSON.stringify({
      id: '123456',
      login: 'twitch',
    });

    localStorage.setItem('user', user);

    const result = readUserFromLocatStorage();

    expect(result.id).toBe('123456');
    expect(result.login).toBe('twitch');
  });

  it('should write user to local storage', () => {
    writeUserToLocatStorage({
      id: '123456',
      login: 'twitch',
    });

    const result = JSON.parse(localStorage.user);

    expect(result.id).toBe('123456');
    expect(result.login).toBe('twitch');
  });
});
