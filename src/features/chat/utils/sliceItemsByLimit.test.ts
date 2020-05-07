import sliceItemsByLimit from './sliceItemsByLimit';

describe('slice items by limit', () => {
  it("should not mutate an array if don't need to slice", () => {
    const items = [1, 2, 3, 4, 5];

    expect(
      sliceItemsByLimit({
        items,
        limit: 10,
      })[0],
    ).toBe(items);
  });

  it('should not slice items if not needed', () => {
    expect(
      sliceItemsByLimit({
        items: [1],
        limit: 10,
        addedItemsCount: 1,
        isEven: false,
      }),
    ).toEqual([[1], false]);
  });

  it('should slice items when added 1 item', () => {
    expect(
      sliceItemsByLimit({
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
        limit: 10,
        isEven: false,
      }),
    ).toEqual([[2, 3, 4, 5, 6, 7, 8, 9, 0, 1], true]);
  });

  it('should slice items when added odd number of items', () => {
    expect(
      sliceItemsByLimit({
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
        limit: 10,
        addedItemsCount: 5,
        isEven: false,
      }),
    ).toEqual([[6, 7, 8, 9, 0, 1, 2, 3, 4, 5], true]);
  });

  it('should slice items when added even number of items', () => {
    expect(
      sliceItemsByLimit({
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
        limit: 10,
        addedItemsCount: 6,
        isEven: false,
      }),
    ).toEqual([[7, 8, 9, 0, 1, 2, 3, 4, 5, 6], false]);
  });
});
