const getUsersByBeginText = (
  beginText: string,
  users: string[],
  currentUserLogin: string | null,
  limit = 5,
) => {
  const result = [];
  const beginTextLower = beginText.toLowerCase();
  const currentUserLoginLower = (currentUserLogin || '').toLowerCase();

  // eslint-disable-next-line no-restricted-syntax
  for (const name of users) {
    if (result.length === limit) return result;

    const nameLower = name.toLowerCase();

    if (
      (beginTextLower === '' || nameLower.startsWith(beginTextLower)) &&
      nameLower !== currentUserLoginLower
    ) {
      result.push(name);
    }
  }

  return result;
};

export default getUsersByBeginText;
