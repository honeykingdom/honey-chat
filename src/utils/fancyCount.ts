// https://stackoverflow.com/a/54369738/4687416

const fancyCount = (text: string) => {
  const joiner = '\u{200D}';
  const split = text.split(joiner);
  let count = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const s of split) {
    // removing the variation selectors
    const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join('')).length;
    count += num;
  }

  // assuming the joiners are used appropriately
  return count / split.length;
};

export default fancyCount;
