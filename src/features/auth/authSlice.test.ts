import auth, {
  initialState,
  initializeAuth,
  invalidateAuth,
} from 'features/auth/authSlice';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(auth(initialState, { type: '' })).toEqual(initialState);
  });

  it('should handle initializeAuth', () => {
    const action = {
      type: initializeAuth.type,
      payload: { isAuth: true, userId: '123456', userLogin: 'twitch' },
    };

    const state = auth(initialState, action);

    expect(state.status).toBe('success');
    expect(state.userId).toBe('123456');
    expect(state.userLogin).toBe('twitch');
  });

  it('should handle invalidateAuth', () => {
    const action = { type: invalidateAuth.type };

    const state = auth(
      {
        status: 'success',
        userId: '123456',
        userLogin: 'twitch',
      },
      action,
    );

    expect(state.status).toBe('idle');
    expect(state.userId).toBe(null);
    expect(state.userLogin).toBe(null);
  });
});
