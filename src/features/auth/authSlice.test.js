import auth, {
  initialState,
  initializeAuth,
  invalidateAuth,
} from './authSlice';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(auth(initialState, {})).toEqual(initialState);
  });

  it('should handle initializeAuth', () => {
    const action = {
      type: initializeAuth.type,
      payload: { isAuth: true, userId: '123456', userLogin: 'twitch' },
    };

    const state = auth(initialState, action);

    expect(state.isAuthReady).toBe(true);
    expect(state.isAuth).toBe(true);
    expect(state.userId).toBe('123456');
    expect(state.userLogin).toBe('twitch');
  });

  it('should handle invalidateAuth', () => {
    const action = { type: invalidateAuth.type };

    const state = auth(
      {
        isAuthReady: true,
        isAuth: true,
        userId: '123456',
        userLogin: 'twitch',
      },
      action,
    );

    expect(state.isAuthReady).toBe(false);
    expect(state.isAuth).toBe(false);
    expect(state.userId).toBe(null);
    expect(state.userLogin).toBe(null);
  });
});
