import sliceItemsByLimit from './sliceItemsByLimit';

describe('slice items by limit', () => {
  it("should not mutate an array if don't need to slice", () => {
    const items = [1, 2, 3, 4, 5];

    expect(sliceItemsByLimit(items, 10)).toBe(items);
  });

  it('should not slice items if not needed', () => {
    expect(sliceItemsByLimit([1], 10)).toEqual([1]);
  });

  it('should slice items when added many items', () => {
    expect(
      sliceItemsByLimit([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5], 10),
    ).toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
  });
});
