const getUserSuggestions = (beginText, users, userDisplayName, limit = 5) => {
  const result = [];
  const beginTextLower = beginText.toLowerCase();
  const userDisplayNameLower = userDisplayName.toLowerCase();

  if (userDisplayNameLower.startsWith(beginTextLower)) {
    result.push(userDisplayName);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const name of users) {
    if (result.length === limit) return result;

    const nameLower = name.toLowerCase();

    // eslint-disable-next-line no-continue
    if (nameLower === userDisplayNameLower) continue;

    if (beginTextLower === '' || nameLower.startsWith(beginTextLower)) {
      result.push(name);
    }
  }

  return result;
};

export default getUserSuggestions;
