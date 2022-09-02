const parseBadgesTag = (badgesTag: string): Record<string, string> =>
  badgesTag
    .split(',')
    .map((badge) => badge.split('/'))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

export default parseBadgesTag;
