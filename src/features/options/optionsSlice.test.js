import options, { initialState, changeOption } from './optionsSlice';

describe('options reducer', () => {
  it('should handle initial state', () => {
    expect(options(initialState, {})).toEqual(initialState);
  });

  it('should handle changeOption', () => {
    const action = {
      type: changeOption.type,
      payload: { name: 'fixedWidth', value: true },
    };

    const state = options(initialState, action);

    expect(state.fixedWidth).toBe(true);
  });
});
