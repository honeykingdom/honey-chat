const getUserSuggestions = (
  beginText: string,
  users: string[],
  limit = 5,
): string[] => {
  const result = [];
  const beginTextLower = beginText.toLowerCase();

  // eslint-disable-next-line no-restricted-syntax
  for (const name of users) {
    if (result.length === limit) return result;

    const nameLower = name.toLowerCase();

    if (beginTextLower === '' || nameLower.startsWith(beginTextLower)) {
      result.push(name);
    }
  }

  return result;
};

export default getUserSuggestions;
