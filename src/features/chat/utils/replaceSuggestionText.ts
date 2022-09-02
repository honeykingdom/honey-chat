import { type HtmlEmote } from 'features/emotes';
import { SuggestionsState } from '../chatTypes';

const replaceSuggestionText = (
  text: string,
  { type, items, activeIndex, start, end }: SuggestionsState,
) => {
  if (items.length === 0) return text;

  const currentItem = items[activeIndex];
  const insertedText =
    type === 'users' ? `@${currentItem}` : (currentItem as HtmlEmote).alt;

  const textBefore = text.substring(0, start);
  const testAfter = text.substring(end) || ' ';

  return `${textBefore}${insertedText}${testAfter}`;
};

export default replaceSuggestionText;
