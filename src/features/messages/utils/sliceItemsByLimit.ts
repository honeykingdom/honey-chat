const sliceItemsByLimit = <T>(items: T[], limit: number) => {
  const diff = items.length - limit;

  return diff > 0 ? items.slice(diff) : items;
};

export default sliceItemsByLimit;
