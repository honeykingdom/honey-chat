import { useAppSelector } from 'app/hooks';
import { useState } from 'react';
import { FREQUENTLY_USED_EMOTES_LIMIT } from '../emotesConstants';
import { emotesSelector } from '../emotesSelectors';
import createHtmlEmote from '../utils/createHtmlEmote';
import { readEmotesUsageStatistic } from '../utils/emotesUsageStatistic';

/** Reads frequently used emotes from LS on mount */
const useFrequentlyUsedEmotes = () => {
  const emotes = useAppSelector(emotesSelector);

  const [frequentlyUsedEmotes] = useState(() => {
    const stats = readEmotesUsageStatistic();
    return stats
      .slice(0, FREQUENTLY_USED_EMOTES_LIMIT)
      .map(({ type, content }) => createHtmlEmote(emotes, type, content)!)
      .filter(Boolean);
  });

  return frequentlyUsedEmotes;
};

export default useFrequentlyUsedEmotes;
