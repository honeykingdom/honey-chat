const getHighlightRegex = (highlightKeywords: string, meLogin?: string) => {
  const keywords: string[] = [];
  if (meLogin) keywords.push(meLogin);
  if (highlightKeywords) {
    for (const keyword of highlightKeywords.split(',')) {
      const normalizedKeyword = keyword.trim();
      if (normalizedKeyword) keywords.push(normalizedKeyword);
    }
  }
  if (keywords.length === 0) return;
  return new RegExp(`(${keywords.join('|')})`, 'i');
};

export default getHighlightRegex;
