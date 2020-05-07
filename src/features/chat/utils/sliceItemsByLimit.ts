type SliceItemsParams<T> = {
  items: T[];
  limit: number;
  addedItemsCount?: number;
  isEven?: boolean;
};

function sliceItemsByLimit<T>({
  items,
  limit,
  addedItemsCount = 1,
  isEven = false,
}: SliceItemsParams<T>): [T[], boolean] {
  const diff = items.length - limit;
  const isSliced = diff > 0;

  const newItems = isSliced ? items.slice(diff) : items;
  const newIsEven = isSliced && addedItemsCount % 2 ? !isEven : isEven;

  return [newItems, newIsEven];
}

export default sliceItemsByLimit;
